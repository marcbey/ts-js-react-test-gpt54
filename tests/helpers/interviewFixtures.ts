import { languageCopy } from '../../src/constants/interviewUi'
import type { InterviewQuestion } from '../../src/types'

export const uiCopyDe = languageCopy.de
export const uiCopyEn = languageCopy.en

export const buildInterviewQuestion = (
  id: number,
  overrides: Partial<InterviewQuestion> = {},
): InterviewQuestion => ({
  id,
  category: id % 3 === 0 ? 'react' : id % 2 === 0 ? 'typescript' : 'javascript',
  question: { de: `Frage ${id}`, en: `Question ${id}` },
  answer: { de: `Antwort ${id}`, en: `Answer ${id}` },
  exampleTitle: { de: `Beispiel ${id}`, en: `Example ${id}` },
  exampleExplanation: { de: `Erklärung ${id}`, en: `Explanation ${id}` },
  exampleCode: `const value${id} = ${id}`,
  explanation: { de: `Deep Dive ${id}`, en: `Deep Dive ${id}` },
  resources: [{ label: `Resource ${id}`, url: `https://example.com/${id}` }],
  ...overrides,
})
