import { sendGAEvent } from "@next/third-parties/google";

/**
 * Manda un evento a Google Analytics 4. Si GA no está cargado (sin
 * NEXT_PUBLIC_GA_ID, o bloqueado), no hace nada. Sin datos personales.
 *
 * Eventos: whatsapp_click, sumar_al_presupuesto, sumar_linea_al_presupuesto,
 * sumar_kit_al_presupuesto (el kit de una nota de Ideas), enviar_presupuesto,
 * enviar_presupuesto_mail (el mismo presupuesto, por mail),
 * vaciar_presupuesto y descargar_pdf. whatsapp_click y descargar_pdf llevan
 * page_type (ver lib/tipoDePagina.ts) para comparar de qué páginas salen.
 */
export function medir(evento: string, datos: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", evento, datos);
}
