export type Language = 'de' | 'en'
export type Category = 'javascript' | 'typescript' | 'react'
export type CategoryFilter = Category | 'all'

export type LocalizedText = {
  de: string
  en: string
}

export type ResourceLink = {
  label: string
  url: string
}

export type InterviewQuestion = {
  id: number
  category: Category
  question: LocalizedText
  answer: LocalizedText
  exampleTitle: LocalizedText
  exampleExplanation: LocalizedText
  exampleCode: string
  explanation: LocalizedText
  resources: ResourceLink[]
}
