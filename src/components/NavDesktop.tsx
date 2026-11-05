"use client";

/**
 * Menú de escritorio en pastilla. Comportamiento tomado de React Bits ·
 * Pill Nav (https://reactbits.dev): al pasar el mouse, un círculo amarillo
 * sube desde abajo y rellena el link. El link activo lleva el punto amarillo.
 * Reescrito en CSS (sin GSAP) para que sea liviano y respete los tokens.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function esActivo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavDesktop() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border-2 border-ow-black bg-ow-paper p-1">
        {NAV.map((item) => {
          const activo = esActivo(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={activo ? "page" : undefined}
                className="group relative isolate flex min-h-10 items-center overflow-hidden rounded-full px-3 font-display xl:px-4 text-sm font-bold text-ow-black"
              >
                {/* Círculo que sube y rellena */}
                <span
                  aria-hidden
                  className="absolute top-full left-1/2 -z-10 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-ow-yellow transition-transform duration-500 ease-ow group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
                  style={{ transformOrigin: "50% 50%" }}
                />
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ow-yellow transition-opacity duration-300 group-hover:opacity-0",
                    activo ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
