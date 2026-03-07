import { categoryLabels, type UiCopy } from '../../constants/interviewUi'
import type { InterviewQuestion, Language } from '../../types'
import { QuestionActions } from '../QuestionActions'

type QuestionDetailHeaderProps = {
  copy: UiCopy
  language: Language
  question: InterviewQuestion
  selectedIndex: number
  filteredCount: number
  isMarked: boolean
  onLanguageChange: (language: Language) => void
  onPrevious: () => void
  onNext: () => void
  onToggleMark: () => void
}

export const QuestionDetailHeader = ({
  copy,
  language,
  question,
  selectedIndex,
  filteredCount,
  isMarked,
  onLanguageChange,
  onPrevious,
  onNext,
  onToggleMark,
}: QuestionDetailHeaderProps) => (
  <div className="detail-topline">
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
)
