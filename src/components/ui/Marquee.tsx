/**
 * Cinta infinita. Origen: Magic UI · Marquee (https://magicui.design,
 * licencia MIT). Es solo CSS: no suma JavaScript.
 *
 * Adaptado a On Work: la primera copia es la que leen los lectores de
 * pantalla; las demás llevan aria-hidden. Con menos movimiento la cinta se
 * frena y queda una sola copia, en filas que se acomodan solas.
 * Velocidad y separación: className="[--duration:40s] [--gap:3rem]".
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  /** Cuántas veces se repite el contenido para que la cinta no tenga huecos. */
  repeat?: number;
};

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem] motion-reduce:flex-wrap motion-reduce:justify-center",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 animate-marquee justify-around gap-(--gap) motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
            i > 0 && "motion-reduce:hidden",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
