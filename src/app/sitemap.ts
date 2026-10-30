import type { MetadataRoute } from "next";
import { CATALOGOS } from "@/data/catalogos";
import { PEDIDOS } from "@/data/pedidos";
import { SITE } from "@/lib/site";

// Mapa del sitio para Google: todas las páginas, los catálogos, los pedidos
// y los PDF que ya estén publicados.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/catalogos"), changeFrequency: "monthly", priority: 0.9 },
    ...CATALOGOS.map((c) => ({
      url: url(`/catalogos/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...CATALOGOS.filter((c) => c.pdf).map((c) => ({
      url: url(c.pdf!),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    { url: url("/pedidos"), changeFrequency: "monthly", priority: 0.7 },
    ...PEDIDOS.map((p) => ({
      url: url(`/pedidos/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/nosotros"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contacto"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
