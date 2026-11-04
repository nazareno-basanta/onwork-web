// Arma la base de productos de la web a partir de los Excel de cada catálogo
// y copia sus fotos a public/productos/. Uso: npm run productos
//
// Se puede correr todas las veces que haga falta: rehace
// src/data/productos.generated.json y las fotos, y nunca toca
// src/data/productos-ajustes.ts (los ajustes a mano).
//
// Qué pasa a la web: solo las columnas de COLUMNAS. Códigos y precios de
// proveedor, "Mejor precio", "Proveedor", carpetas y observaciones no se leen.
// Al final, un chequeo frena todo si aparece un código de proveedor o un precio.
//
// Fotos: solo las de fondo blanco, de 600 px o más y sin repetir (las de marca
// de agua las marca Nachi en los ajustes). Las demás quedan fuera, salvo que
// se elijan a mano en los ajustes. Hoja de contactos: ../Web OW/fotos-productos.html
//
// Cintas e identificación y Llaveros no están: sus productos van solo en el
// PDF (decisión de Nachi, 4/11/2026).

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readSheet } from "read-excel-file/node";
import sharp from "sharp";

const PROYECTO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ON_WORK = join(PROYECTO, "..");
const SALIDA_JSON = join(PROYECTO, "src/data/productos.generated.json");
const AJUSTES = join(PROYECTO, "src/data/productos-ajustes.ts");
const FOTOS = join(PROYECTO, "public/productos");
const HOJA_CONTACTOS = join(ON_WORK, "Web OW/fotos-productos.html");
const CACHE = join(PROYECTO, "node_modules/.cache/productos/analisis-v4.json");

/** Los catálogos con productos en la web, en el orden de la web. */
const CATALOGOS = [
  { slug: "drinkware", titulo: "Drinkware", carpeta: "Catálogo Drinkware", excel: "Catalogo_Drinkware_OW.xlsx", imagenes: "Imágenes Drinkware" },
  {
    slug: "escritura",
    titulo: "Escritura",
    carpeta: "Catálogo Escritura",
    excel: "Catalogo_Escritura_OW.xlsx",
    imagenes: "Imágenes Escritura",
    // El Excel de Escritura no tiene columna Sección: va por número de código.
    seccionPorNumero: [
      [4, "Línea Gardel"],
      [10, "Plásticos"],
      [14, "Ecológicos"],
      [18, "Bamboo y aluminio"],
      [22, "Multifunción"],
      [26, "Con capuchón"],
      [30, "Lápices"],
      [34, "Metálicos y escritorio"],
      [35, "Set ejecutivo"],
    ],
  },
  { slug: "cuadernos", titulo: "Cuadernos y anotadores", carpeta: "Catálogo Cuadernos", excel: "Catalogo_Cuadernos_OW.xlsx", imagenes: "Imágenes Cuadernos", conHojas: true },
  { slug: "oficina", titulo: "Oficina y escritorio", carpeta: "Catálogo Oficina y Escritorio", excel: "Catalogo_Oficina_OW.xlsx", imagenes: "Imágenes Oficina" },
  { slug: "marroquineria", titulo: "Marroquinería", carpeta: "Catálogo Marroquinería", excel: "Catalogo_Marroquineria_OW.xlsx", imagenes: "Imágenes Marroquinería" },
  // En Paraguas, la foto elegida de cada modelo está en "Fotos catálogo".
  { slug: "paraguas", titulo: "Paraguas", carpeta: "Catálogo Paraguas", excel: "Catalogo_Paraguas_OW.xlsx", imagenes: "Imágenes Paraguas", elegidas: "Fotos catálogo" },
];

/** Las únicas columnas que pasan a la web (cualquier otra se ignora). */
const COLUMNAS = {
  "Código OW": "codigo",
  "Nombre OW": "nombre",
  "Sección": "seccion",
  "Tipo": "tipo",
  "Descripción": "descripcion",
  "Medidas": "medidas",
  "Medidas / capacidad": "medidas",
  "Hojas": "hojas",
  "Colores": "colores",
};
const CLAVES_PERMITIDAS = new Set(["codigo", "slug", "nombre", "catalogo", "seccion", "tipo", "descripcion", "medidas", "hojas", "colores", "fotos", "orden"]);

// Proveedores y otras marcas: un texto del Excel que los nombre se descarta
// (no pasa a la web) y queda en la lista para reescribirlo. Regla de Nachi,
// 4/11/2026. Los nombres están en un archivo fuera del repositorio, para que
// la lista de proveedores no quede publicada en GitHub.
// "Símil <Marca>" también cuenta, "símil cuero" no.
const LISTA_PROHIBIDA = join(ON_WORK, "Documentos Internos OW/Proveedores y marcas (no van en la web).txt");
const SIMIL_MARCA = /\bs[ií]mil\s+[A-ZÁÉÍÓÚÑ]\p{L}+/u;
let lista; // { marcas, codigos }: se lee al empezar (leerListaProhibida)
const nombraMarca = (texto) => lista.marcas.test(sinTildes(texto).toLowerCase()) || SIMIL_MARCA.test(texto);
const CAMPOS_CON_TEXTO = { tipo: "tipo", descripcion: "descripción", medidas: "medidas", hojas: "hojas" };

const EXTENSIONES = /\.(jpe?g|png|webp|avif)$/i;
const LADO_MAXIMO = 1200;
const LADO_MINIMO = 600; // menos que esto se ve mal en la web
const BLANCO = 235; // un píxel es "blanco" si sus tres canales superan este valor
// Fondo blanco: casi todo el borde blanco, o al menos 3 de las 4 esquinas
// (así pasan los productos que tocan el borde, como un cuaderno abierto).
const BORDE_BLANCO = 0.9;
const ESQUINAS_BLANCAS = 3;

// ---------------------------------------------------------------- utilidades

// "—" en el Excel quiere decir "sin dato": no se publica.
const limpiar = (v) => {
  const t = v === null || v === undefined ? "" : String(v).replace(/\s+/g, " ").trim();
  return /^[-–—]+$/.test(t) ? "" : t;
};
const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const aSlug = (s) => sinTildes(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const orden = (a, b) => a.localeCompare(b, "es", { numeric: true });

/** Separa "Negro, Blanco (mate, brillante), Rojo" por comas, sin cortar los paréntesis. */
function separarColores(texto) {
  const partes = [];
  let actual = "";
  let profundidad = 0;
  for (const c of texto) {
    if (c === "(") profundidad++;
    if (c === ")") profundidad = Math.max(0, profundidad - 1);
    if (c === "," && profundidad === 0) {
      partes.push(actual);
      actual = "";
    } else actual += c;
  }
  partes.push(actual);
  return partes.map((p) => p.trim()).filter(Boolean).map((p) => p[0].toUpperCase() + p.slice(1));
}

async function enLotes(items, cantidad, fn) {
  const resultados = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: cantidad }, async () => {
      while (i < items.length) {
        const j = i++;
        resultados[j] = await fn(items[j], j);
      }
    }),
  );
  return resultados;
}

// ------------------------------------------------------------------- Excel

async function leerCatalogo(cat) {
  const filas = await readSheet(join(ON_WORK, cat.carpeta, cat.excel), 1);
  const inicio = filas.findIndex((f) => limpiar(f[0]).toLowerCase() === "código ow");
  if (inicio === -1) throw new Error(`${cat.excel}: no encontré la fila de encabezados que empieza en "Código OW".`);

  // Índice de cada columna permitida; las demás no se leen nunca.
  const columnas = [];
  filas[inicio].forEach((titulo, i) => {
    const clave = COLUMNAS[limpiar(titulo)];
    if (clave && !(clave === "hojas" && !cat.conHojas)) columnas.push([clave, i]);
  });

  const productos = [];
  for (const fila of filas.slice(inicio + 1)) {
    const codigo = limpiar(fila[0]);
    if (!/^OW-[A-Z]{3}-\d+$/.test(codigo)) continue;
    const p = { codigo };
    for (const [clave, i] of columnas) {
      const valor = limpiar(fila[i]);
      if (valor && clave !== "codigo") p[clave] = valor;
    }
    if (cat.seccionPorNumero) {
      const numero = Number(codigo.split("-")[2]);
      p.seccion = cat.seccionPorNumero.find(([hasta]) => numero <= hasta)?.[1];
    }
    if (!p.nombre) throw new Error(`${cat.excel}: ${codigo} no tiene Nombre OW.`);
    productos.push(p);
  }
  return productos;
}

// ------------------------------------------------------------------- fotos

/** Fotos de origen de un producto, numeradas como en la hoja de contactos. */
async function fotosDeOrigen(cat, codigo) {
  const fotos = [];
  if (cat.elegidas) {
    const dir = join(ON_WORK, cat.carpeta, cat.elegidas);
    for (const f of (await readdir(dir)).sort(orden)) if (f.startsWith(`${codigo} `) && EXTENSIONES.test(f)) fotos.push(join(dir, f));
  }
  const base = join(ON_WORK, cat.carpeta, cat.imagenes);
  const carpeta = (await readdir(base)).find((d) => d.startsWith(`${codigo} `));
  if (carpeta) {
    for (const f of (await readdir(join(base, carpeta))).sort(orden)) if (EXTENSIONES.test(f)) fotos.push(join(base, carpeta, f));
  }
  return fotos.map((ruta, i) => ({ n: i + 1, ruta }));
}

/** Mide la foto: tamaño, qué parte del borde es blanca y una huella para encontrar repetidas. */
async function analizar(ruta, cache) {
  const s = await stat(ruta);
  const clave = `${ruta}|${s.size}|${s.mtimeMs}`;
  if (cache[clave]) return cache[clave];

  const meta = await sharp(ruta).rotate().metadata();
  const ancho = meta.autoOrient?.width ?? meta.width;
  const alto = meta.autoOrient?.height ?? meta.height;

  const lado = 64;
  const { data } = await sharp(ruta).rotate().flatten({ background: "#ffffff" }).resize(lado, lado, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const esBlanco = (x, y) => {
    const i = (y * lado + x) * 3;
    return Math.min(data[i], data[i + 1], data[i + 2]) >= BLANCO;
  };
  let borde = 0;
  let blancos = 0;
  for (let y = 0; y < lado; y++) {
    for (let x = 0; x < lado; x++) {
      if (x > 1 && x < lado - 2 && y > 1 && y < lado - 2) continue;
      borde++;
      if (esBlanco(x, y)) blancos++;
    }
  }
  // Una esquina es blanca si el 85 % de su cuadrado de 5 × 5 px lo es.
  const esquina = (x0, y0) => {
    let n = 0;
    for (let y = y0; y < y0 + 5; y++) for (let x = x0; x < x0 + 5; x++) if (esBlanco(x, y)) n++;
    return n >= 21;
  };
  const esquinasBlancas = [esquina(0, 0), esquina(lado - 5, 0), esquina(0, lado - 5), esquina(lado - 5, lado - 5)].filter(Boolean).length;

  // Huella: la foto en 48 × 48 px y en color, para encontrar fotos repetidas.
  const huella = (await sharp(ruta).rotate().flatten({ background: "#ffffff" }).resize(48, 48, { fit: "fill" }).removeAlpha().raw().toBuffer()).toString("base64");

  return (cache[clave] = { ancho, alto, bordeBlanco: blancos / borde, esquinasBlancas, huella });
}

/**
 * ¿Son la misma foto? Se compara solo el producto (lo que no es fondo blanco):
 * la diferencia media tiene que ser mínima y casi ningún píxel puede cambiar
 * mucho de color. Así no se confunden las variantes de color, aunque cambien
 * solo en un detalle (la punta de una lapicera, el canto de un cuaderno).
 */
function mismaFoto(a, b) {
  const x = Buffer.from(a, "base64");
  const y = Buffer.from(b, "base64");
  if (x.length !== y.length) return false;
  let suma = 0;
  let pixeles = 0;
  let distintos = 0;
  for (let i = 0; i < x.length; i += 3) {
    const fondo = (buf) => Math.min(buf[i], buf[i + 1], buf[i + 2]) >= BLANCO;
    if (fondo(x) && fondo(y)) continue;
    pixeles++;
    const d = [0, 1, 2].map((k) => Math.abs(x[i + k] - y[i + k]));
    suma += d[0] + d[1] + d[2];
    if (Math.max(...d) > 40) distintos++;
  }
  if (!pixeles) return true;
  return suma / (pixeles * 3) < 6 && distintos / pixeles < 0.004;
}

/** Por qué una foto no pasa el filtro automático (o null si pasa). */
function motivo(foto, anteriores) {
  if (Math.max(foto.ancho, foto.alto) < LADO_MINIMO) return `chica (${foto.ancho} × ${foto.alto} px)`;
  if (foto.bordeBlanco < BORDE_BLANCO && foto.esquinasBlancas < ESQUINAS_BLANCAS) return "fondo no blanco";
  const igual = anteriores.find((a) => a.motivo === null && mismaFoto(a.huella, foto.huella));
  if (igual) return `repetida (igual a la ${igual.n})`;
  return null;
}

async function convertir(origen, destino) {
  if (existsSync(destino) && (await stat(destino)).mtimeMs >= (await stat(origen)).mtimeMs) {
    const m = await sharp(destino).metadata();
    return { ancho: m.width, alto: m.height };
  }
  const info = await sharp(origen)
    .rotate()
    .flatten({ background: "#ffffff" })
    .resize(LADO_MAXIMO, LADO_MAXIMO, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(destino);
  return { ancho: info.width, alto: info.height };
}

// --------------------------------------------------------------- revisión

const REVISION = [
  ["Personalización por producto", /personaliz|grab(a|á|ad)|l[aá]ser|sublim|serigraf|tampograf|bordad|estampad|impres|\blogo|área de/i],
  ["Superlativo", /\b(el|la|los|las|lo) m[aá]s\b|m[aá]s (pedid|vendid|elegid|buscad)|\bmejor(es)?\b|\b[uú]nic[oa]s?\b|incre[ií]ble|perfect|\bs[uú]per\b|\bideal\b|excelente|insuperable/i],
  // "tu marca" también es voseo: se busca el "tú" con tilde y los verbos del tuteo.
  ["Tuteo", /(^|[^\p{L}])(tú|puedes|quieres|tienes|elige|disfruta|descubre|personaliza|aprovecha)(?![\p{L}])/iu],
  ['"Todo el país"', /todo el pa[ií]s/i],
];

function revisar(p) {
  const avisos = [];
  const textos = [p.nombre, p.tipo, p.descripcion, p.medidas, p.hojas].filter(Boolean).join(" · ");
  for (const [tema, re] of REVISION) {
    const m = textos.match(re);
    if (m) avisos.push(`${tema}: «…${textos.slice(Math.max(0, m.index - 40), m.index + 50).trim()}…»`);
  }
  if (p.catalogo === "cuadernos" && /(hoja|interior|p[aá]gina)s?[^.]{0,40}(personaliz|con tu|impres)/i.test(textos)) {
    avisos.push("Cuadernos: puede sugerir hojas personalizadas por dentro");
  }
  if (p.medidas && !/\d/.test(p.medidas)) avisos.push(`Medidas sin números (¿es el material?): «${p.medidas}»`);
  for (const c of p.colores ?? []) if (/:|ver fotos/i.test(c)) avisos.push(`Color con formato especial: «${c}»`);
  return avisos;
}

/** Lee los proveedores, las marcas y los códigos que nunca pasan a la web. */
async function leerListaProhibida() {
  if (!existsSync(LISTA_PROHIBIDA)) {
    throw new Error(`No encontré ../${relative(ON_WORK, LISTA_PROHIBIDA)}: sin esa lista no se puede chequear que no se publiquen proveedores ni marcas.`);
  }
  const nombres = [];
  let codigos = [];
  for (const linea of (await readFile(LISTA_PROHIBIDA, "utf8")).split("\n").map((l) => l.trim())) {
    if (!linea || linea.startsWith("#")) continue;
    const m = linea.match(/^c[oó]digos:\s*(.+)$/i);
    if (m) codigos = m[1].split(/\s+/).filter(Boolean);
    else nombres.push(linea);
  }
  if (!nombres.length || !codigos.length) throw new Error("La lista de proveedores y marcas está vacía o no tiene la línea de códigos.");
  // Sin tildes ni mayúsculas, y con espacio o guion opcional entre palabras.
  const patron = (n) => sinTildes(n).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[\\s-]?");
  return {
    marcas: new RegExp(`(?<![\\p{L}\\d])(?:${nombres.map(patron).join("|")})(?![\\p{L}\\d])`, "u"),
    codigos: new RegExp(`\\b(?:${codigos.join("|")})[\\s-]?\\d`),
  };
}

/** Frena todo si en la salida aparece un código de proveedor o algo con forma de precio. */
function chequearSalida(productos, archivos) {
  const errores = [];
  const codigoProveedor = lista.codigos;
  const precio = /\$|U\$S|\bUSD\b|\bARS\b|\b\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?\b|\b\d+,\d{2}\b/;
  for (const p of productos) {
    for (const clave of Object.keys(p)) if (!CLAVES_PERMITIDAS.has(clave)) errores.push(`${p.codigo}: campo no permitido "${clave}"`);
    const { fotos, ...textos } = p;
    for (const [clave, valor] of Object.entries(textos)) {
      const t = Array.isArray(valor) ? valor.join(", ") : String(valor);
      if (clave !== "codigo" && codigoProveedor.test(t)) errores.push(`${p.codigo} · ${clave}: código de proveedor en «${t}»`);
      if (clave !== "orden" && precio.test(t)) errores.push(`${p.codigo} · ${clave}: parece un precio en «${t}»`);
      if (clave !== "nombre" && nombraMarca(t)) errores.push(`${p.codigo} · ${clave}: nombra a un proveedor o una marca en «${t}»`);
    }
    for (const f of fotos) if (codigoProveedor.test(f.src.split("/").pop().replace(/^ow-[a-z]{3}-\d+-/, ""))) errores.push(`${p.codigo}: código de proveedor en la foto ${f.src}`);
  }
  for (const a of archivos) if (codigoProveedor.test(a.toUpperCase().replace(/^OW-[A-Z]{3}-\d+-/, ""))) errores.push(`archivo con código de proveedor: ${a}`);
  return errores;
}

// ------------------------------------------------------- hoja de contactos

const escapar = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function hojaDeContactos(porCatalogo, ajustes) {
  const desdeHoja = dirname(HOJA_CONTACTOS);
  const bloques = porCatalogo.map(({ cat, productos }) => {
    const tarjetas = productos.map(({ p, origen, principal, va, descartados }) => {
      const notas = [ajustes[p.codigo]?.nota, descartados.length && `Texto descartado por nombrar a un proveedor o una marca (reescribilo): ${descartados.join(" · ")}`].filter(Boolean);
      const nota = notas.join(" — ");
      const fotos = origen.length
        ? origen
            .map((f) => {
              const src = relative(desdeHoja, f.ruta).split("/").map(encodeURIComponent).join("/");
              const estado = f.va ? (f.n === principal ? "principal" : "va") : "no";
              const rotulo = f.va ? (f.n === principal ? "Principal" : "Va") : escapar(f.motivo ?? "descartada en los ajustes");
              return `<figure class="${estado}"><span class="n">${f.n}</span><img loading="lazy" src="${src}" alt="Foto ${f.n} de ${escapar(p.nombre)}"><figcaption>${rotulo}</figcaption></figure>`;
            })
            .join("")
        : `<p class="vacio">No hay carpeta de fotos para este producto.</p>`;
      const estado = va ? `En la web con ${va} foto${va === 1 ? "" : "s"}` : "No va a la web (sin fotos válidas)";
      return `<article><header><span class="codigo">${p.codigo}</span><h3>${escapar(p.nombre)}</h3><p>${escapar(p.seccion ?? "")} · ${estado}</p>${nota ? `<p class="nota">${escapar(nota)}</p>` : ""}</header><div class="fotos">${fotos}</div></article>`;
    });
    return `<section id="${cat.slug}"><h2>${escapar(cat.titulo)}<span>.</span></h2>${tarjetas.join("")}</section>`;
  });

  return `<!doctype html>
<html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fotos de productos · On Work</title>
<style>
  :root { --amarillo: #feb600; --tinta: #231f20; --crema: #fffcef; --crema-suave: #fef6dc; --gris: #5e6166; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--crema); color: var(--tinta); font: 500 15px/1.5 Montserrat, ui-sans-serif, system-ui, sans-serif; }
  main { max-width: 1280px; margin: 0 auto; padding: 32px 20px 80px; }
  h1 { font-size: 40px; line-height: 1; margin: 0 0 12px; font-weight: 800; }
  h1 span, h2 span { color: var(--amarillo); }
  .ayuda { max-width: 760px; color: var(--gris); }
  .ayuda code { background: var(--crema-suave); padding: 1px 6px; border-radius: 6px; color: var(--tinta); }
  nav { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 8px; position: sticky; top: 0; background: var(--crema); padding: 12px 0; z-index: 1; }
  nav a { border: 2px solid var(--tinta); border-radius: 999px; padding: 6px 14px; color: inherit; text-decoration: none; font-weight: 700; }
  h2 { font-size: 30px; margin: 48px 0 16px; font-weight: 800; }
  article { border-top: 2px solid var(--tinta); padding: 20px 0 28px; }
  article header { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px; margin-bottom: 14px; }
  article h3 { margin: 0; font-size: 20px; }
  article header p { margin: 0; color: var(--gris); }
  article header .nota { flex-basis: 100%; color: var(--tinta); background: var(--crema-suave); padding: 6px 10px; border-radius: 8px; }
  .codigo { background: var(--amarillo); border-radius: 999px; padding: 2px 10px; font-size: 12px; font-weight: 700; letter-spacing: .14em; }
  .fotos { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  figure { margin: 0; position: relative; background: #fff; border-radius: 14px; padding: 8px; border: 3px solid transparent; }
  figure img { width: 100%; aspect-ratio: 1; object-fit: contain; display: block; }
  figure.principal { border-color: var(--amarillo); }
  figure.no { opacity: .45; }
  figure .n { position: absolute; top: 6px; left: 6px; background: var(--tinta); color: #fff; border-radius: 999px; min-width: 26px; height: 26px; display: grid; place-items: center; font-weight: 700; font-size: 13px; }
  figcaption { font-size: 12px; font-weight: 700; margin-top: 6px; text-align: center; }
  .no figcaption { color: #9a3412; }
  .vacio { color: var(--gris); margin: 0; }
</style></head><body><main>
<h1>Fotos de productos<span>.</span></h1>
<p class="ayuda">Cada foto tiene su número. Las de borde amarillo son la principal, las opacas no van a la web (dice por qué). Para elegir, anotá en <code>onwork-web/src/data/productos-ajustes.ts</code>: <code>foto: 3</code> (principal), <code>fotos: [3, 1, 5]</code> (cuáles y en qué orden), <code>descartar: [2]</code> o <code>ocultar: true</code>. Si sumás una foto opaca, corré <code>npm run productos</code> para copiarla.</p>
<nav>${porCatalogo.map(({ cat }) => `<a href="#${cat.slug}">${escapar(cat.titulo)}</a>`).join("")}</nav>
${bloques.join("\n")}
</main></body></html>
`;
}

// ---------------------------------------------------------------- principal

lista = await leerListaProhibida();
const { AJUSTES: ajustes } = await import(pathToFileURL(AJUSTES).href);
const cache = existsSync(CACHE) ? JSON.parse(await readFile(CACHE, "utf8")) : {};
const salida = [];
const porCatalogo = [];
const archivosEscritos = new Set();
const resumen = [];
const revisiones = [];
const textosDescartados = [];

for (const cat of CATALOGOS) {
  const productos = await leerCatalogo(cat);
  const dirSalida = join(FOTOS, cat.slug);
  await mkdir(dirSalida, { recursive: true });
  const slugs = new Set();
  const filas = [];
  let fotosCopiadas = 0;
  let fotosOrigen = 0;

  for (const [i, datos] of productos.entries()) {
    let slug = aSlug(datos.nombre);
    if (slugs.has(slug)) slug = `${slug}-${datos.codigo.split("-")[2]}`;
    slugs.add(slug);
    const ajuste = ajustes[datos.codigo] ?? {};

    const descartados = [];
    for (const [campo, rotulo] of Object.entries(CAMPOS_CON_TEXTO)) {
      if (datos[campo] && nombraMarca(datos[campo])) {
        descartados.push(`${rotulo}: «${datos[campo]}»`);
        delete datos[campo];
      }
    }
    if (datos.colores && nombraMarca(datos.colores)) {
      descartados.push(`colores: «${datos.colores}»`);
      delete datos.colores;
    }
    if (descartados.length) textosDescartados.push([`${datos.codigo} ${datos.nombre}`, descartados]);

    const origen = await fotosDeOrigen(cat, datos.codigo);
    fotosOrigen += origen.length;
    const analizadas = [];
    for (const f of await enLotes(origen, 6, async (f) => ({ ...f, ...(await analizar(f.ruta, cache)) }))) {
      analizadas.push({ ...f, motivo: motivo(f, analizadas) });
    }

    // Qué fotos van: la elección a mano manda; si no, las que pasan el filtro.
    let elegidas = ajuste.fotos ?? analizadas.filter((f) => f.motivo === null).map((f) => f.n);
    if (ajuste.foto && !elegidas.includes(ajuste.foto)) elegidas = [ajuste.foto, ...elegidas];
    if (ajuste.descartar) elegidas = elegidas.filter((n) => !ajuste.descartar.includes(n));
    elegidas = elegidas.filter((n) => analizadas.some((f) => f.n === n));

    const fotos = await enLotes(elegidas, 4, async (n) => {
      const f = analizadas.find((x) => x.n === n);
      const archivo = `${datos.codigo.toLowerCase()}-${slug}-${n}.webp`;
      archivosEscritos.add(join(cat.slug, archivo));
      const medida = await convertir(f.ruta, join(dirSalida, archivo));
      return { n, src: `/productos/${cat.slug}/${archivo}`, ...medida };
    });
    fotosCopiadas += fotos.length;

    const producto = {
      codigo: datos.codigo,
      slug,
      nombre: datos.nombre,
      catalogo: cat.slug,
      seccion: datos.seccion,
      ...(datos.tipo && { tipo: datos.tipo }),
      ...(datos.descripcion && { descripcion: datos.descripcion }),
      ...(datos.medidas && { medidas: datos.medidas }),
      ...(datos.hojas && { hojas: datos.hojas }),
      colores: datos.colores ? separarColores(datos.colores) : [],
      fotos,
      orden: i + 1,
    };
    salida.push(producto);

    const principal = ajuste.foto ?? elegidas[0];
    for (const f of analizadas) f.va = elegidas.includes(f.n);
    filas.push({ p: producto, origen: analizadas, principal, va: fotos.length, descartados });
    const avisos = revisar(producto);
    if (avisos.length) revisiones.push([`${producto.codigo} ${producto.nombre}`, avisos]);
  }

  porCatalogo.push({ cat, productos: filas });
  const enLaWeb = filas.filter((f) => f.va > 0 && !ajustes[f.p.codigo]?.ocultar).length;
  resumen.push({ catalogo: cat.titulo, productos: productos.length, enLaWeb, sinFotos: filas.filter((f) => f.va === 0).map((f) => `${f.p.codigo} ${f.p.nombre}`), fotosOrigen, fotosCopiadas });
}

// Borra fotos viejas que ya no corresponden (nombre o selección cambiados).
for (const cat of await readdir(FOTOS)) {
  if (!CATALOGOS.some((c) => c.slug === cat)) {
    await rm(join(FOTOS, cat), { recursive: true });
    continue;
  }
  for (const f of await readdir(join(FOTOS, cat))) if (!archivosEscritos.has(join(cat, f))) await rm(join(FOTOS, cat, f));
}

const errores = chequearSalida(salida, [...archivosEscritos]);
if (errores.length) {
  console.error("\n✗ La salida tiene datos internos. No se guardó nada nuevo en productos.generated.json:\n");
  for (const e of errores) console.error(`  · ${e}`);
  process.exit(1);
}

await writeFile(SALIDA_JSON, JSON.stringify(salida, null, 2) + "\n");
await writeFile(HOJA_CONTACTOS, hojaDeContactos(porCatalogo, ajustes));
await mkdir(dirname(CACHE), { recursive: true });
await writeFile(CACHE, JSON.stringify(cache));

console.log("\nProductos por catálogo");
for (const r of resumen) {
  console.log(`  ${r.catalogo}: ${r.productos} productos, ${r.enLaWeb} en la web · fotos: ${r.fotosCopiadas} de ${r.fotosOrigen}`);
  if (r.sinFotos.length) console.log(`    sin fotos válidas: ${r.sinFotos.join(", ")}`);
}
const total = resumen.reduce((a, r) => ({ p: a.p + r.productos, w: a.w + r.enLaWeb, f: a.f + r.fotosCopiadas, o: a.o + r.fotosOrigen }), { p: 0, w: 0, f: 0, o: 0 });
console.log(`  Total: ${total.p} productos, ${total.w} en la web · ${total.f} fotos de ${total.o}`);

if (textosDescartados.length) {
  console.log("\nTextos descartados por nombrar a un proveedor o una marca (no pasan a la web)");
  for (const [producto, campos] of textosDescartados) console.log(`  ${producto}: ${campos.join(" · ")}`);
}

if (revisiones.length) {
  console.log("\nTextos para revisar (no se cambiaron)");
  for (const [producto, avisos] of revisiones) {
    console.log(`  ${producto}`);
    for (const a of avisos) console.log(`    · ${a}`);
  }
}
console.log(`\n✓ ${relative(PROYECTO, SALIDA_JSON)} · fotos en public/productos/ · hoja de contactos en ../${relative(ON_WORK, HOJA_CONTACTOS)}`);
