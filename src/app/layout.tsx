import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/nunito";
import "./globals.css";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "On Work | Merchandising personalizado y corporativo en Buenos Aires",
    template: "%s | On Work",
  },
  description:
    "Merchandising personalizado, indumentaria, cartelería y tarjetería para empresas. Asesoramos y conseguimos el producto que tu marca necesita.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: "On Work | Merchandising personalizado y corporativo",
    description:
      "Merchandising, indumentaria, cartelería y tarjetería para empresas. Si lo necesitás, lo conseguimos.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#feb600",
};

// Datos estructurados: le explican a Google qué es On Work.
// (Cuando tengamos dirección y teléfono confirmados, se pueden sumar acá.)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/isotipo-onwork.svg`,
  description:
    "Empresa de comunicación y merchandising de Buenos Aires: merchandising personalizado, indumentaria, cartelería, tarjetería y fotografía de producto.",
  areaServed: "AR",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ow-yellow focus:px-5 focus:py-2 focus:font-bold"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        <Header />
        <main id="contenido" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
