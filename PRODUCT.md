# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Marcas de todos los tamaños, de un local a una empresa (también agencias y organizadores de eventos), que invierten en su identidad y buscan artículos de promoción de uso cotidiano y reutilizables, con su logo.

Llegan por dos caminos (confirmado por Nachi):

- **Google:** busca una categoría de producto o "merchandising" en Buenos Aires o en Argentina ("termos personalizados", "lapiceras personalizadas", "calendarios 2027"). En general no conoce On Work: tiene que entender rápido qué hace, confiar y escribir.
- **Instagram:** entra desde la bio de @onworkba. Ya vio publicaciones; busca los catálogos o la forma de contactar. Llega desde el celular.

Los catálogos PDF se abren sobre todo en el celular.

## Product Purpose

La web de On Work (onworkba.com) reemplaza a la actual de Wix. Tiene dos trabajos:

1. Posicionar a On Work en Google para búsquedas de merchandising en Buenos Aires y en Argentina.
2. Convertir cada visita en una conversación por WhatsApp con el asesor de ventas.

Éxito: clics a WhatsApp (`wa.me`) y descargas de catálogos PDF, medidos como eventos clave en GA4. No hay ventas online.

## Positioning

- **Los catálogos son una base, no el total.** On Work trabaja con un catálogo muy amplio: lo que no está en los siete PDF, lo busca y lo consigue para cada marca (búsquedas a medida). Ejemplos reales: indumentaria de nieve, fundas para gafas de ski, almohadas de viaje, frisbees, delantales, gorras trucker, mochilas.
- **Desde 1990, empresa familiar.** Nació de la mano de dos amigos recién egresados del colegio que eligieron las ventas; empezó con serigrafía y fue sumando técnicas, productos y servicios.
- **Oferta completa alrededor de la imagen de una marca:** merchandising, indumentaria, cartelería, tarjetería y fotografía de producto.
- **A medida de cada pedido:** sin mínimos ni plazos fijos; atención personalizada.
- Concepto de marca: **Impacto confiable** (servicio + impacto).

## Operating Context

- **Contacto solo por WhatsApp:** +54 9 11 3157-9402, lo atiende el asesor de ventas. Cada página tiene su propio mensaje precargado (ej.: `Hola, vi el catálogo [Nombre] en la web. Necesito:`). Sin formularios, sin widget de chat, sin carrito ni ecommerce.
- **Sin precios en la web ni en los catálogos:** el precio depende de la cantidad y la personalización, y se cotiza por WhatsApp.
- **Proceso:** el cliente cuenta su proyecto → On Work asesora y cotiza (producto y personalización según la marca, la cantidad y la fecha) → produce y envía a toda la Argentina.
- **Antes de producir:** qué pasa con el logo (adaptación del archivo, prueba para aprobar) depende de cada pedido. No prometer un paso fijo.
- **Todo producto lleva el logo del cliente.** Si el diseño lo trajo el cliente, On Work lo produce: no lo diseña.
- **Siete catálogos PDF 2026:** Drinkware, Escritura, Cuadernos y anotadores, Oficina y escritorio, Marroquinería, Cintas e identificación, Llaveros. Cada uno tiene su página con texto propio en `/catalogos/<slug>` y el botón al PDF.
- **Pedidos reales:** una página por pedido en `/pedidos/<cliente>`.
- **Redes:** Instagram @onworkba.
- La web de Wix tiene URLs indexadas en Google que se redirigen (301) a las nuevas.

## Capabilities and Constraints

- Proyecto existente: Next.js 16 + React 19 + Tailwind 4, con `motion`, `gsap` y `lenis`. Se publica en Vercel.
- Menú de cinco entradas: Inicio · Nosotros · Catálogos · Pedidos reales · Contacto. Las páginas de cada catálogo y de cada pedido van fuera del menú.
- `/merchandising` se elimina y redirige a `/`: la home es la página de merchandising.
- Datos editables en `src/data/` (catálogos, pedidos, clientes, preguntas) y datos centrales en `src/lib/site.ts`.
- **Los textos los escribe Nachi.** Nada de texto inventado: lo que falta va como marcador `[dato]` y cualquier cambio a un texto existente se consulta.
- Datos sin confirmar (no inventar, dejar marcados):
  - Alcance de la fotografía de producto.
  - Técnicas vigentes (la lista sale de la web de Wix).
  - Formas de pago, horario de atención y si se publica el mail.
  - Hitos de la historia entre 1990 y 2026.
  - Qué PDF de Oficina se publica (completo o "-selection").
  - Si se hace la página de temporada `/regalos-empresariales-fin-de-ano`.

## Brand Commitments

- Fuente completa: skill `on-work-marca` y `../Web OW/02-BRIEF-WEB.md`. El sistema visual se documenta en DESIGN.md.
- **Nombre:** "On Work" en texto corrido. "ON WORK!" es solo el logo, que se usa siempre desde el archivo original (`public/brand/`, `On Work/Elementos OW/`): nunca se tipea ni se dibuja.
- **Voz:** claro, cuidado y a medida de tu marca. Cercana pero seria, corta y concreta. La marca del cliente es la protagonista; el producto es el soporte.
- **Reglas de texto:**
  - Voseo siempre.
  - Se le habla a "tu marca", nunca "tu empresa", "para empresas" ni "emprendimiento".
  - Sin superlativos ("el mejor", "único", "súper", "la mejor opción").
  - "Desde 1990", nunca "más de 35 años".
  - Ubicación solo como "Buenos Aires · Envíos a toda la Argentina".
  - No aclarar la personalización producto por producto.
  - Cuadernos y anotadores no se personalizan por dentro.
  - Titulares con punto final en amarillo y sin viudas.
- **Frases de marca:**
  - "Tu marca, en cada ___." (evento, llave, sorbo, turno, escritorio, stand, anotación).
  - "Contanos tu proyecto."
  - "Te asesoramos en todo lo que tu marca necesite."
  - Bio vigente: "Desde 1990 hacemos que tu marca se vea, se use y se recuerde."

## Evidence on Hand

- **Logos de On Work:** `public/brand/` (logo con bajada e isotipo, color y blanco) y los PDF maestros en `On Work/Elementos OW/`.
- **Logos de clientes:** ninguno cargado todavía (`src/data/clientes.ts` tiene marcadores). Cada marca se muestra solo cuando Nachi la confirma una por una en `../Web OW/logos-clientes/LEEME.md`. Candidatas: La Continental, Nordelta, Segafredo, UBA, UNPA, Renault, Remax, Royal Holiday, Howard Johnson, Condigral, Abertec, Emprotur, Casa Fernandes.
- **Pedidos reales:** ninguno cargado todavía (`../Web OW/pedidos-reales/` vacía). Candidatos: Condigral (delantales), Emprotur en la FIT, Casa Fernandes (sets materos), Abertec (taza mágica), cliente patagónico (indumentaria de nieve y fundas para gafas de ski). Se publican solo con el OK del cliente.
- **Catálogos PDF:** ninguno en `../Web OW/catalogos-pdf/` todavía. Los datos de cada catálogo (páginas, modelos, secciones) están en `../Web OW/03-CONTENIDO-PAGINAS.md`.
- **No existen y no se inventan:** testimonios, reseñas, cifras de clientes o de pedidos, estadísticas sin fuente, precios, mínimos, plazos, certificaciones ni claims ambientales.

## Product Principles

1. **Todo termina en WhatsApp:** cada página lleva a una conversación con contexto, con el mensaje precargado de esa página.
2. **El catálogo es el piso, no el techo:** siempre tiene que quedar claro que lo que no está, se consigue.
3. **Prueba real antes que promesa:** desde 1990, pedidos reales y clientes con nombre, solo con permiso. Si falta un dato, se marca; no se rellena.
4. **La marca del cliente es la protagonista:** el producto es el soporte y On Work acompaña.
5. **Cada línea tiene su página:** cada catálogo y cada pedido tiene su propia página con texto, para que Google la encuentre.

## Accessibility & Inclusion

- Contraste AA en todo texto.
- `prefers-reduced-motion`: sin animación y con todo el contenido visible.
- Navegación completa con teclado y foco visible.
- Los efectos que dependen del mouse (cursor propio, inclinación, imán) se apagan en pantallas táctiles y no reemplazan el cursor de texto ni el foco.
- Idioma: español de Argentina (`es-AR`).
