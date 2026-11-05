/**
 * "Dar en el blanco": al sumar un producto al presupuesto, una copia chica de
 * su foto vuela en arco hasta el número del presupuesto en el header. Al
 * llegar, el número salta y deja una onda (como el signo del logo que cae
 * sobre la diana). Es la animación protagonista de los catálogos: una sola,
 * con transform y opacity, un elemento por vez.
 *
 * Con menos movimiento no hay vuelo: el número cambia y el aviso confirma.
 * Marcas en el HTML: data-vuelo-origen (el marco de la foto: la tarjeta o la
 * galería) y data-vuelo-destino (el número del contador).
 */

let enCurso: Promise<void> = Promise.resolve();

/** El contador espera a que llegue la foto antes de saltar (si no hay vuelo, salta enseguida). */
export const esperarVuelo = () => enCurso;

const DURACION = 650;
const menosMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const espera = (ms: number) => new Promise<void>((listo) => setTimeout(listo, ms));
// Dos cuadros (o 100 ms, si el navegador los frena porque la pestaña no está a la vista).
const dosCuadros = () =>
  Promise.race([new Promise<void>((listo) => requestAnimationFrame(() => requestAnimationFrame(() => listo()))), espera(100)]);

function aLaVista(el: Element) {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

/** El marco de la foto del producto desde el que sale el vuelo. */
export function origenDelVuelo(boton: HTMLElement) {
  return (
    boton.closest("article")?.querySelector<HTMLElement>("[data-vuelo-origen]") ??
    document.querySelector<HTMLElement>("[data-vuelo-origen]")
  );
}

export function volarAlPresupuesto(desde: HTMLElement | null) {
  if (!desde || document.hidden || menosMovimiento() || typeof desde.animate !== "function" || !aLaVista(desde)) return;
  const marco = desde.getBoundingClientRect();
  // En la galería, la foto que se está viendo (la que arranca donde arranca el marco).
  const fotos = [...desde.querySelectorAll("img")];
  const foto = fotos.find((i) => Math.abs(i.getBoundingClientRect().left - marco.left) < 4) ?? fotos[0];
  if (!foto) return;

  const vuelo = (async () => {
    // En el celular, el número aparece recién cuando ya hay un producto: se espera a que esté.
    await dosCuadros();
    const destino = [...document.querySelectorAll<HTMLElement>("[data-vuelo-destino]")].find(aLaVista);
    if (!destino) return;

    const a = desde.getBoundingClientRect();
    const b = destino.getBoundingClientRect();
    const lado = Math.min(a.width, a.height);
    const x = a.left + (a.width - lado) / 2;
    const y = a.top + (a.height - lado) / 2;

    const clon = document.createElement("div");
    clon.setAttribute("aria-hidden", "true");
    Object.assign(clon.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${lado}px`,
      height: `${lado}px`,
      zIndex: "60",
      pointerEvents: "none",
      overflow: "hidden",
      borderRadius: "24px",
      background: "#ffffff",
      boxShadow: "0 10px 30px -12px rgb(35 31 32 / 0.35)",
      willChange: "transform, opacity",
    });
    const copia = document.createElement("img");
    copia.src = foto.currentSrc || foto.src;
    copia.alt = "";
    Object.assign(copia.style, { width: "100%", height: "100%", objectFit: "contain", padding: "9%" });
    clon.append(copia);
    document.body.append(clon);

    const dx = b.left + b.width / 2 - (x + lado / 2);
    const dy = b.top + b.height / 2 - (y + lado / 2);
    const escala = Math.max(b.width, 20) / lado;
    // El arco sube un poco por encima del camino recto, sin salirse de la pantalla.
    const centroY = y + lado / 2;
    const arco = Math.max(0, Math.min(140, Math.abs(dx) * 0.25 + 50, centroY + dy / 2 - 24));

    const animacion = clon.animate(
      [
        { transform: "translate(0, 0) scale(1)", borderRadius: "24px", opacity: 1 },
        {
          transform: `translate(${dx / 2}px, ${dy / 2 - arco}px) scale(${Math.max(escala, 0.32)})`,
          borderRadius: "40%",
          opacity: 1,
          offset: 0.5,
        },
        { transform: `translate(${dx}px, ${dy}px) scale(${escala})`, borderRadius: "50%", opacity: 0.25 },
      ],
      { duration: DURACION, easing: "cubic-bezier(0.55, 0, 0.35, 1)" },
    );
    // Si el navegador frena la animación (pestaña en segundo plano), la copia se borra igual.
    await Promise.race([animacion.finished.catch(() => {}), espera(DURACION + 400)]);
    clon.remove();
  })();
  // El contador nunca espera de más, aunque el navegador frene la animación.
  enCurso = Promise.race([vuelo, espera(DURACION + 400)]);
}
