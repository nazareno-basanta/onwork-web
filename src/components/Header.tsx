import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavDesktop from "./NavDesktop";
import WhatsAppLink from "./WhatsAppLink";

/**
 * Encabezado fijo: crema sólido (sin desenfoque), logo con bajada a la
 * izquierda en colores originales (más de 120 px de ancho), menú en pastilla
 * en escritorio y menú a pantalla completa en el celular.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ow-black/10 bg-ow-paper">
      <div className="container-ow flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="On Work, ir al inicio"
          className="cursor-target shrink-0 rounded-md"
        >
          <Image
            src="/brand/logo-onwork-recortado.svg"
            alt="On Work, comunicación y merchandising"
            width={698}
            height={171}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <NavDesktop />

        <div className="hidden lg:block">
          <WhatsAppLink tone="black" className="!px-5">
            Escribinos
          </WhatsAppLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
