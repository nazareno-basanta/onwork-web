"use client";

import { useEffect } from "react";
import { medir } from "@/lib/medicion";

/**
 * Medición en Google Analytics de los links de todo el sitio, desde un solo
 * lugar (así no hay que acordarse de medir cada botón):
 * - whatsapp_click: cada link a wa.me, con la página y el mensaje precargado.
 *   No manda datos personales: el mensaje es el texto de la web.
 * - descargar_pdf: cada link a un catálogo PDF, con el catálogo.
 * Los eventos del presupuesto se miden en sus botones (ver lib/medicion.ts).
 */
export default function Medicion() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.hostname === "wa.me") {
        medir("whatsapp_click", {
          page_path: window.location.pathname,
          // GA4 corta los valores en 100 caracteres.
          message: (url.searchParams.get("text") ?? "").slice(0, 100),
        });
      } else if (url.pathname.startsWith("/catalogos/") && url.pathname.endsWith(".pdf")) {
        medir("descargar_pdf", { catalogo: url.pathname.split("/").pop()!.replace(/\.pdf$/, "") });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
