import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Ancho y alto de una foto de /public, leídos del propio archivo (JPG o PNG)
 * cuando se arma la página. Así cada foto puede ir en un marco con su
 * proporción sin cargar las medidas a mano. Solo en el servidor.
 * Si no se puede leer, devuelve null y quien la usa elige un marco fijo.
 * Va con "use cache": Next 16 arma las páginas de antemano y no deja leer
 * archivos en el medio sin guardar el resultado.
 */
export async function medidasFoto(src: string): Promise<{ ancho: number; alto: number } | null> {
  "use cache";
  try {
    const datos = readFileSync(path.join(process.cwd(), "public", src));
    // PNG: el ancho y el alto están en el bloque IHDR, en los bytes 16 a 23.
    if (datos.readUInt32BE(0) === 0x89504e47) return { ancho: datos.readUInt32BE(16), alto: datos.readUInt32BE(20) };
    // JPG: se recorren los bloques hasta el que describe la imagen (SOF0 a SOF15,
    // salvo 0xC4, 0xC8 y 0xCC, que son otra cosa).
    if (datos[0] !== 0xff || datos[1] !== 0xd8) return null;
    let i = 2;
    while (i < datos.length) {
      if (datos[i] !== 0xff) return null;
      const marca = datos[i + 1];
      const largo = datos.readUInt16BE(i + 2);
      if (marca >= 0xc0 && marca <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marca)) {
        return { alto: datos.readUInt16BE(i + 5), ancho: datos.readUInt16BE(i + 7) };
      }
      i += 2 + largo;
    }
    return null;
  } catch {
    return null;
  }
}
