import type { MouseEventHandler, ReactNode } from "react";
import { whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";
import { btn, type BtnTone } from "@/lib/ui";
import Icon from "./Icon";
import Magnetic from "./ui/Magnetic";

type Props = {
  children: ReactNode;
  /** Mensaje que aparece escrito al abrir WhatsApp. */
  message?: string;
  tone?: BtnTone;
  className?: string;
  /** Botón principal de un cierre: se acerca un poco al cursor (imán). */
  magnetic?: boolean;
  /** Para medir un evento propio (ej. enviar_presupuesto). */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Ocupa todo el ancho disponible. */
  bloque?: boolean;
};

/** Botón que abre WhatsApp con un mensaje listo para enviar. */
export default function WhatsAppLink({
  children,
  message = MENSAJE_GENERAL,
  tone = "yellow",
  className = "",
  magnetic = false,
  onClick,
  bloque = false,
}: Props) {
  const link = (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${btn[tone]} ${bloque ? "w-full" : ""} ${className}`}
    >
      <Icon name="whatsapp" size={18} />
      {children}
    </a>
  );

  return magnetic ? <Magnetic className={bloque ? "block" : "inline-block"}>{link}</Magnetic> : link;
}
