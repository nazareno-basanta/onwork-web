/**
 * Datos estructurados (schema.org) que le explican a Google y a los buscadores
 * con IA qué es On Work. Se validan con los tipos de schema-dts.
 */
import type { BlogPosting, FAQPage, ItemList, Organization, Person, ProfilePage, WebSite, WithContext } from "schema-dts";
import { AUTORES, type AutorId } from "@/data/autores";
import type { Idea } from "@/data/ideas";
import type { Pregunta } from "@/data/preguntas";
import { urlAutor, urlIdea } from "@/lib/rutas";
import { SITE } from "@/lib/site";
import { sinMarcadores, tieneMarcador } from "@/lib/utils";

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
 * Los productos de la página de un catálogo, en el orden en que se ven (cada
 * uno con el link a su página). Sin "Product": Google lo pide con precio,
 * reseñas o calificación, y la web no tiene ninguno de los tres.
 */
export function listaDeProductos(nombre: string, productos: { nombre: string; url: string }[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nombre,
    numberOfItems: productos.length,
    itemListElement: productos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nombre,
      url: `${SITE.url}${p.url}`,
    })),
  };
}

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

/**
 * Quién firma una nota de Ideas: nombre, rol y su relación con On Work. Con
 * esto Google sabe que la guía la escribe una persona real del rubro. La bio
 * va solo si ya está completa.
 */
export function persona(id: AutorId): Person {
  const autor = AUTORES[id];
  const url = `${SITE.url}${urlAutor(id)}`;
  return {
    "@type": "Person",
    "@id": `${url}#persona`,
    name: autor.nombre,
    jobTitle: autor.rol,
    url,
    worksFor: { "@id": ORGANIZACION_ID },
    ...(autor.bio && !tieneMarcador(autor.bio) && { description: autor.bio }),
    ...(autor.foto && { image: `${SITE.url}${autor.foto}` }),
    ...(autor.perfiles?.length && { sameAs: autor.perfiles }),
  };
}

/** Una nota de Ideas como artículo: titular, fechas, autor y On Work como editor. */
export function articulo(idea: Idea): WithContext<BlogPosting> {
  const url = `${SITE.url}${urlIdea(idea.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#articulo`,
    mainEntityOfPage: url,
    headline: sinMarcadores(idea.titulo),
    description: sinMarcadores(idea.seo.descripcion),
    image: `${url}/opengraph-image`,
    ...(idea.publicado && { datePublished: idea.publicado }),
    ...(idea.actualizado && { dateModified: idea.actualizado }),
    author: persona(idea.autor),
    publisher: { "@id": ORGANIZACION_ID },
    inLanguage: "es-AR",
  };
}

/** La página de un autor: Google la reconoce como el perfil de esa persona. */
export function perfil(id: AutorId): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE.url}${urlAutor(id)}`,
    mainEntity: persona(id),
  };
}
