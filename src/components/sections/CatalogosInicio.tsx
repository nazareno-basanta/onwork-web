import Link from "next/link";
import TarjetaCatalogo from "@/components/catalogo/TarjetaCatalogo";
import Titular from "@/components/Titular";
import { CATALOGOS } from "@/data/catalogos";
import { CATALOGOS_INICIO } from "@/data/inicio";
import { fotoDeCatalogo } from "@/data/productos";
import { btn } from "@/lib/ui";
import { textoWeb } from "@/lib/utils";

/**
 * La puerta de entrada a los ocho catálogos: cada tarjeta lleva a la página
 * del catálogo (sus productos y el PDF), con la foto de un producto.
 */
export default function CatalogosInicio() {
  return (
    <section aria-labelledby="catalogos-inicio" className="py-24 md:py-32">
      <div className="container-ow">
        <div className="max-w-3xl">
          <Titular id="catalogos-inicio" className="text-[clamp(2.1rem,4.8vw,4rem)]">
            {CATALOGOS_INICIO.titulo}
          </Titular>
          <p className="mt-6 text-lg text-ow-black/80">{textoWeb(CATALOGOS_INICIO.bajada)}</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {CATALOGOS.map((c) => (
            <li key={c.slug}>
              <TarjetaCatalogo catalogo={c} foto={fotoDeCatalogo(c.slug)} />
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <Link href="/catalogos" className={btn.black}>
            {CATALOGOS_INICIO.boton}
          </Link>
        </div>
      </div>
    </section>
  );
}
