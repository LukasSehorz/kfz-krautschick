# Kfz Krautschick — Webseite

Demo-Landingpage für **Reifenservice Andreas Krautschick**, freie Kfz-Werkstatt in
Neuburg-Joshofen. Gebaut von [svh Consulting](https://svhconsult.de).

## Starten

```bash
npm install
npm run dev     # http://localhost:3000
```

## Bauen und veröffentlichen

```bash
npm run build   # statischer Export, alle Routen vorgerendert
npm start       # Produktionsserver lokal prüfen
```

Für Netlify liegt `netlify.toml` bei (Build `npm run build`, Plugin
`@netlify/plugin-nextjs`). Auf Vercel genügt das Importieren des Repos.

## Technik

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — Farbtokens in `src/app/globals.css`, dunkle Abschnitte
  über die Klasse `.on-dark`, die dieselben Tokens invertiert
- **Framer Motion** für Reveals, **GSAP ScrollTrigger** für die gepinnte
  Leistungs-Sektion und Parallax
- Schriften (Fraunces, Inter) self-hosted über `next/font` — keine Anfragen an
  Google-Server
- Karte lädt erst nach Klick, davor keine externen Anfragen

## Aufbau

```
src/
  app/            Routen: Startseite, Impressum, Datenschutz, sitemap, robots
  components/     Header, Footer, Hero, Logo, Leistungen, FAQ, Formular, Motion
  lib/            site.ts (Stammdaten), services.ts (Leistungen)
public/images/    Bildmaterial
```

Stammdaten wie Anschrift, Telefonnummern und Koordinaten stehen **nur** in
`src/lib/site.ts`. Kontaktblock, Footer, Karte und die strukturierten Daten
(JSON-LD) leiten sich von dort ab.

## Stand

Demo für das Erstgespräch. **Die Fotos sind Platzhalter** und zeigen nicht den
echten Betrieb. Angaben, die auf der bisherigen Webseite nicht belegt waren —
Öffnungszeiten, Preise, Jahreszahlen — stehen bewusst nicht auf der Seite,
sondern als sichtbare Platzhalter.

Das Kontaktformular hat kein Backend: Es prüft die Eingaben und öffnet dann eine
vorbereitete E-Mail. Für echten Serverversand siehe den Hinweis in
`src/components/contact-form.tsx`.
