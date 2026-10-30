"use client";

import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type FloatProps = {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  /** Qué tanto se mueve con el mouse (px). Más alto = parece más cerca. */
  depth: number;
  delay: number;
  className: string;
  children: ReactNode;
};

function Float({ sx, sy, depth, delay, className, children }: FloatProps) {
  const reduce = useReducedMotion();
  const x = useTransform(sx, [-1, 1], [-depth, depth]);
  const y = useTransform(sy, [-1, 1], [-depth, depth]);

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      {/* 1) entrada con resorte */}
      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -24, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 13, delay }}
      >
        {/* 2) flotación continua */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{
            duration: 5 + delay * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Composición con las formas de la marca (cuadrado, triángulo, círculo).
 * Entran con resorte, flotan y siguen suavemente al mouse.
 */
export default function HeroShapes() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[32rem] select-none"
    >
      <Float sx={sx} sy={sy} depth={14} delay={0.1} className="left-[4%] top-[6%] w-[44%]">
        <div className="aspect-square w-full bg-ow-yellow" />
      </Float>

      <Float sx={sx} sy={sy} depth={26} delay={0.25} className="bottom-[4%] left-[22%] w-[48%]">
        <svg viewBox="0 0 100 87" className="block w-full">
          <polygon points="50,0 100,87 0,87" fill="var(--ow-black)" />
        </svg>
      </Float>

      <Float sx={sx} sy={sy} depth={20} delay={0.4} className="right-[2%] top-[30%] w-[42%]">
        <div className="aspect-square w-full rounded-full bg-ow-yellow" />
      </Float>

      <Float sx={sx} sy={sy} depth={34} delay={0.55} className="right-[18%] top-[2%] w-[14%]">
        <div className="aspect-square w-full rounded-full border-[10px] border-ow-black" />
      </Float>

      <Float sx={sx} sy={sy} depth={8} delay={0.7} className="bottom-[14%] right-[6%] w-[10%]">
        <svg viewBox="0 0 40 40" className="block w-full">
          <path d="M16 0h8v16h16v8H24v16h-8V24H0v-8h16z" fill="var(--ow-black)" />
        </svg>
      </Float>
    </div>
  );
}
