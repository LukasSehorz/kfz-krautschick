"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { services } from "@/lib/services";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Bild je Leistung. Leistungen ohne eigenes Foto zeigen kein Bild, sondern Typo. */
const images: Record<string, string> = {
  inspektion: "/images/inspektion.webp",
  "hu-au": "/images/inhaber-arbeit.webp",
  bremsen: "/images/bremsen.webp",
  oelwechsel: "/images/oelwechsel.webp",
  reifen: "/images/reifen.webp",
  diagnostik: "/images/diagnose.webp",
  glasservice: "/images/glasservice.webp",
  reparatur: "/images/detail-werkzeug.webp",
  raritaeten: "/images/oldtimer.webp",
};

const alts: Record<string, string> = {
  inspektion: "Blick von unten auf den Unterboden eines Fahrzeugs auf der Hebebühne",
  "hu-au": "Prüfung eines Fahrzeugs bei geöffneter Motorhaube in der Werkstatt",
  bremsen: "Freigelegte Bremsscheibe und Bremssattel bei abgenommenem Rad",
  oelwechsel: "Ölwechsel an einem Motor in der Werkstatt",
  reifen: "Reifenmontiermaschine mit aufgespanntem Rad, dahinter ein Reifenregal",
  diagnostik: "Diagnosegerät am Fahrzeug, angeschlossen an die Diagnosebuchse",
  glasservice: "Arbeit an einer Fahrzeugscheibe in der Werkstatt",
  reparatur: "Werkbank mit Steckschlüsselsatz, Drehmomentschlüssel und Werkzeug",
  raritaeten: "Roter Klassiker teilzerlegt in einer Werkstattbucht",
};

/**
 * Die Leistungen laufen beim Scrollen horizontal durch, während die Sektion
 * gepinnt bleibt.
 *
 * Wichtig: Die Layout-Klassen, die den Horizontalscroll überhaupt erst
 * herstellen (Höhenbegrenzung, Clipping, flex-Reihe), hängen an Tailwinds
 * `motion-safe:` — also an `prefers-reduced-motion: no-preference`, exakt
 * derselben Bedingung wie das GSAP-matchMedia unten. Sonst bliebe bei
 * reduzierter Bewegung das Clipping stehen, während die Animation aussteigt,
 * und ein Teil der Kacheln wäre ohne jeden Scrollmechanismus unerreichbar.
 * Unter lg und bei reduzierter Bewegung greift deshalb immer das Grid.
 */
export function ServicesScroll() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (reduce) return;

      const mm = gsap.matchMedia();

      // Der Pin-Effekt nur ab lg — darunter ist zu wenig Platz und der
      // Horizontalscroll fühlt sich auf Touch-Geräten falsch an.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        const section = root.current;
        if (!el || !section) return;

        const distance = () =>
          Math.max(0, el.scrollWidth - window.innerWidth + 96);

        // Ist die Sektion höher als das Fenster (niedrige Laptops), greift der
        // Pin erst, wenn ihr unteres Ende sichtbar ist — sonst würde der untere
        // Teil übersprungen. Damit die Überschrift dabei nicht oben hinausläuft,
        // ist der Kopfbereich innerhalb der Sektion sticky (siehe Markup).
        const start = () =>
          section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top";

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start,
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(el, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    // min-h-screen statt h-screen: Bei niedrigen Fenstern (z. B. 1440x800)
    // darf die Sektion wachsen, statt Inhalt abzuschneiden. Geclippt wird nur
    // horizontal — vertikal bleibt alles erreichbar.
    <div ref={root} className="motion-safe:lg:min-h-screen motion-safe:lg:overflow-x-clip">
      <div className="flex flex-col justify-center py-20 md:py-28 motion-safe:lg:min-h-screen motion-safe:lg:py-16 motion-safe:xl:py-24">
        <div className="container-page shrink-0">
          <span className="eyebrow">Leistungen</span>
          <div className="mt-6 flex flex-col gap-6 motion-safe:lg:mt-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] text-foreground">
              Neun Leistungen. Eine Werkstatt.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted lg:text-right">
              Von der Inspektion bis zur Restauration, markenübergreifend.
            </p>
          </div>
        </div>

        {/* Horizontale Spur (ab lg, nur bei erlaubter Bewegung) bzw. Grid */}
        <div className="mt-12 motion-safe:lg:mt-10">
          <div
            ref={track}
            className="container-page grid gap-6 sm:grid-cols-2 motion-safe:lg:flex motion-safe:lg:w-max motion-safe:lg:gap-8 motion-safe:lg:pr-24"
          >
            {services.map((s, i) => (
              <article
                key={s.slug}
                className="group relative flex flex-col border-t border-line pt-6 motion-safe:lg:w-[21rem] motion-safe:lg:shrink-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-sm tabular-nums text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
                </div>

                {/* Auf der Spur flacher als im Grid, damit die Kachel auch in
                    ein 800px-Fenster passt (MacBook 13" mit Browserleiste).
                    Erst ab großen Fenstern darf das Bild wieder Luft bekommen. */}
                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-concrete motion-safe:lg:mt-4 motion-safe:lg:aspect-[16/9] motion-safe:2xl:aspect-[3/2]">
                  <Image
                    src={images[s.slug]}
                    alt={alts[s.slug]}
                    fill
                    sizes="(min-width: 1024px) 21rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-foreground/85 motion-safe:lg:mt-4">
                  {s.lead}
                </p>
                {/* Auf der animierten Spur trägt die Lead-Zeile die Aussage —
                    der ausführliche Text wird im Vorbeiziehen ohnehin nicht
                    gelesen und würde die Kachel über die Fensterhöhe treiben.
                    Im Grid (mobil, reduzierte Bewegung) steht er vollständig. */}
                <p className="mt-3 text-sm leading-relaxed text-muted motion-safe:lg:hidden">
                  {s.body}
                </p>

                {/* Im Vorbeiziehen liest niemand Stichpunkte – auf der
                    animierten Spur ausgeblendet, im Grid (mobil und bei
                    reduzierter Bewegung) bleiben sie vollständig lesbar. */}
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm text-muted motion-safe:lg:hidden">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-amber" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Fortschrittsleiste – nur dort, wo tatsächlich horizontal gescrollt
            wird. Ohne Spur wäre sie eine Anzeige ohne Bezug. */}
        <div
          aria-hidden
          className="container-page mt-8 hidden shrink-0 items-center gap-4 motion-safe:lg:flex"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
            Scrollen
          </span>
          <div className="h-px flex-1 bg-line">
            <div
              className="h-px origin-left bg-amber"
              style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
