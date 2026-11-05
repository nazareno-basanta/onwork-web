"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Titular from "@/components/Titular";
import { cn, textoWeb } from "@/lib/utils";

export type PasoLinea = { titulo: string; texto: string; maqueta: ReactNode };

/** Alto del header fijo. */
const HEADER = 64;

const menosMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Línea de tiempo de "Cómo pedir": los pasos uno debajo del otro, cada uno con
 * su número grande, su texto y su maqueta. A medida que se baja, la línea se
 * completa en amarillo (la única animación de la sección): un paso queda
 * activo cuando su comienzo pasa por la mitad de la pantalla, y los
 * anteriores, completos.
 * - En la compu, la línea va arriba, fija debajo del header mientras se
 *   recorren los pasos, con los números y los títulos (cada uno lleva a su paso).
 * - En el celular, es vertical, a la izquierda, con un punto por paso.
 * El scroll es el normal: no se frena ni se "clava" la sección.
 * Con menos movimiento, la línea está completa desde el principio.
 */
export default function LineaDeTiempo({
  pasos,
  etiqueta,
  nivelTitulo = "h3",
  className,
}: {
  pasos: PasoLinea[];
  etiqueta: string;
  /** H3 debajo del titular de la sección (Inicio); H2 si arriba está el H1 de la página (/como-pedir). */
  nivelTitulo?: "h2" | "h3";
  className?: string;
}) {
  const barra = useRef<HTMLElement>(null);
  const lista = useRef<HTMLOListElement>(null);
  const pista = useRef<HTMLSpanElement>(null);
  const relleno = useRef<HTMLSpanElement>(null);
  const rellenoVertical = useRef<HTMLSpanElement>(null);
  const [activo, setActivo] = useState(-1);
  const [completa, setCompleta] = useState(false);

  useEffect(() => {
    const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      const items = Array.from(lista.current?.children ?? []).filter((el) => el.tagName === "LI");
      if (!items.length) return;
      const mitad = window.innerHeight / 2;
      let actual = -1;
      let avance = 0;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top > mitad) return;
        actual = i;
        avance = i + Math.min(1, (mitad - r.top) / r.height);
      });
      const quieta = preferencia.matches;
      setCompleta(quieta);
      setActivo(actual);
      // Arriba (compu): cada paso es un quinto de la línea.
      // (Tailwind 4 escala con la propiedad `scale`, no con `transform`.)
      if (relleno.current) relleno.current.style.scale = `${quieta ? 1 : avance / items.length} 1`;
      // A la izquierda (celular): la línea va del primer punto al final del último paso.
      const p = pista.current?.getBoundingClientRect();
      if (rellenoVertical.current && p) {
        const v = quieta ? 1 : Math.min(1, Math.max(0, (mitad - p.top) / p.height));
        rellenoVertical.current.style.scale = `1 ${v}`;
      }
    };
    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    preferencia.addEventListener("change", alMover);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      preferencia.removeEventListener("change", alMover);
    };
  }, []);

  // Desde la barra de números: baja hasta el paso (con el scroll suave) y le pasa el foco.
  const ir = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
    const paso = document.getElementById(`paso-${i + 1}`);
    if (!paso) return;
    e.preventDefault();
    const y = paso.getBoundingClientRect().top + window.scrollY - HEADER - (barra.current?.offsetHeight ?? 0);
    if (menosMovimiento()) window.scrollTo(0, y);
    else window.dispatchEvent(new CustomEvent("ow:scroll-to", { detail: y }));
    paso.focus({ preventScroll: true });
  };

  return (
    <div className={className}>
      <nav ref={barra} aria-label={etiqueta} className="sticky top-16 z-20 hidden bg-ow-black lg:block">
        <div className="container-ow">
          <ol className="grid grid-cols-5 pt-5 pb-4">
            {pasos.map((paso, i) => {
              const hecho = completa || i <= activo;
              return (
                <li key={paso.titulo} className="pr-4">
                  <a
                    href={`#paso-${i + 1}`}
                    onClick={(e) => ir(e, i)}
                    aria-current={i === activo ? "step" : undefined}
                    className="group flex items-center gap-3 rounded-full font-display text-sm leading-tight font-bold"
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border-2 tabular-nums transition-colors duration-300 ease-ow motion-reduce:transition-none",
                        hecho
                          ? "border-ow-yellow bg-ow-yellow text-ow-black"
                          : "border-white/30 text-white/70 group-hover:border-white group-hover:text-white",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-balance transition-colors duration-300 ease-ow group-hover:text-white motion-reduce:transition-none",
                        i === activo ? "text-white" : "text-white/60",
                      )}
                    >
                      {paso.titulo.replace(/[.?!]$/, "")}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
          <span aria-hidden="true" className="relative block h-0.5 overflow-hidden rounded-full bg-white/15">
            <span ref={relleno} className="absolute inset-0 origin-left scale-x-0 bg-ow-yellow" />
          </span>
        </div>
      </nav>

      <div className="container-ow">
        <ol ref={lista} className="relative mt-4 lg:mt-0">
          {/* La línea vertical del celular, del primer punto al final. */}
          <span ref={pista} aria-hidden="true" className="absolute top-7 bottom-0 left-[7px] w-0.5 rounded-full bg-white/15 lg:hidden">
            <span ref={rellenoVertical} className="absolute inset-0 origin-top scale-y-0 rounded-full bg-ow-yellow" />
          </span>

          {pasos.map((paso, i) => {
            const hecho = completa || i <= activo;
            return (
              <li
                key={paso.titulo}
                id={`paso-${i + 1}`}
                tabIndex={-1}
                className="relative grid gap-8 pb-20 pl-10 last:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:py-16 lg:pl-0 lg:last:pb-16 xl:gap-20"
              >
                {/* El punto del paso en la línea del celular. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-[1.375rem] left-0 size-4 rounded-full md:top-7 border-2 transition-colors duration-300 ease-ow motion-reduce:transition-none lg:hidden",
                    hecho ? "border-ow-yellow bg-ow-yellow" : "border-white/40 bg-ow-black",
                  )}
                />
                <div>
                  <p aria-hidden="true" className="font-display text-6xl leading-none font-extrabold text-ow-yellow tabular-nums md:text-7xl">
                    {i + 1}
                  </p>
                  <Titular as={nivelTitulo} className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] !leading-tight">
                    {paso.titulo}
                  </Titular>
                  <p className="mt-3 max-w-md text-lg text-pretty text-white/85 lg:max-w-xl">{textoWeb(paso.texto)}</p>
                </div>
                <div className="flex justify-center lg:justify-end">{paso.maqueta}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
