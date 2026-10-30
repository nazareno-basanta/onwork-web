import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";

// La página de contacto no muestra nada: lleva directo a WhatsApp.
// "noindex" evita que Google la liste como una página vacía.
export const metadata: Metadata = {
  title: "Contacto",
  robots: { index: false, follow: false },
};

export default function ContactoPage() {
  redirect(whatsappUrl(MENSAJE_GENERAL));
}
