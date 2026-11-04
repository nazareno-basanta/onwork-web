import type { NextConfig } from "next";

// Slugs de los catálogos PDF (public/catalogos/<slug>.pdf).
const CATALOGOS_PDF = ["drinkware", "escritura", "cuadernos", "oficina", "marroquineria", "cintas", "llaveros"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Cada PDF le dice a Google cuál es su página (la del catálogo), así no
  // compiten entre sí. Verificar después de publicar con:
  // curl -I https://onworkba.com/catalogos/drinkware.pdf
  //
  // Además, la dirección de Vercel (onwork-web.vercel.app y las vistas previas
  // *.vercel.app) le pide a Google que no la indexe: si no, duplicaría todo el
  // sitio. En onworkba.com no aparece. Verificar con:
  // curl -I -H "Host: onwork-web.vercel.app" http://localhost:3000/
  async headers() {
    return [
      ...CATALOGOS_PDF.map((slug) => ({
        source: `/catalogos/${slug}.pdf`,
        headers: [{ key: "Link", value: `<https://onworkba.com/catalogos/${slug}>; rel="canonical"` }],
      })),
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "(?:.+\\.)?vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },

  // Redirecciones permanentes desde las URLs de la web de Wix (y desde
  // /merchandising, que ahora es el Inicio). Lista armada con
  // ../Web OW/04-SEO-Y-REDIRECCIONES.md y el sitemap de Wix del 30/10/2026
  // (pages-sitemap.xml y store-products-sitemap.xml).
  // /nosotros y /contacto mantienen la misma ruta.
  async redirects() {
    const a = (destination: string, ...sources: string[]) =>
      sources.map((source) => ({ source, destination, permanent: true }));

    return [
      ...a("/", "/merchandising", "/banners-vinilos", "/folletos-imanes"),
      ...a(
        "/catalogos/oficina",
        "/escritorio",
        "/oficina",
        "/calendarios",
        "/utiles",
        "/relojes",
        "/art-culo-ecol-gicos-de-escritorio",
      ),
      ...a(
        "/catalogos/escritura",
        "/escritura",
        "/lapices",
        "/boligrafos-plasticos",
        "/boligrafos-metalicos",
        "/resaltadores",
        "/art-culos-ecol-gicos-de-escritura",
      ),
      ...a(
        "/catalogos/drinkware",
        "/gastronomia",
        "/mates-y-equipo",
        "/termicos",
        "/vasos-y-copas",
        "/servicio-de-mesa",
      ),
      ...a("/catalogos/cuadernos", "/anotadores-ecologicos"),
      ...a("/catalogos/marroquineria", "/tiempo-libre-y-outdoor"),
      ...a("/catalogos/llaveros", "/llaveros", "/automovilytransporte"),
      ...a(
        "/catalogos",
        "/catalogo",
        "/textil",
        "/especiales-textil",
        "/remeras-buzos-camperas",
        "/buzos-y-camperas",
        "/delantales",
        "/gorras",
        "/usocotidiano",
        "/uso-cotidiano",
        "/vuelta-a-clases",
        "/ecologicos",
        "/bolsas-ecologicas",
        "/tecnologia",
        "/cargadores",
        "/pendrives",
        "/accesorioscelulares",
        "/parlantes-y-auriculares",
        "/herramientas",
        "/hogar-y-outdoor",
        "/material-presentacion",
        "/product-page/:slug*",
      ),
    ];
  },
};

export default nextConfig;
