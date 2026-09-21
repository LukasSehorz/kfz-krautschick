import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Informationen zur Verarbeitung personenbezogener Daten auf der Website von ${site.legalName}.`,
  robots: { index: true, follow: false },
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutz" eyebrow="Ihre Daten">
      <LegalSection title="Auf einen Blick">
        <p>
          Diese Website setzt <strong>keine Cookies zu Werbe- oder Analysezwecken</strong>{" "}
          ein. Es findet <strong>kein Tracking</strong> statt, es sind keine
          Analysedienste, keine Werbenetzwerke und keine Social-Media-Plugins
          eingebunden. Schriftarten werden vom eigenen Server ausgeliefert, es
          besteht also keine Verbindung zu Google Fonts.
        </p>
      </LegalSection>

      <LegalSection title="Verantwortliche Stelle">
        <p>
          {site.legalName}
          <br />
          Inhaber: {site.owner}
          <br />
          {site.street}
          <br />
          {site.postalCode}&nbsp;{site.city}
          <br />
          Telefon:{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
        </p>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die
          allein oder gemeinsam mit anderen über die Zwecke und Mittel der
          Verarbeitung von personenbezogenen Daten entscheidet.
        </p>
      </LegalSection>

      <LegalSection title="Server-Logdateien">
        <p>
          Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch
          Informationen, die Ihr Browser übermittelt. Das sind in der Regel:
          Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname
          des zugreifenden Rechners, Uhrzeit der Serveranfrage und die IP-Adresse.
        </p>
        <p>
          Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die
          Erfassung erfolgt auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
          DSGVO. Der Betreiber hat ein berechtigtes Interesse an der technisch
          fehlerfreien Darstellung und der Sicherheit seiner Website. Die Daten
          werden nach Ablauf der gesetzlich zulässigen Frist gelöscht; die
          konkrete Speicherdauer richtet sich nach den Vorgaben des
          Hosting-Anbieters.
        </p>
        <Placeholder>
          Name und Anschrift des Hosting-Anbieters sowie – falls erforderlich – der
          Hinweis auf den abgeschlossenen Auftragsverarbeitungsvertrag sind vor der
          Veröffentlichung zu ergänzen.
        </Placeholder>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Diese Website verwendet <strong>keine Cookies</strong>, die eine
          Einwilligung erfordern würden. Es werden weder Analyse- noch
          Marketing-Cookies gesetzt. Daher erscheint auch kein Cookie-Banner.
        </p>
      </LegalSection>

      <LegalSection title="Kontaktformular">
        <p>
          Das Kontaktformular auf dieser Website überträgt{" "}
          <strong>keine Daten an einen Server</strong>. Ihre Eingaben werden
          ausschließlich in Ihrem Browser verarbeitet und beim Absenden in eine
          vorausgefüllte E-Mail in Ihrem eigenen E-Mail-Programm übernommen. Erst
          wenn Sie diese E-Mail dort selbst versenden, gelangen die Daten zu uns.
        </p>
        <p>
          Die auf diesem Weg übermittelten Daten – Name, E-Mail-Adresse, optional
          Telefonnummer und Fahrzeugangaben sowie Ihre Nachricht – verarbeiten wir
          ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist
          Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO, soweit die Anfrage auf einen
          Vertrag oder vorvertragliche Maßnahmen gerichtet ist, im Übrigen
          Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO.
        </p>
        <p>
          Die Daten verbleiben bei uns, bis der Zweck der Speicherung entfällt, etwa
          weil Ihre Anfrage abschließend bearbeitet ist. Gesetzliche
          Aufbewahrungsfristen – insbesondere handels- und steuerrechtliche – bleiben
          unberührt.
        </p>
      </LegalSection>

      <LegalSection title="Anfragen per Telefon oder E-Mail">
        <p>
          Wenn Sie uns per Telefon oder E-Mail kontaktieren, werden Ihre Angaben
          einschließlich der daraus hervorgehenden personenbezogenen Daten zum Zweck
          der Bearbeitung Ihres Anliegens gespeichert und verarbeitet. Diese Daten
          geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </LegalSection>

      <LegalSection title="Kartendarstellung über OpenStreetMap">
        <p>
          Auf der Kontaktseite kann eine Karte von OpenStreetMap angezeigt werden
          (Anbieter: OpenStreetMap Foundation, St&nbsp;John&apos;s Innovation Centre,
          Cowley Road, Cambridge, CB4&nbsp;0WS, Vereinigtes Königreich).
        </p>
        <p>
          <strong>
            Die Karte wird nicht automatisch geladen.
          </strong>{" "}
          Stattdessen sehen Sie zunächst nur einen Platzhalter mit unserer
          Anschrift. Erst wenn Sie dort auf „Karte laden&ldquo; klicken, wird eine
          Verbindung zu OpenStreetMap hergestellt und dabei Ihre IP-Adresse an
          Server der OpenStreetMap Foundation übertragen; diese können sich auch
          außerhalb der Europäischen Union befinden.
        </p>
        <p>
          Rechtsgrundlage für diese Übermittlung ist damit ausschließlich Ihre
          ausdrückliche Einwilligung nach Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a
          DSGVO. Klicken Sie nicht auf den Button, findet keine Verbindung statt.
          Weitere Informationen finden Sie in der{" "}
          <a
            href="https://osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline"
          >
            Datenschutzerklärung von OpenStreetMap
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="SSL- bzw. TLS-Verschlüsselung">
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
          vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
          Browsers von <code>http://</code> auf <code>https://</code> wechselt.
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            <strong>Auskunft</strong> über die zu Ihrer Person gespeicherten Daten
            (Art.&nbsp;15 DSGVO)
          </li>
          <li>
            <strong>Berichtigung</strong> unrichtiger Daten (Art.&nbsp;16 DSGVO)
          </li>
          <li>
            <strong>Löschung</strong> Ihrer Daten (Art.&nbsp;17 DSGVO)
          </li>
          <li>
            <strong>Einschränkung der Verarbeitung</strong> (Art.&nbsp;18 DSGVO)
          </li>
          <li>
            <strong>Datenübertragbarkeit</strong> (Art.&nbsp;20 DSGVO)
          </li>
          <li>
            <strong>Widerspruch</strong> gegen die Verarbeitung (Art.&nbsp;21 DSGVO)
          </li>
          <li>
            <strong>Widerruf einer Einwilligung</strong> mit Wirkung für die Zukunft
          </li>
        </ul>
        <p>
          Wenden Sie sich dafür jederzeit an die oben genannte verantwortliche
          Stelle.
        </p>
      </LegalSection>

      <LegalSection title="Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
          Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig ist das
          Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade&nbsp;18,
          91522&nbsp;Ansbach.
        </p>
      </LegalSection>

      <LegalSection title="Aktualität">
        <p>
          Diese Datenschutzerklärung wird angepasst, sobald sich die
          Datenverarbeitung auf dieser Website ändert – etwa durch die Einbindung
          weiterer Dienste.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
