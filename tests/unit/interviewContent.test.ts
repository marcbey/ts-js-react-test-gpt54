import { describe, expect, it } from 'vitest'
import { interviewQuestionExplanationDetails } from '../../src/data/interviewQuestionExplanationDetails'
import { interviewQuestions } from '../../src/data/interviewQuestions'

const getQuestion = (id: number) => {
  const question = interviewQuestions.find((entry) => entry.id === id)

  expect(question).toBeDefined()

  return question!
}

describe('interview question content', () => {
  it('expands every explanation into multiple paragraphs', () => {
    for (const question of interviewQuestions) {
      expect(question.explanation.de.split('\n\n')).toHaveLength(3)
      expect(question.explanation.en.split('\n\n')).toHaveLength(3)
    }
  })

  it('provides question-specific explanation details for all 148 questions', () => {
    expect(Object.keys(interviewQuestionExplanationDetails)).toHaveLength(148)

    for (const question of interviewQuestions) {
      expect(interviewQuestionExplanationDetails[question.id]).toBeDefined()
      expect(interviewQuestionExplanationDetails[question.id].de.length).toBeGreaterThan(80)
      expect(interviewQuestionExplanationDetails[question.id].en.length).toBeGreaterThan(80)
    }
  })

  it('keeps the `this` answer, explanation, and example aligned', () => {
    const question = getQuestion(7)

    expect(question.answer.de).not.toContain('Ein Senior sollte')
    expect(question.answer.en).not.toContain('A senior engineer should')
    expect(question.explanation.de).toContain('Event-Handler')
    expect(question.explanation.de).toContain('Klassenmethoden')
    expect(question.explanation.de).toContain('Callbacks')
    expect(question.explanation.en).toContain('event handlers')
    expect(question.explanation.en).toContain('class methods')
    expect(question.explanation.en).toContain('callbacks')
    expect(question.exampleTitle.de).toContain('Arrow Function')
    expect(question.exampleCode).toContain('function ()')
    expect(question.exampleCode).toContain('=>')
  })

  it('documents the strict-equality default and the `== null` exception', () => {
    const question = getQuestion(16)

    expect(question.answer.de).toContain('`===`')
    expect(question.answer.de).toContain('== null')
    expect(question.explanation.de).toContain('`== null`')
    expect(question.answer.en).toContain('`===`')
    expect(question.answer.en).toContain('== null')
    expect(question.explanation.en).toContain('`== null`')
  })

  it('explains that optional chaining does not replace validation', () => {
    const question = getQuestion(18)

    expect(question.answer.de).toContain('saubere Validierung')
    expect(question.answer.en).toContain('proper validation')
    expect(question.explanation.de).toContain('früh und laut scheitern')
    expect(question.explanation.en).toContain('fail early and loudly')
    expect(question.exampleCode).toContain('??')
  })

  it('distinguishes readonly type safety from runtime protection', () => {
    const question = getQuestion(48)

    expect(question.answer.de).toContain('kein tiefer Laufzeitschutz')
    expect(question.answer.en).toContain('not deep runtime protection')
    expect(question.explanation.de).toContain('Object.freeze')
    expect(question.explanation.en).toContain('Object.freeze')
  })

  it('adds the tooling and architecture category with the new question range', () => {
    const toolingQuestions = interviewQuestions.filter((question) => question.category === 'toolingArchitecture')

    expect(toolingQuestions).toHaveLength(33)
    expect(toolingQuestions[0]?.id).toBe(101)
    expect(toolingQuestions.at(-1)?.id).toBe(133)
  })

  it('adds the OWASP category with the new question range', () => {
    const owaspQuestions = interviewQuestions.filter((question) => question.category === 'owasp')

    expect(owaspQuestions).toHaveLength(15)
    expect(owaspQuestions[0]?.id).toBe(134)
    expect(owaspQuestions.at(-1)?.id).toBe(148)
  })
})
