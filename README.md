# Senior Interview Trainer

A bilingual React + TypeScript interview training app for senior frontend and full-stack web interviews.

## Deployment

- Production URL: [GitHub Pages](https://marcbey.github.io/ts-js-react-test-gpt54/)
- There is currently no documented `render.com` deployment URL in this repository.

## What the app does

- Shows 148 interview questions across five categories:
  - JavaScript
  - TypeScript
  - React
  - Tooling / Architecture
  - OWASP
- Supports German and English UI/content switching
- Starts each question in a locked state and reveals the answer on demand
- Includes:
  - short answer
  - code example with syntax highlighting
  - deep dive explanation
  - further reading links
- Lets you mark questions and filter by marked questions only
- Persists language, revealed progress, marks, and catalog collapse state in `localStorage`

## Tech stack

- React 19
- TypeScript 5
- Vite 7
- Vitest + Testing Library
- Playwright
- GitHub Actions
- GitHub Pages

## Getting started

### Prerequisites

- Node.js 22+ recommended
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

## Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: type-check and build production bundle
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint
- `npm run test:unit`: run Vitest unit/component/integration tests
- `npm run test:e2e`: run Playwright end-to-end tests
- `npm test`: run unit tests and E2E tests

## Project structure

```text
src/
  components/        UI building blocks
  constants/         localized UI copy and static config
  data/              interview question dataset
  hooks/             state and persistence hooks
  lib/               isolated library integrations
  utils/             pure business logic

tests/
  components/        component tests
  e2e/               Playwright browser tests
  helpers/           shared test fixtures/builders
  hooks/             hook tests
  integration/       app-level interaction tests
  unit/              pure logic tests
```

## Architecture

### Composition root

- [`src/App.tsx`](./src/App.tsx) wires together the top-level layout and the trainer hook.

### State

- [`src/hooks/useInterviewTrainer.ts`](./src/hooks/useInterviewTrainer.ts) manages UI state, filtering, navigation, marks, reveal behavior, and persistence.
- [`src/hooks/useLocalStorageState.ts`](./src/hooks/useLocalStorageState.ts) encapsulates localStorage-backed state.

### Pure logic

- [`src/utils/interviewState.ts`](./src/utils/interviewState.ts) contains filter, selection, visibility, and counting logic.
- This logic is intentionally kept pure so it can be unit tested without rendering React.

### UI components

- [`src/components/HeroPanel.tsx`](./src/components/HeroPanel.tsx)
- [`src/components/CatalogPanel.tsx`](./src/components/CatalogPanel.tsx)
- [`src/components/QuestionDetail.tsx`](./src/components/QuestionDetail.tsx)
- [`src/components/QuestionActions.tsx`](./src/components/QuestionActions.tsx)
- [`src/components/TextBlocks.tsx`](./src/components/TextBlocks.tsx)

## Testing strategy

The test suite is intentionally split by responsibility.

### Unit tests

Used for pure logic with no rendering involved.

Examples:
- filtering questions
- computing visible neighboring questions
- navigation bounds
- counting revealed/marked questions

Files:
- [`tests/unit/interviewState.test.ts`](./tests/unit/interviewState.test.ts)

### Hook tests

Used for stateful React logic that is still easier to validate below the full app level.

Examples:
- reveal state resets when moving to another question
- marked-only filtering
- localStorage persistence

Files:
- [`tests/hooks/useInterviewTrainer.test.tsx`](./tests/hooks/useInterviewTrainer.test.tsx)

### Component tests

Used for components with meaningful interaction or conditional rendering.

Examples:
- catalog interactions and visible states
- detail panel locked vs revealed state
- button wiring

Files:
- [`tests/components/CatalogPanel.test.tsx`](./tests/components/CatalogPanel.test.tsx)
- [`tests/components/QuestionDetail.test.tsx`](./tests/components/QuestionDetail.test.tsx)

### Integration tests

Used for larger user flows through the app UI without a real browser.

Files:
- [`tests/integration/App.test.tsx`](./tests/integration/App.test.tsx)

### End-to-end tests

Used for real browser flows with Playwright.

Examples:
- answers are hidden again after navigating away and back
- marked-only filter reduces the visible catalog

Files:
- [`tests/e2e/interview-app.spec.ts`](./tests/e2e/interview-app.spec.ts)

## Why all tests are in `tests/`

This project now keeps all tests in `tests/` on purpose.

Benefits:
- one obvious place for all automated tests
- easy separation between unit, component, integration, and e2e layers
- source folders stay focused on production code only
- CI/test tooling configuration is simpler to reason about

A colocated approach is also valid, especially for small reusable components or libraries. In this project, the dedicated `tests/` directory is a better fit because the app now has multiple test layers and shared test helpers.

## CI

GitHub Actions run the following in CI:

- lint
- unit/component/integration tests via Vitest
- production build
- Playwright E2E tests

Workflows:
- [`/.github/workflows/ci.yml`](./.github/workflows/ci.yml)
- [`/.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)

## Notes

- The Vite base path is configured for GitHub Pages in [`vite.config.ts`](./vite.config.ts).
- Playwright uses the built preview app and tests against the GitHub Pages base path locally as well.
- If you add a Render deployment later, this README should be updated with the public `onrender.com` URL and any platform-specific build/start settings.
