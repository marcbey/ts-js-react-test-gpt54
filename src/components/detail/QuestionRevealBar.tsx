import type { UiCopy } from '../../constants/interviewUi'

type QuestionRevealBarProps = {
  copy: UiCopy
  isRevealed: boolean
  revealedCount: number
  filteredCount: number
  onReveal: () => void
}

export const QuestionRevealBar = ({
  copy,
  isRevealed,
  revealedCount,
  filteredCount,
  onReveal,
}: QuestionRevealBarProps) => (
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
)
