"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Scroll suave (Lenis). No dibuja nada: solo "enchufa" el scroll suave a toda
 * la web. Se desactiva si la persona pidió menos movimiento en su sistema.
 * (Ya no se sincroniza con GSAP: ninguna animación del sitio lo usa, así la
 * página carga más liviana.)
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
    lenisRef.current = lenis;

    // El menú del celular frena el scroll mientras está abierto.
    const onLock = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("ow:scroll-lock", onLock);

    // La barra de secciones de los catálogos pide bajar hasta una sección.
    const onScrollTo = (e: Event) => lenis.scrollTo((e as CustomEvent<number>).detail);
    window.addEventListener("ow:scroll-to", onScrollTo);

    return () => {
      window.removeEventListener("ow:scroll-lock", onLock);
      window.removeEventListener("ow:scroll-to", onScrollTo);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de página, volver arriba sin animación (salvo que el link
  // apunte a una parte de la página, como /catalogos/drinkware#seccion-termos).
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
