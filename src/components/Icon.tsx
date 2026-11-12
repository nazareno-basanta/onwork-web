import type { SVGProps } from "react";

/**
 * Íconos de línea de la marca: trazo de 2 px a 24 px, puntas redondas, sin
 * rellenos. Toman el color del texto. Nunca caracteres ni emojis.
 */
const PATHS = {
  "flecha-diagonal": "M7 17 17 7M8 7h9v9",
  "flecha-derecha": "M5 12h14M13 6l6 6-6 6",
  "flecha-izquierda": "M19 12H5M11 6l-6 6 6 6",
  mas: "M12 5v14M5 12h14",
  menos: "M5 12h14",
  // Tablilla con lista: el presupuesto.
  presupuesto: "M9 3.5h6v3H9zM9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M8.5 11.5h7M8.5 15.5h4.5",
  "flecha-abajo": "M6 9l6 6 6-6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  descargar: "M12 4v11M7 10l5 5 5-5M5 20h14",
  buscar: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  documento: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  cerrar: "M6 6l12 12M18 6 6 18",
  // Tacho: quitar del presupuesto.
  quitar: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  // Sobre: el mail.
  mail: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3.5 7l8.5 6 8.5-6",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01",
  // De Tabler Icons (brand-whatsapp, licencia MIT): el globo y el teléfono, en línea.
  whatsapp:
    "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
} as const;

export type IconName = keyof typeof PATHS;

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function Icon({ name, size = 20, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
