import type { RefObject } from 'react'
import { categoryLabels, type UiCopy } from '../constants/interviewUi'
import { SyntaxCodeBlock } from '../lib/codeHighlight'
import type { InterviewQuestion, Language } from '../types'
import { QuestionActions } from './QuestionActions'
import { TextBlocks } from './TextBlocks'

type QuestionDetailProps = {
  questionTopRef: RefObject<HTMLDivElement | null>
  copy: UiCopy
  language: Language
  question: InterviewQuestion
  selectedIndex: number
  filteredCount: number
  revealedCount: number
  isMarked: boolean
  isRevealed: boolean
  onLanguageChange: (language: Language) => void
  onPrevious: () => void
  onNext: () => void
  onNextAndScroll: () => void
  onReveal: () => void
  onToggleMark: () => void
}

export const QuestionDetail = ({
  questionTopRef,
  copy,
  language,
  question,
  selectedIndex,
  filteredCount,
  revealedCount,
  isMarked,
  isRevealed,
  onLanguageChange,
  onPrevious,
  onNext,
  onNextAndScroll,
  onReveal,
  onToggleMark,
}: QuestionDetailProps) => (
  <section className="detail-panel">
    <div className="detail-topline" ref={questionTopRef}>
      <QuestionActions
        align="end"
        className="detail-top-actions"
        copy={copy}
        indexLabel={`${Math.max(selectedIndex + 1, 1)} / ${Math.max(filteredCount, 1)}`}
        isMarked={isMarked}
        language={language}
        languageGroupLabel={copy.language}
        onLanguageChange={onLanguageChange}
        onNext={onNext}
        onPrevious={onPrevious}
        onToggleMark={onToggleMark}
      />
      <div className="detail-question">
        <p className="section-label">{categoryLabels[question.category][language]}</p>
        <h2>{question.question[language]}</h2>
      </div>
    </div>

    <div className="reveal-box">
      <button className={isRevealed ? 'reveal-button revealed' : 'reveal-button'} onClick={onReveal} type="button">
        {isRevealed ? copy.revealed : copy.reveal}
      </button>
      <div className="reveal-copy">
        <span>{copy.solved}</span>
        <strong>
          {revealedCount} / {filteredCount}
        </strong>
      </div>
    </div>

    {isRevealed ? (
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
          <SyntaxCodeBlock category={question.category} code={question.exampleCode} />
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
    ) : (
      <article className="content-card locked-card">
        <p className="section-label">{copy.answer}</p>
        <h3>{question.question[language]}</h3>
        <p className="copy-block">{copy.lockedPrompt}</p>
      </article>
    )}

    <QuestionActions
      align="start"
      className="nav-row"
      copy={copy}
      isMarked={isMarked}
      onNext={onNextAndScroll}
      onPrevious={onPrevious}
      onToggleMark={onToggleMark}
    />
  </section>
)
