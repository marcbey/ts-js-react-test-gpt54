import type { RefObject } from 'react'
import type { UiCopy } from '../constants/interviewUi'
import type { InterviewQuestion, Language } from '../types'
import { EmptyQuestionState } from './detail/EmptyQuestionState'
import { LockedQuestionCard } from './detail/LockedQuestionCard'
import { QuestionDetailHeader } from './detail/QuestionDetailHeader'
import { QuestionRevealBar } from './detail/QuestionRevealBar'
import { QuestionRevealedContent } from './detail/QuestionRevealedContent'
import { QuestionActions } from './QuestionActions'

type QuestionDetailProps = {
  questionTopRef: RefObject<HTMLDivElement | null>
  copy: UiCopy
  language: Language
  question: InterviewQuestion | null
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

const EmptyQuestionDetail = ({ copy }: { copy: UiCopy }) => (
  <section className="detail-panel">
    <EmptyQuestionState copy={copy} />
  </section>
)

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
}: QuestionDetailProps) => {
  if (!question) {
    return <EmptyQuestionDetail copy={copy} />
  }

  return (
    <section className="detail-panel">
      <div ref={questionTopRef}>
        <QuestionDetailHeader
          copy={copy}
          filteredCount={filteredCount}
          isMarked={isMarked}
          language={language}
          onLanguageChange={onLanguageChange}
          onNext={onNext}
          onPrevious={onPrevious}
          onToggleMark={onToggleMark}
          question={question}
          selectedIndex={selectedIndex}
        />
      </div>

      <QuestionRevealBar
        copy={copy}
        filteredCount={filteredCount}
        isRevealed={isRevealed}
        onReveal={onReveal}
        revealedCount={revealedCount}
      />

      {isRevealed ? (
        <QuestionRevealedContent copy={copy} language={language} question={question} />
      ) : (
        <LockedQuestionCard copy={copy} language={language} question={question} />
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
}
