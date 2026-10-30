"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV } from "@/lib/site";
import WhatsAppLink from "./WhatsAppLink";

/** Menú desplegable para celulares (en pantallas grandes no se muestra). */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border-2 border-ow-black"
      >
        <span aria-hidden className="relative block h-3 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-ow-black transition-all duration-300 ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-ow-black transition-all duration-300 ${
              open ? "top-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        id="menu-movil"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-ow-black/10 bg-white px-5 pb-8 pt-4"
      >
        <nav aria-label="Principal móvil" className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-ow-black/10 py-4 font-display text-2xl font-extrabold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppLink tone="yellow" className="mt-6 w-full">
          Escribinos por WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
