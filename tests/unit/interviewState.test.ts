import { describe, expect, it } from 'vitest'
import type { InterviewQuestion } from '../../src/types'
import { buildQuestionSearchIndex } from '../../src/utils/questionSearch'
import { countMatchingQuestions, filterQuestions, getAdjacentQuestionId, getVisibleQuestions } from '../../src/utils/interviewState'

const buildQuestion = (id: number, overrides: Partial<InterviewQuestion> = {}): InterviewQuestion => ({
  id,
  category: id % 2 === 0 ? 'typescript' : 'javascript',
  question: { de: `Frage ${id}`, en: `Question ${id}` },
  answer: { de: `Antwort ${id}`, en: `Answer ${id}` },
  exampleTitle: { de: `Beispiel ${id}`, en: `Example ${id}` },
  exampleExplanation: { de: `Erklärung ${id}`, en: `Explanation ${id}` },
  exampleCode: `const value${id} = ${id}`,
  explanation: { de: `Deep Dive ${id}`, en: `Deep Dive ${id}` },
  resources: [],
  ...overrides,
})

describe('interviewState', () => {
  const questions = [
    buildQuestion(1, { question: { de: 'Closure Frage', en: 'Closure question' }, answer: { de: 'Schließt Scope ein', en: 'Captures scope' } }),
    buildQuestion(2, { category: 'react', explanation: { de: 'Hooks Erklärung', en: 'Hooks explanation' } }),
    buildQuestion(3, { category: 'typescript', answer: { de: 'Typen helfen', en: 'Types help' } }),
    buildQuestion(4, { category: 'react', answer: { de: 'Rendern optimieren', en: 'Optimize rendering' } }),
  ]

  it('filters by language, search term, and marked questions', () => {
    const searchIndex = buildQuestionSearchIndex(questions)

    const result = filterQuestions({
      questions,
      searchIndex,
      category: 'all',
      language: 'de',
      markedOnly: true,
      markedIdSet: new Set([1, 4]),
      search: 'rendern',
    })

    expect(result.map((question) => question.id)).toEqual([4])
  })

  it('returns only the previous, current, and next questions', () => {
    const result = getVisibleQuestions(questions, 3)

    expect(result.map((question) => question.id)).toEqual([2, 3, 4])
  })

  it('returns an empty list when no question is selected', () => {
    expect(getVisibleQuestions([], null)).toEqual([])
    expect(getAdjacentQuestionId([], null, 'next')).toBeNull()
  })

  it('clamps navigation to valid bounds and counts matching questions', () => {
    expect(getAdjacentQuestionId(questions, 1, 'previous')).toBe(1)
    expect(getAdjacentQuestionId(questions, 4, 'next')).toBe(4)
    expect(countMatchingQuestions(questions, new Set([1, 3, 99]))).toBe(2)
  })
})
