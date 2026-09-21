import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Truck } from "lucide-react";
import { Hero } from "@/components/hero";
import { ServicesScroll } from "@/components/services-scroll";
import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { MapEmbed } from "@/components/map-embed";
import { Reveal, Stagger, StaggerItem, ClipReveal, Parallax } from "@/components/motion";
import { site, phoneE164 } from "@/lib/site";
import { rarityServices, steps, reasons } from "@/lib/services";

/** Strukturierte Daten — ausschließlich mit den verifizierten Angaben. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#werkstatt`,
    name: site.name,
    legalName: site.legalName,
    description:
      "Freie inhabergeführte Kfz-Werkstatt für alle gängigen Marken in Neuburg-Joshofen. Inspektion, HU/AU-Vorbereitung, Bremsen, Ölwechsel, Reifen, Diagnose, Glasservice, Reparatur und Raritätenfahrzeuge.",
    url: site.url,
    telephone: phoneE164,
    email: site.email,
    founder: { "@type": "Person", name: site.owner },
    image: `${site.url}/images/werkstatt-aussen.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    // Öffnungszeiten sind bewusst NICHT angegeben — sie sind nicht belegt.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: [
        "Inspektion",
        "HU/AU-Service",
        "Bremsenservice",
        "Ölwechsel",
        "Reifenservice",
        "Diagnostik",
        "Glasservice",
        "Reparatur",
        "Raritätenfahrzeuge",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />

      {/* ── INHABER / WERKSTATT ─────────────────────────────────────── */}
      <section id="werkstatt" className="scroll-mt-24 py-24 md:py-32">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <ClipReveal className="min-w-0 lg:col-span-5">
            {/* Der versetzte Rahmen ragt bewusst über das Bild hinaus. Damit er
                auf schmalen Viewports keine horizontale Scrollbar erzeugt,
                bekommt der Wrapper rechts/unten den nötigen Platz. */}
            <div className="relative pb-5 pr-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
                <Image
                  src="/images/inhaber-haende.webp"
                  alt="Hände mit Ratsche bei der Arbeit am geöffneten Motorraum eines Fahrzeugs"
                  fill
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 top-5 w-[calc(100%-1.25rem)] border border-amber/40"
              />
            </div>
          </ClipReveal>

          <div className="lg:col-span-7">
            <Stagger>
              <StaggerItem>
                <span className="eyebrow">Der Inhaber</span>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mt-6 max-w-xl text-[clamp(2rem,5vw,3.5rem)]">
                  Kfz-Meister – mit Erfahrung aus der Fahrzeugentwicklung.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  Die meisten Werkstätten kennen das Auto von der Reparaturseite.
                  Andreas Krautschick kennt es zusätzlich von der anderen Seite: aus
                  der Entwicklung, dort, wo entschieden wird, warum ein Bauteil so
                  konstruiert ist, wie es ist. Dieses Wissen hilft genau dann, wenn
                  das Diagnosegerät nur einen Fehlercode zeigt und die eigentliche
                  Ursache woanders liegt.
                </p>
              </StaggerItem>

              <StaggerItem>
                <blockquote className="mt-12 border-l-2 border-amber pl-7">
                  <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                    „Qualität und die damit verbundene Zufriedenheit ist mir sehr
                    wichtig. Durch meine langjährige Erfahrung als Kfz-Meister und
                    durch meine Ingenieurtätigkeit in der Fahrzeugentwicklung ist der
                    Anspruch für eine hochwertige Ausführung meiner Arbeiten sehr
                    ausgeprägt. Fahrzeuge im Allgemeinen und dieser Betrieb sind
                    meine Leidenschaft.&ldquo;
                  </p>
                  <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-muted">
                    {site.owner}
                    <span className="mx-3 text-amber">–</span>
                    Inhaber
                  </footer>
                </blockquote>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── LEISTUNGEN (horizontaler Scroll auf Desktop) ────────────── */}
      <section id="leistungen" className="scroll-mt-24 border-t border-line bg-concrete">
        <ServicesScroll />
      </section>

      {/* ── WARUM ZU MIR ───────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden py-24 md:py-32">
        <div aria-hidden className="hairline-grid absolute inset-0 -z-10" />
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Warum zu mir</span>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] text-foreground">
              Vier Gründe, die nichts kosten – und viel ausmachen.
            </h2>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {reasons.map((r, i) => (
              <StaggerItem as="li" key={r.title}>
                <div className="font-serif text-sm tabular-nums text-amber">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 h-px w-full bg-line" />
                <h3 className="mt-5 font-serif text-xl text-foreground">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── RARITÄTEN / OLDTIMER ───────────────────────────────────── */}
      <section id="raritaeten" className="scroll-mt-24">
        {/* Großes, ruhiges Bild mit Parallax als Auftakt */}
        <div className="relative h-[55svh] min-h-[340px] overflow-hidden md:h-[70svh]">
          <Parallax className="absolute inset-0 h-[120%] -top-[10%]" strength={7}>
            <div className="relative h-full w-full">
              <Image
                src="/images/oldtimer.webp"
                alt="Roter Klassiker, teilweise zerlegt, in einer Werkstattbucht mit einfallendem Tageslicht"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Parallax>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#16171a] via-[#16171a]/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container-page pb-10 md:pb-14">
              <Reveal>
                <span className="eyebrow">Raritätenfahrzeuge</span>
                <h2 className="mt-5 max-w-3xl text-[clamp(2rem,6vw,4rem)] text-white">
                  Oldtimer und Youngtimer brauchen Zeit. Die bekommen sie hier.
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="on-dark py-20 md:py-28">
          <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Teile sind selten, Substanz ist unersetzlich, und vieles steht in
                keinem Reparaturleitfaden. Genau deshalb betreue ich
                Raritätenfahrzeuge mit dem Anspruch, so viel Original wie möglich zu
                erhalten.
              </p>
              <div className="mt-8 flex items-start gap-4 border border-line p-5">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden />
                <p className="text-sm leading-relaxed text-muted">
                  Sie müssen Ihren Klassiker nicht selbst herfahren –{" "}
                  <span className="text-foreground">auch nicht angemeldet</span>.
                  Wie das geht, steht unter Punkt&nbsp;05.
                </p>
              </div>
            </Reveal>

            <Stagger as="dl" className="lg:col-span-8" stagger={0.09}>
              {rarityServices.map((r, i) => (
                <StaggerItem
                  key={r.title}
                  className={`grid gap-x-8 gap-y-2 border-t border-line py-7 sm:grid-cols-12 ${
                    i === rarityServices.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="flex items-baseline gap-4 sm:col-span-5">
                    <span className="font-serif text-sm tabular-nums text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-xl text-foreground sm:text-2xl">
                      {r.title}
                    </span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted sm:col-span-7">
                    {r.text}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── EU-NEUWAGEN ────────────────────────────────────────────── */}
      <section id="eu-neuwagen" className="scroll-mt-24 border-t border-line py-24 md:py-32">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">EU-Neuwagen</span>
              <h2 className="mt-6 max-w-lg text-[clamp(2rem,5vw,3.5rem)]">
                Neues Fahrzeug? Fragen Sie mich, bevor Sie unterschreiben.
              </h2>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                Über EU-Neuwagen mit Tageszulassung lassen sich oft sehr gute
                Konditionen erzielen. Sagen Sie mir, welches Fahrzeug Sie suchen und
                wie es ausgestattet sein soll – Sie bekommen von mir ein passendes
                Angebot.
              </p>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
                Die Wartung Ihres neuen Fahrzeugs übernehme ich anschließend
                selbst – nach Herstellervorgaben und nachvollziehbar dokumentiert.
              </p>
              <a
                href={site.phoneHref}
                className="link-underline group mt-10 inline-flex min-h-11 items-center text-sm uppercase tracking-[0.2em]"
              >
                Anfrage per Telefon
                <ArrowRight
                  className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <ClipReveal className="lg:col-span-6">
            <div className="group relative aspect-[3/2] overflow-hidden bg-concrete">
              <Image
                src="/images/eu-neuwagen.webp"
                alt="Silberner Neuwagen mit teilweise noch aufgebrachter Schutzfolie auf einem Hof vor einer Werkstatt"
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* ── ABLAUF ─────────────────────────────────────────────────── */}
      <section id="ablauf" className="scroll-mt-24 bg-concrete py-24 md:py-32">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">So läuft es ab</span>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)]">
              Fünf Schritte, keine Überraschungen.
            </h2>
          </Reveal>

          <Stagger
            as="ol"
            className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5"
            stagger={0.1}
          >
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-sm tabular-nums text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-5 font-serif text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="border-t border-line py-24 md:py-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">Häufige Fragen</span>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3rem)]">
              Das werde ich oft gefragt.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Ihre Frage ist nicht dabei? Rufen Sie mich einfach an.
            </p>
            <a
              href={site.phoneHref}
              className="link-underline mt-6 inline-flex min-h-11 items-center gap-2 text-sm tabular-nums"
            >
              <Phone className="h-4 w-4 text-amber" aria-hidden />
              {site.phone}
            </a>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* ── KONTAKT ────────────────────────────────────────────────── */}
      <section id="kontakt" className="on-dark scroll-mt-24 py-24 md:py-32">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Kontakt</span>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] text-foreground">
              Vereinbaren Sie Ihren Werkstatt-Termin.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Am schnellsten geht es per Telefon. Wenn Ihnen Schreiben lieber ist,
              nutzen Sie das Formular – ich melde mich zurück.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Kontaktdaten + Karte */}
            <div className="lg:col-span-5">
              <Stagger as="dl" className="space-y-7" stagger={0.08}>
                <StaggerItem>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Telefon
                  </dt>
                  <dd className="mt-2.5 space-y-1">
                    <a
                      href={site.phoneHref}
                      className="link-underline inline-flex min-h-11 items-center gap-3 font-serif text-2xl tabular-nums text-foreground sm:text-3xl"
                    >
                      <Phone className="h-5 w-5 text-amber" aria-hidden />
                      {site.phone}
                    </a>
                    <div>
                      <a
                        href={site.mobileHref}
                        className="link-underline inline-flex min-h-11 items-center text-base tabular-nums text-muted"
                      >
                        Mobil&nbsp;{site.mobile}
                      </a>
                    </div>
                  </dd>
                </StaggerItem>

                <StaggerItem>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    E-Mail
                  </dt>
                  <dd className="mt-2.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline inline-flex min-h-11 items-center gap-3 break-all text-base text-foreground"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-amber" aria-hidden />
                      {site.email}
                    </a>
                  </dd>
                </StaggerItem>

                <StaggerItem>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Adresse
                  </dt>
                  <dd className="mt-2.5 flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden />
                    <address className="text-base not-italic leading-relaxed text-foreground">
                      {site.legalName}
                      <br />
                      {site.street}
                      <br />
                      {site.postalCode}&nbsp;{site.city}
                    </address>
                  </dd>
                </StaggerItem>

                <StaggerItem>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Öffnungszeiten
                  </dt>
                  {/* Platzhalter: Die alte Seite nennt keine Öffnungszeiten.
                      Siehe OFFENE-PUNKTE.md – im Erstgespräch zu klären. */}
                  <dd className="mt-2.5 border border-dashed border-line px-4 py-3 text-sm leading-relaxed text-muted">
                    Termine nach Vereinbarung – rufen Sie mich bitte an.
                    <span className="mt-1.5 block text-xs text-amber">
                      Platzhalter: feste Öffnungszeiten werden ergänzt, sobald sie
                      vorliegen.
                    </span>
                  </dd>
                </StaggerItem>
              </Stagger>

              {/* Karte wird erst nach ausdrücklichem Klick geladen – siehe
                  MapEmbed. Koordinaten kommen aus site.geo. */}
              <Reveal className="mt-10" delay={0.1}>
                <MapEmbed />
              </Reveal>
            </div>

            {/* Formular */}
            <Reveal className="lg:col-span-7" delay={0.12}>
              <div className="border border-line p-6 sm:p-9">
                <h3 className="font-serif text-2xl text-foreground">
                  Anfrage schreiben
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Felder mit <span className="text-amber">*</span> sind erforderlich.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABSCHLUSS-CTA ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/werkstatt-aussen.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#16171a]/85" />
        </div>
        <div className="container-page py-24 text-center md:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.85rem,4.5vw,3.25rem)] text-white">
              Toller Service zu guten Preisen – für jedes Anliegen Ihr Spezialist.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-13 items-center justify-center gap-3 bg-amber-bright px-8 py-4 text-sm font-medium text-[#16171a] transition-colors duration-500 hover:bg-white"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="tabular-nums">{site.phone}</span>
              </a>
              <Link
                href="#kontakt"
                className="inline-flex min-h-13 items-center justify-center border border-white/30 px-8 py-4 text-sm text-white transition-colors duration-500 hover:border-white hover:bg-white/10"
              >
                Nachricht schreiben
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
