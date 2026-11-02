import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/nunito";
import "./globals.css";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Título y descripción del Inicio (../Web OW/04-SEO-Y-REDIRECCIONES.md).
// Las demás páginas definen los suyos y se completan con " | On Work".
const DESCRIPCION =
  "Merchandising, indumentaria, cartelería y tarjetería con tu marca. Desde 1990. Buenos Aires · Envíos a toda la Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Merchandising personalizado en Buenos Aires | On Work",
    template: "%s | On Work",
  },
  description: DESCRIPCION,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: "Merchandising personalizado en Buenos Aires | On Work",
    description: DESCRIPCION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffcef",
};

// Datos estructurados: le explican a Google qué es On Work.
// El logo es un PNG sobre blanco de más de 112 px, como pide Google.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo-onwork-google.png`,
  foundingDate: "1990",
  description:
    "Empresa familiar de comunicación y merchandising de Buenos Aires: merchandising, indumentaria, cartelería y tarjetería.",
  areaServed: "AR",
  address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
  sameAs: [SITE.instagram, "https://www.facebook.com/onworkba"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.whatsappVisible,
    contactType: "sales",
    areaServed: "AR",
    availableLanguage: "es",
  },
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
        <WhatsAppFloat />
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
