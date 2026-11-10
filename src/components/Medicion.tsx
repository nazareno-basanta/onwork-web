"use client";

import { useEffect } from "react";
import { medir } from "@/lib/medicion";
import { tipoDePagina } from "@/lib/tipoDePagina";

/**
 * Medición en Google Analytics de los links de todo el sitio, desde un solo
 * lugar (así no hay que acordarse de medir cada botón):
 * - whatsapp_click: cada link a wa.me, con la página, su tipo (idea,
 *   producto, catálogo…, ver lib/tipoDePagina.ts) y el mensaje precargado.
 *   No manda datos personales: el mensaje es el texto de la web.
 * - descargar_pdf: cada link a un catálogo PDF, con el catálogo y el tipo de página.
 * Los eventos del presupuesto se miden en sus botones (ver lib/medicion.ts).
 */
export default function Medicion() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const page_type = tipoDePagina(window.location.pathname);
      if (url.hostname === "wa.me") {
        medir("whatsapp_click", {
          page_path: window.location.pathname,
          page_type,
          // GA4 corta los valores en 100 caracteres.
          message: (url.searchParams.get("text") ?? "").slice(0, 100),
        });
      } else if (url.pathname.startsWith("/catalogos/") && url.pathname.endsWith(".pdf")) {
        medir("descargar_pdf", { catalogo: url.pathname.split("/").pop()!.replace(/\.pdf$/, ""), page_type });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
