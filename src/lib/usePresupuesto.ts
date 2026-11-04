"use client";

import { useSyncExternalStore } from "react";
import { presupuesto } from "./presupuesto";

/**
 * El presupuesto en un componente. En el servidor (y hasta leer lo guardado)
 * devuelve listo: false, así nada "salta" de vacío a lleno al cargar.
 */
export function usePresupuesto() {
  return useSyncExternalStore(presupuesto.suscribir, presupuesto.leer, presupuesto.leerEnServidor);
}
