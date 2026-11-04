import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { organizacion, sitioWeb } from "@/lib/datosEstructurados";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Tipografías de marca, servidas desde el propio sitio (next/font): sin pedidos
// a Google al abrir la página y con una fuente de reemplazo ajustada a la misma
// medida, así el titular no se mueve cuando termina de cargar.
// Montserrat (titulares y textos) se precarga; Nunito es acompañamiento puntual.
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-montserrat",
});
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
  variable: "--font-nunito",
});

// Título y descripción del Inicio (../Web OW/04-SEO-Y-REDIRECCIONES.md).
// Las demás páginas definen los suyos y se completan con " | On Work".
const DESCRIPCION = SITE.descripcion;

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${montserrat.variable} ${nunito.variable} h-full`}>
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
        {/* Datos estructurados: le explican a Google qué es On Work. */}
        <JsonLd datos={organizacion} />
        <JsonLd datos={sitioWeb} />
      </body>
    </html>
  );
}
