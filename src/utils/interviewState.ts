import type { CategoryFilter, InterviewQuestion, Language } from '../types'
import type { QuestionSearchIndex } from './questionSearch'

export type FilterQuestionsOptions = {
  questions: InterviewQuestion[]
  searchIndex: QuestionSearchIndex
  category: CategoryFilter
  language: Language
  markedOnly: boolean
  markedIdSet: ReadonlySet<number>
  search: string
}

export const filterQuestions = ({
  questions,
  searchIndex,
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

    const haystack = searchIndex[language].get(question.id) ?? ''

    return haystack.includes(normalizedSearch)
  })
}

export const getSelectedQuestion = (
  questions: InterviewQuestion[],
  selectedId: number,
): InterviewQuestion | null => questions.find((question) => question.id === selectedId) ?? questions[0] ?? null

export const getVisibleQuestions = (
  questions: InterviewQuestion[],
  selectedId: number | null,
): InterviewQuestion[] => {
  if (questions.length === 0) return []
  if (selectedId === null) return questions.slice(0, Math.min(questions.length, 3))

  const selectedIndex = questions.findIndex((question) => question.id === selectedId)
  if (selectedIndex === -1) return questions.slice(0, Math.min(questions.length, 3))

  return questions.slice(Math.max(selectedIndex - 1, 0), Math.min(selectedIndex + 2, questions.length))
}

export const getAdjacentQuestionId = (
  questions: InterviewQuestion[],
  selectedId: number | null,
  direction: 'previous' | 'next',
): number | null => {
  if (questions.length === 0) return null
  if (selectedId === null) return questions[0]?.id ?? null

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
