"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMenosMovimiento } from "@/lib/useMenosMovimiento";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Hace aparecer su contenido (fundido + leve subida) cuando entra en pantalla.
 * Envolvé cualquier bloque con <Reveal> para animarlo.
 *
 * Con menos movimiento no hay animación: el contenido se ve siempre (lo
 * asegura también una regla de globals.css sobre [data-reveal], que funciona
 * aun antes de que cargue JavaScript, o sin él).
 */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduce = useMenosMovimiento();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
