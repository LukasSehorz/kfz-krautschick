"use client";

import { useId, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  topic: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const topics = [
  "Inspektion",
  "HU/AU-Vorbereitung",
  "Bremsen",
  "Ölwechsel",
  "Reifen",
  "Diagnose / Kontrollleuchte",
  "Glasservice",
  "Reparatur",
  "Oldtimer / Youngtimer",
  "EU-Neuwagen",
  "Etwas anderes",
];

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  topic: "",
  message: "",
  consent: false,
};

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Bitte geben Sie Ihren Namen an.";
  // Bewusst tolerant: nur die grobe Form, keine exotischen Adressen aussperren.
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v.email.trim()))
    e.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (v.phone.trim() && !/^[\d\s+/()-]{6,}$/.test(v.phone.trim()))
    e.phone = "Bitte prüfen Sie die Telefonnummer.";
  if (v.message.trim().length < 10)
    e.message = "Bitte beschreiben Sie Ihr Anliegen in ein bis zwei Sätzen.";
  if (!v.consent)
    e.consent = "Ohne diese Zustimmung können wir Ihre Anfrage nicht bearbeiten.";
  return e;
}

/**
 * Das Formular hat bewusst KEIN Backend. Nach erfolgreicher Prüfung wird eine
 * vorausgefüllte E-Mail im Mailprogramm des Besuchers geöffnet — es wird also
 * nichts still verschluckt und nichts ohne Zutun des Besuchers versendet.
 *
 * TODO (Deployment): Wenn ein Endpunkt bereitsteht (z. B. Netlify Forms oder
 * eine Route Handler unter /api/kontakt), in `handleSubmit` statt des
 * mailto-Aufrufs ein fetch() darauf absetzen und den Erfolgszustand daran
 * koppeln. Dann auch die Datenschutzerklärung um den Hoster ergänzen.
 */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Fehler verschwindet, sobald der Besucher korrigiert.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Fokus auf das erste fehlerhafte Feld legen.
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    const body = [
      `Name: ${values.name}`,
      `E-Mail: ${values.email}`,
      values.phone ? `Telefon: ${values.phone}` : null,
      values.vehicle ? `Fahrzeug: ${values.vehicle}` : null,
      values.topic ? `Anliegen: ${values.topic}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Anfrage über die Website${values.topic ? ` – ${values.topic}` : ""}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSentTo(href);
  };

  const fieldClass = (key: keyof Fields) =>
    `min-h-11 w-full border bg-transparent px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/70 focus:border-amber focus:outline-none ${
      errors[key] ? "border-amber" : "border-line"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm text-foreground">
            Name <span className="text-amber">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={fieldClass("name")}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-xs text-amber">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm text-foreground">
            E-Mail <span className="text-amber">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={fieldClass("email")}
          />
          {errors.email && (
            <p id={`${id}-email-err`} className="mt-1.5 text-xs text-amber">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className="mb-2 block text-sm text-foreground">
            Telefon <span className="text-muted">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            className={fieldClass("phone")}
          />
          {errors.phone && (
            <p id={`${id}-phone-err`} className="mt-1.5 text-xs text-amber">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-vehicle`} className="mb-2 block text-sm text-foreground">
            Fahrzeug <span className="text-muted">(optional)</span>
          </label>
          <input
            id={`${id}-vehicle`}
            name="vehicle"
            type="text"
            placeholder="Marke, Modell, Baujahr"
            value={values.vehicle}
            onChange={(e) => set("vehicle", e.target.value)}
            className={fieldClass("vehicle")}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-topic`} className="mb-2 block text-sm text-foreground">
          Anliegen
        </label>
        <select
          id={`${id}-topic`}
          name="topic"
          value={values.topic}
          onChange={(e) => set("topic", e.target.value)}
          className={`${fieldClass("topic")} appearance-none`}
        >
          <option value="">Bitte wählen</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm text-foreground">
          Ihre Nachricht <span className="text-amber">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          className={`${fieldClass("message")} resize-y`}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className="mt-1.5 text-xs text-amber">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-consent`} className="flex cursor-pointer items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--amber)]"
          />
          <span className="text-xs leading-relaxed text-muted">
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
            Anfrage verwendet werden. <span className="text-amber">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${id}-consent-err`} className="mt-1.5 text-xs text-amber">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Ehrlicher Hinweis: Das Formular versendet nicht selbst. */}
      <p className="border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">
        Mit dem Absenden öffnet sich eine vorbereitete E-Mail in Ihrem
        E-Mail-Programm – erst Ihr Klick dort verschickt die Nachricht. Wenn Sie
        das lieber umgehen: rufen Sie einfach an unter{" "}
        <a href={site.phoneHref} className="link-underline text-foreground">
          {site.phone}
        </a>
        .
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
        <button
          type="submit"
          className="group inline-flex min-h-12 items-center bg-ink px-7 text-sm font-medium text-background transition-colors duration-500 hover:bg-amber-deep"
        >
          E-Mail vorbereiten
          <ArrowRight
            className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </button>
        <a
          href={`mailto:${site.email}`}
          className="link-underline inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Direkt schreiben
        </a>
      </div>

      {/* Statusmeldungen für Screenreader und Auge */}
      <div aria-live="polite" className="min-h-0">
        {submitted && Object.keys(errors).length > 0 && (
          <p className="text-xs text-amber">
            Bitte prüfen Sie die markierten Felder.
          </p>
        )}
        {sentTo && (
          <p className="text-xs leading-relaxed text-muted">
            Ihr E-Mail-Programm sollte sich jetzt geöffnet haben. Falls nicht:{" "}
            <a href={sentTo} className="link-underline text-foreground">
              hier die E-Mail erneut öffnen
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
