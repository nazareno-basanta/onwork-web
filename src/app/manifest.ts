import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Datos de la web para el celular (al agregarla a la pantalla de inicio) y
// para los buscadores. Los íconos salen del isotipo original
// (public/brand/isotipo-onwork.svg) sobre crema, con su área de resguardo.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.descripcion,
    lang: "es-AR",
    start_url: "/",
    display: "browser",
    theme_color: "#FFFCEF",
    background_color: "#FFFCEF",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icono-onwork-192.png", type: "image/png", sizes: "192x192" },
      { src: "/brand/icono-onwork-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
