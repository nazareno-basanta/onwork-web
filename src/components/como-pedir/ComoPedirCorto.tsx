import Link from "next/link";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import { COMO_PEDIR } from "@/data/inicio";
import { cn } from "@/lib/utils";

/**
 * "Cómo pedir" en corto: los cinco pasos con su número y su título, unidos
 * por una línea, y el link a /como-pedir (donde están las maquetas).
 * - claro: en el presupuesto vacío, con su titular. El 1 va en amarillo: es
 *   el paso en el que está la persona (todavía no sumó nada).
 * - oscuro: en el Inicio, en el celular, sobre tinta (el titular ya lo pone
 *   la sección). Todos los números en amarillo, como en la línea completa.
 */
export default function ComoPedirCorto({
  tono = "claro",
  className,
}: {
  tono?: "claro" | "oscuro";
  className?: string;
}) {
  const oscuro = tono === "oscuro";
  const lista = (
    <ol className={cn("relative space-y-3", !oscuro && "mt-6")}>
      <span
        aria-hidden="true"
        className={cn("absolute top-4 bottom-4 left-[15px] w-0.5", oscuro ? "bg-white/15" : "bg-ow-black/15")}
      />
      {COMO_PEDIR.pasos.map((paso, i) => {
        const amarillo = oscuro || i === 0;
        return (
          <li
            key={paso.titulo}
            aria-current={!oscuro && i === 0 ? "step" : undefined}
            className="relative flex items-center gap-4"
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-extrabold tabular-nums",
                amarillo ? "border-ow-yellow bg-ow-yellow text-ow-black" : "border-ow-black/25 bg-ow-paper text-ow-black/70",
              )}
            >
              {i + 1}
            </span>
            <span className={cn("font-display font-bold md:text-lg", oscuro && "text-lg")}>
              {paso.titulo.replace(/[.?!]$/, "")}
            </span>
          </li>
        );
      })}
    </ol>
  );
  const link = (
    <Link
      href="/como-pedir"
      className={cn(
        "mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px]",
        oscuro ? "text-white hover:decoration-white" : "hover:decoration-ow-black",
      )}
    >
      {COMO_PEDIR.linkPagina}
      <Icon name="flecha-derecha" size={18} />
    </Link>
  );

  if (oscuro)
    return (
      <div className={className}>
        {lista}
        {link}
      </div>
    );

  return (
    <section aria-labelledby="como-pedir-corto" className={cn("border-t-2 border-ow-black pt-8", className)}>
      <Titular id="como-pedir-corto" className="text-[clamp(1.6rem,3vw,2.25rem)]">
        {COMO_PEDIR.titulo}
      </Titular>
      {lista}
      {link}
    </section>
  );
}
