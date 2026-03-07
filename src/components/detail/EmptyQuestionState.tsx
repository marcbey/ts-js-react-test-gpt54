import type { UiCopy } from '../../constants/interviewUi'

type EmptyQuestionStateProps = {
  copy: UiCopy
}

export const EmptyQuestionState = ({ copy }: EmptyQuestionStateProps) => (
  <article className="content-card empty-detail-state">
    <p className="section-label">{copy.questionList}</p>
    <h3>{copy.empty}</h3>
    <p className="copy-block">{copy.emptyDetail}</p>
  </article>
)
