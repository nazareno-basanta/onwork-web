"use client";

/**
 * Hero del Inicio: "dar en el blanco" con el scroll.
 *
 * Arranca simple: el titular enorme con la O de "notar" dibujada como la
 * diana del logo (aro tinta, punto amarillo). Al bajar, la pantalla queda fija
 * y la diana crece desde esa O hasta atravesar el aro y entrar en el punto
 * amarillo, que llena la pantalla. Adentro aparece "Tu marca, en cada ___." y
 * la palabra cambia con el scroll. Después la página sigue normal.
 *
 * La diana que crece es un SVG del tamaño del escenario (siempre nítido).
 * Con menos movimiento no hay scroll fijo: el titular queda quieto y la frase
 * va debajo, en una franja amarilla.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import WhatsAppLink from "@/components/WhatsAppLink";
import RotatingText from "@/components/ui/RotatingText";
import { FRASE_ROTATIVA, HERO } from "@/data/inicio";
import { SITE } from "@/lib/site";
import { btn } from "@/lib/ui";
import { sinViuda } from "@/lib/utils";

// Proporciones de la O del logo, relativas a su radio R:
// aro de 0,6R a R (centro del trazo en 0,8R) y punto amarillo de 0,3R.
const ARO_MEDIO = 0.8;
const ARO_ANCHO = 0.4;
const PUNTO = 0.3;

// Tramos del scroll (0 = arranca el hero fijo, 1 = se suelta).
const ZOOM: [number, number] = [0.04, 0.56];
const FRASE: [number, number] = [0.56, 0.64];
const PALABRAS: [number, number] = [0.64, 0.97];

type Geo = { cx: number; cy: number; sx: number; sy: number; R: number; maxEscala: number };

// Mientras crece, la diana viaja desde la O hasta el centro de la pantalla.
const CENTRADO: [number, number] = [0.04, 0.4];

const tramo = (v: number, [a, b]: [number, number]) => Math.min(1, Math.max(0, (v - a) / (b - a)));

/** Titular con la O de la palabra elegida como diana. El texto real queda para lectores y Google. */
function Titular({ slot }: { slot?: ReactNode }) {
  const { titulo, palabraDiana } = HERO;
  const i = titulo.indexOf(palabraDiana);
  const antes = titulo.slice(0, i).trimEnd();
  const o = palabraDiana.toLowerCase().indexOf("o");
  const pre = palabraDiana.slice(0, o);
  const post = palabraDiana.slice(o + 1);

  return (
    <h1 className="font-display text-[clamp(2.25rem,9.6vw,8.25rem)] leading-[0.92] font-extrabold tracking-tight">
      {antes}
      {" "}
      <span className="whitespace-nowrap">
        <span className="sr-only">{palabraDiana}</span>
        {/* Las letras visibles van como contenido CSS: no se duplican en el texto de la página. */}
        <span aria-hidden data-l={pre} className="before:content-[attr(data-l)]" />
        {slot}
        <span aria-hidden data-l={post} className="before:content-[attr(data-l)]" />
      </span>
      <span className="text-ow-yellow">.</span>
    </h1>
  );
}

/** La O-diana dentro del titular (aro tinta y punto amarillo, en CSS). */
function DianaLetra({ oculta, refSlot }: { oculta?: boolean; refSlot?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={refSlot}
      aria-hidden
      className="relative mx-[0.015em] inline-block size-[0.74em]"
      style={{ visibility: oculta ? "hidden" : "visible" }}
    >
      <span className="absolute inset-0 rounded-full border-[0.148em] border-current" />
      <span className="absolute inset-[35%] rounded-full bg-ow-yellow" />
    </span>
  );
}

function Pie() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-md">
        <p className="text-lg leading-relaxed text-ow-black/80">{sinViuda(HERO.bajada)}</p>
        <p className="mt-3 text-sm font-semibold text-ow-gray">{SITE.ubicacion}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <WhatsAppLink tone="yellow">{HERO.botonWhatsApp}</WhatsAppLink>
        <Link href="/catalogos" className={btn.line}>
          {HERO.botonCatalogos}
        </Link>
      </div>
    </div>
  );
}

function Frase({ indice }: { indice: number }) {
  const { inicio, palabras } = FRASE_ROTATIVA;
  return (
    <p className="text-center font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[1.02] font-extrabold tracking-tight text-ow-black">
      <span className="sr-only">
        {inicio} {palabras.join(", ")}.
      </span>
      <span aria-hidden>
        {inicio}
        {/* La palabra va siempre en su propia línea: la frase no salta al cambiar. */}
        <br />
        <RotatingText
          index={indice}
          words={palabras}
          className="rounded-[0.16em] bg-ow-black px-[0.16em] pb-[0.04em] align-bottom text-ow-yellow"
        />
        .
      </span>
    </p>
  );
}

export default function HeroScroll() {
  const reduce = useReducedMotion();
  const contRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [indice, setIndice] = useState(0);

  // Dónde está la O en el escenario y cuánto tiene que crecer el punto para
  // cubrir hasta la esquina más lejana.
  useEffect(() => {
    if (reduce) return;
    const medir = () => {
      const st = stageRef.current;
      const sl = slotRef.current;
      if (!st || !sl) return;
      const s = st.getBoundingClientRect();
      const o = sl.getBoundingClientRect();
      const cx = o.left - s.left + o.width / 2;
      const cy = o.top - s.top + o.height / 2;
      const R = o.width / 2;
      // Al final la diana está centrada: el punto tiene que llegar a las esquinas.
      const lejos = Math.hypot(s.width / 2, s.height / 2);
      setGeo({ cx, cy, sx: s.width / 2, sy: s.height / 2, R, maxEscala: (lejos / (R * PUNTO)) * 1.08 });
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(medir);
    return () => ro.disconnect();
  }, [reduce]);

  const { scrollYProgress: p } = useScroll({ target: contRef, offset: ["start start", "end end"] });
  const maxEscala = useMotionValue(1);
  const R = useMotionValue(0);
  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  useEffect(() => {
    if (!geo) return;
    maxEscala.set(geo.maxEscala);
    R.set(geo.R);
    ox.set(geo.cx);
    oy.set(geo.cy);
    sx.set(geo.sx);
    sy.set(geo.sy);
  }, [geo, maxEscala, R, ox, oy, sx, sy]);

  const viaje = (v: number) => 1 - (1 - tramo(v, CENTRADO)) ** 3;
  const cx = useTransform([p, ox, sx], ([v, a, b]: number[]) => a + (b - a) * viaje(v));
  const cy = useTransform([p, oy, sy], ([v, a, b]: number[]) => a + (b - a) * viaje(v));

  // Crece lento al principio y acelera: se siente como "entrar" en la diana.
  const escala = useTransform([p, maxEscala], ([v, max]: number[]) => 1 + (max - 1) * tramo(v, ZOOM) ** 3);
  const rAro = useTransform([escala, R], ([s, r]: number[]) => s * r * ARO_MEDIO);
  const anchoAro = useTransform([escala, R], ([s, r]: number[]) => s * r * ARO_ANCHO);
  const rPunto = useTransform([escala, R], ([s, r]: number[]) => s * r * PUNTO);

  const textoOpacidad = useTransform(p, [0.01, 0.12], [1, 0]);
  const fraseOpacidad = useTransform(p, FRASE, [0, 1]);
  const fraseY = useTransform(p, FRASE, [36, 0]);

  useMotionValueEvent(p, "change", (v) => {
    const n = FRASE_ROTATIVA.palabras.length;
    const i = Math.min(n - 1, Math.floor(tramo(v, PALABRAS) * n));
    if (i !== indice) setIndice(i);
  });

  if (reduce) {
    return (
      <>
        <section className="container-ow flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-12 py-10 md:py-14">
          <Titular slot={<DianaLetra />} />
          <Pie />
        </section>
        <section className="bg-ow-yellow py-24">
          <div className="container-ow">
            <Frase indice={0} />
          </div>
        </section>
      </>
    );
  }

  return (
    <section ref={contRef} className="relative h-[300vh]">
      <div ref={stageRef} className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        <motion.div
          style={{ opacity: textoOpacidad }}
          className="container-ow relative z-10 flex h-full flex-col gap-10 py-10 md:py-14"
        >
          <div className="flex flex-1 items-center">
            <Titular slot={<DianaLetra oculta={!!geo} refSlot={slotRef} />} />
          </div>
          <Pie />
        </motion.div>

        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" focusable="false">
            <motion.circle cx={cx} cy={cy} r={rAro} strokeWidth={anchoAro} fill="none" stroke="var(--ow-black)" />
            <motion.circle cx={cx} cy={cy} r={rPunto} fill="var(--ow-yellow)" />
          </svg>
        )}

        <motion.div
          style={{ opacity: fraseOpacidad, y: fraseY }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5"
        >
          <Frase indice={indice} />
        </motion.div>
      </div>
    </section>
  );
}
