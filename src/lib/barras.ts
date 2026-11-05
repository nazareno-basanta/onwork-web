"use client";

import { useSyncExternalStore } from "react";

/**
 * Las barras fijas de abajo en el celular no pueden verse dos a la vez. En la
 * página de un producto, cuando su botón "Sumar" queda fuera de la pantalla,
 * aparece la barra "Sumar al presupuesto" del producto y se esconden la del
 * presupuesto y el botón flotante de WhatsApp.
 */
let barraProducto = false;
const oyentes = new Set<() => void>();

export const barras = {
  cambiarProducto(visible: boolean) {
    if (barraProducto === visible) return;
    barraProducto = visible;
    oyentes.forEach((f) => f());
  },
  suscribir(f: () => void) {
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  },
};

export const useBarraProducto = () =>
  useSyncExternalStore(barras.suscribir, () => barraProducto, () => false);

/** true en el celular y la tablet (donde están las barras de abajo; desde 1024 px, no). */
export function useCelular() {
  return useSyncExternalStore(
    (f) => {
      const m = window.matchMedia("(max-width: 1023px)");
      m.addEventListener("change", f);
      return () => m.removeEventListener("change", f);
    },
    () => window.matchMedia("(max-width: 1023px)").matches,
    () => false,
  );
}
