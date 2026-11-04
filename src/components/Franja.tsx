import { FRANJA_CATALOGOS } from "@/data/inicio";
import { textoWeb } from "@/lib/utils";
import { Trio } from "./Formas";

/** Franja de los catálogos: "Consultanos por cantidades, plazos…". */
export default function Franja({ texto = FRANJA_CATALOGOS }: { texto?: string }) {
  return (
    <div className="bg-ow-paper-soft">
      <div className="container-ow flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:gap-8 md:py-12">
        <Trio className="h-8 w-auto shrink-0" />
        <p className="font-display text-lg font-bold md:text-xl">{textoWeb(texto)}</p>
      </div>
    </div>
  );
}
