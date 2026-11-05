import type { ReactNode } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { CATALOGOS } from "@/data/catalogos";
import { COMO_PEDIR } from "@/data/inicio";
import { PRESUPUESTO } from "@/data/presupuesto";
import { PRODUCTOS } from "@/data/productos";
import { armarConNivel, type GrupoMensaje } from "@/lib/mensajePresupuesto";
import { cn } from "@/lib/utils";
import Burbuja from "./Burbuja";
import MensajeQueSeEscribe from "./MensajeQueSeEscribe";

/*
 * Maquetas de los pasos de "Cómo pedir", hechas con los colores y la letra de
 * la marca (no son capturas): el presupuesto de la web en el paso 1 y el chat
 * de WhatsApp en los pasos 2 a 5. Los productos son reales (nombre, código,
 * foto y color salen de los catálogos); los mensajes, de COMO_PEDIR.maquetas.
 * Son ilustraciones: van ocultas para el lector de pantalla (el texto de cada
 * paso ya dice lo mismo) y nada se puede tocar.
 */

const M = COMO_PEDIR.maquetas;

/** Los productos del presupuesto de ejemplo, con sus datos de los catálogos. */
function productosDeEjemplo() {
  return M.presupuesto.flatMap((linea) => {
    const p = PRODUCTOS.find((x) => x.codigo === linea.codigo);
    if (!p) return [];
    const foto = p.fotos[p.fotoDeColor?.[linea.color] ?? 0] ?? p.fotos[0];
    const catalogo = CATALOGOS.find((c) => c.slug === p.catalogo)?.titulo ?? p.catalogo;
    return [{ ...linea, nombre: p.nombre, foto, catalogo }];
  });
}

/** "Tu presupuesto." con el punto en amarillo, como los titulares. */
function ConPunto({ children }: { children: string }) {
  const final = /[.?!]$/.test(children) ? children.slice(-1) : "";
  return (
    <>
      {final ? children.slice(0, -1) : children}
      <span className="text-ow-yellow">{final}</span>
    </>
  );
}

/**
 * Pantalla de teléfono: el borde y la "isla" de arriba hacen que se lea como
 * la foto de una pantalla y no como algo para tocar. Adentro, todo plano (sin
 * sombras): los botones de la maqueta no tienen que parecer botones de la web.
 */
function Pantalla({ fondoBarra = "bg-ow-paper", className, children }: { fondoBarra?: string; className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="w-full max-w-[25rem] cursor-default rounded-[2.25rem] bg-white/10 p-2 select-none lg:max-w-[26rem]">
      <div className="@container overflow-hidden rounded-[1.75rem] bg-ow-paper text-ow-black">
        <div className={cn("flex h-8 items-center justify-center", fondoBarra)}>
          <span className="h-[1.125rem] w-[4.5rem] rounded-full bg-ow-black" />
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

function Chat({ children }: { children: ReactNode }) {
  return (
    <Pantalla fondoBarra="bg-white">
      <div className="flex items-center gap-3 border-b-2 border-ow-black/10 bg-white px-4 pt-1 pb-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ow-paper ring-1 ring-ow-black/10">
          <Image src="/brand/isotipo-onwork.svg" alt="" width={190} height={255} unoptimized className="h-6 w-auto" />
        </span>
        <span className="min-w-0 flex-1 truncate font-display text-sm font-bold">{M.chat}</span>
        <Icon name="whatsapp" size={18} className="text-ow-gray" />
      </div>
      <div className="space-y-2 bg-ow-paper-soft px-4 pt-5 pb-6">{children}</div>
    </Pantalla>
  );
}

/** Paso 1: el presupuesto de la web con tres productos. */
function MaquetaPresupuesto() {
  return (
    <Pantalla className="px-5 pt-2 pb-6 sm:px-6">
      <p className="font-display text-xl leading-none font-extrabold tracking-tight">
        <ConPunto>{PRESUPUESTO.h1}</ConPunto>
      </p>
      <ul className="mt-5 divide-y-2 divide-ow-black/10 border-y-2 border-ow-black/10">
        {productosDeEjemplo().map((p) => (
          <li key={p.codigo} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image src={p.foto.src} alt="" fill unoptimized sizes="56px" className="object-contain p-1.5" />
            </span>
            <span className="min-w-[8.5rem] flex-1">
              <span className="inline-block rounded-full whitespace-nowrap bg-ow-yellow px-2 py-1 font-display text-[0.625rem] leading-none font-bold tracking-[0.14em] tabular-nums">
                {p.codigo}
              </span>
              <span className="mt-1 block truncate font-display text-sm font-bold">{p.nombre}</span>
              <span className="block truncate text-xs text-ow-gray">
                {PRESUPUESTO.color}: {p.color}
              </span>
            </span>
            {/* Si no entra al lado (celular), la cantidad pasa abajo del nombre, como en la lista real. */}
            <span className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-ow-black/60 px-2 font-display @max-[22rem]:ml-[4.25rem] text-sm font-bold tabular-nums">
              <Icon name="menos" size={14} />
              <span className="min-w-[3ch] text-center">{p.cantidad}</span>
              <Icon name="mas" size={14} />
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-5 flex min-h-10 items-center justify-center gap-2 rounded-full bg-ow-yellow px-5 font-display text-sm font-bold">
        <Icon name="whatsapp" size={18} />
        <span className="@[22rem]:hidden">{PRESUPUESTO.enviarCorto}</span>
        <span className="hidden @[22rem]:inline">{PRESUPUESTO.enviar}</span>
      </span>
    </Pantalla>
  );
}

/** Paso 2: el mensaje armado por la web (el mismo formato de lib/mensajePresupuesto), con fecha y logo. */
function MaquetaMensaje() {
  const grupos: GrupoMensaje[] = [];
  for (const p of productosDeEjemplo()) {
    const linea = { cantidad: p.cantidad, nombre: p.nombre, codigo: p.codigo, color: p.color };
    const grupo = grupos.find((g) => g.catalogo === p.catalogo);
    if (grupo) grupo.lineas.push(linea);
    else grupos.push({ catalogo: p.catalogo, lineas: [linea] });
  }
  const texto = armarConNivel(grupos, "", 0)
    .replace("Fecha: ", `Fecha: ${M.fecha}`)
    .replace("Comentarios: ", `Comentarios: ${M.comentarios}`)
    // En el globo angosto, que los códigos no se corten en el guion (OW-ESC-|02):
    // un "unidor" invisible después de cada guion.
    .replace(/(OW-[A-Z]{3}-\d+)/g, (codigo) => codigo.replaceAll("-", "-\u2060"));
  return (
    <Chat>
      <MensajeQueSeEscribe texto={texto} hora={M.hora[0]} archivo={M.archivo} />
    </Chat>
  );
}

/** Paso 3: el asesor pregunta para cotizar. */
function MaquetaAsesor() {
  return (
    <Chat>
      {M.asesor.map((m) => (
        <Burbuja key={m} hora={M.hora[1]}>
          {m}
        </Burbuja>
      ))}
      <Burbuja mia hora={M.hora[1]}>
        {M.respuesta}
      </Burbuja>
    </Chat>
  );
}

/**
 * La O de "LOGO AQUÍ" como las de On Work: aro con el punto amarillo. Se
 * dibuja con el grosor y el alto de las letras de al lado (no con las
 * proporciones del logo), para que se lea como una letra más.
 */
function O() {
  return (
    // Medidas de la O de Montserrat ExtraBold: 0,73 em de alto y 0,78 de ancho,
    // trazo de 0,16 em arriba y 0,20 a los costados (el aro toma el promedio).
    <span className="relative mx-[0.02em] inline-block size-[0.75em] translate-y-[0.01em] rounded-full border-[0.18em] border-current">
      <span className="absolute top-1/2 left-1/2 size-[0.22em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ow-yellow" />
    </span>
  );
}

/** Paso 4: la prueba del logo en el Borges (un cuaderno dibujado) y el "¡Aprobado!". */
function MaquetaPrueba() {
  return (
    <Chat>
      <Burbuja hora={M.hora[2]} className="p-1.5 pb-1.5">
        <span className="grid aspect-[4/3] w-60 max-w-full place-items-center rounded-xl bg-ow-paper-soft">
          <span className="relative grid aspect-[3/4] w-[44%] place-items-center overflow-hidden rounded-l-[4px] rounded-r-[10px] bg-ow-black shadow-levantado">
            {/* Lomo y elástico del cuaderno. */}
            <span className="absolute inset-y-0 left-0 w-[8%] bg-white/10" />
            <span className="absolute inset-y-0 right-[15%] w-[5%] bg-white/15" />
            <span className="relative text-center font-display text-[0.95rem] leading-[1.08] font-extrabold tracking-tight text-white">
              <span className="block">
                L<O />G<O />
              </span>
              <span className="block">AQUÍ</span>
            </span>
          </span>
        </span>
        <span className="block px-2 pt-2">{M.prueba}</span>
      </Burbuja>
      <Burbuja mia hora={M.hora[2]}>
        {M.aprobado}
      </Burbuja>
    </Chat>
  );
}

/** Paso 5: el aviso de envío. */
function MaquetaEnvio() {
  return (
    <Chat>
      <Burbuja hora={M.hora[3]}>
        {M.envio}
        <span className="mt-2 flex items-center gap-2 rounded-xl bg-ow-paper px-3 py-2.5 font-display text-xs font-bold">
          {M.envioDesde}
          <Icon name="flecha-derecha" size={14} className="text-ow-gray" />
          {M.envioHasta}
        </span>
      </Burbuja>
      <Burbuja mia hora={M.hora[3]}>
        {M.gracias}
      </Burbuja>
    </Chat>
  );
}

/** Una maqueta por paso, en el orden de COMO_PEDIR.pasos. */
export function maquetasComoPedir(): ReactNode[] {
  return [
    <MaquetaPresupuesto key="presupuesto" />,
    <MaquetaMensaje key="mensaje" />,
    <MaquetaAsesor key="asesor" />,
    <MaquetaPrueba key="prueba" />,
    <MaquetaEnvio key="envio" />,
  ];
}
