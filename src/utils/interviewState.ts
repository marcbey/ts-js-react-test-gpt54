import { categoryLabels } from '../constants/interviewUi'
import type { CategoryFilter, InterviewQuestion, Language } from '../types'

export type FilterQuestionsOptions = {
  questions: InterviewQuestion[]
  category: CategoryFilter
  language: Language
  markedOnly: boolean
  markedIdSet: ReadonlySet<number>
  search: string
}

export const filterQuestions = ({
  questions,
  category,
  language,
  markedOnly,
  markedIdSet,
  search,
}: FilterQuestionsOptions): InterviewQuestion[] => {
  const normalizedSearch = search.trim().toLowerCase()

  return questions.filter((question) => {
    if (category !== 'all' && question.category !== category) return false
    if (markedOnly && !markedIdSet.has(question.id)) return false
    if (!normalizedSearch) return true

    const haystack = [
      question.question[language],
      question.answer[language],
      question.explanation[language],
      categoryLabels[question.category][language],
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedSearch)
  })
}

export const getSelectedQuestion = (
  questions: InterviewQuestion[],
  selectedId: number,
  fallbackQuestion: InterviewQuestion,
): InterviewQuestion => questions.find((question) => question.id === selectedId) ?? questions[0] ?? fallbackQuestion

export const getVisibleQuestions = (
  questions: InterviewQuestion[],
  selectedId: number,
): InterviewQuestion[] => {
  if (questions.length === 0) return []

  const selectedIndex = questions.findIndex((question) => question.id === selectedId)
  if (selectedIndex === -1) return questions.slice(0, Math.min(questions.length, 3))

  return questions.slice(Math.max(selectedIndex - 1, 0), Math.min(selectedIndex + 2, questions.length))
}

export const getAdjacentQuestionId = (
  questions: InterviewQuestion[],
  selectedId: number,
  direction: 'previous' | 'next',
): number | null => {
  if (questions.length === 0) return null

  const selectedIndex = questions.findIndex((question) => question.id === selectedId)
  const safeIndex = selectedIndex === -1 ? 0 : selectedIndex
  const nextIndex =
    direction === 'next'
      ? Math.min(safeIndex + 1, questions.length - 1)
      : Math.max(safeIndex - 1, 0)

  return questions[nextIndex]?.id ?? null
}

export const countMatchingQuestions = (
  questions: InterviewQuestion[],
  idSet: ReadonlySet<number>,
): number => questions.reduce((count, question) => count + Number(idSet.has(question.id)), 0)
