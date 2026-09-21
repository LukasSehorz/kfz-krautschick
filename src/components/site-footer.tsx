import Link from "next/link";
import { site, nav } from "@/lib/site";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="on-dark">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Logo className="h-auto w-[15rem] max-w-full text-foreground" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Freie inhabergeführte Kfz-Werkstatt für alle gängigen Marken in{" "}
            {site.city}.
          </p>
          <div className="mt-7 h-px w-12 bg-amber" />
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-5 text-[0.65rem] uppercase tracking-[0.3em] text-foreground">
            Navigation
          </h2>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="text-muted transition-colors hover:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="mb-5 text-[0.65rem] uppercase tracking-[0.3em] text-foreground">
            Kontakt
          </h2>
          <address className="space-y-3 text-sm not-italic text-muted">
            <div>
              {site.legalName}
              <br />
              {site.street}
              <br />
              {site.postalCode}&nbsp;{site.city}
            </div>
            <div className="space-y-1.5 pt-1">
              <div>
                <a
                  href={site.phoneHref}
                  className="tabular-nums transition-colors hover:text-amber"
                >
                  Tel.&nbsp;{site.phone}
                </a>
              </div>
              <div>
                <a
                  href={site.mobileHref}
                  className="tabular-nums transition-colors hover:text-amber"
                >
                  Mobil&nbsp;{site.mobile}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-amber"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        {/* Unterer Innenabstand hält die Rechtslinks über der fixen
            Anrufleiste frei — sonst wären Impressum und Datenschutz am
            untersten Scrollpunkt mobil dauerhaft verdeckt. */}
        <div className="container-page flex flex-col gap-4 py-6 pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <div>
            © {new Date().getFullYear()} {site.legalName}
          </div>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-amber">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-amber">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
