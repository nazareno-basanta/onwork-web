import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavDesktop from "./NavDesktop";
import WhatsAppLink from "./WhatsAppLink";
import ContadorPresupuesto from "./presupuesto/ContadorPresupuesto";

/**
 * Encabezado fijo: crema sólido (sin desenfoque), wordmark "ON WORK!" a la
 * izquierda en colores originales (más de 64 px de ancho), menú en pastilla
 * en escritorio y menú a pantalla completa en el celular. El acceso al
 * presupuesto va al lado de "Escribinos" (escritorio) o de "Menú" (celular).
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ow-black/10 bg-ow-paper">
      <div className="container-ow flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="On Work, ir al inicio"
          className="flex min-h-11 shrink-0 items-center rounded-md"
        >
          <Image
            src="/brand/wordmark-onwork.svg"
            alt="On Work"
            width={698}
            height={111}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <NavDesktop />

        <div className="hidden items-center gap-2 lg:flex">
          <ContadorPresupuesto variante="escritorio" />
          <WhatsAppLink tone="black" className="!px-5">
            Escribinos
          </WhatsAppLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ContadorPresupuesto variante="celular" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
