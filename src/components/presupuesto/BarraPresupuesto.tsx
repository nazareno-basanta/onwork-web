"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { usePresupuesto } from "@/lib/usePresupuesto";

/**
 * ¿Se ve la barra del presupuesto? Solo en el celular, en los catálogos y sus
 * productos, y cuando hay algo en el presupuesto. Mientras se ve, reemplaza
 * al botón flotante de WhatsApp.
 */
export function useBarraPresupuesto() {
  const pathname = usePathname();
  const { listo, lineas } = usePresupuesto();
  return listo && lineas.length > 0 && pathname.startsWith("/catalogos");
}

/** Barra fija abajo en el celular: "Presupuesto · 3 productos · Ver". */
export default function BarraPresupuesto() {
  const visible = useBarraPresupuesto();
  const { lineas } = usePresupuesto();
  if (!visible) return null;

  return (
    <>
      {/* Lugar para que la barra no tape el final de la página. */}
      <div aria-hidden className="h-16 lg:hidden" />
      <Link
        href="/presupuesto"
        className="entra fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-ow-black px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white lg:hidden"
      >
        <span className="flex items-center gap-3 font-display text-sm font-bold">
          <Icon name="presupuesto" size={20} className="text-ow-yellow" />
          {PRESUPUESTO.barra(lineas.length)}
        </span>
        <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold text-ow-black">
          {PRESUPUESTO.barraVer}
          <Icon name="flecha-derecha" size={16} />
        </span>
      </Link>
    </>
  );
}
