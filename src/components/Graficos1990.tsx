"use client";

/**
 * Gráfico de "Una empresa familiar, desde 1990." (Nachi, 12/11/2026), para
 * que la sección no quede seca: el trío ■▲● de la marca, que aparece de a una
 * forma cuando entra en pantalla (ver .trio-aparece en globals.css).
 * Es decorativo (aria-hidden, como todas las formas). Con menos movimiento,
 * se ve completo desde el principio.
 */

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Trio } from "@/components/Formas";
import { cn } from "@/lib/utils";

export function TrioQueAparece({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const visto = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref} className={cn("trio-aparece", (reduce || visto) && "trio-visible", className)}>
      <Trio className="h-full w-auto" />
    </div>
  );
}
