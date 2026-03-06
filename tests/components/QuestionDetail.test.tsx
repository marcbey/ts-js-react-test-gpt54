import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { buildInterviewQuestion, uiCopyDe } from '../helpers/interviewFixtures'
import { QuestionDetail } from '../../src/components/QuestionDetail'

describe('QuestionDetail', () => {
  it('renders the locked state and wires the action buttons', async () => {
    const user = userEvent.setup()
    const onPrevious = vi.fn()
    const onNext = vi.fn()
    const onNextAndScroll = vi.fn()
    const onToggleMark = vi.fn()

    render(
      <QuestionDetail
        copy={uiCopyDe}
        filteredCount={100}
        isMarked={false}
        isRevealed={false}
        language="de"
        onLanguageChange={vi.fn()}
        onNext={onNext}
        onNextAndScroll={onNextAndScroll}
        onPrevious={onPrevious}
        onReveal={vi.fn()}
        onToggleMark={onToggleMark}
        question={buildInterviewQuestion(1)}
        questionTopRef={createRef<HTMLDivElement>()}
        revealedCount={0}
        selectedIndex={0}
      />,
    )

    expect(screen.getByText(uiCopyDe.lockedPrompt)).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: uiCopyDe.previous })[0])
    await user.click(screen.getAllByRole('button', { name: uiCopyDe.next })[1])
    await user.click(screen.getAllByRole('button', { name: uiCopyDe.markQuestion })[0])

    expect(onPrevious).toHaveBeenCalledTimes(1)
    expect(onNextAndScroll).toHaveBeenCalledTimes(1)
    expect(onToggleMark).toHaveBeenCalledTimes(1)
  })

  it('renders answer, example, deep dive, and resources when revealed', () => {
    const question = buildInterviewQuestion(3, {
      answer: { de: 'Antwort A\n\nAntwort B', en: 'Answer A\n\nAnswer B' },
      explanation: { de: 'Erklärung A\n\nErklärung B', en: 'Explanation A\n\nExplanation B' },
    })

    const { container } = render(
      <QuestionDetail
        copy={uiCopyDe}
        filteredCount={10}
        isMarked={true}
        isRevealed={true}
        language="de"
        onLanguageChange={vi.fn()}
        onNext={vi.fn()}
        onNextAndScroll={vi.fn()}
        onPrevious={vi.fn()}
        onReveal={vi.fn()}
        onToggleMark={vi.fn()}
        question={question}
        questionTopRef={createRef<HTMLDivElement>()}
        revealedCount={4}
        selectedIndex={2}
      />,
    )

    expect(screen.getByText('Antwort A')).toBeInTheDocument()
    expect(screen.getByText('Antwort B')).toBeInTheDocument()
    expect(screen.getByText(question.exampleTitle.de)).toBeInTheDocument()
    expect(container.querySelector('.example-code code')?.textContent).toBe(question.exampleCode)
    expect(screen.getByText('Erklärung A')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Resource 3/i })).toHaveAttribute('href', 'https://example.com/3')
    expect(screen.getAllByRole('button', { name: uiCopyDe.unmarkQuestion })).toHaveLength(2)
  })
})
