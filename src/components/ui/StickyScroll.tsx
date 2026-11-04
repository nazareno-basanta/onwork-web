'use client';

/**
 * Pasos que avanzan con el scroll mientras el panel de la derecha queda fijo
 * y cambia con cada paso. Origen: Aceternity UI · Sticky Scroll Reveal
 * (https://ui.aceternity.com, licencia MIT).
 *
 * Adaptado a On Work: sin el degradé de colores de la demo, scroll de toda la
 * página (no una caja con scroll propio) y en el celular los pasos van uno
 * debajo del otro, cada uno con su panel.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Titular from '@/components/Titular';
import { cn } from '@/lib/utils';

export type Paso = {
  titulo: string;
  texto: string;
  /** Panel que acompaña al paso (forma, foto o número). */
  panel: ReactNode;
};

export default function StickyScroll({ pasos, className }: { pasos: Paso[]; className?: string }) {
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivo(Number((entry.target as HTMLElement).dataset.paso));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn('grid gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-20', className)}>
      <ol className="space-y-16 lg:space-y-0">
        {pasos.map((paso, i) => (
          <li
            key={paso.titulo}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-paso={i}
            className={cn(
              'transition-opacity duration-500 ease-ow lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center',
              // El paso inactivo se atenúa, pero sigue pasando contraste AA:
              // texto 4,6:1 y números 3,7:1 sobre tinta (antes, con 35 %, no).
              activo === i ? 'lg:opacity-100' : 'lg:opacity-55',
            )}
          >
            <p className="font-display text-6xl font-extrabold leading-none text-ow-yellow md:text-7xl">
              {i + 1}
            </p>
            <Titular as="h3" className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] !leading-tight">
              {paso.titulo}
            </Titular>
            <p className="mt-3 max-w-md text-lg text-white/85">{paso.texto}</p>
            <div className="mt-8 lg:hidden" aria-hidden>
              {paso.panel}
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block" aria-hidden>
        <div className="sticky top-[calc(50vh-14rem)] aspect-square w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activo}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {pasos[activo].panel}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
