'use client';

/**
 * Palabra que rota letra por letra. Origen: React Bits · Rotating Text
 * (https://reactbits.dev, licencia MIT + Commons Clause), reescrito en versión
 * corta con motion para lo que necesita On Work.
 *
 * El texto que se anima es decorativo (aria-hidden): quien lo use tiene que
 * dejar la frase completa en texto para lectores de pantalla.
 * Con menos movimiento queda fija en la primera palabra.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  words: string[];
  /** Milisegundos que queda cada palabra. */
  interval?: number;
  /** Si se pasa, la palabra la elige quien lo usa y no rota sola. */
  index?: number;
  /** Segundos que tarda en entrar cada letra (la salida y el ancho van en proporción). */
  duration?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RotatingText({ words, interval = 2200, index: controlado, duration = 0.5, className }: Props) {
  const reduce = useReducedMotion();
  const [propio, setPropio] = useState(0);

  useEffect(() => {
    if (controlado !== undefined || reduce || words.length < 2) return;
    const id = window.setInterval(() => setPropio((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [controlado, reduce, words.length, interval]);

  const index = controlado ?? (reduce ? 0 : propio);
  const word = words[index];
  const k = duration / 0.5;

  return (
    <motion.span
      layout={!reduce}
      transition={{ layout: { duration: 0.45 * k, ease: EASE } }}
      aria-hidden="true"
      className={cn('relative inline-flex overflow-hidden', className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} className="inline-flex whitespace-nowrap">
          {Array.from(word).map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: 0, transition: { duration, ease: EASE, delay: i * 0.025 * k } }}
              exit={{ y: '-120%', transition: { duration: 0.35 * k, ease: EASE, delay: i * 0.015 * k } }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
