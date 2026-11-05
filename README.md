# On Work — Sitio web

Sitio de On Work hecho con **Next.js 16** (React) + **Tailwind CSS 4**, con animaciones en **Motion** y scroll suave con **Lenis**. Pensado para publicarse en **Vercel**. El contacto es siempre por WhatsApp: no hay carrito ni formularios.

## Cómo correrlo en tu computadora

Necesitás tener **Node.js 20.9 o superior** (recomendado: la versión LTS de https://nodejs.org).

```bash
cd onwork-web
npm install           # solo la primera vez: descarga las librerías
npm run dev -- -p 3005   # abre el sitio en http://localhost:3005
```

(Se usa el puerto 3005 porque el 3000 suele estar ocupado por Remotion Studio.)

Otros comandos útiles:

```bash
npm run build    # compila la versión de producción (detecta errores)
npm run lint     # revisa el código
```

## Qué hay en cada carpeta

| Ruta | Qué contiene |
|---|---|
| `src/app/` | Las páginas. Cada carpeta es una URL: `nosotros/`, `catalogos/`, `catalogos/[slug]/` (los 8 catálogos), `pedidos/`, `pedidos/[cliente]/`, `contacto/` |
| `src/components/` | Piezas reutilizables: encabezado, menú, pie, titular, botones, formas de la marca |
| `src/components/sections/` | Las secciones del Inicio y el cierre de las páginas |
| `src/components/ui/` | Componentes de terceros adaptados a la marca (ver abajo) |
| `src/data/` | **Textos y listas editables**: inicio, catálogos, pedidos, clientes, servicios, preguntas, nosotros, contacto |
| `src/lib/site.ts` | Datos centrales: dominio, **WhatsApp**, Instagram, menú |
| `src/app/globals.css` | Colores, tipografías y sombras de la marca |
| `DESIGN.md` / `PRODUCT.md` | Sistema visual y contexto de On Work (los lee impeccable) |
| `public/brand/` | Logo, wordmark e isotipo (originales y recortes del original) |
| `public/catalogos/` | Acá van los PDF de catálogos (`drinkware.pdf`, etc.) y `portadas/` |
| `public/clientes/` | Acá van los logos de clientes |
| `public/pedidos/` | Acá van las fotos de cada pedido real |

## Componentes de terceros

Todos se leyeron antes de usarlos y se adaptaron a los colores, tipografías y reglas de la marca. No suman dependencias nuevas.

| Componente | Origen | Dónde |
|---|---|---|
| Menú en pastilla y menú del celular | React Bits · Pill Nav y Staggered Menu (comportamiento) | Encabezado |
| Cinta infinita | Magic UI · Marquee | Logos de clientes y búsquedas a medida |
| Frase rotativa | React Bits · Rotating Text | Inicio |
| Carrusel de pedidos | Aceternity · Apple Cards Carousel (sin modal) | Inicio, cuando haya pedidos |
| Pasos con scroll | Aceternity · Sticky Scroll Reveal | Inicio |
| Botón con imán | Motion Primitives · Magnetic | Cierres y Contacto |
| Ícono de WhatsApp | Tabler Icons · brand-whatsapp (licencia MIT, solo el dibujo) | Botones de WhatsApp |

## Cómo cargar lo que falta

1. **Catálogos PDF**: copiar cada PDF a `public/catalogos/` con el nombre del catálogo (`drinkware.pdf`). La web lo encuentra sola al publicar y muestra el botón "Descargar catálogo PDF" (en la compu, reiniciar `npm run dev`). Para usar la portada real en vez de la armada, guardar la página 1 como `public/catalogos/portadas/drinkware.webp` y sumar `portada`.
2. **Productos de los catálogos**: salen de los Excel de cada catálogo con `npm run productos`. El script copia las fotos buenas a `public/productos/` (WebP de 1200 px y, por producto, la imagen para compartir el link, `…-compartir.jpg`), arma `src/data/productos.generated.json` y la hoja de contactos `../Web OW/fotos-productos.html` para elegir fotos. Las correcciones a mano (foto principal, fotos que no van, ocultar un producto, corregir un texto) van en `src/data/productos-ajustes.ts`, que el script nunca pisa. Un texto que nombra a un proveedor u otra marca, o una nota interna, no pasa a la web.
3. **Logos de clientes**: solo marcas confirmadas, en `public/clientes/` y en `src/data/clientes.ts`. La franja de clientes muestra solo las marcas con logo; sin ninguna, no aparece en la web.
4. **Pedidos reales**: fotos en `public/pedidos/<cliente>/` y datos en `src/data/pedidos.ts`. Con el primer pedido cargado aparecen solos "Pedidos reales" en el menú y el pie, el carrusel del Inicio, la página del pedido y su lugar en el sitemap, y `/pedidos` se empieza a indexar.
5. **Marcadores**: todo lo que está entre `[corchetes]` en `src/data/` es un dato a completar o confirmar. Se ve en `npm run dev` y **no** en la web publicada (si un párrafo es todo marcador, no se muestra). Para ver la lista con archivo y línea: `npm run marcadores`.

## Pendientes antes de publicar

1. Los PDF, los logos de clientes y al menos 3 pedidos reales (ver arriba).
2. Completar los marcadores de `src/data/` (secciones de catálogos, horario, pagos, hitos, técnicas).
3. **Dominio**: confirmar que `url` en `src/lib/site.ts` sea el dominio final y elegir `onworkba.com` o `www.onworkba.com` en Vercel.
4. **GA4**: crear la propiedad y cargar el ID (`G-…`) como `NEXT_PUBLIC_GA_ID` en Vercel (ver `.env.example`). Sin ID no se carga Google Analytics. Con ID se mide cada clic a WhatsApp (`whatsapp_click`) y GA4 mide solo las descargas de PDF.
   En Vercel, activar también **Analytics** y **Speed Insights** en el proyecto (visitas y Core Web Vitals reales, sin cookies).
5. **Tipografía Dunbar Tall**: hoy se usan Montserrat y Nunito. Dunbar Tall es solo para merch propio.

## Publicar en Vercel

1. Subir el proyecto a un repositorio de GitHub.
2. En https://vercel.com crear un proyecto nuevo e importar ese repositorio (Vercel detecta Next.js solo).
3. Cada vez que se suban cambios a GitHub, el sitio se actualiza solo.
4. Después de publicar: `curl -I https://onworkba.com/catalogos/drinkware.pdf` tiene que mostrar el encabezado `Link` canonical, y en Search Console hay que mandar el sitemap.
5. La dirección `onwork-web.vercel.app` (y las vistas previas `*.vercel.app`) responde con `X-Robots-Tag: noindex`, para que Google no la indexe como copia del sitio; en `onworkba.com` no aparece.

> Nota: el plan gratuito de Vercel (Hobby) está pensado para uso no comercial. Para el sitio de una empresa conviene revisar sus condiciones vigentes o usar el plan Pro.
