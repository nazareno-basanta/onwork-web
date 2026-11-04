/**
 * El presupuesto (el "carrito" sin precios): qué productos, en qué color y
 * cuántos. Vive en el navegador de la persona, en localStorage con una clave
 * versionada. Si el navegador no deja guardar (navegación privada), funciona
 * igual en memoria mientras la página esté abierta.
 *
 * Este archivo no usa React: las operaciones son funciones puras (se prueban
 * en presupuesto.test.ts) y el estado se lee con el hook usePresupuesto.
 */

/** Una línea del presupuesto. color "" quiere decir "A definir". */
export type LineaPresupuesto = { codigo: string; color: string; cantidad: number };

export type EstadoPresupuesto = {
  /** false hasta leer lo guardado (en el servidor, siempre false). */
  listo: boolean;
  lineas: LineaPresupuesto[];
  /** "¿Buscás algo que no está en los catálogos?" */
  otro: string;
  /** Ya se mandó por WhatsApp y no cambió nada desde entonces. */
  enviado: boolean;
  /** Productos guardados que se descartaron al cargar porque ya no están en la web. */
  descartados: number;
};

export const CLAVE = "onwork-presupuesto-v1";
/** Dónde arranca el selector al sumar un producto (no es un mínimo). */
export const CANTIDAD_INICIAL = 1;
export const CANTIDAD_MAXIMA = 99999;

const VACIO: EstadoPresupuesto = { listo: false, lineas: [], otro: "", enviado: false, descartados: 0 };

// ------------------------------------------------------- operaciones puras

const esLinea = (codigo: string, color: string) => (l: LineaPresupuesto) =>
  l.codigo === codigo && l.color === color;

/** Una cantidad válida: entera, de 1 a 99.999. */
export function normalizarCantidad(n: number) {
  if (!Number.isFinite(n)) return CANTIDAD_INICIAL;
  return Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.round(n)));
}

/** Suma un producto. Si ya está en ese color, se suman las cantidades. */
export function sumar(lineas: LineaPresupuesto[], codigo: string, color = "", cantidad = CANTIDAD_INICIAL) {
  const existe = lineas.find(esLinea(codigo, color));
  if (existe) {
    return lineas.map((l) => (l === existe ? { ...l, cantidad: normalizarCantidad(l.cantidad + cantidad) } : l));
  }
  return [...lineas, { codigo, color, cantidad: normalizarCantidad(cantidad) }];
}

export function cambiarCantidad(lineas: LineaPresupuesto[], codigo: string, color: string, cantidad: number) {
  return lineas.map((l) => (esLinea(codigo, color)(l) ? { ...l, cantidad: normalizarCantidad(cantidad) } : l));
}

/** Cambia el color de una línea. Si ese color ya estaba, las dos líneas se unen. */
export function cambiarColor(lineas: LineaPresupuesto[], codigo: string, color: string, nuevo: string) {
  if (color === nuevo) return lineas;
  const linea = lineas.find(esLinea(codigo, color));
  if (!linea) return lineas;
  const destino = lineas.find(esLinea(codigo, nuevo));
  if (destino) {
    return lineas
      .filter((l) => l !== linea)
      .map((l) => (l === destino ? { ...l, cantidad: normalizarCantidad(l.cantidad + linea.cantidad) } : l));
  }
  return lineas.map((l) => (l === linea ? { ...l, color: nuevo } : l));
}

export function quitar(lineas: LineaPresupuesto[], codigo: string, color: string) {
  return lineas.filter((l) => !esLinea(codigo, color)(l));
}

/** Descarta las líneas de productos que ya no están en la web. */
export function depurar(lineas: LineaPresupuesto[], validos: ReadonlySet<string>) {
  return lineas.filter((l) => validos.has(l.codigo));
}

/** Lee lo guardado sin confiar en el formato: si algo no cierra, se descarta. */
type Guardado = Pick<EstadoPresupuesto, "lineas" | "otro" | "enviado">;

export function leerGuardado(texto: string | null): Guardado {
  try {
    const datos = JSON.parse(texto ?? "null");
    const lineas = Array.isArray(datos?.lineas)
      ? datos.lineas
          .filter((l: unknown): l is LineaPresupuesto => {
            const x = l as LineaPresupuesto;
            return typeof x?.codigo === "string" && typeof x.color === "string" && typeof x.cantidad === "number";
          })
          .map((l: LineaPresupuesto) => ({ codigo: l.codigo, color: l.color, cantidad: normalizarCantidad(l.cantidad) }))
      : [];
    return { lineas, otro: typeof datos?.otro === "string" ? datos.otro : "", enviado: datos?.enviado === true };
  } catch {
    return { lineas: [], otro: "", enviado: false };
  }
}

// ------------------------------------------------------------------ estado

let estado = VACIO;
let validos: ReadonlySet<string> | null = null;
const oyentes = new Set<() => void>();
const alSumarOyentes = new Set<(sumado: { codigo: string; nombre: string }) => void>();

function leerDelNavegador(): Guardado {
  try {
    return leerGuardado(window.localStorage.getItem(CLAVE));
  } catch {
    return { lineas: [], otro: "", enviado: false };
  }
}

function iniciar() {
  if (estado.listo || typeof window === "undefined") return;
  const guardado = leerDelNavegador();
  const lineas = validos ? depurar(guardado.lineas, validos) : guardado.lineas;
  estado = { listo: true, ...guardado, lineas, descartados: guardado.lineas.length - lineas.length };
  // Si se cambia en otra pestaña, se actualiza acá también.
  window.addEventListener("storage", (e) => {
    if (e.key !== CLAVE) return;
    estado = { ...estado, listo: true, ...leerDelNavegador() };
    oyentes.forEach((f) => f());
  });
}

function actualizar(cambio: Partial<EstadoPresupuesto>) {
  iniciar();
  // Si cambia la lista o el "Otro", ya no es lo que se mandó.
  const cambiaLoEnviado = "lineas" in cambio || "otro" in cambio;
  estado = { ...estado, ...(cambiaLoEnviado && { enviado: false }), ...cambio };
  try {
    window.localStorage.setItem(
      CLAVE,
      JSON.stringify({ v: 1, lineas: estado.lineas, otro: estado.otro, enviado: estado.enviado }),
    );
  } catch {
    // Sin localStorage (navegación privada, bloqueado): sigue en memoria.
  }
  oyentes.forEach((f) => f());
}

export const presupuesto = {
  suscribir(oyente: () => void) {
    iniciar();
    oyentes.add(oyente);
    return () => {
      oyentes.delete(oyente);
    };
  },
  leer: () => {
    iniciar();
    return estado;
  },
  leerEnServidor: () => VACIO,

  /**
   * Suma un producto. Con aviso (el nombre del producto), aparece el aviso
   * "Sumaste … al presupuesto" y el contador del header da un salto.
   */
  sumar(codigo: string, color = "", { aviso }: { aviso?: string } = {}) {
    actualizar({ lineas: sumar(estado.lineas, codigo, color) });
    if (aviso) alSumarOyentes.forEach((f) => f({ codigo, nombre: aviso }));
  },
  cambiarCantidad: (codigo: string, color: string, cantidad: number) =>
    actualizar({ lineas: cambiarCantidad(estado.lineas, codigo, color, cantidad) }),
  cambiarColor: (codigo: string, color: string, nuevo: string) =>
    actualizar({ lineas: cambiarColor(estado.lineas, codigo, color, nuevo) }),
  quitar: (codigo: string, color: string) => actualizar({ lineas: quitar(estado.lineas, codigo, color) }),
  cambiarOtro: (otro: string) => actualizar({ otro }),
  vaciar: () => actualizar({ lineas: [], otro: "" }),
  /** Se tocó "Enviar presupuesto por WhatsApp". */
  marcarEnviado: () => actualizar({ enviado: true }),

  /** Los códigos de los productos que están en la web; los demás se descartan. */
  configurarValidos(codigos: string[]) {
    validos = new Set(codigos);
    if (!estado.listo) return; // se depura al leer lo guardado
    const depuradas = depurar(estado.lineas, validos);
    if (depuradas.length !== estado.lineas.length) {
      actualizar({ lineas: depuradas, descartados: estado.descartados + estado.lineas.length - depuradas.length });
    }
  },

  /** Avisa cada vez que se suma un producto desde su tarjeta o su página. */
  alSumar(oyente: (sumado: { codigo: string; nombre: string }) => void) {
    alSumarOyentes.add(oyente);
    return () => {
      alSumarOyentes.delete(oyente);
    };
  },
};
