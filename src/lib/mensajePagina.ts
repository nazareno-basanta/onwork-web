"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MENSAJE_GENERAL } from "@/lib/site";

/**
 * El mensaje de WhatsApp de la página que se está viendo, para los botones
 * que están en todas las páginas (el flotante y "Escribinos" del header):
 * en un catálogo, un producto, un pedido o una nota mandan el mismo mensaje
 * con contexto que los botones de esa página (Nachi, 18/11/2026). Donde la
 * página no tiene uno propio, va el general.
 *
 * La página lo anota con <MensajeDePagina mensaje="…" /> (lo hace el Cierre
 * cuando recibe un mensaje); al salir de la página se borra solo.
 */
let actual: string | null = null;
const oyentes = new Set<() => void>();

function suscribir(oyente: () => void) {
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
  };
}

function cambiar(mensaje: string | null) {
  actual = mensaje;
  oyentes.forEach((f) => f());
}

/** El mensaje de la página actual, o el general. */
export function useMensajePagina() {
  return useSyncExternalStore(
    suscribir,
    () => actual ?? MENSAJE_GENERAL,
    () => MENSAJE_GENERAL,
  );
}

/** Anota el mensaje de esta página mientras se ve. */
export function MensajeDePagina({ mensaje }: { mensaje: string }) {
  useEffect(() => {
    cambiar(mensaje);
    return () => {
      if (actual === mensaje) cambiar(null);
    };
  }, [mensaje]);
  return null;
}
