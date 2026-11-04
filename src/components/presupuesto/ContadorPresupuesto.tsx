"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { presupuesto } from "@/lib/presupuesto";
import { btn } from "@/lib/ui";
import { usePresupuesto } from "@/lib/usePresupuesto";

/**
 * Acceso al presupuesto en el header. En escritorio, "Presupuesto" con el
 * número al lado de "Escribinos"; en el celular, un botón chico al lado de
 * "Menú" que aparece solo cuando hay productos.
 * Al sumar un producto, el número da un salto: es la única animación del
 * presupuesto (con menos movimiento, no se mueve).
 */
export default function ContadorPresupuesto({ variante }: { variante: "escritorio" | "celular" }) {
  const { listo, lineas } = usePresupuesto();
  const n = lineas.length;
  const actual = usePathname() === "/presupuesto" ? ("page" as const) : undefined;
  // Cada vez que se suma un producto, cambia la key del número y el salto se repite.
  const [saltos, setSaltos] = useState(0);
  useEffect(() => presupuesto.alSumar(() => setSaltos((s) => s + 1)), []);

  const numero = (clase: string) => (
    <span
      key={saltos}
      aria-hidden
      className={`${saltos > 0 ? "salto " : ""}grid place-items-center rounded-full bg-ow-yellow font-display text-xs font-extrabold tabular-nums text-ow-black ${clase}`}
    >
      {n || ""}
    </span>
  );
  const etiqueta = n > 0 ? `${PRESUPUESTO.header}: ${PRESUPUESTO.productos(n)}` : PRESUPUESTO.header;

  if (variante === "escritorio") {
    return (
      // 44 px de alto como "Escribinos" (el borde de 2 px se compensa con menos
      // relleno), y el lugar del número siempre reservado: la pastilla no
      // cambia de tamaño cuando aparece, así el header no se mueve.
      <Link href="/presupuesto" aria-label={etiqueta} aria-current={actual} className={`${btn.line} !gap-2 !py-2.5 !px-5`}>
        {PRESUPUESTO.header}
        {numero(`h-5 min-w-5 px-1 ${n === 0 ? "invisible" : ""}`)}
      </Link>
    );
  }

  if (!listo || n === 0) return null;
  return (
    <Link
      href="/presupuesto"
      aria-label={etiqueta}
      aria-current={actual}
      className="relative grid size-11 shrink-0 place-items-center rounded-full border-2 border-ow-black transition-colors duration-300 ease-ow hover:bg-ow-black hover:text-white"
    >
      <Icon name="presupuesto" size={20} />
      {numero("absolute -top-1.5 -right-1.5 h-6 min-w-6 px-1.5")}
    </Link>
  );
}
