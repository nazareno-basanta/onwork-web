"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { usePresupuesto } from "@/lib/usePresupuesto";

const link =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * "Sumar al presupuesto" para una línea que está solo en el PDF (Cintas,
 * Llaveros, o una sección sin fotos en la web): la anota en "Otro" del
 * presupuesto, sin salir de la página, y avisa como al sumar un producto.
 */
export default function SumarLinea({ seccion, catalogo }: { seccion: string; catalogo: string }) {
  const { listo, otro } = usePresupuesto();
  const texto = PRESUPUESTO.lineaEnOtro(seccion, catalogo);
  const sumada = listo && otro.includes(texto);

  if (sumada) {
    return (
      <span className="inline-flex min-h-11 flex-wrap items-center gap-x-3 font-display text-sm font-bold">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="check" size={18} />
          {PRESUPUESTO.enTuPresupuesto}
        </span>
        <Link href="/presupuesto" className={link}>
          {PRESUPUESTO.verPresupuesto}
        </Link>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        presupuesto.sumarAOtro(texto, { aviso: seccion });
        medir("sumar_linea_al_presupuesto", { seccion, catalogo });
      }}
      className={link}
    >
      <Icon name="mas" size={18} />
      {PRESUPUESTO.sumar}
    </button>
  );
}
