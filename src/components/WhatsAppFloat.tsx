"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";
import { usePresupuesto } from "@/lib/usePresupuesto";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import { useBarraPresupuesto } from "./presupuesto/BarraPresupuesto";

/**
 * Botón flotante de WhatsApp, fijo abajo a la derecha. Es un link simple a
 * wa.me (sin widget de chat, que pesa y empeora la velocidad).
 * En el celular, en los catálogos, lo reemplaza la barra del presupuesto
 * mientras haya productos sumados. En /presupuesto con productos no aparece:
 * la página ya tiene su botón para enviar.
 */
export default function WhatsAppFloat() {
  const barra = useBarraPresupuesto();
  const pathname = usePathname();
  const { lineas } = usePresupuesto();
  if (pathname === "/presupuesto" && lineas.length > 0) return null;

  return (
    <a
      href={whatsappUrl(MENSAJE_GENERAL)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full border-2 border-ow-black bg-ow-yellow text-ow-black transition-transform duration-300 ease-ow hover:-translate-y-1 md:right-6 md:bottom-6",
        barra && "max-lg:hidden",
      )}
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
