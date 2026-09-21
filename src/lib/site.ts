/**
 * Zentrale Stammdaten. Alle Angaben stammen aus INHALTE.md (alte Kundenseite,
 * verifiziert am 21.09.2026). Hier wird nichts erfunden — fehlende Angaben
 * stehen in OFFENE-PUNKTE.md und sind auf der Seite als Platzhalter markiert.
 */
export const site = {
  /** Marke / Auftritt */
  name: "Kfz Krautschick",
  /** Firmierung laut Impressum */
  legalName: "Reifenservice Andreas Krautschick",
  owner: "Andreas Krautschick",
  tagline: "Ihre freie inhabergeführte Kfz-Werkstatt für alle gängigen Marken",
  street: "Nußschütt 3",
  postalCode: "86633",
  city: "Neuburg-Joshofen",
  region: "Bayern",
  country: "DE",
  phone: "08431 / 399 57 96",
  phoneHref: "tel:+4984313995796",
  mobile: "0163 / 717 4507",
  mobileHref: "tel:+491637174507",
  email: "info@kfz-werkstatt-joshofen.de",
  /** Produktiv auf die echte Domain ändern — siehe OFFENE-PUNKTE.md */
  url: "https://www.kfz-werkstatt-joshofen.de",
  /**
   * Koordinaten Nußschütt 3, 86633 Neuburg an der Donau (Ortsteil Joshofen).
   * Quelle: Nominatim/OpenStreetMap, geprüft am 21.09.2026
   * (display_name: „3, Nußschütt, Herrenwörth, Joshofen, Neuburg an der Donau").
   * Die Lage vor dem Livegang vom Kunden bestätigen lassen — siehe OFFENE-PUNKTE.md.
   * Einzige Wahrheit für Karte, „Größere Karte öffnen" und JSON-LD.
   */
  geo: { lat: 48.746, lng: 11.2231 },
} as const;

/** Telefonnummer in E.164 für strukturierte Daten — aus phoneHref abgeleitet. */
export const phoneE164 = site.phoneHref.replace("tel:", "");

export const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#werkstatt", label: "Werkstatt" },
  { href: "#raritaeten", label: "Raritäten" },
  { href: "#eu-neuwagen", label: "EU-Neuwagen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
