"use client";

/**
 * Hero del Inicio: "dar en el blanco" con el scroll.
 *
 * Arranca centrado: el titular, el isotipo original de On Work (la diana con
 * el signo), sin ningún agregado, con el carrusel de productos destacados que
 * pasa por detrás (CarruselHero), y los dos botones: "Ver catálogos" (el
 * principal, en amarillo) y "Conocenos". (Diseño "Soportes" de Nachi.)
 *
 * Al bajar, los productos se abren hacia los costados y se van; la pantalla
 * queda fija: el isotipo crece, viaja al centro y se
 * entra en el punto amarillo, que llena la pantalla. Adentro aparece
 * "Tu marca, en cada ___." y las palabras pasan parejas, con lugar para
 * leer cada una, hasta "detalle", que se marca con un golpe y una onda.
 *
 * Con menos movimiento no hay scroll fijo: todo queda quieto y la
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
import CarruselHero, { type ProductoHero } from "@/components/CarruselHero";
import Icon from "@/components/Icon";
import RotatingText from "@/components/ui/RotatingText";
import { ISO_ARO, ISO_CAJA, ISO_PUNTO, ISO_SIGNO } from "@/components/Isotipo";
import { FRASE_ROTATIVA, HERO } from "@/data/inicio";
import { btn } from "@/lib/ui";
import { sinViuda } from "@/lib/utils";

// Tramos del scroll (0 = arranca el hero fijo, 1 = se suelta). El hero mide
// 520vh: el isotipo crece en unos 120vh, la frase entra y cada palabra queda
// unos 25vh (se lee bien) hasta "detalle", que queda fija al final.
const ZOOM: [number, number] = [0.02, 0.3];
const CENTRADO: [number, number] = [0.02, 0.22];
const FRASE: [number, number] = [0.3, 0.34];
const PALABRAS: [number, number] = [0.34, 0.93]; // de 0,93 a 1 queda "detalle"

const tramo = (v: number, [a, b]: [number, number]) => Math.min(1, Math.max(0, (v - a) / (b - a)));

/** El isotipo original (paths del archivo de marca, sin cambios). */
function Isotipo() {
  return (
    <>
      <path d={ISO_ARO} fill="var(--ow-black)" />
      <path d={ISO_SIGNO} fill="var(--ow-yellow)" />
    </>
  );
}

/**
 * Juego de pesos del titular (Nachi, 6/11/2026): "Merchandising" en
 * ExtraBold, "que hace que" en Medium, "tu marca" en Bold itálica y "se vea",
 * "se use" y "se recuerde" (con lo que va entre ellas) en Black, sin itálica.
 * Si una frase no está en el titular, se saltea.
 */
const DESTACADOS = [
  { frase: "Merchandising", clase: "font-extrabold" },
  { frase: "tu marca", clase: "font-bold italic" },
];
const PESO_FRASES = "font-black";
/** Lo que no es una frase marcada: liviano antes de los verbos, Black desde "se vea". */
const PESO_ANTES = "font-medium";

/**
 * Titular: "se vea", "se use" y "se recuerde" se subrayan solos con la barra
 * amarilla al cargar, una tras otra (clase .subrayado en globals.css).
 */
function TitularHero() {
  const { titulo, subrayados } = HERO;
  const texto = sinViuda(titulo.slice(0, -1));
  // Todas las frases marcadas, en el orden del titular.
  const marcas = [
    ...DESTACADOS.map((d) => ({ ...d, i: -1 })),
    ...subrayados.map((frase, i) => ({ frase, clase: PESO_FRASES, i })),
  ];
  const partes: React.ReactNode[] = [];
  let resto = texto;
  let peso = PESO_ANTES;
  for (const m of marcas) {
    // sinViuda pudo unir las dos últimas palabras con un espacio duro.
    const buscada = resto.includes(m.frase) ? m.frase : m.frase.replace(" ", "\u00a0");
    const j = resto.indexOf(buscada);
    if (j === -1) continue;
    partes.push(
      <span key={`antes-${m.frase}`} className={peso}>
        {resto.slice(0, j)}
      </span>,
    );
    partes.push(
      m.i >= 0 ? (
        <span key={m.frase} className={`subrayado ${m.clase}`} style={{ "--i": m.i } as React.CSSProperties}>
          {buscada}
        </span>
      ) : (
        <span key={m.frase} className={m.clase}>
          {buscada}
        </span>
      ),
    );
    if (m.i >= 0) peso = PESO_FRASES;
    resto = resto.slice(j + buscada.length);
  }

  return (
    <h1 className="max-w-6xl font-display text-[clamp(2rem,5.4vw,5.5rem)] leading-[0.98] font-extrabold tracking-tight">
      {partes}
      <span className={peso}>
        {resto}
        <span className="text-ow-yellow">{titulo.slice(-1)}</span>
      </span>
    </h1>
  );
}

/** El isotipo en reposo (también es lo que se ve antes de que cargue el JavaScript). */
function IsotipoReposo({ oculto, refCaja }: { oculto?: boolean; refCaja?: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={refCaja}
      viewBox={`${ISO_CAJA.x} ${ISO_CAJA.y} ${ISO_CAJA.w} ${ISO_CAJA.h}`}
      role="img"
      aria-label="Isotipo de On Work"
      className="h-[clamp(7.5rem,22vh,12rem)] w-auto"
      style={{ visibility: oculto ? "hidden" : "visible" }}
    >
      <Isotipo />
    </svg>
  );
}

function Escena({
  isotipo,
  opacidad,
  productos,
  progreso,
  quieto,
}: {
  isotipo: React.ReactNode;
  opacidad?: MotionValue<number>;
  productos: ProductoHero[];
  progreso?: MotionValue<number>;
  quieto?: boolean;
}) {
  return (
    <div className="container-ow relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(2rem,5vh,3.5rem)] py-8 text-center md:py-12">
      <motion.div style={opacidad ? { opacity: opacidad } : undefined} className="relative z-10">
        <TitularHero />
      </motion.div>
      {/* El carrusel pasa por detrás del isotipo; abajo deja lugar para los nombres de los productos. */}
      <div className="relative sm:mb-8 lg:mb-10">
        <CarruselHero productos={productos} progreso={progreso} quieto={quieto} />
        <div className="relative">{isotipo}</div>
      </div>
      {/* "Ver catálogos" es la acción principal (amarillo, más grande); "Conocenos", la segunda. */}
      <motion.div style={opacidad ? { opacity: opacidad } : undefined} className="relative z-10 flex flex-wrap justify-center gap-3">
        <Link href="/catalogos" className={`${btn.yellow} !min-h-14 !px-8 !text-base`}>
          {HERO.botonCatalogos}
          <Icon name="flecha-derecha" size={20} />
        </Link>
        <Link href="/nosotros" className={`${btn.line} !min-h-14 !px-8 !text-base`}>
          {HERO.botonConocenos}
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

export default function HeroScroll({ productos }: { productos: ProductoHero[] }) {
  const reduce = useReducedMotion();
  const contRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cajaRef = useRef<SVGSVGElement>(null);
  const grupoRef = useRef<SVGGElement>(null);
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
      const k = c.width / ISO_CAJA.w;
      const lejos = Math.hypot(s.width / 2, s.height / 2);
      setGeo({
        ox: c.left - s.left + (ISO_PUNTO.x - ISO_CAJA.x) * k,
        oy: c.top - s.top + (ISO_PUNTO.y - ISO_CAJA.y) * k,
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
  const aplicar = (t: string) => grupoRef.current?.setAttribute("transform", t);
  useMotionValueEvent(transform, "change", aplicar);
  useEffect(() => {
    if (geo) aplicar(transform.get());
  });

  const textoOpacidad = useTransform(p, [0.01, 0.07], [1, 0]);
  const fraseOpacidad = useTransform(p, FRASE, [0, 1]);
  const fraseY = useTransform(p, FRASE, [36, 0]);

  // Las palabras pasan parejas (cada una el mismo tramo de scroll) y la última queda fija.
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(ultima, Math.floor((ultima + 1) * tramo(v, PALABRAS)));
    if (i !== indice) setIndice(i);
  });

  if (reduce) {
    return (
      <>
        <section className="min-h-[calc(100svh-4rem)] overflow-hidden">
          <Escena isotipo={<IsotipoReposo />} productos={productos} quieto />
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
    <section ref={contRef} className="relative h-[520vh]">
      <div ref={stageRef} className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        <Escena
          opacidad={textoOpacidad}
          isotipo={<IsotipoReposo oculto={!!geo} refCaja={cajaRef} />}
          productos={productos}
          progreso={p}
        />

        {geo && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" focusable="false">
            <g ref={grupoRef}>
              <Isotipo />
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
