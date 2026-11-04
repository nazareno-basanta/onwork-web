/**
 * Datos estructurados (schema.org) que le explican a Google y a los buscadores
 * con IA qué es On Work. Se validan con los tipos de schema-dts.
 */
import type { FAQPage, Organization, WebSite, WithContext } from "schema-dts";
import type { Pregunta } from "@/data/preguntas";
import { SITE } from "@/lib/site";
import { tieneMarcador } from "@/lib/utils";

const ORGANIZACION_ID = `${SITE.url}/#organization`;

// Sin LocalBusiness ni calle: el Perfil de Empresa de Google va con la
// dirección oculta (área de servicio) y no hay una dirección confirmada.
export const organizacion: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZACION_ID,
  name: SITE.name,
  url: SITE.url,
  // PNG sobre blanco de más de 112 px, como pide Google.
  logo: `${SITE.url}/brand/logo-onwork-google.png`,
  foundingDate: "1990",
  // La de 04-SEO-Y-REDIRECCIONES.md, sin "fotografía de producto" (Nachi la
  // sacó de la web el 2/11/2026).
  description:
    "Empresa familiar de comunicación y merchandising de Buenos Aires: merchandising, indumentaria, cartelería y tarjetería.",
  areaServed: "AR",
  address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
  sameAs: [SITE.instagram, "https://www.facebook.com/onworkba"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.whatsappVisible,
    contactType: "sales",
    areaServed: "AR",
    availableLanguage: "es",
  },
};

/** Ayuda a que Google muestre "On Work" como nombre del sitio en los resultados. */
export const sitioWeb: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "es-AR",
  publisher: { "@id": ORGANIZACION_ID },
};

/**
 * Preguntas frecuentes de una página. Solo van las que ya están completas (sin
 * ningún marcador), con el mismo texto que se ve en la página.
 */
export function preguntasFrecuentes(preguntas: Pregunta[]): WithContext<FAQPage> | null {
  const completas = preguntas.filter((q) => !tieneMarcador(q.pregunta) && !tieneMarcador(q.respuesta));
  if (completas.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: completas.map((q) => ({
      "@type": "Question",
      name: q.pregunta,
      acceptedAnswer: { "@type": "Answer", text: q.respuesta },
    })),
  };
}
