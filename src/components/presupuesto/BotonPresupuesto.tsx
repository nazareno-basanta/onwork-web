"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { btn } from "@/lib/ui";
import { usePresupuesto } from "@/lib/usePresupuesto";
import { cn } from "@/lib/utils";
import { origenDelVuelo, volarAlPresupuesto } from "@/lib/vuelo";
import SelectorCantidad from "./SelectorCantidad";

type Props = {
  producto: { codigo: string; nombre: string; catalogo: string };
  className?: string;
  /** En la página del producto es la acción principal: botón tinta, a todo el ancho en el celular. */
  destacado?: boolean;
  /**
   * En la página del producto, el color elegido ("" = A definir): el botón
   * muestra la línea de ese color. Sin color (en las tarjetas), muestra la
   * única línea del producto o, si hay varias, el link al presupuesto.
   */
  color?: string;
};

const link =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";
// Las acciones que sacan algo (Quitar, Vaciar) van con subrayado tinta, más
// calmo; el amarillo queda para las que suman o resuelven.
const linkQuitar =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-black/30 decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * "Sumar al presupuesto" en la tarjeta o la página de un producto. Una vez
 * sumado, pasa a ser el selector de cantidad: en la tarjeta, con cantidad 1 el
 * "−" es el tacho para quitarlo (todo en una fila); en la página del
 * producto, con "Quitar" al lado. Si el producto ya está en varios colores, la
 * tarjeta lleva al presupuesto (ahí se ajusta cada color).
 */
export default function BotonPresupuesto({ producto, className, destacado = false, color }: Props) {
  const { lineas } = usePresupuesto();
  // Cómo se sumó: con el teclado el foco va al número; con mouse, dedo o lector de pantalla, al grupo.
  const [enfocar, setEnfocar] = useState<"numero" | "grupo" | null>(null);
  const yaEnfocado = useCallback(() => setEnfocar(null), []);
  const mias = lineas.filter((l) => l.codigo === producto.codigo);
  const conColor = color !== undefined;
  const linea = conColor ? mias.find((l) => l.color === color) : mias.length === 1 ? mias[0] : undefined;

  const sumar = (
    <div className={cn("@container w-full", !conColor && className)}>
      {/* En una tarjeta angosta (dos columnas en el celular) el texto completo no
          entra en una línea: ahí dice "Sumar" (el nombre completo queda para los
          lectores de pantalla). */}
      <button
        type="button"
        aria-label={PRESUPUESTO.sumarEtiqueta(producto.nombre)}
        className={destacado ? cn(btn.black, "w-full sm:w-auto") : btn.line}
        onClick={(e) => {
          // La foto vuela al contador del header (antes de sumar, así el contador espera a que llegue).
          volarAlPresupuesto(origenDelVuelo(e.currentTarget));
          presupuesto.sumar(producto.codigo, color ?? "", { aviso: producto.nombre });
          medir("sumar_al_presupuesto", { codigo: producto.codigo, catalogo: producto.catalogo });
          // El foco pasa al número solo si se sumó con el teclado (en el
          // celular abriría el teclado numérico encima del aviso); si no, al
          // grupo de la cantidad, para que no se pierda cuando el botón desaparece.
          setEnfocar(e.detail === 0 ? "numero" : "grupo");
        }}
      >
        <Icon name="mas" size={18} />
        <span className="@[13rem]:hidden">{PRESUPUESTO.sumarCorto}</span>
        <span className="hidden @[13rem]:inline">{PRESUPUESTO.sumar}</span>
      </button>
    </div>
  );

  const cantidad = (l: { codigo: string; color: string; cantidad: number }, conQuitarAparte: boolean) => (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", !conColor && className)}>
      <SelectorCantidad
        nombre={producto.nombre}
        valor={l.cantidad}
        enfocar={enfocar}
        alEnfocar={yaEnfocado}
        onCambiar={(n) => presupuesto.cambiarCantidad(l.codigo, l.color, n)}
        onQuitar={conQuitarAparte ? undefined : () => presupuesto.quitar(l.codigo, l.color)}
      />
      {conQuitarAparte && (
        <button
          type="button"
          className={linkQuitar}
          onClick={() => presupuesto.quitar(l.codigo, l.color)}
          aria-label={`${PRESUPUESTO.quitar} ${producto.nombre} del presupuesto`}
        >
          {PRESUPUESTO.quitar}
        </button>
      )}
    </div>
  );

  // Página del producto: la línea del color elegido y, si hay, los otros colores ya sumados.
  if (conColor) {
    const otras = mias.filter((l) => l.color !== color);
    return (
      <div className={cn("space-y-3", className)}>
        {linea ? cantidad(linea, true) : sumar}
        {otras.length > 0 && (
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-ow-gray">
            {PRESUPUESTO.tambienEnColores(otras.map((l) => l.color || PRESUPUESTO.aDefinir))}
            <Link href="/presupuesto" className={link}>
              {PRESUPUESTO.verPresupuesto}
            </Link>
          </p>
        )}
      </div>
    );
  }

  if (mias.length === 0) return sumar;
  if (linea) return cantidad(linea, false);
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 text-sm font-semibold", className)}>
      {PRESUPUESTO.enVariosColores(mias.length)}
      <Link href="/presupuesto" className={link}>
        {PRESUPUESTO.verPresupuesto}
      </Link>
    </p>
  );
}
