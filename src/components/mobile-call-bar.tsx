"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Feste Anrufleiste am unteren Rand, nur auf schmalen Viewports.
 *
 * Werkstattkunden kommen überwiegend vom Handy und wollen anrufen. Ohne diese
 * Leiste wäre die Nummer mobil entweder hinter dem Burger-Menü oder erst nach
 * rund 80 % Scrollstrecke erreichbar.
 *
 * Sie erscheint erst, wenn der Hero durchgescrollt ist — dort steht bereits ein
 * großer Anruf-Button, den sie sonst verdoppeln würde.
 */
export function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // w-screen statt inset-x-0: ein fixed-Element mit inset-x-0 spannt sich
    // sonst über die Scrollbreite des Dokuments statt über den Viewport.
    <div
      className={`fixed bottom-0 left-0 z-30 w-screen max-w-full border-t border-line bg-background/95 backdrop-blur-md transition-transform duration-500 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Auf iPhones nicht unter den Home-Indicator rutschen
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      {/* minmax(0,1fr) statt 1fr: sonst erzwingt der längere Button seine
          Mindestbreite und die Leiste wird breiter als der Viewport. */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-px bg-line">
        <a
          href={site.phoneHref}
          tabIndex={visible ? undefined : -1}
          className="flex min-h-14 items-center justify-center gap-2 bg-amber-bright px-2 text-sm font-medium text-[#16171a]"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Anrufen
        </a>
        <Link
          href="/#kontakt"
          tabIndex={visible ? undefined : -1}
          className="flex min-h-14 items-center justify-center bg-background px-2 text-center text-sm font-medium text-foreground"
        >
          Termin anfragen
        </Link>
      </div>
    </div>
  );
}
