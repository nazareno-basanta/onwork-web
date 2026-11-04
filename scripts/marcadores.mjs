// Lista los marcadores pendientes de src/data/ (lo que está [entre corchetes])
// con archivo y línea, para saber qué falta completar.
// Uso: npm run marcadores
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CARPETA = "src/data";
// Textos entre comillas o backticks, y comentarios de línea (// [definir…]).
const TEXTO = /"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\/\/.*$/g;
const MARCADOR = /\[[^\]]+\]/g;

let total = 0;

for (const archivo of readdirSync(CARPETA).filter((f) => f.endsWith(".ts")).sort()) {
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

  if (pendientes.length > 0) {
    console.log(`\n${archivo} (${pendientes.length})`);
    console.log(pendientes.join("\n"));
    total += pendientes.length;
  }
}

console.log(
  total > 0
    ? `\n${total} marcadores pendientes. Se ven en npm run dev y no en la web publicada.`
    : "\nNo quedan marcadores pendientes.",
);
