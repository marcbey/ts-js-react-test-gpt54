import { type UiCopy } from '../constants/interviewUi'
import type { Language } from '../types'

type HeroPanelProps = {
  copy: UiCopy
  language: Language
  onLanguageChange: (language: Language) => void
  revealedCount: number
  shownCount: number
  totalCount: number
}

export const HeroPanel = ({
  copy,
  language,
  onLanguageChange,
  revealedCount,
  shownCount,
  totalCount,
}: HeroPanelProps) => (
  <header className="hero-panel">
    <p className="eyebrow hero-eyebrow">{copy.eyebrow}</p>
    <h1 className="hero-title">{copy.title}</h1>
    <p className="hero-copy">{copy.subtitle}</p>
    <div className="hero-controls">
      <div className="language-switch" aria-label={copy.language}>
        <button
          className={language === 'de' ? 'toggle-button active' : 'toggle-button'}
          onClick={() => onLanguageChange('de')}
          type="button"
        >
          DE
        </button>
        <button
          className={language === 'en' ? 'toggle-button active' : 'toggle-button'}
          onClick={() => onLanguageChange('en')}
          type="button"
        >
          EN
        </button>
      </div>
      <div className="stats-grid">
        <article className="stat-card">
          <span>{copy.progress}</span>
          <strong>{revealedCount}</strong>
          <small>{copy.revealed}</small>
        </article>
        <article className="stat-card">
          <span>{copy.shown}</span>
          <strong>{shownCount}</strong>
          <small>
            {copy.of} {totalCount}
          </small>
        </article>
      </div>
    </div>
  </header>
)
