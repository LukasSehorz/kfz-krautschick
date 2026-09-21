import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${site.legalName}, ${site.city}.`,
  robots: { index: true, follow: false },
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum" eyebrow="Anbieterkennzeichnung">
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          {site.legalName}
          <br />
          Inhaber: {site.owner}
          <br />
          {site.street}
          <br />
          {site.postalCode}&nbsp;{site.city}
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon:{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          <br />
          Mobil:{" "}
          <a href={site.mobileHref} className="link-underline">
            {site.mobile}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-Identifikationsnummer">
        <Placeholder>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG oder Hinweis auf
          die Kleinunternehmerregelung nach § 19 UStG – vom Betreiber zu ergänzen.
        </Placeholder>
      </LegalSection>

      <LegalSection title="Berufsbezeichnung und berufsrechtliche Regelungen">
        <p>
          Berufsbezeichnung: Kraftfahrzeugtechniker-Handwerk (Kfz-Meister),
          verliehen in der Bundesrepublik Deutschland.
        </p>
        <Placeholder>
          Zuständige Handwerkskammer sowie Nummer der Eintragung in die
          Handwerksrolle – vom Betreiber zu ergänzen.
        </Placeholder>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt">
        <p>
          {site.owner}, Anschrift wie oben.
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.&nbsp;1 DDG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§&nbsp;8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
          wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte
          auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
          stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
          verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar. Bei
          Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links
          umgehend.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
          solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und
          jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
          der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </LegalSection>

      <LegalSection title="Bildnachweis">
        <p>
          Die auf dieser Website verwendeten Abbildungen wurden mit Unterstützung
          generativer Bildverfahren erstellt. Sie zeigen Motive aus dem Umfeld einer
          Kfz-Werkstatt und keine konkreten Personen, Fahrzeuge oder Räumlichkeiten
          des Betriebs.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
