import type { InterviewQuestion, LocalizedText } from '../types'
import { interviewQuestionExplanationDetails } from './interviewQuestionExplanationDetails'

const germanTypographyReplacements = [
  ['heisst', 'heißt'],
  ['Gespraechen', 'Gesprächen'],
  ['Gespraech', 'Gespräch'],
  ['Abbrueche', 'Abbrüche'],
  ['unerkaerliche', 'unerklärliche'],
  ['Vertraege', 'Verträge'],
  ['Objektvertraege', 'Objektverträge'],
  ['verknuepfen', 'verknüpfen'],
  ['Unschaerfe', 'Unschärfe'],
  ['foerdern', 'fördern'],
  ['Praeferenz', 'Präferenz'],
  ['aufraeumen', 'aufräumen'],
  ['aelteren', 'älteren'],
  ['Geraeten', 'Geräten'],
  ['einschaetzen', 'einschätzen'],
  ['genuegen', 'genügen'],
  ['verlaengerte', 'verlängerte'],
  ['Zustandsuebergaenge', 'Zustandsübergänge'],
  ['uebergaenge', 'übergänge'],
  ['vollstaendig', 'vollständig'],
  ['Zaehler', 'Zähler'],
  ['Eigenstaendigkeit', 'Eigenständigkeit'],
  ['Hauefige', 'Häufige'],
  ['Teilbaeumen', 'Teilbäumen'],
  ['abstuerzt', 'abstürzt'],
  ['rueckwaerts', 'rückwärts'],
  ['rückwaerts', 'rückwärts'],
  ['Menues', 'Menüs'],
  ['regelmaessiger', 'regelmäßiger'],
  ['maechig', 'mächtig'],
  ['Tueren', 'Türen'],
  ['aufzuzaehlen', 'aufzuzählen'],
  ['Schlagwoerter', 'Schlagwörter'],
  ['unterstuetzen', 'unterstützen'],
  ['Typpruefung', 'Typprüfung'],
  ['gepraegt', 'geprägt'],
  ['Typraetsel', 'Typrätsel'],
  ['fuegt', 'fügt'],
  ['Laufzeitpruefungen', 'Laufzeitprüfungen'],
  ['Laufzeitpruefung', 'Laufzeitprüfung'],
  ['waeren', 'wären'],
  ['truegerischen', 'trügerischen'],
  ['Begruendung', 'Begründung'],
  ['komplementaer', 'komplementär'],
  ['spuerbar', 'spürbar'],
  ['Eintraege', 'Einträge'],
  ['aehnlich', 'ähnlich'],
] as const

const normalizeGermanText = (text: string) =>
  germanTypographyReplacements.reduce((current, [search, replacement]) => current.replaceAll(search, replacement), text)

const refineGermanAnswer = (text: string) =>
  normalizeGermanText(text)
    .replaceAll('In Senior-Interviews ist wichtig zu erwähnen, dass ', 'Wichtig ist, dass ')
    .replaceAll('In Senior-Interviews ist eine gute Antwort, dass ', 'Wichtig ist, dass ')
    .replaceAll('In Senior-Interviews solltest du ', 'Wichtig ist, ')
    .replaceAll('In Senior-Interviews punktest du, wenn du ', 'Wichtig ist, dass du ')
    .replaceAll('In Senior-Gesprächen solltest du erwähnen, dass ', 'Wichtig ist, dass ')
    .replaceAll('In Senior-Gesprächen ist wichtig, ', 'Wichtig ist, ')
    .replaceAll('In einem Senior-Interview reicht es nicht, ', 'Entscheidend ist nicht nur, ')
    .replaceAll('Ein gutes Interview-Statement ist deshalb: ', 'Praktisch heißt das: ')
    .replaceAll('Senior-Level bedeutet hier auch, ', 'Wichtig ist auch, ')
    .replaceAll('Senior-Level bedeutet hier, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level bedeutet auch, ', 'Wichtig ist auch, ')
    .replaceAll('Senior-Level bedeutet, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level heißt hier außerdem: ', 'Wichtig ist außerdem: ')
    .replaceAll('Senior-Level heißt hier außerdem, ', 'Wichtig ist außerdem, ')
    .replaceAll('Senior-Level heißt hier, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level heißt, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level heißt hier auch, ', 'Wichtig ist auch, ')
    .replaceAll('Senior-Level heisst hier außerdem: ', 'Wichtig ist außerdem: ')
    .replaceAll('Senior-Level heisst hier außerdem, ', 'Wichtig ist außerdem, ')
    .replaceAll('Senior-Level heisst hier, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level heisst, ', 'Wichtig ist, ')
    .replaceAll('Senior-Level heisst hier auch, ', 'Wichtig ist auch, ')
    .replaceAll('Für Senior-Rollen ist wichtig, ', 'Wichtig ist, ')
    .replaceAll('Auf Senior-Level solltest du außerdem ', 'Wichtig ist außerdem, ')
    .replaceAll('In Interviews ist wichtig zu sagen, dass ', 'Wichtig ist, dass ')
    .replaceAll('In Interviews ist oft relevant, dass ', 'Wichtig ist, dass ')
    .replaceAll('In Interviews ist der interessante Teil selten die Syntax, sondern ', 'Entscheidend ist weniger die Syntax als ')
    .replaceAll('Ein Interview wird hier oft auf die Frage hinauslaufen, ', 'Praktisch läuft die Erklärung oft darauf hinaus, ')
    .replaceAll('Interviewfragen dazu prüfen meist, ob du ', 'Entscheidend ist, dass du ')
    .replaceAll('Interviewfragen zu `async`/`await` zielen häufig auf ', 'Bei `async`/`await` geht es häufig um ')
    .replaceAll('Genau diese Reihenfolge ist ein Standard-Interviewthema.', 'Genau diese Reihenfolge erklärt typische Timing-Effekte in der Praxis.')
    .replaceAll('Genau das wird in Interviews oft übersehen.', 'Ohne diesen Check wird ein Fehlerstatus leicht wie ein erfolgreicher Request behandelt.')
    .trim()

const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/)
  return match ? match[0].trim() : text.trim()
}

export const normalizeLocalizedText = (text: LocalizedText): LocalizedText => ({
  de: normalizeGermanText(text.de),
  en: text.en,
})

export const buildAnswer = (entry: Pick<InterviewQuestion, 'id' | 'answer'>): LocalizedText => {
  const explanationDetails = interviewQuestionExplanationDetails[entry.id]
  const germanAnswer = refineGermanAnswer(entry.answer.de)
  const germanContext = firstSentence(refineGermanAnswer(explanationDetails.de))
  const englishContext = firstSentence(explanationDetails.en)

  return {
    de: `${germanAnswer}\n\nKontext: ${germanContext}`,
    en: `${entry.answer.en}\n\nContext: ${englishContext}`,
  }
}

export const expandExplanation = (
  entry: Pick<InterviewQuestion, 'id' | 'explanation' | 'exampleExplanation'>,
): LocalizedText => {
  const explanationDetails = interviewQuestionExplanationDetails[entry.id]

  return {
    de: normalizeGermanText(`${entry.explanation.de}\n\n${entry.exampleExplanation.de}\n\n${explanationDetails.de}`),
    en: `${entry.explanation.en}\n\n${entry.exampleExplanation.en}\n\n${explanationDetails.en}`,
  }
}
