'use client';

/**
 * Efecto imán. Origen: Motion Primitives · Magnetic
 * (https://motion-primitives.com, licencia MIT).
 *
 * Adaptado a On Work: fuerza baja, y sin efecto en pantallas táctiles ni con
 * menos movimiento (ahí el contenido queda quieto).
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

type Props = {
  children: ReactNode;
  /** Qué tanto sigue al cursor (0 a 1). */
  intensity?: number;
  /** Distancia en px desde la que empieza a atraer. */
  range?: number;
  className?: string;
};

export default function Magnetic({ children, intensity = 0.3, range = 120, className }: Props) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(fine.matches && !reduce);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      if (isHovered && distance <= range) {
        const scale = 1 - distance / range;
        x.set(dx * intensity * scale);
        y.set(dy * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [enabled, isHovered, intensity, range, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={enabled ? { x: springX, y: springY } : undefined}
    >
      {children}
    </motion.div>
  );
}
