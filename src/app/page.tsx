import type { Metadata } from "next";
import Busquedas from "@/components/sections/Busquedas";
import CatalogosInicio from "@/components/sections/CatalogosInicio";
import Cierre from "@/components/sections/Cierre";
import Clientes from "@/components/sections/Clientes";
import ComoPedir from "@/components/sections/ComoPedir";
import Desde1990 from "@/components/sections/Desde1990";
import Hero from "@/components/sections/Hero";
import PedidosInicio from "@/components/sections/PedidosInicio";
import Preguntas from "@/components/sections/Preguntas";
import QueHacemos from "@/components/sections/QueHacemos";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      {/* Orden de Nachi (12/11/2026): primero cómo se pide y la base de
          catálogos; "Todo lo que gira en torno a tu marca" (que lleva directo
          a WhatsApp) y las búsquedas van después, cuando ya se sabe cómo funciona. */}
      <Hero />
      <Clientes />
      <ComoPedir cortoEnCelular />
      <CatalogosInicio />
      <QueHacemos />
      <Busquedas />
      <PedidosInicio />
      <Desde1990 />
      <Preguntas className="border-t border-ow-black/10" datosEstructurados />
      <Cierre />
    </>
  );
}
