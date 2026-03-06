import { type UiCopy } from '../constants/interviewUi'
import type { Language } from '../types'

type QuestionActionsProps = {
  className?: string
  align: 'start' | 'end'
  copy: UiCopy
  isMarked: boolean
  indexLabel?: string
  language?: Language
  onLanguageChange?: (language: Language) => void
  languageGroupLabel?: string
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
  language,
  onLanguageChange,
  languageGroupLabel,
  onPrevious,
  onNext,
  onToggleMark,
}: QuestionActionsProps) => {
  const classes = ['question-actions', `question-actions-${align}`]
  const showLanguageSwitch = Boolean(language && onLanguageChange && languageGroupLabel)

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
      {showLanguageSwitch ? (
        <div aria-label={languageGroupLabel} className="language-switch question-language-switch">
          <button
            className={language === 'de' ? 'toggle-button active' : 'toggle-button'}
            onClick={() => onLanguageChange?.('de')}
            type="button"
          >
            DE
          </button>
          <button
            className={language === 'en' ? 'toggle-button active' : 'toggle-button'}
            onClick={() => onLanguageChange?.('en')}
            type="button"
          >
            EN
          </button>
        </div>
      ) : null}
    </div>
  )
}
