/**
 * Qué tipo de página es una dirección, para agrupar las mediciones en Google
 * Analytics (por ejemplo, cuántas consultas por WhatsApp salen de las notas
 * de Ideas y cuántas de los productos). Sin imports, así se prueba con npm test.
 */
export type TipoDePagina =
  | "inicio"
  | "catalogos"
  | "catalogo"
  | "producto"
  | "ideas"
  | "idea"
  | "autor"
  | "pedidos"
  | "pedido"
  | "presupuesto"
  | "como-pedir"
  | "nosotros"
  | "contacto"
  | "otra";

const SIMPLES: Record<string, TipoDePagina> = {
  catalogos: "catalogos",
  ideas: "ideas",
  pedidos: "pedidos",
  presupuesto: "presupuesto",
  "como-pedir": "como-pedir",
  nosotros: "nosotros",
  contacto: "contacto",
};

export function tipoDePagina(pathname: string): TipoDePagina {
  const partes = pathname.split("/").filter(Boolean);
  if (partes.length === 0) return "inicio";
  const [seccion, segunda, tercera] = partes;
  if (partes.length === 1) return SIMPLES[seccion] ?? "otra";
  if (seccion === "catalogos") return tercera ? "producto" : "catalogo";
  if (seccion === "ideas") return segunda === "autores" ? (tercera ? "autor" : "otra") : "idea";
  if (seccion === "pedidos") return "pedido";
  return "otra";
}
