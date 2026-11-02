"use client";

/**
 * Hero del Inicio: "dar en el blanco" con el scroll.
 *
 * Arranca simple y centrado: el titular y, debajo, el isotipo de On Work (la
 * diana con el signo) con su gráfica de arcos, tal como están en los archivos
 * de la marca. De fondo, ondas finas salen del punto amarillo una y otra vez
 * (la "onda expansiva" de la animación del logo).
 *
 * Al bajar, la pantalla queda fija: el isotipo crece, viaja al centro y se
 * entra en el punto amarillo, que llena la pantalla. Adentro aparece
 * "Tu marca, en cada ___." y las palabras pasan cada vez más rápido hasta
 * frenar en "detalle", que se marca con un golpe y una onda.
 *
 * Con menos movimiento no hay scroll fijo ni ondas: todo queda quieto y la
 * frase va debajo, en una franja amarilla, ya en "detalle".
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
import RotatingText from "@/components/ui/RotatingText";
import { ARCOS, CONJUNTO, ISO_ARO, ISO_PUNTO, ISO_RADIO, ISO_SIGNO } from "@/components/IsotipoArcos";
import { FRASE_ROTATIVA, HERO } from "@/data/inicio";
import { btn } from "@/lib/ui";
import { sinViuda } from "@/lib/utils";

// Tramos del scroll (0 = arranca el hero fijo, 1 = se suelta).
const ZOOM: [number, number] = [0.03, 0.45];
const CENTRADO: [number, number] = [0.03, 0.32];
const FRASE: [number, number] = [0.45, 0.5];
const PALABRAS: [number, number] = [0.5, 0.9]; // de 0,9 a 1 queda "detalle"
/** Cuánto se aceleran las palabras: 1 = parejo; más alto = arranca lento y termina rápido. */
const RAMPA = 1.8;
const ONDAS = 3;

const tramo = (v: number, [a, b]: [number, number]) => Math.min(1, Math.max(0, (v - a) / (b - a)));

const COLOR = { amarillo: "var(--ow-yellow)", tinta: "var(--ow-black)" } as const;

/** Ondas que salen del punto amarillo (van detrás del texto). */
function Ondas({ opacidad }: { opacidad?: MotionValue<number> }) {
  return (
    <motion.g style={opacidad ? { opacity: opacidad } : undefined}>
      {Array.from({ length: ONDAS }, (_, i) => (
          <circle
            key={i}
            className="onda"
            style={{ animationDelay: `${i * 2}s` }}
            cx={ISO_PUNTO.x}
            cy={ISO_PUNTO.y}
            r={ISO_RADIO * 1.1}
            fill="none"
            stroke="var(--ow-black)"
            strokeOpacity="0.28"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
    </motion.g>
  );
}

/** Isotipo + arcos, en las unidades del isotipo. */
function Conjunto() {
  return (
    <>
      {ARCOS.map((a, i) => (
        <path key={i} className="arco" style={{ animationDelay: `${0.3 + i * 0.12}s` }} d={a.d} fill={COLOR[a.color]} />
      ))}
      <path d={ISO_ARO} fill="var(--ow-black)" />
      <path d={ISO_SIGNO} fill="var(--ow-yellow)" />
    </>
  );
}

/**
 * Titular: "se vea", "se use" y "se recuerde" se subrayan con la barra
 * amarilla al pasar el mouse (clase .subrayado en globals.css). En pantallas
 * táctiles se subrayan solas, una tras otra.
 */
function TitularHero() {
  const { titulo, subrayados } = HERO;
  const texto = sinViuda(titulo.slice(0, -1));
  const partes: React.ReactNode[] = [];
  let resto = texto;
  subrayados.forEach((frase, i) => {
    // sinViuda pudo unir la última frase con un espacio duro.
    const buscada = resto.includes(frase) ? frase : frase.replace(" ", " ");
    const j = resto.indexOf(buscada);
    if (j === -1) return;
    partes.push(resto.slice(0, j));
    partes.push(
      <span key={frase} className="subrayado" style={{ "--i": i } as React.CSSProperties}>
        {buscada}
      </span>,
    );
    resto = resto.slice(j + buscada.length);
  });
  partes.push(resto);

  return (
    <h1 className="max-w-5xl font-display text-[clamp(2rem,5.4vw,5.5rem)] leading-[0.98] font-extrabold tracking-tight">
      {partes}
      <span className="text-ow-yellow">{titulo.slice(-1)}</span>
    </h1>
  );
}

/** El isotipo con arcos en reposo (también es lo que se ve antes de que cargue el JavaScript). */
function IsotipoReposo({ oculto, refCaja }: { oculto?: boolean; refCaja?: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={refCaja}
      viewBox={`${CONJUNTO.x} ${CONJUNTO.y} ${CONJUNTO.w} ${CONJUNTO.h}`}
      overflow="visible"
      role="img"
      aria-label="Isotipo de On Work"
      className="h-[clamp(8.5rem,26vh,15rem)] w-auto"
      style={{ visibility: oculto ? "hidden" : "visible" }}
    >
      <Ondas />
      <Conjunto />
    </svg>
  );
}

function Escena({ isotipo, opacidad }: { isotipo: React.ReactNode; opacidad?: MotionValue<number> }) {
  return (
    <div className="container-ow relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(2rem,5vh,3.5rem)] py-8 text-center md:py-12">
      <motion.div style={opacidad ? { opacity: opacidad } : undefined}>
        <TitularHero />
      </motion.div>
      {isotipo}
      <motion.div style={opacidad ? { opacity: opacidad } : undefined}>
        <Link href="/catalogos" className={btn.black}>
          {HERO.botonCatalogos}
        </Link>
      </motion.div>
    </div>
  );
}

function Frase({ indice, final }: { indice: number; final: boolean }) {
  const reduce = useReducedMotion();
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
        <motion.span
          className="relative inline-block"
          animate={final && !reduce ? { scale: [1.22, 0.96, 1], rotate: [-3, 1, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Al llegar a "detalle": dos ondas salen de la palabra. */}
          {final &&
            !reduce &&
            [0, 0.15].map((d) => (
              <motion.span
                key={d}
                className="absolute inset-0 rounded-[0.16em] border-[0.06em] border-ow-black"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          <RotatingText
            index={indice}
            words={palabras}
            className="rounded-[0.16em] bg-ow-black px-[0.16em] pb-[0.04em] align-bottom text-ow-yellow"
          />
        </motion.span>
        .
      </span>
    </p>
  );
}

type Geo = { ox: number; oy: number; sx: number; sy: number; k: number; maxEscala: number };

export default function HeroScroll() {
  const reduce = useReducedMotion();
  const contRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cajaRef = useRef<SVGSVGElement>(null);
  const grupoRef = useRef<SVGGElement>(null);
  const ondasRef = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [indice, setIndice] = useState(0);
  const ultima = FRASE_ROTATIVA.palabras.length - 1;

  // Dónde está el punto amarillo en la pantalla, la escala del isotipo en
  // reposo y cuánto tiene que crecer el punto para cubrir hasta las esquinas.
  useEffect(() => {
    if (reduce) return;
    const medir = () => {
      const st = stageRef.current;
      const caja = cajaRef.current;
      if (!st || !caja) return;
      const s = st.getBoundingClientRect();
      const c = caja.getBoundingClientRect();
      const k = c.width / CONJUNTO.w;
      const lejos = Math.hypot(s.width / 2, s.height / 2);
      setGeo({
        ox: c.left - s.left + (ISO_PUNTO.x - CONJUNTO.x) * k,
        oy: c.top - s.top + (ISO_PUNTO.y - CONJUNTO.y) * k,
        sx: s.width / 2,
        sy: s.height / 2,
        k,
        maxEscala: (lejos / (ISO_PUNTO.r * k)) * 1.08,
      });
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(medir);
    return () => ro.disconnect();
  }, [reduce]);

  const { scrollYProgress: p } = useScroll({ target: contRef, offset: ["start start", "end end"] });
  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const k = useMotionValue(1);
  const maxEscala = useMotionValue(1);
  useEffect(() => {
    if (!geo) return;
    ox.set(geo.ox);
    oy.set(geo.oy);
    sx.set(geo.sx);
    sy.set(geo.sy);
    k.set(geo.k);
    maxEscala.set(geo.maxEscala);
  }, [geo, ox, oy, sx, sy, k, maxEscala]);

  // Mientras crece, el isotipo viaja al centro de la pantalla.
  const viaje = (v: number) => 1 - (1 - tramo(v, CENTRADO)) ** 3;
  const cx = useTransform([p, ox, sx], ([v, a, b]: number[]) => a + (b - a) * viaje(v));
  const cy = useTransform([p, oy, sy], ([v, a, b]: number[]) => a + (b - a) * viaje(v));
  // Crece lento al principio y acelera: se siente como "entrar" en la diana.
  const escala = useTransform([p, maxEscala], ([v, max]: number[]) => 1 + (max - 1) * tramo(v, ZOOM) ** 3);
  const transform = useTransform(
    [cx, cy, escala, k],
    ([x, y, s, kk]: number[]) => `translate(${x} ${y}) scale(${kk * s}) translate(${-ISO_PUNTO.x} ${-ISO_PUNTO.y})`,
  );
  const aplicar = (t: string) => {
    grupoRef.current?.setAttribute("transform", t);
    ondasRef.current?.setAttribute("transform", t);
  };
  useMotionValueEvent(transform, "change", aplicar);
  useEffect(() => {
    if (geo) aplicar(transform.get());
  });

  const textoOpacidad = useTransform(p, [0.01, 0.1], [1, 0]);
  const ondasOpacidad = useTransform(p, [0.01, 0.08], [1, 0]);
  const fraseOpacidad = useTransform(p, FRASE, [0, 1]);
  const fraseY = useTransform(p, FRASE, [36, 0]);

  // Las palabras pasan cada vez más rápido (rampa) y la última queda fija.
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(ultima, Math.floor(ultima * tramo(v, PALABRAS) ** RAMPA + 1e-6));
    if (i !== indice) setIndice(i);
  });

  if (reduce) {
    return (
      <>
        <section className="min-h-[calc(100svh-4rem)]">
          <Escena isotipo={<IsotipoReposo />} />
        </section>
        <section className="bg-ow-yellow py-24">
          <div className="container-ow">
            <Frase indice={ultima} final={false} />
          </div>
        </section>
      </>
    );
  }

  return (
    <section ref={contRef} className="relative h-[380vh]">
      <div ref={stageRef} className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" focusable="false">
            <g ref={ondasRef}>
              <Ondas opacidad={ondasOpacidad} />
            </g>
          </svg>
        )}
        <Escena opacidad={textoOpacidad} isotipo={<IsotipoReposo oculto={!!geo} refCaja={cajaRef} />} />

        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" focusable="false">
            <g ref={grupoRef}>
              <Conjunto />
            </g>
          </svg>
        )}

        <motion.div
          style={{ opacity: fraseOpacidad, y: fraseY }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5"
        >
          <Frase indice={indice} final={indice === ultima} />
        </motion.div>
      </div>
    </section>
  );
}
