import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import Servicios from "@/components/sections/Servicios";
import CatalogosPreview from "@/components/sections/CatalogosPreview";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ClientsMarquee />
      <Servicios />
      <CatalogosPreview />
      <CtaBand />
    </>
  );
}
