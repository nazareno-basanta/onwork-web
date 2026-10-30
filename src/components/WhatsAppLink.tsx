import type { ReactNode } from "react";
import { whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";
import { btn, type BtnTone } from "@/lib/ui";

type Props = {
  children: ReactNode;
  /** Mensaje que aparece escrito al abrir WhatsApp. */
  message?: string;
  tone?: BtnTone;
  className?: string;
};

/** Botón que abre WhatsApp con un mensaje listo para enviar. */
export default function WhatsAppLink({
  children,
  message = MENSAJE_GENERAL,
  tone = "yellow",
  className = "",
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btn[tone]} ${className}`}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}
