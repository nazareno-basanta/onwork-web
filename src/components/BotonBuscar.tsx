"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATALOGOS_HUB } from "@/data/catalogos";
import Icon from "./Icon";

/** El campo del buscador del hub (BuscadorProductos lo enfoca al llegar con #buscar). */
export const ID_CAMPO_BUSCAR = "buscar-productos";

/**
 * Lupa del header: desde cualquier página lleva al buscador de productos de
 * /catalogos, con el cursor en el campo. Si ya se está en /catalogos, sube
 * hasta el buscador.
 */
export default function BotonBuscar() {
  const pathname = usePathname();
  return (
    <Link
      href="/catalogos#buscar"
      aria-label={CATALOGOS_HUB.buscador.botonHeader}
      title={CATALOGOS_HUB.buscador.botonHeader}
      onClick={(e) => {
        if (pathname !== "/catalogos") return;
        const campo = document.getElementById(ID_CAMPO_BUSCAR);
        if (!campo) return;
        e.preventDefault();
        const menos = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        campo.scrollIntoView({ block: "center", behavior: menos ? "auto" : "smooth" });
        campo.focus({ preventScroll: true });
      }}
      className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ow-black transition-colors duration-300 ease-ow hover:bg-ow-black hover:text-white"
    >
      <Icon name="buscar" size={20} />
    </Link>
  );
}
