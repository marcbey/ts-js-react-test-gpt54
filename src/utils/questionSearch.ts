import { categoryLabels } from '../constants/interviewUi'
import type { InterviewQuestion, Language } from '../types'

export type QuestionSearchIndex = Record<Language, ReadonlyMap<number, string>>

const buildSearchText = (question: InterviewQuestion, language: Language) =>
  [
    question.question[language],
    question.answer[language],
    question.explanation[language],
    categoryLabels[question.category][language],
  ]
    .join(' ')
    .toLowerCase()

export const buildQuestionSearchIndex = (questions: InterviewQuestion[]): QuestionSearchIndex => ({
  de: new Map(questions.map((question) => [question.id, buildSearchText(question, 'de')])),
  en: new Map(questions.map((question) => [question.id, buildSearchText(question, 'en')])),
})
