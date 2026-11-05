"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import Burbuja, { Hora } from "./Burbuja";

type Estado = "espera" | "escribe" | "listo";

/** Cuánto tarda en escribirse el mensaje (el texto entero, letra por letra). */
const DURACION = 2400;

/**
 * El mensaje del presupuesto en el chat del paso 2, que "se escribe" solo la
 * primera vez que aparece en pantalla: es el único gesto de las maquetas.
 * Al terminar aparecen la hora, el doble tilde y el archivo del logo.
 *
 * El texto completo está siempre (invisible) debajo del que se escribe, así el
 * globo tiene su tamaño final desde el principio y nada se mueve. Si ya se ve
 * al cargar la página, o con menos movimiento, queda escrito de entrada.
 */
export default function MensajeQueSeEscribe({ texto, hora, archivo }: { texto: string; hora: string; archivo: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("listo");
  const [letras, setLetras] = useState(texto.length);

  useEffect(() => {
    const el = caja.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setEstado("espera");
    setLetras(0);
    let cuadro = 0;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observador.disconnect();
        setEstado("escribe");
        const inicio = performance.now();
        const paso = (t: number) => {
          const avance = Math.min(1, (t - inicio) / DURACION);
          setLetras(Math.round(avance * texto.length));
          if (avance < 1) cuadro = requestAnimationFrame(paso);
          else setEstado("listo");
        };
        cuadro = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [texto]);

  const listo = estado === "listo";

  return (
    <div ref={caja} className="space-y-2">
      <Burbuja mia className={cn("transition-opacity duration-300 ease-ow", estado === "espera" && "opacity-0")}>
        <span className="relative block whitespace-pre-line">
          <span className="invisible">{texto}</span>
          <span className="absolute inset-0">
            {listo ? texto : texto.slice(0, letras)}
            {estado === "escribe" && (
              <span className="ml-px inline-block h-[1.05em] w-0.5 translate-y-[0.18em] bg-ow-black" />
            )}
          </span>
        </span>
        <Hora hora={hora} visto className={cn("transition-opacity duration-300 ease-ow", !listo && "opacity-0")} />
      </Burbuja>
      <Burbuja mia hora={hora} className={cn("transition-opacity duration-500 ease-ow", !listo && "opacity-0")}>
        <span className="flex items-center gap-2 font-display font-bold">
          <Icon name="documento" size={18} />
          {archivo}
        </span>
      </Burbuja>
    </div>
  );
}
