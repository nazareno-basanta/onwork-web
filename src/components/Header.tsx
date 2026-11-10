import Image from "next/image";
import Link from "next/link";
import BotonBuscar from "./BotonBuscar";
import MobileNav from "./MobileNav";
import NavDesktop from "./NavDesktop";
import WhatsAppLink from "./WhatsAppLink";
import ContadorPresupuesto from "./presupuesto/ContadorPresupuesto";

/**
 * Encabezado fijo: crema sólido (sin desenfoque), wordmark "ON WORK!" a la
 * izquierda en colores originales (más de 64 px de ancho), menú en pastilla
 * en escritorio y menú a pantalla completa en el celular. La lupa (buscador
 * de productos) y el acceso al presupuesto van al lado de "Escribinos"
 * (escritorio) o de "Menú" (celular; en el teléfono, los tres son círculos
 * de 44 px para que entren en 375 px). Con más de 4 links en el menú, entre
 * 1024 y 1279 px van la lupa, el presupuesto, "Escribinos" y "Menú" (ver
 * MENU_LARGO en src/lib/site.ts).
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ow-black/10 bg-ow-paper">
      <div className="container-ow flex h-16 items-center justify-between gap-6 lg:gap-4">
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

        <div className="flex items-center gap-2">
          <BotonBuscar />
          <div className="lg:hidden">
            <ContadorPresupuesto variante="celular" />
          </div>
          <div className="max-lg:hidden">
            <ContadorPresupuesto variante="escritorio" />
          </div>
          <WhatsAppLink tone="black" className="max-lg:hidden !px-4 xl:!px-5">
            Escribinos
          </WhatsAppLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
