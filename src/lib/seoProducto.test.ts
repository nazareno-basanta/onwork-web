import { test } from "node:test";
import assert from "node:assert/strict";
import { descripcionProducto, tituloProducto } from "./seoProducto.ts";

const base = { colores: 2, catalogo: "Drinkware" };

test("título: el tipo nombra el producto y concuerda en género", () => {
  assert.equal(tituloProducto({ ...base, nombre: "Apóstoles", tipo: "Mate térmico" }), "Apóstoles · Mate térmico personalizado");
  assert.equal(tituloProducto({ ...base, nombre: "Callao", tipo: "Taza mágica" }), "Callao · Taza mágica personalizada");
  assert.equal(tituloProducto({ ...base, nombre: "X", tipo: "Lápices de colores" }), "X · Lápices de colores personalizados");
});

test("título: sin paréntesis, y sin repetir el tipo que ya está en el nombre", () => {
  assert.equal(
    tituloProducto({ ...base, nombre: "Set Iberá", tipo: "Kit matero (termo 1,5 L + mate + yerbera + bombilla)" }),
    "Set Iberá · Kit matero personalizado",
  );
  assert.equal(
    tituloProducto({ ...base, catalogo: "Paraguas", nombre: "Paraguas golf manual", tipo: "Paraguas golf" }),
    "Paraguas golf manual personalizado",
  );
});

test("título: si el tipo es un material, no se inventa el producto", () => {
  assert.equal(
    tituloProducto({ ...base, catalogo: "Escritura", nombre: "Gardel", tipo: "Plástico clásico" }),
    "Gardel · Plástico clásico · Escritura",
  );
  assert.equal(tituloProducto({ ...base, nombre: "Aristóbulo" }), "Aristóbulo · Drinkware");
});

test("descripción: entra en 160 caracteres y termina con la invitación", () => {
  const larga = "Carry on de 20 pulgadas, tamaño cabina, de ABS rígido resistente a golpes y rayaduras. Candado TSA con clave de tres dígitos, manija extensible de tres posiciones.";
  const d = descripcionProducto({ ...base, colores: 1, nombre: "Saint-Exupéry", tipo: "Carry on rígido", descripcion: larga });
  assert.ok(d.length <= 160, `${d.length}: ${d}`);
  assert.equal(
    d,
    "Carry on rígido Saint-Exupéry con tu marca. Carry on de 20 pulgadas, tamaño cabina, de ABS rígido resistente a golpes y rayaduras. Cotizá por WhatsApp.",
  );
});

test("descripción: sin una oración que entre, corta en una palabra entera", () => {
  const d = descripcionProducto({ ...base, nombre: "Borges", tipo: "Cuaderno A5", descripcion: "Tapa dura forrada en eco cuero soft mate, banda elástica al tono, presilla portabolígrafo, señalador de cinta, bolsillo interno y hojas rayadas de 80 gramos" });
  assert.ok(d.length <= 160);
  assert.match(d, /[a-z]… Cotizá por WhatsApp\.$/);
});

test("descripción: un color no se nombra y se agrega el punto que falta", () => {
  const d = descripcionProducto({ ...base, colores: 1, nombre: "Garupá", tipo: "Mate de algarrobo perita", descripcion: "Mate de algarrobo" });
  assert.equal(d, "Mate de algarrobo perita Garupá con tu marca. Mate de algarrobo. Cotizá por WhatsApp.");
});
