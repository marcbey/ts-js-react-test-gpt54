import type { UiCopy } from '../constants/interviewUi'
import type { CategoryFilter, InterviewQuestion, Language } from '../types'
import { CatalogFilters } from './catalog/CatalogFilters'
import { CatalogHeader } from './catalog/CatalogHeader'
import { CatalogQuestionList } from './catalog/CatalogQuestionList'

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
  selectedQuestionId: number | null
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
    <CatalogHeader
      copy={copy}
      filteredCount={filteredQuestions.length}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      totalQuestions={totalQuestions}
    />

    {!isCollapsed ? (
      <>
        <CatalogFilters
          category={category}
          copy={copy}
          language={language}
          markedOnly={markedOnly}
          onCategoryChange={onCategoryChange}
          onSearchChange={onSearchChange}
          onToggleMarkedOnly={onToggleMarkedOnly}
          search={search}
        />

        <CatalogQuestionList
          copy={copy}
          filteredQuestions={filteredQuestions}
          language={language}
          markedIdSet={markedIdSet}
          onSelectQuestion={onSelectQuestion}
          revealedIdSet={revealedIdSet}
          selectedQuestionId={selectedQuestionId}
          visibleQuestions={visibleQuestions}
        />
      </>
    ) : null}
  </aside>
)
