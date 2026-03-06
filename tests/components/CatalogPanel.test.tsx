import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { uiCopyDe } from '../helpers/interviewFixtures'
import { buildInterviewQuestion } from '../helpers/interviewFixtures'
import { CatalogPanel } from '../../src/components/CatalogPanel'

describe('CatalogPanel', () => {
  it('renders visible questions and marks active, marked, and revealed entries', async () => {
    const user = userEvent.setup()
    const onSelectQuestion = vi.fn()
    const onToggleMarkedOnly = vi.fn()

    render(
      <CatalogPanel
        category="all"
        copy={uiCopyDe}
        filteredQuestions={[buildInterviewQuestion(1), buildInterviewQuestion(2)]}
        isCollapsed={false}
        language="de"
        markedIdSet={new Set([2])}
        markedOnly={false}
        onCategoryChange={vi.fn()}
        onSearchChange={vi.fn()}
        onSelectQuestion={onSelectQuestion}
        onToggleCollapse={vi.fn()}
        onToggleMarkedOnly={onToggleMarkedOnly}
        revealedIdSet={new Set([1])}
        search=""
        selectedQuestionId={1}
        totalQuestions={100}
        visibleQuestions={[buildInterviewQuestion(1), buildInterviewQuestion(2)]}
      />,
    )

    expect(screen.getByRole('button', { name: /Frage 1/i })).toHaveClass('active')
    expect(screen.getByText(uiCopyDe.marked)).toBeInTheDocument()
    expect(screen.getByText(uiCopyDe.revealed)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Frage 2/i }))
    await user.click(screen.getByRole('button', { name: uiCopyDe.markedOnly }))

    expect(onSelectQuestion).toHaveBeenCalledWith(2)
    expect(onToggleMarkedOnly).toHaveBeenCalledTimes(1)
  })

  it('shows the empty state when no questions match the current filters', () => {
    render(
      <CatalogPanel
        category="all"
        copy={uiCopyDe}
        filteredQuestions={[]}
        isCollapsed={false}
        language="de"
        markedIdSet={new Set()}
        markedOnly={false}
        onCategoryChange={vi.fn()}
        onSearchChange={vi.fn()}
        onSelectQuestion={vi.fn()}
        onToggleCollapse={vi.fn()}
        onToggleMarkedOnly={vi.fn()}
        revealedIdSet={new Set()}
        search=""
        selectedQuestionId={1}
        totalQuestions={100}
        visibleQuestions={[]}
      />,
    )

    expect(screen.getByText(uiCopyDe.empty)).toBeInTheDocument()
  })
})
