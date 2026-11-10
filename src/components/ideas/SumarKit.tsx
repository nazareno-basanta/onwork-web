"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { IDEAS_PAGINA } from "@/data/ideas";
import { PRESUPUESTO } from "@/data/presupuesto";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { btn } from "@/lib/ui";
import { usePresupuesto } from "@/lib/usePresupuesto";

const link =
  "inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * "Sumar el kit al presupuesto" de una nota de Ideas: suma de una vez los
 * productos del kit (cantidad 1, color a definir) y avisa una sola vez. Los
 * que ya estaban en el presupuesto no se vuelven a sumar. Es lo que un
 * resumen de Google o de una IA no puede dar: la razón para entrar a la nota.
 */
export default function SumarKit({ codigos, nota }: { codigos: string[]; nota: string }) {
  const { listo, lineas } = usePresupuesto();
  const faltan = codigos.filter((codigo) => !lineas.some((l) => l.codigo === codigo));

  if (listo && faltan.length === 0) {
    return (
      <span className="inline-flex min-h-11 flex-wrap items-center gap-x-4 font-display text-sm font-bold">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="check" size={18} />
          {IDEAS_PAGINA.kit.enTuPresupuesto}
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
      className={btn.black}
      onClick={() => {
        faltan.forEach((codigo, i) =>
          presupuesto.sumar(codigo, "", i === faltan.length - 1 ? { aviso: IDEAS_PAGINA.kit.aviso(faltan.length) } : {}),
        );
        medir("sumar_kit_al_presupuesto", { nota, productos: faltan.length });
      }}
    >
      <Icon name="mas" size={18} />
      {IDEAS_PAGINA.kit.sumar}
    </button>
  );
}
