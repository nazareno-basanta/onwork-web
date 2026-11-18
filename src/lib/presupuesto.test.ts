// Pruebas de las operaciones del presupuesto. Correr con: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  OTRO_MAXIMO,
  cambiarCantidad,
  cambiarColor,
  depurar,
  estaEnOtro,
  leerGuardado,
  normalizarCantidad,
  quitar,
  sumar,
  sumarTextoAOtro,
} from "./presupuesto.ts";

test("sumar a Otro: separa con coma, no repite y nunca corta a mitad de palabra", () => {
  let otro = sumarTextoAOtro("", "Cintas sublimadas (catálogo Cintas e identificación)");
  assert.equal(otro, "Cintas sublimadas (catálogo Cintas e identificación)");
  otro = sumarTextoAOtro(otro!, "Pines (catálogo Cintas e identificación)");
  assert.equal(otro, "Cintas sublimadas (catálogo Cintas e identificación), Pines (catálogo Cintas e identificación)");
  assert.equal(sumarTextoAOtro(otro!, "pines (catálogo cintas e identificación)"), otro, "ya estaba: no se repite");
  assert.equal(sumarTextoAOtro("gorra trucker", "Gorra trucker"), "gorra trucker");
  assert.ok(estaEnOtro("Gorras trucker, delantales", "delantales"));

  // Las seis líneas de Cintas (más de 300 caracteres) entran enteras.
  const secciones = ["Cintas sublimadas", "Cintas largas", "Cintas cortas", "Identificadores", "Pines", "Botones, medallas y pulseras"];
  const todas = secciones.reduce((o, s) => sumarTextoAOtro(o, `${s} (catálogo Cintas e identificación)`)!, "");
  assert.ok(todas.length > 300);
  assert.ok(todas.endsWith("Botones, medallas y pulseras (catálogo Cintas e identificación)"));

  // Si no entra, no se suma (null): nada queda cortado.
  assert.equal(sumarTextoAOtro("x".repeat(OTRO_MAXIMO - 5), "Pines (catálogo Cintas e identificación)"), null);
});

test("sumar arranca en 1 y, si el producto ya está en ese color, suma", () => {
  let lineas = sumar([], "OW-DRK-01");
  assert.deepEqual(lineas, [{ codigo: "OW-DRK-01", color: "", cantidad: 1 }]);
  lineas = sumar(lineas, "OW-DRK-01");
  assert.equal(lineas[0].cantidad, 2);
  lineas = sumar(lineas, "OW-DRK-01", "Negro");
  assert.equal(lineas.length, 2, "otro color es otra línea");
});

test("la cantidad es entera, de 1 a 99.999, sin mínimo de pedido", () => {
  assert.equal(normalizarCantidad(0), 1);
  assert.equal(normalizarCantidad(-5), 1);
  assert.equal(normalizarCantidad(2.6), 3);
  assert.equal(normalizarCantidad(1e9), 99999);
  assert.equal(normalizarCantidad(Number.NaN), 1);
  assert.equal(cambiarCantidad([{ codigo: "A", color: "", cantidad: 1 }], "A", "", 250)[0].cantidad, 250);
});

test("cambiar a un color que ya estaba une las dos líneas", () => {
  const lineas = [
    { codigo: "A", color: "", cantidad: 10 },
    { codigo: "A", color: "Negro", cantidad: 5 },
  ];
  assert.deepEqual(cambiarColor(lineas, "A", "", "Negro"), [{ codigo: "A", color: "Negro", cantidad: 15 }]);
  assert.deepEqual(cambiarColor(lineas, "A", "", "Blanco")[0], { codigo: "A", color: "Blanco", cantidad: 10 });
});

test("quitar y depurar", () => {
  const lineas = [
    { codigo: "A", color: "", cantidad: 1 },
    { codigo: "B", color: "", cantidad: 1 },
  ];
  assert.deepEqual(quitar(lineas, "A", ""), [lineas[1]]);
  assert.deepEqual(depurar(lineas, new Set(["B"])), [lineas[1]]);
});

test("lo guardado roto o de otro formato no rompe nada", () => {
  assert.deepEqual(leerGuardado(null), { lineas: [], otro: "", enviado: false });
  assert.deepEqual(leerGuardado("{no es json"), { lineas: [], otro: "", enviado: false });
  assert.deepEqual(leerGuardado('{"lineas":[{"codigo":1},{"codigo":"A","color":"","cantidad":3}],"otro":5,"enviado":true}'), {
    lineas: [{ codigo: "A", color: "", cantidad: 3 }],
    otro: "",
    enviado: true,
  });
});
