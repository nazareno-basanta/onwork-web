import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { SITE } from "@/lib/site";
import Icon from "./Icon";
import JsonLd from "./JsonLd";

export type Miga = { label: string; href: string };

/**
 * Ruta de la página ("Inicio › Catálogos › Drinkware") y sus datos
 * estructurados BreadcrumbList para Google. La última miga es la página actual.
 */
export default function Breadcrumb({ items }: { items: Miga[] }) {
  const todas = [{ label: "Inicio", href: "/" }, ...items];
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      item: `${SITE.url}${m.href === "/" ? "" : m.href}`,
    })),
  };

  return (
    <nav aria-label="Ruta" className="text-sm font-semibold text-ow-gray">
      <ol className="flex flex-wrap items-center gap-1.5">
        {todas.map((m, i) => {
          const ultima = i === todas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-1.5">
              {ultima ? (
                <span aria-current="page" className="text-ow-black">
                  {m.label}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="rounded-sm underline-offset-4 hover:text-ow-black hover:underline">
                    {m.label}
                  </Link>
                  <Icon name="flecha-derecha" size={14} />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd datos={jsonLd} />
    </nav>
  );
}
