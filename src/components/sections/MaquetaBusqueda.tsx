"use client";

/**
 * Maqueta corta de "¿No está en el catálogo? Lo buscamos." (Nachi,
 * 16/11/2026): un chat de WhatsApp de dos mensajes, como las maquetas de
 * "Cómo pedir" (Chat y Pantalla, de como-pedir/Maquetas.tsx) pero sin la
 * línea de tiempo completa. Los dos mensajes se escriben solos, uno después
 * del otro (el del cliente es el real: el mismo que manda el botón "Contanos
 * qué buscás", BUSQUEDAS.mensaje). Con menos movimiento, los dos ya están
 * escritos. Es decorativa para el lector de pantalla: el texto de la sección
 * ya dice lo mismo.
 */

import { useEffect, useRef, useState } from "react";
import { Chat } from "@/components/como-pedir/Maquetas";
import Burbuja, { Hora } from "@/components/como-pedir/Burbuja";
import { BUSQUEDAS } from "@/data/servicios";
import { cn } from "@/lib/utils";

/** Milisegundos por letra: a este ritmo, los dos mensajes tardan lo mismo por carácter. */
const MS_POR_LETRA = 16;
/** Pausa antes de que On Work empiece a responder, una vez que el cliente termina. */
const PAUSA = 500;

const espera = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Fase = "cliente" | "pausa" | "respuesta" | "listo";

export default function MaquetaBusqueda({ className }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState<Fase>("listo");
  const [letrasCliente, setLetrasCliente] = useState(BUSQUEDAS.mensaje.length);
  const [letrasRespuesta, setLetrasRespuesta] = useState(BUSQUEDAS.maqueta.respuesta.length);

  useEffect(() => {
    const el = caja.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    let cancelado = false;
    let cuadro = 0;

    const escribir = (texto: string, setLetras: (n: number) => void) =>
      new Promise<void>((resolve) => {
        const inicio = performance.now();
        const duracion = texto.length * MS_POR_LETRA;
        const paso = (t: number) => {
          if (cancelado) return;
          const avance = Math.min(1, (t - inicio) / duracion);
          setLetras(Math.round(avance * texto.length));
          if (avance < 1) cuadro = requestAnimationFrame(paso);
          else resolve();
        };
        cuadro = requestAnimationFrame(paso);
      });

    setFase("cliente");
    setLetrasCliente(0);
    setLetrasRespuesta(0);

    const observador = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observador.disconnect();
        (async () => {
          await escribir(BUSQUEDAS.mensaje, setLetrasCliente);
          if (cancelado) return;
          setFase("pausa");
          await espera(PAUSA);
          if (cancelado) return;
          setFase("respuesta");
          await escribir(BUSQUEDAS.maqueta.respuesta, setLetrasRespuesta);
          if (cancelado) return;
          setFase("listo");
        })();
      },
      { threshold: 0.6 },
    );
    observador.observe(el);
    return () => {
      cancelado = true;
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, []);

  const clienteListo = fase !== "cliente";
  const respuestaEmpezada = fase === "respuesta" || fase === "listo";
  const respuestaListo = fase === "listo";

  return (
    <div ref={caja} aria-hidden="true" className={cn("flex justify-center", className)}>
      <Chat>
        <Burbuja mia>
          <span className="relative block whitespace-pre-line">
            <span className="invisible">{BUSQUEDAS.mensaje}</span>
            <span className="absolute inset-0">
              {clienteListo ? BUSQUEDAS.mensaje : BUSQUEDAS.mensaje.slice(0, letrasCliente)}
              {!clienteListo && <span className="ml-px inline-block h-[1.05em] w-0.5 translate-y-[0.18em] bg-ow-black" />}
            </span>
          </span>
          <Hora hora={BUSQUEDAS.maqueta.hora} visto className={cn("transition-opacity duration-300 ease-ow", !clienteListo && "opacity-0")} />
        </Burbuja>
        <Burbuja className={cn("transition-opacity duration-300 ease-ow", !respuestaEmpezada && "opacity-0")}>
          <span className="relative block whitespace-pre-line">
            <span className="invisible">{BUSQUEDAS.maqueta.respuesta}</span>
            <span className="absolute inset-0">
              {respuestaListo ? BUSQUEDAS.maqueta.respuesta : BUSQUEDAS.maqueta.respuesta.slice(0, letrasRespuesta)}
              {respuestaEmpezada && !respuestaListo && (
                <span className="ml-px inline-block h-[1.05em] w-0.5 translate-y-[0.18em] bg-ow-black" />
              )}
            </span>
          </span>
          <Hora hora={BUSQUEDAS.maqueta.hora} className={cn("transition-opacity duration-300 ease-ow", !respuestaListo && "opacity-0")} />
        </Burbuja>
      </Chat>
    </div>
  );
}
