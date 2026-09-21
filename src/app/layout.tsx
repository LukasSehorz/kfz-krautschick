import type { Metadata } from "next";
// next/font lädt die Schriften zur Build-Zeit herunter und liefert sie von der
// eigenen Domain aus. Es entsteht zur Laufzeit KEINE Verbindung zu Google —
// damit ist die Einbindung DSGVO-konform und zugleich schneller.
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { site } from "@/lib/site";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  // Variable Font: ohne feste weight-Liste, dafür mit den optischen Achsen.
  // "opsz" sorgt dafür, dass große Headlines feinere Serifen bekommen.
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Kfz-Werkstatt in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Freie inhabergeführte Kfz-Werkstatt für alle gängigen Marken in Neuburg-Joshofen: Inspektion, HU/AU-Vorbereitung, Bremsen, Reifen, Diagnose, Reparatur und Betreuung von Oldtimern.",
  applicationName: site.name,
  authors: [{ name: site.owner }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – freie Kfz-Werkstatt in ${site.city}`,
    description:
      "Meisterbetrieb für alle gängigen Marken: Inspektion nach Herstellervorgaben, HU/AU-Vorbereitung, Reparatur, Diagnose und Raritätenfahrzeuge.",
    images: [
      {
        url: "/images/hero-werkstatt.webp",
        width: 1200,
        height: 675,
        alt: "Werkstatthalle mit einem Fahrzeug auf der Hebebühne",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-background"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
