"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Das Hintergrundbild zieht beim Scrollen langsam nach — der Text läuft
  // schneller weg. Ein ruhiger Tiefeneffekt, kein Zirkus.
  useGSAP(
    () => {
      if (reduce || !imageWrap.current) return;
      gsap.to(imageWrap.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduce] },
  );

  // Bei reduzierter Bewegung wird NICHT animiert, aber der Endzustand muss
  // trotzdem gesetzt sein — sonst bliebe der Text auf opacity: 0 stehen und
  // wäre für genau die Nutzer unsichtbar, die die Rücksicht brauchen.
  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      ref={root}
      className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Bild – bewusst etwas größer als der Rahmen, damit der Parallax
          keine Kante freilegt. */}
      <div ref={imageWrap} className="absolute inset-0 -z-10 h-[118%] -top-[9%]">
        <Image
          src="/images/hero-werkstatt.webp"
          alt="Werkstatthalle bei Dämmerung: ein Fahrzeug auf der Hebebühne, geöffnetes Rolltor mit Blick auf die Felder"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] sm:object-center"
        />
      </div>

      {/* Abdunklung: unten stark für die Typo, oben leicht für den Header */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d0e10]/75 via-[#0d0e10]/35 to-[#0d0e10]/92"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0e10]/70 via-transparent to-transparent"
      />

      <div className="container-page pb-16 pt-32 sm:pb-20 md:pb-24">
        <motion.span {...rise(0.1)} className="eyebrow">
          {site.city}
        </motion.span>

        <motion.h1
          {...rise(0.2)}
          className="mt-7 max-w-4xl text-[clamp(2.4rem,8.5vw,5.75rem)] text-white"
        >
          Ihre Werkstatt für{" "}
          <span className="italic text-amber">alle&nbsp;Marken</span> – geführt vom
          Meister&nbsp;selbst.
        </motion.h1>

        <motion.p
          {...rise(0.32)}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Freie, inhabergeführte Kfz-Werkstatt in {site.city}. Inspektion mit
          HU/AU-Vorbereitung, Reparatur und Diagnose – dazu Oldtimer und
          Youngtimer.
        </motion.p>

        <motion.div
          {...rise(0.44)}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={site.phoneHref}
            className="group inline-flex min-h-13 items-center justify-center gap-3 bg-amber-bright px-7 py-4 text-sm font-medium text-[#16171a] transition-colors duration-500 hover:bg-white"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="tabular-nums">{site.phone}</span>
          </a>
          <Link
            href="#kontakt"
            className="inline-flex min-h-13 items-center justify-center border border-white/30 px-7 py-4 text-sm text-white transition-colors duration-500 hover:border-white hover:bg-white/10"
          >
            Termin anfragen
          </Link>
        </motion.div>

        <motion.div
          {...rise(0.56)}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-7 text-xs uppercase tracking-[0.2em] text-white/60"
        >
          <span>Kfz-Meisterbetrieb</span>
          <span aria-hidden className="h-3 w-px bg-white/20" />
          <span>Alle gängigen Marken</span>
          <span aria-hidden className="h-3 w-px bg-white/20" />
          <span>Oldtimer &amp; Youngtimer</span>
        </motion.div>
      </div>

      <motion.a
        {...rise(0.7)}
        href="#werkstatt"
        aria-label="Weiter zum Inhalt"
        className="absolute bottom-7 right-6 hidden h-11 w-11 place-items-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-white hover:text-white md:grid"
      >
        <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden />
      </motion.a>
    </section>
  );
}
