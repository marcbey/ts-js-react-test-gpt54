import { categoryLabels, categoryOrder, type UiCopy } from '../../constants/interviewUi'
import type { CategoryFilter, Language } from '../../types'

type CatalogFiltersProps = {
  copy: UiCopy
  language: Language
  category: CategoryFilter
  search: string
  markedOnly: boolean
  onCategoryChange: (category: CategoryFilter) => void
  onSearchChange: (value: string) => void
  onToggleMarkedOnly: () => void
}

export const CatalogFilters = ({
  copy,
  language,
  category,
  search,
  markedOnly,
  onCategoryChange,
  onSearchChange,
  onToggleMarkedOnly,
}: CatalogFiltersProps) => (
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
  </>
)
