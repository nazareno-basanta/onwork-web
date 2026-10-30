"use client";

/**
 * Hero del Inicio: "dar en el blanco" con el scroll.
 *
 * Arranca simple: el titular grande y, debajo, la diana de On Work (la O del
 * logo: aro tinta y punto amarillo). Al bajar, la pantalla queda fija y la
 * diana crece hasta atravesar el aro y entrar en el punto amarillo, que llena
 * la pantalla. Adentro aparece "Tu marca, en cada ___." y la palabra cambia
 * con el scroll. Después la página sigue normal.
 *
 * La diana que crece es un SVG del tamaño del escenario (siempre nítido).
 * Con menos movimiento no hay scroll fijo: el titular y la diana quedan
 * quietos y la frase va debajo, en una franja amarilla.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import RotatingText from "@/components/ui/RotatingText";
import { FRASE_ROTATIVA, HERO } from "@/data/inicio";
import { SITE } from "@/lib/site";
import { btn } from "@/lib/ui";
import { sinViuda } from "@/lib/utils";

// Proporciones exactas de la O del logo (public/brand/logo-onwork.svg),
// relativas a su radio exterior R: el aro va de 0,572R a R y el punto
// amarillo mide 0,294R.
const ARO_MEDIO = 0.786;
const ARO_ANCHO = 0.428;
const PUNTO = 0.294;

// Tramos del scroll (0 = arranca el hero fijo, 1 = se suelta).
const ZOOM: [number, number] = [0.04, 0.56];
const CENTRADO: [number, number] = [0.04, 0.4];
const FRASE: [number, number] = [0.56, 0.64];
const PALABRAS: [number, number] = [0.64, 0.97];

type Geo = { cx: number; cy: number; sx: number; sy: number; R: number; maxEscala: number };

const tramo = (v: number, [a, b]: [number, number]) => Math.min(1, Math.max(0, (v - a) / (b - a)));

/** La diana de On Work en reposo, con las proporciones del logo. */
function Diana({ oculta, refDiana }: { oculta?: boolean; refDiana?: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={refDiana}
      viewBox="0 0 100 100"
      aria-hidden
      focusable="false"
      className="size-[clamp(5.5rem,13vw,10rem)]"
      style={{ visibility: oculta ? "hidden" : "visible" }}
    >
      <circle cx="50" cy="50" r={50 * ARO_MEDIO} strokeWidth={50 * ARO_ANCHO} fill="none" stroke="var(--ow-black)" />
      <circle cx="50" cy="50" r={50 * PUNTO} fill="var(--ow-yellow)" />
    </svg>
  );
}

function Centro({ diana, opacidad }: { diana: React.ReactNode; opacidad?: MotionValue<number> }) {
  return (
    <div className="flex flex-col items-center gap-[clamp(2rem,5vh,3.5rem)] text-center">
      <motion.div style={opacidad ? { opacity: opacidad } : undefined}>
        <Titular as="h1" className="max-w-5xl text-[clamp(2rem,5.4vw,5.5rem)] !leading-[0.98]">
          {HERO.titulo}
        </Titular>
      </motion.div>
      {diana}
    </div>
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
  const dianaRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [indice, setIndice] = useState(0);

  // Dónde está la diana en el escenario y cuánto tiene que crecer el punto
  // para cubrir hasta las esquinas (al final queda centrada).
  useEffect(() => {
    if (reduce) return;
    const medir = () => {
      const st = stageRef.current;
      const di = dianaRef.current;
      if (!st || !di) return;
      const s = st.getBoundingClientRect();
      const d = di.getBoundingClientRect();
      const R = d.width / 2;
      const lejos = Math.hypot(s.width / 2, s.height / 2);
      setGeo({
        cx: d.left - s.left + R,
        cy: d.top - s.top + R,
        sx: s.width / 2,
        sy: s.height / 2,
        R,
        maxEscala: (lejos / (R * PUNTO)) * 1.08,
      });
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

  // Mientras crece, la diana viaja al centro de la pantalla.
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
          <div className="flex flex-1 items-center justify-center">
            <Centro diana={<Diana />} />
          </div>
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
        <div className="container-ow relative z-10 flex h-full flex-col gap-8 py-8 md:py-12">
          <div className="flex flex-1 items-center justify-center">
            <Centro opacidad={textoOpacidad} diana={<Diana oculta={!!geo} refDiana={dianaRef} />} />
          </div>
          <motion.div style={{ opacity: textoOpacidad }}>
            <Pie />
          </motion.div>
        </div>

        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" focusable="false">
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
