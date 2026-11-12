'use client';

/**
 * Carrusel horizontal de tarjetas altas. Origen: Aceternity UI · Apple Cards
 * Carousel (https://ui.aceternity.com, licencia MIT).
 *
 * Adaptado a On Work: sin el modal de la demo (cada tarjeta es un link a la
 * página del pedido), flechas en SVG propio (sin @tabler/icons-react), se
 * desliza con el dedo, con flechas o con el teclado, y sin animación de
 * entrada con menos movimiento.
 *
 * La fila llega hasta los bordes de la pantalla (.carrusel-sangrado en
 * globals.css): la primera tarjeta arranca alineada con el texto, pero las
 * que siguen se pierden en el borde de la pantalla y no en el del contenido,
 * y tiene aire arriba y abajo para que no se corte la sombra (Nachi,
 * 12/11/2026: se cortaban la sombra y la tarjeta).
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from '@/components/Icon';
import { cn } from '@/lib/utils';

export default function CardsCarousel({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pocas = children.length <= 3;
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const check = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const flecha =
    'grid size-12 place-items-center rounded-full border-2 border-ow-black transition-colors duration-300 ease-ow hover:bg-ow-black hover:text-white disabled:pointer-events-none disabled:opacity-30';

  return (
    <div>
      <div
        ref={ref}
        onScroll={check}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent-wheel
        data-pocas={pocas || undefined}
        className="carrusel-sangrado -mt-4 -mb-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pt-4 pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="snap-start">
            {child}
          </div>
        ))}
      </div>
      {/* Las flechas van a la izquierda: a la derecha las tapaba el botón
          flotante de WhatsApp. Con pocas tarjetas, en la compu no hacen falta. */}
      <div className={cn("mt-6 flex justify-start gap-3", pocas && "lg:hidden")}>
        <button type="button" onClick={() => scroll(-1)} disabled={!canLeft} aria-label="Anteriores" className={flecha}>
          <Icon name="flecha-izquierda" size={20} />
        </button>
        <button type="button" onClick={() => scroll(1)} disabled={!canRight} aria-label="Siguientes" className={flecha}>
          <Icon name="flecha-derecha" size={20} />
        </button>
      </div>
    </div>
  );
}
