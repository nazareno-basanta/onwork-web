"use client";

import { useEffect, useRef, useState } from "react";
import { CATALOGO_PAGINA } from "@/data/catalogos";
import { cn } from "@/lib/utils";

type Seccion = { id: string; nombre: string };

// Alto del header fijo (h-16).
const HEADER = 64;

const menosMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pastillas con las secciones de un catálogo, fijas debajo del header mientras
 * se recorren los productos. La sección que se está viendo queda marcada (en
 * tinta) y, en el celular, la barra se desliza sola para que se vea.
 */
export default function NavSecciones({ secciones }: { secciones: Seccion[] }) {
  const [activa, setActiva] = useState(secciones[0]?.id);
  const barra = useRef<HTMLElement>(null);
  const lista = useRef<HTMLUListElement>(null);

  // Hasta dónde llega lo fijo (header + esta barra): una sección está activa
  // cuando su título pasó por debajo de esa línea.
  const tope = () => HEADER + (barra.current?.offsetHeight ?? 0);

  // Si se entra con un link a una sección (#seccion-termos), se baja hasta
  // ella dejando lugar para el header y esta barra.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = secciones.some((s) => s.id === id) ? document.getElementById(id) : null;
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - tope() - 16);
  }, [secciones]);

  useEffect(() => {
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      const linea = tope() + 24;
      let actual = secciones[0]?.id;
      for (const s of secciones) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= linea) actual = s.id;
      }
      setActiva(actual);
    };
    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [secciones]);

  // En el celular, la pastilla activa se centra dentro de la barra.
  useEffect(() => {
    const ul = lista.current;
    const li = ul?.querySelector<HTMLElement>(`[data-seccion="${activa}"]`);
    if (!ul || !li || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({
      left: li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2,
      behavior: menosMovimiento() ? "auto" : "smooth",
    });
  }, [activa]);

  const ir = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - tope() - 16;
    // El scroll suave (SmoothScroll) hace el recorrido; con menos movimiento, salta.
    if (menosMovimiento()) window.scrollTo(0, y);
    else window.dispatchEvent(new CustomEvent("ow:scroll-to", { detail: y }));
    history.replaceState(null, "", `#${id}`);
    // El foco va al título de la sección, para seguir con el teclado desde ahí.
    el.querySelector<HTMLElement>("[data-titulo-seccion]")?.focus({ preventScroll: true });
    setActiva(id);
  };

  return (
    <nav
      ref={barra}
      aria-label={CATALOGO_PAGINA.navSecciones}
      className="sticky top-16 z-30 border-b border-ow-black/10 bg-ow-paper"
    >
      {/* En el celular se desliza de costado; desde tablet, si no entran, pasan a dos líneas. */}
      <ul
        ref={lista}
        data-lenis-prevent-horizontal
        className="container-ow flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] md:flex-wrap [&::-webkit-scrollbar]:hidden"
      >
        {secciones.map((s) => {
          const esActiva = s.id === activa;
          return (
            <li key={s.id} data-seccion={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => ir(e, s.id)}
                aria-current={esActiva ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border-2 px-4 font-display text-sm font-bold whitespace-nowrap transition-colors duration-300 ease-ow",
                  esActiva
                    ? "border-ow-black bg-ow-black text-white"
                    : "border-ow-black/15 text-ow-black hover:border-ow-black",
                )}
              >
                {s.nombre}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
