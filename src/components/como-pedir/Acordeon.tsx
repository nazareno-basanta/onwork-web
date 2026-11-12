"use client";

/**
 * "Cómo pedir" en el celular (Inicio), como acordeón (Nachi, 12/11/2026):
 * antes era una lista quieta con los cinco títulos. Los pasos van en vertical,
 * unidos por la línea; al tocar uno se abre su texto y su maqueta, y se cierra
 * el que estaba abierto. Arranca abierto el 1. La línea se completa en
 * amarillo hasta el paso abierto, como la barra de la compu.
 *
 * Si al abrir un paso su título quedó arriba, fuera de la pantalla (porque se
 * cerró uno largo de más arriba), la página baja hasta él.
 * Con menos movimiento, abre y cierra sin animación.
 */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Icon from "@/components/Icon";
import type { PasoLinea } from "@/components/como-pedir/LineaDeTiempo";
import { cn, textoWeb } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Alto del header fijo, más un poco de aire. */
const ARRIBA = 80;

export default function Acordeon({
  pasos,
  nivelTitulo = "h3",
  className,
}: {
  pasos: PasoLinea[];
  nivelTitulo?: "h2" | "h3";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useId();
  const [abierto, setAbierto] = useState<number | null>(0);
  const Titulo = nivelTitulo;

  const acomodar = (i: number) => {
    const boton = document.getElementById(`${base}-boton-${i}`);
    if (!boton) return;
    const top = boton.getBoundingClientRect().top;
    if (top >= ARRIBA) return;
    const y = top + window.scrollY - ARRIBA;
    if (reduce) window.scrollTo(0, y);
    else window.dispatchEvent(new CustomEvent("ow:scroll-to", { detail: y }));
  };

  return (
    <ol className={cn("relative", className)}>
      {pasos.map((paso, i) => {
        const abiertoEste = abierto === i;
        const hecho = abierto !== null && i <= abierto;
        const panel = `${base}-panel-${i}`;
        return (
          <li key={paso.titulo} className="relative pb-6 last:pb-0">
            {/* El tramo de línea hasta el próximo paso: amarillo si ya se pasó. */}
            {i < pasos.length - 1 && (
              <span aria-hidden="true" className="absolute top-8 bottom-0 left-[15px] w-0.5 overflow-hidden rounded-full bg-white/15">
                <span
                  className={cn(
                    "absolute inset-0 origin-top bg-ow-yellow transition-transform duration-500 ease-ow motion-reduce:transition-none",
                    abierto !== null && i < abierto ? "scale-y-100" : "scale-y-0",
                  )}
                />
              </span>
            )}

            <Titulo className="relative">
              <button
                id={`${base}-boton-${i}`}
                type="button"
                aria-expanded={abiertoEste}
                aria-controls={panel}
                onClick={() => setAbierto(abiertoEste ? null : i)}
                className="flex min-h-11 w-full items-center gap-4 rounded-sm text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-extrabold tabular-nums transition-colors duration-300 ease-ow motion-reduce:transition-none",
                    hecho ? "border-ow-yellow bg-ow-yellow text-ow-black" : "border-white/30 bg-ow-black text-white/70",
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-lg leading-tight font-bold transition-colors duration-300 ease-ow",
                    abiertoEste ? "text-white" : "text-white/75",
                  )}
                >
                  {paso.titulo.replace(/[.?!]$/, "")}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ease-ow",
                    abiertoEste ? "border-ow-yellow text-ow-yellow" : "border-white/30 text-white/70",
                  )}
                >
                  <Icon name={abiertoEste ? "menos" : "mas"} size={16} />
                </span>
              </button>
            </Titulo>

            <AnimatePresence initial={false}>
              {abiertoEste && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={`${base}-boton-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  // Solo al terminar de abrir (no cuando se cierra el anterior).
                  onAnimationComplete={(fin) => (fin as { height?: unknown }).height === "auto" && acomodar(i)}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pl-12">
                    <p className="text-pretty text-white/85">{textoWeb(paso.texto)}</p>
                    <div className="mt-6 flex justify-center">{paso.maqueta}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
