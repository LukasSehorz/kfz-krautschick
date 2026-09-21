/**
 * Die 9 Leistungen aus INHALTE.md. Die Beschreibungstexte sind fachlich
 * formuliert, aber bewusst ohne Preise, Fristen, Garantien oder Zahlen,
 * die die alte Seite nicht hergibt.
 */
export type Service = {
  slug: string;
  title: string;
  /** Kurzzeile fürs Grid */
  lead: string;
  /** Erklärtext */
  body: string;
  /** Konkrete Arbeiten — was in dieser Leistung steckt */
  points: string[];
};

export const services: Service[] = [
  {
    slug: "inspektion",
    title: "Inspektion",
    lead: "Wartung nach Herstellervorgaben, im Serviceheft dokumentiert.",
    body:
      "Ich warte Ihr Fahrzeug nach den Vorgaben des jeweiligen Herstellers und dokumentiere die Arbeiten für Ihr Serviceheft. Wird nach Herstellervorgaben gearbeitet und sauber dokumentiert, bleibt eine bestehende Herstellergarantie in aller Regel erhalten.",
    points: [
      "Wartung nach Herstellerplan, klein und groß",
      "Betriebsstoffe, Filter und Verschleißteile",
      "Nachweis im Serviceheft",
      "Sicht- und Funktionsprüfung, Fehlerspeicher",
    ],
  },
  {
    slug: "hu-au",
    title: "HU/AU-Service",
    lead: "Vorbereitung, Begleitung und alles, was danach zu tun ist.",
    body:
      "Die Hauptuntersuchung selbst nimmt eine amtlich anerkannte Prüforganisation ab. Ich bereite Ihr Fahrzeug darauf vor, prüfe alle relevanten Punkte durch, bin bei der Abnahme dabei und behebe festgestellte Mängel direkt in der Werkstatt.",
    points: [
      "Prüfung aller HU-relevanten Punkte vorab",
      "Abgasuntersuchung: Vorbereitung und Abwicklung",
      "Terminabstimmung mit der Prüforganisation",
      "Mängelbeseitigung und Nachprüfung",
    ],
  },
  {
    slug: "bremsen",
    title: "Bremsenservice",
    lead: "Das Bauteil, bei dem die Restdicke zählt.",
    body:
      "Von der Messung der Restbeläge bis zum kompletten Wechsel von Scheiben, Belägen und Bremsflüssigkeit. Ich prüfe ebenso Leitungen, Sattelführungen und die Feststellbremse – und sage Ihnen ehrlich, was jetzt fällig ist und was noch eine Weile hält.",
    points: [
      "Beläge, Scheiben und Trommeln",
      "Bremsflüssigkeit wechseln und prüfen",
      "Leitungen, Schläuche und Sättel",
      "Feststellbremse, auch elektrisch",
    ],
  },
  {
    slug: "oelwechsel",
    title: "Ölwechsel",
    lead: "Die vom Hersteller freigegebene Spezifikation.",
    body:
      "Welches Öl in Ihren Motor gehört, gibt der Hersteller vor. Ich verwende ausschließlich Öl mit der vom Hersteller für Ihren Motor freigegebenen Spezifikation, wechsle den Ölfilter mit und entsorge das Altöl fachgerecht.",
    points: [
      "Motoröl nach Herstellerfreigabe",
      "Ölfilter und Dichtringe",
      "Kontrolle auf Undichtigkeiten",
      "Fachgerechte Altölentsorgung",
    ],
  },
  {
    slug: "reifen",
    title: "Reifenservice",
    lead: "Montieren, wuchten, einlagern – über die ganze Saison.",
    body:
      "Räder- und Reifenwechsel, Auswuchten, Reparatur von Reifenschäden und das Anlernen der Reifendruck-Sensoren. Ob Sie neue Reifen brauchen oder die alten noch eine Saison tragen, zeige ich Ihnen am Profil.",
    points: [
      "Rad- und Reifenwechsel",
      "Auswuchten und Reifenreparatur",
      "RDKS anlernen und prüfen",
      "Einlagerung nach Absprache",
    ],
  },
  {
    slug: "diagnostik",
    title: "Diagnostik",
    lead: "Erst messen, dann tauschen.",
    body:
      "Eine Kontrollleuchte zeigt an, dass etwas nicht stimmt – wo genau, sagt erst die Messung. Ich lese die Steuergeräte aus, messe die betroffenen Bauteile nach und arbeite mich zur tatsächlichen Ursache vor, bevor ein Teil bestellt wird.",
    points: [
      "Fehlerspeicher der relevanten Steuergeräte auslesen",
      "Messwerte im Betrieb prüfen",
      "Elektrik- und Sensorfehler eingrenzen",
      "Befund verständlich erklärt",
    ],
  },
  {
    slug: "glasservice",
    title: "Glasservice",
    lead: "Steinschlag reparieren, Scheibe tauschen.",
    body:
      "Kleine Steinschläge lassen sich oft reparieren, bevor daraus ein Riss wird. Ist die Scheibe zu stark beschädigt, kümmere ich mich um den Austausch. Die Abwicklung mit Ihrer Versicherung bereite ich vor.",
    points: [
      "Steinschlagreparatur",
      "Scheibentausch: Organisation und Abwicklung",
      "Vorbereitung der Versicherungsabwicklung",
      "Wischer- und Dichtungskontrolle",
    ],
  },
  {
    slug: "reparatur",
    title: "Reparatur",
    lead: "Von der Kupplung bis zum Zahnriemen – für alle gängigen Marken.",
    body:
      "Mechanik, Elektrik, Fahrwerk, Abgasanlage: Als freie Werkstatt repariere ich markenübergreifend. Vor jeder größeren Arbeit bekommen Sie einen Kostenvoranschlag, und wenn während der Reparatur etwas dazukommt, rufe ich Sie vorher an.",
    points: [
      "Motor, Getriebe und Kupplung",
      "Fahrwerk und Lenkung",
      "Elektrik und Komfortsysteme",
      "Abgasanlage",
    ],
  },
  {
    slug: "raritaeten",
    title: "Raritätenfahrzeuge",
    lead: "Oldtimer und Youngtimer, mit der nötigen Geduld.",
    body:
      "Alte Fahrzeuge brauchen Zeit, Erfahrung und Respekt vor der Substanz. Vom laufenden Service über die Instandsetzung bis zur Restauration und zum Gutachten betreue ich Klassiker.",
    points: [
      "Service und Instandsetzung",
      "Restauration",
      "Bewertung und TÜV-Gutachten",
      "Abholung im geschlossenen Hänger",
    ],
  },
];

/** Die 5 Punkte aus INHALTE.md, wörtlich in der Sache. */
export const rarityServices = [
  {
    title: "Service",
    text: "Laufende Wartung, die sich nach dem Alter und der Technik des Fahrzeugs richtet.",
  },
  {
    title: "Instandsetzung",
    text: "Defekte Baugruppen wieder in Funktion bringen und dabei so viel Originalsubstanz wie möglich erhalten.",
  },
  {
    title: "Restauration",
    text: "Schrittweise Aufarbeitung in Abstimmung mit Ihnen – vom Teilbereich bis zum vollständigen Projekt.",
  },
  {
    title: "Bewertung & TÜV-Gutachten",
    text: "Begutachtung des Zustands und Begleitung bei Wertgutachten sowie bei der Abnahme durch den TÜV.",
  },
  {
    title: "Fahrzeugabholung",
    text: "Nicht jeder Klassiker ist fahrbereit. Auf Wunsch hole ich Ihr Fahrzeug im geschlossenen Hänger ab.",
  },
] as const;

/** Ablauf — beschreibt den normalen Werkstattprozess, keine Zusagen zu Fristen. */
export const steps = [
  {
    title: "Anrufen",
    text: "Sie schildern mir kurz, worum es geht. Oft lässt sich schon am Telefon einschätzen, was dahintersteckt.",
  },
  {
    title: "Termin",
    text: "Wir vereinbaren einen Termin, der zu Ihnen passt, und Sie bringen das Fahrzeug vorbei.",
  },
  {
    title: "Befund & Kostenvoranschlag",
    text: "Ich sehe mir das Fahrzeug an und sage Ihnen, was nötig ist und was es kostet – bevor ich anfange.",
  },
  {
    title: "Reparatur",
    text: "Gearbeitet wird nur, was abgesprochen ist. Kommt etwas dazu, rufe ich Sie vorher an.",
  },
  {
    title: "Abholung",
    text: "Bei der Übergabe erkläre ich Ihnen, was gemacht wurde – und was beim nächsten Mal ansteht.",
  },
] as const;

export const reasons = [
  {
    title: "Ihre Herstellergarantie bleibt",
    text: "Wird die Inspektion nach Herstellervorgaben ausgeführt und dokumentiert, bleibt die Herstellergarantie in aller Regel erhalten – eine Vertragswerkstatt ist dafür nicht vorgeschrieben.",
  },
  {
    title: "Sie sprechen mit dem Meister",
    text: "Sie sprechen mit dem Meister, der an Ihrem Fahrzeug arbeitet. Kein Weiterreichen, keine wechselnden Zuständigkeiten.",
  },
  {
    title: "Meisterbetrieb mit Entwicklungserfahrung",
    text: "Kfz-Meister und langjährige Tätigkeit in der Fahrzeugentwicklung. Diese Kombination hilft dort, wo das Steuergerät nicht weiterweiß.",
  },
  {
    title: "Alle gängigen Marken",
    text: "Als freie Werkstatt bin ich auf keinen Hersteller festgelegt. Was in die Halle passt, wird repariert.",
  },
] as const;

export const faqs = [
  {
    q: "Verliere ich meine Herstellergarantie, wenn ich in eine freie Werkstatt gehe?",
    a: "In aller Regel nicht. Wird die Inspektion nach den Vorgaben des Herstellers ausgeführt, mit passenden Teilen und Betriebsstoffen gearbeitet und alles nachvollziehbar dokumentiert, bleibt die Herstellergarantie bestehen. Auf diese Dokumentation lege ich Wert. Bei Anschluss- oder Mobilitätsgarantien können abweichende Bedingungen gelten – bringen Sie im Zweifel Ihre Garantieunterlagen mit.",
  },
  {
    q: "Machen Sie die Hauptuntersuchung selbst?",
    a: "Die Hauptuntersuchung darf nur eine amtlich anerkannte Prüforganisation abnehmen. Ich bereite Ihr Fahrzeug darauf vor, stimme den Termin ab, bin bei der Abnahme dabei und behebe Mängel direkt hier in der Werkstatt.",
  },
  {
    q: "Welche Marken reparieren Sie?",
    a: "Alle gängigen Marken. Als freie Werkstatt bin ich nicht auf einen Hersteller festgelegt – dazu kommen Oldtimer und Youngtimer.",
  },
  {
    q: "Bekomme ich vorher einen Kostenvoranschlag?",
    a: "Ja. Vor jeder größeren Arbeit sage ich Ihnen, was zu tun ist und was es kostet. Zeigt sich während der Reparatur zusätzlicher Bedarf, rufe ich Sie an, bevor ich weitermache.",
  },
  {
    q: "Können Sie mein nicht fahrbereites Fahrzeug abholen?",
    a: "Für Oldtimer und Youngtimer biete ich die Abholung im geschlossenen Hänger an. Sprechen Sie mich an, dann finden wir einen Weg, Ihr Fahrzeug hierher zu bekommen.",
  },
  {
    q: "Vermitteln Sie auch Neufahrzeuge?",
    a: "Ja. Über EU-Neuwagen mit Tageszulassung lassen sich oft sehr gute Preise erzielen. Sagen Sie mir, was Sie suchen, dann mache ich Ihnen ein passendes Angebot.",
  },
] as const;
