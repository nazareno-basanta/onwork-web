"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Al pasar a otra página sin recargar (los links de Next), el link que se
 * tocó desaparece y el foco quedaba en ningún lado: con el teclado, el
 * siguiente Tab saltaba al pie. Acá, si el foco se perdió, pasa al contenido
 * principal (<main id="contenido">), sin mover la página: el siguiente Tab
 * arranca desde arriba de la página nueva.
 */
export default function FocoAlNavegar() {
  const pathname = usePathname();
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    // Un link a una parte de la página (#buscar, #presupuesto-otro) maneja su propio foco.
    if (window.location.hash) return;
    const activo = document.activeElement as HTMLElement | null;
    // Si el foco sigue en algo que se ve (por ejemplo, un link del menú), se queda ahí.
    if (activo && activo !== document.body && activo.checkVisibility?.() !== false) return;
    document.getElementById("contenido")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
