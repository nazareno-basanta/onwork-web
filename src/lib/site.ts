/**
 * Datos centrales del sitio. Todo lo que se repite en varias páginas
 * (nombre, dominio, WhatsApp, navegación) vive acá: se cambia una vez y se
 * actualiza en todo el sitio.
 */
import { HAY_IDEAS } from "@/data/ideas";
import { HAY_PEDIDOS } from "@/data/pedidos";
import { mensajeWeb } from "@/lib/mensajes";

export const SITE = {
  name: "On Work",
  tagline: "Comunicación & merchandising",
  // Dominio final (elegido el 10/11/2026). Se usa para SEO (canonical,
  // sitemap, Open Graph). www.onwork.com.ar, onworkba.com.ar y onworkba.com
  // (el del Wix) redirigen a este desde Vercel. Si cambia, cambiar también
  // DOMINIO en next.config.ts.
  url: "https://onwork.com.ar",
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
export const MENSAJE_GENERAL = mensajeWeb();

/**
 * Menú principal (también el del celular y el pie). "Pedidos reales" aparece
 * solo cuando hay pedidos cargados, e "Ideas" con la primera nota publicada.
 */
export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/catalogos", label: "Catálogos" },
  { href: "/pedidos", label: "Pedidos reales" },
  { href: "/ideas", label: "Ideas" },
  { href: "/contacto", label: "Contacto" },
].filter((item) => (item.href !== "/pedidos" || HAY_PEDIDOS) && (item.href !== "/ideas" || HAY_IDEAS));

/**
 * Con más de 4 links, la pastilla del menú no entra entre 1024 y 1279 px junto
 * a la lupa, el presupuesto y "Escribinos": en ese ancho se usa el botón
 * "Menú" del celular, y la pastilla aparece desde 1280 px (decisión de Nachi,
 * 10/11/2026).
 */
export const MENU_LARGO = NAV.length > 4;
