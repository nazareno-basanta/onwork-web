// Revisa las notas de Ideas (src/data/ideas.ts y sus textos en
// src/data/ideas/*.mdx): que no falte nada y que las publicadas cumplan las
// reglas de las skills de SEO y de marca. Correr con: npm test
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { AUTORES } from "./autores.ts";
import { IDEAS, IDEAS_PUBLICADAS, type Idea } from "./ideas.ts";

const DATOS = import.meta.dirname;
const CARPETA = join(DATOS, "ideas");
const leer = (archivo: string) => readFileSync(join(DATOS, archivo), "utf8");

// Lo que existe en la web, leído de los archivos (los .ts usan "@/…", que las
// pruebas no pueden importar).
const productos: { codigo: string; fotos: unknown[] }[] = JSON.parse(leer("productos.generated.json"));
const CODIGOS = new Set(productos.filter((p) => p.fotos.length > 0).map((p) => p.codigo));
const CATALOGOS = new Set([...leer("catalogos.ts").matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]));
const PEDIDOS = new Set([...leer("pedidos.ts").matchAll(/^\s+slug: "([^"]+)"/gm)].map((m) => m[1]));

/** [pendiente], sin contar los links de Markdown: [texto](dirección). */
const MARCADOR = /\[[^\]]*\](?!\()/;
/** Palabras de España o México y frases que la marca no usa (skill on-work-marca y on-work-seo). */
const PROHIBIDAS =
  /\b(camisetas?|sudaderas?|libretas?|memorias? usb|emprendedor(es)?|emprendimientos?|todo el pa[ií]s|monte grande)\b/i;

const sinComentarios = (mdx: string) => mdx.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
const palabras = (texto: string) => texto.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
const textos = (idea: Idea) => [
  idea.titulo,
  idea.respuesta,
  idea.seo.titulo,
  idea.seo.descripcion,
  ...(idea.preguntas ?? []).flatMap((q) => [q.pregunta, q.respuesta]),
];
const cuerpo = (slug: string) => sinComentarios(readFileSync(join(CARPETA, `${slug}.mdx`), "utf8"));

/** Lo que le falta a una nota para poder publicarse. Vacío = lista. */
function problemasParaPublicar(idea: Idea, texto: string) {
  const problemas: string[] = [];
  if (!idea.publicado || !idea.actualizado) problemas.push("faltan las fechas publicado y actualizado");
  if ([...textos(idea), texto].some((t) => MARCADOR.test(t))) problemas.push("quedan [marcadores] sin completar");
  const n = palabras(idea.respuesta);
  if (n < 40 || n > 60) problemas.push(`la respuesta corta tiene ${n} palabras (van de 40 a 60)`);
  for (const q of idea.preguntas ?? []) {
    if (palabras(q.respuesta) > 60) problemas.push(`la respuesta a "${q.pregunta}" pasa las 60 palabras`);
  }
  if (/\.\s*$/.test(idea.seo.titulo)) problemas.push("el título para Google termina en punto");
  if (/\bmejor(es)?\b/i.test(`${idea.titulo} ${idea.seo.titulo}`)) problemas.push('el título dice "mejor" o "mejores"');
  const prohibida = [...textos(idea), texto].join(" ").match(PROHIBIDAS);
  if (prohibida) problemas.push(`dice "${prohibida[0]}" (regla de marca)`);
  return problemas;
}

test("cada nota tiene un slug único, en minúscula y con guiones", () => {
  const slugs = IDEAS.map((i) => i.slug);
  assert.equal(new Set(slugs).size, slugs.length, "hay dos notas con el mismo slug");
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `slug con formato raro: ${slug}`);
});

test("cada nota tiene su texto en src/data/ideas/<slug>.mdx, y no sobra ningún texto", () => {
  const archivos = readdirSync(CARPETA).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  for (const idea of IDEAS) assert.ok(archivos.includes(idea.slug), `falta src/data/ideas/${idea.slug}.mdx`);
  for (const archivo of archivos) {
    assert.ok(IDEAS.some((i) => i.slug === archivo), `src/data/ideas/${archivo}.mdx no tiene datos en ideas.ts`);
  }
});

test("el autor, los productos, los catálogos y el pedido de cada nota existen", () => {
  assert.equal(CATALOGOS.size, 8, "no se pudieron leer los catálogos de catalogos.ts");
  for (const idea of IDEAS) {
    assert.ok(idea.autor in AUTORES, `${idea.slug}: no existe el autor ${idea.autor}`);
    for (const codigo of idea.productos ?? []) {
      assert.ok(CODIGOS.has(codigo), `${idea.slug}: el producto ${codigo} no existe o no tiene foto`);
    }
    for (const catalogo of idea.catalogos ?? []) {
      assert.ok(CATALOGOS.has(catalogo), `${idea.slug}: no existe el catálogo ${catalogo}`);
    }
    if (idea.pedido) assert.ok(PEDIDOS.has(idea.pedido), `${idea.slug}: no existe el pedido ${idea.pedido}`);
  }
});

test("las fechas son año-mes-día y la de actualizado no es anterior a la de publicado", () => {
  const fecha = /^\d{4}-\d{2}-\d{2}$/;
  for (const idea of IDEAS) {
    for (const f of [idea.publicado, idea.actualizado].filter((f) => f !== undefined)) {
      assert.ok(fecha.test(f) && !Number.isNaN(Date.parse(f)), `${idea.slug}: fecha mal escrita (${f})`);
    }
    if (idea.publicado && idea.actualizado) {
      assert.ok(idea.actualizado >= idea.publicado, `${idea.slug}: actualizado es anterior a publicado`);
    }
  }
});

test("las notas publicadas están completas y respetan las reglas", () => {
  for (const idea of IDEAS_PUBLICADAS) {
    assert.deepEqual(problemasParaPublicar(idea, cuerpo(idea.slug)), [], `${idea.slug} no está lista para publicarse`);
  }
});

test("la revisión de publicación detecta lo que falta", () => {
  const respuesta = Array(45).fill("texto").join(" ");
  const lista: Idea = {
    slug: "prueba",
    tipo: "guia",
    autor: "sergio-basanta",
    publicado: "2026-12-01",
    actualizado: "2026-12-01",
    titulo: "¿Qué técnica conviene para una remera?",
    respuesta,
    seo: { titulo: "Qué técnica conviene para una remera", descripcion: "Descripción." },
  };
  assert.deepEqual(problemasParaPublicar(lista, "Ver el [catálogo](/catalogos) completo."), []);

  const incompleta: Idea = {
    ...lista,
    publicado: undefined,
    titulo: "Las mejores remeras",
    respuesta: "[Respuesta corta]",
    seo: { titulo: "Las mejores remeras.", descripcion: "Camisetas con logo." },
  };
  assert.deepEqual(problemasParaPublicar(incompleta, "Texto."), [
    "faltan las fechas publicado y actualizado",
    "quedan [marcadores] sin completar",
    "la respuesta corta tiene 2 palabras (van de 40 a 60)",
    "el título para Google termina en punto",
    'el título dice "mejor" o "mejores"',
    'dice "Camisetas" (regla de marca)',
  ]);
});
