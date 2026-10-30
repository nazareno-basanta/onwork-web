"use client";

/**
 * Probador de marca del hero. La persona escribe el nombre de su marca y lo
 * ve aplicado en vivo sobre los productos ("Tu marca, en cada sorbo."); el
 * botón de WhatsApp sale con ese nombre en el mensaje.
 *
 * Los productos rotan solos hasta que la persona interactúa (escribe, elige
 * un producto o pasa el mouse por el escenario). Con menos movimiento no
 * rotan ni se animan.
 *
 * Devuelve dos bloques de la grilla del hero: el escenario y el formulario.
 */

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import WhatsAppLink from "@/components/WhatsAppLink";
import RotatingText from "@/components/ui/RotatingText";
import { HERO, PROBADOR, PRODUCTOS_HERO as PRODUCTOS } from "@/data/inicio";
import { MENSAJE_GENERAL } from "@/lib/site";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";
import MarcaImpresa from "./MarcaImpresa";
import { DIBUJOS } from "./Productos";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVALO = 3400;

export default function Probador() {
  const reduce = useReducedMotion();
  const campoId = useId();
  const [marca, setMarca] = useState("");
  const [indice, setIndice] = useState(0);
  const [interactuo, setInteractuo] = useState(false);
  const [pausa, setPausa] = useState(false);
  const listaRef = useRef<HTMLUListElement>(null);

  // En el celular la fila de productos se desplaza sola hasta el activo
  // (solo en horizontal: la página no se mueve).
  useEffect(() => {
    const lista = listaRef.current;
    const activo = lista?.children[indice] as HTMLElement | undefined;
    if (!lista || !activo || lista.scrollWidth <= lista.clientWidth) return;
    const destino = activo.offsetLeft - (lista.clientWidth - activo.offsetWidth) / 2;
    lista.scrollTo({ left: destino, behavior: reduce ? "auto" : "smooth" });
  }, [indice, reduce]);

  useEffect(() => {
    if (reduce || interactuo || pausa) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndice((i) => (i + 1) % PRODUCTOS.length);
    }, INTERVALO);
    return () => window.clearInterval(id);
  }, [reduce, interactuo, pausa]);

  const producto = PRODUCTOS[indice];
  const dibujo = DIBUJOS[producto.id];
  const limpia = marca.trim();
  const impresa = (limpia || PROBADOR.ejemplo).toLocaleUpperCase("es-AR");
  const sujeto = limpia || PROBADOR.tuMarca;
  const frase = `${sujeto}, en cada ${producto.palabra}.`;

  return (
    <>
      {/* Escenario */}
      <div className="[grid-area:escenario]" onPointerEnter={() => setPausa(true)} onPointerLeave={() => setPausa(false)}>
        <div className="rounded-[2rem] bg-ow-paper-soft p-5 shadow-apoyado sm:p-7">
          <p
            className="font-display text-[clamp(1.35rem,3.2vw,2.1rem)] leading-tight font-extrabold tracking-tight"
            aria-live={interactuo ? "polite" : "off"}
          >
            <span className="sr-only">{frase}</span>
            <span aria-hidden>
              <span className="break-words">{sujeto}</span>, en cada{" "}
              <RotatingText
                index={indice}
                words={PRODUCTOS.map((p) => p.palabra)}
                className="rounded-[0.18em] bg-ow-yellow px-[0.16em] align-bottom"
              />
              <span className="text-ow-yellow">.</span>
            </span>
          </p>

          <div className="relative mx-auto mt-2 aspect-square w-full max-w-[26rem] [container-type:inline-size]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={producto.id}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, x: 48, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -48, rotate: -3 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden focusable="false">
                  {dibujo.dibujo}
                </svg>
                <MarcaImpresa id={producto.id} producto={dibujo} texto={impresa} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3">
            <p className="sr-only" id={`${campoId}-productos`}>
              {PROBADOR.elegir}
            </p>
            <ul
              ref={listaRef}
              aria-labelledby={`${campoId}-productos`}
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {PRODUCTOS.map((p, i) => (
                <li key={p.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={i === indice}
                    onClick={() => {
                      setIndice(i);
                      setInteractuo(true);
                    }}
                    className={cn(
                      "cursor-target min-h-11 rounded-full border-2 px-4 font-display text-sm font-bold transition-colors duration-300 ease-ow",
                      i === indice
                        ? "border-ow-black bg-ow-black text-white"
                        : "border-ow-black/20 hover:border-ow-black",
                    )}
                  >
                    {p.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Formulario y acciones */}
      <div className="[grid-area:form]">
        <label htmlFor={campoId} className="font-display text-sm font-bold">
          {PROBADOR.label}
        </label>
        <input
          id={campoId}
          type="text"
          value={marca}
          maxLength={PROBADOR.largoMaximo}
          autoComplete="organization"
          spellCheck={false}
          placeholder={PROBADOR.placeholder}
          onChange={(e) => {
            setMarca(e.target.value);
            setInteractuo(true);
          }}
          className="mt-2 block min-h-14 w-full max-w-md rounded-full border-2 border-ow-black bg-white px-6 font-display text-lg font-bold placeholder:font-semibold placeholder:text-ow-gray focus:outline-none focus-visible:ring-4 focus-visible:ring-ow-yellow"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppLink tone="yellow" message={limpia ? PROBADOR.mensaje(limpia) : MENSAJE_GENERAL}>
            {HERO.botonWhatsApp}
          </WhatsAppLink>
          <Link href="/catalogos" className={btn.line}>
            {HERO.botonCatalogos}
          </Link>
        </div>
      </div>
    </>
  );
}
