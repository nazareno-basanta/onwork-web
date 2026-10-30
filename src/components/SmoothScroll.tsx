"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger.
 * No dibuja nada: solo "enchufa" el scroll premium a toda la web.
 * Se desactiva solo si la persona pidió menos movimiento en su sistema.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // El menú del celular frena el scroll mientras está abierto.
    const onLock = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("ow:scroll-lock", onLock);

    return () => {
      window.removeEventListener("ow:scroll-lock", onLock);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de página, volver arriba sin animación.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
