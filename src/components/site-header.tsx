"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Auf Unterseiten (Impressum/Datenschutz) gibt es keinen dunklen Hero,
  // über dem der Header schweben könnte — dort ist er immer deckend.
  const solid = scrolled || open || !isHome;

  // Beim Herunterscrollen fährt der Header ein, beim Hochscrollen kommt er
  // zurück. Das verhindert, dass er mehrzeilige Serif-Überschriften anschneidet,
  // und gibt auf schmalen Geräten spürbar Luft. Bei offenem Menü bleibt er.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Kleine Schwelle, damit der Header bei Mikro-Bewegungen nicht flackert
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 220);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, solange das Mobilmenü offen ist.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape schließt das Mobilmenü.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll-Spy: markiert den Navigationspunkt der gerade sichtbaren Sektion.
  useEffect(() => {
    if (!isHome) return;
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <>
      {/* w-screen statt inset-x-0: ein fixed-Element mit inset-x-0 spannt sich
          sonst über die Scrollbreite des Dokuments statt über den Viewport. */}
      <header
        className={`fixed left-0 top-0 z-50 w-screen max-w-full transition-[transform,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "border-b border-line bg-background/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className="container-page flex min-w-0 items-center justify-between gap-4"
          style={{
            paddingBlock: scrolled ? "0.75rem" : "1.25rem",
            transition: "padding 400ms ease",
          }}
        >
          <Link
            href="/"
            className="group -my-2 flex min-w-0 items-center py-2"
            aria-label={`${site.name} – Startseite`}
          >
            <Logo
              compact
              className={`h-9 w-auto transition-colors duration-500 sm:h-10 ${
                solid ? "text-ink" : "text-white"
              }`}
            />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = isHome && active === item.href;
              return (
                <Link
                  key={item.href}
                  href={linkHref(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-2 text-sm transition-colors duration-300 ${
                    solid
                      ? isActive
                        ? "text-ink"
                        : "text-muted hover:text-ink"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-px origin-left bg-amber transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.phoneHref}
              className={`hidden items-center gap-2 text-sm transition-colors duration-300 md:inline-flex ${
                solid ? "text-ink hover:text-amber" : "text-white hover:text-amber"
              }`}
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="font-medium tabular-nums">{site.phone}</span>
            </a>
            <Link
              href={linkHref("#kontakt")}
              className="hidden min-h-11 items-center bg-ink px-5 text-sm font-medium text-background transition-colors duration-500 hover:bg-amber-deep sm:inline-flex"
            >
              Termin anfragen
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-sm transition-colors lg:hidden ${
                solid
                  ? "text-ink hover:bg-ink/5"
                  : "bg-ink/50 text-white ring-1 ring-white/20 backdrop-blur-sm"
              }`}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobilmenü – Geschwister von <header>, damit backdrop-blur des Headers
          nicht zum Containing Block für position: fixed wird. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-background pt-24 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-page flex flex-col pb-16">
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={linkHref(item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-serif text-2xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center gap-3 border border-line px-5 text-ink"
            >
              <Phone className="h-4 w-4 text-amber" aria-hidden />
              <span className="tabular-nums">{site.phone}</span>
            </a>
            <Link
              href={linkHref("#kontakt")}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center bg-ink px-5 text-sm font-medium text-background"
            >
              Termin anfragen
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
