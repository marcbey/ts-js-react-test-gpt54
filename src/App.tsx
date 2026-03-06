import { useRef } from 'react'
import './index.css'
import { CatalogPanel } from './components/CatalogPanel'
import { HeroPanel } from './components/HeroPanel'
import { QuestionDetail } from './components/QuestionDetail'
import { languageCopy } from './constants/interviewUi'
import { interviewQuestions } from './data/interviewQuestions'
import { useInterviewTrainer } from './hooks/useInterviewTrainer'

function App() {
  const questionTopRef = useRef<HTMLDivElement | null>(null)
  const trainer = useInterviewTrainer(interviewQuestions)
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
        totalCount={interviewQuestions.length}
      />

      <main className={trainer.isCatalogCollapsed ? 'workspace-grid sidebar-collapsed' : 'workspace-grid'}>
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
          selectedQuestionId={trainer.selectedQuestion.id}
          totalQuestions={interviewQuestions.length}
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
          onToggleMark={() => trainer.toggleMarked(trainer.selectedQuestion.id)}
          question={trainer.selectedQuestion}
          questionTopRef={questionTopRef}
          revealedCount={trainer.revealedCount}
          selectedIndex={trainer.selectedIndex}
        />
      </main>
    </div>
  )
}

export default App
