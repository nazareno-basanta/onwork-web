import type { ReactNode } from "react";
import { cn, sinViuda } from "@/lib/utils";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Contenido extra antes del texto (por ejemplo, un resaltado). */
  antes?: ReactNode;
};

/**
 * Titular de On Work: el signo final (punto o signo de pregunta) va en
 * amarillo y las dos últimas palabras quedan unidas (sin viudas).
 * Ver "The Punto Final Rule" en DESIGN.md.
 */
export default function Titular({ children, as: Tag = "h2", id, className, antes }: Props) {
  const texto = sinViuda(children.trim());
  const final = /[.?!]$/.test(texto) ? texto.slice(-1) : "";
  const cuerpo = final ? texto.slice(0, -1) : texto;

  return (
    <Tag
      id={id}
      className={cn("font-display font-extrabold leading-none tracking-tight", className)}
    >
      {antes}
      {cuerpo}
      {final && <span className="text-ow-yellow">{final}</span>}
    </Tag>
  );
}
