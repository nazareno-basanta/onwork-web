'use client';

/**
 * Objeto que se inclina en 3D siguiendo el mouse. Origen: React Bits ·
 * Tilted Card (https://reactbits.dev, licencia MIT + Commons Clause),
 * reescrito en versión corta con motion.
 *
 * Adaptado a On Work: inclinación chica (8° como máximo), sin brillos, con la
 * sombra "Portada" de DESIGN.md. Sin efecto en pantallas táctiles ni con menos
 * movimiento.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

const SPRING = { damping: 30, stiffness: 100, mass: 2 };

type Props = {
  children: ReactNode;
  /** Grados máximos de inclinación. */
  amplitude?: number;
  className?: string;
};

export default function TiltedCard({ children, amplitude = 8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const scale = useSpring(1, SPRING);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(fine.matches && !reduce);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, [reduce]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ox = e.clientX - rect.left - rect.width / 2;
    const oy = e.clientY - rect.top - rect.height / 2;
    rotateX.set((oy / (rect.height / 2)) * -amplitude);
    rotateY.set((ox / (rect.width / 2)) * amplitude);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      ref={ref}
      className={cn('[perspective:800px]', className)}
      onPointerMove={onMove}
      onPointerEnter={() => enabled && scale.set(1.04)}
      onPointerLeave={reset}
    >
      <motion.div
        className="h-full w-full [transform-style:preserve-3d]"
        style={enabled ? { rotateX, rotateY, scale } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
