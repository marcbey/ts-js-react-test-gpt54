import { categoryLabels, categoryOrder, type UiCopy } from '../constants/interviewUi'
import type { CategoryFilter, InterviewQuestion, Language } from '../types'

type CatalogPanelProps = {
  copy: UiCopy
  language: Language
  category: CategoryFilter
  search: string
  markedOnly: boolean
  isCollapsed: boolean
  filteredQuestions: InterviewQuestion[]
  visibleQuestions: InterviewQuestion[]
  totalQuestions: number
  selectedQuestionId: number
  markedIdSet: ReadonlySet<number>
  revealedIdSet: ReadonlySet<number>
  onCategoryChange: (category: CategoryFilter) => void
  onSearchChange: (value: string) => void
  onToggleMarkedOnly: () => void
  onToggleCollapse: () => void
  onSelectQuestion: (questionId: number) => void
}

export const CatalogPanel = ({
  copy,
  language,
  category,
  search,
  markedOnly,
  isCollapsed,
  filteredQuestions,
  visibleQuestions,
  totalQuestions,
  selectedQuestionId,
  markedIdSet,
  revealedIdSet,
  onCategoryChange,
  onSearchChange,
  onToggleMarkedOnly,
  onToggleCollapse,
  onSelectQuestion,
}: CatalogPanelProps) => (
  <aside className={isCollapsed ? 'catalog-panel collapsed' : 'catalog-panel'}>
    <div className="catalog-topbar">
      {!isCollapsed ? (
        <div className="panel-heading">
          <div>
            <p className="section-label">{copy.questionList}</p>
            <h2>
              {filteredQuestions.length} / {totalQuestions}
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

    {!isCollapsed ? (
      <>
        <label className="search-field">
          <span>{copy.searchLabel}</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={copy.searchPlaceholder}
            type="search"
          />
        </label>

        <div className="category-row">
          <button className={category === 'all' ? 'filter-pill active' : 'filter-pill'} onClick={() => onCategoryChange('all')} type="button">
            {copy.all}
          </button>
          {categoryOrder.map((entry) => (
            <button
              key={entry}
              className={category === entry ? 'filter-pill active' : 'filter-pill'}
              onClick={() => onCategoryChange(entry)}
              type="button"
            >
              {categoryLabels[entry][language]}
            </button>
          ))}
          <button className={markedOnly ? 'filter-pill active' : 'filter-pill'} onClick={onToggleMarkedOnly} type="button">
            {copy.markedOnly}
          </button>
        </div>

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
      </>
    ) : null}
  </aside>
)
