"use client";

import dynamic from "next/dynamic";

// El cursor se carga aparte y solo en el navegador: no suma peso a la
// primera carga ni se dibuja en el servidor.
const TargetCursor = dynamic(() => import("./ui/TargetCursor"), { ssr: false });

export default function CursorDiana() {
  return <TargetCursor />;
}
