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
  documento: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  cerrar: "M6 6l12 12M18 6 6 18",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01",
  whatsapp:
    "M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.6zM9 8.5c0 3.3 3.2 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.3-2.3l.9-1-1-2z",
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
