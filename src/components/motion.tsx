"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + leichtes Hochgleiten, sobald das Element in den Viewport kommt. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.75,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "section" | "li" | "header";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      // Bei reduzierter Bewegung sofort im Endzustand rendern statt gar nicht
      // zu animieren — sonst bliebe der Inhalt unsichtbar.
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0 } : { duration, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Container, der seine <StaggerItem>-Kinder nacheinander einblendet. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? { duration: 0 } : { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * Vertikaler Parallax für ein <Image fill>: das Kind wird beim Scrollen
 * gegenläufig verschoben. Das Bild muss größer als der Rahmen sein
 * (scale-110), sonst entstehen Ränder.
 */
export function Parallax({
  children,
  className,
  strength = 9,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduce, strength] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * true erst, nachdem die Komponente im Browser gelaufen ist; auf dem Server
 * und beim ersten Hydrations-Durchlauf false. Ohne setState im Effect, damit
 * kein zusätzlicher Renderdurchlauf entsteht.
 */
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // im Browser
    () => false, // auf dem Server
  );
}

/**
 * Bild-Reveal: Das Bild wird beim Eintreten über clip-path freigelegt und
 * fährt dabei aus leichter Überzeichnung in die Ruhelage. Ruhiger als ein
 * reines Fade, ohne Effekthascherei.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // Der verdeckte Startzustand darf NICHT ins serverseitig gerenderte HTML.
  // Sonst steht clip-path: inset(100%) schon im ausgelieferten Markup, und
  // falls die Animation nicht greift — kein JS, fehlgeschlagene Hydration,
  // langsames Netz — bleibt das Bild dauerhaft unsichtbar und next/image
  // lädt es nicht einmal. Erst nach dem Mount im Browser wird verdeckt
  // gestartet; bis dahin ist der sichtbare Endzustand die Vorgabe.
  const mounted = useHydrated();
  const animate = !reduce && mounted;

  return (
    <motion.div
      // Die Anfangsskalierung vergrößert das Element kurzzeitig. Ohne
      // overflow-clip ragt es dabei über den Viewport hinaus und erzeugt auf
      // schmalen Breiten eine horizontale Scrollbar.
      className={`overflow-clip ${className ?? ""}`}
      initial={
        animate
          ? { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 }
          : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
      }
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      // Sehr kleiner Schwellenwert und KEIN negativer margin.
      //
      // Hintergrund: Ist das Element höher als der beobachtete Bereich, kann
      // ein hoher Anteil nie erreicht werden — und ein negativer unterer
      // margin verkleinert diesen Bereich zusätzlich. Dann feuert whileInView
      // nie, clipPath bleibt auf inset(100%) stehen, das Element ist unsichtbar
      // und next/image lädt das Bild nicht einmal. Genau das passierte zwischen
      // 845 px und 1023 px, wo die zweispaltige Sektion noch untereinander
      // steht und die Bildspalte entsprechend hoch wird.
      //
      // 0.05 feuert, sobald ein Bruchteil sichtbar ist, und ist damit auch bei
      // sehr hohen Elementen sicher erreichbar.
      viewport={{ once: true, amount: 0.05 }}
      transition={animate ? { duration: 1.15, ease: EASE, delay } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

export { motion, useReducedMotion };
