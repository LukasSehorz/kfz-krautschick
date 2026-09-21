import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <article className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container-page max-w-3xl">
        <header className="border-b border-line pb-10">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,4rem)]">{title}</h1>
        </header>

        <div className="mt-12 space-y-12">{children}</div>

        <Link
          href="/"
          className="link-underline group mt-16 inline-flex min-h-11 items-center text-sm uppercase tracking-[0.2em]"
        >
          <ArrowLeft
            className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden
          />
          Zurück zur Startseite
        </Link>
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

/**
 * Sichtbar markierter Platzhalter. Was hier steht, ist noch NICHT
 * rechtsverbindlich befüllt — die offenen Punkte stehen in OFFENE-PUNKTE.md.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="border border-dashed border-amber/60 bg-amber/5 px-4 py-3 text-sm leading-relaxed text-foreground">
      <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.25em] text-amber">
        Noch zu ergänzen
      </span>
      {children}
    </p>
  );
}
