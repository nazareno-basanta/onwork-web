'use client';

/**
 * Cursor diana. Origen: React Bits · Target Cursor (variante TS + Tailwind,
 * https://reactbits.dev, licencia MIT + Commons Clause).
 *
 * Adaptado a On Work:
 * - Punto central en amarillo y esquinas en tinta; sobre fondos tinta
 *   (cualquier contenedor con data-cursor-tone="claro") las esquinas van en blanco.
 * - Sin mix-blend-mode: sobre crema daba colores raros.
 * - No reemplaza el cursor de texto en campos (input, textarea, select).
 * - Solo con mouse: en pantallas táctiles no se monta. Con menos movimiento,
 *   no gira.
 * Los elementos con la clase "cursor-target" quedan encuadrados por las
 * esquinas; con data-cursor-label="Ver PDF" muestran una etiqueta.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Spring = { x: number; v: number };

const CORNER_ANGLES = [0, 90, 180, 270];
const QUARTER = Math.PI / 2;
const TINTA = '#231f20';
const BLANCO = '#ffffff';
const CAMPOS = 'input, textarea, select, [contenteditable="true"]';

const SETTINGS = {
  targetSelector: '.cursor-target',
  spinDuration: 3,
  hoverDuration: 0.2,
  parallaxOn: true,
  size: 34,
  cornerSize: 11,
  thickness: 2.5,
  padding: 6,
  dotSize: 7
};

const spring = (state: Spring, goal: number, stiffness: number, damping: number, dt: number) => {
  const steps = 2;
  const h = dt / steps;
  for (let i = 0; i < steps; i++) {
    state.v += (stiffness * (goal - state.x) - damping * state.v) * h;
    state.x += state.v * h;
  }
};

const TargetCursor = () => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHost(finePointer.matches ? document.body : null);
    update();
    finePointer.addEventListener('change', update);
    return () => finePointer.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!host || !root) return undefined;

    const s = SETTINGS;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = document.createElement('style');
    document.head.appendChild(style);

    const pointer = { x: 0, y: 0, inside: false, seen: false, pressed: false, overField: false };
    const centerX = { x: 0, v: 0 };
    const centerY = { x: 0, v: 0 };
    const halfW = { x: 0, v: 0 };
    const halfH = { x: 0, v: 0 };
    const radius = { x: 0, v: 0 };
    const turn = { x: 0, v: 0 };
    const lock = { x: 0, v: 0 };
    const press = { x: 0, v: 0 };
    const presence = { x: 0, v: 0 };
    let target: Element | null = null;
    let targetRadius = 0;
    let quarter = 0;
    let spinSpeed = 0;
    let raf = 0;
    let last = 0;
    let lastLabel = '';
    let lastColor = '';

    // Oculta la flecha del sistema, salvo en los campos de texto.
    const hideCursor = () => {
      const rule = pointer.inside
        ? `html, html *:not(${CAMPOS}) { cursor: none !important; }`
        : '';
      if (style.textContent !== rule) style.textContent = rule;
    };

    const findTarget = (x: number, y: number, element?: Element | null): Element | null => {
      const node = element || document.elementFromPoint(x, y);
      return node?.closest(s.targetSelector) || null;
    };

    const lockOn = (next: Element | null) => {
      if (next === target) return;
      target = next;
      if (target) {
        quarter = Math.round(turn.x / QUARTER);
        targetRadius = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
        spinSpeed = 0;
      }
    };

    const setTone = (element: Element | null) => {
      const color = element?.closest('[data-cursor-tone="claro"]') ? BLANCO : TINTA;
      if (color !== lastColor) {
        root.style.setProperty('--target-cursor-color', color);
        lastColor = color;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      if (target && !target.isConnected) lockOn(null);
      const rect = target ? target.getBoundingClientRect() : null;
      const locked = !!rect && pointer.inside;
      const snapW = 4.6 / s.hoverDuration;
      const snapK = snapW * snapW;
      const snapC = 2 * 0.62 * snapW;

      spring(presence, pointer.inside && !pointer.overField ? 1 : 0, 260, 32, dt);
      spring(lock, locked ? 1 : 0, snapK, 2 * snapW, dt);
      spring(press, pointer.pressed ? 1 : 0, 900, 40, dt);

      let goalX = pointer.x;
      let goalY = pointer.y;
      let goalW = s.size / 2;
      let goalH = s.size / 2;
      let goalR = Math.min(2, s.cornerSize / 4);
      if (locked) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const lean = s.parallaxOn ? 0.08 : 0;
        goalX = cx + (pointer.x - cx) * lean;
        goalY = cy + (pointer.y - cy) * lean;
        const odd = Math.abs(quarter) % 2 === 1;
        const w = rect.width / 2 + s.padding;
        const h = rect.height / 2 + s.padding;
        goalW = odd ? h : w;
        goalH = odd ? w : h;
        goalR = Math.min(targetRadius + s.padding, s.cornerSize);
      }

      if (!pointer.inside && presence.x < 0.01) pointer.seen = false;
      if (!pointer.seen) {
        centerX.x = goalX;
        centerY.x = goalY;
        halfW.x = goalW;
        halfH.x = goalH;
        pointer.seen = pointer.inside;
      }

      const follow = locked ? snapK : 2200;
      const followC = locked ? snapC : 2 * Math.sqrt(2200);
      spring(centerX, goalX, follow, followC, dt);
      spring(centerY, goalY, follow, followC, dt);
      spring(halfW, goalW, snapK, snapC, dt);
      spring(halfH, goalH, snapK, snapC, dt);
      spring(radius, goalR, snapK, 2 * snapW, dt);

      if (locked) {
        spring(turn, quarter * QUARTER, snapK, snapC, dt);
      } else {
        const speed = s.spinDuration > 0 && !reduce ? (Math.PI * 2) / s.spinDuration : 0;
        spinSpeed += (speed - spinSpeed) * (1 - Math.exp(-dt * 3));
        turn.v = spinSpeed;
        turn.x += spinSpeed * dt;
      }

      const squeeze = 1 - press.x * 0.14;
      const cos = Math.cos(turn.x);
      const sin = Math.sin(turn.x);
      const w = Math.max(0, halfW.x) * squeeze;
      const h = Math.max(0, halfH.x) * squeeze;
      const local = [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h]
      ];
      const r = Math.max(0, Math.min(radius.x, s.cornerSize));
      const degrees = (turn.x * 180) / Math.PI;
      let left = Infinity;
      let top = Infinity;
      cornerRefs.current.forEach((corner, i) => {
        if (!corner) return;
        const [lx, ly] = local[i];
        const x = centerX.x + lx * cos - ly * sin;
        const y = centerY.x + lx * sin + ly * cos;
        left = Math.min(left, x);
        top = Math.min(top, y);
        corner.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(CORNER_ANGLES[i] + degrees).toFixed(2)}deg)`;
        corner.style.width = `${s.cornerSize}px`;
        corner.style.height = `${s.cornerSize}px`;
        corner.style.borderWidth = `${s.thickness}px 0 0 ${s.thickness}px`;
        corner.style.borderTopLeftRadius = `${r.toFixed(2)}px`;
      });

      const dot = dotRef.current;
      if (dot) {
        const dotScale = 1 - press.x * 0.35;
        dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
        dot.style.width = `${s.dotSize}px`;
        dot.style.height = `${s.dotSize}px`;
      }

      const label = labelRef.current;
      if (label) {
        const text = target ? target.getAttribute('data-cursor-label') || '' : '';
        if (text && text !== lastLabel) label.textContent = text;
        if (text) lastLabel = text;
        const shown = text ? Math.max(0, Math.min(1, lock.x)) : 0;
        label.style.transform = `translate3d(${left.toFixed(2)}px, ${(top - 8).toFixed(2)}px, 0) translateY(-100%) translateY(${((1 - shown) * 4).toFixed(2)}px)`;
        label.style.opacity = shown.toFixed(3);
      }

      root.style.opacity = Math.max(0, Math.min(1, presence.x)).toFixed(3);

      const resting =
        !pointer.inside &&
        presence.x < 0.002 &&
        Math.abs(presence.v) < 0.002 &&
        Math.abs(lock.x) < 0.002 &&
        Math.abs(press.x) < 0.002;
      const spinning = pointer.inside && !locked && spinSpeed > 0.0001;
      const moving =
        Math.abs(centerX.v) + Math.abs(centerY.v) + Math.abs(halfW.v) + Math.abs(halfH.v) + Math.abs(turn.v) > 0.01 ||
        Math.abs(goalX - centerX.x) + Math.abs(goalY - centerY.x) > 0.05 ||
        Math.abs(lock.v) + Math.abs(press.v) + Math.abs(presence.v) > 0.001;
      if (!resting && (spinning || moving || locked)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const element = event.target as Element | null;
      if (!pointer.inside) {
        pointer.inside = true;
        hideCursor();
      }
      pointer.overField = !!element?.closest?.(CAMPOS);
      setTone(element);
      lockOn(findTarget(pointer.x, pointer.y, element));
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      pointer.pressed = true;
      wake();
    };

    const onPointerUp = () => {
      pointer.pressed = false;
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.pressed = false;
      lockOn(null);
      hideCursor();
      wake();
    };

    const onScroll = () => {
      if (!pointer.inside) return;
      const element = document.elementFromPoint(pointer.x, pointer.y);
      setTone(element);
      lockOn(findTarget(pointer.x, pointer.y, element));
      wake();
    };

    setTone(null);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      style.remove();
    };
  }, [host]);

  if (!host) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[2147483647]"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {CORNER_ANGLES.map((angle, i) => (
        <span
          key={angle}
          ref={element => {
            cornerRefs.current[i] = element;
          }}
          className="absolute top-0 left-0 box-border origin-top-left border-solid [border-color:var(--target-cursor-color)] will-change-transform"
        />
      ))}
      <span
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-ow-yellow will-change-transform"
      />
      <span
        ref={labelRef}
        className="absolute top-0 left-0 rounded-full bg-ow-black px-2.5 py-1 font-display text-xs leading-none font-bold whitespace-nowrap text-white opacity-0 will-change-[transform,opacity]"
      />
    </div>,
    host
  );
};

export default TargetCursor;
