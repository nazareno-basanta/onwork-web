"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXTO =
  "En On Work somos una empresa de comunicación y merchandising de Buenos Aires. Acompañamos a cada cliente de principio a fin: escuchamos lo que necesita, buscamos el producto indicado y lo hacemos realidad con la identidad de su marca.";

/**
 * "Quiénes somos": el texto se va iluminando palabra por palabra
 * a medida que se hace scroll (GSAP ScrollTrigger con scrub).
 */
export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const words = el.querySelectorAll("[data-w]");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        words,
        { opacity: 0.22 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(words, { opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="quienes-somos" className="bg-ow-black py-24 text-white md:py-36">
      <div className="container-ow">
        <p className="eyebrow text-ow-yellow">Quiénes somos</p>
        <p
          ref={ref}
          className="mt-8 max-w-5xl font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-extrabold leading-[1.15] tracking-tight"
        >
          {TEXTO.split(" ").map((palabra, i) => (
            <span key={i} data-w style={{ opacity: 0.22 }} className="inline-block">
              {palabra}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
