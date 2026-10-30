/**
 * Preguntas frecuentes del Inicio y de Contacto.
 * Textos de ../Web OW/03-CONTENIDO-PAGINAS.md. Lo que está entre [corchetes]
 * falta confirmar y se ve así en la web hasta que lo completes.
 *
 * Las respuestas quedan escritas en la página (no se cargan al abrir), así
 * Google también las lee.
 */
export type Pregunta = {
  pregunta: string;
  respuesta: string;
};

export const PREGUNTAS: Pregunta[] = [
  {
    pregunta: "¿Hay un mínimo de unidades?",
    respuesta:
      "No hay mínimos fijos: nos ajustamos a lo que necesitás. Contanos cantidad y fecha.",
  },
  {
    pregunta: "¿Cuánto tarda un pedido?",
    respuesta:
      "Depende del producto, la cantidad y la personalización. Pasanos la fecha que necesitás y te decimos si llegamos.",
  },
  {
    pregunta: "¿Los catálogos tienen precios?",
    respuesta:
      "No. El precio cambia según cantidad y personalización, así que lo cotizamos por WhatsApp.",
  },
  {
    pregunta: "¿Trabajan solo con lo que está en los catálogos?",
    respuesta:
      "No. Los catálogos son una base: si buscás algo que no está, lo conseguimos para tu marca.",
  },
  {
    pregunta: "¿Envían fuera de Buenos Aires?",
    respuesta: "Sí, hacemos envíos a toda la Argentina.",
  },
  {
    pregunta: "¿Cómo se paga?",
    respuesta:
      "Efectivo, tarjeta, transferencia o Mercado Pago. [confirmar]",
  },
  {
    // En la entrevista de impeccable (PRODUCT.md) quedó que esto depende de
    // cada pedido: la respuesta no puede prometer un paso fijo.
    pregunta: "¿Tengo que tener el logo listo?",
    respuesta:
      "[confirmar: si On Work adapta archivos y si muestra una prueba antes de producir]",
  },
];
