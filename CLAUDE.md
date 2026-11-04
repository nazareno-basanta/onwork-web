# On Work — Web (instrucciones para Claude)

## Qué es este proyecto
Sitio web de On Work (empresa de comunicación y merchandising de Buenos Aires), hecho con Next.js + Tailwind y pensado para publicarse en Vercel. Hay un carrito de presupuesto, sin precios ni pagos: el pedido se envía armado por WhatsApp. El contacto sigue siendo solo por WhatsApp.

## Marca
- Amarillo `#FEB600` (Pantone 7549 C) y negro `#231F20`.
- Tipografías de marca: Montserrat, Nunito y Dunbar Tall (esta última todavía no está cargada en el sitio).
- Estilo: relativamente minimalista, monocromático, con muy buenos componentes y animaciones. Que destaque, pero sin exagerar.

## Cómo trabajar con Nachi
- **Ir de a poco, paso a paso.** Un cambio o una sección por vez. No avanzar con varias cosas a la vez sin preguntar.
- **Explicar qué se hace en cada paso**, para que Nachi entienda y aprenda. Está estudiando diseño gráfico y sabe de Illustrator, Photoshop, After Effects y Framer.
- **Los textos los escribe Nachi.** No inventar ni reemplazar textos por cuenta propia: usar marcadores como `[Título: acá va tu frase]` y preguntar antes de cambiar cualquier texto existente.
- Las reglas de este archivo tienen prioridad sobre el ritmo o el estilo por defecto de cualquier skill instalada.
- Antes de instalar una skill o herramienta de terceros, revisar qué hace y avisar.

## Dónde está cada cosa
- Textos y listas editables: `src/data/` (clientes, servicios, catálogos).
- Datos centrales (dominio, número de WhatsApp, menú): `src/lib/site.ts`.
- Colores y tipografías: `src/app/globals.css`.
- Páginas: `src/app/`. Componentes: `src/components/`.
- Guía completa de uso: `README.md`.

<!-- claude-reflect: learned rules (saved from the band; edit freely) -->
## Learned rules
- In this project, when the diana symbol appears in text, adjust its stroke weight to match the surrounding text weight instead of using the exact logo version.
- Never alter the original brand isotipo; keep it unchanged and centered, placing decorative effects like shockwaves only in the background.
- Discard any product description text that names suppliers or other brands (e.g., Silverplate, Stanley) from catalog data.
<!-- end claude-reflect -->
