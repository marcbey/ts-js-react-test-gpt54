import { type UiCopy } from '../constants/interviewUi'

type HeroPanelProps = {
  copy: UiCopy
  revealedCount: number
  shownCount: number
  totalCount: number
}

export const HeroPanel = ({
  copy,
  revealedCount,
  shownCount,
  totalCount,
}: HeroPanelProps) => (
  <header className="hero-panel">
    <p className="eyebrow hero-eyebrow">{copy.eyebrow}</p>
    <h1 className="hero-title">{copy.title}</h1>
    <p className="hero-copy">{copy.subtitle}</p>
    <div className="hero-controls">
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
