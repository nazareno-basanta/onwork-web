"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import ComoPedirCorto from "@/components/como-pedir/ComoPedirCorto";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import { COMO_PEDIR, FRANJA_CATALOGOS } from "@/data/inicio";
import { PRESUPUESTO } from "@/data/presupuesto";
import type { ProductoPresupuesto } from "@/data/productos";
import { armarMensajePresupuesto } from "@/lib/mensajePresupuesto";
import { medir } from "@/lib/medicion";
import { presupuesto, type LineaPresupuesto } from "@/lib/presupuesto";
import { whatsappUrl } from "@/lib/site";
import { btn } from "@/lib/ui";
import { usePresupuesto } from "@/lib/usePresupuesto";
import { textoWeb } from "@/lib/utils";
import SelectorCantidad from "./SelectorCantidad";

type Fila = LineaPresupuesto & { producto: ProductoPresupuesto };
type Grupo = { catalogo: string; titulo: string; filas: Fila[] };

const link =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";
// Las acciones que sacan algo (Quitar, Vaciar) van con subrayado tinta, más
// calmo; el amarillo queda para las que suman o resuelven.
const linkQuitar =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-black/30 decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * Lleva el foco a un elemento cuando React ya lo dibujó (un setTimeout corre
 * después de que se actualiza la página, aun con la pestaña en segundo plano).
 */
function enfocar(selector: string) {
  setTimeout(() => document.querySelector<HTMLElement>(selector)?.focus(), 0);
}

/** Las líneas agrupadas por catálogo, en el orden de la web. */
function agrupar(lineas: LineaPresupuesto[], indice: ProductoPresupuesto[]) {
  const orden = new Map(indice.map((p, i) => [p.codigo, i]));
  // Por producto en el orden de la web; los colores de un producto, en el orden en que se sumaron.
  const filas: Fila[] = lineas
    .map((linea, i) => ({ linea, i }))
    .filter(({ linea }) => orden.has(linea.codigo))
    .sort((a, b) => orden.get(a.linea.codigo)! - orden.get(b.linea.codigo)! || a.i - b.i)
    .map(({ linea }) => ({ ...linea, producto: indice[orden.get(linea.codigo)!] }));
  const grupos: Grupo[] = [];
  for (const fila of filas) {
    const grupo = grupos.find((g) => g.catalogo === fila.producto.catalogo);
    if (grupo) grupo.filas.push(fila);
    else grupos.push({ catalogo: fila.producto.catalogo, titulo: fila.producto.catalogoTitulo, filas: [fila] });
  }
  return grupos;
}

function Color({ fila, usados }: { fila: Fila; usados: string[] }) {
  const { producto, color } = fila;
  return (
    <label className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ow-gray">
      {PRESUPUESTO.color}
      <span className="relative flex w-[13rem] min-w-0 shrink text-ow-black">
        <select
          value={color}
          onChange={(e) => presupuesto.cambiarColor(producto.codigo, color, e.target.value)}
          aria-label={`${PRESUPUESTO.color} de ${producto.nombre}`}
          className="h-11 w-full cursor-pointer appearance-none truncate rounded-full border-2 border-ow-black bg-white pr-9 pl-4 font-display text-sm font-bold pointer-coarse:text-base"
        >
          <option value="">{PRESUPUESTO.aDefinir}</option>
          {producto.colores.map((c) => (
            <option key={c} value={c} disabled={c !== color && usados.includes(c)}>
              {c}
            </option>
          ))}
        </select>
        <Icon name="flecha-abajo" size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
      </span>
    </label>
  );
}

function FilaPresupuesto({
  fila,
  hermanas,
  ultima,
  anunciar,
}: {
  fila: Fila;
  hermanas: Fila[];
  ultima: boolean;
  anunciar: (texto: string) => void;
}) {
  const { producto, color, cantidad } = fila;
  const usados = hermanas.map((h) => h.color);
  // Con dos líneas del mismo producto, las etiquetas dicen el color
  // ("Cantidad de Apóstoles, Negro"), así no se confunden.
  const etiqueta = producto.colores.length > 0 ? `${producto.nombre}, ${color || PRESUPUESTO.colorADefinir}` : producto.nombre;

  // Al quitar, el foco pasa a la fila que queda en ese lugar (o, si era la
  // última del presupuesto, a "Ver catálogos").
  const quitarFila = (boton: HTMLElement) => {
    const filas = [...document.querySelectorAll<HTMLElement>("li[data-fila]")];
    const lugar = filas.indexOf(boton.closest("li")!);
    presupuesto.quitar(producto.codigo, color);
    anunciar(PRESUPUESTO.quitado(etiqueta));
    setTimeout(() => {
      const quedan = [...document.querySelectorAll<HTMLElement>("li[data-fila]")];
      const destino = quedan[Math.min(lugar, quedan.length - 1)];
      (destino?.querySelector<HTMLElement>("select, button") ?? document.querySelector<HTMLElement>("[data-vacio] a"))?.focus();
    }, 0);
  };
  // "Sumar otro color" va en la última línea del producto, si quedan colores
  // y ninguna línea está todavía en "A definir".
  const otroColor = ultima && producto.colores.length > hermanas.length && !usados.includes("");

  return (
    <li
      data-fila={`${producto.codigo}|${color}`}
      className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b-2 border-ow-black py-5 @2xl:grid-cols-[5.5rem_minmax(0,1fr)_auto] @2xl:items-center @2xl:gap-x-6"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-apoyado">
        {/* La foto chica del color elegido, si tiene; sin pasar por el optimizador de Vercel (como las demás fotos de productos). */}
        <Image src={producto.fotoPorColor?.[color] ?? producto.foto.chica} alt="" fill unoptimized className="object-contain p-1.5" />
      </div>
      <div className="min-w-0 self-center">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="rounded-full bg-ow-yellow px-2.5 py-0.5 font-display text-xs font-bold tracking-[0.14em] uppercase">
            {producto.codigo}
          </span>
          <h3 className="font-display text-lg leading-tight font-bold">{producto.nombre}</h3>
        </div>
        {producto.colores.length > 0 && (
          <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1">
            <Color fila={fila} usados={usados} />
            {otroColor && (
              <button
                type="button"
                className={link}
                onClick={() => {
                  presupuesto.sumar(producto.codigo);
                  // El foco va al color de la línea nueva, que arranca en "A definir".
                  enfocar(`li[data-fila="${CSS.escape(`${producto.codigo}|`)}"] select`);
                }}
              >
                {PRESUPUESTO.otroColor}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-1 @2xl:col-start-auto">
        <SelectorCantidad
          nombre={etiqueta}
          valor={cantidad}
          onCambiar={(n) => presupuesto.cambiarCantidad(producto.codigo, color, n)}
        />
        <button
          type="button"
          className={linkQuitar}
          onClick={(e) => quitarFila(e.currentTarget)}
          aria-label={`${PRESUPUESTO.quitar} ${etiqueta} del presupuesto`}
        >
          {PRESUPUESTO.quitar}
        </button>
      </div>
    </li>
  );
}

function Vaciar() {
  const [confirmando, setConfirmando] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const volverAlBoton = useRef(false);

  // Al cancelar ("No" o Escape), el foco vuelve a "Vaciar presupuesto".
  useEffect(() => {
    if (confirmando || !volverAlBoton.current) return;
    volverAlBoton.current = false;
    boton.current?.focus();
  }, [confirmando]);

  const cancelar = () => {
    volverAlBoton.current = true;
    setConfirmando(false);
  };

  if (!confirmando) {
    return (
      <button ref={boton} type="button" className={linkQuitar} onClick={() => setConfirmando(true)}>
        {PRESUPUESTO.vaciar}
      </button>
    );
  }
  return (
    <div
      role="group"
      aria-label={PRESUPUESTO.confirmarVaciarEtiqueta}
      onKeyDown={(e) => e.key === "Escape" && cancelar()}
      className="flex min-h-11 items-center gap-4 font-display text-sm font-bold"
    >
      <span aria-hidden>{PRESUPUESTO.confirmarVaciar}</span>
      <button
        type="button"
        className={linkQuitar}
        onClick={() => {
          presupuesto.vaciar();
          medir("vaciar_presupuesto");
          enfocar("[data-vacio] a");
        }}
      >
        {PRESUPUESTO.si}
      </button>
      {/* El foco va al "No": así un segundo Enter no borra sin querer. */}
      <button type="button" className={link} onClick={cancelar} autoFocus>
        {PRESUPUESTO.no}
      </button>
    </div>
  );
}

/** "Copiar la lista": el mensaje completo, por si WhatsApp no se abre o la lista es larga. */
function CopiarLista({ texto }: { texto: string }) {
  const [copiada, setCopiada] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Navegadores sin permiso para el portapapeles: copia "a la antigua".
      const campo = document.createElement("textarea");
      campo.value = texto;
      campo.setAttribute("readonly", "");
      campo.style.cssText = "position:fixed;opacity:0";
      document.body.append(campo);
      campo.select();
      document.execCommand("copy");
      campo.remove();
    }
    setCopiada(true);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setCopiada(false), 2500);
  };

  return (
    <button type="button" className={link} onClick={copiar} aria-live="polite">
      {copiada ? PRESUPUESTO.copiada : PRESUPUESTO.copiar}
    </button>
  );
}

/** "¿Buscás algo que no está en los catálogos?": crece con lo que se escribe. */
function CampoOtro({ otro }: { otro: string }) {
  const campo = useRef<HTMLTextAreaElement>(null);
  const ajustar = () => {
    const el = campo.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 4}px`;
  };
  useEffect(ajustar, [otro]);
  // Si se llega con el link "Sumalo a tu presupuesto" (#presupuesto-otro), el
  // cursor queda al final del campo, listo para seguir escribiendo.
  useEffect(() => {
    const el = campo.current;
    if (!el || window.location.hash !== "#presupuesto-otro") return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  return (
    <>
      <label htmlFor="presupuesto-otro" className="font-display text-lg leading-snug font-bold">
        {PRESUPUESTO.otroTitulo}
      </label>
      <textarea
        ref={campo}
        id="presupuesto-otro"
        rows={2}
        // Que el header fijo no lo tape al llegar con #presupuesto-otro.
        style={{ scrollMarginTop: "8rem" }}
        maxLength={300}
        value={otro}
        placeholder={PRESUPUESTO.otroEjemplo}
        onChange={(e) => presupuesto.cambiarOtro(e.target.value)}
        className="mt-3 max-h-60 w-full resize-none rounded-2xl border-2 border-ow-black bg-white px-4 py-3 text-base placeholder:text-ow-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ow-black"
      />
    </>
  );
}

/**
 * El botón para mandar el presupuesto por WhatsApp. En el celular y la tablet,
 * cuando ese botón no está a la vista, aparece una barra fija abajo con el
 * resumen y "Enviar por WhatsApp": así no hay que bajar hasta el final de la
 * lista. Nunca se ven los dos a la vez.
 */
function Enviar({ texto, filas }: { texto: string; filas: Fila[] }) {
  const boton = useRef<HTMLDivElement>(null);
  const [aLaVista, setALaVista] = useState(true);
  useEffect(() => {
    const el = boton.current;
    if (!el) return;
    const observador = new IntersectionObserver(([e]) => setALaVista(e.isIntersecting));
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const unidades = filas.reduce((suma, f) => suma + f.cantidad, 0);
  const alEnviar = () => {
    medir("enviar_presupuesto", { productos: filas.length, unidades });
    presupuesto.marcarEnviado();
  };

  return (
    <>
      {/* Lo que tranquiliza antes de enviar va junto al botón: qué se manda y que todo se consulta. */}
      <div className="mt-7 border-t-2 border-ow-black pt-5">
        {filas.length > 0 && <p className="font-display font-bold">{PRESUPUESTO.resumen(filas.length, unidades)}</p>}
        <p className="mt-1.5 text-sm text-ow-gray">{textoWeb(FRANJA_CATALOGOS)}</p>
      </div>
      <div ref={boton} className="mt-6">
        {/* Sin efecto imán: el botón no se mueve justo cuando la persona va a confirmar. */}
        <WhatsAppLink tone="yellow" message={texto} bloque className="!px-5 py-4" onClick={alEnviar}>
          {PRESUPUESTO.enviar}
          <span className="sr-only"> {PRESUPUESTO.abreWhatsApp}</span>
        </WhatsAppLink>
      </div>
      {/* Lugar al final de la página (después del pie) para que la barra no lo tape. */}
      {createPortal(<div aria-hidden className="h-20 lg:hidden" />, document.body)}
      {!aLaVista && (
        <div className="entra fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-ow-black px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white lg:hidden">
          {filas.length > 0 && (
            <p className="font-display text-sm leading-tight font-bold">
              {PRESUPUESTO.productos(filas.length)}
              <span className="block text-xs font-semibold text-white/75">
                {PRESUPUESTO.unidades(unidades)}
              </span>
            </p>
          )}
          <a
            href={whatsappUrl(texto)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={alEnviar}
            className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold text-ow-black"
          >
            <Icon name="whatsapp" size={18} />
            {PRESUPUESTO.enviarCorto}
            <span className="sr-only"> {PRESUPUESTO.abreWhatsApp}</span>
          </a>
        </div>
      )}
    </>
  );
}

/**
 * La lista de /presupuesto: agrupada por catálogo, con color, cantidad y
 * quitar en cada línea, y al costado (abajo en el celular) el campo "Otro" y
 * el botón para mandarlo por WhatsApp.
 */
export default function ListaPresupuesto({ indice }: { indice: ProductoPresupuesto[] }) {
  const { listo, lineas, otro, enviado, descartados } = usePresupuesto();
  // Lo que se anuncia a los lectores de pantalla al quitar una línea.
  const [anuncio, setAnuncio] = useState("");
  const region = (
    <p className="sr-only" aria-live="polite">
      {anuncio}
    </p>
  );

  // Hasta leer lo guardado no se muestra nada (así no aparece "vacío" un instante).
  if (!listo) return <div aria-busy="true" className="min-h-[24rem]" />;

  const grupos = agrupar(lineas, indice);
  const filas = grupos.flatMap((g) => g.filas);
  const avisoDescartados = descartados > 0 && (
    <p className="mt-5 text-sm font-semibold text-ow-gray">{textoWeb(PRESUPUESTO.descartados(descartados))}</p>
  );

  if (filas.length === 0) {
    // Sin productos igual se puede pedir algo que no está en los catálogos
    // ("Otro"): el campo queda al costado y, si tiene algo, el botón para mandarlo.
    const soloOtro = armarMensajePresupuesto([], otro);
    return (
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div data-vacio className="max-w-xl">
          {region}
          {avisoDescartados}
          <p className="mt-5 text-lg text-ow-black/80">{textoWeb(PRESUPUESTO.vacio)}</p>
          <Link href="/catalogos" className={`${btn.black} mt-7`}>
            {PRESUPUESTO.verCatalogos}
          </Link>
          <ComoPedirCorto className="mt-14" />
        </div>
        <aside className="self-start sm:rounded-3xl sm:bg-ow-paper-soft sm:p-9">
          <CampoOtro otro={otro} />
          {otro.trim() && (
            <>
              <Enviar texto={soloOtro.texto} filas={[]} />
              <div className="mt-4">
                <CopiarLista texto={soloOtro.completo} />
              </div>
            </>
          )}
        </aside>
      </div>
    );
  }

  const { texto, nivel, completo } = armarMensajePresupuesto(
    grupos.map((g) => ({
      catalogo: g.titulo,
      lineas: g.filas.map((f) => ({ cantidad: f.cantidad, nombre: f.producto.nombre, codigo: f.codigo, color: f.color })),
    })),
    otro,
  );

  return (
    <>
      {region}
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">{textoWeb(PRESUPUESTO.bajada)}</p>
      {filas.some((f) => !f.color && f.producto.colores.length > 0) && (
        <p className="mt-3 max-w-2xl text-ow-gray">{textoWeb(PRESUPUESTO.aDefinirAyuda)}</p>
      )}
      {/* Qué pasa después de mandarlo: la página con los cinco pasos. */}
      <Link href="/como-pedir" className={`${link} mt-2`}>
        {COMO_PEDIR.linkPagina}
        <Icon name="flecha-derecha" size={18} />
      </Link>
      {avisoDescartados}

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        {/* La fila se arma según el ancho de esta columna (a 1024 px es angosta: va apilada, como en el celular). */}
        <div className="space-y-12 @container">
          {grupos.map((g) => (
            <section key={g.catalogo} aria-labelledby={`presupuesto-${g.catalogo}`}>
              <Titular id={`presupuesto-${g.catalogo}`} className="text-[clamp(1.6rem,3vw,2.25rem)]">
                {`${g.titulo}.`}
              </Titular>
              <ul className="mt-5 border-t-2 border-ow-black">
                {g.filas.map((f, i) => {
                  const hermanas = g.filas.filter((h) => h.codigo === f.codigo);
                  return (
                    <FilaPresupuesto
                      key={`${f.codigo}|${f.color}`}
                      fila={f}
                      hermanas={hermanas}
                      ultima={g.filas.findLastIndex((h) => h.codigo === f.codigo) === i}
                      anunciar={setAnuncio}
                    />
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* En el celular va sin tarjeta, a todo el ancho (así el botón entra en una línea y no se pega a la franja de abajo); desde 640 px, una tarjeta. */}
        <aside className="self-start sm:rounded-3xl sm:bg-ow-paper-soft sm:p-9 lg:sticky lg:top-24">
          {enviado && (
            <div role="status" className="mb-7 border-b-2 border-ow-black pb-6">
              <p className="flex items-start gap-3 font-display leading-snug font-bold">
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-ow-yellow">
                  <Icon name="check" size={16} strokeWidth={2.5} />
                </span>
                {PRESUPUESTO.enviado}
              </p>
              <p className="mt-2 text-sm text-ow-gray">{textoWeb(PRESUPUESTO.enviadoAyuda)}</p>
            </div>
          )}
          <CampoOtro otro={otro} />
          {PRESUPUESTO.listaLarga[nivel] && (
            <p className="mt-4 text-sm text-ow-gray">{textoWeb(PRESUPUESTO.listaLarga[nivel])}</p>
          )}
          <Enviar texto={texto} filas={filas} />
          <div className="mt-4 flex flex-wrap items-center gap-x-6">
            <CopiarLista texto={completo} />
            <Vaciar />
          </div>
        </aside>
      </div>
    </>
  );
}
