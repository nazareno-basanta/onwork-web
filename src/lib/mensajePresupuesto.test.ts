// Pruebas del mensaje de WhatsApp del presupuesto. Correr con: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { LARGO_MAXIMO, armarMensajePresupuesto, type GrupoMensaje } from "./mensajePresupuesto.ts";

const EJEMPLO: GrupoMensaje[] = [
  {
    catalogo: "Drinkware",
    lineas: [
      { cantidad: 100, nombre: "Apóstoles", codigo: "OW-DRK-01" },
      { cantidad: 50, nombre: "Recoleta con Manija", codigo: "OW-DRK-31" },
    ],
  },
  { catalogo: "Cuadernos y anotadores", lineas: [{ cantidad: 100, nombre: "Borges", codigo: "OW-CUA-01" }] },
];

test("arma el mensaje con el formato de Nachi", () => {
  const { texto, nivel } = armarMensajePresupuesto(EJEMPLO, "Gorras trucker");
  assert.equal(nivel, 0);
  assert.equal(
    texto,
    [
      "Hola, armé un presupuesto en la web de On Work:",
      "",
      "Drinkware",
      "• 100 × Apóstoles (OW-DRK-01)",
      "• 50 × Recoleta con Manija (OW-DRK-31)",
      "",
      "Cuadernos y anotadores",
      "• 100 × Borges (OW-CUA-01)",
      "",
      "Otro: Gorras trucker",
      "",
      "Comentarios: ",
    ].join("\n"),
  );
});

test("suma el color cuando está elegido y lo omite si es A definir", () => {
  const { texto } = armarMensajePresupuesto([
    {
      catalogo: "Drinkware",
      lineas: [
        { cantidad: 50, nombre: "Apóstoles", codigo: "OW-DRK-01", color: "Negro" },
        { cantidad: 50, nombre: "Apóstoles", codigo: "OW-DRK-01", color: "" },
      ],
    },
  ]);
  assert.match(texto, /• 50 × Apóstoles \(OW-DRK-01\) · Negro\n• 50 × Apóstoles \(OW-DRK-01\)\n/);
});

test("sin «Otro», no aparece la línea; los catálogos vacíos no se escriben", () => {
  const { texto } = armarMensajePresupuesto([...EJEMPLO, { catalogo: "Paraguas", lineas: [] }], "   ");
  assert.doesNotMatch(texto, /Otro:/);
  assert.doesNotMatch(texto, /Paraguas/);
  assert.ok(texto.endsWith("Cuadernos y anotadores\n• 100 × Borges (OW-CUA-01)\n\nComentarios: "));
  assert.doesNotMatch(texto, /Fecha/);
});

test("sin emojis ni tuteo en el texto fijo", () => {
  const { texto } = armarMensajePresupuesto(EJEMPLO);
  assert.doesNotMatch(texto, /\p{Extended_Pictographic}/u);
  assert.doesNotMatch(texto, /\b(tú|puedes|quieres)\b/);
});

const largas = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    cantidad: 1000 + i,
    nombre: `Producto con un nombre bastante largo ${i + 1}`,
    codigo: `OW-DRK-${String(i + 1).padStart(2, "0")}`,
    color: "Verde pastel",
  }));

test("una lista larga se compacta por etapas y conserva los colores hasta el final", () => {
  // 20 productos: entra sin nombres, pero con los colores.
  const veinte = armarMensajePresupuesto([{ catalogo: "Drinkware", lineas: largas(20) }]);
  assert.equal(veinte.nivel, 2);
  assert.doesNotMatch(veinte.texto, /^Drinkware$/m);
  assert.doesNotMatch(veinte.texto, /nombre bastante largo/);
  assert.equal(veinte.texto.match(/^- \d+ x OW-DRK-\d+ - Verde pastel$/gm)?.length, 20);
  assert.ok(encodeURIComponent(veinte.texto).length <= LARGO_MAXIMO);

  // 60 productos: ya no entra ni así, va sin colores.
  const sesenta = armarMensajePresupuesto([{ catalogo: "Drinkware", lineas: largas(60) }]);
  assert.equal(sesenta.nivel, 3);
  assert.doesNotMatch(sesenta.texto, /Verde pastel/);
  assert.equal(sesenta.texto.match(/^- \d+ x OW-DRK-\d+$/gm)?.length, 60);
});

test("copiar la lista siempre lleva el mensaje completo", () => {
  const { completo } = armarMensajePresupuesto([{ catalogo: "Drinkware", lineas: largas(60) }]);
  assert.match(completo, /^Drinkware$/m);
  assert.equal(completo.match(/ · Verde pastel$/gm)?.length, 60);
});

test("una lista corta no se compacta y entra en el largo máximo", () => {
  const { texto, nivel } = armarMensajePresupuesto(EJEMPLO);
  assert.equal(nivel, 0);
  assert.ok(encodeURIComponent(texto).length <= LARGO_MAXIMO);
});
