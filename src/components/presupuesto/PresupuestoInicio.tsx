"use client";

import { useEffect } from "react";
import { presupuesto } from "@/lib/presupuesto";

/**
 * Le pasa al presupuesto los códigos de los productos que están en la web: lo
 * guardado de un producto que ya no está (oculto, sin fotos o borrado del
 * Excel) se descarta solo.
 */
export default function PresupuestoInicio({ codigos }: { codigos: string[] }) {
  useEffect(() => presupuesto.configurarValidos(codigos), [codigos]);
  return null;
}
