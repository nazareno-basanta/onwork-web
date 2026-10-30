/**
 * Productos del hero, dibujados en SVG plano con los colores de la marca
 * (tinta, blanco, amarillo). Todos usan el mismo lienzo de 400 × 400 y
 * declaran su "área de impresión": dónde se aplica la marca que escribe la
 * persona. Son ilustraciones de producto, no formas decorativas.
 */
import type { ReactNode } from "react";
import type { ProductoHeroId } from "@/data/inicio";

const T = "var(--ow-black)";
const A = "var(--ow-yellow)";
const B = "#ffffff";
const FONDO = "var(--ow-paper-soft)";

export type Dibujo = {
  /** Área donde se imprime la marca, en unidades del lienzo de 400. */
  area: { x: number; y: number; w: number; h: number };
  /** Color del texto impreso y del punto de las O-diana. */
  tinta: string;
  punto: string;
  dibujo: ReactNode;
};

const sombra = (cy: number, rx = 110) => (
  <ellipse cx="200" cy={cy} rx={rx} ry="9" fill={T} opacity="0.1" />
);

export const DIBUJOS: Record<ProductoHeroId, Dibujo> = {
  taza: {
    area: { x: 122, y: 188, w: 136, h: 96 },
    tinta: T,
    punto: A,
    dibujo: (
      <>
        {sombra(348)}
        <path d="M273 178h20a46 46 0 0 1 0 92h-20" fill="none" stroke={T} strokeWidth="17" />
        <rect x="104" y="132" width="172" height="208" rx="22" fill={B} stroke={T} strokeWidth="6" />
        <rect x="104" y="132" width="172" height="20" rx="10" fill={A} stroke={T} strokeWidth="6" />
      </>
    ),
  },
  credencial: {
    area: { x: 134, y: 214, w: 132, h: 78 },
    tinta: T,
    punto: A,
    dibujo: (
      <>
        {sombra(384, 96)}
        <path d="M148 0h24l40 152h-24z" fill={A} stroke={T} strokeWidth="5" strokeLinejoin="round" />
        <path d="M252 0h-24l-40 152h24z" fill={A} stroke={T} strokeWidth="5" strokeLinejoin="round" />
        <rect x="186" y="142" width="28" height="34" rx="5" fill={T} />
        <rect x="116" y="170" width="168" height="204" rx="18" fill={B} stroke={T} strokeWidth="6" />
        <rect x="178" y="185" width="44" height="9" rx="4.5" fill={T} />
        <rect x="146" y="314" width="108" height="9" rx="4.5" fill={T} opacity="0.16" />
        <rect x="164" y="334" width="72" height="9" rx="4.5" fill={T} opacity="0.16" />
      </>
    ),
  },
  llavero: {
    area: { x: 134, y: 208, w: 132, h: 92 },
    tinta: B,
    punto: A,
    dibujo: (
      <>
        {sombra(356, 92)}
        <circle cx="200" cy="82" r="36" fill="none" stroke={T} strokeWidth="9" />
        <rect x="192" y="114" width="16" height="32" rx="8" fill="none" stroke={T} strokeWidth="6" />
        <rect x="118" y="142" width="164" height="204" rx="36" fill={T} />
        <rect x="131" y="155" width="138" height="178" rx="26" fill="none" stroke={A} strokeWidth="3" strokeDasharray="9 8" />
        <circle cx="200" cy="176" r="11" fill={FONDO} />
      </>
    ),
  },
  delantal: {
    area: { x: 116, y: 206, w: 168, h: 70 },
    tinta: B,
    punto: A,
    dibujo: (
      <>
        {sombra(372, 120)}
        <path d="M164 112C164 42 236 42 236 112" fill="none" stroke={T} strokeWidth="10" />
        <path d="M98 200C62 206 48 232 42 262M302 200c36 6 50 32 56 62" fill="none" stroke={T} strokeWidth="6" strokeLinecap="round" />
        <path
          d="M160 104h80l8 70c42 5 57 15 57 26l13 160c-68 12-168 12-236 0l13-160c0-11 15-21 57-26z"
          fill={T}
        />
        <rect x="150" y="294" width="100" height="46" rx="6" fill="none" stroke={A} strokeWidth="3" strokeDasharray="9 7" />
      </>
    ),
  },
  calendario: {
    area: { x: 110, y: 154, w: 180, h: 48 },
    tinta: T,
    punto: T,
    dibujo: (
      <>
        {sombra(350, 120)}
        <rect x="94" y="140" width="212" height="200" rx="12" fill={B} stroke={T} strokeWidth="6" />
        <path d="M97 152a9 9 0 0 1 9-9h188a9 9 0 0 1 9 9v58H97z" fill={A} />
        <path d="M94 212h212" stroke={T} strokeWidth="6" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={110 + i * 21} y="124" width="8" height="30" rx="4" fill={T} />
        ))}
        {Array.from({ length: 4 }, (_, f) =>
          Array.from({ length: 7 }, (_, c) => (
            <rect
              key={`${f}-${c}`}
              x={114 + c * 26}
              y={232 + f * 24}
              width="16"
              height="11"
              rx="3"
              fill={f === 2 && c === 4 ? A : T}
              opacity={f === 2 && c === 4 ? 1 : 0.16}
            />
          )),
        )}
      </>
    ),
  },
  banner: {
    area: { x: 130, y: 96, w: 140, h: 104 },
    tinta: T,
    punto: A,
    dibujo: (
      <>
        {sombra(372, 100)}
        <rect x="114" y="36" width="172" height="11" rx="5.5" fill={T} />
        <rect x="120" y="42" width="160" height="308" fill={B} stroke={T} strokeWidth="6" />
        <rect x="123" y="262" width="154" height="85" fill={A} />
        <rect x="146" y="226" width="108" height="8" rx="4" fill={T} opacity="0.16" />
        <rect x="162" y="242" width="76" height="8" rx="4" fill={T} opacity="0.16" />
        <rect x="104" y="348" width="192" height="18" rx="7" fill={T} />
      </>
    ),
  },
  cuaderno: {
    area: { x: 124, y: 178, w: 124, h: 76 },
    tinta: B,
    punto: A,
    dibujo: (
      <>
        {sombra(356, 104)}
        <rect x="128" y="96" width="170" height="246" rx="10" fill={B} stroke={T} strokeWidth="6" />
        <rect x="108" y="86" width="170" height="246" rx="10" fill={T} />
        <rect x="252" y="86" width="11" height="246" fill={A} />
        <path d="M188 330v38l10-9 10 9v-38" fill={A} />
      </>
    ),
  },
};
