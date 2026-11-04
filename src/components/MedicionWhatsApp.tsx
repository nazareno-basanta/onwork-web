"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Cuenta en Google Analytics cada clic a WhatsApp (evento "whatsapp_click"),
 * con la página y el mensaje precargado. Escucha todos los links a wa.me del
 * sitio (botones, filas de servicios, botón flotante, pie, menú), así no hay
 * que acordarse de medir cada uno. No manda datos personales: el mensaje es el
 * texto fijo de la web, no lo que escribe la persona.
 *
 * Las descargas de PDF no hacen falta: GA4 las mide solo (file_download).
 */
export default function MedicionWhatsApp() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;
      const mensaje = new URL(link.href).searchParams.get("text") ?? "";
      sendGAEvent("event", "whatsapp_click", {
        page_path: window.location.pathname,
        // GA4 corta los valores en 100 caracteres.
        message: mensaje.slice(0, 100),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
