"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { CLIENTES, type Cliente } from "@/data/clientes";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIAS = 4; // el contenido se repite para que la cinta nunca tenga huecos

function Item({ cliente }: { cliente: Cliente }) {
  return (
    <li className="group mx-2 flex h-20 min-w-48 shrink-0 items-center justify-center rounded-full border-2 border-ow-black/15 px-9 transition-colors duration-300 hover:border-ow-yellow hover:bg-ow-yellow">
      {cliente.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cliente.logo}
          alt={cliente.nombre}
          className="h-9 w-auto max-w-40 object-contain opacity-60 brightness-0 transition-opacity duration-300 group-hover:opacity-100"
          loading="lazy"
        />
      ) : (
        <span className="font-display text-lg font-extrabold uppercase tracking-wide text-ow-black/45 transition-colors duration-300 group-hover:text-ow-black">
          {cliente.nombre}
        </span>
      )}
    </li>
  );
}

type RowProps = {
  /** Velocidad en % por segundo. Negativa = va hacia el otro lado. */
  baseVelocity: number;
};

function Row({ baseVelocity }: RowProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIAS, 0, v)}%`);

  const direction = useRef(baseVelocity < 0 ? -1 : 1);
  const speed = useRef(1); // 1 = normal, ~0.12 = casi frenado (al pasar el mouse)
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    speed.current += ((hovering.current ? 0.12 : 1) - speed.current) * 0.08;

    let move = Math.abs(baseVelocity) * (delta / 1000) * speed.current;
    const vf = velocityFactor.get();
    // Si se scrollea hacia el otro lado, la cinta invierte su dirección.
    const sign = baseVelocity < 0 ? -1 : 1;
    if (vf < 0) direction.current = -sign;
    else if (vf > 0) direction.current = sign;
    move += move * Math.abs(vf);

    baseX.set(baseX.get() - direction.current * move);
  });

  return (
    <div
      className="overflow-hidden py-2"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.ul style={{ x }} className="flex w-max">
        {Array.from({ length: COPIAS }).map((_, copia) =>
          CLIENTES.map((c) => (
            <Item key={`${copia}-${c.nombre}`} cliente={c} />
          )),
        )}
      </motion.ul>
    </div>
  );
}

/**
 * "Con quiénes trabajamos": dos cintas de logos en monocromo.
 * - Se aceleran con el scroll y cambian de sentido si volvés para arriba.
 * - Se frenan al pasar el mouse y cada marca se ilumina en amarillo.
 */
export default function ClientsMarquee() {
  return (
    <section
      aria-labelledby="clientes-titulo"
      className="overflow-hidden bg-ow-paper py-20 md:py-28"
    >
      <div className="container-ow">
        <p className="eyebrow">Con quiénes trabajamos</p>
        <h2
          id="clientes-titulo"
          className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          Empresas que confiaron en nosotros.
        </h2>
      </div>

      <div className="mt-12 space-y-3">
        <Row baseVelocity={3.2} />
        <Row baseVelocity={-3.2} />
      </div>
    </section>
  );
}
