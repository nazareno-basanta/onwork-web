import { sendGAEvent } from "@next/third-parties/google";

/**
 * Manda un evento a Google Analytics 4. Si GA no está cargado (sin
 * NEXT_PUBLIC_GA_ID, o bloqueado), no hace nada. Sin datos personales.
 *
 * Eventos: whatsapp_click, sumar_al_presupuesto, enviar_presupuesto,
 * vaciar_presupuesto y descargar_pdf.
 */
export function medir(evento: string, datos: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", evento, datos);
}
