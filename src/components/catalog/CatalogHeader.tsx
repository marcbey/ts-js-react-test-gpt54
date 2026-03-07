import type { UiCopy } from '../../constants/interviewUi'

type CatalogHeaderProps = {
  copy: UiCopy
  filteredCount: number
  totalQuestions: number
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export const CatalogHeader = ({
  copy,
  filteredCount,
  totalQuestions,
  isCollapsed,
  onToggleCollapse,
}: CatalogHeaderProps) => (
  <div className="catalog-topbar">
    {!isCollapsed ? (
      <div className="panel-heading">
        <div>
          <p className="section-label">{copy.questionList}</p>
          <h2>
            {filteredCount} / {totalQuestions}
          </h2>
        </div>
        <p className="panel-copy">{copy.prompt}</p>
      </div>
    ) : null}

    <button
      aria-label={isCollapsed ? copy.expandCatalog : copy.collapseCatalog}
      className="catalog-toggle"
      onClick={onToggleCollapse}
      type="button"
    >
      {isCollapsed ? '>' : '<'}
    </button>
  </div>
)
