/**
 * Mensajes de WhatsApp precargados. Todos usan la misma frase de Nachi
 * (4/11/2026), completada según la página:
 *   mensajeWeb("el catálogo Drinkware")
 *   → "Hola, vi en la web de On Work y me interesaría saber sobre el catálogo Drinkware."
 * Sin contexto, la frase queda abierta para que la persona la termine.
 */
const FRASE = "Hola, vi en la web de On Work y me interesaría saber sobre";

export function mensajeWeb(sobre?: string) {
  return sobre ? `${FRASE} ${sobre}.` : `${FRASE} `;
}
