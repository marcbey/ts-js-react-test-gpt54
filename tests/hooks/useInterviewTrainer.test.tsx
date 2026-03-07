import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { buildInterviewQuestion } from '../helpers/interviewFixtures'
import { useInterviewTrainer } from '../../src/hooks/useInterviewTrainer'

const questions = [
  buildInterviewQuestion(1, { question: { de: 'Erste Frage', en: 'First question' } }),
  buildInterviewQuestion(2, { question: { de: 'Zweite Frage', en: 'Second question' } }),
  buildInterviewQuestion(3, { question: { de: 'Dritte Frage', en: 'Third question' } }),
]

describe('useInterviewTrainer', () => {
  it('reveals the current question and hides it again after selecting another question', () => {
    const { result } = renderHook(() => useInterviewTrainer(questions))

    act(() => {
      result.current.revealCurrent()
    })

    expect(result.current.isRevealed).toBe(true)
    expect(result.current.revealedIds).toContain(1)

    act(() => {
      result.current.selectQuestion(2)
    })

    expect(result.current.selectedQuestion?.id).toBe(2)
    expect(result.current.isRevealed).toBe(false)
    expect(result.current.revealedIds).toContain(1)
  })

  it('filters marked questions without losing mark state', () => {
    const { result } = renderHook(() => useInterviewTrainer(questions))

    act(() => {
      result.current.toggleMarked(2)
      result.current.selectQuestion(2)
      result.current.setMarkedOnly(true)
    })

    expect(result.current.isMarked).toBe(true)
    expect(result.current.filteredQuestions.map((question) => question.id)).toEqual([2])
    expect(result.current.visibleQuestions.map((question) => question.id)).toEqual([2])
  })

  it('persists language and collapses the catalog', () => {
    const { result } = renderHook(() => useInterviewTrainer(questions))

    act(() => {
      result.current.setLanguage('en')
      result.current.toggleCatalogCollapsed()
    })

    expect(result.current.language).toBe('en')
    expect(result.current.isCatalogCollapsed).toBe(true)
    expect(window.localStorage.getItem('interview-language')).toBe('en')
    expect(window.localStorage.getItem('interview-catalog-collapsed')).toBe('true')
  })

  it('persists and restores the selected question', () => {
    const { result, unmount } = renderHook(() => useInterviewTrainer(questions))

    act(() => {
      result.current.selectQuestion(3)
    })

    expect(window.localStorage.getItem('interview-selected-question')).toBe('3')

    unmount()

    const restored = renderHook(() => useInterviewTrainer(questions))

    expect(restored.result.current.selectedQuestion?.id).toBe(3)
  })
})
