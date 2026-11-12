"use client";

/**
 * Lista de /ideas: notas y pedidos reales juntos, en tarjetas, con filtros
 * arriba (Todo · Notas · Pedidos reales). Las tarjetas se arman en el
 * servidor y llegan hechas; acá solo se elige cuáles se ven.
 *
 * Al cambiar de filtro, las que salen se apagan, las que quedan se acomodan
 * en su lugar nuevo y las que entran aparecen (con menos movimiento, cambia
 * sin animación). La dirección se actualiza sin recargar (/ideas,
 * /ideas?ver=notas, /ideas?ver=pedidos), así se puede compartir el link.
 */

import { Suspense, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Filtro = "todo" | "notas" | "pedidos";
export type ItemBlog = { clave: string; tipo: "notas" | "pedidos"; tarjeta: ReactNode };

type Props = {
  items: ItemBlog[];
  filtros: Record<Filtro, string>;
  /** Para lectores de pantalla: qué hacen los botones. */
  rotulo: string;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * El filtro con el que arranca sale de la dirección (?ver=pedidos). La página
 * se arma de antemano con todo a la vista (lo que ve Google) y el navegador
 * aplica el filtro al cargar: por eso el Suspense.
 */
export default function ListaBlog(props: Props) {
  return (
    <Suspense fallback={<Lista {...props} inicial="todo" />}>
      <ListaSegunDireccion {...props} />
    </Suspense>
  );
}

function ListaSegunDireccion(props: Props) {
  const ver = useSearchParams().get("ver");
  return <Lista {...props} inicial={ver === "notas" || ver === "pedidos" ? ver : "todo"} />;
}

function Lista({ items, inicial, filtros, rotulo, className }: Props & { inicial: Filtro }) {
  const reduce = useReducedMotion();
  const hay = { notas: items.some((i) => i.tipo === "notas"), pedidos: items.some((i) => i.tipo === "pedidos") };
  // Si falta uno de los dos tipos, no hay nada que filtrar.
  const conFiltros = hay.notas && hay.pedidos;
  const [filtro, setFiltro] = useState<Filtro>(conFiltros ? inicial : "todo");
  const visibles = items.filter((i) => filtro === "todo" || i.tipo === filtro);

  const elegir = (f: Filtro) => {
    setFiltro(f);
    window.history.replaceState(null, "", f === "todo" ? "/ideas" : `/ideas?ver=${f}`);
  };

  return (
    <div className={className}>
      {conFiltros && (
        <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2">
          {(Object.keys(filtros) as Filtro[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filtro === f}
              onClick={() => elegir(f)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border-2 border-ow-black px-5 font-display text-sm font-bold transition-colors duration-300 ease-ow",
                filtro === f ? "bg-ow-black text-white" : "text-ow-black hover:bg-ow-black/5",
              )}
            >
              {filtros[f]}
            </button>
          ))}
        </div>
      )}

      <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", conFiltros && "mt-8")}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibles.map((i) => (
            <motion.li
              key={i.clave}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {i.tarjeta}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
