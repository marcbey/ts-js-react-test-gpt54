import { categoryLabels, type UiCopy } from '../../constants/interviewUi'
import type { InterviewQuestion, Language } from '../../types'

type CatalogQuestionListProps = {
  copy: UiCopy
  language: Language
  filteredQuestions: InterviewQuestion[]
  visibleQuestions: InterviewQuestion[]
  selectedQuestionId: number | null
  markedIdSet: ReadonlySet<number>
  revealedIdSet: ReadonlySet<number>
  onSelectQuestion: (questionId: number) => void
}

export const CatalogQuestionList = ({
  copy,
  language,
  filteredQuestions,
  visibleQuestions,
  selectedQuestionId,
  markedIdSet,
  revealedIdSet,
  onSelectQuestion,
}: CatalogQuestionListProps) => (
  <div className="question-list" role="list">
    {filteredQuestions.length === 0 ? <p className="empty-state">{copy.empty}</p> : null}
    {visibleQuestions.map((question) => {
      const isActive = question.id === selectedQuestionId
      const isSolved = revealedIdSet.has(question.id)
      const isMarked = markedIdSet.has(question.id)

      return (
        <button
          key={question.id}
          className={isActive ? 'question-chip active' : 'question-chip'}
          onClick={() => onSelectQuestion(question.id)}
          type="button"
        >
          <span className="chip-meta">
            <span>{String(question.id).padStart(3, '0')}</span>
            <span>{categoryLabels[question.category][language]}</span>
            {isMarked ? <span className="marked-dot">{copy.marked}</span> : null}
            {isSolved ? <span className="solved-dot">{copy.revealed}</span> : null}
          </span>
          <strong>{question.question[language]}</strong>
        </button>
      )
    })}
  </div>
)
