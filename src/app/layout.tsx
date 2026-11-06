import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { organizacion, sitioWeb } from "@/lib/datosEstructurados";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Medicion from "@/components/Medicion";
import AvisoPresupuesto from "@/components/presupuesto/AvisoPresupuesto";
import BarraPresupuesto from "@/components/presupuesto/BarraPresupuesto";
import PresupuestoInicio from "@/components/presupuesto/PresupuestoInicio";
import { PRODUCTOS } from "@/data/productos";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Tipografías de marca, servidas desde el propio sitio (next/font): sin pedidos
// a Google al abrir la página y con una fuente de reemplazo ajustada a la misma
// medida, así el titular no se mueve cuando termina de cargar.
// Montserrat (titulares y textos) se precarga; Nunito es acompañamiento puntual.
const montserrat = Montserrat({
  subsets: ["latin"],
  // La itálica es para el juego de pesos del titular del Inicio ("se use").
  style: ["normal", "italic"],
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

// Google Analytics 4: se carga solo si está el ID (NEXT_PUBLIC_GA_ID en Vercel,
// ver .env.example). Sin ID, la web no carga nada de Google.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        {/* Presupuesto: códigos válidos, aviso al sumar y barra del celular. */}
        <PresupuestoInicio codigos={PRODUCTOS.map((p) => p.codigo)} />
        <AvisoPresupuesto />
        <BarraPresupuesto />
        {/* Datos estructurados: le explican a Google qué es On Work. */}
        <JsonLd datos={organizacion} />
        <JsonLd datos={sitioWeb} />
        {GA_ID && <Medicion />}
        {/* Visitas y Core Web Vitals reales, desde Vercel (sin cookies). */}
        <Analytics />
        <SpeedInsights />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
