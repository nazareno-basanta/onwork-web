import Link from "next/link";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import { DESDE_1990 } from "@/data/inicio";
import { sinViuda } from "@/lib/utils";

/** "Una empresa familiar, desde 1990." con link a Nosotros. */
export default function Desde1990() {
  return (
    <section aria-labelledby="desde-1990" className="py-24 md:py-32">
      <div className="container-ow grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <Titular id="desde-1990" className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {DESDE_1990.titulo}
        </Titular>
        <div>
          <p className="text-lg text-ow-black/80">{sinViuda(DESDE_1990.texto)}</p>
          <Link
            href="/nosotros"
            className="cursor-target mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm font-display font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
          >
            {DESDE_1990.link}
            <Icon name="flecha-derecha" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
