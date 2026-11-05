import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Globo de chat de las maquetas de "Cómo pedir", plano (sin sombra, como en
 * WhatsApp). Los del cliente (mia) van a la derecha en amarillo claro; los de
 * On Work, a la izquierda en blanco, sobre el fondo crema suave del chat. Abajo,
 * la hora y, en los del cliente, el doble tilde de "visto".
 * Sin "use client": lo usan las maquetas del servidor y el mensaje que se escribe.
 */
export default function Burbuja({
  mia = false,
  hora,
  className,
  children,
}: {
  mia?: boolean;
  hora?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex", mia && "justify-end")}>
      <div
        className={cn(
          "max-w-[86%] rounded-2xl px-3.5 pt-2 pb-1.5 text-[0.8125rem] leading-snug",
          mia ? "rounded-br-md bg-ow-yellow/30" : "rounded-bl-md bg-white",
          className,
        )}
      >
        {children}
        {hora && <Hora hora={hora} visto={mia} />}
      </div>
    </div>
  );
}

export function Hora({ hora, visto = false, className }: { hora: string; visto?: boolean; className?: string }) {
  return (
    <span className={cn("mt-1 flex items-center justify-end gap-1 text-[0.6875rem] text-ow-gray tabular-nums", className)}>
      {hora}
      {visto && (
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 5.5l2.8 2.8L9.5 1.7M7.2 7.6l.7.7 5.7-6.6" />
        </svg>
      )}
    </span>
  );
}
