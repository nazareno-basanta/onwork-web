import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/lib/site";
import WhatsAppLink from "./WhatsAppLink";

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-ow-black text-white">
      <div className="container-ow grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-onwork-blanco.svg"
            alt="On Work, comunicación y merchandising"
            width={715}
            height={255}
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm text-white/70">
            Asesoramos y conseguimos lo que tu marca necesita: merchandising,
            indumentaria, cartelería, tarjetería y mucho más.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="eyebrow text-ow-yellow">Sitio</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ow-yellow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-ow-yellow">Contacto</p>
          <p className="mt-5 text-white/70">
            Contanos qué necesitás y te respondemos por WhatsApp.
          </p>
          <WhatsAppLink tone="yellow" className="mt-5">
            Escribinos
          </WhatsAppLink>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-ow py-6 text-sm text-white/50">
          © On Work — Buenos Aires, Argentina
        </p>
      </div>
    </footer>
  );
}
