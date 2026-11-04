/**
 * Datos centrales del sitio. Todo lo que se repite en varias páginas
 * (nombre, dominio, WhatsApp, navegación) vive acá: se cambia una vez y se
 * actualiza en todo el sitio.
 */
import { HAY_PEDIDOS } from "@/data/pedidos";

export const SITE = {
  name: "On Work",
  tagline: "Comunicación & merchandising",
  // Dominio final. Se usa para SEO (canonical, sitemap, Open Graph).
  url: "https://onworkba.com",
  locale: "es_AR",
  /**
   * WhatsApp del asesor de ventas, en formato internacional y SOLO dígitos
   * (sin "+", espacios ni guiones): 54 + 9 + código de área sin 0 + número.
   */
  whatsapp: "5491131579402",
  // El mismo número, como se muestra escrito en la web.
  whatsappVisible: "+54 9 11 3157-9402",
  instagram: "https://www.instagram.com/onworkba",
  instagramUsuario: "@onworkba",
  ubicacion: "Buenos Aires · Envíos a toda la Argentina",
  // Descripción del Inicio para Google (../Web OW/04-SEO-Y-REDIRECCIONES.md).
  descripcion:
    "Merchandising, indumentaria, cartelería y tarjetería con tu marca. Desde 1990. Buenos Aires · Envíos a toda la Argentina.",
} as const;

/** Arma el link de WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensaje que llega precargado cuando no hay uno propio de la página. */
export const MENSAJE_GENERAL = "Hola, vi On Work en la web. Necesito:";

/** Menú principal. "Pedidos reales" aparece solo cuando hay pedidos cargados. */
export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/catalogos", label: "Catálogos" },
  { href: "/pedidos", label: "Pedidos reales" },
  { href: "/contacto", label: "Contacto" },
].filter((item) => item.href !== "/pedidos" || HAY_PEDIDOS);
