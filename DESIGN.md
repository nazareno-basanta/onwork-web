---
name: On Work
description: Comunicación y merchandising desde 1990. Buenos Aires · Envíos a toda la Argentina.
colors:
  amarillo-on-work: "#FEB600"
  tinta: "#231F20"
  crema: "#FFFCEF"
  crema-suave: "#FEF6DC"
  gris-texto: "#5E6166"
  blanco: "#FFFFFF"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.55
  body-lead:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.14em"
  button:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.025em"
  accent:
    fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
rounded:
  card: "24px"
  pill: "9999px"
spacing:
  tight: "12px"
  base: "16px"
  gutter: "20px"
  gutter-md: "32px"
  stack: "56px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.amarillo-on-work}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.amarillo-on-work}"
  button-dark:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.blanco}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-dark-hover:
    backgroundColor: "{colors.amarillo-on-work}"
    textColor: "{colors.tinta}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.blanco}"
  pill-code:
    backgroundColor: "{colors.amarillo-on-work}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.crema-suave}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.card}"
    padding: "36px"
  card-dark:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.card}"
    padding: "36px"
  photo-frame:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.card}"
  header:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    height: "64px"
---

<!--
Fuentes: skill on-work-marca (manda), ../Web OW/02-BRIEF-WEB.md y el código de onwork-web al 30/10/2026.
Decisiones de Nachi en este documento: idea guía "Dar en el blanco", Montserrat 500 en los textos, superficies con relieve suave.
El código todavía difiere en algunos puntos (fondo #F5F3EE y blanco, cuerpo en Nunito, .eyebrow, isotipo sobre tinta, logo tipeado en la imagen OG, flechas como caracteres, header con desenfoque). Se alinea a este documento en el paso 2 y en los pasos de cada página.
-->

# Design System: On Work

## Overview

**Creative North Star: "Dar en el blanco"**

Las O del logo son dianas: aro tinta y punto amarillo. Todo el sistema sale de ese gesto. Cada elemento de la página apunta a algo concreto (un catálogo, un pedido, una conversación por WhatsApp) y el amarillo marca el punto exacto donde mirar: el punto final de un titular, el signo, un número, una pastilla con un código. Lo que no apunta a nada, no va. El puntero es el del sistema: la idea vive en la diana y en los hovers amarillos, no en un cursor propio.

La marca es de modernidad atemporal: simple, poco colorida, impactante y amigable. Es monocromática con un solo acento. La firmeza la pone Montserrat en peso alto y la calidez la ponen la crema de fondo y las formas redondas (círculos, pastillas, esquinas de 24 px). Las superficies tienen relieve suave: tarjetas y portadas parecen objetos apoyados sobre papel crema, con una sombra baja y difusa en tono tinta, nunca un brillo. La densidad es aireada: titulares grandes, mucho espacio entre secciones, una idea por bloque.

El movimiento es medido: una sola animación protagonista por sección, sólo con `transform` y `opacity`, y nada de movimiento cuando la persona pide menos. Quedan afuera los fondos de partículas, los brillos, los degradés, el vidrio esmerilado, las estrellas y los objetos 3D.

**Key Characteristics:**
- Crema como papel de fondo, tinta para el texto, amarillo como punto de mira (no como relleno de texto).
- Montserrat en todo: 800 en titulares, 700 en nombres y etiquetas, 500 en textos.
- Formas de la marca (diana, signo, flechas, círculo, cuadrado, triángulo) en SVG, una o dos por pieza.
- Superficies con relieve suave en tinta; superficies tinta sin sombra.
- Botones en pastilla; tarjetas con esquinas de 24 px; filetes de 2 px en tinta.
- Logo siempre desde el archivo original, en la versión que corresponde al fondo.

## Colors

Una paleta casi monocromática: papel crema, tinta casi negra y un amarillo que funciona como punto de mira. Proporción de referencia: 60 % crema o blanco, 25 % tinta, 10 % amarillo, 5 % gris.

### Primary
- **Amarillo On Work** (Pantone 7549 C): puntos finales de titulares, el signo, números grandes, pastillas de código, filetes, el punto de la diana, el relleno de botones principales y el círculo de los íconos. Sobre tinta puede ser texto (9,2:1). Sobre crema nunca es texto: da 1,7:1.

### Neutral
- **Tinta** (CMYK 0 0 0 100): todo el texto, las superficies oscuras (cierres de página, pie, menú del celular, paso a paso), los filetes de 2 px y los bordes de botón. Sobre crema da 15,9:1.
- **Crema**: fondo general de todas las páginas y del header.
- **Crema suave**: tarjetas, recuadros, franjas de tip y bloques que necesitan separarse del fondo sin cambiar de tono.
- **Gris texto**: bajadas, specs, textos secundarios y metadatos ("16 páginas · PDF"). Sobre crema da 6,1:1 y sobre crema suave, 5,8:1.
- **Blanco**: marcos de foto de producto y portadas de catálogo; texto sobre tinta.

### Named Rules
**The Punto de Mira Rule.** El amarillo es un acento: marca un punto, no llena un párrafo. Va en puntos, signos, números, filetes, pastillas y botones, y nunca pasa del 10 % de una pantalla. Si un bloque entero es amarillo, el texto encima es tinta.

**The Contraste Rule.** No hay texto amarillo sobre crema, crema suave ni blanco en ningún tamaño, y no hay texto blanco sobre amarillo. Texto amarillo, solo sobre tinta.

**The Tinta Rule.** El negro de la marca es tinta (#231F20). Nunca #000, ni en texto, ni en fondos, ni en sombras.

## Typography

**Display Font:** Montserrat (con ui-sans-serif, system-ui)
**Body Font:** Montserrat (con ui-sans-serif, system-ui)
**Accent Font:** Nunito, solo como acompañamiento puntual

**Character:** Montserrat sostiene todo el sitio: firme y geométrica en 800, clara y neutra en 500. Nunito, redondeada, aparece muy poco para sumar un tono más cercano; su uso exacto se define en cada página y nunca en titulares ni en párrafos largos.

### Hierarchy
- **Display** (800, clamp de 2,6 a 6 rem, interlineado 1,0): el H1 de cada página. Uno solo por página.
- **Headline** (800, clamp de 2 a 4 rem, interlineado 1,0): títulos de sección.
- **Title** (700, 1,75 rem, interlineado 1,15): nombres de catálogos, servicios, pasos y pedidos.
- **Body lead** (500, 1,125 rem, interlineado 1,55): bajadas debajo de los titulares, hasta 42 rem de ancho (unos 65 caracteres).
- **Body** (500, 1 rem, interlineado 1,55): textos, respuestas de preguntas frecuentes, descripciones.
- **Label** (700, 0,75 rem, +14 % de interletrado, mayúsculas): rótulos chicos y pastillas de código. No van como etiqueta arriba de un titular.
- **Button** (700, 0,875 rem, +2,5 % de interletrado): texto de botones, en caja baja con mayúscula inicial.

### Named Rules
**The Punto Final Rule.** Todo titular termina con su punto final (o su signo de pregunta) en amarillo. Las dos últimas palabras de cada titular y de cada párrafo van unidas con espacio duro, y los bloques de texto llevan `text-wrap: pretty`: sin viudas.

**The Dos Familias Rule.** Nunca más de dos familias en una página: Montserrat y, si hace falta, Nunito.

**The Sin Etiqueta Rule.** No hay etiquetas chicas en mayúscula arriba de los titulares, ni números de sección (01, 02…) salvo en el paso a paso, donde el orden informa.

## Layout

Un contenedor de hasta 80 rem centrado, con márgenes laterales de 20 px en el celular y de 32 px desde 768 px. Las secciones respiran: 96 px de alto de padding vertical en el celular y 128 px en escritorio (80 y 112 px en secciones secundarias). Dentro de una sección, el titular y su bajada se separan del contenido por unos 56 px.

Todo se alinea a la izquierda. Los titulares ocupan como máximo de 48 a 80 rem de ancho según su largo y las bajadas, 42 rem. En el celular las grillas pasan a una columna. Se diseña primero para 375 px, porque la gente que llega desde Instagram y los catálogos se abren en el teléfono. El header es fijo, de 64 px de alto, y el contenido arranca debajo.

**The Una Idea Por Bloque Rule.** Cada sección dice una sola cosa, con un titular, una bajada y una acción. Si necesita dos titulares, son dos secciones.

## Elevation & Depth

Relieve suave: las tarjetas, las portadas de catálogo y los paneles flotantes parecen objetos apoyados sobre el papel crema. La sombra es baja, difusa, desplazada hacia abajo y teñida de tinta, nunca de amarillo ni de negro puro. Las superficies tinta no llevan sombra: su profundidad es el contraste. Los valores exactos son provisorios y se calibran en `shape` y `critique`.

### Shadow Vocabulary
- **Apoyado** (`box-shadow: 0 1px 2px rgba(35, 31, 32, 0.06), 0 10px 30px -12px rgba(35, 31, 32, 0.18)`): estado de reposo de tarjetas y marcos de foto.
- **Levantado** (`box-shadow: 0 2px 4px rgba(35, 31, 32, 0.08), 0 22px 44px -16px rgba(35, 31, 32, 0.26)`): hover o foco de una tarjeta que es un link.
- **Portada** (`box-shadow: 0 24px 48px -20px rgba(35, 31, 32, 0.35)`): portada A4 de un catálogo cuando se muestra sola, como un objeto sobre la mesa. En las tarjetas cuadradas del hub y del Inicio va con "Apoyado".

### Named Rules
**The Objeto Apoyado Rule.** La sombra dice "esto es un objeto". Va debajo de tarjetas, portadas y fotos; nunca en texto, en íconos ni en botones, y nunca como brillo de color alrededor de algo.

## Shapes

La forma de la marca es redonda y gráfica: las dianas del logo, el punto, el círculo de los íconos. Los botones y las pastillas son cápsulas completas (9999 px). Las tarjetas, los marcos de foto y las portadas usan esquinas de 24 px. Las listas y los acordeones se separan con filetes de 2 px en tinta.

Las formas de `On Work Elementos.pdf` (diana, signo, flechas, sol, estallido, cruz, cuadrado, círculo, triángulo y el trío cuadrado-triángulo-círculo) entran siempre como SVG, en amarillo o tinta, una o dos por pieza. En portadas y separadores pueden ir grandes y cortadas por el borde. Nunca van encima de un producto ni pegadas al logo.

Las fotos de producto van sobre fondo blanco, dentro de un marco blanco redondeado, enteras (`object-fit: contain`). Las fotos de pedidos reales van completas, sin recortar productos; el texto encima va en una pastilla chica sobre una zona vacía.

**The Diana en Texto Rule.** La diana sola (como en el hero) usa las proporciones exactas de la O del logo: aro de 0,572R a R y punto de 0,294R. Cuando reemplaza una O dentro de un texto, se redibuja con el grosor de trazo y el tamaño de la letra de ese texto (una "o" minúscula mide la altura de x), para que se lea como una letra más.

**The Forma Prestada Rule.** Ninguna forma decorativa se inventa ni se escribe con caracteres (■ ▲ ● ↗ +): sale de los archivos de la marca, en SVG.

## Components

### Buttons
Directos y táctiles: una cápsula que se levanta medio punto al pasar el mouse.
- **Shape:** cápsula completa (9999 px), 12 × 24 px de padding interno, área táctil de 44 px o más.
- **Primary (amarillo):** fondo amarillo con texto tinta. Al pasar el mouse, fondo tinta con texto amarillo. Es el botón de WhatsApp y la acción principal de cada sección.
- **Dark (tinta):** fondo tinta con texto blanco; al pasar el mouse, fondo amarillo con texto tinta. Acción principal sobre fondos claros cuando el amarillo ya está en uso.
- **Outline:** borde de 2 px en tinta, sin fondo; al pasar el mouse, fondo tinta con texto blanco. Acción secundaria ("Ver catálogos", "Ver detalle").
- **Hover / Focus:** transición de 300 ms con subida de 2 px. Foco visible con contorno de 2 px en tinta separado 4 px (en blanco sobre tinta).
- **Ícono:** la flecha o el ícono de WhatsApp van en SVG con trazo de 2 px y puntas redondas, nunca como caracteres.

### Chips
- **Pastilla de código:** fondo amarillo, texto tinta en estilo label, cápsula completa. Lleva el código de producto, "2026" o la cantidad de modelos. Sin borde ni sombra.

### Cards / Containers
- **Corner Style:** 24 px.
- **Background:** crema suave sobre crema; tinta para las tarjetas destacadas (con texto blanco).
- **Shadow Strategy:** "Apoyado" en reposo y "Levantado" al pasar el mouse si la tarjeta es un link (ver Elevation & Depth). Las tarjetas tinta no llevan sombra.
- **Border:** ninguno en tarjetas con relieve; los filetes de 2 px en tinta quedan para listas, acordeones y botones outline.
- **Internal Padding:** 28 px en el celular y 36 px en escritorio.
- **Links:** una tarjeta con dos acciones (por ejemplo "Ver PDF" y "Ver detalle") tiene dos links claros, no un link gigante.

### Navigation
- **Desktop:** logo con bajada a la izquierda, en colores originales sobre crema, de 120 px de ancho o más. Links en Montserrat 700 de 0,875 rem. Botón de WhatsApp siempre visible. El link activo lleva el punto amarillo.
- **Celular:** panel a pantalla completa en tinta, links grandes en blanco que entran en cascada, sin numerar, con el activo marcado por el punto amarillo. Wordmark en blanco, nunca el isotipo.
- **Header:** crema sólido, sin desenfoque ni transparencia, 64 px de alto, fijo.
- **Lupa del header:** círculo outline de 44 px, antes del presupuesto, en todas las páginas: lleva al buscador de /catalogos (`#buscar`) con el cursor en el campo; si ya se está en /catalogos, sube hasta el campo. En el teléfono la lupa, el presupuesto y "Menú" son tres círculos de 44 px (la palabra "Menú" vuelve desde 640 px y queda para el lector de pantalla), así entran en 375 px. Entre 1024 y 1279 px los links del menú y "Escribinos" van con menos relleno para que entre todo.
- **Accesibilidad:** `aria-expanded`, cierre con Escape, foco atrapado en el panel abierto, área táctil de 44 px o más.

### Preguntas frecuentes
- Acordeón con `<details>` y `<summary>`, separado por filetes de 2 px en tinta. Pregunta en Montserrat 800; respuesta en body con el gris texto o con tinta al 75 %. El control es un círculo amarillo con un "+" en SVG que gira a "×" al abrirse. Las respuestas quedan en el HTML.

### Presupuesto
El "carrito" sin precios: se suma cada producto con cantidad y color, y se manda armado por WhatsApp (`src/components/presupuesto/`). Es una superficie para hacer una tarea: menos ruido, la marca en los detalles.
- **Selector de cantidad:** cápsula outline de 2 px en tinta, "− número +". 44 px de alto; en pantallas táctiles, botones de 44 px. El número se escribe a mano, con las flechas suma o resta, y va de 1 a 99.999 (sin mínimo de pedido).
- **Contador en el header:** en escritorio, pastilla outline "Presupuesto" de 44 px con el número en un círculo amarillo; el lugar del número queda siempre reservado, para que el header no se mueva. En el celular, botón redondo con el ícono de tablilla, solo cuando hay productos.
- **Lista:** una fila por producto y color, separadas por filetes de 2 px: foto en marco blanco, pastilla amarilla con el código, nombre, color y cantidad. Se apila según el ancho de su columna, no de la pantalla.
- **Panel de envío:** tarjeta crema suave fija al costado (en el celular, sin tarjeta y debajo de la lista): el campo "Otro", el resumen y la franja de consultas junto al botón amarillo de enviar. Sin efecto imán: el botón no se mueve al confirmar.
- **Barras fijas del celular:** en tinta, abajo, y nunca dos a la vez. En los catálogos, "Presupuesto · N productos · Ver" reemplaza al botón flotante de WhatsApp y, al sumar, muestra unos segundos "Sumaste … al presupuesto."; en la página de un producto, cuando su "Sumar" queda fuera de la pantalla, la reemplaza "Sumar" de ese producto (con el color elegido); en /presupuesto, "Enviar por WhatsApp" aparece solo cuando el botón del panel no está a la vista.
- **Aviso al sumar:** pastilla tinta con borde crema de 2 px (así se separa del pie sin sombra), que se va sola. Sin modales. En el celular, si hay una barra abajo, confirma la barra (no se apilan).
- **The Quitar Rule.** Las acciones que sacan algo (Quitar, Vaciar) van con subrayado tinta tenue; el subrayado amarillo queda para las que suman o resuelven (Sumar otro color, Copiar la lista, Ver presupuesto). Vaciar se confirma en el mismo lugar ("¿Vaciar? Sí · No") con el foco en "No".
- **Animación:** una sola, la protagonista de los catálogos ("dar en el blanco"): al tocar "Sumar al presupuesto" en la página del producto, una copia chica de la foto que se está viendo vuela en arco hasta el número del presupuesto en el header (650 ms); al llegar, el número salta y deja una onda amarilla, como el signo del logo que cae sobre la diana (`src/lib/vuelo.ts`). Con menos movimiento no hay vuelo: cambia el número y el aviso confirma.

### Catálogos
La tienda sin precios: cada catálogo muestra sus productos y cada producto tiene su página (`src/components/catalogo/`).
- **Tarjeta de catálogo (hub e Inicio):** cuadrada, con la foto de un producto en marco blanco ("Apoyado", "Levantado" al pasar el mouse), nombre, una línea y "N modelos". Toda la tarjeta es un solo link. Los catálogos sin productos en la web (Cintas, Llaveros) muestran la portada en tinta, también cuadrada.
- **Tarjeta de producto:** foto entera en marco blanco, pastilla amarilla con el código, nombre, tipo y "N colores". Sin "Sumar" (Nachi, 5/11/2026): los clientes comparan antes de pedir, así que se suma desde la página del producto, con los detalles y el color a la vista. Toda la tarjeta lleva al producto (el link está en el nombre y se estira sobre la tarjeta).
- **Grillas:** 2 columnas en el celular, 3 en tablet y 4 en escritorio. Sin animación de entrada por tarjeta.
- **Barra de secciones:** pastillas fijas debajo del header mientras se recorren los productos; la activa en tinta. En el celular se desliza de costado (y la activa se centra sola); desde tablet, si no entran, pasan a dos líneas.
- **Encabezados acotados:** en el hub y en cada catálogo, titular más chico y, en escritorio, la bajada y los botones al costado: los productos asoman en la primera pantalla.
- **Color en la página del producto:** grupo de opciones (radio) en pastillas, "A definir" marcado de entrada; la elegida en tinta. Se suma con ese color. Con un solo color, no hay opciones. Si el producto tiene una foto por color (fotoDeColor en productos-ajustes.ts), al elegirlo la galería pasa a esa foto.
- **Galería del producto:** la foto grande se desliza (dedo, trackpad o teclado), con miniaturas abajo, contador "2 / 5" y, en escritorio, flechas redondas. Sin zoom. En escritorio queda fija mientras se leen los datos.
- **Buscador:** campo en cápsula con lupa, sin esperar al servidor (nombre, tipo, sección, código, catálogo o descripción, sin importar tildes; entiende plurales y sinónimos como "lapicera" o "libreta"; ordena por relevancia). La búsqueda queda en la dirección (?q=). Si lo buscado está en un catálogo o una sección solo en PDF, lo dice ("Está en el catálogo Llaveros."); sin resultados, un recuadro crema suave ofrece sumarlo a "Otro" del presupuesto o escribir por WhatsApp.
- **Sección sin productos en la web:** título, su línea y un recuadro crema suave con "Sumar al presupuesto" (la anota en "Otro") y el PDF (o WhatsApp si el PDF no está subido). En Cintas y Llaveros, cada sección de la lista tiene el mismo "Sumar al presupuesto".
- **Foco:** contorno tinta de 2 px separado 4 px en todo lo que se toca (también en los botones tinta); en blanco sobre superficies tinta. La regla va en globals.css fuera de las capas de Tailwind, así no la pisa ninguna clase.

### Hero del Inicio
- Crema liso: titular centrado en tres renglones, el isotipo original debajo (sin agregados) y dos botones: "Ver catálogos" (amarillo, el principal, más grande) y "Conocenos" (outline, a Nosotros). Sin ondas.
- **Carrusel de destacados** (diseño "Soportes" de Nachi, `CarruselHero.tsx`): una fila de productos a la altura del centro del aro, foto entera en marco blanco con la pastilla del código y el nombre. Solo desde 640 px: en el celular el hero queda con el isotipo solo (Nachi, 6/11/2026: ahí se trababa y no se apreciaba), sin cargar fotos ni animación. Corre de a un lugar, de derecha a izquierda (Nachi, 6/11/2026: la órbita continua no; por pasos, rápido): queda quieta 1,4 s con tres a cada lado y corre en 0,75 s. Todas tienen el mismo tamaño. Pasan por detrás del isotipo, que no se toca: detrás hay un círculo del crema del fondo que las tapa, y al meterse achican hasta un 70 % para no asomar por los costados del aro. En los bordes se esfuman. Con el mouse encima no arranca el próximo paso; cada tarjeta lleva a su producto. Los productos salen de `HERO.destacados`. Es decorativo para el lector de pantalla (los productos están en los catálogos). Con menos movimiento queda quieta, tres a cada lado.
- **Juego de pesos del titular** (Nachi, 6/11/2026; la única excepción a los titulares en ExtraBold): "Merchandising" en ExtraBold 800, "que hace que" en Medium 500, "tu marca" en Bold 700 itálica y "se vea, se use y se recuerde." en Black 900, sin itálica. Para eso se carga la itálica de Montserrat (misma familia).
- **Subrayado del titular:** "se vea", "se use" y "se recuerde" se subrayan solos al cargar, uno tras otro, en la compu y en el celular. La barra es el fondo del propio texto (no una capa detrás), así la letra queda siempre por delante.
- **Titulares que acompañan:** en las secciones con el titular a la izquierda y una lista a la derecha (Qué hacemos del Inicio y de Nosotros, Preguntas frecuentes, Cómo mandarnos tu logo), en la compu el titular queda fijo debajo del header mientras se recorre la lista.
- Al bajar, los productos se abren hacia los costados y se van en el primer 3 % del scroll (antes de que el isotipo se mueva; el círculo crema de atrás queda siempre opaco, así no se ve nada por el hueco del aro) y el carrusel se frena hasta volver arriba; el isotipo crece hasta entrar en el punto amarillo y aparece "Tu marca, en cada ___.": las palabras pasan parejas, con lugar para leer cada una, y "detalle" se marca al final con un golpe y una onda. Con menos movimiento, todo queda quieto (la fila de productos también, tres a cada lado).

### Cómo pedir
Línea de tiempo de 5 pasos sobre tinta (`src/components/como-pedir/`): en el Inicio, en el lugar de "Cómo trabajamos", y en /como-pedir. En el Inicio, en el celular, va la versión corta (con las cinco maquetas eran más de cinco pantallas; Nachi, 5/11/2026); en la compu, la línea completa.
- **Cada paso:** número grande en amarillo, titular con punto amarillo, texto y una maqueta hecha en código con los colores y la letra de la marca, nunca capturas. En la compu, el texto a la izquierda (hasta 36 rem, alineado con el titular y la barra) y la maqueta de 26 rem a la derecha, donde termina la línea; 128 px entre pasos. El paso 1 es el presupuesto de la web con tres productos reales; los pasos 2 a 5, el chat de WhatsApp (mensaje armado, asesor, prueba con "LOGO AQUÍ" y aviso de envío). La web no tiene botón de aprobar ni seguimiento: no se muestran funciones que no existen.
- **Maquetas como ilustración, no como interfaz:** cada una va en un marco de teléfono (borde tinta clara y la "isla" negra arriba) y todo adentro es plano: globos sin sombra (On Work en blanco, el cliente en amarillo claro, sobre crema suave), fotos sin sombra y botones y cantidades más finos que los reales. Así nadie intenta tocar el "Enviar" de la maqueta. Usan una escala de letra en miniatura (13, 11 y 10 px) que no es la de la web.
- **Avance:** scroll normal, sin clavar la sección. En la compu, una barra fija debajo del header con los números y los títulos (cada uno lleva a su paso) sobre una línea que se completa en amarillo; en el celular, línea vertical a la izquierda con un punto por paso. Un paso queda activo cuando su comienzo pasa la mitad de la pantalla. Es la única animación de la sección, junto con un solo gesto: el mensaje del paso 2 que se escribe solo la primera vez que aparece.
- **Menos movimiento:** la línea completa desde el principio y el mensaje ya escrito.
- **LOGO AQUÍ:** las O son dianas con el alto y el trazo de la O de Montserrat ExtraBold (aro y punto amarillo), no con las proporciones del logo.
- **Versión corta:** los cinco títulos con su número en un círculo, unidos por una línea fina, más "Ver cómo pedir". En el presupuesto vacío, sobre crema, el 1 en amarillo (es el paso en el que está la persona) y los demás en contorno; en el Inicio del celular, sobre tinta, todos en amarillo.
- **Links a /como-pedir:** en el pie (columna On Work, después de Nosotros), en la franja "Consultanos por cantidades…" (hub, cada catálogo y cada producto; sobre crema suave el subrayado va en tinta suave) y en el presupuesto, debajo de la bajada.
- **Página /como-pedir** (fuera del menú): título y bajada sobre crema, la misma línea de tiempo sin titular propio, "Cómo mandarnos tu logo" (filetes de 2 px con los formatos en pastillas amarillas, como los códigos), las técnicas (el mismo bloque de Nosotros), las preguntas frecuentes y el cierre.

### Logo (signature)
- **Isotipo inalterable:** el isotipo (diana con signo) se usa tal cual el archivo original, solo y sin agregarle gráficas (la de arcos de la pág. 18 de Elementos es una pieza artística, no el isotipo). Las ondas u otros recursos van de fondo, separados de él (Nachi, 2/11/2026).
- **Archivos:** siempre los originales de `public/brand/` (o convertidos desde `On Work/Elementos OW/` con `pdftocairo -svg`). Nunca se dibuja, se tipea ni se aproxima.
- **Versiones y fondos:**
  - Sobre crema o blanco, colores originales: logo con bajada en el header y el isotipo en el favicon.
  - Sobre tinta, solo el wordmark "ON WORK!" en blanco con el signo amarillo.
  - El isotipo nunca va sobre oscuro ni en un solo color.
  - Sobre amarillo no va el logo a color.
- **Área de resguardo:** 1x libre por lado, donde x es el diámetro del círculo amarillo de la O.
- **Tamaños mínimos:**

  | Versión | Mínimo |
  |---|---|
  | Isologotipo | 160 px |
  | Logo con bajada | 120 px |
  | Wordmark | 64 px |
  | Isotipo | 24 px |

  Si no entra, se pasa a la versión siguiente, más simple.

### Titular con punto amarillo (signature)
- Headline o display en tinta cuyo signo final (punto o signo de pregunta) va en amarillo. Las dos últimas palabras van unidas con espacio duro. Es la firma tipográfica de la marca en todas las páginas.

## Do's and Don'ts

### Do:
- **Do** usar crema (#FFFCEF) como fondo general y tinta (#231F20) para el texto.
- **Do** cerrar cada titular con el punto o el signo final en amarillo, y unir las dos últimas palabras con espacio duro.
- **Do** escribir los textos en Montserrat 500 y los titulares en Montserrat 800, con interlineado de 1,0 en titulares y de 1,45 a 1,6 en textos.
- **Do** dar relieve suave a tarjetas, portadas y fotos con las sombras "Apoyado", "Levantado" y "Portada", en tono tinta.
- **Do** sacar las formas, el logo y los íconos de los archivos de la marca, en SVG; íconos de línea con trazo de 2 px, puntas redondas, en tinta dentro de un círculo amarillo.
- **Do** limitar cada sección a una sola animación protagonista, hecha con `transform` y `opacity`, y dejar todo visible y quieto con `prefers-reduced-motion`.
- **Do** apagar en pantallas táctiles los efectos que dependen del mouse (como el imán de los botones de cierre).

### Don't:
- **Don't** poner texto amarillo sobre crema, crema suave o blanco (1,7:1), ni texto blanco sobre amarillo (1,8:1).
- **Don't** usar #000, degradés, brillos, vidrio esmerilado (`backdrop-filter`), partículas, estrellas ni objetos 3D.
- **Don't** usar el isotipo sobre fondo oscuro, ni el logo con bajada o a color sobre tinta o amarillo: sobre tinta va solo el wordmark blanco.
- **Don't** tipear "ON WORK!" ni dibujar el logo, tampoco en la imagen para compartir (Open Graph).
- **Don't** usar caracteres o emojis como íconos o formas (↗ → + ■ ▲ ●).
- **Don't** poner etiquetas chicas en mayúscula arriba de los titulares ni numerar secciones (salvo el paso a paso).
- **Don't** abrir modales cuando alcanza con una página: las tarjetas de pedidos llevan a su página.
- **Don't** poner sombras en texto, íconos, botones ni superficies tinta.
- **Don't** reemplazar el cursor del sistema por uno propio: desentona con la seriedad de la marca (decisión de Nachi, 2/11/2026).
