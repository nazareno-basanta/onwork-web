"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MotionValue } from "motion/react";

export type ProductoHero = { codigo: string; nombre: string; src: string; url: string };

/** Dónde está el centro del aro dentro del isotipo y cuánto mide (proporciones del archivo de marca). */
const ARO_CENTRO_Y = (197.95 - 49.89) / 232.46;
const ARO_RADIO = 84.4 / 232.46;

const tramo = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const suave = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** Por pasos (Nachi, 6/11/2026: la órbita no; de a uno, rápido pero no tanto). */
const PAUSA = 1.4; // segundos quieta
const VIAJE = 0.75; // segundos que tarda en correr un lugar

/** Medidas según el ancho de la pantalla. */
function medidas(ancho: number, altoIso: number) {
  const celular = ancho < 640;
  const lado = celular ? 84 : ancho < 1024 ? 120 : 150; // todas del mismo tamaño
  // El círculo crema detrás del isotipo: un poco más grande que el aro.
  const radioDisco = altoIso * ARO_RADIO + (celular ? 10 : 18);
  // Distancia al centro de la tarjeta que queda pegada al isotipo.
  const pegada = radioDisco + lado / 2 + (celular ? 12 : 20);
  return {
    ancho,
    celular,
    lado,
    radioDisco,
    pegada,
    paso: pegada, // separación entre tarjetas en el recorrido
  };
}

/**
 * Carrusel de productos destacados del hero: una fila que corre de derecha a
 * izquierda por el centro del aro, de a un lugar (queda quieta 1,4 s, con tres
 * a cada lado, y corre en 0,75 s), y se mete por detrás
 * del isotipo, que no se toca (va siempre arriba; detrás tiene un círculo del
 * crema del fondo que tapa las tarjetas). Todas tienen el mismo tamaño (Nachi,
 * 6/11/2026); solo al meterse por detrás achican un poco, lo justo para no
 * asomar por los costados del aro.
 * - Con el mouse encima no arranca el próximo paso; cada tarjeta lleva a su producto.
 * - Al bajar (progreso del hero), las tarjetas se abren hacia los costados y
 *   se van mientras el isotipo crece.
 * - Con menos movimiento queda quieta: tres a cada lado, como en el diseño.
 * Es decorativo para el lector de pantalla (los productos están en los
 * catálogos): las tarjetas no reciben foco con el teclado.
 */
export default function CarruselHero({
  productos,
  progreso,
  quieto = false,
}: {
  productos: ProductoHero[];
  progreso?: MotionValue<number>;
  quieto?: boolean;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const banda = useRef<HTMLDivElement>(null);
  const disco = useRef<HTMLDivElement>(null);
  const tarjetas = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const iso = caja.current?.parentElement;
    if (!iso || !banda.current || productos.length === 0) return;
    const n = productos.length;
    let m = medidas(document.documentElement.clientWidth, iso.getBoundingClientRect().height);
    // Arranca con el cuarto escondido detrás del isotipo: tres a cada lado (como el diseño).
    let lugar = 3; // qué tarjeta está detrás del isotipo
    let avance = 0; // de 0 a 1 mientras corre un lugar
    let reloj = 0;
    let moviendo = false;
    let frenado = false;
    let visible = true;
    let cuadro = 0;
    let antes = performance.now();

    const medir = () => {
      m = medidas(document.documentElement.clientWidth, iso.getBoundingClientRect().height);
      if (disco.current) {
        disco.current.style.width = disco.current.style.height = `${m.radioDisco * 2}px`;
      }
    };

    const dibujar = () => {
      const ancho = m.ancho; // se mide al cambiar el tamaño, no en cada cuadro
      const largo = n * m.paso;
      // Al bajar, la fila se abre y se va en el primer 3 % del scroll, antes de
      // que el isotipo empiece a moverse y crecer (si no, por el hueco del aro
      // se veía la tarjeta de atrás). El círculo crema queda siempre opaco: no
      // se ve (es del color del fondo) y tapa lo que pasa por detrás.
      const abrir = progreso ? tramo(progreso.get(), 0, 0.03) : 0;
      if (banda.current) banda.current.style.opacity = String(1 - abrir);
      if (abrir >= 1) return; // ya no se ve: no hay nada que mover
      const desplazamiento = (lugar + suave(avance)) * m.paso;
      tarjetas.current.forEach((t, i) => {
        if (!t) return;
        // Posición en el recorrido, centrada en el isotipo y dando la vuelta fuera de la pantalla.
        let u = (((i * m.paso - desplazamiento) % largo) + largo) % largo;
        if (u >= largo / 2) u -= largo;
        const d = Math.abs(u);
        const lejos = d;
        // Mismo tamaño en toda la fila; detrás del isotipo baja hasta un 70 %
        // (así las puntas de la tarjeta no asoman por los costados del aro).
        const escala = 0.7 + 0.3 * tramo(lejos, 0, m.pegada) ** 1.2;
        // La que está detrás del isotipo también sale (hacia la derecha).
        const x = (u < 0 ? -1 : 1) * (lejos + abrir * ancho * 0.6);
        const mitad = (m.lado / 2) * escala;
        t.style.transform = `translate3d(${x}px, 0, 0)`;
        const marco = t.firstElementChild as HTMLElement | null;
        const etiqueta = t.lastElementChild as HTMLElement | null;
        if (marco) marco.style.transform = `translate(-50%, -50%) scale(${escala})`;
        if (etiqueta && etiqueta !== marco) {
          etiqueta.style.transform = `translate(-50%, ${mitad + 10}px)`;
          // El nombre no asoma por debajo del isotipo.
          etiqueta.style.opacity = String(tramo(lejos, m.radioDisco + mitad * 0.6, m.pegada));
        }
      });
    };

    const paso = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - antes) / 1000);
      antes = ahora;
      // Mientras se baja por el hero, el carrusel no avanza (vuelve a andar arriba de todo).
      const bajando = !!progreso && progreso.get() > 0.001;
      if (!moviendo) {
        // Con el mouse encima no arranca el próximo paso (el que está en curso termina).
        if (!frenado && !bajando) reloj += dt;
        if (reloj >= PAUSA) {
          moviendo = true;
          reloj = 0;
        }
      } else {
        reloj += dt;
        avance = Math.min(1, reloj / VIAJE);
        if (avance >= 1) {
          lugar = (lugar + 1) % n;
          avance = 0;
          moviendo = false;
          reloj = 0;
        }
      }
      dibujar();
      cuadro = visible && !quieto ? requestAnimationFrame(paso) : 0;
    };

    medir();
    dibujar();
    banda.current.dataset.listo = "true";

    const alEntrar = () => (frenado = true);
    const alSalir = () => (frenado = false);
    const lista = tarjetas.current.filter((t): t is HTMLAnchorElement => !!t);
    for (const t of lista) {
      t.addEventListener("pointerenter", alEntrar);
      t.addEventListener("pointerleave", alSalir);
    }
    const ro = new ResizeObserver(() => {
      medir();
      dibujar();
    });
    ro.observe(iso);
    ro.observe(document.documentElement);
    // Solo se mueve mientras se ve (y con el scroll del hero, aunque esté quieto).
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !cuadro && !quieto) {
        antes = performance.now();
        cuadro = requestAnimationFrame(paso);
      }
    });
    io.observe(iso);
    const sinScroll = progreso?.on("change", () => !cuadro && dibujar());
    return () => {
      cancelAnimationFrame(cuadro);
      for (const t of lista) {
        t.removeEventListener("pointerenter", alEntrar);
        t.removeEventListener("pointerleave", alSalir);
      }
      ro.disconnect();
      io.disconnect();
      sinScroll?.();
    };
  }, [productos, progreso, quieto]);

  return (
    <div ref={caja} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Las tarjetas: una fila a la altura del centro del aro, de borde a borde
          (la máscara esfuma los costados). Solo las tarjetas reciben el mouse. */}
      <div
        ref={banda}
        className="absolute left-1/2 h-[22rem] w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 data-[listo=true]:opacity-100 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]"
        style={{ top: `${ARO_CENTRO_Y * 100}%` }}
      >
        {productos.map((p, i) => (
          <a
            key={p.codigo}
            ref={(el) => {
              tarjetas.current[i] = el;
            }}
            href={p.url}
            tabIndex={-1}
            className="group pointer-events-auto absolute top-1/2 left-1/2 block"
          >
            <span className="absolute top-0 left-0 grid size-[5.25rem] place-items-center overflow-hidden rounded-2xl bg-white shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado sm:size-[7.5rem] sm:rounded-[1.25rem] lg:size-[9.375rem]">
              <Image src={p.src} alt="" width={480} height={480} unoptimized className="size-full object-contain p-[10%]" />
            </span>
            <span className="absolute top-0 left-0 hidden w-36 flex-col items-center gap-1.5 text-center sm:flex">
              <span className="rounded-full bg-ow-yellow px-2 py-1 font-display text-[0.625rem] leading-none font-bold tracking-[0.14em] whitespace-nowrap tabular-nums">
                {p.codigo}
              </span>
              <span className="font-display text-xs leading-tight font-bold text-balance">{p.nombre}</span>
            </span>
          </a>
        ))}
      </div>
      {/* Detrás del isotipo (que va arriba, sin tocar): el crema del fondo tapa las tarjetas que pasan. */}
      <div
        ref={disco}
        className="absolute left-1/2 size-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ow-paper"
        style={{ top: `${ARO_CENTRO_Y * 100}%` }}
      />
    </div>
  );
}
