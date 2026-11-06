"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ID_CAMPO_BUSCAR } from "@/components/BotonBuscar";
import Icon from "@/components/Icon";
import TarjetaProducto from "@/components/catalogo/TarjetaProducto";
import { CATALOGOS_HUB, CATALOGO_PAGINA } from "@/data/catalogos";
import { PRESUPUESTO } from "@/data/presupuesto";
import type { LugarBuscable, ProductoBuscable } from "@/data/productos";
import { normalizar, ordenar } from "@/lib/buscar";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { urlCatalogo } from "@/lib/rutas";
import { whatsappUrl } from "@/lib/site";
import { btn } from "@/lib/ui";

const TEXTOS = CATALOGOS_HUB.buscador;
// Con menos letras traería medio catálogo.
const MINIMO = 2;

const link =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";

const urlLugar = (l: LugarBuscable) => `${urlCatalogo(l.catalogo)}${l.seccion ? `#${l.seccion.id}` : ""}`;
const nombreLugar = (l: LugarBuscable) => (l.seccion ? `${l.seccion.nombre} (${l.titulo})` : l.titulo);
const dondeEsta = (lugares: LugarBuscable[]) =>
  lugares
    .map((l) => (l.seccion ? `la sección ${l.seccion.nombre} de ${l.titulo}` : `el catálogo ${l.titulo}`))
    .join(" y ");

/**
 * Buscador de productos de todos los catálogos, en el navegador (no espera al
 * servidor): busca por nombre, tipo, sección, código, catálogo o descripción,
 * sin importar tildes, y entiende sinónimos ("lapicera") y plurales (ver
 * lib/buscar.ts). Si lo buscado está en un catálogo que va solo en PDF
 * (Cintas, Llaveros), lo dice; si no está, ofrece sumarlo a "Otro" del
 * presupuesto o escribir por WhatsApp: lo que no está, se consigue.
 * La búsqueda queda en la dirección (?q=…), así al volver de un producto sigue ahí.
 */
export default function BuscadorProductos({ productos, lugares }: { productos: ProductoBuscable[]; lugares: LugarBuscable[] }) {
  const idResultados = useId();
  const id = ID_CAMPO_BUSCAR;
  const campo = useRef<HTMLInputElement>(null);
  const [texto, setTexto] = useState("");

  // Con la lupa del header (/catalogos#buscar), el cursor queda en el campo.
  useEffect(() => {
    if (window.location.hash === "#buscar") campo.current?.focus({ preventScroll: true });
  }, []);

  // Al volver de un producto (o con un link a /catalogos?q=…), la búsqueda sigue escrita.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- se lee una sola vez, al llegar
    if (q) setTexto(q);
  }, []);

  const buscado = texto.trim();
  const activo = normalizar(buscado).length >= MINIMO;
  const resultados = useMemo(() => (activo ? ordenar(productos, buscado) : []), [activo, buscado, productos]);

  // Catálogos o secciones donde está lo buscado (sin repetir las secciones de un catálogo que ya coincide entero).
  const enLugares = useMemo(() => {
    if (!activo) return [];
    // En el texto de cada sección (pesa 1) solo cuentan palabras enteras.
    const todos = ordenar(lugares, buscado, 2);
    const enteros = new Set(todos.filter((l) => !l.seccion).map((l) => l.catalogo));
    const sinRepetir = todos.filter((l) => !l.seccion || !enteros.has(l.catalogo));
    // Con productos, solo interesan los que están solo en el PDF ("También en:").
    return (resultados.length > 0 ? sinRepetir.filter((l) => l.soloPdf) : sinRepetir).slice(0, 3);
  }, [activo, buscado, lugares, resultados.length]);

  // Para lectores de pantalla, el resultado se anuncia cuando se deja de escribir (no con cada letra).
  const [anuncio, setAnuncio] = useState("");
  useEffect(() => {
    const espera = setTimeout(
      () =>
        setAnuncio(
          !activo
            ? ""
            : resultados.length > 0
              ? TEXTOS.resultados(resultados.length, buscado)
              : enLugares.length > 0
                ? TEXTOS.enCatalogo(dondeEsta(enLugares))
                : TEXTOS.sinResultados(buscado),
        ),
      700,
    );
    return () => clearTimeout(espera);
  }, [activo, buscado, resultados.length, enLugares]);

  // Para saber qué busca la gente (sobre todo lo que no encuentra): un evento
  // cuando deja de escribir.
  useEffect(() => {
    if (!activo) return;
    const espera = setTimeout(() => medir("search", { search_term: buscado, resultados: resultados.length }), 1200);
    return () => clearTimeout(espera);
  }, [activo, buscado, resultados.length]);

  const cambiar = (valor: string) => {
    setTexto(valor);
    const url = new URL(window.location.href);
    if (valor.trim()) url.searchParams.set("q", valor);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  // "Sumalo a tu presupuesto": lo buscado pasa al campo "Otro" (sin borrar lo que ya tenía).
  const sumarAOtro = () => {
    const otro = presupuesto.leer().otro.trim();
    presupuesto.cambiarOtro((otro ? `${otro}, ${buscado}` : buscado).slice(0, 300));
  };

  const acciones = (
    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href="/presupuesto#presupuesto-otro" onClick={sumarAOtro} className={btn.black}>
        {PRESUPUESTO.sumarOtro}
      </Link>
      <a href={whatsappUrl(TEXTOS.mensaje(buscado))} target="_blank" rel="noopener noreferrer" className={link}>
        <Icon name="whatsapp" size={18} />
        {CATALOGO_PAGINA.botonWhatsApp}
      </a>
    </div>
  );

  return (
    <div id="buscar" className="mt-8 scroll-mt-28 md:mt-10">
      {/* Con "Buscar" en el teclado del celular, se cierra el teclado y quedan los resultados a la vista. */}
      <form role="search" onSubmit={(e) => (e.preventDefault(), campo.current?.blur())}>
        <label htmlFor={id} className="font-display text-lg leading-snug font-bold">
          {TEXTOS.etiqueta}
        </label>
        <div className="relative mt-3 max-w-2xl">
          <Icon name="buscar" size={22} className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ow-gray" />
          <input
            ref={campo}
            id={id}
            type="search"
            value={texto}
            onChange={(e) => cambiar(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && cambiar("")}
            placeholder={TEXTOS.ejemplo}
            autoComplete="off"
            enterKeyHint="search"
            className="h-14 w-full rounded-full border-2 border-ow-black bg-white pr-14 pl-14 text-base placeholder:text-ow-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ow-black md:text-lg [&::-webkit-search-cancel-button]:appearance-none"
          />
          {texto && (
            <button
              type="button"
              aria-label={TEXTOS.borrar}
              onClick={() => {
                cambiar("");
                campo.current?.focus();
              }}
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-ow-black transition-colors duration-300 ease-ow hover:bg-ow-paper-soft"
            >
              <Icon name="cerrar" size={18} />
            </button>
          )}
        </div>
      </form>

      <p className="sr-only" aria-live="polite">
        {anuncio}
      </p>

      {activo && (
        <section aria-labelledby={`${idResultados}-resultados`} className="mt-6">
          <h2 id={`${idResultados}-resultados`} className="sr-only">
            {TEXTOS.resultadosTitulo}
          </h2>

          {resultados.length > 0 ? (
            <>
              <p className="font-display font-bold">{TEXTOS.resultados(resultados.length, buscado)}</p>
              {enLugares.length > 0 && (
                <p className="mt-1 flex flex-wrap items-center gap-x-4 text-sm text-ow-black/80">
                  {TEXTOS.tambienEn}
                  {enLugares.map((l) => (
                    <Link key={urlLugar(l)} href={urlLugar(l)} className={link}>
                      {nombreLugar(l)}
                    </Link>
                  ))}
                </p>
              )}
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                {resultados.map((p) => (
                  <li key={p.codigo}>
                    <TarjetaProducto producto={p} />
                  </li>
                ))}
              </ul>
            </>
          ) : enLugares.length > 0 ? (
            <div className="max-w-2xl rounded-3xl bg-ow-paper-soft px-7 py-6 md:px-9">
              <p className="font-display text-lg font-bold">{TEXTOS.enCatalogo(dondeEsta(enLugares))}</p>
              <p className="mt-1.5 text-ow-black/80">{TEXTOS.enCatalogoTexto}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-5">
                {enLugares.map((l) => (
                  <Link key={urlLugar(l)} href={urlLugar(l)} className={link}>
                    {`Ver ${nombreLugar(l)}`}
                    <Icon name="flecha-derecha" size={18} />
                  </Link>
                ))}
              </p>
              {acciones}
            </div>
          ) : (
            <div className="max-w-2xl rounded-3xl bg-ow-paper-soft px-7 py-6 md:px-9">
              <p className="font-display text-lg font-bold">{TEXTOS.sinResultados(buscado)}</p>
              <p className="mt-1.5 text-ow-black/80">{TEXTOS.loBuscamos}</p>
              {acciones}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
