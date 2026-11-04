// Pruebas de las operaciones del presupuesto. Correr con: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { cambiarCantidad, cambiarColor, depurar, leerGuardado, normalizarCantidad, quitar, sumar } from "./presupuesto.ts";

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
