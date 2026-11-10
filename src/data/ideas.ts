/**
 * Notas de Ideas (/ideas): guías, ideas por ocasión y "cómo elegir".
 *
 * Cada nota tiene dos partes:
 *   1. Sus datos, acá abajo: título, respuesta corta, autor, fechas, textos
 *      para Google, productos del kit y preguntas.
 *   2. Su texto, en src/data/ideas/<slug>.mdx, escrito en Markdown
 *      (## para subtítulos, - o 1. para listas, | para tablas).
 *
 * Cómo sumar una nota:
 *   1. Copiá el bloque de una nota de abajo y cambiá el slug y los datos.
 *   2. Creá src/data/ideas/<slug>.mdx, con el mismo slug.
 *   3. Con borrador: true se ve en npm run dev y no en la web publicada.
 *      Para publicarla, borrá esa línea y completá las fechas. npm test avisa
 *      si quedó algún [marcador] o falta algo.
 *
 * Reglas (skills on-work-seo y seo-geo-aeo):
 *   - Una pregunta, una nota: no respondas lo mismo en dos notas.
 *   - respuesta: 40-60 palabras que respondan el título solas y nombren a
 *     On Work. Es lo que Google y las IA citan.
 *   - En el texto, cada subtítulo (##) es una pregunta y el primer párrafo de
 *     abajo la responde.
 *   - Sin "mejor" ni "mejores": "ideas", "cómo elegir", "qué conviene".
 *   - Quién firma: ver src/data/autores.ts.
 */
import type { AutorId } from "./autores";
import type { Pregunta } from "./preguntas";

export type TipoIdea = "guia" | "ideas" | "como-elegir";

/** Cómo se nombra cada tipo de nota en la web. */
export const TIPOS: Record<TipoIdea, string> = {
  guia: "Guía",
  ideas: "Ideas",
  "como-elegir": "Cómo elegir",
};

export type Idea = {
  /** La dirección: /ideas/<slug>. En minúscula, con guiones. No se cambia una vez publicada. */
  slug: string;
  tipo: TipoIdea;
  autor: AutorId;
  /** true: se ve en npm run dev y no en la web publicada. */
  borrador?: boolean;
  /** Año-mes-día. Obligatorias para publicar. */
  publicado?: string;
  /** Cada vez que cambies algo importante del texto. Se muestra en la nota. */
  actualizado?: string;
  /** Titular de la nota (h1): la pregunta o el tema. */
  titulo: string;
  /** Debajo del titular: 40-60 palabras que respondan el título. */
  respuesta: string;
  /** Lo que muestra Google: título sin punto final (~50-60 caracteres) y descripción (~150-160). */
  seo: { titulo: string; descripcion: string };
  /** Códigos OW de los productos del kit: se suman todos al presupuesto con un clic. */
  productos?: string[];
  /** Slugs de los catálogos relacionados (src/data/catalogos.ts). */
  catalogos?: string[];
  /** Slug de un pedido real del tema (src/data/pedidos.ts), si hay. */
  pedido?: string;
  /** 2 o 3 preguntas propias del tema, que no repitan las generales. */
  preguntas?: Pregunta[];
  /** Titular del cierre en tinta ("Tu marca, en cada ___."). Sin esto, va el general. */
  cierre?: string;
};

export const IDEAS: Idea[] = [
  {
    slug: "que-poner-en-un-kit-de-bienvenida",
    tipo: "ideas",
    autor: "nazareno-basanta",
    borrador: true,
    titulo: "[Titular: la pregunta como la busca la gente, ej. ¿Qué poner en un kit de bienvenida?]",
    respuesta:
      "[Respuesta corta: 40-60 palabras que respondan el titular solas y nombren a On Work. Ej.: qué combina un kit (algo para el escritorio, algo para tomar, algo para llevar) y para qué sirve]",
    seo: {
      titulo: "[Título para Google: ~50-60 caracteres, sin punto final. Ej.: Qué poner en un kit de bienvenida: ideas 2027]",
      descripcion: "[Descripción para Google: ~150-160 caracteres sobre qué resuelve la nota]",
    },
    // Productos de ejemplo, para probar el bloque "Productos del kit": cambialos por los que quieras.
    productos: ["OW-CUA-22", "OW-ESC-01", "OW-DRK-23", "OW-MAR-01"],
    catalogos: ["cuadernos", "escritura", "drinkware", "marroquineria"],
    preguntas: [
      {
        pregunta: "[Pregunta propia del tema, ej. ¿Cuántos productos lleva un kit?]",
        respuesta: "[Respuesta de menos de 60 palabras]",
      },
      {
        pregunta: "[Pregunta propia del tema, ej. ¿Se puede armar un kit para pocas personas?]",
        respuesta: "[Respuesta de menos de 60 palabras]",
      },
    ],
  },
  {
    // Sale del carrusel de Instagram "¿Por qué tu marca necesita un set matero?"
    // (26/10/2026). Borrador de Claude con los textos del posteo y los datos del
    // catálogo Drinkware, para que lo revisen Nachi y Sergio.
    slug: "set-matero-con-tu-marca",
    tipo: "como-elegir",
    autor: "sergio-basanta",
    borrador: true,
    titulo: "¿Por qué tu marca necesita un set matero?",
    respuesta:
      "Porque el mate se comparte todos los días: en la oficina, en la ruta o en casa, pasa de mano en mano y tu marca va con él. Un set matero de On Work junta mate, bombilla, termo y matera, cada pieza con tu marca, y si la acción es compartida, entran las dos marcas.",
    seo: {
      titulo: "Set matero con tu marca: qué lleva y por qué funciona",
      descripcion:
        "Por qué un set matero funciona como regalo de empresa, qué piezas lleva y cómo va tu marca en el mate, la bombilla, el termo y la matera.",
    },
    // Parecidos al set del posteo (mate vasito, bombilla, termo con media manija y matera): cambialos si querés.
    productos: ["OW-DRK-04", "OW-DRK-15", "OW-DRK-18", "OW-DRK-07"],
    catalogos: ["drinkware"],
    // Cuando se cargue el pedido de Casa Fernandes (con su OK), sumá acá: pedido: "<slug del pedido>".
    preguntas: [
      {
        pregunta: "¿Puedo elegir las piezas del set?",
        respuesta:
          "Sí. Podés armarlo con el mate, el termo y la matera del catálogo Drinkware que elijas, o pedirnos algo que no esté: lo buscamos para tu marca. Sumá las piezas a tu presupuesto y mandalo por WhatsApp.",
      },
      {
        pregunta: "¿Puede ir otra marca además de la nuestra?",
        respuesta:
          "Sí. En las acciones compartidas, cada pieza del set lleva las dos marcas. Mandanos los dos logos por WhatsApp y te mostramos cómo quedan antes de producir.",
      },
    ],
    cierre: "Tu marca, en cada ronda.",
  },
];

/** Las notas que están en la web publicada. */
export const IDEAS_PUBLICADAS = IDEAS.filter((idea) => !idea.borrador);

/** Mientras no haya ninguna publicada, Ideas no aparece en el menú, el pie ni el sitemap. */
export const HAY_IDEAS = IDEAS_PUBLICADAS.length > 0;

/** Las que tienen página: en npm run dev, todas (también los borradores); en la web publicada, solo las publicadas. */
export const IDEAS_VISIBLES = process.env.NODE_ENV === "production" ? IDEAS_PUBLICADAS : IDEAS;

/**
 * Textos de /ideas, la lista de notas. Borrador de Claude (10/11/2026), para
 * revisar.
 */
export const IDEAS_INDICE = {
  h1: "Ideas para tu marca.",
  bajada: "Guías para elegir productos, técnicas y kits según la ocasión y quién los va a usar.",
  vacio: "[Ideas: publicá al menos una nota (en src/data/ideas.ts, borrá borrador: true)]",
  borrador: "Borrador",
  seo: {
    titulo: "Ideas y guías de merchandising para empresas",
    descripcion:
      "Guías para elegir merchandising con el logo de tu marca: qué poner en un kit, qué técnica conviene y qué regalar en cada ocasión.",
  },
};

/**
 * Textos fijos de la página de cada nota. Borrador de Claude (10/11/2026),
 * para revisar.
 */
export const IDEAS_PAGINA = {
  migas: "Ideas",
  por: "Por",
  actualizado: "Actualizado el",
  borrador: "Borrador: esta nota se ve acá y no en la web publicada.",
  kit: {
    titulo: "Armá este kit.",
    sumar: "Sumar el kit al presupuesto",
    /** Completa el aviso "Sumaste … al presupuesto.". */
    aviso: (n: number) => (n === 1 ? "el producto que faltaba del kit" : `los ${n} productos del kit`),
    enTuPresupuesto: "El kit está en tu presupuesto",
  },
  verCatalogo: (catalogo: string) => `Catálogo ${catalogo}`,
  pedido: "Así se ve en un pedido real.",
};
