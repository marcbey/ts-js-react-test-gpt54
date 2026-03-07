import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import type { CategoryFilter, InterviewQuestion, Language } from '../types'
import { countMatchingQuestions, filterQuestions, getAdjacentQuestionId, getSelectedQuestion, getVisibleQuestions } from '../utils/interviewState'
import { buildQuestionSearchIndex } from '../utils/questionSearch'
import { useLocalStorageState } from './useLocalStorageState'

const parseNumberArray = (value: string): number[] => {
  const parsed = JSON.parse(value)
  return Array.isArray(parsed) ? parsed.filter((entry): entry is number => typeof entry === 'number') : []
}

const parseNumber = (value: string): number => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

const parseLanguage = (value: string): Language => (value === 'en' ? 'en' : 'de')
const serializeLanguage = (value: Language) => value

export const useInterviewTrainer = (questions: InterviewQuestion[]) => {
  const defaultQuestionId = questions[0]?.id ?? 0
  const [language, setLanguage] = useLocalStorageState<Language>('interview-language', 'de', {
    deserialize: parseLanguage,
    serialize: serializeLanguage,
  })
  const [revealedIds, setRevealedIds] = useLocalStorageState<number[]>('interview-revealed', [], {
    deserialize: parseNumberArray,
  })
  const [markedIds, setMarkedIds] = useLocalStorageState<number[]>('interview-marked', [], {
    deserialize: parseNumberArray,
  })
  const [isCatalogCollapsed, setIsCatalogCollapsed] = useLocalStorageState<boolean>('interview-catalog-collapsed', false, {
    deserialize: (value) => value === 'true',
    serialize: (value) => JSON.stringify(value),
  })
  const [selectedId, setSelectedId] = useLocalStorageState<number>('interview-selected-question', defaultQuestionId, {
    deserialize: parseNumber,
    serialize: (value) => String(value),
  })

  const [category, setCategory] = useState<CategoryFilter>('all')
  const [search, setSearch] = useState('')
  const [markedOnly, setMarkedOnly] = useState(false)
  const [activeRevealId, setActiveRevealId] = useState<number | null>(null)

  const deferredSearch = useDeferredValue(search)
  const markedIdSet = useMemo(() => new Set(markedIds), [markedIds])
  const revealedIdSet = useMemo(() => new Set(revealedIds), [revealedIds])
  const searchIndex = useMemo(() => buildQuestionSearchIndex(questions), [questions])

  const filteredQuestions = useMemo(
    () =>
      filterQuestions({
        questions,
        searchIndex,
        category,
        language,
        markedOnly,
        markedIdSet,
        search: deferredSearch,
      }),
    [category, deferredSearch, language, markedIdSet, markedOnly, questions, searchIndex],
  )

  const selectedQuestion = useMemo(
    () => getSelectedQuestion(filteredQuestions, selectedId),
    [filteredQuestions, selectedId],
  )

  useEffect(() => {
    if (selectedQuestion && selectedQuestion.id !== selectedId) {
      setSelectedId(selectedQuestion.id)
    }
  }, [selectedId, selectedQuestion, setSelectedId])

  const selectedIndex = useMemo(
    () => (selectedQuestion ? filteredQuestions.findIndex((question) => question.id === selectedQuestion.id) : -1),
    [filteredQuestions, selectedQuestion],
  )

  const visibleQuestions = useMemo(
    () => getVisibleQuestions(filteredQuestions, selectedQuestion?.id ?? null),
    [filteredQuestions, selectedQuestion],
  )

  const isRevealed = selectedQuestion ? activeRevealId === selectedQuestion.id : false
  const isMarked = selectedQuestion ? markedIdSet.has(selectedQuestion.id) : false
  const revealedCount = useMemo(
    () => countMatchingQuestions(filteredQuestions, revealedIdSet),
    [filteredQuestions, revealedIdSet],
  )

  const moveSelection = useCallback(
    (direction: 'previous' | 'next') => {
      const nextQuestionId = getAdjacentQuestionId(filteredQuestions, selectedQuestion?.id ?? null, direction)
      if (nextQuestionId !== null) {
        setActiveRevealId(null)
        setSelectedId(nextQuestionId)
      }
    },
    [filteredQuestions, selectedQuestion, setSelectedId],
  )

  const revealCurrent = useCallback(() => {
    if (!selectedQuestion) return

    setActiveRevealId(selectedQuestion.id)
    setRevealedIds((current) => (current.includes(selectedQuestion.id) ? current : [...current, selectedQuestion.id]))
  }, [selectedQuestion, setRevealedIds])

  const toggleMarked = useCallback((questionId: number) => {
    setMarkedIds((current) =>
      current.includes(questionId) ? current.filter((entry) => entry !== questionId) : [...current, questionId],
    )
  }, [setMarkedIds])

  const selectQuestion = useCallback((questionId: number) => {
    setActiveRevealId(null)
    setSelectedId(questionId)
  }, [setSelectedId])

  return {
    language,
    setLanguage,
    category,
    setCategory,
    search,
    setSearch,
    markedOnly,
    setMarkedOnly,
    isCatalogCollapsed,
    toggleCatalogCollapsed: () => setIsCatalogCollapsed((current) => !current),
    selectedQuestion,
    hasSelection: selectedQuestion !== null,
    selectedIndex,
    visibleQuestions,
    filteredQuestions,
    revealedIds,
    revealedIdSet,
    revealedCount,
    markedIdSet,
    isMarked,
    isRevealed,
    selectQuestion,
    moveSelection,
    revealCurrent,
    toggleMarked,
  }
}
