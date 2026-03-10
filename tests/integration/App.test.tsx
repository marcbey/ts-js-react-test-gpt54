import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('App', () => {
  it('switches between German and English', async () => {
    const user = userEvent.setup()
    render(<App />)

    await screen.findByRole('button', { name: 'EN' })
    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(await screen.findByRole('heading', { level: 1, name: '148 questions for JS, TS, React, tooling, architecture, and OWASP' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Next question' })).toHaveLength(2)
  })

  it('hides answers again when returning to a question', async () => {
    const user = userEvent.setup()
    render(<App />)

    await screen.findByRole('button', { name: 'Antwort anzeigen' })
    await user.click(screen.getByRole('button', { name: 'Antwort anzeigen' }))
    expect(screen.getByText(/`var` ist funktionsscoped/i)).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: 'Nächste Frage' })[0])
    await user.click(screen.getAllByRole('button', { name: 'Vorherige Frage' })[0])

    expect(screen.getByRole('button', { name: 'Antwort anzeigen' })).toBeInTheDocument()
    expect(screen.queryByText(/`var` ist funktionsscoped/i)).not.toBeInTheDocument()
  })

  it('filters the catalog down to marked questions', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(await screen.findAllByRole('button', { name: 'Frage markieren' })).toHaveLength(2)
    await user.click(screen.getAllByRole('button', { name: 'Frage markieren' })[0])
    await user.click(screen.getByRole('button', { name: 'Nur markierte' }))

    expect(screen.getByRole('heading', { level: 2, name: '1 / 148' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Closure/i })).not.toBeInTheDocument()
  })

  it('restores the previously selected question from localStorage', async () => {
    window.localStorage.setItem('interview-selected-question', '2')

    render(<App />)

    expect(await screen.findByRole('heading', { level: 2, name: 'Was ist eine Closure und warum ist sie praktisch?' })).toBeInTheDocument()
  })

  it('shows an empty detail state when the search has no matches', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(await screen.findByRole('searchbox'), 'zzzz-no-hit')

    expect(await screen.findAllByText('Keine Fragen passen zum aktuellen Filter.')).toHaveLength(2)
    expect(screen.getByText('Passe Suche, Kategorie oder Markierungsfilter an, um wieder eine aktive Frage anzuzeigen.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Antwort anzeigen' })).not.toBeInTheDocument()
  })
})
