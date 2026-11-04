/**
 * Datos estructurados para Google (JSON-LD). Se arman con los tipos de
 * schema-dts (WithContext<Organization>, etc.), que avisan si falta o sobra
 * algún campo; acá solo se escriben. El "<" se escapa para que el texto no
 * pueda cerrar la etiqueta.
 */
export default function JsonLd({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }}
    />
  );
}
