import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { interviewQuestions } from './data/interviewQuestions'
import type { Category, Language } from './types'

const languageCopy = {
  de: {
    eyebrow: 'Senior Interview Trainer',
    title: '100 Fragen fuer JavaScript, TypeScript und React',
    subtitle:
      'Trainiere typische Senior-Level-Interviewfragen. Jede Karte startet nur mit der Frage und blendet Antwort, Beispiel und Deep Dive erst auf Klick ein.',
    searchLabel: 'Suche',
    searchPlaceholder: 'Nach Thema, Begriff oder Konzept suchen',
    reveal: 'Antwort anzeigen',
    revealed: 'Antwort sichtbar',
    explanation: 'Ausfuehrliche Erklaerung',
    resources: 'Weiterfuehrende Quellen',
    questionList: 'Fragenkatalog',
    progress: 'Fortschritt',
    shown: 'Angezeigt',
    solved: 'Aufgedeckt',
    next: 'Naechste Frage',
    previous: 'Vorherige Frage',
    of: 'von',
    all: 'Alle',
    empty: 'Keine Fragen passen zum aktuellen Filter.',
    prompt: 'Waehle links eine Frage oder gehe mit den Navigationstasten durch den Katalog.',
    language: 'Sprache',
    answer: 'Kurzantwort',
    example: 'Beispiel',
  },
  en: {
    eyebrow: 'Senior Interview Trainer',
    title: '100 questions for JavaScript, TypeScript, and React',
    subtitle:
      'Practice senior-level interview prompts. Each card starts with the question only and reveals the answer, example, and deep dive on demand.',
    searchLabel: 'Search',
    searchPlaceholder: 'Search by topic, term, or concept',
    reveal: 'Reveal answer',
    revealed: 'Answer visible',
    explanation: 'Detailed explanation',
    resources: 'Further reading',
    questionList: 'Question bank',
    progress: 'Progress',
    shown: 'Shown',
    solved: 'Revealed',
    next: 'Next question',
    previous: 'Previous question',
    of: 'of',
    all: 'All',
    empty: 'No questions match the current filter.',
    prompt: 'Pick a question from the left or use the navigation buttons to move through the bank.',
    language: 'Language',
    answer: 'Short answer',
    example: 'Example',
  },
} as const

const categoryLabels: Record<Category, { de: string; en: string }> = {
  javascript: { de: 'JavaScript', en: 'JavaScript' },
  typescript: { de: 'TypeScript', en: 'TypeScript' },
  react: { de: 'React', en: 'React' },
}

const defaultQuestion = interviewQuestions[0]

const loadLanguage = (): Language => {
  const value = window.localStorage.getItem('interview-language')
  return value === 'en' ? 'en' : 'de'
}

const loadRevealed = (): number[] => {
  const value = window.localStorage.getItem('interview-revealed')
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === 'number') : []
  } catch {
    return []
  }
}

const renderParagraphs = (text: string) =>
  text.split('\n\n').map((paragraph) => (
    <p key={paragraph} className="copy-block">
      {paragraph}
    </p>
  ))

function App() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage())
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(defaultQuestion.id)
  const [revealedIds, setRevealedIds] = useState<number[]>(() => loadRevealed())

  const copy = languageCopy[language]

  useEffect(() => {
    window.localStorage.setItem('interview-language', language)
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('interview-revealed', JSON.stringify(revealedIds))
  }, [revealedIds])

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return interviewQuestions.filter((question) => {
      const categoryMatches = category === 'all' || question.category === category
      if (!categoryMatches) return false
      if (!normalizedSearch) return true

      const haystack = [
        question.question[language],
        question.answer[language],
        question.explanation[language],
        categoryLabels[question.category][language],
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedSearch)
    })
  }, [category, language, search])

  const selectedQuestion =
    filteredQuestions.find((question) => question.id === selectedId) ?? filteredQuestions[0] ?? defaultQuestion

  const selectedIndex = filteredQuestions.findIndex((question) => question.id === selectedQuestion.id)
  const isRevealed = revealedIds.includes(selectedQuestion.id)
  const revealedCount = filteredQuestions.filter((question) => revealedIds.includes(question.id)).length

  const moveSelection = (direction: 'previous' | 'next') => {
    if (filteredQuestions.length === 0) return
    const nextIndex =
      direction === 'next'
        ? Math.min(selectedIndex + 1, filteredQuestions.length - 1)
        : Math.max(selectedIndex - 1, 0)
    setSelectedId(filteredQuestions[nextIndex].id)
  }

  const revealCurrent = () => {
    if (revealedIds.includes(selectedQuestion.id)) return
    setRevealedIds((current) => [...current, selectedQuestion.id])
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="hero-panel">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-copy">{copy.subtitle}</p>
        </div>
        <div className="hero-controls">
          <div className="language-switch" aria-label={copy.language}>
            <button
              className={language === 'de' ? 'toggle-button active' : 'toggle-button'}
              onClick={() => setLanguage('de')}
              type="button"
            >
              DE
            </button>
            <button
              className={language === 'en' ? 'toggle-button active' : 'toggle-button'}
              onClick={() => setLanguage('en')}
              type="button"
            >
              EN
            </button>
          </div>
          <div className="stats-grid">
            <article className="stat-card">
              <span>{copy.progress}</span>
              <strong>{revealedIds.length}</strong>
              <small>{copy.revealed}</small>
            </article>
            <article className="stat-card">
              <span>{copy.shown}</span>
              <strong>{filteredQuestions.length}</strong>
              <small>
                {copy.of} {interviewQuestions.length}
              </small>
            </article>
          </div>
        </div>
      </header>

      <main className="workspace-grid">
        <aside className="catalog-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">{copy.questionList}</p>
              <h2>
                {filteredQuestions.length} / {interviewQuestions.length}
              </h2>
            </div>
            <p className="panel-copy">{copy.prompt}</p>
          </div>

          <label className="search-field">
            <span>{copy.searchLabel}</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchPlaceholder}
              type="search"
            />
          </label>

          <div className="category-row">
            <button
              className={category === 'all' ? 'filter-pill active' : 'filter-pill'}
              onClick={() => setCategory('all')}
              type="button"
            >
              {copy.all}
            </button>
            {(['javascript', 'typescript', 'react'] as const).map((entry) => (
              <button
                key={entry}
                className={category === entry ? 'filter-pill active' : 'filter-pill'}
                onClick={() => setCategory(entry)}
                type="button"
              >
                {categoryLabels[entry][language]}
              </button>
            ))}
          </div>

          <div className="question-list" role="list">
            {filteredQuestions.length === 0 ? <p className="empty-state">{copy.empty}</p> : null}
            {filteredQuestions.map((question) => {
              const active = question.id === selectedQuestion.id
              const solved = revealedIds.includes(question.id)

              return (
                <button
                  key={question.id}
                  className={active ? 'question-chip active' : 'question-chip'}
                  onClick={() => setSelectedId(question.id)}
                  type="button"
                >
                  <span className="chip-meta">
                    <span>{String(question.id).padStart(3, '0')}</span>
                    <span>{categoryLabels[question.category][language]}</span>
                    {solved ? <span className="solved-dot">{copy.revealed}</span> : null}
                  </span>
                  <strong>{question.question[language]}</strong>
                </button>
              )
            })}
          </div>
        </aside>

        <section className="detail-panel">
          <div className="detail-topline">
            <div>
              <p className="section-label">{categoryLabels[selectedQuestion.category][language]}</p>
              <h2>{selectedQuestion.question[language]}</h2>
            </div>
            <div className="index-badge">
              {Math.max(selectedIndex + 1, 1)} / {Math.max(filteredQuestions.length, 1)}
            </div>
          </div>

          <div className="reveal-box">
            <button
              className={isRevealed ? 'reveal-button revealed' : 'reveal-button'}
              onClick={revealCurrent}
              type="button"
            >
              {isRevealed ? copy.revealed : copy.reveal}
            </button>
            <div className="reveal-copy">
              <span>{copy.solved}</span>
              <strong>
                {revealedCount} / {filteredQuestions.length}
              </strong>
            </div>
          </div>

          {isRevealed ? (
            <div className="detail-stack">
              <article className="content-card answer-card">
                <p className="section-label">{copy.answer}</p>
                {renderParagraphs(selectedQuestion.answer[language])}
              </article>

              <article className="content-card example-card">
                <div className="example-header">
                  <div>
                    <p className="section-label">{copy.example}</p>
                    <h3>{selectedQuestion.exampleTitle[language]}</h3>
                  </div>
                </div>
                <pre>
                  <code>{selectedQuestion.exampleCode}</code>
                </pre>
                <p className="copy-block">{selectedQuestion.exampleExplanation[language]}</p>
              </article>

              <article className="content-card deep-dive-card">
                <p className="section-label">{copy.explanation}</p>
                {renderParagraphs(selectedQuestion.explanation[language])}
              </article>

              <article className="content-card resources-card">
                <p className="section-label">{copy.resources}</p>
                <div className="resource-grid">
                  {selectedQuestion.resources.map((resource) => (
                    <a href={resource.url} key={resource.url} target="_blank" rel="noreferrer">
                      <span>{resource.label}</span>
                      <strong>Open resource</strong>
                    </a>
                  ))}
                </div>
              </article>
            </div>
          ) : (
            <article className="content-card locked-card">
              <p className="section-label">{copy.answer}</p>
              <h3>{selectedQuestion.question[language]}</h3>
              <p className="copy-block">
                {language === 'de'
                  ? 'Die Karte bleibt bis zum Klick absichtlich zugeklappt, damit du die Antwort zuerst selbst formulierst.'
                  : 'The card stays intentionally closed until you click, so you can formulate your own answer first.'}
              </p>
            </article>
          )}

          <div className="nav-row">
            <button onClick={() => moveSelection('previous')} type="button">
              {copy.previous}
            </button>
            <button onClick={() => moveSelection('next')} type="button">
              {copy.next}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
