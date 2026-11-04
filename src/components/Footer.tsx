import Image from "next/image";
import Link from "next/link";
import { CATALOGOS } from "@/data/catalogos";
import { NAV, SITE, whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";
import Icon from "./Icon";

// Los mismos links del menú principal, sin Inicio ni Catálogos (que tiene su columna).
const ON_WORK = NAV.filter((item) => item.href !== "/" && item.href !== "/catalogos");

const link = "inline-flex min-h-11 items-center rounded-sm transition-colors duration-300 hover:text-ow-yellow";

/** Pie de todas las páginas: wordmark blanco sobre tinta (nunca el isotipo). */
export default function Footer() {
  return (
    <footer className="bg-ow-black text-white">
      <div className="container-ow grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr] lg:py-20">
        <div>
          <Link href="/" aria-label="On Work, ir al inicio" className="inline-flex min-h-11 items-center rounded-sm">
            <Image
              src="/brand/wordmark-onwork-blanco.svg"
              alt="On Work"
              width={698}
              height={111}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <nav aria-labelledby="pie-catalogos">
          <h2 id="pie-catalogos" className="font-display text-sm font-bold text-white/60">
            Catálogos
          </h2>
          <ul className="mt-2">
            {CATALOGOS.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogos/${c.slug}`} className={link}>
                  {c.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="pie-onwork">
          <h2 id="pie-onwork" className="font-display text-sm font-bold text-white/60">
            On Work
          </h2>
          <ul className="mt-2">
            {ON_WORK.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold text-white/60">Contacto</h2>
          <ul className="mt-2">
            <li>
              <a
                href={whatsappUrl(MENSAJE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} gap-2`}
              >
                <Icon name="whatsapp" size={18} />
                WhatsApp {SITE.whatsappVisible}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`${link} gap-2`}>
                <Icon name="instagram" size={18} />
                {SITE.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="container-ow py-6 text-sm text-white/70">
          {SITE.ubicacion} · Desde 1990
        </p>
      </div>
    </footer>
  );
}
