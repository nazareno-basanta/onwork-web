"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import type { FotoProducto } from "@/data/productos";
import { cn } from "@/lib/utils";

const menosMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fotos de un producto: la grande se desliza de costado (con el dedo, el
 * trackpad o las flechas del teclado) y las miniaturas de abajo llevan a cada
 * una. En escritorio también hay flechas a los costados. Sin zoom: la foto
 * entra entera en el marco blanco.
 * (data-lenis-prevent-horizontal: el scroll suave de la página no se mete con
 * el deslizamiento de costado.)
 */
export default function GaleriaProducto({ fotos, nombre }: { fotos: FotoProducto[]; nombre: string }) {
  const [actual, setActual] = useState(0);
  const pista = useRef<HTMLDivElement>(null);
  const tira = useRef<HTMLUListElement>(null);
  const varias = fotos.length > 1;
  // Mientras la pista se desliza hacia una foto elegida, el contador no sigue las fotos intermedias.
  const destino = useRef<number | null>(null);

  // La foto que se ve sale de cuánto se deslizó la pista.
  useEffect(() => {
    const el = pista.current;
    if (!el || !varias) return;
    let cuadro = 0;
    const alMover = () => {
      if (cuadro) return;
      cuadro = requestAnimationFrame(() => {
        cuadro = 0;
        const i = Math.min(fotos.length - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth)));
        if (destino.current !== null) {
          if (i !== destino.current) return;
          destino.current = null;
        }
        setActual(i);
      });
    };
    // Si la persona la mueve a mano, el contador vuelve a seguirla.
    const aMano = () => {
      destino.current = null;
    };
    el.addEventListener("scroll", alMover, { passive: true });
    el.addEventListener("pointerdown", aMano);
    el.addEventListener("wheel", aMano, { passive: true });
    el.addEventListener("touchstart", aMano, { passive: true });
    return () => {
      cancelAnimationFrame(cuadro);
      el.removeEventListener("scroll", alMover);
      el.removeEventListener("pointerdown", aMano);
      el.removeEventListener("wheel", aMano);
      el.removeEventListener("touchstart", aMano);
    };
  }, [fotos.length, varias]);

  // La miniatura de la foto que se ve queda a la vista en la tira.
  useEffect(() => {
    const ul = tira.current;
    const li = ul?.children[actual] as HTMLElement | undefined;
    if (!ul || !li) return;
    const fuera = li.offsetLeft < ul.scrollLeft || li.offsetLeft + li.offsetWidth > ul.scrollLeft + ul.clientWidth;
    if (fuera) {
      ul.scrollTo({
        left: li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2,
        behavior: menosMovimiento() ? "auto" : "smooth",
      });
    }
  }, [actual]);

  const ir = (i: number) => {
    const el = pista.current;
    if (!el) return;
    const final = Math.min(fotos.length - 1, Math.max(0, i));
    el.scrollTo({ left: final * el.clientWidth, behavior: menosMovimiento() ? "auto" : "smooth" });
    destino.current = Math.round(el.scrollLeft / el.clientWidth) === final ? null : final;
    setActual(final);
  };

  // Al elegir un color en la página del producto, la galería va a su foto (SumarConColor avisa).
  const irA = useRef<(i: number) => void>(() => {});
  useEffect(() => {
    irA.current = ir;
  });
  useEffect(() => {
    const alElegir = (e: Event) => irA.current((e as CustomEvent<number>).detail);
    window.addEventListener("ow:ver-foto", alElegir);
    return () => window.removeEventListener("ow:ver-foto", alElegir);
  }, []);

  // En los extremos la flecha queda tenue pero no se desactiva del todo: así
  // el foco del teclado no se pierde al llegar a la última foto.
  const flecha =
    "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border-2 border-ow-black bg-ow-paper text-ow-black transition-[background-color,color,opacity] duration-300 ease-ow hover:bg-ow-black hover:text-white aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:bg-ow-paper aria-disabled:hover:text-ow-black pointer-fine:grid";

  // Miniaturas: una sola parada de Tab; las flechas del teclado pasan de una a otra.
  const alTeclado = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const destino =
      e.key === "ArrowRight" ? actual + 1 : e.key === "ArrowLeft" ? actual - 1 : e.key === "Home" ? 0 : e.key === "End" ? fotos.length - 1 : null;
    if (destino === null) return;
    e.preventDefault();
    const i = Math.min(fotos.length - 1, Math.max(0, destino));
    ir(i);
    tira.current?.querySelectorAll("button")[i]?.focus();
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={pista}
          data-lenis-prevent-horizontal
          data-vuelo-origen
          tabIndex={varias ? 0 : undefined}
          role={varias ? "region" : undefined}
          aria-label={varias ? `Fotos de ${nombre}` : undefined}
          className="flex aspect-square snap-x snap-mandatory overflow-x-auto rounded-3xl bg-white shadow-apoyado [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {fotos.map((f, i) => (
            <div key={f.src} className="relative w-full shrink-0 snap-center">
              <Image
                src={f.src}
                alt={varias ? `${nombre}, foto ${i + 1} de ${fotos.length}` : nombre}
                fill
                unoptimized
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                className="object-contain p-[7%]"
              />
            </div>
          ))}
        </div>

        {varias && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => ir(actual - 1)}
              aria-disabled={actual === 0 || undefined}
              className={cn(flecha, "left-4")}
            >
              <Icon name="flecha-izquierda" size={20} />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => ir(actual + 1)}
              aria-disabled={actual === fotos.length - 1 || undefined}
              className={cn(flecha, "right-4")}
            >
              <Icon name="flecha-derecha" size={20} />
            </button>
            <span
              aria-hidden
              className="absolute right-4 bottom-4 rounded-full bg-ow-black px-3 py-1.5 font-display text-xs font-bold tabular-nums text-white"
            >
              {actual + 1} / {fotos.length}
            </span>
            {/* Para lectores de pantalla: qué foto se ve. */}
            <p className="sr-only" aria-live="polite">{`Foto ${actual + 1} de ${fotos.length}`}</p>
          </>
        )}
      </div>

      {varias && (
        <ul
          ref={tira}
          data-lenis-prevent-horizontal
          onKeyDown={alTeclado}
          aria-label={`Miniaturas de ${nombre}`}
          className="mt-3 flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {fotos.map((f, i) => (
            <li key={f.src} className="shrink-0">
              <button
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                aria-current={i === actual ? "true" : undefined}
                tabIndex={i === actual ? 0 : -1}
                className={cn(
                  "relative block size-16 overflow-hidden rounded-xl border-2 bg-white transition-colors duration-300 ease-ow md:size-20",
                  i === actual ? "border-ow-black" : "border-ow-black/10 hover:border-ow-black/40",
                )}
              >
                <Image src={f.chica} alt="" fill unoptimized loading="lazy" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
