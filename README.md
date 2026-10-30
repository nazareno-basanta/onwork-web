# On Work — Sitio web

Sitio de On Work hecho con **Next.js** (React) + **Tailwind CSS**, con animaciones en **Motion**, **GSAP** y **Lenis**. Pensado para publicarse en **Vercel**.

## Cómo correrlo en tu computadora

Necesitás tener **Node.js 20.9 o superior** (recomendado: la versión LTS de https://nodejs.org).

```bash
cd onwork-web
npm install      # solo la primera vez: descarga las librerías
npm run dev      # abre el sitio en http://localhost:3000
```

Otros comandos útiles:

```bash
npm run build    # compila la versión de producción (detecta errores)
npm run lint     # revisa el código
```

## Qué hay en cada carpeta

| Ruta | Qué contiene |
|---|---|
| `src/app/` | Las páginas. Cada carpeta es una URL: `merchandising/`, `catalogos/`, `contacto/` |
| `src/components/` | Piezas reutilizables: encabezado, pie, botones, animaciones |
| `src/components/sections/` | Las secciones de la home (hero, quiénes somos, clientes, etc.) |
| `src/data/` | **Textos y listas editables**: clientes, servicios, catálogos |
| `src/lib/site.ts` | Datos centrales: dominio, **número de WhatsApp**, menú |
| `src/app/globals.css` | Colores y tipografías de la marca |
| `public/brand/` | Logo e isotipo en SVG (color y blanco) |
| `public/clientes/` | Acá van los logos de clientes |
| `public/catalogos/` | Acá van los PDF de catálogos |

## Pendientes antes de publicar

1. **Número de WhatsApp**: reemplazar `whatsapp` en `src/lib/site.ts` (hoy tiene un valor de ejemplo y los botones no van a funcionar hasta cambiarlo).
2. **Logos de clientes**: guardarlos en `public/clientes/` y completar `src/data/clientes.ts`.
3. **Catálogos**: revisar que los PDF no tengan precios internos o códigos de proveedor antes de ponerlos en `public/catalogos/`, y completar `src/data/catalogos.ts`.
4. **Textos**: los textos son un primer borrador para revisar con On Work.
5. **Dominio**: confirmar que `url` en `src/lib/site.ts` sea el dominio final.
6. **Tipografía Dunbar Tall**: hoy se usan Montserrat y Nunito (de la marca). Si querés Dunbar Tall, hace falta el archivo de la fuente.

## Publicar en Vercel

1. Subir el proyecto a un repositorio de GitHub.
2. En https://vercel.com crear un proyecto nuevo e importar ese repositorio (Vercel detecta Next.js solo).
3. Cada vez que se suban cambios a GitHub, el sitio se actualiza solo.

> Nota: el plan gratuito de Vercel (Hobby) está pensado para uso no comercial. Para el sitio de una empresa conviene revisar sus condiciones vigentes o usar el plan Pro.
