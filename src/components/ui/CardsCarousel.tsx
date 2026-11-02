'use client';

/**
 * Carrusel horizontal de tarjetas altas. Origen: Aceternity UI · Apple Cards
 * Carousel (https://ui.aceternity.com, licencia MIT).
 *
 * Adaptado a On Work: sin el modal de la demo (cada tarjeta es un link a la
 * página del pedido), flechas en SVG propio (sin @tabler/icons-react), se
 * desliza con el dedo, con flechas o con el teclado, y sin animación de
 * entrada con menos movimiento.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from '@/components/Icon';

export default function CardsCarousel({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="w-[78%] shrink-0 snap-start sm:w-[22rem] md:w-[24rem]">
            {child}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
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
