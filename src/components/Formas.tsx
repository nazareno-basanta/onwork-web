/**
 * Formas de la marca, extraídas en vectores de On Work/Elementos OW/On Work Elementos.pdf
 * (página 1). No se dibujan a mano: si hace falta otra, se extrae del mismo archivo.
 *
 * Toman el color del texto (currentColor): <Diana className="text-ow-yellow" />.
 * Son decorativas: llevan aria-hidden. Una o dos por pieza, nunca sobre un
 * producto ni pegadas al logo (ver DESIGN.md).
 */
import type { SVGProps } from "react";

type FormaProps = SVGProps<SVGSVGElement>;

function Svg({ viewBox, children, ...props }: FormaProps) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

/** Sol (rayos) */
export function Sol(props: FormaProps) {
  return (
    <Svg viewBox="68.84 70.74 129.58 128.32" fill="currentColor" {...props}>
      <path d="M117.86 198.21 L145.29 199.06 L133.55 135.29 L117.86 198.21" />
      <path d="M81.07 173.40 L101.53 191.68 L133.54 135.28 L81.07 173.40" />
      <path d="M68.84 130.74 L72.76 157.89 L133.53 135.26 L68.84 130.74" />
      <path d="M86.89 90.20 L72.43 113.52 L133.53 135.25 L86.89 90.20" />
      <path d="M126.77 70.74 L100.71 79.32 L133.55 135.23 L126.77 70.74" />
      <path d="M169.83 81.48 L144.35 71.29 L133.56 135.24 L169.83 81.48" />
      <path d="M195.91 117.38 L182.94 93.20 L133.58 135.25 L195.91 117.38" />
      <path d="M192.82 161.65 L198.42 134.79 L133.58 135.27 L192.82 161.65" />
      <path d="M162.00 193.57 L183.55 176.59 L133.57 135.28 L162.00 193.57" />
    </Svg>
  );
}

/** Flechas (subir y bajar) */
export function Flechas(props: FormaProps) {
  return (
    <Svg viewBox="294.41 47.77 67.64 151.60" fill="currentColor" {...props}>
      <path d="M341.28 177.52 L334.66 47.77 L358.31 47.77 L352.48 177.52 L341.28 177.52" />
      <path d="M362.06 175.94 L330.92 175.94 L346.49 199.38 L362.06 175.94" />
      <path d="M315.18 69.63 L321.81 199.38 L298.15 199.38 L303.99 69.63 L315.18 69.63" />
      <path d="M294.41 71.21 L325.55 71.21 L309.98 47.77 L294.41 71.21" />
    </Svg>
  );
}

/** Cuadrado */
export function Cuadrado(props: FormaProps) {
  return (
    <Svg viewBox="482.72 76.21 116.58 116.58" fill="currentColor" {...props}>
      <path d="M482.72 76.21H599.30V192.80H482.72Z" />
    </Svg>
  );
}

/** Círculo */
export function Circulo(props: FormaProps) {
  return (
    <Svg viewBox="477.91 242.88 126.18 126.18" fill="currentColor" {...props}>
      <path d="M541.01 369.07 L541.01 369.07 C506.16 369.07 477.91 340.82 477.91 305.98 L477.91 305.98 C477.91 271.13 506.16 242.88 541.01 242.88 C575.85 242.88 604.10 271.13 604.10 305.98 L604.10 305.98 C604.10 340.82 575.85 369.07 541.01 369.07" />
    </Svg>
  );
}

/** Triángulo */
export function Triangulo(props: FormaProps) {
  return (
    <Svg viewBox="473.65 423.48 134.72 116.67" fill="currentColor" {...props}>
      <path d="M541.01 423.48 L473.65 540.15 L608.37 540.15 L541.01 423.48 L473.65 540.15 L608.37 540.15 L541.01 423.48" />
    </Svg>
  );
}

/** Cruz */
export function Cruz(props: FormaProps) {
  return (
    <Svg viewBox="79.41 270.86 89.62 89.62" fill="currentColor" {...props}>
      <path d="M114.54 270.86H133.91V360.47H114.54Z" />
      <path d="M79.41 305.98H169.03V325.35H79.41Z" />
    </Svg>
  );
}

/** Signo de exclamación */
export function Signo(props: FormaProps) {
  return (
    <Svg viewBox="318.61 229.11 27.86 138.60" fill="currentColor" {...props}>
      <path d="M332.75 342.77 C328.87 342.77 325.66 343.95 323.12 346.30 C320.58 348.66 319.31 351.59 319.31 355.10 C319.31 358.52 320.58 361.48 323.12 363.97 C325.66 366.47 328.87 367.71 332.75 367.71 C336.63 367.71 339.80 366.47 342.25 363.97 C344.69 361.48 345.92 358.52 345.92 355.10 C345.92 351.59 344.69 348.66 342.25 346.30 C339.80 343.95 336.63 342.77 332.75 342.77" />
      <path d="M341.22 332.54 L346.47 229.11 L318.61 229.11 L324.01 332.51 C326.37 332.04 329.32 331.77 332.54 331.77 C335.82 331.77 338.84 332.06 341.22 332.54" />
    </Svg>
  );
}

/** Diana (las O del logo) */
export function Diana(props: FormaProps) {
  return (
    <Svg viewBox="61.13 412.38 126.18 126.18" fill="currentColor" {...props}>
      <path d="M124.22 522.39 C98.31 522.39 77.30 501.38 77.30 475.47 C77.30 449.55 98.31 428.54 124.22 428.54 C150.14 428.54 171.15 449.55 171.15 475.47 C171.15 501.38 150.14 522.39 124.22 522.39 M124.22 412.38 C89.38 412.38 61.13 440.62 61.13 475.47 C61.13 510.31 89.38 538.56 124.22 538.56 C159.07 538.56 187.31 510.31 187.31 475.47 C187.31 440.62 159.07 412.38 124.22 412.38" />
      <path d="M124.22 489.75 C116.33 489.75 109.94 483.36 109.94 475.47 C109.94 467.58 116.33 461.19 124.22 461.19 C132.11 461.19 138.50 467.58 138.50 475.47 C138.50 483.36 132.11 489.75 124.22 489.75 M124.22 444.71 C107.23 444.71 93.46 458.48 93.46 475.47 C93.46 492.46 107.23 506.23 124.22 506.23 C141.21 506.23 154.98 492.46 154.98 475.47 C154.98 458.48 141.21 444.71 124.22 444.71" />
    </Svg>
  );
}

/** Estallido */
export function Estallido(props: FormaProps) {
  return (
    <Svg viewBox="257.04 397.00 151.15 153.76" fill="currentColor" {...props}>
      <path d="M332.62 397.00 L343.41 437.70 L373.89 409.45 L361.56 449.69 L402.07 442.87 L370.53 469.86 L408.19 486.63 L367.46 491.82 L390.32 526.85 L353.32 508.59 L354.13 550.76 L332.62 514.83 L311.10 550.76 L311.91 508.59 L274.91 526.85 L297.77 491.82 L257.04 486.63 L294.70 469.86 L263.16 442.87 L303.67 449.69 L291.34 409.45 L321.82 437.70 L332.62 397.00" />
    </Svg>
  );
}

/** Trío cuadrado · triángulo · círculo. Por defecto: amarillo, tinta, amarillo. */
export function Trio({
  colores = ["var(--ow-yellow)", "var(--ow-black)", "var(--ow-yellow)"],
  ...props
}: FormaProps & { colores?: [string, string, string] }) {
  return (
    <Svg viewBox="719.96 261.77 241.39 88.42" {...props}>
      <path fill={colores[0]} d="M719.96 261.77H808.39V350.19H719.96Z" />
      <path fill={colores[1]} d="M896.46 350.19 L813.48 350.19 L813.48 317.06 L845.41 261.77 L868.07 301.01 L873.08 309.67 L873.08 309.68 L891.90 342.28 L896.46 350.19" />
      <path fill={colores[2]} d="M961.35 305.98 C961.35 330.39 941.55 350.19 917.14 350.19 C911.24 350.19 905.61 349.04 900.47 346.93 L873.33 299.93 C876.28 278.37 894.77 261.77 917.14 261.77 C941.55 261.77 961.35 281.56 961.35 305.98" />
    </Svg>
  );
}
