// Pruebas de tipoDePagina (la agrupación de las mediciones). Correr con: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { tipoDePagina } from "./tipoDePagina.ts";

test("reconoce cada tipo de página por su dirección", () => {
  assert.equal(tipoDePagina("/"), "inicio");
  assert.equal(tipoDePagina("/catalogos"), "catalogos");
  assert.equal(tipoDePagina("/catalogos/drinkware"), "catalogo");
  assert.equal(tipoDePagina("/catalogos/drinkware/apostoles"), "producto");
  assert.equal(tipoDePagina("/ideas"), "ideas");
  assert.equal(tipoDePagina("/ideas/set-matero-con-tu-marca"), "idea");
  assert.equal(tipoDePagina("/ideas/autores/sergio-basanta"), "autor");
  assert.equal(tipoDePagina("/pedidos/casa-fernandes"), "pedido");
  assert.equal(tipoDePagina("/como-pedir"), "como-pedir");
  assert.equal(tipoDePagina("/presupuesto"), "presupuesto");
});

test("lo que no conoce es otra, y la barra final no cambia nada", () => {
  assert.equal(tipoDePagina("/algo-nuevo"), "otra");
  assert.equal(tipoDePagina("/ideas/autores"), "otra");
  assert.equal(tipoDePagina("/nosotros/"), "nosotros");
});
