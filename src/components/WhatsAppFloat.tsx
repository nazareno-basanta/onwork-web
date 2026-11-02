import { whatsappUrl, MENSAJE_GENERAL } from "@/lib/site";
import Icon from "./Icon";

/**
 * Botón flotante de WhatsApp, fijo abajo a la derecha. Es un link simple a
 * wa.me (sin widget de chat, que pesa y empeora la velocidad).
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(MENSAJE_GENERAL)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full border-2 border-ow-black bg-ow-yellow text-ow-black transition-transform duration-300 ease-ow hover:-translate-y-1 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
