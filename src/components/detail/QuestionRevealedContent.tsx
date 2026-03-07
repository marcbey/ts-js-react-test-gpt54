import { Suspense, lazy } from 'react'
import type { UiCopy } from '../../constants/interviewUi'
import type { InterviewQuestion, Language } from '../../types'
import { TextBlocks } from '../TextBlocks'

const LazySyntaxCodeBlock = lazy(async () => {
  const module = await import('../../lib/codeHighlight')
  return { default: module.SyntaxCodeBlock }
})

type QuestionRevealedContentProps = {
  copy: UiCopy
  language: Language
  question: InterviewQuestion
}

export const QuestionRevealedContent = ({
  copy,
  language,
  question,
}: QuestionRevealedContentProps) => (
  <div className="detail-stack">
    <article className="content-card answer-card">
      <p className="section-label">{copy.answer}</p>
      <TextBlocks text={question.answer[language]} />
    </article>

    <article className="content-card example-card">
      <div className="example-header">
        <div>
          <p className="section-label">{copy.example}</p>
          <h3>{question.exampleTitle[language]}</h3>
        </div>
      </div>
      <Suspense
        fallback={
          <pre className="example-code example-code-fallback">
            <code>{question.exampleCode}</code>
          </pre>
        }
      >
        <LazySyntaxCodeBlock category={question.category} code={question.exampleCode} />
      </Suspense>
      <p className="copy-block">{question.exampleExplanation[language]}</p>
    </article>

    <article className="content-card deep-dive-card">
      <p className="section-label">{copy.explanation}</p>
      <TextBlocks text={question.explanation[language]} />
    </article>

    <article className="content-card resources-card">
      <p className="section-label">{copy.resources}</p>
      <div className="resource-grid">
        {question.resources.map((resource) => (
          <a href={resource.url} key={resource.url} target="_blank" rel="noreferrer">
            <span>{resource.label}</span>
            <strong>{copy.openResource}</strong>
          </a>
        ))}
      </div>
    </article>
  </div>
)
