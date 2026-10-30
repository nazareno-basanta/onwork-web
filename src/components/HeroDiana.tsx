"use client";

/**
 * Animación del hero: el signo cae sobre la diana y deja una onda expansiva,
 * como en el cierre de los videos de On Work ("dar en el blanco").
 * Con menos movimiento se muestra quieta, con el signo ya en su lugar.
 */

import { motion, useReducedMotion } from "motion/react";
import { Diana, Signo } from "./Formas";

export default function HeroDiana() {
  const reduce = useReducedMotion();
  const caida = 0.9;

  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[30rem] select-none">
      <Diana className="absolute inset-0 h-full w-full text-ow-black" />

      {/* Onda expansiva cuando el signo da en el blanco */}
      {!reduce &&
        [0, 0.18].map((extra) => (
          <motion.span
            key={extra}
            className="absolute top-1/2 left-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-ow-yellow"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 3.4], opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.2, delay: caida + 0.55 + extra, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

      {/* El signo: su punto cae en el centro de la diana */}
      <motion.div
        className="absolute bottom-[46%] left-[47.5%] h-[46%]"
        initial={reduce ? false : { y: "-120%", rotate: 12, opacity: 0 }}
        animate={{ y: 0, rotate: 12, opacity: 1 }}
        transition={{ delay: caida, type: "spring", stiffness: 260, damping: 18 }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <Signo className="h-full w-auto text-ow-yellow" />
      </motion.div>
    </div>
  );
}
