import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Mapa del sitio para Google. /contacto no se incluye porque solo redirige.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/merchandising`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/catalogos`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
