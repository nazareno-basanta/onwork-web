/**
 * Textos del presupuesto: la página /presupuesto, el botón de cada producto,
 * el contador del header, la barra del celular y el aviso al sumar.
 * Los de la especificación son de Nachi; los borradores (bajada, vacío, aviso,
 * lista larga y el ejemplo del campo "Otro") se aprobaron con el plan del
 * 4/11/2026. Los de "ya enviaste", copiar, descartados y quitar son borradores
 * de los arreglos de la crítica (4/11/2026), para aprobar. Cambialos acá.
 */
const productos = (n: number) => `${n} ${n === 1 ? "producto" : "productos"}`;
const unidades = (n: number) => `${n.toLocaleString("es-AR")} ${n === 1 ? "unidad" : "unidades"}`;

export const PRESUPUESTO = {
  h1: "Tu presupuesto.",
  bajada: "Revisá cantidades y colores, y mandalo por WhatsApp: te respondemos con la cotización.",
  vacio: "Todavía no sumaste productos.",
  verCatalogos: "Ver catálogos",

  color: "Color",
  aDefinir: "A definir",
  /** Debajo de la bajada, si alguna línea quedó en "A definir" (borrador, 4/11/2026). */
  aDefinirAyuda: 'Los colores que dejes en "A definir" los vemos juntos por WhatsApp.',
  otroColor: "Sumar otro color",
  quitar: "Quitar",

  otroTitulo: "¿Buscás algo que no está en los catálogos?",
  /** ✏️ Borrador: link al campo "Otro" desde la banda de búsquedas y el buscador del hub. */
  sumarOtro: "Sumalo a tu presupuesto",
  otroEjemplo: "Ej.: gorras trucker, delantales, frisbees",

  enviar: "Enviar presupuesto por WhatsApp",
  /** En la barra fija del celular, donde no entra el texto completo. */
  enviarCorto: "Enviar por WhatsApp",
  /** Según cuánto hubo que compactar el mensaje para que entre en el link (ver lib/mensajePresupuesto). */
  listaLarga: {
    2: "La lista es larga: la mandamos con los códigos, sin los nombres, para que entre en WhatsApp.",
    3: "La lista es muy larga: la mandamos con códigos y cantidades, sin colores. Para no perderlos, copiá la lista y pegala en el chat.",
  } as Record<number, string>,
  /** Para lectores de pantalla: el botón abre otra ventana. */
  abreWhatsApp: "(se abre WhatsApp)",
  copiar: "Copiar la lista",
  copiada: "Lista copiada",
  enviado: "Ya enviaste este presupuesto por WhatsApp.",
  enviadoAyuda: "¿No se abrió WhatsApp? Copiá la lista y pegala en el chat.",
  descartados: (n: number) =>
    n === 1 ? "Sacamos un producto que ya no está en la web." : `Sacamos ${n} productos que ya no están en la web.`,
  quitado: (nombre: string) => `Quitaste ${nombre} del presupuesto.`,
  /** Cuando alguien escribe 0 en la cantidad. */
  paraSacarlo: "Para sacarlo del presupuesto, tocá Quitar.",
  colorADefinir: "color a definir",
  vaciar: "Vaciar presupuesto",
  confirmarVaciar: "¿Vaciar?",
  confirmarVaciarEtiqueta: "¿Vaciar el presupuesto?",
  si: "Sí",
  no: "No",

  /** Botón de cada producto. */
  sumar: "Sumar al presupuesto",
  /** En tarjetas angostas (dos columnas en el celular). */
  sumarCorto: "Sumar",
  sumarEtiqueta: (nombre: string) => `Sumar ${nombre} al presupuesto`,
  enVariosColores: (n: number) => `En tu presupuesto, en ${n} colores.`,
  /** ✏️ Borrador: en la barra del producto (celular) y en las líneas que están solo en el PDF, cuando ya se sumó. */
  enTuPresupuesto: "En tu presupuesto",
  /** ✏️ Borrador: cómo queda en "Otro" una línea que está solo en el PDF. */
  lineaEnOtro: (seccion: string, catalogo: string) => `${seccion} (catálogo ${catalogo})`,
  /** ✏️ Borrador: en la página del producto, los otros colores que ya están en el presupuesto. */
  tambienEnColores: (colores: string[]) => `También en tu presupuesto: ${colores.join(", ")}.`,
  verPresupuesto: "Ver presupuesto",

  /** Header, barra del celular y aviso. */
  header: "Presupuesto",
  productos,
  unidades,
  barra: (n: number) => `Presupuesto · ${productos(n)}`,
  barraVer: "Ver",
  resumen: (n: number, u: number) => `${productos(n)} · ${unidades(u)}`,
  aviso: (nombre: string) => `Sumaste ${nombre} al presupuesto.`,
  anuncio: (n: number) => (n === 0 ? "El presupuesto está vacío." : `${productos(n)} en el presupuesto.`),

  seo: {
    titulo: "Tu presupuesto",
    descripcion: "Armá tu presupuesto con los productos de los catálogos y mandalo por WhatsApp.",
  },
};
