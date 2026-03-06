import { type UiCopy } from '../constants/interviewUi'

type QuestionActionsProps = {
  className?: string
  align: 'start' | 'end'
  copy: UiCopy
  isMarked: boolean
  indexLabel?: string
  onPrevious: () => void
  onNext: () => void
  onToggleMark: () => void
}

export const QuestionActions = ({
  className,
  align,
  copy,
  isMarked,
  indexLabel,
  onPrevious,
  onNext,
  onToggleMark,
}: QuestionActionsProps) => {
  const classes = ['question-actions', `question-actions-${align}`]
  if (className) classes.push(className)

  return (
    <div className={classes.join(' ')}>
      <button className="mark-button" onClick={onPrevious} type="button">
        {copy.previous}
      </button>
      <button className="mark-button" onClick={onNext} type="button">
        {copy.next}
      </button>
      <button className={isMarked ? 'mark-button active' : 'mark-button'} onClick={onToggleMark} type="button">
        {isMarked ? copy.unmarkQuestion : copy.markQuestion}
      </button>
      {indexLabel ? <div className="index-badge">{indexLabel}</div> : null}
    </div>
  )
}
