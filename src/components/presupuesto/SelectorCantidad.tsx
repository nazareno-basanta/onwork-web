"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { CANTIDAD_MAXIMA } from "@/lib/presupuesto";
import { cn } from "@/lib/utils";

type Props = {
  valor: number;
  onCambiar: (cantidad: number) => void;
  /** Nombre del producto, para las etiquetas ("Cantidad de Apóstoles"). */
  nombre: string;
  /** Pone el foco en el número al aparecer (recién sumado). */
  autoFocus?: boolean;
  className?: string;
};

// 36 px con mouse; 44 px en pantallas táctiles (el mínimo para el dedo).
const boton =
  "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200 ease-ow pointer-coarse:size-11 hover:bg-ow-black hover:text-white " +
  "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-current";

/**
 * Cantidad de un producto: − número +. El número se escribe a mano (se
 * confirma al salir del campo o con Enter) y las flechas del teclado suman o
 * restan de a uno. Sin mínimo de pedido: va de 1 a 99.999.
 */
export default function SelectorCantidad({ valor, onCambiar, nombre, autoFocus, className }: Props) {
  // Lo que la persona está escribiendo; null cuando no está editando.
  const [borrador, setBorrador] = useState<string | null>(null);
  // Si escribe 0, la cantidad vuelve a la anterior y se explica cómo sacarlo.
  const [pista, setPista] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const confirmar = () => {
    if (borrador === null) return;
    const n = Number.parseInt(borrador, 10);
    if (Number.isFinite(n) && n > 0) onCambiar(n);
    else if (n === 0) {
      setPista(true);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setPista(false), 5000);
    }
    setBorrador(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      setBorrador(null);
      onCambiar(valor + (e.key === "ArrowUp" ? 1 : -1));
    } else if (e.key === "Enter") {
      confirmar();
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setBorrador(null);
    }
  };

  return (
    <>
      <div
        role="group"
        aria-label={`Cantidad de ${nombre}`}
        className={cn("inline-flex h-11 max-w-full items-center gap-0.5 rounded-full border-2 border-ow-black bg-white px-0.5 pointer-coarse:h-12", className)}
      >
        <button type="button" className={boton} onClick={() => onCambiar(valor - 1)} disabled={valor <= 1} aria-label={`Uno menos de ${nombre}`}>
          <Icon name="menos" size={16} strokeWidth={2.5} />
        </button>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          aria-label={`Cantidad de ${nombre}`}
          value={borrador ?? String(valor)}
          onChange={(e) => setBorrador(e.target.value.replace(/\D/g, "").slice(0, String(CANTIDAD_MAXIMA).length))}
          onBlur={confirmar}
          onKeyDown={onKeyDown}
          onFocus={(e) => e.currentTarget.select()}
          className="h-9 w-[6ch] min-w-0 shrink rounded-md bg-transparent text-center font-display text-base font-bold tabular-nums focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ow-black"
        />
        <button
          type="button"
          className={boton}
          onClick={() => onCambiar(valor + 1)}
          disabled={valor >= CANTIDAD_MAXIMA}
          aria-label={`Uno más de ${nombre}`}
        >
          <Icon name="mas" size={16} strokeWidth={2.5} />
        </button>
      </div>
      {/* Ocupa su propia línea en el contenedor (que va con flex-wrap). */}
      <span role="status" className={pista ? "basis-full text-sm text-ow-gray" : "sr-only"}>
        {pista ? PRESUPUESTO.paraSacarlo : ""}
      </span>
    </>
  );
}
