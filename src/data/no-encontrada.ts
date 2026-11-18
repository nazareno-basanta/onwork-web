/**
 * Textos de la página que aparece cuando una dirección no existe (error 404):
 * links viejos del Wix que no tienen redirección, productos que se sacaron de
 * la web o direcciones mal escritas. El buscador usa los textos del de
 * /catalogos (CATALOGOS_HUB.buscador).
 * ✏️ Borradores de Claude (18/11/2026), para revisar.
 */
import { mensajeWeb } from "@/lib/mensajes";

export const NO_ENCONTRADA = {
  /** Título de la pestaña del navegador. */
  titulo: "Página no encontrada",
  h1: "No encontramos esta página.",
  texto:
    "Puede que haya cambiado de lugar. Buscá el producto o escribinos: lo que no está en los catálogos, lo buscamos para tu marca.",
  /** Botón del buscador (solo para el lector de pantalla: se ve la flecha). */
  buscar: "Buscar",
  whatsapp: "Escribinos por WhatsApp",
  mensaje: mensajeWeb("un producto que no encontré"),
  catalogos: "Ver catálogos",
  inicio: "Ir al inicio",
};
