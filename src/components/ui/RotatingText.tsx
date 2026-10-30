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
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RotatingText({ words, interval = 2200, className }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, words.length, interval]);

  const word = words[reduce ? 0 : index];

  return (
    <motion.span
      layout={!reduce}
      transition={{ layout: { duration: 0.45, ease: EASE } }}
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
              animate={{ y: 0, transition: { duration: 0.5, ease: EASE, delay: i * 0.025 } }}
              exit={{ y: '-120%', transition: { duration: 0.35, ease: EASE, delay: i * 0.015 } }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
