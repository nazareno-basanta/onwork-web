/**
 * Preguntas frecuentes del Inicio, Contacto y Cómo pedir (las cuatro primeras
 * también en cada página de catálogo).
 * Textos de ../Web OW/03-CONTENIDO-PAGINAS.md, actualizados con el presupuesto
 * (aprobados por Nachi el 5/11/2026). Lo que está entre [corchetes]
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
  // Las cuatro primeras también van en cada página de catálogo (PREGUNTAS_CATALOGO).
  {
    pregunta: "¿Cómo funciona el presupuesto?",
    respuesta:
      "Sumás los productos que te interesan, con cantidad y color, y lo mandás por WhatsApp con un botón. En la web no hay precios ni pagos: te respondemos con la cotización.",
  },
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
    pregunta: "¿Los catálogos y la web tienen precios?",
    respuesta:
      "No. El precio cambia según la cantidad y la personalización: sumá los productos a tu presupuesto, mandalo por WhatsApp y te lo cotizamos.",
  },
  {
    pregunta: "¿Trabajan solo con lo que está en los catálogos?",
    respuesta:
      'No. Los catálogos son una base: si buscás algo que no está, escribilo en "Otro" de tu presupuesto y lo buscamos para tu marca.',
  },
  {
    pregunta: "¿Tengo que saber la cantidad exacta?",
    respuesta: "No: poné una cantidad aproximada y la definimos juntos al cotizar.",
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
    // On Work adapta el logo si hace falta y muestra una prueba antes de
    // producir (Nachi, 4 y 5/11/2026). Nunca "diseñamos": el logo es del cliente.
    pregunta: "¿Tengo que tener el logo listo?",
    respuesta:
      "No tiene que estar perfecto: mandanos el archivo que tengas, mejor en vector (.AI, .EPS, .PDF o .SVG) o en PNG o JPG en alta resolución. Si hace falta, lo adaptamos, y antes de producir te mostramos una prueba para que la apruebes.",
  },
];
