"use client";

import { useSyncExternalStore } from "react";

/**
 * ¿La persona pidió menos movimiento (prefers-reduced-motion)?
 *
 * En el servidor no se sabe, así que la página sale siempre con movimiento.
 * Este hook arranca igual que el servidor (false) y cambia justo después de
 * cargar: así el HTML del servidor y el primer dibujo del navegador coinciden
 * y React no tiene que rearmar la página (useReducedMotion de motion responde
 * distinto en el primer dibujo y eso rompía el Inicio). Mismo método que el
 * carrusel del hero.
 */
const CONSULTA = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const consulta = window.matchMedia(CONSULTA);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

export function useMenosMovimiento() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
}
