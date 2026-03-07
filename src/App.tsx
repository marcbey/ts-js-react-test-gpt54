import { useRef } from 'react'
import { CatalogPanel } from './components/CatalogPanel'
import { HeroPanel } from './components/HeroPanel'
import { QuestionDetail } from './components/QuestionDetail'
import { StatusPanel } from './components/StatusPanel'
import { languageCopy } from './constants/interviewUi'
import { totalInterviewQuestionCount } from './data/interviewQuestionMeta'
import { useInterviewQuestions } from './hooks/useInterviewQuestions'
import { useInterviewTrainer } from './hooks/useInterviewTrainer'

const workspaceClassName = (isCollapsed: boolean) =>
  isCollapsed ? 'workspace-grid sidebar-collapsed' : 'workspace-grid'

const LoadedInterviewApp = ({ questions }: { questions: Awaited<ReturnType<typeof useInterviewQuestions>>['questions'] }) => {
  const questionTopRef = useRef<HTMLDivElement | null>(null)
  const trainer = useInterviewTrainer(questions)
  const copy = languageCopy[trainer.language]

  const scrollToQuestion = () => {
    window.requestAnimationFrame(() => {
      questionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <HeroPanel
        copy={copy}
        revealedCount={trainer.revealedIds.length}
        shownCount={trainer.filteredQuestions.length}
        totalCount={questions.length}
      />

      <main className={workspaceClassName(trainer.isCatalogCollapsed)}>
        <CatalogPanel
          category={trainer.category}
          copy={copy}
          filteredQuestions={trainer.filteredQuestions}
          isCollapsed={trainer.isCatalogCollapsed}
          language={trainer.language}
          markedIdSet={trainer.markedIdSet}
          markedOnly={trainer.markedOnly}
          onCategoryChange={trainer.setCategory}
          onSearchChange={trainer.setSearch}
          onSelectQuestion={trainer.selectQuestion}
          onToggleCollapse={trainer.toggleCatalogCollapsed}
          onToggleMarkedOnly={() => trainer.setMarkedOnly((current) => !current)}
          revealedIdSet={trainer.revealedIdSet}
          search={trainer.search}
          selectedQuestionId={trainer.selectedQuestion?.id ?? null}
          totalQuestions={questions.length}
          visibleQuestions={trainer.visibleQuestions}
        />

        <QuestionDetail
          copy={copy}
          filteredCount={trainer.filteredQuestions.length}
          isMarked={trainer.isMarked}
          isRevealed={trainer.isRevealed}
          language={trainer.language}
          onLanguageChange={trainer.setLanguage}
          onNext={() => trainer.moveSelection('next')}
          onNextAndScroll={() => {
            trainer.moveSelection('next')
            scrollToQuestion()
          }}
          onPrevious={() => trainer.moveSelection('previous')}
          onReveal={trainer.revealCurrent}
          onToggleMark={() => {
            if (!trainer.selectedQuestion) return
            trainer.toggleMarked(trainer.selectedQuestion.id)
          }}
          question={trainer.selectedQuestion}
          questionTopRef={questionTopRef}
          revealedCount={trainer.revealedCount}
          selectedIndex={trainer.selectedIndex}
        />
      </main>
    </div>
  )
}

const App = () => {
  const questionState = useInterviewQuestions()
  const loadingCopy = languageCopy.de

  if (questionState.status === 'loading') {
    return (
      <div className="app-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <HeroPanel
          copy={loadingCopy}
          revealedCount={0}
          shownCount={0}
          totalCount={totalInterviewQuestionCount}
        />
        <main className="workspace-grid loading-grid">
          <StatusPanel copy={loadingCopy.loadingDescription} title={loadingCopy.loadingQuestions} />
        </main>
      </div>
    )
  }

  if (questionState.status === 'error') {
    return (
      <div className="app-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <HeroPanel
          copy={loadingCopy}
          revealedCount={0}
          shownCount={0}
          totalCount={totalInterviewQuestionCount}
        />
        <main className="workspace-grid loading-grid">
          <StatusPanel copy={loadingCopy.loadErrorDescription} title={loadingCopy.loadErrorTitle} />
        </main>
      </div>
    )
  }

  return <LoadedInterviewApp questions={questionState.questions} />
}

export default App
