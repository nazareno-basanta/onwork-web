"use client";

import type { ComponentProps } from "react";
import { useMensajePagina } from "@/lib/mensajePagina";
import WhatsAppLink from "./WhatsAppLink";

/**
 * Botón de WhatsApp con el mensaje de la página que se está viendo (ver
 * lib/mensajePagina): "Escribinos" del header.
 */
export default function WhatsAppDePagina(props: Omit<ComponentProps<typeof WhatsAppLink>, "message">) {
  const mensaje = useMensajePagina();
  return <WhatsAppLink {...props} message={mensaje} />;
}
