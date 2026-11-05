"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { PRESUPUESTO } from "@/data/presupuesto";
import { useCelular } from "@/lib/barras";
import { presupuesto } from "@/lib/presupuesto";
import { useBarraPresupuesto } from "./BarraPresupuesto";

const DURACION = 4500;

/**
 * Confirmación chica al sumar un producto: "Sumaste Apóstoles al
 * presupuesto." con "Ver presupuesto". Se va sola, sin modales. En el celular
 * aparece abajo (arriba de la barra del presupuesto); en escritorio, arriba a
 * la derecha, debajo del header.
 *
 * También anuncia a los lectores de pantalla cuántos productos quedan cuando
 * se quita uno desde un catálogo. Al sumar ya avisa el aviso, y en
 * /presupuesto la lista anuncia lo que se quitó.
 */
export default function AvisoPresupuesto() {
  const pathname = usePathname();
  const [aviso, setAviso] = useState<{ nombre: string; id: number } | null>(null);
  const [anuncio, setAnuncio] = useState("");
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () =>
      presupuesto.alSumar(({ nombre }) => {
        setAviso({ nombre, id: Date.now() });
        clearTimeout(temporizador.current);
        temporizador.current = setTimeout(() => setAviso(null), DURACION);
      }),
    [],
  );

  const ruta = useRef(pathname);
  useEffect(() => {
    ruta.current = pathname;
  }, [pathname]);

  // Solo cuando baja la cantidad de productos, fuera de /presupuesto (no al cargar).
  useEffect(() => {
    let anterior = presupuesto.leer().lineas.length;
    return presupuesto.suscribir(() => {
      const n = presupuesto.leer().lineas.length;
      if (n < anterior && ruta.current !== "/presupuesto") setAnuncio(PRESUPUESTO.anuncio(n));
      anterior = n;
    });
  }, []);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  // En /presupuesto no hace falta: la persona ya está viendo la lista. En el
  // celular, si hay una barra abajo, confirma la barra (no se apilan).
  const barra = useBarraPresupuesto();
  const celular = useCelular();
  const corresponde = aviso !== null && pathname !== "/presupuesto";
  const visible = corresponde && !(barra && celular) ? aviso : null;
  // Cuando confirma la barra, el lector de pantalla igual lo escucha desde acá.
  const soloAnuncio = corresponde && barra && celular ? aviso : null;

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {anuncio}
      </p>
      <div role="status" className="pointer-events-none fixed inset-x-4 bottom-24 z-[55] flex justify-center lg:inset-x-auto lg:top-20 lg:right-6 lg:bottom-auto">
        {soloAnuncio && <span className="sr-only">{PRESUPUESTO.aviso(soloAnuncio.nombre)}</span>}
        {visible && (
          <div
            key={visible.id}
            // El borde crema lo separa del pie (tinta sobre tinta) sin usar sombra.
            className="entra pointer-events-auto flex max-w-md items-center gap-4 rounded-3xl border-2 border-ow-paper bg-ow-black py-3 pr-3 pl-5 text-sm text-white"
          >
            <p className="font-semibold">
              {PRESUPUESTO.aviso(visible.nombre)}{" "}
              <Link
                href="/presupuesto"
                className="font-bold whitespace-nowrap text-ow-yellow underline decoration-2 underline-offset-4 hover:text-white"
              >
                {PRESUPUESTO.verPresupuesto}
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setAviso(null)}
              aria-label="Cerrar el aviso"
              className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10"
            >
              <Icon name="cerrar" size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
