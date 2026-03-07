import type { UiCopy } from '../../constants/interviewUi'
import type { InterviewQuestion, Language } from '../../types'

type LockedQuestionCardProps = {
  copy: UiCopy
  language: Language
  question: InterviewQuestion
}

export const LockedQuestionCard = ({ copy, language, question }: LockedQuestionCardProps) => (
  <article className="content-card locked-card">
    <p className="section-label">{copy.answer}</p>
    <h3>{question.question[language]}</h3>
    <p className="copy-block">{copy.lockedPrompt}</p>
  </article>
)
