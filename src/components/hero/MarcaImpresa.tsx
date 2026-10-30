"use client";

/**
 * La marca que escribe la persona, "impresa" sobre el producto con el sistema
 * de mockups de On Work: Montserrat 800 en mayúsculas y cada O como la diana
 * del logo (aro + punto). El tamaño se ajusta al área de impresión.
 *
 * Al cambiar de producto, una rasqueta cruza el área y deja la marca, como
 * una pasada de serigrafía (así empezó On Work en 1990).
 */

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Dibujo } from "./Productos";

const EASE = [0.22, 1, 0.36, 1] as const;

function Letras({ texto, punto }: { texto: string; punto: string }) {
  return (
    <>
      {Array.from(texto).map((letra, i) =>
        letra === "O" ? (
          <span
            key={i}
            aria-hidden
            className="relative mx-[0.02em] inline-block size-[0.74em] rounded-full border-[0.15em] border-current"
          >
            <span className="absolute inset-[0.13em] rounded-full" style={{ background: punto }} />
          </span>
        ) : (
          <span key={i}>{letra === " " ? " " : letra}</span>
        ),
      )}
    </>
  );
}

export default function MarcaImpresa({
  id,
  producto,
  texto,
}: {
  /** Cambia con cada producto: vuelve a pasar la rasqueta. */
  id: string;
  producto: Dibujo;
  texto: string;
}) {
  const reduce = useReducedMotion();
  const { area } = producto;
  // Unidades del lienzo (400) a % del contenedor y a cqw (1 cqw = 4 unidades).
  const pct = (v: number) => `${(v / 400) * 100}%`;
  const anchoCqw = area.w / 4;
  const altoCqw = area.h / 4;
  const largo = Math.max(texto.length, 3);
  const fuente = Math.min(altoCqw * 0.66, anchoCqw / (largo * 0.66));

  // Siempre en una línea: si la marca queda más ancha que el área, se achica.
  const areaRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLSpanElement>(null);
  const [escala, setEscala] = useState(1);
  useLayoutEffect(() => {
    const disponible = (areaRef.current?.clientWidth ?? 0) * 0.92;
    const ancho = textoRef.current?.scrollWidth ?? 0;
    setEscala(ancho > disponible && ancho > 0 ? disponible / ancho : 1);
  }, [texto, id, fuente]);

  return (
    <div
      ref={areaRef}
      aria-hidden
      className="absolute flex items-center justify-center overflow-hidden"
      style={{ left: pct(area.x), top: pct(area.y), width: pct(area.w), height: pct(area.h) }}
    >
      <motion.p
        key={id}
        className="font-display leading-none font-extrabold"
        style={{ color: producto.tinta, fontSize: `${fuente}cqw`, letterSpacing: "-0.01em" }}
        initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      >
        <span
          ref={textoRef}
          className="inline-flex flex-nowrap items-baseline whitespace-nowrap"
          style={{ transform: escala < 1 ? `scale(${escala})` : undefined }}
        >
          <Letras texto={texto} punto={producto.punto} />
        </span>
      </motion.p>

      {/* La rasqueta: cruza el área una vez por producto. */}
      {!reduce && (
        <motion.span
          key={`rasqueta-${id}`}
          className="absolute top-[-10%] bottom-[-10%] w-[3cqw] rounded-full"
          style={{ background: producto.tinta === "#ffffff" ? "var(--ow-yellow)" : "var(--ow-black)" }}
          initial={{ left: "-6%", opacity: 0 }}
          animate={{ left: ["-6%", "102%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE, times: [0, 0.1, 0.9, 1] }}
        />
      )}
    </div>
  );
}
