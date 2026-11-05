import { test } from "node:test";
import assert from "node:assert/strict";
import { alternativas, ordenar, palabrasDe, puntaje, textoDeBusqueda, type Campo } from "./buscar.ts";

const producto = (nombre: string, tipo: string, descripcion: string): { nombre: string; campos: Campo[] } => ({
  nombre,
  campos: [
    [textoDeBusqueda([nombre]), 5],
    [textoDeBusqueda([tipo]), 4],
    [textoDeBusqueda([descripcion]), 1],
  ],
});
const apostoles = producto("Apóstoles", "Mate térmico", "Mate térmico premium, de acero con boca de acero inoxidable.");
const garupa = producto("Garupá", "Mate de algarrobo perita", "Mate de algarrobo.");
const gardel = producto("Gardel Silver", "Plástico clásico", "Bolígrafo retráctil de cuerpo metalizado.");
const bolson = producto("Bolsón", "Botella térmica", "Botella de acero.");
const bolso = producto("Bayo", "Bolso de viaje", "Bolso de poliéster.");
const todos = [apostoles, garupa, gardel, bolson, bolso];
const nombres = (q: string) => ordenar(todos, q).map((p) => p.nombre);

test("sin tildes ni mayúsculas", () => {
  assert.deepEqual(nombres("APOSTOLES"), ["Apóstoles"]);
  assert.deepEqual(nombres("garupá"), ["Garupá"]);
});

test("busca también en la descripción", () => {
  assert.deepEqual(nombres("mate acero"), ["Apóstoles"]);
});

test("con varias palabras tienen que estar todas", () => {
  assert.ok(!nombres("mate térmico").includes("Garupá"));
});

test("sinónimos y plurales", () => {
  assert.deepEqual(nombres("lapicera"), ["Gardel Silver"]);
  assert.deepEqual(nombres("biromes"), ["Gardel Silver"]);
  // Mientras se escribe la palabra, ya vale el sinónimo.
  assert.deepEqual(nombres("lapicer"), ["Gardel Silver"]);
  assert.deepEqual(nombres("lapic"), ["Gardel Silver"]);
  assert.ok(alternativas("termos").includes("termo"));
  assert.ok(alternativas("anotadores").includes("anotador"));
  assert.ok(!alternativas("mates").includes("mat"));
});

test("primero lo que coincide en el nombre y el tipo", () => {
  assert.deepEqual(nombres("bolso"), ["Bayo", "Bolsón"]);
});

test("sin palabras no trae nada", () => {
  assert.equal(puntaje(apostoles.campos, palabrasDe("   ")), null);
});
