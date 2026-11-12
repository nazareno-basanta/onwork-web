import type { ReactNode } from "react";
import { cn, mostrarMarcadores, sinMarcadores, sinViuda } from "@/lib/utils";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Contenido extra antes del texto (por ejemplo, un resaltado). */
  antes?: ReactNode;
  /** Color del signo final. Amarillo, salvo sobre fondo amarillo (ahí va en tinta, si no desaparece). */
  claseSigno?: string;
};

/**
 * Titular de On Work: el signo final (punto o signo de pregunta) va en
 * amarillo y las dos últimas palabras quedan unidas (sin viudas).
 * Si el titular termina con un marcador pendiente ("… sorbo. [confirmar]"),
 * se pinta el signo de antes del marcador, y el marcador solo se ve mientras
 * trabajamos (en la web publicada no). Ver "The Punto Final Rule" en DESIGN.md.
 */
export default function Titular({ children, as: Tag = "h2", id, className, antes, claseSigno = "text-ow-yellow" }: Props) {
  // En la web publicada, primero se sacan los marcadores (ver sinMarcadores).
  const texto = sinMarcadores(children).trim();
  const match = texto.match(/^([\s\S]*?)([.?!])(\s*\[[^\]]*\])?$/);
  const cuerpo = match ? match[1] : texto;
  const final = match ? match[2] : "";
  const marcador = match?.[3]?.trim();

  return (
    <Tag
      id={id}
      className={cn("font-display font-extrabold leading-none tracking-tight", className)}
    >
      {antes}
      {sinViuda(cuerpo + final).slice(0, final ? -1 : undefined)}
      {final && <span className={claseSigno}>{final}</span>}
      {marcador && mostrarMarcadores && <span className="ml-[0.3em] text-[0.4em] font-bold tracking-normal opacity-60">{marcador}</span>}
    </Tag>
  );
}
