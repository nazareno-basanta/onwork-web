"use client";

/**
 * Menú del celular a pantalla completa. Comportamiento tomado de React Bits ·
 * Staggered Menu (https://reactbits.dev): dos capas entran desde la derecha,
 * una amarilla y la tinta encima, y los links aparecen en cascada.
 * Reescrito con motion. Sin numeración de ítems (DESIGN.md: sin números que no
 * informan). Sobre tinta va el wordmark blanco, nunca el isotipo.
 *
 * Accesibilidad: aria-expanded, cierre con Escape, foco atrapado en el panel
 * y devuelto al botón al cerrar. Con menos movimiento, aparece sin animación.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV, SITE } from "@/lib/site";
import Icon from "./Icon";
import WhatsAppLink from "./WhatsAppLink";
import { esActivo } from "./NavDesktop";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MobileNav() {
  const pathname = usePathname();
  // Se guarda la página donde se abrió: al navegar a otra, queda cerrado solo.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const open = abiertoEn === pathname;
  const setOpen = (valor: boolean) => setAbiertoEn(valor ? pathname : null);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Frena el scroll de la página y atrapa el foco mientras está abierto.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("ow:scroll-lock", { detail: open }));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbiertoEn(null);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const cerrar = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const capa = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { x: 0 }, exit: { opacity: 0 } }
      : {
          initial: { x: "100%" },
          animate: { x: 0, transition: { duration: 0.6, ease: EASE, delay } },
          exit: { x: "100%", transition: { duration: 0.4, ease: EASE, delay: 0.1 - delay / 2 } },
        };

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        onClick={() => setOpen(true)}
        className="flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2.5 rounded-full border-2 border-ow-black font-display text-sm font-bold sm:px-4"
      >
        {/* En el teléfono no entra junto a la lupa y el presupuesto: queda el
            círculo con las dos rayas (la palabra la sigue leyendo el lector de pantalla). */}
        <span className="sr-only sm:not-sr-only">Menú</span>
        <span aria-hidden className="flex w-5 flex-col gap-1.5">
          <span className="h-0.5 w-full bg-ow-black" />
          <span className="h-0.5 w-3/4 self-end bg-ow-black" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60]" id="menu-movil">
            <motion.div aria-hidden className="absolute inset-0 bg-ow-yellow" {...capa(0)} />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              data-lenis-prevent
              className="absolute inset-0 flex flex-col overflow-y-auto bg-ow-black px-5 pt-4 pb-8 text-white md:px-8"
              {...capa(0.08)}
            >
              <div className="flex h-12 items-center justify-between">
                <Image
                  src="/brand/wordmark-onwork-blanco.svg"
                  alt="On Work"
                  width={698}
                  height={111}
                  className="h-6 w-auto"
                />
                <button
                  type="button"
                  onClick={cerrar}
                  className="flex min-h-11 items-center gap-2 rounded-full border-2 border-white px-4 font-display text-sm font-bold"
                >
                  Cerrar
                  <Icon name="cerrar" size={18} />
                </button>
              </div>

              <nav aria-label="Principal" className="mt-12 flex-1">
                <ul className="space-y-1">
                  {NAV.map((item, i) => {
                    const activo = esActivo(pathname, item.href);
                    return (
                      <li key={item.href} className="overflow-hidden">
                        <motion.div
                          initial={reduce ? false : { y: "110%" }}
                          animate={{ y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.25 + i * 0.06 } }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={activo ? "page" : undefined}
                            className="flex items-center gap-3 py-2 font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-tight font-extrabold tracking-tight"
                          >
                            {item.label}
                            {activo && (
                              <span aria-hidden className="size-3 rounded-full bg-ow-yellow" />
                            )}
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-10 space-y-6 border-t border-white/20 pt-8">
                <WhatsAppLink tone="yellow" className="w-full">
                  Escribinos por WhatsApp
                </WhatsAppLink>
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2 font-bold text-white"
                  >
                    <Icon name="instagram" size={18} />
                    {SITE.instagramUsuario}
                  </a>
                  <p>{SITE.ubicacion}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
