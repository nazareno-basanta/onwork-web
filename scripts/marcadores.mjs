// Lista los marcadores pendientes de src/data/ (lo que está [entre corchetes])
// con archivo y línea, para saber qué falta completar.
// Uso: npm run marcadores
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CARPETA = "src/data";
// Textos entre comillas o backticks, y comentarios de línea (// [definir…]).
const TEXTO = /"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\/\/.*$/g;
const MARCADOR = /\[[^\]]+\]/g;

// Textos de las notas de Ideas (src/data/ideas/*.mdx): ahí todo es texto,
// menos los comentarios {/* … */} y los links de Markdown [texto](dirección).
const CARPETA_IDEAS = join(CARPETA, "ideas");
const MARCADOR_MDX = /\[[^\]]+\](?!\()/g;

let total = 0;

function informar(archivo, pendientes) {
  if (pendientes.length === 0) return;
  console.log(`\n${archivo} (${pendientes.length})`);
  console.log(pendientes.join("\n"));
  total += pendientes.length;
}

// Las pruebas (*.test.ts) usan corchetes de ejemplo: no son pendientes.
for (const archivo of readdirSync(CARPETA).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts")).sort()) {
  const ruta = join(CARPETA, archivo);
  const lineas = readFileSync(ruta, "utf8").split("\n");
  const pendientes = [];

  lineas.forEach((linea, i) => {
    // Los comentarios de documentación (/** … */) explican, no son pendientes.
    if (/^\s*(\/\*\*|\*)/.test(linea)) return;
    for (const texto of linea.match(TEXTO) ?? []) {
      for (const marcador of texto.match(MARCADOR) ?? []) {
        pendientes.push(`  ${ruta}:${i + 1}  ${marcador}`);
      }
    }
  });

  informar(archivo, pendientes);
}

for (const archivo of readdirSync(CARPETA_IDEAS).filter((f) => f.endsWith(".mdx")).sort()) {
  const ruta = join(CARPETA_IDEAS, archivo);
  // Los comentarios se vacían sin borrar sus saltos de línea, así los números de línea no cambian.
  const texto = readFileSync(ruta, "utf8").replace(/\{\/\*[\s\S]*?\*\/\}/g, (c) => c.replace(/[^\n]/g, ""));
  const pendientes = [];

  texto.split("\n").forEach((linea, i) => {
    for (const marcador of linea.match(MARCADOR_MDX) ?? []) {
      pendientes.push(`  ${ruta}:${i + 1}  ${marcador}`);
    }
  });

  informar(`ideas/${archivo}`, pendientes);
}

console.log(
  total > 0
    ? `\n${total} marcadores pendientes. Se ven en npm run dev y no en la web publicada.`
    : "\nNo quedan marcadores pendientes.",
);
