"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { useBarraProducto } from "@/lib/barras";
import { presupuesto } from "@/lib/presupuesto";
import { usePresupuesto } from "@/lib/usePresupuesto";

/**
 * ¿Hay una barra abajo en el celular? La del presupuesto (en los catálogos y
 * sus productos, cuando hay algo en el presupuesto) o la de "Sumar" de un
 * producto. Mientras se ve, reemplaza al botón flotante de WhatsApp y al
 * aviso flotante (la barra misma confirma lo que se sumó).
 */
export function useBarraPresupuesto() {
  const pathname = usePathname();
  const { listo, lineas } = usePresupuesto();
  const producto = useBarraProducto();
  return producto || (listo && lineas.length > 0 && pathname.startsWith("/catalogos"));
}

// Cuánto se ve "Sumaste … al presupuesto." en la barra.
const CONFIRMACION = 3500;

/**
 * Barra fija abajo en el celular: "Presupuesto · 3 productos · Ver". Al sumar
 * algo, muestra unos segundos "Sumaste Trelew al presupuesto." (en el celular
 * reemplaza al aviso flotante: así no se apilan dos bloques tinta).
 */
export default function BarraPresupuesto() {
  const visible = useBarraPresupuesto();
  const producto = useBarraProducto();
  const { lineas } = usePresupuesto();
  const [sumado, setSumado] = useState<string | null>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(
    () =>
      presupuesto.alSumar(({ nombre }) => {
        setSumado(nombre);
        clearTimeout(temporizador.current);
        temporizador.current = setTimeout(() => setSumado(null), CONFIRMACION);
      }),
    [],
  );
  useEffect(() => () => clearTimeout(temporizador.current), []);
  // Mientras se ve la barra "Sumar" del producto, esta no aparece.
  if (!visible || producto) return null;

  return (
    <>
      {/* Lugar para que la barra no tape el final de la página. */}
      <div aria-hidden className="h-16 lg:hidden" />
      <Link
        href="/presupuesto"
        className="entra fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-ow-black px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white lg:hidden"
      >
        <span className="flex min-w-0 items-center gap-3 font-display text-sm font-bold">
          <Icon name={sumado ? "check" : "presupuesto"} size={20} className="shrink-0 text-ow-yellow" />
          <span key={sumado ?? "total"} className="entra line-clamp-2">
            {sumado ? PRESUPUESTO.aviso(sumado) : PRESUPUESTO.barra(lineas.length)}
          </span>
        </span>
        <span className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold text-ow-black">
          {PRESUPUESTO.barraVer}
          <Icon name="flecha-derecha" size={16} />
        </span>
      </Link>
    </>
  );
}
