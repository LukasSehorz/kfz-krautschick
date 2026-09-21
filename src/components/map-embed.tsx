"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Zwei-Klick-Lösung für die Karte.
 *
 * Die OpenStreetMap-Einbettung überträgt beim Laden die IP-Adresse des
 * Besuchers an die OpenStreetMap Foundation (Vereinigtes Königreich). Das ist
 * eine Drittlandübermittlung und braucht eine Einwilligung — ein reiner
 * Hinweistext genügt dafür nicht. Deshalb wird der iframe erst nach einem
 * ausdrücklichen Klick gesetzt.
 *
 * Nebeneffekt: Wo WebGL fehlt oder abgeschaltet ist, zeigt die Einbettung eine
 * Fehlerbox. Ohne Klick gibt es die gar nicht erst zu sehen.
 *
 * Alle Koordinaten stammen aus `site.geo` — eine einzige Wahrheit für Karte,
 * Außenlink und die strukturierten Daten.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  const { lat, lng } = site.geo;
  // Kartenausschnitt um die Adresse: rund 1,5 km breit.
  const d = 0.01;
  const bbox = `${(lng - d).toFixed(4)},${(lat - d / 2).toFixed(4)},${(lng + d).toFixed(4)},${(lat + d / 2).toFixed(4)}`;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const externalHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-concrete">
        {loaded ? (
          <iframe
            title={`Karte mit dem Standort von ${site.name} in ${site.city}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full grayscale-[0.35] contrast-[1.05]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
            <MapPin className="h-7 w-7 text-amber" aria-hidden />
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-11 items-center border border-line px-5 text-sm text-foreground transition-colors hover:border-amber hover:text-amber"
            >
              Karte laden
            </button>
            <p className="max-w-xs text-xs leading-relaxed text-muted">
              Beim Laden wird eine Verbindung zu OpenStreetMap hergestellt und
              Ihre IP-Adresse dorthin übertragen.
            </p>
          </div>
        )}
      </div>

      <a
        href={externalHref}
        target="_blank"
        rel="noreferrer noopener"
        className="link-underline mt-4 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-muted"
      >
        In OpenStreetMap öffnen
        <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}
