"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { btn } from "@/lib/ui";
import { usePresupuesto } from "@/lib/usePresupuesto";
import { cn } from "@/lib/utils";
import SelectorCantidad from "./SelectorCantidad";

type Props = {
  producto: { codigo: string; nombre: string; catalogo: string };
  className?: string;
};

const link =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";
// Las acciones que sacan algo (Quitar, Vaciar) van con subrayado tinta, más
// calmo; el amarillo queda para las que suman o resuelven.
const linkQuitar =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-black/30 decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * "Sumar al presupuesto" en la tarjeta o la página de un producto. Una vez
 * sumado, pasa a ser el selector de cantidad con "Quitar". Si el producto ya
 * está en varios colores, lleva al presupuesto (ahí se ajusta cada color).
 */
export default function BotonPresupuesto({ producto, className }: Props) {
  const { lineas } = usePresupuesto();
  const [recienSumado, setRecienSumado] = useState(false);
  const mias = lineas.filter((l) => l.codigo === producto.codigo);

  if (mias.length === 0) {
    // En una tarjeta angosta (dos columnas en el celular) el texto completo no
    // entra en una línea: ahí dice "Sumar" (el nombre completo queda para los
    // lectores de pantalla).
    return (
      <div className={cn("@container w-full", className)}>
        <button
          type="button"
          aria-label={PRESUPUESTO.sumarEtiqueta(producto.nombre)}
          className={btn.line}
          onClick={(e) => {
            presupuesto.sumar(producto.codigo, "", { aviso: producto.nombre });
            medir("sumar_al_presupuesto", { codigo: producto.codigo, catalogo: producto.catalogo });
            // El foco pasa al número solo si se sumó con el teclado (en el
            // celular abriría el teclado numérico encima del aviso).
            setRecienSumado(e.detail === 0);
          }}
        >
          <Icon name="mas" size={18} />
          <span className="@[13rem]:hidden">{PRESUPUESTO.sumarCorto}</span>
          <span className="hidden @[13rem]:inline">{PRESUPUESTO.sumar}</span>
        </button>
      </div>
    );
  }

  if (mias.length === 1) {
    const [linea] = mias;
    return (
      <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
        <SelectorCantidad
          nombre={producto.nombre}
          valor={linea.cantidad}
          autoFocus={recienSumado}
          onCambiar={(n) => presupuesto.cambiarCantidad(linea.codigo, linea.color, n)}
        />
        <button
          type="button"
          className={linkQuitar}
          onClick={() => presupuesto.quitar(linea.codigo, linea.color)}
          aria-label={`${PRESUPUESTO.quitar} ${producto.nombre} del presupuesto`}
        >
          {PRESUPUESTO.quitar}
        </button>
      </div>
    );
  }

  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 text-sm font-semibold", className)}>
      {PRESUPUESTO.enVariosColores(mias.length)}
      <Link href="/presupuesto" className={link}>
        {PRESUPUESTO.verPresupuesto}
      </Link>
    </p>
  );
}
