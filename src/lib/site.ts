/**
 * Datos centrales del sitio. Todo lo que se repite en varias páginas
 * (nombre, dominio, WhatsApp, navegación) vive acá: se cambia una vez y se
 * actualiza en todo el sitio.
 */
export const SITE = {
  name: "On Work",
  tagline: "Comunicación & merchandising",
  // Dominio final. Se usa para SEO (canonical, sitemap, Open Graph).
  url: "https://onworkba.com",
  locale: "es_AR",
  /**
   * ⚠️ PENDIENTE: reemplazar por el número real de WhatsApp (el que termina en 9402).
   * Formato internacional, SOLO dígitos: sin "+", sin espacios, sin guiones.
   * Celular argentino: 54 + 9 + código de área (sin 0) + número (sin 15).
   * Ejemplo de formato: 5491112349402
   */
  whatsapp: "549XXXXXXXX9402",
} as const;

/** Arma el link de WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const MENSAJE_GENERAL =
  "¡Hola On Work! Quiero hacerles una consulta.";

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/merchandising", label: "Merchandising" },
  { href: "/catalogos", label: "Catálogos" },
] as const;
