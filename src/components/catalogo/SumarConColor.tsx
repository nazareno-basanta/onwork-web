"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Icon from "@/components/Icon";
import BotonPresupuesto from "@/components/presupuesto/BotonPresupuesto";
import { PRODUCTO_PAGINA } from "@/data/catalogos";
import { PRESUPUESTO } from "@/data/presupuesto";
import { barras, useBarraProducto } from "@/lib/barras";
import { medir } from "@/lib/medicion";
import { presupuesto } from "@/lib/presupuesto";
import { usePresupuesto } from "@/lib/usePresupuesto";

type Props = {
  producto: { codigo: string; nombre: string; catalogo: string };
  colores: string[];
  /** Qué foto de la galería (posición) muestra cada color, si se sabe. */
  fotoDeColor?: Record<string, number>;
};

/**
 * En la página del producto: el color (dentro de la gama del producto, con
 * "A definir" marcado de entrada) y "Sumar al presupuesto" con ese color. Con
 * un solo color no hay nada que elegir: se suma con ese.
 * Los colores son un grupo de opciones (radio): se recorren con las flechas
 * del teclado y el lector de pantalla los anuncia como "Color".
 *
 * En el celular, cuando este bloque queda fuera de la pantalla (la galería y
 * la descripción lo empujan hacia abajo), aparece una barra fija con
 * "Sumar" (con el color elegido) en lugar de la barra del presupuesto.
 */
export default function SumarConColor({ producto, colores, fotoDeColor }: Props) {
  const nombre = useId();
  const [color, setColor] = useState(colores.length === 1 ? colores[0] : "");
  const bloque = useRef<HTMLDivElement>(null);
  const barraVisible = useBarraProducto();
  const { lineas } = usePresupuesto();
  const enElPresupuesto = lineas.some((l) => l.codigo === producto.codigo && l.color === color);

  useEffect(() => {
    const el = bloque.current;
    if (!el) return;
    const observador = new IntersectionObserver(([e]) => {
      const celular = window.matchMedia("(max-width: 1023px)").matches;
      barras.cambiarProducto(celular && !e.isIntersecting);
    });
    observador.observe(el);
    return () => {
      observador.disconnect();
      barras.cambiarProducto(false);
    };
  }, []);

  const sumarDesdeLaBarra = () => {
    presupuesto.sumar(producto.codigo, color, { aviso: producto.nombre });
    medir("sumar_al_presupuesto", { codigo: producto.codigo, catalogo: producto.catalogo });
  };

  return (
    <div ref={bloque}>
      {colores.length > 1 && (
        <fieldset>
          <legend className="font-display text-sm font-bold">
            {PRESUPUESTO.color}
            <span className="font-semibold text-ow-gray"> · {colores.length}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {["", ...colores].map((c) => (
              <label
                key={c || "a-definir"}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 border-ow-black/15 px-4 text-sm font-semibold transition-colors duration-300 ease-ow hover:border-ow-black has-checked:border-ow-black has-checked:bg-ow-black has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ow-black"
              >
                <input
                  type="radio"
                  name={nombre}
                  value={c}
                  checked={color === c}
                  onChange={() => {
                    setColor(c);
                    // La galería pasa a la foto de ese color (GaleriaProducto escucha este aviso).
                    const foto = fotoDeColor?.[c];
                    if (foto !== undefined) window.dispatchEvent(new CustomEvent("ow:ver-foto", { detail: foto }));
                  }}
                  className="sr-only"
                />
                {c || PRESUPUESTO.aDefinir}
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-ow-gray">{PRODUCTO_PAGINA.colorAyuda}</p>
        </fieldset>
      )}
      {colores.length === 1 && (
        <p className="text-sm">
          <span className="font-display font-bold">{PRESUPUESTO.color}</span> · {colores[0]}
        </p>
      )}
      <BotonPresupuesto destacado producto={producto} color={color} className={colores.length > 0 ? "mt-6" : undefined} />

      {barraVisible &&
        createPortal(
          <>
            {/* Lugar al final de la página para que la barra no tape el pie. */}
            <div aria-hidden className="h-16 lg:hidden" />
            <div className="entra fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-ow-black px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white lg:hidden">
              <p className="min-w-0 font-display text-sm leading-tight font-bold">
                <span className="block truncate">{producto.nombre}</span>
                {colores.length > 0 && (
                  <span className="block truncate text-xs font-semibold text-white/75">
                    {enElPresupuesto ? PRESUPUESTO.enTuPresupuesto : `${PRESUPUESTO.color}: ${color || PRESUPUESTO.aDefinir}`}
                  </span>
                )}
              </p>
              {enElPresupuesto ? (
                <Link
                  href="/presupuesto"
                  className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold text-ow-black"
                >
                  {PRESUPUESTO.verPresupuesto}
                  <Icon name="flecha-derecha" size={16} />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={sumarDesdeLaBarra}
                  aria-label={PRESUPUESTO.sumarEtiqueta(producto.nombre)}
                  className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold text-ow-black"
                >
                  <Icon name="mas" size={16} />
                  {PRESUPUESTO.sumarCorto}
                </button>
              )}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
