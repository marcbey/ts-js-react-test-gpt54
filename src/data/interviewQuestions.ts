import type { InterviewQuestion, ResourceLink } from '../types'
import { buildAnswer, expandExplanation, normalizeLocalizedText } from './questionContentTransforms'

type ResourceKey = keyof typeof resourceLibrary

type DraftQuestion = Omit<InterviewQuestion, 'resources'> & {
  resources: ResourceKey[]
}

const resourceLibrary = {
  mdnClosures: {
    label: 'MDN: Closures',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures',
  },
  mdnHoisting: {
    label: 'MDN: Hoisting',
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
  },
  mdnEventLoop: {
    label: 'MDN: Event Loop',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
  },
  mdnPrototypeChain: {
    label: 'MDN: Prototype Chain',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
  },
  mdnThis: {
    label: 'MDN: this',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',
  },
  mdnPromises: {
    label: 'MDN: Promise',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  },
  mdnAsync: {
    label: 'MDN: async function',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
  },
  mdnFetch: {
    label: 'MDN: Using Fetch',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
  },
  mdnModules: {
    label: 'MDN: JavaScript Modules',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
  },
  mdnSpread: {
    label: 'MDN: Spread Syntax',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
  },
  mdnEquality: {
    label: 'MDN: Equality Comparisons',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness',
  },
  mdnNullish: {
    label: 'MDN: Nullish Coalescing',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing',
  },
  mdnOptionalChaining: {
    label: 'MDN: Optional Chaining',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining',
  },
  mdnDestructuring: {
    label: 'MDN: Destructuring',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring',
  },
  mdnArrayReference: {
    label: 'MDN: Array Reference',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
  },
  mdnMemory: {
    label: 'MDN: Memory Management',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management',
  },
  mdnIterators: {
    label: 'MDN: Iterators and Generators',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators',
  },
  mdnSymbol: {
    label: 'MDN: Symbol',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
  },
  mdnWeakMap: {
    label: 'MDN: WeakMap',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap',
  },
  mdnFreeze: {
    label: 'MDN: Object.freeze',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze',
  },
  mdnStorage: {
    label: 'MDN: Web Storage API',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
  },
  mdnBrowserWork: {
    label: 'MDN: How Browsers Work',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work',
  },
  mdnEventBubbling: {
    label: 'MDN: Event Bubbling',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling',
  },
  mdnAbortController: {
    label: 'MDN: AbortController',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
  },
  mdnWorkers: {
    label: 'MDN: Web Workers',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers',
  },
  mdnXss: {
    label: 'MDN: XSS',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS',
  },
  mdnCsrf: {
    label: 'MDN: CSRF Prevention',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSRF_prevention',
  },
  mdnPerformance: {
    label: 'MDN: Performance API',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance',
  },
  tsEveryday: {
    label: 'TypeScript: Everyday Types',
    url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
  },
  tsObjects: {
    label: 'TypeScript: Object Types',
    url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
  },
  tsGenerics: {
    label: 'TypeScript: Generics',
    url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
  },
  tsNarrowing: {
    label: 'TypeScript: Narrowing',
    url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
  },
  tsUtility: {
    label: 'TypeScript: Utility Types',
    url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
  },
  tsMapped: {
    label: 'TypeScript: Mapped Types',
    url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
  },
  tsConditional: {
    label: 'TypeScript: Conditional Types',
    url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
  },
  tsEnums: {
    label: 'TypeScript: Enums',
    url: 'https://www.typescriptlang.org/docs/handbook/enums.html',
  },
  tsFunctions: {
    label: 'TypeScript: Functions',
    url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
  },
  tsDeclarationMerging: {
    label: 'TypeScript: Declaration Merging',
    url: 'https://www.typescriptlang.org/docs/handbook/declaration-merging.html',
  },
  tsModules: {
    label: 'TypeScript: Modules',
    url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
  },
  tsStrict: {
    label: 'TSConfig: strict',
    url: 'https://www.typescriptlang.org/tsconfig/#strict',
  },
  tsStrictNullChecks: {
    label: 'TSConfig: strictNullChecks',
    url: 'https://www.typescriptlang.org/tsconfig/strictNullChecks.html',
  },
  tsSatisfies: {
    label: 'TypeScript 4.9: satisfies',
    url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html',
  },
  tsTypeCompatibility: {
    label: 'TypeScript: Type Compatibility',
    url: 'https://www.typescriptlang.org/docs/handbook/type-compatibility.html',
  },
  tsDecorators: {
    label: 'TypeScript: Decorators',
    url: 'https://www.typescriptlang.org/docs/handbook/decorators.html',
  },
  tsDeclarationFiles: {
    label: 'TypeScript: Declaration Files',
    url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html',
  },
  tsPaths: {
    label: 'TypeScript: paths',
    url: 'https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths',
  },
  tsMigration: {
    label: 'TypeScript: Migrating from JavaScript',
    url: 'https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html',
  },
  tsPerformance: {
    label: 'TypeScript Wiki: Performance',
    url: 'https://github.com/microsoft/TypeScript/wiki/Performance',
  },
  reactThinking: {
    label: 'React: Thinking in React',
    url: 'https://react.dev/learn/thinking-in-react',
  },
  reactProps: {
    label: 'React: Passing Props',
    url: 'https://react.dev/learn/passing-props-to-a-component',
  },
  reactState: {
    label: 'React: State as Memory',
    url: 'https://react.dev/learn/state-a-components-memory',
  },
  reactInput: {
    label: 'React DOM: input',
    url: 'https://react.dev/reference/react-dom/components/input',
  },
  reactUseEffect: {
    label: 'React: useEffect',
    url: 'https://react.dev/reference/react/useEffect',
  },
  reactEffectsLifecycle: {
    label: 'React: Lifecycle of Reactive Effects',
    url: 'https://react.dev/learn/lifecycle-of-reactive-effects',
  },
  reactUseMemo: {
    label: 'React: useMemo',
    url: 'https://react.dev/reference/react/useMemo',
  },
  reactUseCallback: {
    label: 'React: useCallback',
    url: 'https://react.dev/reference/react/useCallback',
  },
  reactUseRef: {
    label: 'React: useRef',
    url: 'https://react.dev/reference/react/useRef',
  },
  reactContext: {
    label: 'React: useContext',
    url: 'https://react.dev/reference/react/useContext',
  },
  reactSharingState: {
    label: 'React: Sharing State',
    url: 'https://react.dev/learn/sharing-state-between-components',
  },
  reactKeys: {
    label: 'React: Keeping List Items in Order',
    url: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
  },
  reactPreservingState: {
    label: 'React: Preserving and Resetting State',
    url: 'https://react.dev/learn/preserving-and-resetting-state',
  },
  reactUseTransition: {
    label: 'React: useTransition',
    url: 'https://react.dev/reference/react/useTransition',
  },
  reactSuspense: {
    label: 'React: Suspense',
    url: 'https://react.dev/reference/react/Suspense',
  },
  reactErrorBoundary: {
    label: 'React: Error Boundaries',
    url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
  },
  reactCustomHooks: {
    label: 'React: Custom Hooks',
    url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
  },
  reactReducer: {
    label: 'React: useReducer',
    url: 'https://react.dev/reference/react/useReducer',
  },
  reactMemo: {
    label: 'React: memo',
    url: 'https://react.dev/reference/react/memo',
  },
  reactQueueingState: {
    label: 'React: Queueing State Updates',
    url: 'https://react.dev/learn/queueing-a-series-of-state-updates',
  },
  reactYouMightNotNeedEffect: {
    label: 'React: You Might Not Need an Effect',
    url: 'https://react.dev/learn/you-might-not-need-an-effect',
  },
  reactLazy: {
    label: 'React: lazy',
    url: 'https://react.dev/reference/react/lazy',
  },
  reactPortal: {
    label: 'React DOM: createPortal',
    url: 'https://react.dev/reference/react-dom/createPortal',
  },
  reactForwardRef: {
    label: 'React: forwardRef',
    url: 'https://react.dev/reference/react/forwardRef',
  },
  reactServerComponents: {
    label: 'React: Server Components',
    url: 'https://react.dev/reference/rsc/server-components',
  },
  reactHydrateRoot: {
    label: 'React DOM: hydrateRoot',
    url: 'https://react.dev/reference/react-dom/client/hydrateRoot',
  },
  reactUseOptimistic: {
    label: 'React: useOptimistic',
    url: 'https://react.dev/reference/react/useOptimistic',
  },
  viteGuide: {
    label: 'Vite: Guide',
    url: 'https://vite.dev/guide/',
  },
  viteEnvModes: {
    label: 'Vite: Env Variables and Modes',
    url: 'https://vite.dev/guide/env-and-mode',
  },
  eslintGettingStarted: {
    label: 'ESLint: Getting Started',
    url: 'https://eslint.org/docs/latest/use/getting-started',
  },
  prettierDocs: {
    label: 'Prettier: Docs',
    url: 'https://prettier.io/docs/',
  },
  vitestGuide: {
    label: 'Vitest: Guide',
    url: 'https://vitest.dev/guide/',
  },
  vitestWhy: {
    label: 'Vitest: Why Vitest',
    url: 'https://vitest.dev/guide/why',
  },
  playwrightDocs: {
    label: 'Playwright: Intro',
    url: 'https://playwright.dev/docs/intro',
  },
  playwrightBestPractices: {
    label: 'Playwright: Best Practices',
    url: 'https://playwright.dev/docs/best-practices',
  },
  storybookDocs: {
    label: 'Storybook: Docs',
    url: 'https://storybook.js.org/docs',
  },
  storybookWhy: {
    label: 'Storybook: Why Storybook',
    url: 'https://storybook.js.org/docs/get-started/why-storybook',
  },
  npmWorkspaces: {
    label: 'npm: Workspaces',
    url: 'https://docs.npmjs.com/cli/v11/using-npm/workspaces',
  },
  npmCi: {
    label: 'npm: npm ci',
    url: 'https://docs.npmjs.com/cli/v11/commands/npm-ci',
  },
  githubActionsDocs: {
    label: 'GitHub Actions: Docs',
    url: 'https://docs.github.com/en/actions',
  },
  githubActionsNode: {
    label: 'GitHub Actions: Build and Test Node.js',
    url: 'https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs',
  },
  dockerOverview: {
    label: 'Docker: Overview',
    url: 'https://docs.docker.com/get-started/docker-overview/',
  },
  dockerBuild: {
    label: 'Docker: Build',
    url: 'https://docs.docker.com/build/',
  },
  twelveFactor: {
    label: 'The Twelve-Factor App',
    url: 'https://12factor.net/',
  },
  openTelemetryJs: {
    label: 'OpenTelemetry: JavaScript',
    url: 'https://opentelemetry.io/docs/languages/js/',
  },
  semverSpec: {
    label: 'Semantic Versioning',
    url: 'https://semver.org/',
  },
  w3cAccessibility: {
    label: 'W3C WAI: Accessibility Introduction',
    url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
  },
  testingLibraryIntro: {
    label: 'Testing Library: React Intro',
    url: 'https://testing-library.com/docs/react-testing-library/intro/',
  },
  webDevVirtualize: {
    label: 'web.dev: Virtualize Long Lists',
    url: 'https://web.dev/articles/virtualize-long-lists-react-window',
  },
} as const satisfies Record<string, ResourceLink>

const mapResources = (keys: ResourceKey[]) => keys.map((key) => resourceLibrary[key])

const q = (entry: DraftQuestion): InterviewQuestion => ({
  ...entry,
  question: normalizeLocalizedText(entry.question),
  answer: buildAnswer(entry),
  exampleTitle: normalizeLocalizedText(entry.exampleTitle),
  exampleExplanation: normalizeLocalizedText(entry.exampleExplanation),
  explanation: expandExplanation(entry),
  resources: mapResources(entry.resources),
})

const javascriptQuestions: InterviewQuestion[] = [
  q({
    id: 1,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen `var`, `let` und `const`?',
      en: 'What is the difference between `var`, `let`, and `const`?',
    },
    answer: {
      de: '`var` ist funktionsscoped und wird anders gehoistet als `let` und `const`, die blockscoped sind. `const` verhindert die Neuzuweisung der Bindung, macht ein Objekt aber nicht automatisch unveränderlich. In Senior-Interviews ist wichtig zu erwähnen, dass man `const` als Default nutzt und `let` nur für echte Mutationen.',
      en: '`var` is function-scoped and hoisted differently from `let` and `const`, which are block-scoped. `const` prevents rebinding, but it does not make an object deeply immutable. In senior interviews, it matters that you default to `const` and use `let` only when reassignment is intentional.',
    },
    exampleTitle: {
      de: 'Block Scope statt Funktions-Falle',
      en: 'Block scope instead of function-scope traps',
    },
    exampleExplanation: {
      de: 'Der Zugriff auf `count` außerhalb des Blocks wirft einen Fehler. Genau das verhindert viele Leaks und Shadowing-Probleme, die mit `var` früher leicht entstanden.',
      en: 'Accessing `count` outside the block throws an error. That is exactly what prevents many leaks and shadowing issues that were common with `var`.',
    },
    exampleCode: `if (true) {
  let count = 1
  const label = 'ready'
}

console.log(count) // ReferenceError`,
    explanation: {
      de: 'Hoisting bedeutet nicht, dass sich alle drei Varianten gleich verhalten. `var` wird mit `undefined` initialisiert, während `let` und `const` in der Temporal Dead Zone liegen, bis die Deklaration erreicht ist. In einem großen Codebestand verbessert Block Scope die Lesbarkeit, weil Lebensdauer und Sichtbarkeit der Variablen enger am Code liegen. Für State-Management, Schleifen und Closures ist das ein echter Stabilitätsgewinn.',
      en: 'Hoisting does not mean the three declarations behave the same. `var` is initialized with `undefined`, while `let` and `const` stay in the temporal dead zone until execution reaches the declaration. In a large codebase, block scope improves readability because variable lifetime stays close to the code that uses it. That makes loops, closures, and stateful logic more predictable.',
    },
    resources: ['mdnHoisting', 'mdnClosures', 'mdnSpread'],
  }),
  q({
    id: 2,
    category: 'javascript',
    question: {
      de: 'Was ist eine Closure und warum ist sie praktisch?',
      en: 'What is a closure and why is it useful?',
    },
    answer: {
      de: 'Eine Closure entsteht, wenn eine Funktion auf Variablen ihres äußeren Scopes zugreift, selbst nachdem der äußere Aufruf beendet wurde. Das ist nützlich für Kapselung, Factory-Funktionen und Callbacks mit stabilem internen Zustand. Senior-Level bedeutet hier auch, die Schattenseite zu kennen: Closures können versehentlich Speicher oder alte Werte festhalten.',
      en: 'A closure is created when a function can still access variables from an outer scope after that outer call has finished. That is useful for encapsulation, factory functions, and callbacks with stable internal state. At senior level, you should also mention the downside: closures can accidentally retain memory or stale values.',
    },
    exampleTitle: {
      de: 'Privater Zustand ohne Klasse',
      en: 'Private state without a class',
    },
    exampleExplanation: {
      de: '`count` lebt weiter, obwohl `createCounter` bereits fertig ist. Die zurückgegebene Funktion behält Zugriff auf genau diese Variable.',
      en: '`count` stays alive even though `createCounter` has already returned. The returned function keeps access to that exact variable.',
    },
    exampleCode: `function createCounter() {
  let count = 0
  return () => ++count
}

const next = createCounter()
next() // 1`,
    explanation: {
      de: 'Closures sind ein Kernmechanismus des Sprachmodells von JavaScript. Sie machen Module, Currying, Memoization und viele UI-Patterns überhaupt erst angenehm möglich. Problematisch wird es, wenn eine Closure große Objekte, DOM-Referenzen oder veraltete Konfigurationen festhält. In Reviews lohnt sich deshalb immer die Frage, welche Daten wirklich im Scope bleiben müssen.',
      en: 'Closures are a core part of the JavaScript execution model. They enable modules, currying, memoization, and many UI patterns. They become problematic when a closure retains large objects, DOM references, or outdated configuration. In code reviews, it is worth asking which captured values really need to stay in scope.',
    },
    resources: ['mdnClosures', 'mdnMemory', 'mdnHoisting'],
  }),
  q({
    id: 3,
    category: 'javascript',
    question: {
      de: 'Was bedeutet Hoisting in JavaScript wirklich?',
      en: 'What does hoisting actually mean in JavaScript?',
    },
    answer: {
      de: 'Hoisting beschreibt, dass Deklarationen im Scope vor der eigentlichen Ausführung bekannt sind. Das bedeutet aber nicht, dass jede Variable sofort nutzbar ist, weil `let` und `const` bis zur Initialisierung in der Temporal Dead Zone liegen. Ein gutes Interview-Statement ist deshalb: gehostet wird vieles, aber initialisiert wird nicht alles gleich.',
      en: 'Hoisting means declarations are known in a scope before the code runs. That does not mean every variable is immediately usable, because `let` and `const` remain in the temporal dead zone until initialization. A solid interview answer is: many things are hoisted, but not everything is initialized the same way.',
    },
    exampleTitle: {
      de: 'Deklariert ist nicht gleich verwendbar',
      en: 'Declared does not mean usable',
    },
    exampleExplanation: {
      de: 'Die Funktion funktioniert vor ihrer Deklaration, `name` dagegen nicht. Das zeigt den Unterschied zwischen Function Declaration und blockscoped Variablen.',
      en: 'The function works before its declaration, but `name` does not. That shows the difference between function declarations and block-scoped variables.',
    },
    exampleCode: `greet()

function greet() {
  console.log('hi')
}

console.log(name)
let name = 'Ada'`,
    explanation: {
      de: 'Viele Bugs rund um Hoisting entstehen durch falsche mentale Modelle. Wer glaubt, JavaScript lese Code einfach streng von oben nach unten, versteht TDZ, Function Declarations und Scope-Auflösung oft nur halb. In großen Teams hilft ein konsistenter Stil mit `const` und kleinen Scopes, damit Hoisting fast keine praktische Falle mehr ist. Es bleibt aber wichtig, das Verhalten für Debugging und Interviewfragen exakt benennen zu können.',
      en: 'Many hoisting bugs come from incorrect mental models. If you assume JavaScript simply reads code top to bottom, you will misread TDZ behavior, function declarations, and scope resolution. In larger teams, a consistent `const`-first style and small scopes make hoisting less of a practical trap. It still matters to describe the runtime behavior precisely during debugging and interviews.',
    },
    resources: ['mdnHoisting', 'mdnClosures', 'mdnThis'],
  }),
  q({
    id: 4,
    category: 'javascript',
    question: {
      de: 'Wie funktioniert der Event Loop?',
      en: 'How does the event loop work?',
    },
    answer: {
      de: 'JavaScript führt auf dem Main Thread zunächst den aktuellen Call Stack aus und verarbeitet danach wartende Tasks aus Queues. Promises und andere Microtasks laufen vor der nächsten Macrotask, was oft die beobachtete Reihenfolge erklärt. Senior-Level heisst hier, Scheduling-Auswirkungen auf UI-Reaktionszeit und Debugging erklären zu können.',
      en: 'JavaScript first finishes the current call stack and then processes queued tasks. Promises and other microtasks run before the next macrotask, which explains much of the observed ordering. At senior level, you should connect that behavior to UI responsiveness and debugging.',
    },
    exampleTitle: {
      de: 'Warum Promise-Callbacks zuerst laufen',
      en: 'Why promise callbacks run first',
    },
    exampleExplanation: {
      de: 'Obwohl `setTimeout` früher registriert wird, läuft die Promise-Microtask zuerst. Genau diese Reihenfolge ist ein Standard-Interviewthema.',
      en: 'Even though `setTimeout` is registered earlier, the promise microtask runs first. That ordering is a standard interview topic.',
    },
    exampleCode: `console.log('A')
setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('promise'))
console.log('B')
// A, B, promise, timeout`,
    explanation: {
      de: 'Der Event Loop ist eng mit Rendering, I/O und Browser-APIs verzahnt. Lange synchrone Arbeit blockiert nicht nur Events, sondern oft auch Paints und damit die wahrgenommene Performance. Deshalb teilt man große Arbeitspakete auf, nutzt Workers oder verschiebt nicht-kritische Arbeit. Wer das erklären kann, zeigt Architekturverständnis und nicht nur Syntaxwissen.',
      en: 'The event loop is tightly connected to rendering, I/O, and browser APIs. Long synchronous work blocks not just events, but often paints as well, which hurts perceived performance. That is why large jobs are split up, delegated to workers, or deferred. Explaining that well demonstrates architectural understanding, not just syntax knowledge.',
    },
    resources: ['mdnEventLoop', 'mdnBrowserWork', 'mdnPerformance'],
  }),
  q({
    id: 5,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen Microtasks und Macrotasks?',
      en: 'What is the difference between microtasks and macrotasks?',
    },
    answer: {
      de: 'Microtasks werden nach dem aktuellen Stack und vor der nächsten Macrotask geleert. Dazu gehören zum Beispiel Promise-Callbacks und `queueMicrotask`, während `setTimeout` typische Macrotasks erzeugt. In Senior-Gespraechen solltest du erwähnen, dass zu viele Microtasks die UI ebenfalls aushungern können.',
      en: 'Microtasks are drained after the current stack and before the next macrotask. Promise callbacks and `queueMicrotask` are typical microtasks, while `setTimeout` produces macrotasks. In senior discussions, mention that too many microtasks can still starve the UI.',
    },
    exampleTitle: {
      de: 'Microtask-Queue vor Timer-Queue',
      en: 'Microtask queue before timer queue',
    },
    exampleExplanation: {
      de: 'Die Microtask wird vollstaendig abgearbeitet, bevor der Timer dran ist. Darum kann unkontrolliertes Chaining von Promises renderkritisch werden.',
      en: 'The microtask is fully processed before the timer gets a turn. That is why uncontrolled promise chaining can become render-critical.',
    },
    exampleCode: `queueMicrotask(() => console.log('microtask'))
setTimeout(() => console.log('timer'), 0)
console.log('sync')
// sync, microtask, timer`,
    explanation: {
      de: 'Das Modell ist wichtig, sobald du Race Conditions, Flackern oder seltsame Testfehler analysierst. Testframeworks, React-Updates und Browser-Rendering können je nach Timing anders beobachtbar sein. In Performance-Arbeit hilft dieses Wissen zu entscheiden, ob ein Task sofort, später oder außerhalb des Main Threads laufen sollte. Genau das trennt robuste von zufällig funktionierender UI.',
      en: 'This model matters when you analyze race conditions, flicker, or strange test failures. Test frameworks, React updates, and browser rendering can appear different depending on timing. In performance work, it helps you decide whether a task should run now, later, or off the main thread. That is the difference between a robust UI and one that only works by accident.',
    },
    resources: ['mdnEventLoop', 'mdnAsync', 'mdnPerformance'],
  }),
  q({
    id: 6,
    category: 'javascript',
    question: {
      de: 'Wie funktioniert Prototypenvererbung in JavaScript?',
      en: 'How does prototypal inheritance work in JavaScript?',
    },
    answer: {
      de: 'Objekte verweisen intern auf ein anderes Objekt als Prototyp, von dem Eigenschaften gelesen werden können, wenn sie lokal fehlen. Klassen sind in JavaScript nur Syntax über diesem Mechanismus. Für Senior-Rollen ist wichtig, zwischen Instanzdaten, gemeinsamem Verhalten und Lookup-Kosten sauber zu unterscheiden.',
      en: 'Objects internally reference another object as their prototype, and missing properties are looked up there. Classes in JavaScript are syntax over that mechanism. For senior roles, it matters to distinguish instance data, shared behavior, and lookup behavior clearly.',
    },
    exampleTitle: {
      de: 'Methoden werden geteilt',
      en: 'Methods are shared',
    },
    exampleExplanation: {
      de: 'Jede Instanz bekommt eigene Daten, aber `greet` liegt einmal auf dem Prototypen. Das spart Speicher und zeigt den eigentlichen Nutzen der Vererbungskette.',
      en: 'Each instance gets its own data, but `greet` lives once on the prototype. That saves memory and shows the actual benefit of the prototype chain.',
    },
    exampleCode: `function User(name) {
  this.name = name
}

User.prototype.greet = function () {
  return 'Hi ' + this.name
}`,
    explanation: {
      de: 'Ein Interview wird hier oft auf die Frage hinauslaufen, was Klassen wirklich unter der Haube tun. Wenn du erklärst, dass Methoden auf dem Prototype landen und `new` ein Objekt mit Verweis auf `prototype` erstellt, ist das meist die richtige Tiefe. Dazu kommt die praktische Seite: direkte Objektvererbung ist selten nötig, aber Debugging entlang der Kette ist häufig. Wer das Modell versteht, kann auch Libraries und Frameworks schneller durchdringen.',
      en: 'Interviews often push this topic toward what classes really do under the hood. If you explain that methods live on the prototype and `new` creates an object linked to `prototype`, you are usually at the right depth. The practical side matters too: direct prototype manipulation is rare, but debugging through the chain is common. Understanding the model makes it easier to reason about libraries and frameworks.',
    },
    resources: ['mdnPrototypeChain', 'mdnThis', 'mdnClosures'],
  }),
  q({
    id: 7,
    category: 'javascript',
    question: {
      de: 'Wie wird `this` in JavaScript bestimmt?',
      en: 'How is `this` determined in JavaScript?',
    },
    answer: {
      de: '`this` wird bei normalen Funktionen über den Aufrufkontext bestimmt, nicht über den Ort der Definition. Arrow Functions haben kein eigenes `this`, sondern übernehmen es lexikalisch aus dem umgebenden Scope. Dadurch verhalten sich Methoden, Event-Handler und Callbacks oft unterschiedlich, obwohl der Code auf den ersten Blick ähnlich aussieht.',
      en: '`this` in regular functions is determined by the call site, not by where the function was written. Arrow functions do not create their own `this`; they capture it lexically from the surrounding scope. That is why methods, event handlers, and callbacks can behave very differently even when the code looks similar at first glance.',
    },
    exampleTitle: {
      de: 'Normale Funktion und Arrow Function im Vergleich',
      en: 'Regular function and arrow function compared',
    },
    exampleExplanation: {
      de: 'Die normale Callback-Funktion bekommt ihr eigenes `this`, sobald sie mit einem anderen Kontext aufgerufen wird. Die Arrow Function ignoriert diesen neuen Kontext und übernimmt weiterhin `this` aus `runArrow`.',
      en: 'The regular callback receives its own `this` when it is called with a different context. The arrow function ignores that new context and keeps `this` from `runArrow`.',
    },
    exampleCode: `const user = {
  name: 'Ada',
  runRegular() {
    const callback = function () {
      return this.name
    }

    return callback.call({ name: 'Grace' })
  },

  runArrow() {
    const callback = () => this.name

    return callback.call({ name: 'Grace' })
  },
}

user.runRegular() // 'Grace'
user.runArrow()   // 'Ada'`,
    explanation: {
      de: 'Bei DOM-Event-Handlern mit normaler Funktion zeigt `this` oft auf das Element, während eine Arrow Function den äußeren Kontext behält und deshalb nicht automatisch das Event-Target liefert. Bei Klassenmethoden geht der Kontext verloren, sobald du `instance.method` als nackten Callback weiterreichst; dann helfen `bind`, ein Wrapper oder eine bewusst eingesetzte Arrow Function. In Timern, Promise-Callbacks und anderen verschachtelten Funktionen entscheidet genau dieser Unterschied darüber, ob du auf die Instanz, das Event-Ziel oder ins Leere zeigst. Wer das versteht, kann Bugs in Legacy-Klassen, Browser-APIs und Callback-lastigem Code gezielt vermeiden.',
      en: 'In DOM event handlers written as regular functions, `this` often points to the element, while an arrow function keeps the surrounding context and therefore does not automatically refer to the event target. With class methods, the context is lost as soon as you pass `instance.method` around as a bare callback, which is where `bind`, a wrapper, or a deliberately chosen arrow function becomes necessary. In timers, promise callbacks, and other nested functions, that difference decides whether you are still talking to the instance, the event target, or nothing useful at all. Understanding that distinction helps you prevent bugs in legacy classes, browser APIs, and callback-heavy code.',
    },
    resources: ['mdnThis', 'mdnPrototypeChain', 'mdnClosures'],
  }),
  q({
    id: 8,
    category: 'javascript',
    question: {
      de: 'Wofür braucht man `call`, `apply` und `bind`?',
      en: 'What are `call`, `apply`, and `bind` used for?',
    },
    answer: {
      de: 'Alle drei Methoden erlauben es, den Aufrufkontext einer Funktion explizit zu setzen. `call` und `apply` rufen sofort auf, `bind` liefert eine neue Funktion für spätere Aufrufe. In Interviews ist der interessante Teil selten die Syntax, sondern wann explizites Binden sinnvoll oder ein API-Geruch ist.',
      en: 'All three methods let you set a function\'s call context explicitly. `call` and `apply` invoke immediately, while `bind` returns a new function for later use. In interviews, the interesting part is rarely the syntax and more often when explicit binding is useful or a sign of awkward API design.',
    },
    exampleTitle: {
      de: 'Kontext sicher weiterreichen',
      en: 'Passing context safely',
    },
    exampleExplanation: {
      de: 'Mit `bind` bleibt `this` auch dann korrekt, wenn die Funktion später unabhängig ausgeführt wird. Das ist in Event-Systemen oder Legacy-Klassen häufig nötig.',
      en: 'With `bind`, `this` stays correct even when the function is executed later on its own. That often matters in event systems or legacy classes.',
    },
    exampleCode: `const user = { name: 'Ada' }
function greet() {
  return 'Hi ' + this.name
}

const boundGreet = greet.bind(user)
boundGreet() // 'Hi Ada'`,
    explanation: {
      de: 'Historisch waren diese APIs entscheidend, bevor Arrow Functions alltäglich wurden. Heute tauchen sie vor allem bei Interop mit Bibliotheken, Event APIs und funktionalem Reuse auf. Ein erfahrener Entwickler weiß auch, dass zu aggressives `bind` neue Funktionen erzeugt und damit Memoization oder Event-Unsubscription erschweren kann. Die saubere Antwort verbindet also Sprachmechanik und Architekturfolgen.',
      en: 'Historically, these APIs were essential before arrow functions became common. Today they mostly show up in library interop, event APIs, and functional reuse. An experienced developer also knows that aggressive `bind` usage creates new functions, which can make memoization or event unsubscription harder. The best answer connects language mechanics with architectural consequences.',
    },
    resources: ['mdnThis', 'mdnPrototypeChain', 'mdnHoisting'],
  }),
  q({
    id: 9,
    category: 'javascript',
    question: {
      de: 'Sind JavaScript-Klassen etwas anderes als Prototypen?',
      en: 'Are JavaScript classes different from prototypes?',
    },
    answer: {
      de: 'Nein, Klassen sind vor allem eine lesbarere Syntax über dem vorhandenen Prototypenmodell. Sie ändern nicht das Grundprinzip von Lookup über die Prototypenkette. In Senior-Interviews punktest du, wenn du sowohl die ergonomischen Vorteile als auch die unveränderte Laufzeitrealität benennen kannst.',
      en: 'No, classes are mainly cleaner syntax over the existing prototype model. They do not change the underlying prototype-chain lookup behavior. In senior interviews, you score by naming both the ergonomic benefits and the unchanged runtime reality.',
    },
    exampleTitle: {
      de: 'Syntax-Zucker mit echter Semantik',
      en: 'Syntactic sugar with real semantics',
    },
    exampleExplanation: {
      de: 'Die Klasse sieht wie klassische OOP aus, aber Methoden landen weiterhin auf dem Prototyp. Darum ist das Verständnis des Basismodells weiterhin relevant.',
      en: 'The class looks like classical OOP, but methods still land on the prototype. That is why understanding the base model still matters.',
    },
    exampleCode: `class User {
  constructor(name) {
    this.name = name
  }

  greet() {
    return 'Hi ' + this.name
  }
}`,
    explanation: {
      de: 'Klassen bringen klare Syntax für Konstruktoren, Vererbung und private Felder. Gleichzeitig entstehen Missverständnisse, wenn Entwickler daraus klassische Klassenhierarchien wie in Java oder C# ableiten. In JavaScript sind Komposition, kleine Objekte und einfache Datenstrukturen oft der robustere Weg. Gute Kandidaten erklären deshalb nicht nur die Technik, sondern auch die typischen Designentscheidungen darum herum.',
      en: 'Classes provide clear syntax for constructors, inheritance, and private fields. At the same time, developers often over-translate them into classical class hierarchies from Java or C#. In JavaScript, composition, small objects, and simple data structures are often the more robust path. Strong candidates explain not only the mechanism, but also the design choices around it.',
    },
    resources: ['mdnPrototypeChain', 'mdnThis', 'mdnMemory'],
  }),
  q({
    id: 10,
    category: 'javascript',
    question: {
      de: 'Was ist ein Promise und welches Problem löst es?',
      en: 'What is a Promise and what problem does it solve?',
    },
    answer: {
      de: 'Ein Promise repräsentiert das zukünftige Ergebnis einer asynchronen Operation. Es löst vor allem das Problem, dass Callback-Ketten schwer lesbar, schwer fehlerbehandelbar und schwer kombinierbar werden. Auf Senior-Level solltest du außerdem Zustandsmodell, Verkettung und Fehlerweitergabe erklären.',
      en: 'A Promise represents the future result of an asynchronous operation. It mainly solves the problem that callback chains become hard to read, hard to error-handle, and hard to compose. At senior level, you should also explain the state model, chaining, and error propagation.',
    },
    exampleTitle: {
      de: 'Asynchrones Ergebnis als Wert behandeln',
      en: 'Treat an async result like a value',
    },
    exampleExplanation: {
      de: 'Das Promise kapselt den später eintreffenden Wert und erlaubt anschliessend klarere Verkettung. Fehler können zentral über `.catch()` behandelt werden.',
      en: 'The promise wraps a value that arrives later and allows cleaner chaining. Errors can be handled centrally with `.catch()`.',
    },
    exampleCode: `fetch('/api/user')
  .then((response) => response.json())
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error))`,
    explanation: {
      de: 'Promises haben klar definierte Zustandsübergaenge: pending, fulfilled oder rejected. Dieses Modell macht Komposition mit `Promise.all`, `Promise.allSettled` oder `Promise.race` erst praktikabel. In Interviews ist oft relevant, dass Fehler in einer Kette automatisch weitergereicht werden, bis sie behandelt werden. Wer das sauber formuliert, zeigt, dass er asynchrones Verhalten systematisch statt zufällig beherrscht.',
      en: 'Promises have well-defined state transitions: pending, fulfilled, or rejected. That model is what makes composition with `Promise.all`, `Promise.allSettled`, or `Promise.race` practical. In interviews, it is often important to mention that errors propagate down a chain until they are handled. Explaining that clearly shows systematic control over asynchronous behavior.',
    },
    resources: ['mdnPromises', 'mdnAsync', 'mdnFetch'],
  }),
  q({
    id: 11,
    category: 'javascript',
    question: {
      de: 'Welche typischen Fallstricke hat `async`/`await`?',
      en: 'What are common pitfalls of `async`/`await`?',
    },
    answer: {
      de: '`async`/`await` macht asynchronen Code lesbarer, ändert aber nicht die zugrunde liegende Promise-Semantik. Typische Fehler sind unnötig serielle `await`s, fehlende Fehlerbehandlung und vergessenes `await`, das still Promises weiterreicht. Senior-Level bedeutet hier, auch Parallelisierung und Abbruchstrategien mitzudenken.',
      en: '`async`/`await` makes asynchronous code more readable, but it does not change the underlying promise semantics. Common mistakes are unnecessary sequential awaits, missing error handling, and forgotten `await` expressions that silently pass promises along. Senior-level answers should also cover parallelization and cancellation strategies.',
    },
    exampleTitle: {
      de: 'Parallel statt versehentlich seriell',
      en: 'Parallel instead of accidentally sequential',
    },
    exampleExplanation: {
      de: 'Wenn beide Requests unabhängig sind, ist `Promise.all` fast immer besser als zwei serielle `await`s. Das spart oft echte Latenz.',
      en: 'If the requests are independent, `Promise.all` is almost always better than two sequential awaits. That often removes real latency.',
    },
    exampleCode: `const [user, projects] = await Promise.all([
  fetch('/api/user').then((res) => res.json()),
  fetch('/api/projects').then((res) => res.json()),
])`,
    explanation: {
      de: 'Interviewfragen zu `async`/`await` zielen häufig auf Denkfehler statt Syntax. Viele Kandidaten schreiben sauberen Code, aber merken nicht, dass sie ein Wasserfall-Muster eingebaut haben. Dazu kommt, dass `try/catch` nur erfasste Fehlerbereiche abdeckt und Abbrueche sauber modelliert werden müssen. Eine gute Antwort verbindet Lesbarkeit, Performance und Robustheit.',
      en: 'Interview questions about `async`/`await` usually target reasoning mistakes rather than syntax. Many candidates write clean-looking code but fail to notice that they introduced a waterfall. On top of that, `try/catch` only covers the awaited scope, and cancellation must be modeled deliberately. A strong answer connects readability, performance, and robustness.',
    },
    resources: ['mdnAsync', 'mdnPromises', 'mdnAbortController'],
  }),
  q({
    id: 12,
    category: 'javascript',
    question: {
      de: 'Wie behandelt man Fehler mit `fetch` korrekt?',
      en: 'How do you handle errors with `fetch` correctly?',
    },
    answer: {
      de: '`fetch` rejected nur bei Netzwerk- oder CORS-Fehlern, nicht bei HTTP-Statuscodes wie 404 oder 500. Deshalb muss man `response.ok` oder den Status selbst prüfen und darauf reagieren. Senior-Level heisst hier außerdem: Timeouts, Abbruch, Retries und Nutzerfeedback mitdenken.',
      en: '`fetch` only rejects for network or CORS failures, not for HTTP status codes like 404 or 500. That means you must explicitly inspect `response.ok` or the status code. Senior-level handling also includes timeouts, cancellation, retries, and user feedback.',
    },
    exampleTitle: {
      de: 'HTTP-Fehler selbst behandeln',
      en: 'Handle HTTP errors explicitly',
    },
    exampleExplanation: {
      de: 'Der explizite Check auf `response.ok` verhindert, dass ein 500er als erfolgreicher Request weiterverarbeitet wird. Genau das wird in Interviews oft übersehen.',
      en: 'The explicit `response.ok` check prevents a 500 response from being processed as a success. That is a very common interview miss.',
    },
    exampleCode: `const response = await fetch('/api/user')
if (!response.ok) {
  throw new Error('Request failed: ' + response.status)
}
const user = await response.json()`,
    explanation: {
      de: 'Solide Fehlerbehandlung trennt Transportfehler, Protokollfehler und fachliche Fehler. Im Frontend führt das oft zu einem Error-State mit Retry-Möglichkeit statt zu einem stillen `console.error`. Bei produktiven Systemen kommt außerdem Abbruchlogik über `AbortController` hinzu, um veraltete Requests zu stoppen. Eine gute Antwort zeigt also API-Verständnis und UX-Verantwortung zugleich.',
      en: 'Solid error handling separates transport failures, protocol failures, and domain-level failures. In the frontend, that usually leads to an error state with a retry option instead of a silent `console.error`. In production systems, `AbortController` is often added to cancel obsolete requests. A strong answer therefore shows both API understanding and UX responsibility.',
    },
    resources: ['mdnFetch', 'mdnAbortController', 'mdnPromises'],
  }),
  q({
    id: 13,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen ES Modules und CommonJS?',
      en: 'What is the difference between ES Modules and CommonJS?',
    },
    answer: {
      de: 'ES Modules sind das standardisierte Modulformat von JavaScript und arbeiten mit statischen `import`- und `export`-Deklarationen. CommonJS nutzt `require` und `module.exports` und wurde vor allem im Node-Umfeld etabliert. In Senior-Interviews solltest du auch Tree Shaking, Tooling und Interop-Probleme ansprechen.',
      en: 'ES Modules are JavaScript\'s standardized module format and use static `import` and `export` declarations. CommonJS uses `require` and `module.exports` and historically dominated the Node ecosystem. In senior interviews, you should also mention tree shaking, tooling, and interop issues.',
    },
    exampleTitle: {
      de: 'Statische Imports helfen dem Bundler',
      en: 'Static imports help the bundler',
    },
    exampleExplanation: {
      de: 'Weil der Import statisch ist, kann Tooling Abhängigkeiten früh analysieren und ungenutzten Code oft besser entfernen.',
      en: 'Because the import is static, tooling can analyze dependencies early and often remove unused code more effectively.',
    },
    exampleCode: `import { formatPrice } from './money.js'

export function renderTotal(value) {
  return formatPrice(value)
}`,
    explanation: {
      de: 'Die Wahl des Modulformats beeinflusst Build-Zeit, Laufzeit und Deployments. Browser verstehen ESM direkt, während CommonJS stark auf Node und transpilierten Workflows basiert. In realen Codebasen ist der schwierige Teil oft nicht das Format selbst, sondern der gemischte Betrieb mit Aliases, Default-Exports und Toolchain-Konfigurationen. Gute Kandidaten benennen deshalb technische und organisatorische Konsequenzen.',
      en: 'The module format affects build time, runtime behavior, and deployment strategy. Browsers understand ESM directly, while CommonJS is strongly tied to Node and transpiled workflows. In real codebases, the difficult part is often not the format itself but mixed operation with aliases, default exports, and toolchain configuration. Strong candidates point out both technical and organizational consequences.',
    },
    resources: ['mdnModules', 'tsModules', 'tsPaths'],
  }),
  q({
    id: 14,
    category: 'javascript',
    question: {
      de: 'Warum ist Immutability im Frontend so wichtig?',
      en: 'Why is immutability so important in frontend work?',
    },
    answer: {
      de: 'Immutable Updates machen Änderungen nachvollziehbar, erleichtern Vergleichslogik und vermeiden Seiteneffekte. Das ist besonders wichtig für React, Memoization und Debugging. In Senior-Rollen geht es dabei nicht um Dogma, sondern darum, wo mutierbarer Zustand kontrolliert sinnvoll ist und wo er zu Fehlern führt.',
      en: 'Immutable updates make changes easier to reason about, simplify comparison logic, and reduce side effects. That is especially important for React, memoization, and debugging. In senior roles, the real question is not ideology but where controlled mutation is acceptable and where it becomes risky.',
    },
    exampleTitle: {
      de: 'Neues Objekt statt versteckter Mutation',
      en: 'Create a new object instead of hidden mutation',
    },
    exampleExplanation: {
      de: 'Das Spread-Update erzeugt ein neues Objekt und lässt das alte unverändert. So erkennen UI-Layer und Caches die Änderung wesentlich einfacher.',
      en: 'The spread update creates a new object and leaves the old one untouched. That makes changes easier for UI layers and caches to detect.',
    },
    exampleCode: `const nextUser = {
  ...user,
  role: 'admin',
}`,
    explanation: {
      de: 'Immutability vereinfacht vor allem Change Detection. Sobald Systeme auf Referenzgleichheit setzen, werden mutierte Objekte schwer sauber nachzuverfolgen. Gleichzeitig kostet übertriebene Kopiererei Speicher und CPU, daher braucht es pragmatische Grenzen. Senior-Level bedeutet, die Trade-offs zu kennen und nicht nur Regeln auswendig zu lernen.',
      en: 'Immutability mainly simplifies change detection. As soon as systems depend on reference equality, mutated objects become hard to track correctly. At the same time, excessive copying costs memory and CPU, so pragmatic limits matter. Senior-level thinking means knowing those trade-offs instead of reciting rules.',
    },
    resources: ['mdnSpread', 'mdnFreeze', 'reactState'],
  }),
  q({
    id: 15,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen shallow copy und deep copy?',
      en: 'What is the difference between a shallow copy and a deep copy?',
    },
    answer: {
      de: 'Eine shallow copy kopiert nur die oberste Ebene, während verschachtelte Objekte referenziert bleiben. Eine deep copy kopiert auch die tieferen Ebenen und trennt so die Daten wirklich voneinander. In Interviews ist wichtig zu sagen, dass man deep copy nur gezielt nutzt, weil sie teuer und semantisch nicht immer korrekt ist.',
      en: 'A shallow copy only copies the top level, while nested objects stay shared by reference. A deep copy also copies the deeper levels and truly separates the data structures. In interviews, it is important to add that deep copying should be used deliberately because it is expensive and not always semantically correct.',
    },
    exampleTitle: {
      de: 'Spread kopiert nur eine Ebene',
      en: 'Spread only copies one level',
    },
    exampleExplanation: {
      de: 'Die äußere Struktur ist neu, aber `settings` wird weiterhin geteilt. Eine Mutation darunter wirkt also auf beide Objekte.',
      en: 'The outer structure is new, but `settings` is still shared. A mutation inside it therefore affects both objects.',
    },
    exampleCode: `const a = { settings: { theme: 'dark' } }
const b = { ...a }
b.settings.theme = 'light'

console.log(a.settings.theme) // 'light'`,
    explanation: {
      de: 'Dieser Unterschied ist eine klassische Ursache für vermeintlich unerkaerliche Seiteneffekte. Vor allem bei verschachtelten API-Responses oder globalem State fällt es spät auf, dass Unterobjekte noch gemeinsam genutzt werden. Moderne APIs wie `structuredClone` helfen, sind aber kein Allheilmittel für jede Datenstruktur. Gute Kandidaten erklären daher auch, wann Normalisierung oder gezielte partielle Updates besser sind.',
      en: 'This difference is a classic source of surprising side effects. Especially with nested API responses or shared state, teams often notice too late that sub-objects are still shared. Modern APIs like `structuredClone` help, but they are not a universal answer for every data structure. Strong candidates therefore explain when normalization or targeted partial updates are the better option.',
    },
    resources: ['mdnSpread', 'mdnArrayReference', 'mdnMemory'],
  }),
  q({
    id: 16,
    category: 'javascript',
    question: {
      de: 'Wann sollte man `===` statt `==` verwenden?',
      en: 'When should you use `===` instead of `==`?',
    },
    answer: {
      de: 'Standardmäßig sollte man `===` verwenden, weil der Vergleich ohne implizite Typkonvertierung läuft und dadurch besser lesbar und vorhersagbar ist. `==` ist nur in wenigen bewusst gewählten Fällen sinnvoll, etwa bei `value == null`, wenn `null` und `undefined` gemeinsam abgefangen werden sollen. Entscheidend ist, Coercion nicht versehentlich, sondern absichtlich einzusetzen.',
      en: 'You should default to `===` because it compares without implicit type coercion and is therefore easier to read and predict. `==` is useful only in a few deliberate cases, such as `value == null` when you intentionally want to match both `null` and `undefined`. The key point is to use coercion on purpose, not by accident.',
    },
    exampleTitle: {
      de: 'Strikter Vergleich und die bewusste Ausnahme',
      en: 'Strict equality and the deliberate exception',
    },
    exampleExplanation: {
      de: '`0 == false` zeigt, wie leicht Coercion täuschen kann. `value == null` ist dagegen eine bewusst lesbare Kurzform, wenn beide leeren Zustände zusammen behandelt werden sollen.',
      en: '`0 == false` shows how easily coercion can mislead you. `value == null` is the deliberate shorthand when both empty states should be handled together.',
    },
    exampleCode: `const value = undefined

console.log(0 == false)   // true
console.log(0 === false)  // false

console.log(value == null)   // true
console.log(value === null)  // false`,
    explanation: {
      de: 'Gleichheitsfragen wirken simpel, sind aber oft ein Proxy für Codequalität. Wer standardmäßig strikte Vergleiche nutzt, reduziert kognitive Last und vermeidet schwer auffindbare Bugs. Gleichzeitig ist `== null` eine legitime Ausnahme, wenn ein API-Vertrag `null` und `undefined` bewusst gleich behandeln soll. Gute Antworten benennen deshalb sowohl die sichere Default-Regel als auch die wenigen gerechtfertigten Ausnahmen.',
      en: 'Equality looks simple, but it is often a proxy for code quality. Using strict equality by default reduces cognitive load and avoids subtle bugs. At the same time, `== null` is a legitimate exception when an API contract intentionally treats `null` and `undefined` the same way. Good answers therefore name both the safe default and the few justified exceptions.',
    },
    resources: ['mdnEquality', 'mdnNullish', 'tsEveryday'],
  }),
  q({
    id: 17,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen `null` und `undefined`?',
      en: 'What is the difference between `null` and `undefined`?',
    },
    answer: {
      de: '`undefined` bedeutet meist, dass kein Wert gesetzt wurde, während `null` oft bewusst als leerer Wert verwendet wird. In der Praxis ist wichtiger, im Team konsistent zu sein und API-Vertraege sauber zu definieren. Senior-Level bedeutet hier, Fachbedeutung und technische Bedeutung auseinanderhalten zu können.',
      en: '`undefined` usually means a value has not been set, while `null` is often used intentionally to represent an empty value. In practice, consistency and clear API contracts matter more than the raw distinction. Senior-level reasoning separates domain meaning from technical meaning.',
    },
    exampleTitle: {
      de: 'Nicht gesetzt vs. bewusst leer',
      en: 'Not set vs intentionally empty',
    },
    exampleExplanation: {
      de: 'Im Beispiel ist `middleName` explizit leer, `nickname` fehlt dagegen komplett. Diese Unterscheidung kann für Serialisierung und UI-Logik wichtig sein.',
      en: 'In the example, `middleName` is explicitly empty, while `nickname` is missing entirely. That distinction can matter for serialization and UI logic.',
    },
    exampleCode: `const user = {
  middleName: null,
}

console.log(user.nickname) // undefined`,
    explanation: {
      de: 'Viele Teams behandeln beide Werte unsauber und erzeugen dadurch vermeidbare Edge Cases. In Formularen, APIs und Datenbanken sollte klar sein, ob ein Feld fehlt, noch unbekannt ist oder bewusst leer gesetzt wurde. TypeScript mit `strictNullChecks` hilft, solche Unterschiede sichtbar zu machen. Gute Kandidaten verknuepfen also Sprachwissen mit Datenmodellierung.',
      en: 'Many teams handle both values inconsistently and create avoidable edge cases. In forms, APIs, and databases, it should be clear whether a field is missing, not yet known, or intentionally empty. TypeScript with `strictNullChecks` helps make those differences visible. Strong candidates connect language knowledge with data modeling.',
    },
    resources: ['mdnNullish', 'mdnOptionalChaining', 'tsStrictNullChecks'],
  }),
  q({
    id: 18,
    category: 'javascript',
    question: {
      de: 'Wann helfen Optional Chaining und Nullish Coalescing?',
      en: 'When are optional chaining and nullish coalescing useful?',
    },
    answer: {
      de: 'Optional Chaining verhindert Fehler beim Zugriff auf potenziell fehlende Zwischenwerte, und Nullish Coalescing setzt einen Fallback nur bei `null` oder `undefined`. Zusammen machen beide Ausdrücke defensive Zugriffe deutlich lesbarer, ohne gültige Werte wie `0`, `false` oder leere Strings zu überschreiben. Sie ersetzen aber keine saubere Validierung oder ein gutes Datenmodell.',
      en: 'Optional chaining prevents errors when reading through potentially missing intermediate values, and nullish coalescing applies a fallback only for `null` or `undefined`. Together, they make defensive reads much more readable without overwriting valid values such as `0`, `false`, or empty strings. They still do not replace proper validation or a good data model.',
    },
    exampleTitle: {
      de: 'Sicher lesen, ohne alles zu verschachteln',
      en: 'Read safely without deep nesting',
    },
    exampleExplanation: {
      de: 'Der Ausdruck liefert einen Fallback, ohne dass vorher jede Ebene manuell geprüft werden muss. Gleichzeitig bleibt ein gültiger Wert wie `0` erhalten, weil `??` nicht wie `||` auf alle falsy Werte reagiert.',
      en: 'The expression returns a fallback without manually checking every level first. At the same time, a valid value such as `0` is preserved because `??` does not react to every falsy value like `||` would.',
    },
    exampleCode: `const city = user.profile?.address?.city ?? 'Unknown'
const retries = settings.retries ?? 0`,
    explanation: {
      de: 'Die beiden Operatoren verbessern vor allem Lesbarkeit und Fehlertoleranz. Gleichzeitig können sie schlechte Datenmodelle kaschieren, wenn man sie reflexartig überall einsetzt. Ein Fallback ist sinnvoll für optionale UI-Daten oder tolerante Defaults, aber nicht für Pflichtfelder, deren Fehlen eigentlich ein Fehler ist. Genau deshalb beantworten gute Erklärungen nicht nur die Syntax, sondern auch die Frage, wann der Code besser früh und laut scheitern sollte.',
      en: 'These operators mainly improve readability and fault tolerance. At the same time, they can hide weak data modeling when used everywhere by reflex. A fallback is useful for optional UI data or tolerant defaults, but not for required fields whose absence is actually an error. That is why good explanations cover not only the syntax, but also when the code should fail early and loudly instead.',
    },
    resources: ['mdnOptionalChaining', 'mdnNullish', 'tsStrictNullChecks'],
  }),
  q({
    id: 19,
    category: 'javascript',
    question: {
      de: 'Wofür nutzt man Destructuring, Rest und Spread?',
      en: 'What are destructuring, rest, and spread used for?',
    },
    answer: {
      de: 'Destructuring macht das Auslesen von Werten kompakter, Rest sammelt verbleibende Werte ein und Spread kopiert oder expandiert Datenstrukturen. Diese Syntax hilft besonders bei React Props, Funktionsargumenten und immutable Updates. Senior-Level bedeutet auch, Nebenwirkungen wie shallow copies und schwer lesbare Einzeiler zu erkennen.',
      en: 'Destructuring makes value extraction more concise, rest collects remaining values, and spread copies or expands data structures. This syntax is especially useful with React props, function arguments, and immutable updates. Senior-level reasoning also includes recognizing shallow-copy semantics and overly clever one-liners.',
    },
    exampleTitle: {
      de: 'Lesbarer Zugriff auf nur relevante Felder',
      en: 'Readable access to only the relevant fields',
    },
    exampleExplanation: {
      de: 'Das Beispiel zieht gezielt benötigte Werte heraus und fasst den Rest separat zusammen. Das ist in Komponenten und Serialisierungslogik oft sehr praktisch.',
      en: 'The example pulls out the values you need and groups the rest separately. That is very practical in components and serialization logic.',
    },
    exampleCode: `const { id, name, ...meta } = user`,
    explanation: {
      de: 'Die Syntax spart viel Boilerplate, kann aber auch Unschaerfe erzeugen, wenn zu viele Umformungen in einer Zeile passieren. In großen Codebasen ist Lesbarkeit oft wichtiger als maximale Kompaktheit. Besonders Spread wird häufig für tiefe Updates missverstanden, obwohl es nur flach kopiert. Gute Kandidaten zeigen, dass sie die Vorteile nutzen, ohne die semantischen Grenzen zu ignorieren.',
      en: 'The syntax saves a lot of boilerplate, but it can also reduce clarity when too many transformations happen in one line. In larger codebases, readability is often more important than maximum compactness. Spread in particular is often misunderstood for deep updates even though it only copies shallowly. Strong candidates show that they use the feature without ignoring its semantic limits.',
    },
    resources: ['mdnDestructuring', 'mdnSpread', 'mdnArrayReference'],
  }),
  q({
    id: 20,
    category: 'javascript',
    question: {
      de: 'Wann sind `map`, `filter` und `reduce` sinnvoll?',
      en: 'When are `map`, `filter`, and `reduce` the right tools?',
    },
    answer: {
      de: '`map` transformiert jedes Element, `filter` wählt Elemente aus und `reduce` faltet eine Liste zu einem Ergebnis zusammen. Sie sind stark, solange die jeweilige Absicht für Leser sofort klar bleibt. In Senior-Interviews ist eine gute Antwort, dass nicht jede Transformation in `reduce` gepresst werden sollte.',
      en: '`map` transforms every item, `filter` selects items, and `reduce` folds a list into one result. They are powerful as long as the intent stays immediately obvious to the reader. In senior interviews, a good answer is that not every transformation should be crammed into `reduce`.',
    },
    exampleTitle: {
      de: 'Transformation statt Seiteneffekt',
      en: 'Transformation instead of side effect',
    },
    exampleExplanation: {
      de: 'Hier ist die Intention klar: Nur aktive Nutzer werden in Namen umgewandelt. Das ist lesbarer als eine manuell mutierte Schleife.',
      en: 'The intent is clear here: active users are transformed into names. That is often easier to read than a manually mutated loop.',
    },
    exampleCode: `const names = users
  .filter((user) => user.active)
  .map((user) => user.name)`,
    explanation: {
      de: 'Funktionale Array-Methoden foerdern deklarativen Code und sind gut optimierbar zu lesen. Der Nachteil ist, dass tiefe Ketten mit komplexer Business-Logik schnell unklar werden. Dann ist eine normale Schleife manchmal die bessere Wahl, weil sie Zwischenschritte explizit macht. Ein Senior erkennt, dass Klarheit wichtiger ist als eine ideologische Praeferenz für Stilmittel.',
      en: 'Functional array methods encourage declarative code and are easy to reason about when used well. The downside is that long chains with complex business logic become unclear quickly. In those cases, a regular loop can be the better choice because intermediate steps stay explicit. A senior engineer recognizes that clarity matters more than ideological style preferences.',
    },
    resources: ['mdnArrayReference', 'mdnEquality', 'mdnSpread'],
  }),
  q({
    id: 21,
    category: 'javascript',
    question: {
      de: 'Wodurch entstehen typische Memory Leaks im Frontend?',
      en: 'What typically causes memory leaks in frontend applications?',
    },
    answer: {
      de: 'Typische Leaks entstehen durch vergessene Event-Listener, Timer, DOM-Referenzen oder Closures, die große Objekte festhalten. In Single-Page-Apps summiert sich das schnell, weil Komponenten oft mounten und unmounten. Senior-Level heisst hier, Leaks systematisch zu messen und nicht nur zu vermuten.',
      en: 'Typical leaks come from forgotten event listeners, timers, DOM references, or closures that retain large objects. In single-page apps, that adds up quickly because components mount and unmount repeatedly. Senior-level thinking means measuring leaks systematically instead of merely guessing.',
    },
    exampleTitle: {
      de: 'Listener immer wieder aufraeumen',
      en: 'Always clean up listeners',
    },
    exampleExplanation: {
      de: 'Ohne `removeEventListener` würde der Handler weiterleben, obwohl die Funktion vielleicht gar nicht mehr gebraucht wird. Genau so entstehen oft schleichende Leaks.',
      en: 'Without `removeEventListener`, the handler would survive even after the logic is no longer needed. That is how slow leaks often happen.',
    },
    exampleCode: `window.addEventListener('resize', onResize)

return () => {
  window.removeEventListener('resize', onResize)
}`,
    explanation: {
      de: 'Memory Leaks zeigen sich selten sofort, sondern eher in langen Sessions oder auf aelteren Geraeten. Deshalb sind Heap Snapshots, Profiling und reproduzierbare Lasttests wichtig. Wer nur nach offensichtlichen Bugs sucht, verpasst oft graduellen Ressourcenverlust. Eine gute Antwort verbindet Ursachen, Symptome und einen realistischen Debugging-Ansatz.',
      en: 'Memory leaks rarely show up immediately; they usually appear in long sessions or on weaker devices. That is why heap snapshots, profiling, and reproducible load tests matter. If you only look for obvious bugs, you will miss gradual resource loss. A strong answer connects causes, symptoms, and a realistic debugging approach.',
    },
    resources: ['mdnMemory', 'mdnEventBubbling', 'mdnPerformance'],
  }),
  q({
    id: 22,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen Debounce und Throttle?',
      en: 'What is the difference between debounce and throttle?',
    },
    answer: {
      de: 'Debounce verschiebt eine Funktion, bis für eine gewisse Zeit kein neues Event mehr kommt. Throttle begrenzt dagegen, wie oft eine Funktion pro Zeitfenster laufen darf. In Senior-Interviews solltest du erklären, welche UX-Auswirkung beide Strategien auf Suche, Scrollen und Resize haben.',
      en: 'Debounce delays a function until no new event has arrived for a given time. Throttle limits how often a function may run within a time window. In senior interviews, you should explain the UX impact of both approaches on search, scrolling, and resize handling.',
    },
    exampleTitle: {
      de: 'Suche warten lassen statt jeden Tastendruck senden',
      en: 'Delay search instead of sending every keystroke',
    },
    exampleExplanation: {
      de: 'Die API wird erst aufgerufen, wenn der Nutzer kurz aufhoert zu tippen. Das reduziert Last und vermeidet flackernde Resultate.',
      en: 'The API call happens only after the user pauses typing. That reduces load and avoids flickering results.',
    },
    exampleCode: `const debouncedSearch = debounce((term) => {
  fetchResults(term)
}, 250)`,
    explanation: {
      de: 'Beide Techniken sind Performance-Werkzeuge mit unterschiedlichen Produktfolgen. Debounce priorisiert weniger Aufrufe und oft sauberere Ergebnisse, kann aber träge wirken. Throttle reagiert regelmäßigiger, lässt aber bewusst Zwischenereignisse aus. Gute Kandidaten erklären daher nicht nur die Definition, sondern die geeignete Anwendung im Kontext.',
      en: 'Both techniques are performance tools with different product consequences. Debounce favors fewer calls and often cleaner results, but it can feel sluggish. Throttle reacts more regularly, but it intentionally skips intermediate events. Strong candidates explain not just the definitions, but the right application in context.',
    },
    resources: ['mdnPerformance', 'mdnEventLoop', 'mdnBrowserWork'],
  }),
  q({
    id: 23,
    category: 'javascript',
    question: {
      de: 'Wofür eignen sich Generatoren und Iteratoren?',
      en: 'What are generators and iterators good for?',
    },
    answer: {
      de: 'Iteratoren standardisieren, wie Werte schrittweise gelesen werden, und Generatoren machen es leicht, solche Sequenzen selbst zu definieren. Sie sind nützlich für lazy evaluation, kontrollierte Sequenzen und manche Streaming-Szenarien. In einem Senior-Interview reicht es nicht, die Syntax zu kennen; du solltest auch den praktischen Nutzen einschaetzen können.',
      en: 'Iterators standardize how values are read step by step, and generators make it easy to define such sequences yourself. They are useful for lazy evaluation, controlled sequences, and some streaming scenarios. In a senior interview, it is not enough to know the syntax; you should be able to assess the practical value.',
    },
    exampleTitle: {
      de: 'Werte erst bei Bedarf erzeugen',
      en: 'Produce values only when needed',
    },
    exampleExplanation: {
      de: 'Der Generator erzeugt Werte nacheinander und nicht alle auf einmal. Das ist vor allem bei großen oder potenziell unendlichen Sequenzen interessant.',
      en: 'The generator produces values one after another instead of all at once. That is especially useful for large or potentially infinite sequences.',
    },
    exampleCode: `function* ids() {
  let value = 1
  while (true) {
    yield value++
  }
}`,
    explanation: {
      de: 'Im Alltag sieht man Generatoren seltener als Promises oder Array-Methoden, aber sie erklären viel über das Sprachmodell. Sie können eleganter sein als manuell verwaltete Cursor-Objekte. Gleichzeitig sind sie nicht immer die lesbarste Lösung für ein Team. Gute Kandidaten erkennen deshalb, wann ein Generator einen echten Mehrwert bietet und wann normale Funktionen genuegen.',
      en: 'In day-to-day work, generators appear less often than promises or array methods, but they reveal a lot about the language model. They can be cleaner than manually managed cursor objects. At the same time, they are not always the most readable solution for a team. Strong candidates know when a generator adds real value and when a regular function is enough.',
    },
    resources: ['mdnIterators', 'mdnEventLoop', 'mdnArrayReference'],
  }),
  q({
    id: 24,
    category: 'javascript',
    question: {
      de: 'Wozu dient `Symbol` in JavaScript?',
      en: 'What is `Symbol` used for in JavaScript?',
    },
    answer: {
      de: '`Symbol` erzeugt einen eindeutigen primitiven Wert, der oft für kollisionsfreie Objektschlüssel genutzt wird. Bekannte Symbole steuern außerdem Protokolle wie Iteration oder String-Konvertierung. In Senior-Interviews solltest du klar machen, dass `Symbol` ein Spezialwerkzeug und kein Alltagsersatz für Strings ist.',
      en: '`Symbol` creates a unique primitive value that is often used for collision-free object keys. Well-known symbols also power protocols such as iteration or string conversion. In senior interviews, make it clear that `Symbol` is a specialized tool, not a day-to-day replacement for strings.',
    },
    exampleTitle: {
      de: 'Versteckter, kollisionsfreier Key',
      en: 'Hidden, collision-free key',
    },
    exampleExplanation: {
      de: 'Selbst wenn ein anderes Objekt denselben Textnamen verwenden wollte, bleibt das Symbol einzigartig. Das ist bei internem Metadatenzustand hilfreich.',
      en: 'Even if another piece of code uses the same textual description, the symbol stays unique. That is useful for internal metadata.',
    },
    exampleCode: `const id = Symbol('id')
const user = {
  [id]: 42,
}`,
    explanation: {
      de: 'Viele Entwickler kennen `Symbol`, nutzen es aber nie bewusst. Im Interview reicht oft schon die saubere Einordnung: einzigartig, nicht zufällig stringifybar und relevant für Sprachprotokolle. Besonders interessant wird es, wenn du `Symbol.iterator` oder `Symbol.toStringTag` erwähnst. Das zeigt, dass du auch weniger offensichtliche Teile der Sprache verstehst.',
      en: 'Many developers know `Symbol` exists but never use it deliberately. In interviews, a clean classification is often enough: unique, not accidentally stringified, and relevant for language protocols. It becomes especially interesting when you mention `Symbol.iterator` or `Symbol.toStringTag`. That shows you understand less obvious parts of the language as well.',
    },
    resources: ['mdnSymbol', 'mdnIterators', 'mdnPrototypeChain'],
  }),
  q({
    id: 25,
    category: 'javascript',
    question: {
      de: 'Wann sollte man `WeakMap` oder `WeakSet` einsetzen?',
      en: 'When should you use `WeakMap` or `WeakSet`?',
    },
    answer: {
      de: '`WeakMap` und `WeakSet` halten Schlüssel nur schwach referenziert, sodass Garbage Collection weiter möglich bleibt. Das eignet sich für Metadaten an Objekten, Caches oder Memoization ohne künstlich verlaengerte Lebensdauer. Senior-Level heisst hier auch, erklären zu können, warum diese Strukturen nicht iterierbar sind.',
      en: '`WeakMap` and `WeakSet` keep their keys weakly referenced so garbage collection can still free them. That makes them useful for object metadata, caches, or memoization without artificially extending lifetimes. Senior-level answers should also explain why these structures are not iterable.',
    },
    exampleTitle: {
      de: 'Metadaten ohne Leak-Risiko',
      en: 'Metadata without leak risk',
    },
    exampleExplanation: {
      de: 'Sobald `button` nirgendwo sonst mehr referenziert wird, kann auch der WeakMap-Eintrag verschwinden. Das ist bei DOM-bezogenen Caches wertvoll.',
      en: 'Once `button` is no longer referenced elsewhere, the WeakMap entry can disappear as well. That is valuable for DOM-related caches.',
    },
    exampleCode: `const cache = new WeakMap()
cache.set(button, { measuredWidth: 320 })`,
    explanation: {
      de: 'Der Kernpunkt ist Speicherverhalten, nicht API-Form. Mit einer normalen `Map` kann ein Cache unbemerkt Objekte festhalten und so Leaks verursachen. `WeakMap` ist deshalb ein gutes Werkzeug für interne Assoziationen, aber schlecht für Reporting oder Debug-Ausgaben, weil man es nicht durchlaufen kann. Gute Kandidaten erklären also den Trade-off statt nur die Definition.',
      en: 'The core issue is memory behavior, not API shape. With a normal `Map`, a cache can silently retain objects and create leaks. `WeakMap` is therefore great for internal associations, but poor for reporting or debug output because you cannot iterate it. Strong candidates explain that trade-off instead of only giving the definition.',
    },
    resources: ['mdnWeakMap', 'mdnMemory', 'mdnSymbol'],
  }),
  q({
    id: 26,
    category: 'javascript',
    question: {
      de: 'Welche Array-Methoden mutieren und welche nicht?',
      en: 'Which array methods mutate and which do not?',
    },
    answer: {
      de: 'Methoden wie `push`, `pop`, `splice`, `sort` oder `reverse` verändern das ursprüngliche Array. `map`, `filter`, `slice` oder `concat` liefern dagegen neue Werte zurück. In Senior-Interviews ist wichtig zu sagen, dass falsche Annahmen hier schnell zu State-Bugs führen.',
      en: 'Methods like `push`, `pop`, `splice`, `sort`, or `reverse` mutate the original array. `map`, `filter`, `slice`, or `concat` return new values instead. In senior interviews, it matters to mention that wrong assumptions here quickly turn into state bugs.',
    },
    exampleTitle: {
      de: 'Mutierendes `sort` ist ein Klassiker',
      en: 'Mutating `sort` is a classic gotcha',
    },
    exampleExplanation: {
      de: 'Nach `sort` ist das Originalarray verändert. Wer immutables State-Handling erwartet, baut so schnell einen schwer sichtbaren Fehler ein.',
      en: 'After `sort`, the original array has changed. If you expect immutable state handling, this quickly becomes a subtle bug.',
    },
    exampleCode: `const values = [3, 1, 2]
values.sort()
console.log(values) // [1, 2, 3]`,
    explanation: {
      de: 'Array-APIs sind ein Dauerbrenner, weil sie direkt auf UI-State, Memoization und Datenpipelines wirken. Besonders `sort` wirkt harmlos und sorgt trotzdem oft für kaputte Referenzvergleiche. Moderne APIs wie `toSorted()` helfen, wenn Immutability wichtig ist. Gute Kandidaten kennen also nicht nur die Listen, sondern die praktischen Folgen für Architektur und Tests.',
      en: 'Array APIs matter constantly because they directly affect UI state, memoization, and data pipelines. `sort` in particular looks harmless but often breaks reference comparisons. Modern APIs like `toSorted()` help when immutability matters. Strong candidates therefore know not just the list of methods, but also the architectural and testing consequences.',
    },
    resources: ['mdnArrayReference', 'mdnSpread', 'reactState'],
  }),
  q({
    id: 27,
    category: 'javascript',
    question: {
      de: 'Was macht `Object.freeze` und wo sind die Grenzen?',
      en: 'What does `Object.freeze` do and where are the limits?',
    },
    answer: {
      de: '`Object.freeze` verhindert auf der obersten Ebene neue Eigenschaften, Löschungen und Änderungen vorhandener Werte. Es ist aber kein tiefer Schutz für verschachtelte Objekte. In Senior-Gespraechen ist wichtig, zwischen Laufzeit-Schutz, Entwicklungs-Hilfe und echten Immutability-Strategien zu unterscheiden.',
      en: '`Object.freeze` prevents adding, deleting, or changing properties on the top level. It is not a deep protection for nested objects. In senior discussions, it matters to distinguish runtime guard rails from true immutability strategies.',
    },
    exampleTitle: {
      de: 'Gefroren ist nur die erste Ebene',
      en: 'Only the first level is frozen',
    },
    exampleExplanation: {
      de: 'Das Objekt selbst ist gesperrt, aber verschachtelte Werte bleiben veränderbar, solange sie nicht ebenfalls eingefroren wurden.',
      en: 'The object itself is locked, but nested values remain mutable unless they are frozen too.',
    },
    exampleCode: `const config = Object.freeze({
  api: { timeout: 5000 },
})

config.api.timeout = 3000`,
    explanation: {
      de: '`Object.freeze` ist vor allem dann nützlich, wenn du unerwartete Mutationen schnell sichtbar machen willst. Für Business-Logik allein ist es aber selten die ganze Antwort, weil tiefe Strukturen oder externe Bibliotheken weiter Probleme machen können. In großen Systemen sind klare Ownership-Regeln, Tests und Typen meist wichtiger. Eine gute Antwort ordnet `freeze` also als Werkzeug und nicht als Allheilmittel ein.',
      en: '`Object.freeze` is most useful when you want to make unexpected mutations visible quickly. For business logic, however, it is rarely the whole answer because deep structures and external libraries can still cause trouble. In larger systems, clear ownership rules, tests, and types usually matter more. A strong answer positions `freeze` as a tool, not a cure-all.',
    },
    resources: ['mdnFreeze', 'mdnSpread', 'tsEveryday'],
  }),
  q({
    id: 28,
    category: 'javascript',
    question: {
      de: 'Wann sollte man `localStorage`, `sessionStorage` oder Cookies verwenden?',
      en: 'When should you use `localStorage`, `sessionStorage`, or cookies?',
    },
    answer: {
      de: '`localStorage` speichert dauerhaft im Browser, `sessionStorage` nur für den aktuellen Tab- oder Session-Lebenszyklus. Cookies sind klein, werden bei HTTP-Anfragen mitgesendet und eignen sich deshalb für serverrelevante Zwecke wie Session-IDs. Senior-Level bedeutet hier, Sicherheit, Datenschutz und Cache-Strategien mitzudenken.',
      en: '`localStorage` persists in the browser, while `sessionStorage` lasts only for the current tab or session lifecycle. Cookies are small, sent along with HTTP requests, and therefore useful for server-relevant data such as session identifiers. Senior-level answers include security, privacy, and caching considerations.',
    },
    exampleTitle: {
      de: 'UI-Praferenz lokal, Session auf dem Server',
      en: 'Store UI preference locally, keep session server-side',
    },
    exampleExplanation: {
      de: 'Ein Theme eignet sich gut für Web Storage. Auth-Daten gehören dagegen in sichere, serverseitig nutzbare Mechanismen statt in beliebige Browser-Keys.',
      en: 'A theme preference is a good fit for Web Storage. Auth data, by contrast, belongs in secure mechanisms that the server can use safely.',
    },
    exampleCode: `localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme')`,
    explanation: {
      de: 'Interviewfragen dazu prüfen meist, ob du Sicherheits- und Infrastrukturfolgen verstehst. `localStorage` ist einfach, aber für sensible Tokens problematisch, weil XSS direkten Zugriff ermöglicht. Cookies können mit `HttpOnly` und `Secure` sinnvoller für Sessions sein, bringen aber CSRF-Fragen mit. Gute Kandidaten verbinden also API-Wissen mit Sicherheitsmodell und Produktanforderung.',
      en: 'Questions here usually test whether you understand security and infrastructure consequences. `localStorage` is easy, but it is problematic for sensitive tokens because XSS gives direct access. Cookies can be better for sessions with `HttpOnly` and `Secure`, but they bring CSRF concerns. Strong candidates connect API knowledge with the security model and product requirements.',
    },
    resources: ['mdnStorage', 'mdnXss', 'mdnCsrf'],
  }),
  q({
    id: 29,
    category: 'javascript',
    question: {
      de: 'Was ist der Unterschied zwischen Reflow und Repaint?',
      en: 'What is the difference between reflow and repaint?',
    },
    answer: {
      de: 'Ein Reflow berechnet Layout neu, ein Repaint zeichnet vorhandene Pixel neu ohne notwendige Layout-Änderung. Reflows sind in der Regel teurer und können Kettenreaktionen auslösen, wenn viele Mess- und Schreibzugriffe wechseln. In Senior-Rollen solltest du erklären können, wie man Layout Thrashing vermeidet.',
      en: 'A reflow recalculates layout, while a repaint redraws pixels without necessarily changing layout. Reflows are usually more expensive and can trigger cascading work when reads and writes alternate. In senior roles, you should be able to explain how to avoid layout thrashing.',
    },
    exampleTitle: {
      de: 'Lesen und Schreiben nicht wild mischen',
      en: 'Do not mix DOM reads and writes carelessly',
    },
    exampleExplanation: {
      de: 'Wenn du nach einer Stil-Änderung sofort Layoutdaten liest, zwingst du den Browser oft zu synchroner Arbeit. Batching reduziert diese Kosten.',
      en: 'If you read layout information immediately after writing styles, you often force synchronous browser work. Batching reduces that cost.',
    },
    exampleCode: `element.style.width = '200px'
const height = element.offsetHeight`,
    explanation: {
      de: 'Diese Frage ist weniger akademisch, als sie klingt. Wer große Listen, Animationen oder komplexe Dashboards baut, stolpert schnell über unnötige Layout-Arbeit. Ein sauberer Ansatz trennt Messphase und Schreibphase und nutzt wenn nötig CSS- oder Transform-basierte Lösungen. Gute Kandidaten verknuepfen Browser-Interna mit praktischer UI-Performance.',
      en: 'This question is less academic than it sounds. Anyone building large lists, animations, or complex dashboards will run into unnecessary layout work sooner or later. A clean approach separates measurement from mutation and uses CSS or transform-based solutions where possible. Strong candidates connect browser internals with practical UI performance.',
    },
    resources: ['mdnBrowserWork', 'mdnPerformance', 'mdnEventLoop'],
  }),
  q({
    id: 30,
    category: 'javascript',
    question: {
      de: 'Was ist Event Delegation und wann lohnt sie sich?',
      en: 'What is event delegation and when is it useful?',
    },
    answer: {
      de: 'Bei Event Delegation hängt man einen Handler an ein gemeinsames Elternelement und reagiert auf Events seiner Kinder. Das spart Listener, funktioniert gut mit dynamischen Listen und nutzt Bubbling bewusst aus. Senior-Level bedeutet hier, auch Grenzen wie `stopPropagation`, Selektorlogik und Barrierefreiheit zu nennen.',
      en: 'With event delegation, you attach one handler to a shared parent and react to events from its children. It saves listeners, works well with dynamic lists, and intentionally uses bubbling. Senior-level answers also mention limits such as `stopPropagation`, selector logic, and accessibility.',
    },
    exampleTitle: {
      de: 'Ein Listener für viele Buttons',
      en: 'One listener for many buttons',
    },
    exampleExplanation: {
      de: 'Der Container entscheidet anhand des Targets, welcher Button geklickt wurde. Das ist besonders praktisch für dynamisch gerenderte Listen.',
      en: 'The container decides from the target which button was clicked. That is especially practical for dynamically rendered lists.',
    },
    exampleCode: `list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]')
  if (!button) return
  removeItem(button.dataset.id)
})`,
    explanation: {
      de: 'Delegation ist ein einfaches, aber starkes Pattern für performante und flexible UIs. Es reduziert Setup-Aufwand und verhindert, dass du bei jedem neu eingefügten Kind erneut Listener registrieren musst. Gleichzeitig muss die Ereigniskette verstanden werden, sonst entstehen schwer erklärbare Bugs. Wer das Pattern mit Bubbling und Selektoren sauber verbindet, zeigt solides Browserverständnis.',
      en: 'Delegation is a simple but powerful pattern for flexible and performant UIs. It reduces setup work and avoids registering new listeners for every inserted child. At the same time, you must understand the event chain or you will create hard-to-explain bugs. Connecting the pattern cleanly with bubbling and selector logic shows solid browser knowledge.',
    },
    resources: ['mdnEventBubbling', 'mdnPerformance', 'mdnMemory'],
  }),
  q({
    id: 31,
    category: 'javascript',
    question: {
      de: 'Wofür nutzt man `AbortController`?',
      en: 'What is `AbortController` used for?',
    },
    answer: {
      de: '`AbortController` erlaubt es, asynchrone Operationen wie `fetch` gezielt abzubrechen. Das ist wichtig, um veraltete Requests, Race Conditions und unnötige Arbeit zu vermeiden. In Senior-Interviews solltest du erklären, wie Abbruchlogik zu sauberem Ressourcenmanagement beiträgt.',
      en: '`AbortController` lets you cancel asynchronous operations such as `fetch`. That is important for avoiding stale requests, race conditions, and wasted work. In senior interviews, you should explain how cancellation improves resource management.',
    },
    exampleTitle: {
      de: 'Veralteten Request sauber beenden',
      en: 'Cancel a stale request cleanly',
    },
    exampleExplanation: {
      de: 'Beim Wechsel der Suche oder Ansicht kann der alte Request abgebrochen werden. So landet später keine veraltete Antwort mehr im UI.',
      en: 'When the search or view changes, the old request can be canceled. That prevents stale responses from landing in the UI later.',
    },
    exampleCode: `const controller = new AbortController()
fetch('/api/search?q=react', { signal: controller.signal })
controller.abort()`,
    explanation: {
      de: 'Abbruch ist kein Luxus, sondern ein Stabilitätswerkzeug für moderne UIs. Ohne ihn verarbeiten Anwendungen häufig Ergebnisse, die fachlich schon überholt sind. Besonders bei Suchfeldern, Tab-Wechseln oder rasch wechselnden IDs vermeidest du so Flackern und inkonsistenten State. Gute Kandidaten denken deshalb nicht nur an Erfolg und Fehler, sondern auch an bewusstes Beenden.',
      en: 'Cancellation is not a luxury; it is a stability tool for modern UIs. Without it, applications often process results that are already obsolete from a business perspective. Search inputs, tab switches, and rapidly changing IDs are classic cases where cancellation prevents flicker and inconsistent state. Strong candidates therefore think not only about success and failure, but also about intentional termination.',
    },
    resources: ['mdnAbortController', 'mdnFetch', 'mdnAsync'],
  }),
  q({
    id: 32,
    category: 'javascript',
    question: {
      de: 'Wann lohnen sich Web Worker?',
      en: 'When are Web Workers worth using?',
    },
    answer: {
      de: 'Web Worker lohnen sich, wenn CPU-lastige Arbeit den Main Thread blockieren würde, etwa bei Parsing, Bildverarbeitung oder komplexen Berechnungen. Sie verbessern Reaktionsfähigkeit, weil UI und schwere Logik getrennt laufen. In Senior-Interviews solltest du auch Datenübergabe, Serialisierung und Debugging ansprechen.',
      en: 'Web Workers are worth using when CPU-heavy work would otherwise block the main thread, for example with parsing, image processing, or complex calculations. They improve responsiveness because UI and expensive logic run separately. In senior interviews, you should also mention data transfer, serialization, and debugging.',
    },
    exampleTitle: {
      de: 'Schwere Berechnung vom UI entkoppeln',
      en: 'Move expensive work away from the UI thread',
    },
    exampleExplanation: {
      de: 'Die Berechnung läuft im Worker und das UI bleibt klickbar. Das ist bei komplexen Dashboards oder Editoren oft entscheidend.',
      en: 'The calculation runs in the worker and the UI stays interactive. That is often critical in complex dashboards or editors.',
    },
    exampleCode: `worker.postMessage({ type: 'calculate', payload: largeDataset })
worker.onmessage = (event) => {
  renderResult(event.data)
}`,
    explanation: {
      de: 'Workers sind ein starkes Mittel gegen Main-Thread-Blocking, aber sie kommen mit Kosten. Daten müssen seriell übertragen werden, gemeinsame Mutationen entfallen und die Architektur wird etwas komplexer. Genau deshalb ist die Senior-Antwort selten nur "für Performance", sondern beschreibt den konkreten Flaschenhals. Gute Kandidaten benennen den Trade-off klar.',
      en: 'Workers are a strong tool against main-thread blocking, but they come with costs. Data must be transferred serially, shared mutation disappears, and the architecture becomes a bit more complex. That is why the senior answer is rarely just "for performance" and instead names the concrete bottleneck. Strong candidates make the trade-off explicit.',
    },
    resources: ['mdnWorkers', 'mdnEventLoop', 'mdnPerformance'],
  }),
  q({
    id: 33,
    category: 'javascript',
    question: {
      de: 'Wie schützt man Frontends gegen XSS und CSRF?',
      en: 'How do you protect frontend applications against XSS and CSRF?',
    },
    answer: {
      de: 'Gegen XSS hilft vor allem konsequentes Escaping, sichere Rendering-Patterns und das Vermeiden unsicherer HTML-Injektion. Gegen CSRF helfen je nach Architektur SameSite-Cookies, CSRF-Tokens und klare Serverregeln. Senior-Level bedeutet hier, Bedrohungsmodell, Storage-Entscheidungen und Backend-Zusammenspiel zusammenzudenken.',
      en: 'Against XSS, the main defenses are consistent escaping, safe rendering patterns, and avoiding unsafe HTML injection. Against CSRF, common defenses include SameSite cookies, CSRF tokens, and clear server-side validation rules. Senior-level answers connect the threat model, storage choices, and backend collaboration.',
    },
    exampleTitle: {
      de: 'HTML nicht blind in den DOM schreiben',
      en: 'Do not blindly inject HTML into the DOM',
    },
    exampleExplanation: {
      de: 'Wer untrusted HTML direkt rendert, öffnet XSS-Tueren. Sicherer ist standardmäßigig textuelles Rendering oder starkes Sanitizing.',
      en: 'Rendering untrusted HTML directly opens the door to XSS. Safer defaults are text rendering or strong sanitization.',
    },
    exampleCode: `// risky
container.innerHTML = userComment

// safer
container.textContent = userComment`,
    explanation: {
      de: 'Sicherheitsfragen testen oft, ob du über den Browser hinaus denkst. XSS und CSRF sind keine isolierten Frontend-Probleme, sondern Schnittstellenthemen zwischen UI, API und Infrastruktur. Die Wahl von Cookie oder Local Storage, die Nutzung von CSP und das Sanitizing untrusted Daten hängen direkt zusammen. Gute Kandidaten erklären diese Zusammenhänge statt nur Schlagwoerter aufzuzaehlen.',
      en: 'Security questions often test whether you think beyond the browser surface. XSS and CSRF are not isolated frontend problems but boundary issues between UI, API, and infrastructure. Cookie vs local storage choices, CSP usage, and sanitizing untrusted data all connect directly. Strong candidates explain those relationships instead of merely listing buzzwords.',
    },
    resources: ['mdnXss', 'mdnCsrf', 'mdnStorage'],
  }),
  q({
    id: 34,
    category: 'javascript',
    question: {
      de: 'Wie analysiert man Performance-Probleme in einer Web-App sinnvoll?',
      en: 'How do you analyze performance problems in a web app effectively?',
    },
    answer: {
      de: 'Man startet mit Messung statt Vermutung: Profiler, Performance-Timeline, Netzwerkdaten und reproduzierbare Szenarien. Danach trennt man CPU-, Netzwerk-, Speicher- und Rendering-Probleme sauber voneinander. Senior-Level bedeutet hier, die teuerste Stelle zuerst zu optimieren und nicht blind Mikro-Optimierungen zu verteilen.',
      en: 'You start with measurement rather than guessing: profilers, performance timelines, network data, and reproducible scenarios. Then you separate CPU, network, memory, and rendering problems clearly. Senior-level work means optimizing the biggest bottleneck first instead of scattering micro-optimizations everywhere.',
    },
    exampleTitle: {
      de: 'Erst messen, dann optimieren',
      en: 'Measure first, then optimize',
    },
    exampleExplanation: {
      de: 'Ein gezielter Marker macht sichtbar, wie lange eine kritische Phase wirklich dauert. Das ist belastbarer als Bauchgefühl.',
      en: 'A targeted marker shows how long a critical phase actually takes. That is more reliable than intuition.',
    },
    exampleCode: `performance.mark('render-start')
renderBigTable(data)
performance.mark('render-end')
performance.measure('table-render', 'render-start', 'render-end')`,
    explanation: {
      de: 'Viele Performance-Diskussionen scheitern daran, dass Ursache und Symptom verwechselt werden. Ein langsames UI kann vom Netzwerk, von Rendering, von unnötigen Re-Renders oder von Speicherproblemen kommen. Wer methodisch vorgeht, spart Zeit und vermeidet falsche Optimierungen. Genau diese strukturierte Vorgehensweise ist in Senior-Interviews meist wichtiger als ein einzelner API-Name.',
      en: 'Many performance discussions fail because cause and symptom get mixed up. A slow UI can come from the network, rendering, unnecessary re-renders, or memory issues. Working methodically saves time and avoids the wrong optimizations. That structured approach is usually more important in senior interviews than naming a single API.',
    },
    resources: ['mdnPerformance', 'mdnBrowserWork', 'mdnMemory'],
  }),
]

const typescriptQuestions: InterviewQuestion[] = [
  q({
    id: 35,
    category: 'typescript',
    question: {
      de: 'Was ist der Unterschied zwischen `any`, `unknown` und `never`?',
      en: 'What is the difference between `any`, `unknown`, and `never`?',
    },
    answer: {
      de: '`any` schaltet Typpruefung effektiv aus, `unknown` zwingt vor der Nutzung zu einer sicheren Verengung und `never` beschreibt Werte, die nie auftreten duerfen. Für Senior-Rollen ist wichtig, diese drei bewusst als Signale für Sicherheitsniveau und Kontrollfluss zu lesen. `unknown` ist fast immer die bessere Wahl als `any`, wenn ein Wert noch validiert werden muss.',
      en: '`any` effectively disables type checking, `unknown` forces safe narrowing before use, and `never` describes values that must never occur. For senior roles, it matters to read all three as signals about safety level and control flow. `unknown` is almost always better than `any` when a value still needs validation.',
    },
    exampleTitle: {
      de: 'Unbekannte Daten erst validieren',
      en: 'Validate unknown data first',
    },
    exampleExplanation: {
      de: 'Mit `unknown` musst du prüfen, bevor du Eigenschaften liest. Genau das macht untrusted Input sauberer handhabbar.',
      en: 'With `unknown`, you must check before reading properties. That is exactly what makes untrusted input safer to handle.',
    },
    exampleCode: `function parseUser(value: unknown) {
  if (typeof value === 'object' && value !== null && 'name' in value) {
    return value
  }
  throw new Error('Invalid user')
}`,
    explanation: {
      de: 'Diese drei Typen markieren extreme Punkte des Typsystems. `any` ist der schnelle Ausweg mit späteren Risiken, `unknown` ist der sichere Eingangspunkt für Fremddaten und `never` ist wertvoll für Exhaustiveness-Checks. Wer das gut erklärt, zeigt Verständnis für Typdesign statt bloss Syntax. Genau das ist bei Senior-TypeScript entscheidend.',
      en: 'These three types mark extreme points in the type system. `any` is the fast escape hatch with later risks, `unknown` is the safe entry point for external data, and `never` is valuable for exhaustiveness checks. Explaining that well shows type-design understanding instead of mere syntax knowledge. That is exactly what matters in senior TypeScript work.',
    },
    resources: ['tsEveryday', 'tsNarrowing', 'tsStrict'],
  }),
  q({
    id: 36,
    category: 'typescript',
    question: {
      de: 'Wann nutzt man `type` und wann `interface`?',
      en: 'When do you use `type` and when `interface`?',
    },
    answer: {
      de: '`interface` ist stark für Objektvertraege und Erweiterung über `extends` oder Declaration Merging. `type` ist flexibler für Unions, Tuples und komplexe Typkombinationen. Auf Senior-Level ist weniger die Dogmatik wichtig als ein konsistenter Stil im Team.',
      en: '`interface` is strong for object contracts and extension via `extends` or declaration merging. `type` is more flexible for unions, tuples, and complex type composition. At senior level, consistency within the team matters more than ideology.',
    },
    exampleTitle: {
      de: 'Objektvertrag plus kombinierter Alias',
      en: 'Object contract plus composed alias',
    },
    exampleExplanation: {
      de: 'Das Interface beschreibt die Grundform, der Type-Alias kombiniert sie mit zusätzlichen Regeln. Diese Mischung ist in realen Codebasen häufig.',
      en: 'The interface describes the base shape, and the type alias combines it with extra rules. That mix is common in real codebases.',
    },
    exampleCode: `interface User {
  id: string
  name: string
}

type Admin = User & { role: 'admin' }`,
    explanation: {
      de: 'Viele Diskussionen zu `type` vs `interface` sind historisch oder stilistisch gepraegt. Praktisch wichtig ist, welche Form für Erweiterung, Lesbarkeit und Tooling am besten passt. `interface` kann bei öffentlichen Objektvertraegen sehr klar sein, während `type` bei Komposition oft eleganter ist. Gute Kandidaten erklären deshalb die Unterschiede ohne in Dogmen zu verfallen.',
      en: 'Many `type` vs `interface` debates are historical or stylistic. What matters in practice is which form works best for extension, readability, and tooling. `interface` can be very clear for public object contracts, while `type` is often more elegant for composition. Strong candidates explain the differences without turning them into dogma.',
    },
    resources: ['tsObjects', 'tsDeclarationMerging', 'tsEveryday'],
  }),
  q({
    id: 37,
    category: 'typescript',
    question: {
      de: 'Was lösen Generics in TypeScript?',
      en: 'What problem do generics solve in TypeScript?',
    },
    answer: {
      de: 'Generics erlauben wiederverwendbare Typen und Funktionen, ohne dabei die konkrete Typinformation zu verlieren. Sie machen APIs flexibel und gleichzeitig typsicher. Senior-Level bedeutet hier, gute Typbeziehungen zu modellieren statt `T` nur dekorativ zu verwenden.',
      en: 'Generics let you create reusable types and functions without losing concrete type information. They make APIs flexible while staying type-safe. At senior level, the important part is modeling meaningful type relationships instead of using `T` decoratively.',
    },
    exampleTitle: {
      de: 'Der Rückgabetyp hängt vom Input ab',
      en: 'The return type depends on the input',
    },
    exampleExplanation: {
      de: 'Die Funktion gibt denselben Typ zurück, den sie erhalten hat. Genau diese Beziehung kann TypeScript mit Generics ausdrücken.',
      en: 'The function returns the same type it receives. That exact relationship is what generics express.',
    },
    exampleCode: `function identity<T>(value: T): T {
  return value
}`,
    explanation: {
      de: 'Generics sind das Rückgrat guter Bibliotheks- und App-APIs in TypeScript. Sie verhindern, dass Typinformationen auf `any` oder zu breite Basistypen verwässert werden. Gleichzeitig können überkomplexe Generics Wartbarkeit kosten und Fehlermeldungen verschlechtern. Gute Kandidaten zeigen daher, dass sie einfache, belastbare Abstraktionen bevorzugen.',
      en: 'Generics are the backbone of good library and application APIs in TypeScript. They prevent type information from collapsing into `any` or overly broad base types. At the same time, overcomplicated generics can hurt maintainability and make errors harder to read. Strong candidates show that they prefer simple, durable abstractions.',
    },
    resources: ['tsGenerics', 'tsFunctions', 'tsEveryday'],
  }),
  q({
    id: 38,
    category: 'typescript',
    question: {
      de: 'Wozu dienen Generic Constraints mit `extends`?',
      en: 'What are generic constraints with `extends` for?',
    },
    answer: {
      de: 'Constraints begrenzen, welche Typen ein Generic akzeptieren darf, damit die Implementierung bestimmte Eigenschaften sicher nutzen kann. So bleibt die API flexibel, aber nicht beliebig. In Senior-Interviews sollte klar werden, dass Constraints echte Anforderungen abbilden und nicht nur Compiler-Beschwichtigung sind.',
      en: 'Constraints limit which types a generic may accept so the implementation can safely rely on certain properties. That keeps the API flexible without making it arbitrary. In senior interviews, it should be clear that constraints model real requirements rather than just satisfying the compiler.',
    },
    exampleTitle: {
      de: 'Nur Werte mit `id` akzeptieren',
      en: 'Accept only values with an `id`',
    },
    exampleExplanation: {
      de: 'Durch die Constraint ist garantiert, dass `item.id` existiert. Gleichzeitig bleibt offen, welche weiteren Felder das Objekt hat.',
      en: 'The constraint guarantees that `item.id` exists while still leaving other fields open.',
    },
    exampleCode: `function getId<T extends { id: string }>(item: T) {
  return item.id
}`,
    explanation: {
      de: 'Constraints sind besonders wertvoll bei Utility-Funktionen und generischen Komponenten. Ohne sie landet man oft bei unklaren Assertions oder zu weiten Typen. Mit guten Constraints wird der Vertrag explizit, und Fehlermeldungen werden für Nutzer der API sinnvoller. Das ist ein typisches Senior-Signal: Typen beschreiben fachliche Grenzen statt sie zu verschleiern.',
      en: 'Constraints are especially valuable for utility functions and generic components. Without them, teams often end up with vague assertions or overly broad types. Good constraints make the contract explicit and produce more meaningful errors for API consumers. That is a classic senior signal: types describe domain boundaries rather than hiding them.',
    },
    resources: ['tsGenerics', 'tsObjects', 'tsFunctions'],
  }),
  q({
    id: 39,
    category: 'typescript',
    question: {
      de: 'Was sind Union Types und Intersection Types?',
      en: 'What are union types and intersection types?',
    },
    answer: {
      de: 'Eine Union bedeutet, dass ein Wert eine von mehreren Formen haben kann. Eine Intersection kombiniert mehrere Typen zu einem strengeren Gesamtvertrag. Senior-Level bedeutet, diese beiden Konzepte gezielt für Modellierung statt aus Versehen für unlesbare Typraetsel zu nutzen.',
      en: 'A union means a value may have one of several shapes. An intersection combines several types into one stricter contract. Senior-level work means using both for modeling on purpose instead of accidentally creating unreadable type puzzles.',
    },
    exampleTitle: {
      de: 'Entweder-oder vs. sowohl-als-auch',
      en: 'Either-or vs both-and',
    },
    exampleExplanation: {
      de: 'Die Union erlaubt verschiedene Eingaben, die Intersection fuegt Zusatzeigenschaften zusammen. Beide Muster sind in API-Modellen häufig.',
      en: 'The union allows different inputs, while the intersection combines extra properties into one type. Both patterns are common in API models.',
    },
    exampleCode: `type Result = 'ok' | 'error'
type UserWithMeta = User & { createdAt: string }`,
    explanation: {
      de: 'Unions sind ideal für Zustandsmodelle, Rollen oder API-Responses mit klaren Varianten. Intersections sind stark, wenn du mehrere Eigenschaften zu einem Vertrag zusammensetzen willst. Gefährlich wird es, wenn dadurch sehr breite oder schwer nachvollziehbare Typkonstrukte entstehen. Gute Kandidaten erklären deshalb auch, wann ein einfacheres Modell besser ist.',
      en: 'Unions are ideal for state models, roles, or API responses with clear variants. Intersections are strong when you want to combine several properties into one contract. They become dangerous when they lead to broad or hard-to-follow type constructions. Strong candidates therefore explain when a simpler model is the better choice.',
    },
    resources: ['tsEveryday', 'tsNarrowing', 'tsObjects'],
  }),
  q({
    id: 40,
    category: 'typescript',
    question: {
      de: 'Was ist Type Narrowing und wie erreicht man es?',
      en: 'What is type narrowing and how do you achieve it?',
    },
    answer: {
      de: 'Type Narrowing bedeutet, dass TypeScript innerhalb eines Kontrollflusses auf eine spezifischere Form eines Typs schliessen kann. Das gelingt etwa mit `typeof`, `in`, `instanceof` oder benutzerdefinierten Guards. In Senior-Interviews solltest du betonen, dass gute Narrowing-Pfade Laufzeitpruefungen und Typmodell zusammenbringen.',
      en: 'Type narrowing means TypeScript can infer a more specific type within a control-flow branch. That is achieved with checks such as `typeof`, `in`, `instanceof`, or custom guards. In senior interviews, emphasize that good narrowing ties runtime validation to the type model.',
    },
    exampleTitle: {
      de: 'Kontrollfluss verfeinert den Typ',
      en: 'Control flow refines the type',
    },
    exampleExplanation: {
      de: 'Innerhalb des Branches weiss TypeScript, dass `value` ein String ist. Dadurch wird unsichere Cast-Logik überflüssig.',
      en: 'Inside the branch, TypeScript knows that `value` is a string. That removes the need for unsafe casts.',
    },
    exampleCode: `function format(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(2)
}`,
    explanation: {
      de: 'Narrowing ist zentral, weil viele realistische Datenmodelle Unions enthalten. Ohne saubere Laufzeitpruefung bleibt der Code entweder unsicher oder voller Assertions. Mit guten Guards entsteht dagegen selbsterklärender Code, der Compiler und Leser gleichermassen hilft. Das ist ein gutes Beispiel dafür, wie TypeScript gutes Design foerdern kann.',
      en: 'Narrowing is central because many realistic data models contain unions. Without clean runtime checks, the code stays either unsafe or full of assertions. With good guards, the result is self-explanatory code that helps both the compiler and the reader. That is a good example of TypeScript encouraging better design.',
    },
    resources: ['tsNarrowing', 'tsEveryday', 'tsFunctions'],
  }),
  q({
    id: 41,
    category: 'typescript',
    question: {
      de: 'Was sind Discriminated Unions und warum sind sie so stark?',
      en: 'What are discriminated unions and why are they powerful?',
    },
    answer: {
      de: 'Discriminated Unions sind Unions mit einem gemeinsamen Kennfeld wie `type` oder `kind`, über das TypeScript Varianten sauber unterscheiden kann. Sie machen Zustandsmodelle, Reducer und API-Ergebnisse sehr robust. Senior-Level bedeutet hier, Exhaustiveness und Wartbarkeit als eigentlichen Nutzen zu benennen.',
      en: 'Discriminated unions are unions with a shared tag field such as `type` or `kind` that lets TypeScript distinguish variants cleanly. They make state models, reducers, and API results very robust. Senior-level answers point to exhaustiveness and maintainability as the real benefits.',
    },
    exampleTitle: {
      de: 'Ein Feld steuert die ganze Variante',
      en: 'One field drives the whole variant',
    },
    exampleExplanation: {
      de: 'Über `state.status` weiss der Compiler sofort, welche Eigenschaften verfügbar sind. Das macht Zustandslogik sehr explizit.',
      en: 'From `state.status`, the compiler immediately knows which properties are available. That makes state logic very explicit.',
    },
    exampleCode: `type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string }`,
    explanation: {
      de: 'Dieses Pattern verhindert ganze Klassen von Bugs, weil ungültige Kombinationen gar nicht modellierbar sind. Statt optionaler Felder für alles baust du echte, fachlich saubere Varianten. Das verbessert auch Refactoring, weil fehlende Branches compilerseitig sichtbar werden. Genau deshalb gehören Discriminated Unions zu den wichtigsten Senior-Patterns in TypeScript.',
      en: 'This pattern prevents entire classes of bugs because invalid combinations are not representable in the first place. Instead of making everything optional, you model real domain variants. That also improves refactoring because missing branches become compiler-visible. That is why discriminated unions are one of the most important senior patterns in TypeScript.',
    },
    resources: ['tsNarrowing', 'tsEveryday', 'tsFunctions'],
  }),
  q({
    id: 42,
    category: 'typescript',
    question: {
      de: 'Wann sind Utility Types wie `Partial`, `Pick` und `Omit` sinnvoll?',
      en: 'When are utility types like `Partial`, `Pick`, and `Omit` useful?',
    },
    answer: {
      de: 'Utility Types helfen, bestehende Typen gezielt umzubauen, statt doppelte Strukturen manuell zu pflegen. Das spart Duplikate und erhält Typbeziehungen. Senior-Level bedeutet aber auch, Utility Types nicht als Ersatz für klare Domain-Typen zu missbrauchen.',
      en: 'Utility types help you reshape existing types without manually duplicating structures. That reduces duplication while preserving type relationships. Senior-level use also means not abusing utility types as a replacement for clear domain models.',
    },
    exampleTitle: {
      de: 'Formtyp aus Basistyp ableiten',
      en: 'Derive a form type from a base type',
    },
    exampleExplanation: {
      de: 'Hier wird ein Edit-Formular direkt aus dem vorhandenen Typ abgeleitet. Das reduziert Drift zwischen API- und UI-Modell.',
      en: 'Here, an edit form is derived directly from the existing type. That reduces drift between API and UI models.',
    },
    exampleCode: `type UserEdit = Pick<User, 'name' | 'email'>
type UserPatch = Partial<UserEdit>`,
    explanation: {
      de: 'Diese Typen sind hervorragend für Adapterschichten, DTOs und Formularlogik. Problematisch wird es, wenn daraus kryptische Typketten entstehen, die niemand mehr lesen will. Dann ist ein expliziter Typ oft die bessere Wahl. Gute Kandidaten zeigen, dass sie DRY und Lesbarkeit gegeneinander abwaegen können.',
      en: 'These types are excellent for adapter layers, DTOs, and form logic. They become problematic when they create cryptic type chains that nobody wants to read anymore. In that case, an explicit type is often better. Strong candidates show that they can balance DRY principles against readability.',
    },
    resources: ['tsUtility', 'tsMapped', 'tsObjects'],
  }),
  q({
    id: 43,
    category: 'typescript',
    question: {
      de: 'Was sind Mapped Types?',
      en: 'What are mapped types?',
    },
    answer: {
      de: 'Mapped Types erzeugen neue Typen, indem sie systematisch über die Keys eines bestehenden Typs iterieren. So lässt sich Logik wie optional, readonly oder transformierte Feldtypen zentral beschreiben. Senior-Level bedeutet, das Muster sparsam und für echte Wiederholung einzusetzen.',
      en: 'Mapped types create new types by systematically iterating over the keys of an existing type. That lets you describe logic such as optional, readonly, or transformed field types in one place. Senior-level use means applying the pattern sparingly for real repetition.',
    },
    exampleTitle: {
      de: 'Alle Felder auf boolean abbilden',
      en: 'Map every field to boolean',
    },
    exampleExplanation: {
      de: 'Der neue Typ behält dieselben Keys, verändert aber den Werttyp für jede Eigenschaft. Das ist das Kernprinzip eines Mapped Type.',
      en: 'The new type keeps the same keys but changes the value type for every property. That is the core idea of a mapped type.',
    },
    exampleCode: `type Flags<T> = {
  [K in keyof T]: boolean
}`,
    explanation: {
      de: 'Mapped Types sind ein extrem produktives Werkzeug für Bibliotheken und größere Apps. Sie helfen, wiederkehrende Formen konsistent abzuleiten, statt jede Variante manuell nachzubauen. Gleichzeitig werden Typen schnell abstrakt, wenn man zu viele Ebenen kombiniert. Gute Kandidaten kennen deshalb Nutzen und Lesbarkeitsgrenze gleichermassen.',
      en: 'Mapped types are a highly productive tool for libraries and larger applications. They help derive recurring shapes consistently instead of rebuilding every variation by hand. At the same time, types become abstract quickly when too many layers are combined. Strong candidates know both the benefit and the readability limit.',
    },
    resources: ['tsMapped', 'tsUtility', 'tsGenerics'],
  }),
  q({
    id: 44,
    category: 'typescript',
    question: {
      de: 'Was sind Conditional Types?',
      en: 'What are conditional types?',
    },
    answer: {
      de: 'Conditional Types erlauben Typentscheidungen nach dem Muster `A extends B ? X : Y`. Damit lassen sich generische APIs stark präzisieren. In Senior-Interviews ist wichtig zu sagen, dass dieses Werkzeug maechig ist, aber schnell unlesbar werden kann.',
      en: 'Conditional types allow type decisions in the form `A extends B ? X : Y`. That makes generic APIs much more precise. In senior interviews, it is important to say that the tool is powerful but can become unreadable quickly.',
    },
    exampleTitle: {
      de: 'Typverhalten von Input abhängig machen',
      en: 'Make type behavior depend on the input',
    },
    exampleExplanation: {
      de: 'Der resultierende Typ hängt vom übergebenen Typ ab. Das ist typisch für fortgeschrittene Hilfstypen.',
      en: 'The resulting type depends on the given type. That is common in advanced helper types.',
    },
    exampleCode: `type IdOf<T> = T extends { id: infer U } ? U : never`,
    explanation: {
      de: 'Conditional Types sind oft die Brücke zwischen einfacher Typisierung und echter API-Modellierung. Sie können überraschend viel Ausdruckskraft liefern, etwa für Extraktion, Filterung oder Fallback-Typen. Gleichzeitig explodiert die Komplexität schnell, wenn verschachtelte Bedingungen aufeinandertreffen. Gute Kandidaten zeigen daher Zurückhaltung und Klarheit im Design.',
      en: 'Conditional types are often the bridge between simple typing and real API modeling. They can provide a surprising amount of expressiveness for extraction, filtering, or fallback types. At the same time, complexity explodes quickly when nested conditions stack up. Strong candidates therefore show restraint and clarity in their design.',
    },
    resources: ['tsConditional', 'tsGenerics', 'tsNarrowing'],
  }),
  q({
    id: 45,
    category: 'typescript',
    question: {
      de: 'Was macht `infer` in Conditional Types?',
      en: 'What does `infer` do in conditional types?',
    },
    answer: {
      de: '`infer` erlaubt es, einen Teil eines Typs innerhalb eines Conditional Type herauszuziehen und als neuen Typparameter zu binden. Das ist nützlich für Rückgabetypen, Promise-Werte oder Feldextraktion. Senior-Level bedeutet, `infer` gezielt für Lesbarkeit statt für Typ-Zauber zu verwenden.',
      en: '`infer` lets you extract part of a type inside a conditional type and bind it as a new type variable. It is useful for return types, promise values, or field extraction. Senior-level use means applying `infer` for clarity rather than type magic.',
    },
    exampleTitle: {
      de: 'Promise-Wert auslesen',
      en: 'Extract the value inside a promise',
    },
    exampleExplanation: {
      de: '`infer` holt hier den Typ im Promise heraus. Genau so funktionieren viele eingebaute Utility-Typen unter der Haube.',
      en: '`infer` pulls out the type inside the promise here. That is how many built-in utility types work under the hood.',
    },
    exampleCode: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T`,
    explanation: {
      de: 'Mit `infer` lassen sich aus komplexen Typen gezielt Teilinformationen gewinnen. Das ist stark für Bibliotheken und Integrationsschichten, aber nicht immer nötig für App-Code. In großen Teams zaehlt vor allem, ob der nächste Entwickler den Typ noch versteht. Gute Kandidaten kennen deshalb die Technik und ihren angemessenen Einsatzbereich.',
      en: 'With `infer`, you can extract targeted pieces of information from complex types. That is powerful for libraries and integration layers, but not always necessary in application code. In larger teams, what matters most is whether the next developer can still understand the type. Strong candidates therefore know both the technique and its appropriate scope.',
    },
    resources: ['tsConditional', 'tsGenerics', 'tsUtility'],
  }),
  q({
    id: 46,
    category: 'typescript',
    question: {
      de: 'Sollte man Enums verwenden oder lieber Literal-Typen mit `as const`?',
      en: 'Should you use enums or prefer literal types with `as const`?',
    },
    answer: {
      de: 'Enums sind eine eigene Laufzeitkonstruktion von TypeScript, während Literal-Typen mit `as const` meist leichtergewichtig und besser mit JavaScript interagieren. Viele Teams bevorzugen heute konstante Objekte plus Union-Typen. In Senior-Interviews solltest du den Unterschied zwischen Typ- und Laufzeitmodell klar machen.',
      en: 'Enums are their own TypeScript runtime construct, while literal types with `as const` are usually lighter and integrate better with JavaScript. Many teams now prefer constant objects plus union types. In senior interviews, clarify the difference between the type-level and runtime-level model.',
    },
    exampleTitle: {
      de: 'Leichtgewichtiges Alternativmuster',
      en: 'A lightweight alternative pattern',
    },
    exampleExplanation: {
      de: 'Das Objekt liefert Laufzeitwerte, und über `typeof` plus `keyof` entsteht daraus ein sauberer Typ. So bleibt die Lösung nah an JavaScript.',
      en: 'The object provides runtime values, and `typeof` plus `keyof` gives you a clean type. That keeps the solution close to JavaScript.',
    },
    exampleCode: `const roles = {
  admin: 'admin',
  editor: 'editor',
} as const

type Role = (typeof roles)[keyof typeof roles]`,
    explanation: {
      de: 'Enums sind nicht automatisch falsch, aber sie bringen zusätzliche Semantik und teils unerwartetes Emit-Verhalten mit. In modernen Web-Apps sind einfache, konstante Objekte oft leichter zu lesen und zu testen. Gleichzeitig kann ein klassisches Enum in bestimmten Domains sinnvoll bleiben. Eine gute Senior-Antwort benennt also Trade-offs statt nur Trends.',
      en: 'Enums are not automatically wrong, but they bring extra semantics and sometimes surprising emit behavior. In modern web apps, simple constant objects are often easier to read and test. At the same time, a classic enum can still make sense in certain domains. A good senior answer names the trade-offs rather than just repeating trends.',
    },
    resources: ['tsEnums', 'tsEveryday', 'tsObjects'],
  }),
  q({
    id: 47,
    category: 'typescript',
    question: {
      de: 'Wofür braucht man Literal Types und `as const`?',
      en: 'Why do literal types and `as const` matter?',
    },
    answer: {
      de: 'Literal Types beschreiben ganz konkrete Werte wie `"loading"` statt nur `string`. `as const` verhindert das Aufweiten zu allgemeinen Typen und markiert Werte zusätzlich als readonly. Senior-Level bedeutet hier, damit stabile Konfigurationen und diskriminierte Modelle zu bauen.',
      en: 'Literal types describe exact values such as `"loading"` instead of just `string`. `as const` prevents widening to broader types and also marks values as readonly. Senior-level use means building stable configuration objects and discriminated models with them.',
    },
    exampleTitle: {
      de: 'Konfiguration ohne Typ-Verwaesserung',
      en: 'Configuration without type widening',
    },
    exampleExplanation: {
      de: 'Ohne `as const` würden die Werte oft nur als `string` landen. Mit der Konstante bleiben die exakten Literale erhalten.',
      en: 'Without `as const`, the values would often widen to plain `string`. With the const assertion, the exact literals are preserved.',
    },
    exampleCode: `const statusMap = {
  idle: 'idle',
  loading: 'loading',
} as const`,
    explanation: {
      de: 'Dieses Feature wirkt klein, ist aber für viele elegante Typmuster entscheidend. Es verbindet reale Laufzeitobjekte mit präzisen Typen, ohne doppelten Pflegeaufwand. Besonders für Reducer, Routen, Events oder Config-Keys ist das sehr stark. Gute Kandidaten nutzen solche Mittel, um Typen aus Daten abzuleiten statt sie getrennt zu duplizieren.',
      en: 'This feature looks small, but it is crucial for many elegant type patterns. It connects real runtime objects with precise types without requiring double maintenance. It is especially strong for reducers, routes, events, or config keys. Strong candidates use it to derive types from data instead of duplicating them separately.',
    },
    resources: ['tsEveryday', 'tsSatisfies', 'tsObjects'],
  }),
  q({
    id: 48,
    category: 'typescript',
    question: {
      de: 'Was bringen `readonly` und unveränderliche Typen in TypeScript?',
      en: 'What do `readonly` and immutable types buy you in TypeScript?',
    },
    answer: {
      de: '`readonly` verhindert auf Typebene versehentliche Mutation und macht Änderbarkeit in einer API explizit. Das hilft bei Funktionsparametern, Konfigurationen und gemeinsam genutzten Daten, weil Seiteneffekte früher sichtbar werden. Es ist aber kein tiefer Laufzeitschutz, sondern in erster Linie ein Typvertrag und Design-Signal.',
      en: '`readonly` prevents accidental mutation at the type level and makes mutability explicit in an API. That helps with function parameters, configuration objects, and shared data because side effects become visible earlier. It is not deep runtime protection, though; it is primarily a type contract and design signal.',
    },
    exampleTitle: {
      de: 'Intent in der Signatur sichtbar machen',
      en: 'Make intent visible in the signature',
    },
    exampleExplanation: {
      de: 'Wer `ReadonlyArray` akzeptiert, verspricht den Input nicht zu verändern. Das ist besonders für Utility-Funktionen und Shared State sauber.',
      en: 'Accepting `ReadonlyArray` promises that the input will not be mutated. That is especially clean for utilities and shared state.',
    },
    exampleCode: `function sum(values: ReadonlyArray<number>) {
  return values.reduce((total, value) => total + value, 0)
}`,
    explanation: {
      de: 'Immutability ist nicht nur ein React-Thema, sondern ein allgemeiner API-Vertrag. `readonly` hilft, diese Absicht früh in Signaturen zu verankern und Mutationen schon beim Schreiben des Codes sichtbar zu machen. Trotzdem bleibt Laufzeitmutation möglich, wenn dieselben Objekte an anderer Stelle ohne Schutz verändert werden; dafür braucht es zusätzliche Maßnahmen wie defensive Kopien, Kapselung oder `Object.freeze`. Gute Erklärungen trennen deshalb sauber zwischen Typdisziplin, API-Design und echtem Runtime-Schutz.',
      en: 'Immutability is not only a React topic; it is a general API contract. `readonly` helps encode that intention directly in signatures and makes mutations visible while you write the code. At the same time, runtime mutation remains possible when the same objects are changed elsewhere without protection; for that, you need additional measures such as defensive copies, encapsulation, or `Object.freeze`. Good explanations therefore separate type discipline, API design, and actual runtime protection clearly.',
    },
    resources: ['tsEveryday', 'tsMapped', 'mdnFreeze'],
  }),
  q({
    id: 49,
    category: 'typescript',
    question: {
      de: 'Wann sind Function Overloads sinnvoll?',
      en: 'When are function overloads useful?',
    },
    answer: {
      de: 'Overloads sind sinnvoll, wenn dieselbe Funktion mehrere klar unterscheidbare, benutzerfreundliche Aufrufmuster unterstuetzen soll. Sie geben den Call-Sites präzisere Typen als ein einzelner breiter Union-Ansatz. In Senior-Interviews ist wichtig, Overloads nicht für beliebige Komplexität zu missbrauchen.',
      en: 'Overloads are useful when one function should support several clearly distinct, user-friendly call patterns. They give call sites more precise types than one overly broad union signature. In senior interviews, it matters not to abuse overloads for arbitrary complexity.',
    },
    exampleTitle: {
      de: 'Unterschiedliche Eingaben, klare Rückgabe',
      en: 'Different inputs, clear return types',
    },
    exampleExplanation: {
      de: 'Je nach Signatur weiss der Aufrufer genau, ob ein `Date` oder ein Array zurückkommt. Das macht APIs oft ergonomischer.',
      en: 'Depending on the signature, the caller knows exactly whether the result is a `Date` or an array. That often makes APIs more ergonomic.',
    },
    exampleCode: `function parse(value: string): Date
function parse(value: string[]): Date[]
function parse(value: string | string[]) {
  return Array.isArray(value) ? value.map((entry) => new Date(entry)) : new Date(value)
}`,
    explanation: {
      de: 'Overloads sind besonders für Bibliotheks-APIs oder kleine Helfer mit starkem DX-Fokus interessant. Wenn die Implementierung aber viele Zweige und Sonderfälle bekommt, wird meist eine aufgespaltene API klarer. Eine gute Senior-Antwort zeigt also, wann Ergonomie einen Overload rechtfertigt und wann Einfachheit wichtiger ist. Das ist mehr API-Design als Typ-Trick.',
      en: 'Overloads are especially interesting for library APIs or small helpers with a strong DX focus. But once the implementation gains many branches and edge cases, splitting the API is often clearer. A good senior answer therefore explains when ergonomics justify an overload and when simplicity matters more. This is more about API design than type tricks.',
    },
    resources: ['tsFunctions', 'tsNarrowing', 'tsGenerics'],
  }),
  q({
    id: 50,
    category: 'typescript',
    question: {
      de: 'Was ist Declaration Merging und wo begegnet man ihm?',
      en: 'What is declaration merging and where do you encounter it?',
    },
    answer: {
      de: 'Declaration Merging bedeutet, dass TypeScript mehrere Deklarationen mit demselben Namen zu einem gemeinsamen Typ zusammensetzen kann. Das sieht man oft bei Interfaces, globalen Erweiterungen oder Bibliotheks-Typen. Senior-Level bedeutet hier, die Macht zu kennen, aber auch die Verwirrung, die dadurch entstehen kann.',
      en: 'Declaration merging means TypeScript can combine multiple declarations with the same name into one resulting type. You often see it with interfaces, global extensions, or library typings. Senior-level understanding includes both its power and the confusion it can cause.',
    },
    exampleTitle: {
      de: 'Interface später erweitern',
      en: 'Extend an interface later',
    },
    exampleExplanation: {
      de: 'Beide Deklarationen werden zusammengeführt. Das ist für Framework-Erweiterungen praktisch, aber auch schnell unübersichtlich.',
      en: 'Both declarations are merged. That is practical for framework augmentation, but it can also become opaque quickly.',
    },
    exampleCode: `interface Request {
  userId?: string
}

interface Request {
  traceId?: string
}`,
    explanation: {
      de: 'Dieses Verhalten ist nützlich für Modul-Augmentation und öffentliche Erweiterungspunkte. Gleichzeitig kann es Debugging erschweren, wenn Typen scheinbar aus dem Nichts wachsen. In großen Teams sollte Declaration Merging deshalb bewusst und dokumentiert eingesetzt werden. Gute Kandidaten nennen Nutzen und Wartbarkeitskosten gleichermassen.',
      en: 'This behavior is useful for module augmentation and public extension points. At the same time, it can make debugging harder when types seem to grow out of nowhere. In larger teams, declaration merging should therefore be used intentionally and documented. Strong candidates mention both the benefit and the maintenance cost.',
    },
    resources: ['tsDeclarationMerging', 'tsDeclarationFiles', 'tsModules'],
  }),
  q({
    id: 51,
    category: 'typescript',
    question: {
      de: 'Was bringen `import type` und type-only Exports?',
      en: 'What do `import type` and type-only exports buy you?',
    },
    answer: {
      de: '`import type` markiert Importe, die nur für den Compiler und nicht für die Laufzeit gedacht sind. Das macht Absicht klarer und verhindert in manchen Toolchains unnötige Runtime-Abhängigkeiten. Senior-Level bedeutet hier, Typ- und Laufzeitgrenzen bewusst sauber zu halten.',
      en: '`import type` marks imports that exist only for the compiler and not for runtime. That makes intent clearer and can prevent unnecessary runtime dependencies in some toolchains. Senior-level thinking keeps type-level and runtime-level boundaries clean on purpose.',
    },
    exampleTitle: {
      de: 'Nur Typwissen importieren',
      en: 'Import type information only',
    },
    exampleExplanation: {
      de: 'Der Import wird nur für Typpruefung benötigt. Das ist gerade in Build- und Bundle-Kontexten eine nützliche Klarstellung.',
      en: 'The import is needed only for type checking. That clarification is especially useful in build and bundle contexts.',
    },
    exampleCode: `import type { User } from './types'

export function renderUser(user: User) {
  return user.name
}`,
    explanation: {
      de: 'Dieses Feature ist klein, aber es verbessert die Trennung von Design-Time und Runtime. Besonders bei ESM, Tree Shaking und gemischten Toolchains werden solche Details plötzlich relevant. In großen Codebasen hilft type-only Syntax auch der Lesbarkeit, weil sofort sichtbar ist, worauf der Code wirklich zur Laufzeit zugreift. Gute Kandidaten bringen deshalb Tooling-Verständnis mit hinein.',
      en: 'This feature is small, but it improves the separation between design time and runtime. It becomes especially relevant with ESM, tree shaking, and mixed toolchains. In larger codebases, type-only syntax also improves readability because it immediately shows what the code actually needs at runtime. Strong candidates bring tooling awareness into the answer.',
    },
    resources: ['tsModules', 'tsEveryday', 'mdnModules'],
  }),
  q({
    id: 52,
    category: 'typescript',
    question: {
      de: 'Warum ist `strict` in `tsconfig` so wichtig?',
      en: 'Why is `strict` in `tsconfig` so important?',
    },
    answer: {
      de: '`strict` aktiviert eine Gruppe strengerer Checks, die unpräzise Typisierung und Laufzeitrisiken früh sichtbar machen. Das kostet anfangs mehr Disziplin, spart später aber Refactoring-Zeit und Bugs. Senior-Level bedeutet, Strictness als Investition in Wartbarkeit zu begreifen und schrittweise einzuführen, wenn nötig.',
      en: '`strict` enables a group of stronger checks that expose imprecise typing and runtime risks early. It costs more discipline upfront but saves refactoring time and bugs later. Senior-level thinking treats strictness as an investment in maintainability and introduces it incrementally when necessary.',
    },
    exampleTitle: {
      de: 'Compiler als frühe Qualitätssicherung',
      en: 'Use the compiler as early quality control',
    },
    exampleExplanation: {
      de: 'Mit strengeren Checks werden unsaubere Nullfälle oder implizite Anys sofort sichtbar. Genau dadurch steigt die Qualität im Alltag.',
      en: 'With stricter checks, messy null cases and implicit anys become visible immediately. That is exactly how day-to-day quality improves.',
    },
    exampleCode: `{
  "compilerOptions": {
    "strict": true
  }
}`,
    explanation: {
      de: 'Die eigentliche Frage ist weniger technisch als kulturell: Wie ernst meint ein Team Typsicherheit? `strict` verschiebt Fehler früh in die Entwicklung und reduziert spätere Überraschungen. Bei bestehenden Projekten braucht es oft eine Migrationsstrategie statt eines Big Bang. Gute Kandidaten sprechen daher über Nutzen, Kosten und Einführungsweg.',
      en: 'The real question is less technical than cultural: how seriously does a team take type safety? `strict` shifts errors earlier into development and reduces later surprises. In existing projects, it often requires a migration strategy instead of a big bang. Strong candidates therefore talk about value, cost, and rollout.',
    },
    resources: ['tsStrict', 'tsStrictNullChecks', 'tsMigration'],
  }),
  q({
    id: 53,
    category: 'typescript',
    question: {
      de: 'Was ändert `strictNullChecks` in der Praxis?',
      en: 'What does `strictNullChecks` change in practice?',
    },
    answer: {
      de: 'Mit `strictNullChecks` sind `null` und `undefined` nicht mehr stillschweigend in jedem Typ enthalten. Dadurch müssen fehlende Werte explizit modelliert und behandelt werden. In Senior-Interviews ist wichtig zu sagen, dass das nicht nur den Compiler, sondern das Datenmodell verbessert.',
      en: 'With `strictNullChecks`, `null` and `undefined` are no longer silently allowed in every type. That forces missing values to be modeled and handled explicitly. In senior interviews, it matters to say that this improves not just the compiler feedback, but the data model itself.',
    },
    exampleTitle: {
      de: 'Fehlende Werte explizit machen',
      en: 'Make missing values explicit',
    },
    exampleExplanation: {
      de: 'Der Code muss sichtbar entscheiden, ob `name` vorhanden ist. Das verhindert eine große Klasse späterer Laufzeitfehler.',
      en: 'The code has to decide explicitly whether `name` is present. That prevents a large class of later runtime errors.',
    },
    exampleCode: `function greet(name: string | undefined) {
  if (!name) return 'Hello stranger'
  return 'Hello ' + name
}`,
    explanation: {
      de: 'Viele Produktionsbugs sind letztlich nur schlecht modellierte Nullfälle. `strictNullChecks` zwingt dazu, diese Fälle sichtbar zu machen, statt sie implizit zu tolerieren. Das führt oft zu besseren API-Vertraegen, klareren Komponenten und robusteren Formularfluesen. Gute Kandidaten verstehen diese Option als Qualitätshebel und nicht als Lästigkeit.',
      en: 'Many production bugs are ultimately just badly modeled null cases. `strictNullChecks` forces those cases into the open instead of tolerating them implicitly. That often leads to better API contracts, clearer components, and more robust form flows. Strong candidates see this option as a quality lever rather than a nuisance.',
    },
    resources: ['tsStrictNullChecks', 'tsNarrowing', 'mdnNullish'],
  }),
  q({
    id: 54,
    category: 'typescript',
    question: {
      de: 'Wofür ist der `satisfies`-Operator gut?',
      en: 'What is the `satisfies` operator good for?',
    },
    answer: {
      de: '`satisfies` prüft, ob ein Wert zu einem Zieltyp passt, ohne dabei seine konkreteren Literal-Informationen zu verlieren. Das ist besonders nützlich für Konfigurationen und Mappings. Senior-Level bedeutet hier, den Unterschied zu einer harten Typannotation oder einem Cast sauber zu erklären.',
      en: '`satisfies` checks whether a value matches a target type without throwing away its more specific literal information. That is especially useful for configuration objects and mappings. Senior-level answers explain how it differs from a hard type annotation or a cast.',
    },
    exampleTitle: {
      de: 'Pruefen ohne Information zu verlieren',
      en: 'Validate without losing information',
    },
    exampleExplanation: {
      de: 'Das Objekt wird gegen den Vertrag geprüft, aber die konkreten Literalwerte bleiben erhalten. Das ist ideal für typsichere Configs.',
      en: 'The object is validated against the contract, but its concrete literal values stay intact. That is ideal for type-safe configs.',
    },
    exampleCode: [
      'const routes = {',
      "  home: '/',",
      "  profile: '/profile',",
      '} satisfies Record<string, `/${string}`>',
    ].join('\n'),
    explanation: {
      de: 'Vor `satisfies` musste man oft zwischen Präzision und Pruefung wählen. Mit diesem Operator lassen sich beide Ziele eleganter kombinieren. Gerade bei Objektliteralen für Routen, Labels oder Rollen ist das sehr hilfreich. Gute Kandidaten erkennen daran, dass TypeScript nicht nur strenger, sondern auch ausdrucksstärker geworden ist.',
      en: 'Before `satisfies`, teams often had to choose between precision and validation. This operator lets you combine both more elegantly. That is especially helpful for object literals such as routes, labels, or role maps. Strong candidates recognize it as an example of TypeScript becoming not just stricter, but more expressive.',
    },
    resources: ['tsSatisfies', 'tsEveryday', 'tsObjects'],
  }),
  q({
    id: 55,
    category: 'typescript',
    question: {
      de: 'Wann nimmt man `Record` und wann eher `Map`?',
      en: 'When do you use `Record` and when do you prefer `Map`?',
    },
    answer: {
      de: '`Record` ist ein statischer Objektvertrag für bekannte Schlüsselformen und passt gut zu JSON-ähnlichen Daten. `Map` ist eine Laufzeitdatenstruktur mit flexibleren Keys und besserem Verhalten für häufige Inserts oder Deletes. Senior-Level bedeutet hier, Typmodell und Laufzeitverhalten gemeinsam zu betrachten.',
      en: '`Record` is a static object contract for known key shapes and works well with JSON-like data. `Map` is a runtime data structure with more flexible keys and better behavior for frequent inserts or deletes. Senior-level thinking considers both the type model and the runtime behavior together.',
    },
    exampleTitle: {
      de: 'Konfiguration vs. dynamischer Index',
      en: 'Configuration vs dynamic index',
    },
    exampleExplanation: {
      de: 'Ein `Record` ist ideal für feste Rollenflags. Bei dynamischen Objekt-Keys oder häufigen Updates kann eine `Map` sinnvoller sein.',
      en: 'A `Record` is ideal for fixed role flags. With dynamic object keys or frequent updates, a `Map` can be the better fit.',
    },
    exampleCode: `type RoleFlags = Record<'admin' | 'editor', boolean>
const cache = new Map<string, number>()`,
    explanation: {
      de: 'Diese Frage prüft, ob du Typen mit echten Datenstrukturen verwechselst. `Record` existiert nur im Typraum, `Map` wirkt im Laufzeitverhalten. Wer das sauber trennt, kann passendere APIs bauen und Performancefragen besser beantworten. Gute Kandidaten nennen daher nicht nur Syntax, sondern den Einsatzkontext.',
      en: 'This question tests whether you confuse types with real data structures. `Record` exists only in the type space, while `Map` affects runtime behavior. If you separate both cleanly, you can build better APIs and answer performance questions more accurately. Strong candidates therefore describe not just syntax, but usage context.',
    },
    resources: ['tsUtility', 'tsObjects', 'mdnWeakMap'],
  }),
  q({
    id: 56,
    category: 'typescript',
    question: {
      de: 'Was sind Branded Types und wann sind sie hilfreich?',
      en: 'What are branded types and when are they helpful?',
    },
    answer: {
      de: 'Branded Types sind nominal ähnliche Muster auf Basis struktureller Typen, um semantisch unterschiedliche primitive Werte zu trennen. So kann man etwa `UserId` und `OrderId` unterscheiden, obwohl beide Strings sind. In Senior-Interviews geht es darum, ob du fachliche Sicherheit über den Typraum ausdrücken kannst.',
      en: 'Branded types are nominal-like patterns built on top of structural types so semantically different primitive values stay distinct. They let you separate `UserId` and `OrderId` even if both are strings. In senior interviews, the real point is whether you can encode domain safety in the type system.',
    },
    exampleTitle: {
      de: 'Gleiches Format, andere Bedeutung',
      en: 'Same shape, different meaning',
    },
    exampleExplanation: {
      de: 'Obwohl beide zur Laufzeit Strings sind, verhindert der Typ versehentliches Mischen. Das ist bei IDs und Währungen sehr hilfreich.',
      en: 'Even though both are strings at runtime, the type system prevents mixing them accidentally. That is very useful for IDs and currencies.',
    },
    exampleCode: `type UserId = string & { readonly __brand: 'UserId' }
type OrderId = string & { readonly __brand: 'OrderId' }`,
    explanation: {
      de: 'TypeScript ist strukturell, daher braucht es für semantische Unterschiede manchmal Zusatzmuster. Brands sind eine mögliche Antwort darauf, wenn Fachfehler teuer waeren. Man sollte sie aber sparsam einsetzen, weil sie sonst Onboarding und Ergonomie belasten. Gute Kandidaten kennen also die Technik und ihre wirtschaftliche Rechtfertigung.',
      en: 'TypeScript is structural, so semantic distinctions sometimes require additional patterns. Brands are one possible answer when domain mistakes would be costly. They should still be used sparingly because they can hurt onboarding and ergonomics. Strong candidates know both the technique and the business case for it.',
    },
    resources: ['tsEveryday', 'tsGenerics', 'tsTypeCompatibility'],
  }),
  q({
    id: 57,
    category: 'typescript',
    question: {
      de: 'Wie tippt man API-Responses sinnvoll, ohne sich in falscher Sicherheit zu wiegen?',
      en: 'How do you type API responses without creating false confidence?',
    },
    answer: {
      de: 'TypeScript-Typen allein validieren keine Netzwerkdaten; sie beschreiben nur Annahmen im Code. Deshalb sollte man API-Responses an der Grenze validieren und erst dann in strengere interne Typen überführen. Senior-Level bedeutet hier, zwischen Compile-Time-Sicherheit und Runtime-Realität sauber zu unterscheiden.',
      en: 'TypeScript types alone do not validate network data; they only describe assumptions in your code. That is why API responses should be validated at the boundary and only then converted into stricter internal types. Senior-level thinking separates compile-time safety from runtime reality.',
    },
    exampleTitle: {
      de: 'Externe Daten erst prüfen, dann verwenden',
      en: 'Validate external data before using it',
    },
    exampleExplanation: {
      de: 'Die Response wird zuerst als `unknown` behandelt. Erst nach Validierung sollte sie in einen echten App-Typ übergehen.',
      en: 'The response is treated as `unknown` first. Only after validation should it move into a real application type.',
    },
    exampleCode: `const raw: unknown = await response.json()
const user = userSchema.parse(raw)`,
    explanation: {
      de: 'Das ist eine der wichtigsten Senior-Fragen in TypeScript, weil sie Systemschnittstellen betrifft. Viele Codebasen sind intern sauber getypt, aber vertrauen externen Daten blind. Das führt zu einer truegerischen Sicherheit, die erst in Produktion sichtbar wird. Gute Kandidaten sprechen deshalb über Parsing, Fehlerpfade und Grenzen zwischen Transport- und Domain-Modell.',
      en: 'This is one of the most important senior TypeScript questions because it is about system boundaries. Many codebases are typed cleanly internally but trust external data blindly. That creates a false sense of safety that only breaks in production. Strong candidates therefore talk about parsing, failure paths, and the boundary between transport and domain models.',
    },
    resources: ['tsNarrowing', 'tsMigration', 'tsEveryday'],
  }),
  q({
    id: 58,
    category: 'typescript',
    question: {
      de: 'Was ist bei der Typisierung von React Props und Events wichtig?',
      en: 'What matters when typing React props and events?',
    },
    answer: {
      de: 'Wichtig ist, Props möglichst präzise zu beschreiben und Event-Typen an die konkrete Quelle zu binden. Zu breite Typen wie `any` oder generische `Event`-Signaturen verlieren schnell Sicherheitsgewinn. Senior-Level bedeutet hier, Component-APIs als öffentliche Vertraege ernst zu nehmen.',
      en: 'It is important to type props as precisely as possible and tie event types to the actual source element. Broad types like `any` or generic `Event` signatures quickly lose most of the safety benefit. Senior-level thinking treats component APIs as public contracts.',
    },
    exampleTitle: {
      de: 'Form-Event konkret typisieren',
      en: 'Type the form event concretely',
    },
    exampleExplanation: {
      de: 'Der Event-Typ passt exakt zum verwendeten HTML-Element. Dadurch sind Werte wie `currentTarget.value` sauber typisiert.',
      en: 'The event type matches the exact HTML element in use. That keeps values like `currentTarget.value` properly typed.',
    },
    exampleCode: `type SearchInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}`,
    explanation: {
      de: 'Komponenten sind kleine APIs, und TypeScript macht ihre Benutzung explizit. Sauber getypte Props vermeiden Missverständnisse zwischen Teams und verbessern Autocomplete ebenso wie Refactoring. Das gilt besonders für Children, Render Props und Event-Handler. Gute Kandidaten zeigen, dass sie Typisierung als Teil von DX und Wartbarkeit sehen.',
      en: 'Components are small APIs, and TypeScript makes their usage explicit. Well-typed props reduce misunderstandings across teams and improve autocomplete as well as refactoring. That matters especially for children, render props, and event handlers. Strong candidates show that they see typing as part of DX and maintainability.',
    },
    resources: ['tsFunctions', 'reactProps', 'reactInput'],
  }),
  q({
    id: 59,
    category: 'typescript',
    question: {
      de: 'Wie baut man generische React-Komponenten sinnvoll?',
      en: 'How do you build generic React components sensibly?',
    },
    answer: {
      de: 'Generische React-Komponenten sind sinnvoll, wenn sie echte Wiederverwendung über unterschiedliche Datentypen bieten, etwa für Tabellen oder Selects. Entscheidend ist, dass die API für Nutzer der Komponente klar bleibt. Senior-Level bedeutet, Generics nur dort zu verwenden, wo sie Lesbarkeit und Sicherheit wirklich erhöhen.',
      en: 'Generic React components are useful when they provide real reuse across different data types, such as tables or selects. The key is keeping the API clear for the component consumer. Senior-level judgment means using generics only where they genuinely improve readability and safety.',
    },
    exampleTitle: {
      de: 'Typbeziehung bis zur Render-Funktion erhalten',
      en: 'Preserve the type relationship through the render function',
    },
    exampleExplanation: {
      de: 'Die Komponente weiss weiterhin, welchen Typ jedes Listenelement hat. Dadurch bleibt auch `renderItem` exakt typisiert.',
      en: 'The component still knows the type of each list item. That keeps `renderItem` precisely typed as well.',
    },
    exampleCode: `type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}`,
    explanation: {
      de: 'Generische Komponenten sind maechig, aber nicht automatisch besser. Wenn ihre Signatur schwer lesbar wird, sinkt der Wert schnell. Oft hilft es, Defaults, Constraints oder Hilfstypen zu setzen, damit die API für Konsumenten einfach bleibt. Gute Kandidaten denken also nicht nur an Wiederverwendung, sondern an Benutzbarkeit.',
      en: 'Generic components are powerful, but they are not automatically better. If their signature becomes hard to read, their value drops quickly. Defaults, constraints, or helper types often help keep the API simple for consumers. Strong candidates therefore think not only about reuse, but also about usability.',
    },
    resources: ['tsGenerics', 'reactThinking', 'reactProps'],
  }),
  q({
    id: 60,
    category: 'typescript',
    question: {
      de: 'Wofür sind `.d.ts`-Dateien und ambient declarations da?',
      en: 'What are `.d.ts` files and ambient declarations for?',
    },
    answer: {
      de: '`.d.ts`-Dateien beschreiben Typen für bestehende Laufzeitobjekte oder Bibliotheken, ohne selbst JavaScript zu erzeugen. Ambient Declarations sind wichtig, wenn du globale Variablen, externe Skripte oder ungetypte Pakete beschreiben musst. Senior-Level bedeutet hier, die Grenze zwischen Typbeschreibung und Implementierung sauber zu halten.',
      en: '`.d.ts` files describe types for existing runtime values or libraries without emitting JavaScript themselves. Ambient declarations matter when you need to describe globals, external scripts, or untyped packages. Senior-level understanding keeps the boundary between type description and implementation clean.',
    },
    exampleTitle: {
      de: 'Globales Objekt explizit typisieren',
      en: 'Type a global object explicitly',
    },
    exampleExplanation: {
      de: 'So kann der Compiler ein global verfügbares Objekt verstehen, auch wenn es von außerhalb deiner Build-Pipeline kommt.',
      en: 'This allows the compiler to understand a globally available object even if it comes from outside your build pipeline.',
    },
    exampleCode: `declare global {
  interface Window {
    analytics: { track: (event: string) => void }
  }
}`,
    explanation: {
      de: 'Ambient Typen sind besonders bei Legacy-Systemen, SDKs oder Framework-Erweiterungen relevant. Sie können Ordnung schaffen, aber auch Realität und Annahmen auseinanderdriften lassen, wenn niemand sie pflegt. Deshalb ist eine knappe, gut dokumentierte Beschreibung oft besser als überambitionierte Komplettmodelle. Gute Kandidaten nennen sowohl Nutzen als auch Wartungsrisiko.',
      en: 'Ambient types are especially relevant in legacy systems, SDKs, or framework extensions. They can create order, but reality and assumptions drift apart if nobody maintains them. That is why a small, well-documented description is often better than an overambitious complete model. Strong candidates mention both the value and the maintenance risk.',
    },
    resources: ['tsDeclarationFiles', 'tsDeclarationMerging', 'tsModules'],
  }),
  q({
    id: 61,
    category: 'typescript',
    question: {
      de: 'Welche Fallstricke haben Path Aliases?',
      en: 'What pitfalls come with path aliases?',
    },
    answer: {
      de: 'Path Aliases verbessern Lesbarkeit, können aber zwischen TypeScript, Bundler, Tests und Runtime-Konfiguration auseinanderlaufen. Dann funktioniert der Import im Editor, aber nicht im Build oder auf dem Server. Senior-Level bedeutet, Toolchain-Konsistenz wichtiger zu nehmen als kosmetische kürzere Pfade.',
      en: 'Path aliases improve readability, but they can drift between TypeScript, the bundler, tests, and runtime configuration. Then the import works in the editor but fails in the build or on the server. Senior-level thinking values toolchain consistency over cosmetically shorter paths.',
    },
    exampleTitle: {
      de: 'Alias muss überall gleich konfiguriert sein',
      en: 'The alias must be configured everywhere',
    },
    exampleExplanation: {
      de: 'Der Alias allein in `tsconfig` reicht oft nicht. Vite, Jest oder Node müssen dieselbe Auflösung ebenfalls kennen.',
      en: 'Defining the alias only in `tsconfig` is often not enough. Vite, Jest, or Node must understand the same resolution too.',
    },
    exampleCode: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}`,
    explanation: {
      de: 'Aliase sind besonders in großen Frontends attraktiv, weil relative Pfade schnell unlesbar werden. Gleichzeitig multiplizieren sie Konfigurationsstellen und damit die Chance für Inkonsistenzen. Deshalb lohnt sich ein bewusst kleines, gut dokumentiertes Alias-Set. Gute Kandidaten verbinden die Diskussion mit Build- und Testrealität.',
      en: 'Aliases are attractive in large frontends because deeply relative paths become unreadable quickly. At the same time, they multiply configuration points and therefore the chance of inconsistencies. That is why a deliberately small and well-documented alias set is worth it. Strong candidates connect the discussion to build and test reality.',
    },
    resources: ['tsPaths', 'tsModules', 'tsMigration'],
  }),
  q({
    id: 62,
    category: 'typescript',
    question: {
      de: 'Was sollte man über Type Compatibility und Varianz wissen?',
      en: 'What should you know about type compatibility and variance?',
    },
    answer: {
      de: 'TypeScript ist strukturell typisiert, daher sind Typen kompatibel, wenn ihre Form passt, nicht wenn ihr Name gleich ist. Bei Funktionen wird es interessanter, weil Parameterpositionen und Rückgabetypen unterschiedlich auf Varianz reagieren. Senior-Level bedeutet hier, potenziell unsichere Zuweisungen erkennen zu können.',
      en: 'TypeScript uses structural typing, so types are compatible when their shape matches, not when their names match. Functions make this more interesting because parameter positions and return types react differently to variance. Senior-level understanding means spotting assignments that look convenient but are unsafe.',
    },
    exampleTitle: {
      de: 'Form ist wichtiger als Name',
      en: 'Shape matters more than the name',
    },
    exampleExplanation: {
      de: 'Obwohl die Typen verschiedene Namen haben, sind sie kompatibel, weil ihre Struktur übereinstimmt. Genau das ist das Kernprinzip der strukturellen Typisierung.',
      en: 'Even though the types have different names, they are compatible because their structure matches. That is the core idea of structural typing.',
    },
    exampleCode: `type A = { id: string }
type B = { id: string }

const value: A = { id: '1' }
const other: B = value`,
    explanation: {
      de: 'Dieses Thema ist relevant, sobald du Bibliotheken designst oder komplexe Callback-Typen definierst. Strukturelle Kompatibilität fühlt sich oft angenehm an, kann aber semantische Unterschiede verschleifen. Genau deshalb greifen manche Teams bei kritischen Werten zu Brands oder engeren APIs. Gute Kandidaten erklären die praktischen Folgen statt nur Theoriebegriffe.',
      en: 'This topic matters as soon as you design libraries or define complex callback types. Structural compatibility often feels convenient, but it can blur semantic differences. That is exactly why some teams use brands or tighter APIs for critical values. Strong candidates explain the practical consequences instead of only naming theory terms.',
    },
    resources: ['tsTypeCompatibility', 'tsFunctions', 'tsGenerics'],
  }),
  q({
    id: 63,
    category: 'typescript',
    question: {
      de: 'Wie nutzt man `never` für Exhaustiveness Checks?',
      en: 'How do you use `never` for exhaustiveness checks?',
    },
    answer: {
      de: 'Mit `never` kann man den Compiler zwingen, alle Varianten einer Union vollstaendig abzudecken. Fehlt später ein neuer Branch, entsteht direkt ein Typfehler. In Senior-Interviews solltest du erklären, dass das Refactoring deutlich sicherer macht.',
      en: 'With `never`, you can force the compiler to ensure that every union variant is handled. If a new branch is added later and not covered, you get a type error immediately. In senior interviews, explain that this makes refactoring much safer.',
    },
    exampleTitle: {
      de: 'Neue Varianten nicht still übersehen',
      en: 'Do not silently miss new variants',
    },
    exampleExplanation: {
      de: 'Sobald eine neue Statusvariante hinzukommt, fällt der fehlende `switch`-Zweig sofort auf. Das ist besonders in Reducern und State-Maschinen stark.',
      en: 'As soon as a new status variant is added, the missing `switch` branch becomes visible immediately. That is especially powerful in reducers and state machines.',
    },
    exampleCode: `function assertNever(value: never): never {
  throw new Error('Unexpected value: ' + value)
}`,
    explanation: {
      de: 'Exhaustiveness ist einer der größten praktischen Vorteile von Discriminated Unions. Statt verstreuter Default-Branches bekommst du gezielte Compiler-Hinweise, sobald sich das Modell erweitert. Das reduziert stille Fehler bei Weiterentwicklung enorm. Gute Kandidaten verstehen `never` deshalb als Werkzeug für sichere Evolution des Codes.',
      en: 'Exhaustiveness is one of the biggest practical benefits of discriminated unions. Instead of scattered default branches, you get targeted compiler feedback whenever the model grows. That dramatically reduces silent bugs during evolution. Strong candidates therefore understand `never` as a tool for safe code evolution.',
    },
    resources: ['tsNarrowing', 'tsFunctions', 'tsEveryday'],
  }),
  q({
    id: 64,
    category: 'typescript',
    question: {
      de: 'Wie sollte man auf Decorators in TypeScript schauen?',
      en: 'How should you think about decorators in TypeScript?',
    },
    answer: {
      de: 'Decorators können Metadaten und Querschnittslogik elegant wirken lassen, bringen aber auch Magie und Tooling-Komplexität mit. Man sollte sie nicht nur als bequemen Syntax-Zucker sehen, sondern als bewusstes Architekturmittel mit Folgen für Debugging und Testbarkeit. Senior-Level heisst hier: Zurückhaltung und klare Begruendung.',
      en: 'Decorators can make metadata and cross-cutting logic look elegant, but they also introduce magic and tooling complexity. They should not be seen as convenient syntax sugar alone, but as an architectural choice with consequences for debugging and testability. Senior-level thinking means restraint and a clear justification.',
    },
    exampleTitle: {
      de: 'Querschnittslogik nicht gratis',
      en: 'Cross-cutting logic is not free',
    },
    exampleExplanation: {
      de: 'Ein Decorator kann Logging oder DI verknuepfen, verschiebt Verhalten aber auch weg von der eigentlichen Implementierung. Das ist der eigentliche Trade-off.',
      en: 'A decorator can wire in logging or DI, but it also moves behavior away from the implementation itself. That is the real trade-off.',
    },
    exampleCode: `@logExecution
class UserService {}`,
    explanation: {
      de: 'In Frameworks können Decorators sehr produktiv sein, etwa für DI oder Metadaten. Gleichzeitig machen sie Code indirekter und Fehleranalysen schwieriger, wenn zu viel implizit passiert. Darum sollte ihr Nutzen gegen Transparenz und Portabilität abgewogen werden. Gute Kandidaten liefern keine reflexhafte Pro- oder Contra-Antwort, sondern Kontext.',
      en: 'In frameworks, decorators can be highly productive, for example for DI or metadata. At the same time, they make code more indirect and debugging harder when too much happens implicitly. Their value should therefore be weighed against transparency and portability. Strong candidates do not give a reflexive pro or con answer; they give context.',
    },
    resources: ['tsDecorators', 'tsDeclarationFiles', 'tsModules'],
  }),
  q({
    id: 65,
    category: 'typescript',
    question: {
      de: 'Warum kombiniert man TypeScript oft mit Runtime-Validierung wie Zod?',
      en: 'Why is TypeScript often paired with runtime validation such as Zod?',
    },
    answer: {
      de: 'TypeScript prüft nur zur Compile-Zeit, während Runtime-Validierung echte Daten an Schnittstellen absichert. Die Kombination schliesst also die Lücke zwischen Annahme und Wirklichkeit. Senior-Level bedeutet hier, Typen und Validierung als komplementaer statt als Konkurrenz zu verstehen.',
      en: 'TypeScript checks only at compile time, while runtime validation protects real data at system boundaries. The combination closes the gap between assumption and reality. Senior-level thinking treats typing and validation as complementary rather than competing tools.',
    },
    exampleTitle: {
      de: 'Grenze hart validieren, innen strikt typisieren',
      en: 'Validate hard at the boundary, stay strict inside',
    },
    exampleExplanation: {
      de: 'Das Schema prüft echte Laufzeitdaten. Danach kann der restliche Code mit einem verlässlichen, getypten Objekt arbeiten.',
      en: 'The schema validates real runtime data. After that, the rest of the code can work with a trustworthy typed object.',
    },
    exampleCode: `const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})`,
    explanation: {
      de: 'Diese Kombination ist besonders an API-Grenzen, Formularen und Umgebungsvariablen stark. Sie verhindert, dass unsichere Fremddaten sofort tief in deine App einsickern. Gleichzeitig sollte Validierung gezielt und nicht unnötig an jeder Stelle wiederholt werden. Gute Kandidaten denken also in Grenzen und Verantwortlichkeiten.',
      en: 'This combination is especially strong at API boundaries, forms, and environment variables. It prevents unsafe external data from leaking deep into the application immediately. At the same time, validation should be targeted and not repeated unnecessarily at every layer. Strong candidates think in boundaries and responsibilities.',
    },
    resources: ['tsNarrowing', 'tsMigration', 'tsStrict'],
  }),
  q({
    id: 66,
    category: 'typescript',
    question: {
      de: 'Wie migriert man ein größeres JavaScript-Projekt sinnvoll nach TypeScript?',
      en: 'How do you migrate a larger JavaScript project to TypeScript sensibly?',
    },
    answer: {
      de: 'Eine sinnvolle Migration passiert inkrementell: kritische Module zuerst, klare Grenzen, gute CI und keine Illusion eines perfekten Sofortsprungs. `allowJs`, `checkJs` und schrittweise Strictness helfen dabei. Senior-Level bedeutet hier, technische und organisatorische Risiken gemeinsam zu steuern.',
      en: 'A sensible migration is incremental: start with critical modules, define clear boundaries, keep CI strong, and avoid the illusion of a perfect instant rewrite. `allowJs`, `checkJs`, and gradual strictness all help. Senior-level work means steering technical and organizational risk together.',
    },
    exampleTitle: {
      de: 'Schrittweise statt Big Bang',
      en: 'Incremental instead of big bang',
    },
    exampleExplanation: {
      de: 'Der Compiler kann JavaScript zunächst mitprüfen, bevor jede Datei sofort komplett umgestellt wird. Das ist für echte Teams viel realistischer.',
      en: 'The compiler can start checking JavaScript before every file is fully converted. That is much more realistic for real teams.',
    },
    exampleCode: `{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}`,
    explanation: {
      de: 'Migrationen scheitern oft weniger an Syntax als an Priorisierung und Erwartungsmanagement. Wenn Kernpfade, Datenmodelle und Schnittstellen zuerst typisiert werden, steigt der Nutzen früh sichtbar. Gleichzeitig braucht es Leitplanken für neue Dateien und klare Ownership für Problemzonen. Gute Kandidaten sprechen deshalb über Strategie, nicht nur über Features.',
      en: 'Migrations fail less on syntax than on prioritization and expectation management. When core paths, data models, and boundaries are typed first, the value becomes visible early. At the same time, teams need guardrails for new files and clear ownership of problem areas. Strong candidates therefore talk about strategy, not just features.',
    },
    resources: ['tsMigration', 'tsStrict', 'tsDeclarationFiles'],
  }),
  q({
    id: 67,
    category: 'typescript',
    question: {
      de: 'Wann werden TypeScript-Typen selbst zum Performance-Problem?',
      en: 'When do TypeScript types become a performance problem themselves?',
    },
    answer: {
      de: 'Sehr tiefe, rekursive oder stark verschachtelte Typkonstruktionen können die Compiler-Leistung deutlich verschlechtern. Das betrifft vor allem komplexe Hilfstypen in Bibliotheken oder generischen DSLs. Senior-Level bedeutet hier, Typpräzision gegen Build-Zeit und Lesbarkeit abzuwiegen.',
      en: 'Very deep, recursive, or heavily nested type constructions can significantly hurt compiler performance. This mainly shows up in complex helper types for libraries or generic DSLs. Senior-level judgment balances type precision against build time and readability.',
    },
    exampleTitle: {
      de: 'Nicht jeder Hilfstyp skaliert gut',
      en: 'Not every helper type scales well',
    },
    exampleExplanation: {
      de: 'Ein sehr allgemeiner Deep-Type kann beeindruckend wirken, aber Editor und Compiler spuerbar verlangsamen. Dann ist weniger Abstraktion oft besser.',
      en: 'A very generic deep type may look impressive but can slow down the editor and compiler noticeably. In that case, less abstraction is often better.',
    },
    exampleCode: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}`,
    explanation: {
      de: 'Type-Level-Engineering hat reale Kosten. Wenn IDE-Autocomplete stockt oder Builds unnötig lange laufen, ist das kein theoretisches Problem mehr. Dann lohnt es sich, komplexe Typketten zu vereinfachen oder gezielte explizite Typen zu schreiben. Gute Kandidaten erkennen, dass auch das Typsystem selbst pragmatisch designt werden muss.',
      en: 'Type-level engineering has real costs. Once IDE autocomplete stalls or builds take too long, the issue is no longer theoretical. That is when simplifying complex type chains or writing targeted explicit types becomes worthwhile. Strong candidates recognize that the type system itself must be designed pragmatically.',
    },
    resources: ['tsPerformance', 'tsMapped', 'tsConditional'],
  }),
]

const reactQuestions: InterviewQuestion[] = [
  q({
    id: 68,
    category: 'react',
    question: {
      de: 'Wie läuft das Rendering in modernen React-Funktionskomponenten ab?',
      en: 'How does rendering work in modern React function components?',
    },
    answer: {
      de: 'Eine Funktionskomponente ist im Kern eine Funktion, die aus Props und State UI beschreibt. React kann diese Funktion mehrfach ausführen, bevor es Änderungen committet, und trennt damit Render- von Commit-Phase. Senior-Level bedeutet, diese Phasen sauber von Seiteneffekten zu trennen.',
      en: 'At its core, a function component is a function that describes UI from props and state. React may run that function multiple times before committing changes, separating the render phase from the commit phase. Senior-level understanding keeps those phases cleanly separated from side effects.',
    },
    exampleTitle: {
      de: 'Render ist Berechnung, nicht Effekt',
      en: 'Render is calculation, not an effect',
    },
    exampleExplanation: {
      de: 'Die Komponente berechnet JSX aus State. Netzwerkanfragen oder DOM-Manipulationen gehören nicht direkt in diesen Schritt.',
      en: 'The component computes JSX from state. Network calls or DOM mutations do not belong directly in that step.',
    },
    exampleCode: `function Counter({ value }: { value: number }) {
  return <span>{value}</span>
}`,
    explanation: {
      de: 'Wer React wirklich versteht, denkt nicht in magischen Lifecycle-Events, sondern in reiner Renderlogik plus Effekten nach dem Commit. Das hilft bei Performance, Debugging und Concurrent Features. Viele Bugs entstehen genau dann, wenn diese Grenze verwischt wird. Gute Kandidaten erklären React deshalb als Zustandsmaschine mit klarer Render-Disziplin.',
      en: 'Developers who truly understand React do not think in magical lifecycle events, but in pure render logic plus effects after commit. That helps with performance, debugging, and concurrent features. Many bugs appear exactly when that boundary gets blurred. Strong candidates therefore explain React as a state machine with disciplined rendering.',
    },
    resources: ['reactThinking', 'reactUseEffect', 'reactPreservingState'],
  }),
  q({
    id: 69,
    category: 'react',
    question: {
      de: 'Wie unterscheiden sich Props und State?',
      en: 'How do props and state differ?',
    },
    answer: {
      de: 'Props sind Eingaben von außen, State ist interner, veränderlicher Zustand einer Komponente. Beide beeinflussen das Rendering, aber ihre Ownership ist unterschiedlich. Senior-Level bedeutet hier, State möglichst dort zu halten, wo er entsteht oder wirklich gemeinsam benötigt wird.',
      en: 'Props are external inputs, while state is internal mutable component data. Both affect rendering, but their ownership is different. Senior-level thinking keeps state as close as possible to where it originates or where it is truly shared.',
    },
    exampleTitle: {
      de: 'Eingabe von außen, Zustand innen',
      en: 'External input, internal state',
    },
    exampleExplanation: {
      de: 'Das Label kommt per Prop, der Zaehler lebt in der Komponente. Diese Trennung hilft bei Klarheit und Testbarkeit.',
      en: 'The label comes in as a prop, while the counter lives inside the component. That separation helps with clarity and testability.',
    },
    exampleCode: `function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{label}: {count}</button>
}`,
    explanation: {
      de: 'Viele Architekturprobleme in React sind eigentlich Ownership-Probleme von Zustand. Zu viel lokaler State erschwert Koordination, zu viel globaler State erschwert Verständnis und Performance. Gute Kandidaten können erklären, wie Datenfluss und Verantwortlichkeit zusammenhängen. Das ist deutlich wertvoller als nur Definitionswissen.',
      en: 'Many React architecture problems are really about state ownership. Too much local state makes coordination hard, while too much global state hurts understanding and performance. Strong candidates can explain how data flow and responsibility connect. That is far more valuable than definitions alone.',
    },
    resources: ['reactProps', 'reactState', 'reactSharingState'],
  }),
  q({
    id: 70,
    category: 'react',
    question: {
      de: 'Was ist der Unterschied zwischen controlled und uncontrolled Inputs?',
      en: 'What is the difference between controlled and uncontrolled inputs?',
    },
    answer: {
      de: 'Controlled Inputs lesen und schreiben ihren Wert über React-State, während uncontrolled Inputs ihren Zustand primär im DOM halten. Controlled Inputs geben mehr Kontrolle, kosten aber mehr Re-Renders und Boilerplate. Senior-Level bedeutet hier, je nach Formularanforderung bewusst zu wählen.',
      en: 'Controlled inputs read and write their value through React state, while uncontrolled inputs keep their state primarily in the DOM. Controlled inputs give more control but cost more re-renders and boilerplate. Senior-level judgment chooses deliberately based on the form requirements.',
    },
    exampleTitle: {
      de: 'React steuert den Inputwert',
      en: 'React controls the input value',
    },
    exampleExplanation: {
      de: 'Der Input zeigt immer den State-Wert. Dadurch kannst du Validierung, Maskierung und Nebenlogik zentral steuern.',
      en: 'The input always reflects the state value. That lets you centralize validation, formatting, and side logic.',
    },
    exampleCode: `const [email, setEmail] = useState('')
<input value={email} onChange={(event) => setEmail(event.target.value)} />`,
    explanation: {
      de: 'Controlled vs uncontrolled ist keine rein akademische Entscheidung. Große, performante Formulare profitieren manchmal von mehr DOM-Eigenstaendigkeit, während komplexe Validierung eher kontrollierte Felder verlangt. Entscheidend ist, wie viel Synchronisation, Validierung und Seiteneffektlogik du brauchst. Gute Kandidaten argumentieren vom Use Case aus.',
      en: 'Controlled vs uncontrolled is not purely academic. Large, performance-sensitive forms may benefit from more DOM autonomy, while complex validation often prefers controlled fields. What matters is how much synchronization, validation, and side-effect logic you need. Strong candidates argue from the use case.',
    },
    resources: ['reactInput', 'reactState', 'reactYouMightNotNeedEffect'],
  }),
  q({
    id: 71,
    category: 'react',
    question: {
      de: 'Wann läuft `useEffect` und wofür ist es gedacht?',
      en: 'When does `useEffect` run and what is it for?',
    },
    answer: {
      de: '`useEffect` läuft nach dem Commit und ist für Synchronisation mit der Außenwelt gedacht, nicht für normale Renderberechnungen. Dazu gehören etwa Subscriptions, Timer oder Netzwerkabhängigkeiten. Senior-Level bedeutet, Effekte als Brücke nach draußen und nicht als Datenverarbeitungssammelbecken zu sehen.',
      en: '`useEffect` runs after commit and is meant for synchronization with the outside world, not for ordinary render calculations. That includes subscriptions, timers, or network-related synchronization. Senior-level thinking treats effects as a bridge outward, not as a bucket for random data processing.',
    },
    exampleTitle: {
      de: 'Subscription nach dem Commit starten',
      en: 'Start the subscription after commit',
    },
    exampleExplanation: {
      de: 'Der Effekt registriert und bereinigt die Subscription im passenden Moment. Genau dafür ist `useEffect` gemacht.',
      en: 'The effect registers and cleans up the subscription at the right time. That is exactly what `useEffect` is for.',
    },
    exampleCode: `useEffect(() => {
  const connection = connect(roomId)
  return () => connection.disconnect()
}, [roomId])`,
    explanation: {
      de: 'Viele Teams packen zu viel Logik in `useEffect`, weil es wie ein allgemeiner Lifecycle-Hook wirkt. Dadurch entstehen schwer lesbare Flüsse, doppelte States und unnötige Re-Renders. Wer `useEffect` stattdessen auf echte Seiteneffekte begrenzt, bekommt klarere Komponenten. Gute Kandidaten kennen diese Grenze sehr genau.',
      en: 'Many teams put too much logic into `useEffect` because it looks like a general lifecycle hook. That creates hard-to-read flows, duplicate state, and unnecessary re-renders. Limiting `useEffect` to real side effects leads to much clearer components. Strong candidates know that boundary very well.',
    },
    resources: ['reactUseEffect', 'reactEffectsLifecycle', 'reactYouMightNotNeedEffect'],
  }),
  q({
    id: 72,
    category: 'react',
    question: {
      de: 'Welche typischen Fehler passieren mit `useEffect`?',
      en: 'What common mistakes happen with `useEffect`?',
    },
    answer: {
      de: 'Hauefige Fehler sind fehlende Dependencies, unnötig doppelt gespeicherter State und Effekte für rein ableitbare Werte. Das führt zu Stale Closures, Schleifen oder unnötiger Komplexität. Senior-Level bedeutet, zuerst zu prüfen, ob man den Effekt überhaupt braucht.',
      en: 'Common mistakes include missing dependencies, duplicating derivable state, and using effects for values that could be calculated during render. That leads to stale closures, loops, or unnecessary complexity. Senior-level thinking starts by asking whether the effect is needed at all.',
    },
    exampleTitle: {
      de: 'Abgeleitete Werte nicht in Effekte verlagern',
      en: 'Do not move derived values into effects',
    },
    exampleExplanation: {
      de: 'Der gefilterte Wert kann direkt im Render berechnet werden. Ein extra Effect plus State macht die Komponente nur komplizierter.',
      en: 'The filtered value can be computed directly during render. An extra effect plus state only makes the component more complicated.',
    },
    exampleCode: `const visibleItems = items.filter((item) => item.active)`,
    explanation: {
      de: '`useEffect`-Fehler sind oft Architekturhinweise. Wenn ein Effekt immer größer wird, steckt dahinter meist ein unklarer Verantwortungszuschnitt. React selbst empfiehlt mittlerweile deutlich, viele frühere Effekt-Muster ganz zu vermeiden. Gute Kandidaten zeigen, dass sie diese Entwicklung verstanden haben und Komponenten entsprechend vereinfachen.',
      en: '`useEffect` mistakes are often architecture signals. If an effect keeps growing, there is usually an unclear responsibility boundary behind it. React itself now strongly recommends avoiding many older effect patterns altogether. Strong candidates show that they understand this evolution and simplify components accordingly.',
    },
    resources: ['reactYouMightNotNeedEffect', 'reactUseEffect', 'reactEffectsLifecycle'],
  }),
  q({
    id: 73,
    category: 'react',
    question: {
      de: 'Wann braucht man `useMemo` und `useCallback` wirklich?',
      en: 'When do you actually need `useMemo` and `useCallback`?',
    },
    answer: {
      de: '`useMemo` memoisiert berechnete Werte, `useCallback` memoisiert Funktionsreferenzen. Beide sind nützlich, wenn teure Berechnungen oder Referenzgleichheit für Kindkomponenten wirklich relevant sind. Senior-Level bedeutet, diese Hooks gezielt nach Profiling und nicht reflexartig einzusetzen.',
      en: '`useMemo` memoizes computed values, while `useCallback` memoizes function references. Both are useful when expensive calculations or referential equality truly matter for child components. Senior-level use is deliberate and usually informed by profiling rather than habit.',
    },
    exampleTitle: {
      de: 'Nur relevante Arbeit stabil halten',
      en: 'Stabilize only the work that matters',
    },
    exampleExplanation: {
      de: 'Die Berechnung wird nur neu ausgeführt, wenn sich die Abhängigkeiten ändern. Das lohnt sich vor allem bei teurer Arbeit oder sensiblen Kindkomponenten.',
      en: 'The calculation runs again only when the dependencies change. That mainly pays off for expensive work or sensitive child components.',
    },
    exampleCode: `const sortedUsers = useMemo(() => sortUsers(users), [users])`,
    explanation: {
      de: 'Viele Entwickler optimieren mit Memo-Hooks zu früh und schaffen damit mehr Komplexität als Gewinn. Gleichzeitig gibt es reale Fälle, in denen stabile Referenzen entscheidend sind, etwa bei `memo`-optimierten Listen. Die gute Antwort ist daher weder "immer" noch "nie", sondern kontextabhängig. Genau diese Nüchternheit ist ein Senior-Signal.',
      en: 'Many developers optimize too early with memo hooks and create more complexity than value. At the same time, there are real cases where stable references matter, such as memoized list items. The right answer is therefore neither "always" nor "never", but context-dependent. That kind of judgment is a senior signal.',
    },
    resources: ['reactUseMemo', 'reactUseCallback', 'reactMemo'],
  }),
  q({
    id: 74,
    category: 'react',
    question: {
      de: 'Wofür nutzt man `useRef`?',
      en: 'What do you use `useRef` for?',
    },
    answer: {
      de: '`useRef` speichert einen stabilen, renderübergreifenden Wert, ohne Re-Renders auszulösen. Das ist nützlich für DOM-Zugriffe, imperativen Interop oder mutable Hilfswerte, die nicht ins UI rendern. Senior-Level bedeutet, `useRef` nicht als versteckten Ersatz für echten State zu missbrauchen.',
      en: '`useRef` stores a stable value across renders without triggering re-renders. That is useful for DOM access, imperative interop, or mutable helper values that do not drive UI. Senior-level use means not abusing `useRef` as a hidden substitute for real state.',
    },
    exampleTitle: {
      de: 'DOM-Zugriff ohne Re-Render',
      en: 'Access the DOM without a re-render',
    },
    exampleExplanation: {
      de: 'Das Ref zeigt auf das Input-Element und kann für Fokus oder Messung genutzt werden. Der Zugriff ist imperativ und bewusst außerhalb des Renderflusses.',
      en: 'The ref points to the input element and can be used for focus or measurement. The access is imperative and intentionally outside the render flow.',
    },
    exampleCode: `const inputRef = useRef<HTMLInputElement | null>(null)
inputRef.current?.focus()`,
    explanation: {
      de: '`useRef` ist besonders stark an der Grenze zwischen deklarativer UI und imperativer Plattform-API. Probleme entstehen, wenn wichtige fachliche Informationen darin versteckt werden, die eigentlich renderrelevant waeren. Dann verliert React seine Synchronisationsstärke. Gute Kandidaten kennen also nicht nur den Use Case, sondern auch die Missbrauchsgrenze.',
      en: '`useRef` is especially powerful at the boundary between declarative UI and imperative platform APIs. Problems arise when important domain information is hidden there even though it should drive rendering. Then React loses its synchronization strength. Strong candidates know not only the valid use case, but also the abuse boundary.',
    },
    resources: ['reactUseRef', 'reactUseEffect', 'reactForwardRef'],
  }),
  q({
    id: 75,
    category: 'react',
    question: {
      de: 'Welche Risiken hat Context und wann passt er gut?',
      en: 'What risks come with context and when is it a good fit?',
    },
    answer: {
      de: 'Context ist gut für globale, relativ stabile Informationen wie Theme, Locale oder Auth-Kontext. Problematisch wird er, wenn hochfrequente oder große Zustandsmengen ungezielt an viele Komponenten verteilt werden. Senior-Level bedeutet, Context als Verteilmechanismus und nicht als kompletten State-Store zu sehen.',
      en: 'Context is a good fit for global, relatively stable information such as theme, locale, or auth context. It becomes problematic when highly changing or large state is pushed indiscriminately to many components. Senior-level thinking treats context as a distribution mechanism, not a complete state store.',
    },
    exampleTitle: {
      de: 'Cross-cutting Information zentral bereitstellen',
      en: 'Provide cross-cutting information centrally',
    },
    exampleExplanation: {
      de: 'Ein Theme ist ein guter Context-Kandidat, weil viele Komponenten ihn brauchen und sich der Wert selten ändert.',
      en: 'A theme is a good context candidate because many components need it and the value changes rarely.',
    },
    exampleCode: `const ThemeContext = createContext<'light' | 'dark'>('light')`,
    explanation: {
      de: 'Context löst Prop Drilling, aber nicht automatisch State-Architektur. Sobald Werte häufig wechseln, können breite Re-Render-Ketten entstehen. Deshalb helfen oft Splitting, Memoization oder alternative Stores mit selektiven Subscriptions. Gute Kandidaten sprechen bei Context immer auch über Re-Render-Kosten und Ownership.',
      en: 'Context solves prop drilling, but it does not automatically solve state architecture. Once values change frequently, broad re-render chains can appear. That is why splitting, memoization, or alternative stores with selective subscriptions often help. Strong candidates always discuss re-render cost and ownership when talking about context.',
    },
    resources: ['reactContext', 'reactSharingState', 'reactMemo'],
  }),
  q({
    id: 76,
    category: 'react',
    question: {
      de: 'Wann sollte man State nach oben ziehen und wann eher lokal lassen?',
      en: 'When should you lift state up and when should you keep it local?',
    },
    answer: {
      de: 'State sollte dort leben, wo er benötigt und verantwortet wird. Man zieht ihn nach oben, wenn mehrere Teile denselben Zustand konsistent lesen oder verändern müssen. Senior-Level bedeutet, Globalisierung von State aktiv zu vermeiden, wenn sie keinen fachlichen Mehrwert bringt.',
      en: 'State should live where it is needed and owned. You lift it up when multiple parts of the UI need to read or change the same source of truth consistently. Senior-level judgment avoids globalizing state unless it adds real domain value.',
    },
    exampleTitle: {
      de: 'Eine Quelle für zwei Inputs',
      en: 'One source of truth for two inputs',
    },
    exampleExplanation: {
      de: 'Wenn zwei Komponenten denselben Wert synchron halten müssen, gehört der Zustand meist in einen gemeinsamen Elternknoten.',
      en: 'If two components must stay in sync over the same value, the state usually belongs in a common parent.',
    },
    exampleCode: `const [temperature, setTemperature] = useState('')`,
    explanation: {
      de: 'Zu viel hoisted State führt schnell zu unnötigen Prop-Ketten und flachen, überlasteten Parent-Komponenten. Zu lokaler State kann dagegen Synchronisation erschweren. Die richtige Antwort ist oft eine saubere Balance entlang fachlicher Ownership. Gute Kandidaten beschreiben diese Entscheidung mit Blick auf Wartbarkeit und Renderkosten.',
      en: 'Too much hoisted state quickly leads to unnecessary prop chains and overloaded parent components. Too much local state, on the other hand, can make synchronization difficult. The right answer is often a clean balance along domain ownership boundaries. Strong candidates explain the decision in terms of maintainability and render cost.',
    },
    resources: ['reactSharingState', 'reactState', 'reactContext'],
  }),
  q({
    id: 77,
    category: 'react',
    question: {
      de: 'Warum sind Keys in Listen so wichtig?',
      en: 'Why are keys so important in lists?',
    },
    answer: {
      de: 'Keys helfen React dabei, Elemente zwischen Render-Durchläufen korrekt wiederzuerkennen. Falsche oder instabile Keys führen zu falschem State-Reuse, kaputten Animationen oder Eingabefehlern. Senior-Level bedeutet, Keys als Identitätsmodell und nicht als reine Warnungsbeseitigung zu verstehen.',
      en: 'Keys help React recognize elements correctly between renders. Wrong or unstable keys lead to incorrect state reuse, broken animations, or input bugs. Senior-level thinking treats keys as an identity model, not as a way to silence warnings.',
    },
    exampleTitle: {
      de: 'Stabile IDs statt Array-Index',
      en: 'Stable IDs instead of array indices',
    },
    exampleExplanation: {
      de: 'Eine echte ID bleibt stabil, auch wenn Eintraege verschoben werden. Genau das braucht React für korrektes Reconciliation-Verhalten.',
      en: 'A real ID stays stable even when items move. That is exactly what React needs for correct reconciliation behavior.',
    },
    exampleCode: `items.map((item) => <Row key={item.id} item={item} />)`,
    explanation: {
      de: 'Key-Probleme zeigen sich oft nur in dynamischen Listen, also genau dort, wo Produkte real werden. Dann springt der Fokus, falsche Eingaben bleiben hängen oder lokale States wechseln scheinbar zufällig. Wer das über Keys erklären kann, zeigt ein tiefes React-Verständnis. Gute Kandidaten vermeiden deshalb Index-Keys außer in wirklich statischen Listen.',
      en: 'Key problems often appear only in dynamic lists, which is exactly where products become real. Focus jumps, wrong inputs stick around, or local state seems to move randomly. If you can explain that through keys, you show deep React understanding. Strong candidates therefore avoid index keys except for truly static lists.',
    },
    resources: ['reactKeys', 'reactPreservingState', 'reactThinking'],
  }),
  q({
    id: 78,
    category: 'react',
    question: {
      de: 'Was bedeutet Reconciliation in React?',
      en: 'What does reconciliation mean in React?',
    },
    answer: {
      de: 'Reconciliation ist der Prozess, mit dem React den nächsten UI-Baum mit dem vorherigen vergleicht und minimale Updates ableitet. Dabei spielen Typ, Position und Key eine große Rolle. Senior-Level bedeutet, Reconciliation nicht als Magie, sondern als heuristischen Abgleich mit Identitätsregeln zu verstehen.',
      en: 'Reconciliation is the process React uses to compare the next UI tree with the previous one and derive minimal updates. Type, position, and key all matter strongly here. Senior-level understanding treats reconciliation not as magic, but as a heuristic diff guided by identity rules.',
    },
    exampleTitle: {
      de: 'Gleicher Platz, anderer Key, neuer Zustand',
      en: 'Same position, different key, new state',
    },
    exampleExplanation: {
      de: 'Wenn sich der Key ändert, behandelt React das Element als neue Identität. Dadurch wird lokaler State bewusst neu aufgebaut.',
      en: 'When the key changes, React treats the element as a new identity. That intentionally resets local state.',
    },
    exampleCode: `{showA ? <Form key="a" /> : <Form key="b" />}`,
    explanation: {
      de: 'Reconciliation ist zentral für Performance und Korrektheit zugleich. Viele UI-Bugs entstehen, weil Entwickler die Identitätsregeln hinter derselben Position im JSX nicht sauber verstehen. Wer erklärt, wie Keys, Elementtypen und Position zusammenspielen, zeigt echtes React-Grundlagenwissen. Das ist für Senior-Rollen relevanter als das auswendig gelernte Wort "Virtual DOM".',
      en: 'Reconciliation is central to both performance and correctness. Many UI bugs happen because developers do not fully understand the identity rules behind the same JSX position. Explaining how keys, element types, and position work together shows real React fundamentals. That is more relevant for senior roles than simply reciting the term "virtual DOM".',
    },
    resources: ['reactPreservingState', 'reactKeys', 'reactThinking'],
  }),
  q({
    id: 79,
    category: 'react',
    question: {
      de: 'Wofür ist `startTransition` bzw. `useTransition` gedacht?',
      en: 'What are `startTransition` and `useTransition` for?',
    },
    answer: {
      de: 'Transitions markieren Updates als nicht dringend, damit dringende Interaktionen wie Tippen oder Klicken bevorzugt flüssig bleiben. Das ist nützlich für Filter, Navigation oder große Listen. Senior-Level bedeutet, zwischen dringendem UI-Feedback und aufschiebbarer Arbeit unterscheiden zu können.',
      en: 'Transitions mark updates as non-urgent so urgent interactions such as typing or clicking can stay responsive. This is useful for filtering, navigation, or large list work. Senior-level thinking distinguishes between urgent UI feedback and deferrable work.',
    },
    exampleTitle: {
      de: 'Sucheingabe reaktiv halten',
      en: 'Keep search input responsive',
    },
    exampleExplanation: {
      de: 'Die Eingabe reagiert sofort, während die teure Listenberechnung als Transition laufen kann. Das verbessert die wahrgenommene Performance.',
      en: 'The input responds immediately while the expensive list computation can run as a transition. That improves perceived performance.',
    },
    exampleCode: `const [isPending, startTransition] = useTransition()
startTransition(() => {
  setFilter(query)
})`,
    explanation: {
      de: 'Concurrent Features lösen keine schlechten Algorithmen, aber sie helfen bei Priorisierung im UI. Das ist besonders wertvoll, wenn große Renderarbeit nicht jede Interaktion blockieren soll. Wer den Mechanismus mit Nutzerwahrnehmung statt nur mit API-Namen erklärt, zeigt Senior-Verständnis. Genau darum geht es in guten Interviews.',
      en: 'Concurrent features do not fix bad algorithms, but they help prioritize UI work. That is especially valuable when heavy rendering should not block every interaction. Explaining the mechanism in terms of user perception rather than just API names shows senior-level understanding. That is what good interviews look for.',
    },
    resources: ['reactUseTransition', 'reactState', 'reactUseMemo'],
  }),
  q({
    id: 80,
    category: 'react',
    question: {
      de: 'Was ist Suspense und wofür eignet es sich?',
      en: 'What is Suspense and what is it good for?',
    },
    answer: {
      de: 'Suspense erlaubt es, für Teile des UI kontrollierte Fallbacks anzuzeigen, während Daten oder Code noch nicht bereit sind. Es ist besonders stark für Lazy Loading und bestimmte Datenlade-Patterns. Senior-Level bedeutet, Suspense nicht mit beliebiger asynchroner Logik zu verwechseln, sondern als Rendering-Koordinationsmechanismus zu verstehen.',
      en: 'Suspense lets you show controlled fallbacks for parts of the UI while data or code is not ready yet. It is especially strong for lazy loading and certain data-loading patterns. Senior-level understanding sees Suspense as a rendering coordination mechanism, not as a generic wrapper for all async logic.',
    },
    exampleTitle: {
      de: 'Fallback für nachgeladenen Code',
      en: 'Fallback for lazily loaded code',
    },
    exampleExplanation: {
      de: 'Solange die Komponente noch nicht geladen ist, sieht der Nutzer einen klaren Fallback. Das ermöglicht feinere Loading-Zustände.',
      en: 'As long as the component is not loaded yet, the user sees a clear fallback. That enables more granular loading states.',
    },
    exampleCode: `<Suspense fallback={<Spinner />}>
  <ReportsPanel />
</Suspense>`,
    explanation: {
      de: 'Suspense wird oft missverstanden, weil es wie ein einfacher Loader aussieht. In Wirklichkeit geht es um das Orchestrieren von Teilbaeumen und Ladegrenzen. Richtig gesetzt verbessert es User Experience und Architektur, falsch gesetzt erzeugt es zu grobe oder verwirrende Fallbacks. Gute Kandidaten sprechen über Boundary-Design, nicht nur über Spinner.',
      en: 'Suspense is often misunderstood because it looks like a simple loader. In reality, it is about orchestrating subtrees and loading boundaries. Used well, it improves both user experience and architecture; used poorly, it creates coarse or confusing fallbacks. Strong candidates talk about boundary design, not just spinners.',
    },
    resources: ['reactSuspense', 'reactLazy', 'reactThinking'],
  }),
  q({
    id: 81,
    category: 'react',
    question: {
      de: 'Wofür braucht man Error Boundaries?',
      en: 'Why do you need error boundaries?',
    },
    answer: {
      de: 'Error Boundaries fangen Renderfehler in untergeordneten Komponenten ab und verhindern, dass die gesamte App unkontrolliert abstuerzt. Sie bieten stattdessen einen kontrollierten Fallback für einen Teilbaum. Senior-Level bedeutet, Boundary-Grenzen bewusst entlang fachlicher Bereiche zu setzen.',
      en: 'Error boundaries catch rendering errors in descendant components and prevent the whole app from crashing uncontrollably. They provide a controlled fallback for a subtree instead. Senior-level thinking places these boundaries deliberately along meaningful product areas.',
    },
    exampleTitle: {
      de: 'Teilbaum absichern statt ganze App verlieren',
      en: 'Protect a subtree instead of losing the whole app',
    },
    exampleExplanation: {
      de: 'Wenn die Reports-Komponente crasht, kann der Rest der Seite weiterlaufen. Das ist vor allem für produktive Oberflächen wichtig.',
      en: 'If the reports component crashes, the rest of the page can keep working. That is especially important in production UIs.',
    },
    exampleCode: `<ErrorBoundary fallback={<ErrorPanel />}>
  <ReportsPanel />
</ErrorBoundary>`,
    explanation: {
      de: 'Error Boundaries sind ein Werkzeug für Resilienz, nicht nur für Debugging. In großen Apps sollte ein isolierter Fehler nicht den kompletten Arbeitsfluss blockieren. Gleichzeitig ersetzen sie kein Monitoring und keine gute Fehleranalyse. Gute Kandidaten sehen sie deshalb als Teil eines größeren Zuverlässigkeitskonzepts.',
      en: 'Error boundaries are a resilience tool, not just a debugging convenience. In large apps, one isolated failure should not block the entire workflow. At the same time, they do not replace monitoring or good error analysis. Strong candidates therefore see them as part of a broader reliability strategy.',
    },
    resources: ['reactErrorBoundary', 'reactThinking', 'reactUseEffect'],
  }),
  q({
    id: 82,
    category: 'react',
    question: {
      de: 'Was ist der Unterschied zwischen Server Components und Client Components?',
      en: 'What is the difference between server components and client components?',
    },
    answer: {
      de: 'Server Components laufen auf dem Server und senden bereits vorbereitete UI-Beschreibungen, während Client Components im Browser hydratisiert und interaktiv werden. Ziel ist es, weniger Client-JavaScript zu senden und Serverdaten direkter zu nutzen. Senior-Level bedeutet, Render-Ort, Bundle-Größe und Interaktivität zusammen zu denken.',
      en: 'Server components run on the server and send prepared UI payloads, while client components hydrate in the browser and become interactive. The goal is to ship less client JavaScript and use server data more directly. Senior-level thinking connects render location, bundle size, and interactivity.',
    },
    exampleTitle: {
      de: 'Nur interaktive Teile müssen auf den Client',
      en: 'Only interactive parts need to reach the client',
    },
    exampleExplanation: {
      de: 'Ein statischer Datenblock kann serverseitig bleiben, während ein Filter oder Formular als Client-Komponente interaktiv wird. Das spart Bundle-Größe.',
      en: 'A static data block can stay on the server while a filter or form becomes a client component. That saves bundle size.',
    },
    exampleCode: `// server component reads data
// client component handles clicks and local state`,
    explanation: {
      de: 'Das spannende Thema ist nicht das Buzzword, sondern die Architekturentscheidung pro Teilbaum. Alles Interaktive braucht Client-Kapazität, alles rein darstellende oder datenlastige kann oft serverseitig bleiben. Wer diese Grenze gut zieht, verbessert Performance und Developer Experience. Gute Kandidaten argumentieren deshalb über Verantwortlichkeiten statt über Hype.',
      en: 'The interesting part is not the buzzword but the architectural decision per subtree. Everything interactive needs client capability, while purely presentational or data-heavy parts can often stay on the server. Drawing that boundary well improves both performance and developer experience. Strong candidates therefore argue in terms of responsibilities rather than hype.',
    },
    resources: ['reactServerComponents', 'reactSuspense', 'reactThinking'],
  }),
  q({
    id: 83,
    category: 'react',
    question: {
      de: 'Wann lohnen sich Custom Hooks?',
      en: 'When are custom hooks worth it?',
    },
    answer: {
      de: 'Custom Hooks lohnen sich, wenn Logik über mehrere Komponenten wiederverwendet oder klarer gekapselt werden soll. Sie extrahieren Verhalten, nicht visuelle Struktur. Senior-Level bedeutet, Hooks mit klaren Verantwortlichkeiten zu entwerfen und nicht jede Kleinigkeit zu abstrahieren.',
      en: 'Custom hooks are worth it when behavior should be reused across components or encapsulated more clearly. They extract logic, not visual structure. Senior-level judgment designs hooks with clear responsibilities and does not abstract every tiny detail.',
    },
    exampleTitle: {
      de: 'Wiederverwendbare Logik ohne UI-Kopplung',
      en: 'Reusable logic without UI coupling',
    },
    exampleExplanation: {
      de: 'Der Hook kapselt die Datenlogik, während die Komponente frei entscheidet, wie sie den Zustand darstellt. Genau das ist die Stärke von Custom Hooks.',
      en: 'The hook encapsulates the data logic while the component remains free to decide how to display the state. That is exactly the strength of custom hooks.',
    },
    exampleCode: `function useUser(userId: string) {
  // load and return user state
}`,
    explanation: {
      de: 'Gute Hooks verbessern Lesbarkeit und trennen fachliche Logik sauber von Darstellung. Schlechte Hooks werden schnell zu Mini-Frameworks mit verstecktem Verhalten und unklaren Seiteneffekten. In Senior-Interviews ist daher wichtig, über API-Design, Testbarkeit und Ownership zu sprechen. Das unterscheidet echte Abstraktion von blossem Auslagern.',
      en: 'Good hooks improve readability and cleanly separate domain logic from presentation. Bad hooks quickly turn into mini-frameworks with hidden behavior and unclear side effects. In senior interviews, it therefore matters to discuss API design, testability, and ownership. That separates real abstraction from simple code moving.',
    },
    resources: ['reactCustomHooks', 'reactUseEffect', 'reactUseMemo'],
  }),
  q({
    id: 84,
    category: 'react',
    question: {
      de: 'Wie würdest du Formulare in React für größere Apps strukturieren?',
      en: 'How would you structure forms in React for larger applications?',
    },
    answer: {
      de: 'Ich würde Formulare entlang von Validierung, Ownership und Interaktionskosten strukturieren, nicht nur entlang von Feldern. Wichtig sind klare Datenmodelle, konsistente Fehlerbehandlung und eine bewusste Entscheidung zwischen controlled und uncontrolled Feldern. Senior-Level bedeutet, UX, Performance und Integrationspunkte gemeinsam zu betrachten.',
      en: 'I would structure forms around validation, ownership, and interaction cost rather than only around fields. Clear data models, consistent error handling, and a deliberate choice between controlled and uncontrolled fields matter most. Senior-level work considers UX, performance, and integration points together.',
    },
    exampleTitle: {
      de: 'Formzustand nicht chaotisch verstreuen',
      en: 'Do not scatter form state chaotically',
    },
    exampleExplanation: {
      de: 'Ein zentrales Modell für Werte und Fehler ist oft leichter testbar als ad-hoc State pro Feld, besonders in komplexeren Formularen.',
      en: 'A central model for values and errors is often easier to test than ad-hoc state per field, especially in more complex forms.',
    },
    exampleCode: `const [form, setForm] = useState({ email: '', password: '' })
const [errors, setErrors] = useState<Record<string, string>>({})`,
    explanation: {
      de: 'Formulare verbinden viele Probleme gleichzeitig: Eingabe, Validierung, Asynchronität, Fokus, Fehlermeldungen und Performance. Eine gute Architektur trennt diese Sorgen, ohne das Formular unnötig kompliziert zu machen. Oft helfen Libraries, aber nur, wenn das Team ihre Abstraktionen wirklich braucht. Gute Kandidaten sprechen deshalb über Prinzipien statt nur über Lieblingsbibliotheken.',
      en: 'Forms bring many problems together at once: input, validation, async work, focus handling, error messages, and performance. A good architecture separates those concerns without making the form unnecessarily complex. Libraries often help, but only when the team really needs their abstractions. Strong candidates therefore talk about principles rather than only naming favorite libraries.',
    },
    resources: ['reactInput', 'reactState', 'reactCustomHooks'],
  }),
  q({
    id: 85,
    category: 'react',
    question: {
      de: 'Warum ist abgeleiteter State oft ein Geruch?',
      en: 'Why is derived state often a smell?',
    },
    answer: {
      de: 'Abgeleiteter State dupliziert Informationen, die sich bereits aus Props oder anderem State berechnen lassen. Das erhöht die Chance auf Inkonsistenzen und unnötige Synchronisationslogik. Senior-Level bedeutet, zuerst zu fragen, ob ein Wert wirklich gespeichert oder nur berechnet werden sollte.',
      en: 'Derived state duplicates information that can already be computed from props or other state. That increases the chance of inconsistencies and unnecessary synchronization logic. Senior-level thinking starts by asking whether a value should really be stored or just calculated.',
    },
    exampleTitle: {
      de: 'Berechnen statt spiegeln',
      en: 'Compute instead of mirroring',
    },
    exampleExplanation: {
      de: 'Der gefilterte Wert muss nicht extra gespeichert werden. So bleibt nur eine echte Quelle der Wahrheit erhalten.',
      en: 'The filtered value does not need separate storage. That keeps only one real source of truth.',
    },
    exampleCode: `const visibleTodos = todos.filter((todo) => !todo.done)`,
    explanation: {
      de: 'Abgeleiteter State klingt harmlos, führt aber häufig zu doppelten Updates und schwer reproduzierbaren Bugs. Besonders problematisch wird es, wenn zwei Effekte dieselbe Information gegenseitig nachpflegen. React empfiehlt deshalb klar, Ableitungen während des Renderns zu machen, wenn möglich. Gute Kandidaten nennen diesen Grundsatz früh und deutlich.',
      en: 'Derived state sounds harmless, but it often leads to duplicated updates and hard-to-reproduce bugs. It becomes especially problematic when two effects keep syncing the same information back and forth. React therefore clearly recommends deriving values during render whenever possible. Strong candidates state that principle early and clearly.',
    },
    resources: ['reactYouMightNotNeedEffect', 'reactState', 'reactUseMemo'],
  }),
  q({
    id: 86,
    category: 'react',
    question: {
      de: 'Wie entscheidest du zwischen lokalem State, Context, Zustand, Redux oder ähnlichen Stores?',
      en: 'How do you choose between local state, context, Zustand, Redux, or similar stores?',
    },
    answer: {
      de: 'Ich entscheide entlang von Ownership, Änderungsfrequenz, Debugging-Bedarf und wie weit Daten geteilt werden müssen. Lokaler State ist der Standard, Context taugt für relativ stabile globale Infos, externe Stores für komplexere gemeinsame Interaktion. Senior-Level bedeutet, so wenig globale Koordination wie möglich zu bauen.',
      en: 'I decide based on ownership, change frequency, debugging needs, and how widely data must be shared. Local state is the default, context fits relatively stable global information, and external stores fit more complex shared interaction. Senior-level judgment builds as little global coordination as possible.',
    },
    exampleTitle: {
      de: 'Werkzeug nach Problem wählen',
      en: 'Choose the tool based on the problem',
    },
    exampleExplanation: {
      de: 'Ein Theme braucht selten einen schweren Store. Ein koordiniertes Editor- oder Dashboard-Modell kann dagegen von selektiven Subscriptions profitieren.',
      en: 'A theme rarely needs a heavy store. A coordinated editor or dashboard model, on the other hand, may benefit from selective subscriptions.',
    },
    exampleCode: `// local: useState
// cross-cutting stable data: context
// complex shared graph: external store`,
    explanation: {
      de: 'State-Management-Diskussionen werden schnell religiös, sollten aber eigentlich architektonisch sein. Jeder Store bringt Trade-offs für Boilerplate, DevTools, Performance und Lernkurve. Gute Kandidaten nennen Kriterien statt Produktnamen. Das zeigt, dass sie Systeme steuern und nicht nur Tools austauschen.',
      en: 'State-management discussions become ideological quickly, but they should really be architectural. Every store brings trade-offs for boilerplate, devtools, performance, and learning curve. Strong candidates name criteria instead of product names. That shows they steer systems instead of merely swapping tools.',
    },
    resources: ['reactContext', 'reactReducer', 'reactSharingState'],
  }),
  q({
    id: 87,
    category: 'react',
    question: {
      de: 'Wie optimiert man große Listen in React?',
      en: 'How do you optimize large lists in React?',
    },
    answer: {
      de: 'Bei großen Listen helfen zuerst stabile Keys, sinnvolle Memoization und möglichst wenig Arbeit pro Zeile. Wenn die Menge sehr groß wird, ist Virtualisierung oft der entscheidende Hebel. Senior-Level bedeutet, Re-Render-Kosten, DOM-Größe und UX gemeinsam zu betrachten.',
      en: 'For large lists, the first levers are stable keys, sensible memoization, and minimal work per row. Once the data gets very large, virtualization is often the decisive optimization. Senior-level thinking considers re-render cost, DOM size, and UX together.',
    },
    exampleTitle: {
      de: 'Nicht jede Zeile gleichzeitig rendern',
      en: 'Do not render every row at once',
    },
    exampleExplanation: {
      de: 'Virtualisierung rendert nur den sichtbaren Ausschnitt und spart so deutlich Arbeit im DOM und beim React-Tree.',
      en: 'Virtualization renders only the visible slice and saves significant work in both the DOM and the React tree.',
    },
    exampleCode: `// render visible rows only with a virtualization library`,
    explanation: {
      de: 'Listenperformance ist selten mit einem einzelnen Trick gelöst. Oft greifen Datenmenge, Zellkomplexität, Scroll-Verhalten und Interaktivität ineinander. Gute Kandidaten messen zuerst und wählen dann die richtige Ebene für Optimierung: Daten, Rendering oder DOM. Genau das zeigt Senior-Reife.',
      en: 'List performance is rarely solved with a single trick. Data volume, row complexity, scroll behavior, and interactivity often interact. Strong candidates measure first and then choose the right optimization layer: data, rendering, or DOM. That is what senior maturity looks like.',
    },
    resources: ['reactMemo', 'reactKeys', 'webDevVirtualize'],
  }),
  q({
    id: 88,
    category: 'react',
    question: {
      de: 'Wann ist `React.memo` sinnvoll?',
      en: 'When is `React.memo` useful?',
    },
    answer: {
      de: '`React.memo` verhindert Re-Renders, wenn Props referenziell gleich geblieben sind. Das lohnt sich bei teureren Kindkomponenten mit stabilen Inputs, aber nicht als pauschale Standardregel. Senior-Level bedeutet, die Kosten von Vergleichen gegen die vermiedene Renderarbeit abzuwiegen.',
      en: '`React.memo` prevents re-renders when props remain referentially equal. It is useful for more expensive child components with stable inputs, but it is not a blanket default. Senior-level use weighs the cost of comparisons against the render work being avoided.',
    },
    exampleTitle: {
      de: 'Teure Zeile nur bei echten Änderungen rendern',
      en: 'Re-render an expensive row only on real changes',
    },
    exampleExplanation: {
      de: 'Wenn die Props stabil bleiben, kann React die Kindkomponente überspringen. Das ist vor allem in großen Listen hilfreich.',
      en: 'If the props stay stable, React can skip the child component. That is especially helpful in large lists.',
    },
    exampleCode: `const Row = memo(function Row({ item }: { item: Item }) {
  return <div>{item.name}</div>
})`,
    explanation: {
      de: 'Memoization in React funktioniert nur gut, wenn Referenzen und Datenfluss sauber sind. Sobald Eltern bei jedem Render neue Objekte und Funktionen erzeugen, verpufft der Effekt. Deshalb gehören `memo`, `useMemo` und `useCallback` konzeptionell zusammen. Gute Kandidaten sehen das Gesamtbild und nicht nur den einzelnen Hook oder HOC.',
      en: 'Memoization in React works well only when references and data flow are clean. Once parents create new objects and functions on every render, the benefit disappears. That is why `memo`, `useMemo`, and `useCallback` conceptually belong together. Strong candidates see the full picture, not just the isolated hook or HOC.',
    },
    resources: ['reactMemo', 'reactUseMemo', 'reactUseCallback'],
  }),
  q({
    id: 89,
    category: 'react',
    question: {
      de: 'Wie funktionieren gebatchte State-Updates in React?',
      en: 'How do batched state updates work in React?',
    },
    answer: {
      de: 'React fasst mehrere State-Updates innerhalb desselben Ereigniskontexts zusammen, bevor neu gerendert wird. Das reduziert unnötige Renderzyklen und sorgt für konsistentere UI-Updates. Senior-Level bedeutet, daraus keine falschen Annahmen über sofort veränderten State abzuleiten.',
      en: 'React batches multiple state updates within the same event context before re-rendering. That reduces unnecessary render cycles and leads to more consistent UI updates. Senior-level reasoning avoids assuming that state changes are applied immediately in the current closure.',
    },
    exampleTitle: {
      de: 'Funktionales Update für korrekte Verkettung',
      en: 'Use functional updates for correct chaining',
    },
    exampleExplanation: {
      de: 'Mehrere Updates bauen aufeinander auf, ohne von einem veralteten `count` auszugehen. Das ist bei Batching der sichere Weg.',
      en: 'Multiple updates build on each other without relying on a stale `count`. That is the safe path when batching is involved.',
    },
    exampleCode: `setCount((current) => current + 1)
setCount((current) => current + 1)`,
    explanation: {
      de: 'Batching verbessert Performance, führt aber auch zu Missverständnissen, wenn Entwickler alte imperative Denkweisen mitbringen. React-State ist eher eine Anforderung an den nächsten Render als eine sofortige Variablemutation. Wer das versteht, schreibt robustere Event-Handler und Effekte. Gute Kandidaten erklären genau dieses mentale Modell.',
      en: 'Batching improves performance, but it also causes confusion when developers bring imperative assumptions with them. React state is more like a request for the next render than an immediate variable mutation. Understanding that leads to more robust event handlers and effects. Strong candidates explain exactly that mental model.',
    },
    resources: ['reactQueueingState', 'reactState', 'reactUseTransition'],
  }),
  q({
    id: 90,
    category: 'react',
    question: {
      de: 'Was sind stale closures in React und wie vermeidet man sie?',
      en: 'What are stale closures in React and how do you avoid them?',
    },
    answer: {
      de: 'Stale Closures entstehen, wenn ein Callback oder Effekt alte Werte aus einem früheren Render festhält. Das führt zu Verhalten, das logisch "rückwaerts" wirkt. Senior-Level bedeutet, Abhängigkeiten, funktionale Updates und Ref-Patterns bewusst zur Stabilisierung einzusetzen.',
      en: 'Stale closures happen when a callback or effect captures values from an earlier render. The result is behavior that feels logically out of date. Senior-level thinking uses dependencies, functional updates, and ref patterns deliberately to stabilize that behavior.',
    },
    exampleTitle: {
      de: 'Alter Wert im Timer festgehalten',
      en: 'An old value captured inside a timer',
    },
    exampleExplanation: {
      de: 'Wenn der Timer später läuft, kann `count` veraltet sein. Funktionale Updates oder saubere Dependencies lösen das Problem meist besser.',
      en: 'When the timer runs later, `count` may be stale. Functional updates or correct dependencies usually solve the problem better.',
    },
    exampleCode: `setTimeout(() => {
  setCount(count + 1)
}, 1000)`,
    explanation: {
      de: 'Dieses Thema ist zentral, weil es das Zusammenspiel von React-Renderlogik und JavaScript-Closures offenlegt. Viele scheinbar zufällige Bugs in Formularen, Timern oder Netzwerkanfragen sind eigentlich stale closures. Wer das sauber erklärt, versteht beide Ebenen zugleich. Genau das wird in Senior-Interviews gesucht.',
      en: 'This topic is central because it exposes the interaction between React rendering and JavaScript closures. Many seemingly random bugs in forms, timers, or network logic are really stale closures. Explaining that clearly shows understanding of both layers at once. That is exactly what senior interviews look for.',
    },
    resources: ['reactUseEffect', 'reactUseRef', 'mdnClosures'],
  }),
  q({
    id: 91,
    category: 'react',
    question: {
      de: 'Was gehört zu guter Accessibility in React-Apps?',
      en: 'What belongs to good accessibility in React apps?',
    },
    answer: {
      de: 'Gute Accessibility beginnt mit semantischem HTML, Tastaturbedienbarkeit, Fokusmanagement und sinnvollen ARIA-Attributen dort, wo native Semantik nicht reicht. React ändert diese Grundlagen nicht, macht aber Fokus- und Zustandsmanagement oft komplexer. Senior-Level bedeutet, Accessibility von Anfang an als Produktqualität mitzudenken.',
      en: 'Good accessibility starts with semantic HTML, keyboard support, focus management, and meaningful ARIA attributes where native semantics are not enough. React does not change those fundamentals, but it often makes focus and state handling more complex. Senior-level thinking treats accessibility as product quality from the start.',
    },
    exampleTitle: {
      de: 'Native Elemente zuerst',
      en: 'Prefer native elements first',
    },
    exampleExplanation: {
      de: 'Ein echtes `button` bringt bereits Tastatur- und Screenreader-Verhalten mit. Ein `div` mit Klickhandler muss all das mühsam nachbauen.',
      en: 'A real `button` already includes keyboard and screen-reader behavior. A clickable `div` has to rebuild all of that manually.',
    },
    exampleCode: `<button type="button" onClick={openDialog}>Open dialog</button>`,
    explanation: {
      de: 'Barrierefreiheit ist kein Zusatz nach dem Launch, sondern beeinflusst Komponentenarchitektur direkt. Modals, Menues, Custom Inputs und Fehlerhinweise müssen für Tastatur und Assistive Tech funktionieren. Gute Kandidaten sprechen nicht nur über ARIA, sondern über semantische Defaults und Testpraxis. Das zeigt reife Frontend-Verantwortung.',
      en: 'Accessibility is not an extra after launch; it directly shapes component architecture. Modals, menus, custom inputs, and error messages must work with keyboards and assistive technology. Strong candidates talk not only about ARIA, but also about semantic defaults and testing practice. That shows mature frontend responsibility.',
    },
    resources: ['w3cAccessibility', 'reactInput', 'reactPortal'],
  }),
  q({
    id: 92,
    category: 'react',
    question: {
      de: 'Wie testet man React-Komponenten sinnvoll?',
      en: 'How do you test React components sensibly?',
    },
    answer: {
      de: 'Sinnvolle Tests konzentrieren sich auf beobachtbares Verhalten statt auf interne Implementierungsdetails. Nutzeraktionen, Rendering, Zustandswechsel und wichtige Fehlerpfade sind meist die relevanten Ebenen. Senior-Level bedeutet, das richtige Testniveau für Unit, Integration und E2E zu wählen.',
      en: 'Sensible tests focus on observable behavior rather than internal implementation details. User interactions, rendering, state changes, and key failure paths are usually the important layers. Senior-level thinking chooses the right level across unit, integration, and end-to-end tests.',
    },
    exampleTitle: {
      de: 'Vom Nutzer her testen',
      en: 'Test from the user perspective',
    },
    exampleExplanation: {
      de: 'Der Test klickt und prüft den sichtbaren Effekt. Das ist stabiler als direkte State-Inspektion oder Hook-Mocking ohne Not.',
      en: 'The test clicks and checks the visible result. That is more stable than inspecting state directly or mocking hooks unnecessarily.',
    },
    exampleCode: `await user.click(screen.getByRole('button', { name: /save/i }))
expect(screen.getByText(/saved/i)).toBeInTheDocument()`,
    explanation: {
      de: 'Tests sind Teil der Architektur und nicht nur Sicherheitsnetz. Wer zu sehr auf Implementierungsdetails testet, blockiert Refactoring und verliert Vertrauen in die Suite. Gute Kandidaten erklären, welche Risiken sie auf welcher Ebene absichern wollen. Das zeigt strategisches Qualitätsdenken.',
      en: 'Tests are part of the architecture, not just a safety net. If you test implementation details too heavily, you block refactoring and lose confidence in the suite. Strong candidates explain which risks they want to cover at which level. That shows strategic quality thinking.',
    },
    resources: ['testingLibraryIntro', 'reactThinking', 'reactErrorBoundary'],
  }),
  q({
    id: 93,
    category: 'react',
    question: {
      de: 'Welche Data-Fetching-Patterns sind in React sinnvoll?',
      en: 'Which data-fetching patterns are sensible in React?',
    },
    answer: {
      de: 'Sinnvoll sind Patterns, die Caching, Ladezustand, Fehlerbehandlung und Invalidation explizit behandeln. Ein nackter `useEffect` plus `fetch` reicht für einfache Fälle, skaliert aber oft schlecht. Senior-Level bedeutet, Server- und Client-Grenzen bewusst zu nutzen und Wasserfälle zu vermeiden.',
      en: 'Sensible patterns make caching, loading state, error handling, and invalidation explicit. A plain `useEffect` plus `fetch` is enough for simple cases but often scales poorly. Senior-level thinking uses server/client boundaries deliberately and avoids waterfalls.',
    },
    exampleTitle: {
      de: 'Datenfluss als Systemproblem behandeln',
      en: 'Treat data flow as a system problem',
    },
    exampleExplanation: {
      de: 'Je nach Stack kann derselbe Datenbedarf serverseitig, clientseitig oder über eine Query-Library sinnvoller gelöst sein.',
      en: 'Depending on the stack, the same data need may be better served on the server, on the client, or through a query library.',
    },
    exampleCode: `// choose between server fetch, client query cache, or local effect based on ownership`,
    explanation: {
      de: 'Datenladen ist selten nur eine Hook-Frage. Es geht um Caching, Priorisierung, Fehlerbilder, Revalidierung und Interaktionskosten. Gute Kandidaten erklären, warum ein Pattern für den konkreten Fall passt und welche Nachteile sie bewusst akzeptieren. Das ist deutlich wertvoller als das Nennen eines einzelnen Tools.',
      en: 'Data fetching is rarely just a hook question. It is about caching, prioritization, failure modes, revalidation, and interaction cost. Strong candidates explain why a pattern fits the concrete case and which drawbacks they consciously accept. That is far more valuable than naming one tool.',
    },
    resources: ['reactUseEffect', 'reactYouMightNotNeedEffect', 'reactServerComponents'],
  }),
  q({
    id: 94,
    category: 'react',
    question: {
      de: 'Wann ist Optimistic UI sinnvoll und welche Risiken gibt es?',
      en: 'When is optimistic UI useful and what are the risks?',
    },
    answer: {
      de: 'Optimistic UI zeigt ein erwartetes Ergebnis sofort und wartet die Serverbestätigung erst später ab. Das verbessert gefühlte Geschwindigkeit, bringt aber Rückrolllogik und Konfliktfälle mit sich. Senior-Level bedeutet, nur dort optimistisch zu sein, wo Fehlerfälle sauber aufgefangen werden können.',
      en: 'Optimistic UI shows the expected result immediately and waits for server confirmation afterward. That improves perceived speed, but it introduces rollback logic and conflict cases. Senior-level judgment uses optimistic updates only where failure can be handled cleanly.',
    },
    exampleTitle: {
      de: 'Schnelles Feedback mit Rückfalloption',
      en: 'Fast feedback with a rollback path',
    },
    exampleExplanation: {
      de: 'Die UI reagiert sofort, muss aber im Fehlerfall den Zustand wieder korrigieren oder markieren. Genau darin steckt die eigentliche Komplexität.',
      en: 'The UI reacts immediately, but in failure cases it must repair or mark the state. That is where the real complexity lies.',
    },
    exampleCode: `const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, next) => [...state, next])`,
    explanation: {
      de: 'Optimistic UI passt gut zu klaren, reversiblen Aktionen wie Likes, einfachem Toggle oder Ergänzungen. Schwieriger wird es bei Konflikten, serverseitigen Regeln oder komplexen Nebenwirkungen. Gute Kandidaten verbinden die Diskussion daher mit Fachlogik und Konsistenzmodell statt nur mit UX. Das ist die eigentliche Senior-Perspektive.',
      en: 'Optimistic UI fits well with clear, reversible actions such as likes, simple toggles, or straightforward additions. It gets harder with conflicts, server-side rules, or complex side effects. Strong candidates therefore connect the discussion to domain logic and consistency models instead of only UX. That is the real senior perspective.',
    },
    resources: ['reactUseOptimistic', 'reactUseTransition', 'reactState'],
  }),
  q({
    id: 95,
    category: 'react',
    question: {
      de: 'Wofür sind Portals nützlich?',
      en: 'What are portals useful for?',
    },
    answer: {
      de: 'Portals rendern einen React-Teilbaum an einer anderen Stelle im DOM, ohne ihn aus dem React-Baum herauszunehmen. Das ist hilfreich für Modals, Tooltips oder Overlays, die visuell außerhalb eines Containers liegen müssen. Senior-Level bedeutet, dabei Fokusmanagement und Event-Verhalten mitzudenken.',
      en: 'Portals render a React subtree into a different place in the DOM without removing it from the React tree. That is useful for modals, tooltips, or overlays that must visually escape a container. Senior-level thinking also accounts for focus management and event behavior.',
    },
    exampleTitle: {
      de: 'Modal über dem restlichen Layout platzieren',
      en: 'Place a modal above the rest of the layout',
    },
    exampleExplanation: {
      de: 'Das Portal rendert in ein DOM-Ziel außerhalb der normalen Layout-Hierarchie. So werden Z-Index- und Overflow-Probleme oft einfacher.',
      en: 'The portal renders into a DOM target outside the normal layout hierarchy. That often simplifies z-index and overflow issues.',
    },
    exampleCode: `createPortal(<Dialog />, document.body)`,
    explanation: {
      de: 'Portals lösen Layoutprobleme, aber nicht automatisch Interaktionsprobleme. Ein Modal braucht zusätzlich Fokusfalle, Escape-Handling, Scroll-Lock und gute Accessibility. Gute Kandidaten sehen Portals daher als Baustein, nicht als fertige Komponente. Das zeigt reife UI-Architektur.',
      en: 'Portals solve layout problems, but they do not automatically solve interaction problems. A modal still needs focus trapping, Escape handling, scroll lock, and good accessibility. Strong candidates therefore see portals as a building block, not a finished component. That shows mature UI architecture.',
    },
    resources: ['reactPortal', 'w3cAccessibility', 'reactUseRef'],
  }),
  q({
    id: 96,
    category: 'react',
    question: {
      de: 'Wann braucht man `forwardRef` oder ein bewusstes Ref-API?',
      en: 'When do you need `forwardRef` or a deliberate ref API?',
    },
    answer: {
      de: 'Ein Ref-API ist sinnvoll, wenn ein Elternteil bewusst imperativ auf ein Kind zugreifen muss, etwa für Fokus, Scrollen oder Integration mit Fremdbibliotheken. `forwardRef` hilft, diese Brücke explizit zu machen. Senior-Level bedeutet, Ref-Zugriff klein und gezielt zu halten, statt Komponenten dadurch unklar zu koppeln.',
      en: 'A ref API is useful when a parent intentionally needs imperative access to a child, for example for focus, scrolling, or third-party integration. `forwardRef` helps make that bridge explicit. Senior-level use keeps ref access small and targeted instead of coupling components ambiguously.',
    },
    exampleTitle: {
      de: 'Fokus bewusst nach außen freigeben',
      en: 'Expose focus intentionally to the outside',
    },
    exampleExplanation: {
      de: 'Die Komponente bleibt kapselbar, erlaubt aber einen gezielten Fokuszugriff. Genau dafür ist ein Ref-API gedacht.',
      en: 'The component stays encapsulated while still allowing targeted focus access. That is exactly what a ref API is for.',
    },
    exampleCode: `const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />
})`,
    explanation: {
      de: 'Imperative Schnittstellen sind manchmal notwendig, aber sie sollten bewusst klein bleiben. Sonst wird Reacts deklaratives Modell langsam von außen umgangen. Gute Kandidaten erklären deshalb nicht nur, wie man ein Ref weiterreicht, sondern wann man es überhaupt zulassen sollte. Das ist API-Design und nicht nur Hook-Wissen.',
      en: 'Imperative interfaces are sometimes necessary, but they should stay intentionally small. Otherwise React\'s declarative model starts getting bypassed from the outside. Strong candidates therefore explain not only how to forward a ref, but when the component should allow that at all. That is API design, not just hook knowledge.',
    },
    resources: ['reactForwardRef', 'reactUseRef', 'w3cAccessibility'],
  }),
  q({
    id: 97,
    category: 'react',
    question: {
      de: 'Was sind Compound Components und wann sind sie sinnvoll?',
      en: 'What are compound components and when are they useful?',
    },
    answer: {
      de: 'Compound Components zerlegen eine komplexe UI in mehrere zusammengehörige Teilkomponenten mit gemeinsamer impliziter Koordination. Das ist oft hilfreich für Tabs, Menues oder Accordions. Senior-Level bedeutet, damit flexible APIs zu bauen, ohne Verhalten zu verstecken oder Accessibility zu vernachlässigen.',
      en: 'Compound components break a complex UI into multiple related subcomponents with shared implicit coordination. This is often useful for tabs, menus, or accordions. Senior-level use builds flexible APIs without hiding behavior or neglecting accessibility.',
    },
    exampleTitle: {
      de: 'Mehrere Teile, ein gemeinsames Verhalten',
      en: 'Multiple parts, one shared behavior',
    },
    exampleExplanation: {
      de: 'Die API wirkt für Konsumenten natürlich, während intern gemeinsame Logik oder Context die Teile verbindet.',
      en: 'The API feels natural to consumers while internal shared logic or context coordinates the parts.',
    },
    exampleCode: `<Tabs>
  <Tabs.List />
  <Tabs.Trigger value="profile" />
  <Tabs.Content value="profile" />
</Tabs>`,
    explanation: {
      de: 'Compound Components sind vor allem ein API-Design-Pattern. Sie können sehr elegant sein, wenn Struktur und Verhalten für Konsumenten intuitiv bleiben. Gleichzeitig wird das Pattern schnell schwer wartbar, wenn zu viel implizit über Context und versteckte Regeln läuft. Gute Kandidaten argumentieren daher über Ergonomie, Transparenz und Barrierefreiheit zugleich.',
      en: 'Compound components are primarily an API design pattern. They can be very elegant when structure and behavior remain intuitive for consumers. At the same time, the pattern becomes hard to maintain when too much is implicit through context and hidden rules. Strong candidates therefore argue in terms of ergonomics, transparency, and accessibility together.',
    },
    resources: ['reactContext', 'reactThinking', 'w3cAccessibility'],
  }),
  q({
    id: 98,
    category: 'react',
    question: {
      de: 'Was ist ein Headless UI Pattern und warum ist es oft hilfreich?',
      en: 'What is a headless UI pattern and why is it often helpful?',
    },
    answer: {
      de: 'Headless UI trennt Verhalten und Accessibility von konkretem Styling oder Markup. Dadurch bleiben Komponenten flexibel für verschiedene Designs, ohne dass die Interaktionslogik jedes Mal neu geschrieben werden muss. Senior-Level bedeutet, diese Trennung bewusst für Designsysteme und Produktteams zu nutzen.',
      en: 'Headless UI separates behavior and accessibility from concrete styling or markup. That keeps components flexible across different designs without rewriting interaction logic each time. Senior-level thinking uses that separation deliberately for design systems and product teams.',
    },
    exampleTitle: {
      de: 'Verhalten kapseln, Gestaltung offen lassen',
      en: 'Encapsulate behavior, leave presentation open',
    },
    exampleExplanation: {
      de: 'Die Komponente liefert Zustand und Event-Hooks, aber kein starres Aussehen. Das passt gut zu individuellen Designsystemen.',
      en: 'The component provides state and event hooks but no rigid appearance. That fits custom design systems well.',
    },
    exampleCode: `const { open, getTriggerProps, getPanelProps } = useDisclosure()`,
    explanation: {
      de: 'Headless Patterns sind besonders dann stark, wenn mehrere Teams auf derselben Interaktionslogik aufbauen, aber unterschiedliche UIs brauchen. Sie verhindern doppelten Logikcode und halten Styling-Entscheidungen flexibel. Gleichzeitig muss die API sehr sorgfältig sein, sonst wird die Nutzung kompliziert. Gute Kandidaten sehen Headless UI als Designsystem-Thema mit klaren Trade-offs.',
      en: 'Headless patterns are especially strong when multiple teams build on the same interaction logic but need different UIs. They prevent duplicated behavior code and keep styling decisions flexible. At the same time, the API must be very carefully designed or it becomes cumbersome to use. Strong candidates see headless UI as a design-system concern with clear trade-offs.',
    },
    resources: ['reactCustomHooks', 'reactContext', 'w3cAccessibility'],
  }),
  q({
    id: 99,
    category: 'react',
    question: {
      de: 'Wann ist Code Splitting mit `lazy` sinnvoll?',
      en: 'When is code splitting with `lazy` useful?',
    },
    answer: {
      de: 'Code Splitting mit `lazy` ist sinnvoll, wenn ein Teil des UI selten oder später benötigt wird und das Initialbundle entlastet werden soll. Das gilt etwa für Adminbereiche, Modals oder große Spezialansichten. Senior-Level bedeutet, Bundle-Gewinn gegen Ladeunterbrechung und Fallback-Design abzuwiegen.',
      en: 'Code splitting with `lazy` is useful when part of the UI is needed rarely or later and the initial bundle should be lighter. That applies to admin areas, modals, or large specialist views. Senior-level thinking balances bundle savings against loading interruptions and fallback design.',
    },
    exampleTitle: {
      de: 'Seltene Ansichten später laden',
      en: 'Load rare views later',
    },
    exampleExplanation: {
      de: 'Die Reports-Ansicht wird erst geladen, wenn sie wirklich gebraucht wird. Das entlastet den ersten Seitenaufruf.',
      en: 'The reports view is loaded only when it is actually needed. That reduces the cost of the initial page load.',
    },
    exampleCode: `const ReportsPage = lazy(() => import('./ReportsPage'))`,
    explanation: {
      de: 'Code Splitting ist kein Selbstzweck. Zu viele kleine Chunks können das Netzwerksystem belasten und die UX fragmentieren. Gute Kandidaten sprechen deshalb über sinnvolle Grenzziehung, Nutzerpfade und Preloading statt nur über das technische API. Das zeigt Produkt- und Performanceverständnis zugleich.',
      en: 'Code splitting is not an end in itself. Too many tiny chunks can burden the network and fragment the UX. Strong candidates therefore talk about meaningful boundaries, user paths, and preloading instead of just the technical API. That shows both product and performance awareness.',
    },
    resources: ['reactLazy', 'reactSuspense', 'reactThinking'],
  }),
  q({
    id: 100,
    category: 'react',
    question: {
      de: 'Wie erkennt und behebt man Hydration-Mismatches?',
      en: 'How do you recognize and fix hydration mismatches?',
    },
    answer: {
      de: 'Hydration-Mismatches entstehen, wenn der serverseitig erzeugte HTML-Output nicht zum ersten Client-Render passt. Typische Ursachen sind unterschiedliche Zeitwerte, Zufallswerte oder browserabhängige Logik im Renderpfad. Senior-Level bedeutet, server- und clientseitige Verantwortlichkeiten klar zu trennen.',
      en: 'Hydration mismatches happen when the server-rendered HTML does not match the first client render. Common causes are time-dependent values, randomness, or browser-specific logic in the render path. Senior-level thinking keeps server and client responsibilities clearly separated.',
    },
    exampleTitle: {
      de: 'Nicht-deterministische Werte aus dem ersten Render fernhalten',
      en: 'Keep non-deterministic values out of the first render',
    },
    exampleExplanation: {
      de: 'Wenn server- und clientseitig unterschiedliche Werte entstehen, meldet React eine Hydration-Warnung. Deterministische erste Ausgaben vermeiden das Problem.',
      en: 'If the server and client produce different values, React raises a hydration warning. Deterministic first renders avoid the issue.',
    },
    exampleCode: `// avoid in the first render
const now = new Date().toLocaleTimeString()`,
    explanation: {
      de: 'Hydration-Probleme sind oft Zeichen für vermischte Verantwortlichkeiten. Daten, die nur im Browser existieren, sollten später oder bewusst clientseitig gelesen werden. Wer serverseitigen Output deterministisch hält, reduziert Warnungen und seltsame UI-Sprünge. Gute Kandidaten verbinden das Thema mit Rendering-Architektur und Debuggingstrategie.',
      en: 'Hydration problems are often a sign of mixed responsibilities. Data that exists only in the browser should be read later or intentionally on the client. Keeping server output deterministic reduces warnings and strange UI jumps. Strong candidates connect the topic to rendering architecture and debugging strategy.',
    },
    resources: ['reactHydrateRoot', 'reactServerComponents', 'reactUseEffect'],
  }),
]

const toolingArchitectureQuestions: InterviewQuestion[] = [
  q({
    id: 101,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie sollten `package.json`-Scripts in einem Frontend-Projekt aufgebaut sein?',
      en: 'How should `package.json` scripts be structured in a frontend project?',
    },
    answer: {
      de: '`package.json`-Scripts sind die stabile Oberfläche für wiederkehrende Abläufe wie Dev-Server, Build, Tests und Qualitätschecks. Wichtig ist, dass sie Team-Konventionen kapseln, statt Spezialwissen in lokalen Shell-Aliasen oder Wiki-Seiten zu verstecken. Gute Scripts benennen Absicht klar und bleiben von CI bis Laptop identisch nutzbar.',
      en: '`package.json` scripts are the stable interface for recurring workflows such as local development, builds, tests, and quality checks. The important part is to encode team conventions instead of hiding them in shell aliases or wiki pages. Good scripts communicate intent clearly and work the same in CI and on a laptop.',
    },
    exampleTitle: {
      de: 'Wenige Einstiege, klare Verantwortung',
      en: 'Few entry points, clear responsibility',
    },
    exampleExplanation: {
      de: 'Die wichtigsten Aufgaben haben jeweils einen klaren Einstiegspunkt. Dadurch wissen Menschen und CI sofort, welcher Befehl die gewünschte Aussage trifft.',
      en: 'The most important tasks each get one clear entry point. That lets both humans and CI know exactly which command expresses the desired intent.',
    },
    exampleCode: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "check": "eslint . && vitest run"
  }
}`,
    explanation: {
      de: 'Ein gutes Script-Set bildet Produkt- und Teamgrenzen ab. Typisch sind getrennte Kommandos für lokale Entwicklung, schnelle Checks und vollere CI-Prüfungen, damit Feedback-Geschwindigkeit und Verlässlichkeit zusammenpassen. Problematisch wird es, wenn ein einziger Mega-Befehl alles versteckt oder wenn dieselbe Absicht in mehreren Varianten nebeneinander lebt.',
      en: 'A good set of scripts reflects product and team boundaries. Commonly that means separate commands for local development, quick checks, and fuller CI validation so feedback speed and reliability can both stay high. Trouble starts when one mega-command hides everything or when the same intent exists in several slightly different variants.',
    },
    resources: ['viteGuide', 'eslintGettingStarted', 'vitestGuide'],
  }),
  q({
    id: 102,
    category: 'toolingArchitecture',
    question: {
      de: 'Warum ist ein sauber gepflegter Lockfile für Teams und CI so wichtig?',
      en: 'Why is a well-maintained lockfile so important for teams and CI?',
    },
    answer: {
      de: 'Der Lockfile friert direkte und transitive Abhängigkeiten auf einen reproduzierbaren Stand ein. Das macht lokale Setups, CI-Läufe und Rollbacks deutlich verlässlicher, weil nicht bei jedem Install unbemerkt neue Paketversionen einfließen. Ohne gepflegten Lockfile wird Fehlersuche schnell zum Zufall.',
      en: 'A lockfile freezes direct and transitive dependencies at a reproducible state. That makes local setups, CI runs, and rollbacks far more reliable because new package versions do not slip in on every install. Without a maintained lockfile, debugging quickly becomes guesswork.',
    },
    exampleTitle: {
      de: 'CI installiert exakt den festgeschriebenen Stand',
      en: 'CI installs the exact recorded dependency state',
    },
    exampleExplanation: {
      de: '`npm ci` scheitert lieber früh, als stillschweigend einen neuen Paketbaum zu erzeugen. Genau das macht Builds reproduzierbar.',
      en: '`npm ci` fails early instead of silently creating a new dependency tree. That is exactly what keeps builds reproducible.',
    },
    exampleCode: `npm ci
npm run build`,
    explanation: {
      de: 'Lockfiles sind nicht nur ein Installationsdetail, sondern Teil der Lieferkette. Sie begrenzen Versionsdrift, machen Security-Updates nachvollziehbar und helfen dabei, ob ein Fehler wirklich aus eigenem Code oder aus einer transitive Änderung stammt. In Reviews sollte man deshalb Lockfile-Diffs ernst nehmen, ohne jede Änderung reflexhaft zu blockieren.',
      en: 'Lockfiles are not just an installation detail, but part of the delivery chain. They limit version drift, make security updates traceable, and help identify whether a bug comes from your code or from a transitive dependency change. Reviews should therefore treat lockfile diffs seriously without blocking every update reflexively.',
    },
    resources: ['npmCi', 'githubActionsNode', 'semverSpec'],
  }),
  q({
    id: 103,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie wählt man einen Build- oder Bundler-Stack wie Vite, Webpack oder Rspack sinnvoll aus?',
      en: 'How do you choose a build or bundler stack such as Vite, Webpack, or Rspack sensibly?',
    },
    answer: {
      de: 'Die Wahl sollte von Anforderungen wie Dev-Server-Geschwindigkeit, Plugin-Ökosystem, SSR-Bedarf, Legacy-Support und vorhandener Team-Erfahrung abhängen. Ein Bundler ist Infrastruktur, kein Glaubensbekenntnis. Entscheidend ist, wie gut der Stack die reale Produkt- und Deploy-Pipeline unterstützt.',
      en: 'The choice should follow requirements such as dev-server speed, plugin ecosystem, SSR needs, legacy support, and the team’s existing experience. A bundler is infrastructure, not identity. What matters is how well the stack supports the actual product and deployment pipeline.',
    },
    exampleTitle: {
      de: 'Tooling entlang der Produktanforderung wählen',
      en: 'Choose tooling based on product needs',
    },
    exampleExplanation: {
      de: 'Ein einfacher Vite-Setup ist stark, wenn man schnelles Feedback und wenig Konfigurationsballast will. Schwerere Anforderungen können andere Werkzeuge rechtfertigen.',
      en: 'A simple Vite setup is strong when you want fast feedback and little configuration overhead. Heavier requirements may justify different tooling.',
    },
    exampleCode: `export default defineConfig({
  plugins: [react()],
})`,
    explanation: {
      de: 'Werkzeugwahl wird teuer, sobald sie Migrationen, CI, Plugin-Kompatibilität und Debugging berührt. Deshalb lohnt sich eine Entscheidungsmatrix aus Produktanforderungen, Betriebsmodell und Team-Fähigkeiten mehr als ein Benchmark-Screenshot. Gute Architektur trennt dabei Kernanforderungen von kurzlebigen Hype-Wellen.',
      en: 'Tool selection becomes expensive as soon as it touches migrations, CI, plugin compatibility, and debugging. That is why a decision matrix based on product needs, operating model, and team capability is more useful than a benchmark screenshot. Good architecture separates core requirements from short-lived hype waves.',
    },
    resources: ['viteGuide', 'tsPerformance', 'githubActionsDocs'],
  }),
  q({
    id: 104,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie erklärt man Tree Shaking und Bundle-Analyse praktisch?',
      en: 'How do you explain tree shaking and bundle analysis in practical terms?',
    },
    answer: {
      de: 'Tree Shaking entfernt ungenutzte Exporte nur dann zuverlässig, wenn Module statisch analysierbar sind und Seiteneffekte sauber markiert werden. Bundle-Analyse zeigt dann, ob Bibliotheken, Imports oder Build-Konfiguration unnötig viel JavaScript in den Client schieben. Entscheidend ist nicht das Schlagwort, sondern messbare Auswirkung auf Initial- und Folgelast.',
      en: 'Tree shaking removes unused exports reliably only when modules stay statically analyzable and side effects are marked cleanly. Bundle analysis then shows whether libraries, imports, or build configuration are shipping unnecessary JavaScript to the client. What matters is not the buzzword, but the measurable impact on initial and follow-up cost.',
    },
    exampleTitle: {
      de: 'Statische Exporte statt dynamischer Magie',
      en: 'Static exports instead of dynamic magic',
    },
    exampleExplanation: {
      de: 'Nur der tatsächlich importierte Export landet im Zielbundle, wenn das Paket sauber aufgebaut ist. Dynamische Seiteneffekte zerstören diesen Vorteil schnell.',
      en: 'Only the actually imported export lands in the target bundle when the package is structured cleanly. Dynamic side effects can destroy that benefit very quickly.',
    },
    exampleCode: `// utils.ts
export const sum = (a: number, b: number) => a + b
export const debug = () => console.log('debug')

// app.ts
import { sum } from './utils'`,
    explanation: {
      de: 'In der Praxis ist Tree Shaking ein Zusammenspiel aus ESM, Paketstruktur und Disziplin bei Seiteneffekten. Bundle-Analyse hilft dabei, Bauchgefühl durch echte Größen- und Ursprungsdaten zu ersetzen. Gerade große Teams profitieren davon, Performance-Probleme nicht erst im Lighthouse-Bericht zu entdecken, sondern schon bei Dependencies und Imports zu sehen.',
      en: 'In practice, tree shaking is a combination of ESM, package structure, and discipline around side effects. Bundle analysis helps replace gut feeling with real size and origin data. Large teams especially benefit from seeing performance problems in dependencies and imports before they show up in a Lighthouse report.',
    },
    resources: ['viteGuide', 'reactLazy', 'tsModules'],
  }),
  q({
    id: 105,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie trennt man Umgebungsvariablen und Laufzeitkonfiguration im Frontend sauber?',
      en: 'How do you separate environment variables and runtime configuration cleanly in frontend apps?',
    },
    answer: {
      de: 'Frontend-Konfiguration muss klar zwischen Build-Zeit, Deploy-Zeit und echter Laufzeit unterscheiden. Alles, was im Client-Bundle landet, ist grundsätzlich öffentlich und darf nicht wie ein Server-Secret behandelt werden. Gute Lösungen machen diese Grenze sichtbar und typisieren Konfiguration früh.',
      en: 'Frontend configuration has to distinguish clearly between build time, deploy time, and true runtime. Anything that ends up in the client bundle is effectively public and must not be treated like a server secret. Good setups make that boundary explicit and type configuration early.',
    },
    exampleTitle: {
      de: 'Öffentliche Config explizit lesen',
      en: 'Read public config explicitly',
    },
    exampleExplanation: {
      de: 'Die Variable ist für den Client freigegeben und wird bewusst über die Tooling-Konvention gelesen. Das verhindert falsche Sicherheitsannahmen.',
      en: 'The variable is explicitly exposed to the client and read through the tooling convention. That prevents false security assumptions.',
    },
    exampleCode: `const apiBaseUrl = import.meta.env.VITE_API_BASE_URL`,
    explanation: {
      de: 'Saubere Konfiguration vermeidet zwei typische Fehler: Secrets im Frontend und unklare Überschreibungsketten zwischen lokal, CI und Produktion. Besonders hilfreich sind zentrale Config-Module, Validierung beim Start und klare Namenskonventionen pro Umgebung. Damit wird Konfiguration testbarer und Fehlersuche deutlich schneller.',
      en: 'Clean configuration avoids two common failures: secrets in the frontend and unclear override chains across local, CI, and production environments. Central config modules, startup validation, and clear naming conventions per environment are especially helpful. That makes configuration more testable and debugging much faster.',
    },
    resources: ['viteEnvModes', 'twelveFactor', 'githubActionsDocs'],
  }),
  q({
    id: 106,
    category: 'toolingArchitecture',
    question: {
      de: 'Warum sollte CI Linting, Typprüfung, Tests und Build getrennt ausführen?',
      en: 'Why should CI run linting, type checking, tests, and builds as separate steps?',
    },
    answer: {
      de: 'Getrennte Schritte geben schnelleres und präziseres Feedback darüber, welche Qualitätsdimension wirklich gebrochen ist. Das verkürzt Fehlersuche, erleichtert Caching und macht Pipelines robuster gegen Teilfehler. Ein einziger Sammel-Command spart selten Zeit, verschlechtert aber oft die Diagnose.',
      en: 'Separate steps provide faster and more precise feedback about which quality dimension actually broke. That shortens debugging, improves caching, and makes pipelines more robust against partial failures. One giant combined command rarely saves time but often worsens diagnosis.',
    },
    exampleTitle: {
      de: 'Eine Pipeline, mehrere klare Aussagen',
      en: 'One pipeline, several clear signals',
    },
    exampleExplanation: {
      de: 'Jeder Schritt beantwortet eine andere Frage: Stil, Typen, Verhalten oder Lieferbarkeit. Dadurch wird ein roter Build sofort konkreter.',
      en: 'Each step answers a different question: style, types, behavior, or ship readiness. That makes a failing pipeline immediately more actionable.',
    },
    exampleCode: `jobs:
  quality:
    steps:
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run build`,
    explanation: {
      de: 'Pipelines sind Produktivitätswerkzeuge und keine bloßen Gatekeeper. Wer Checks trennt, kann sie parallelisieren, gezielt wiederholen und sauber reporten. Das hilft Teams besonders dann, wenn Builds größer werden und nicht jeder Fehler denselben Diagnoseweg oder dieselbe Laufzeit hat.',
      en: 'Pipelines are productivity tools, not just gatekeepers. Separating checks lets you parallelize them, rerun them selectively, and report them cleanly. That helps especially once builds grow and not every failure deserves the same diagnostic path or runtime.',
    },
    resources: ['githubActionsDocs', 'githubActionsNode', 'vitestGuide'],
  }),
  q({
    id: 107,
    category: 'toolingArchitecture',
    question: {
      de: 'Was ist die sinnvolle Aufgabentrennung zwischen ESLint und Prettier?',
      en: 'What is the sensible division of responsibility between ESLint and Prettier?',
    },
    answer: {
      de: 'ESLint prüft Regeln zu Fehlern, Risiko und Code-Qualität, während Prettier die Formatierung deterministisch vereinheitlicht. Sobald beide Werkzeuge dieselbe Sorge bearbeiten sollen, entsteht Reibung in Konfiguration und Entwicklerfluss. Die klare Trennung hält Diskussionen über Stil klein und Regeln über Verhalten scharf.',
      en: 'ESLint enforces rules around mistakes, risk, and code quality, while Prettier standardizes formatting deterministically. As soon as both tools try to own the same concern, configuration and developer flow start fighting each other. A clear split keeps style debates small and behavior rules sharp.',
    },
    exampleTitle: {
      de: 'Format automatisch, Verhalten bewusst prüfen',
      en: 'Format automatically, review behavior deliberately',
    },
    exampleExplanation: {
      de: 'Formatierung wird ohne Diskussion normiert, während Lint-Regeln echte Qualitätsaussagen treffen. So bleibt Review-Zeit für Substanz frei.',
      en: 'Formatting gets normalized without debate while lint rules express actual quality concerns. That leaves review time for substance.',
    },
    exampleCode: `{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}`,
    explanation: {
      de: 'Diese Trennung ist vor allem ein Team-Scaling-Thema. Formatierung sollte kaum Entscheidungsenergie kosten, während Lint-Regeln begründet, dokumentiert und bei Bedarf bewusst verändert werden. Wer beide Ebenen mischt, erhält oft unnötig laute Tools und unklare Ownership.',
      en: 'This separation is primarily a team scaling concern. Formatting should cost almost no decision energy, while lint rules should be justified, documented, and changed intentionally when needed. Mixing both layers often produces noisy tooling and unclear ownership.',
    },
    resources: ['eslintGettingStarted', 'prettierDocs', 'githubActionsDocs'],
  }),
  q({
    id: 108,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie verteilt man Tests sinnvoll auf Unit-, Integrations- und E2E-Ebene?',
      en: 'How do you distribute tests sensibly across unit, integration, and end-to-end levels?',
    },
    answer: {
      de: 'Die Verteilung sollte sich an Risiko, Feedback-Geschwindigkeit und Beobachtbarkeit orientieren. Kleine Fachlogik gehört meist in schnelle Unit-Tests, komponiertes UI-Verhalten in Integrationstests und geschäftskritische Nutzerpfade in wenige stabile E2E-Checks. Gute Teststrategien optimieren nicht auf Masse, sondern auf Informationswert.',
      en: 'The distribution should follow risk, feedback speed, and observability. Small domain logic usually belongs in fast unit tests, composed UI behavior in integration tests, and a few stable end-to-end checks should cover critical user journeys. Good strategies optimize for information value, not test count.',
    },
    exampleTitle: {
      de: 'Jede Ebene beantwortet eine andere Frage',
      en: 'Each level answers a different question',
    },
    exampleExplanation: {
      de: 'Nicht jeder Fall braucht den Browser. Ein bewusster Schnitt hält Tests schnell und trotzdem aussagekräftig.',
      en: 'Not every case needs a browser. A deliberate split keeps tests fast while still meaningful.',
    },
    exampleCode: `// unit: pure helper
expect(normalizeUser(user)).toEqual(expected)

// e2e: checkout flow
await page.getByRole('button', { name: 'Buy now' }).click()`,
    explanation: {
      de: 'Zu viele teure Browser-Tests machen Pipelines langsam und fragil, zu wenig Systemtests lassen Integrationsrisiken offen. Die Kunst liegt darin, dieselbe Funktionalität nicht blind dreifach zu testen, sondern jede Ebene bewusst für eine andere Art von Vertrauen zu nutzen. So bleibt die Suite schnell, aber deckt trotzdem reale Produktgefahren ab.',
      en: 'Too many expensive browser tests make pipelines slow and fragile, while too few system tests leave integration risk exposed. The art lies in not tripling the same coverage blindly, but using each level for a different kind of confidence. That keeps the suite fast while still covering real product hazards.',
    },
    resources: ['vitestGuide', 'testingLibraryIntro', 'playwrightDocs'],
  }),
  q({
    id: 109,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie reduziert man flaky E2E-Tests nachhaltig?',
      en: 'How do you reduce flaky end-to-end tests sustainably?',
    },
    answer: {
      de: 'Flakiness sinkt, wenn Tests an beobachtbaren Zuständen statt an Timing-Raten hängen und wenn Testdaten, Netzwerk und Umgebungszustand kontrolliert werden. Harte Sleeps sind fast immer ein Symptom für fehlende Modellierung. Nachhaltig stabil werden E2E-Tests erst durch bessere Systemgrenzen, nicht durch mehr Retries allein.',
      en: 'Flakiness drops when tests rely on observable states instead of timing guesses and when test data, network behavior, and environment state are controlled. Hard sleeps are almost always a symptom of missing modeling. End-to-end tests become sustainably stable through better system boundaries, not through more retries alone.',
    },
    exampleTitle: {
      de: 'Auf sichtbaren Zustand warten, nicht auf Zeit',
      en: 'Wait for visible state, not elapsed time',
    },
    exampleExplanation: {
      de: 'Der Test koppelt sich an ein wirkliches UI-Signal statt an eine vermutete Dauer. Das ist robuster über Maschinen und Lastprofile hinweg.',
      en: 'The test couples to a real UI signal instead of an assumed duration. That stays more robust across machines and load profiles.',
    },
    exampleCode: `await expect(page.getByText('Saved')).toBeVisible()`,
    explanation: {
      de: 'Flaky Tests sind oft ein Architekturspiegel: unklare Loading-States, unkontrollierte Seiteneffekte oder nicht isolierte Datenhaltung. Deshalb hilft es, Testbarkeit als Produktmerkmal zu betrachten und nicht erst im Test-Tool nach der Lösung zu suchen. Saubere Selektoren, deterministische Fixtures und klare Wartebedingungen bringen hier den größten Gewinn.',
      en: 'Flaky tests often reflect architectural issues: unclear loading states, uncontrolled side effects, or non-isolated data handling. That is why it helps to treat testability as a product property instead of looking for the fix only inside the test tool. Clean selectors, deterministic fixtures, and explicit wait conditions usually deliver the biggest gains.',
    },
    resources: ['playwrightDocs', 'playwrightBestPractices', 'githubActionsDocs'],
  }),
  q({
    id: 110,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann lohnt sich Storybook oder ein ähnliches Komponenten-Workbench-Tool?',
      en: 'When is Storybook or a similar component workbench worth using?',
    },
    answer: {
      de: 'Storybook lohnt sich besonders, wenn Teams wiederverwendbare Komponenten, Zustandsvarianten und UI-Dokumentation unabhängig von ganzen Produktseiten entwickeln müssen. Der Nutzen steigt mit Designsystem-Reife, Teamgröße und Review-Bedarf. Für sehr kleine Apps kann es dagegen mehr Pflege als Wert erzeugen.',
      en: 'Storybook is especially worth it when teams need to build reusable components, state variants, and UI documentation independently from full product pages. Its value rises with design-system maturity, team size, and review needs. For very small apps, however, it can create more maintenance than benefit.',
    },
    exampleTitle: {
      de: 'Varianten isoliert sichtbar machen',
      en: 'Make variants visible in isolation',
    },
    exampleExplanation: {
      de: 'Ein einzelnes UI-Element kann mit verschiedenen Zuständen und Props geprüft werden, ohne erst die ganze Produktoberfläche hochzufahren.',
      en: 'A single UI element can be inspected across different states and props without booting the entire product surface.',
    },
    exampleCode: `export const ErrorState = {
  args: { status: 'error' },
}`,
    explanation: {
      de: 'Workbench-Tools sind besonders stark für Kommunikation zwischen Entwicklung, Design, QA und Produkt. Sie ersetzen aber keine echte Integrationsumgebung, weil Routing, Datenflüsse und Seiteneffekte dort nur teilweise sichtbar sind. Der beste Einsatz ist daher als Ergänzung für isolierte Qualität und Dokumentation, nicht als alleinige Wahrheit.',
      en: 'Workbench tools are especially strong for communication across engineering, design, QA, and product. They do not replace a real integration environment because routing, data flow, and side effects are only partially visible there. Their best use is as a complement for isolated quality and documentation, not as the only truth.',
    },
    resources: ['storybookDocs', 'storybookWhy', 'w3cAccessibility'],
  }),
  q({
    id: 111,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann ist ein Monorepo für Frontend-Teams sinnvoll?',
      en: 'When is a monorepo sensible for frontend teams?',
    },
    answer: {
      de: 'Ein Monorepo lohnt sich, wenn mehrere Apps, Pakete oder Designsysteme gemeinsame Versionierung, Refactors und Tooling-Standards brauchen. Der Hauptgewinn ist koordinierte Änderung über Grenzen hinweg, nicht bloß ein zentraler Ordner. Ohne klare Paketgrenzen und Build-Disziplin wird ein Monorepo aber schnell nur ein großer gemeinsamer Chaos-Container.',
      en: 'A monorepo pays off when multiple apps, packages, or design systems need shared versioning, refactors, and tooling standards. The main gain is coordinated change across boundaries, not merely one central folder. Without clear package boundaries and build discipline, however, a monorepo quickly becomes just one large shared chaos container.',
    },
    exampleTitle: {
      de: 'App und UI-Kit gemeinsam entwickeln',
      en: 'Develop app and UI kit together',
    },
    exampleExplanation: {
      de: 'Gemeinsame Workspaces erlauben Änderungen an App und Bibliothek in einem Commit. Das reduziert Synchronisationsaufwand deutlich.',
      en: 'Shared workspaces let you change app and library in one commit. That reduces synchronization overhead significantly.',
    },
    exampleCode: `{
  "workspaces": ["apps/*", "packages/*"]
}`,
    explanation: {
      de: 'Monorepos verschieben Komplexität von Version-Synchronisation hin zu Build-, Cache- und Abhängigkeitsdisziplin. Sie helfen besonders bei Designsystemen, Plattform-Teams und großen Refactors, sind aber kein automatischer Produktivitätsbooster für kleine, lose gekoppelte Projekte. Die Entscheidung sollte deshalb nach Änderungsstruktur und Teamtopologie fallen.',
      en: 'Monorepos shift complexity from version synchronization toward build, cache, and dependency discipline. They help especially with design systems, platform teams, and large refactors, but they are not an automatic productivity booster for small, loosely coupled projects. The decision should therefore follow change patterns and team topology.',
    },
    resources: ['npmWorkspaces', 'storybookDocs', 'githubActionsDocs'],
  }),
  q({
    id: 112,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie hält man Paketgrenzen in einem Monorepo oder Multi-Package-Setup sauber?',
      en: 'How do you keep package boundaries clean in a monorepo or multi-package setup?',
    },
    answer: {
      de: 'Saubere Paketgrenzen entstehen durch klare Verantwortung, explizite öffentliche APIs und Regeln gegen tiefe Querimporte. Entscheidend ist, dass Abhängigkeiten fachlich und technisch gerichtet bleiben. Sonst verliert das Repo schnell seine Wartbarkeit, auch wenn alles formal noch baut.',
      en: 'Clean package boundaries come from clear ownership, explicit public APIs, and rules against deep cross-imports. The key is that dependencies stay directed both technically and by domain intent. Otherwise the repo quickly loses maintainability even if everything still builds.',
    },
    exampleTitle: {
      de: 'Nur über öffentliche Eintritte konsumieren',
      en: 'Consume only through public entry points',
    },
    exampleExplanation: {
      de: 'Die App importiert aus dem Paket-Index statt aus internen Dateien. Dadurch bleiben Refactors innerhalb des Pakets möglich.',
      en: 'The app imports from the package index instead of internal files. That keeps refactors inside the package possible.',
    },
    exampleCode: `import { Button } from '@acme/ui'`,
    explanation: {
      de: 'Grenzen müssen technisch durchsetzbar sein, nicht nur im Wiki stehen. Hilfreich sind Import-Regeln, Alias-Konventionen, Paket-Tests und Review-Gewohnheiten, die „nur kurz intern importieren“ konsequent zurückweisen. Gute Paketgrenzen sind ein Hebel für refaktorierbare Systeme und schnellere Teams.',
      en: 'Boundaries have to be enforceable technically, not just described in a wiki. Helpful tools include import rules, alias conventions, package tests, and review habits that reject “just quickly importing an internal file.” Good package boundaries are a lever for refactorable systems and faster teams.',
    },
    resources: ['npmWorkspaces', 'tsPaths', 'eslintGettingStarted'],
  }),
  q({
    id: 113,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie geht man mit Versionierung und Releases interner Pakete sinnvoll um?',
      en: 'How do you handle versioning and releases of internal packages sensibly?',
    },
    answer: {
      de: 'Interne Pakete brauchen klare Regeln dafür, wann ein Change breaking, minor oder patch ist, selbst wenn alles im selben Repo lebt. Versionierung ist Kommunikation über Kompatibilität, nicht nur ein Publish-Schritt. Je mehr Teams auf dieselben Pakete bauen, desto wichtiger werden nachvollziehbare Releases und Changelogs.',
      en: 'Internal packages still need clear rules for what counts as breaking, minor, or patch even when everything lives in one repo. Versioning is communication about compatibility, not just a publish step. The more teams build on the same packages, the more valuable traceable releases and changelogs become.',
    },
    exampleTitle: {
      de: 'Kompatibilität bewusst signalisieren',
      en: 'Signal compatibility deliberately',
    },
    exampleExplanation: {
      de: 'Eine kleine API-Korrektur ist nicht dasselbe wie ein Breaking Change. Die Version trägt diese Aussage explizit.',
      en: 'A small API fix is not the same as a breaking change. The version expresses that distinction explicitly.',
    },
    exampleCode: `{
  "name": "@acme/ui",
  "version": "2.3.1"
}`,
    explanation: {
      de: 'Gerade in größeren Frontend-Plattformen spart saubere Versionierung viel Koordinationsaufwand. Teams können Updates planen, Risiken abschätzen und Probleme leichter auf konkrete Änderungen zurückführen. Ob die Umsetzung über manuelle Releases, Changesets oder automatisierte Pipelines läuft, ist zweitrangig gegenüber klaren Kompatibilitätsregeln.',
      en: 'Especially in larger frontend platforms, disciplined versioning saves a lot of coordination overhead. Teams can plan updates, estimate risk, and trace issues back to concrete changes more easily. Whether you implement this through manual releases, Changesets, or automated pipelines matters less than having clear compatibility rules.',
    },
    resources: ['semverSpec', 'githubActionsDocs', 'npmWorkspaces'],
  }),
  q({
    id: 114,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann sind Feature Flags sinnvoll und welche Risiken bringen sie mit?',
      en: 'When are feature flags useful and what risks do they introduce?',
    },
    answer: {
      de: 'Feature Flags sind sinnvoll, wenn man Releases entkoppeln, Risiken staffeln oder Zielgruppen kontrolliert ausrollen will. Ihr Preis ist zusätzliche Zustandskomplexität, mehr Testkombinationen und potenziell verwaiste Logik. Flags sind daher ein Betriebswerkzeug mit Ablaufdatum, keine dauerhafte Architektur-Schicht für alles.',
      en: 'Feature flags are useful when you want to decouple release from deployment, stage risk, or roll out behavior to specific audiences. Their cost is extra state complexity, more test combinations, and potentially abandoned code paths. Flags are therefore an operational tool with an expiration date, not a permanent architecture layer for everything.',
    },
    exampleTitle: {
      de: 'Neue Funktion kontrolliert einschalten',
      en: 'Turn on a new feature in a controlled way',
    },
    exampleExplanation: {
      de: 'Die Entscheidung liegt in einer klaren Gate-Bedingung. Wichtig ist, dass später auch der Aufräumzeitpunkt definiert wird.',
      en: 'The decision lives in one clear gate condition. Just as important is defining when the flag should be removed later.',
    },
    exampleCode: `if (flags.newCheckout) {
  return <NewCheckout />
}

return <ClassicCheckout />`,
    explanation: {
      de: 'Gute Flag-Systeme brauchen Eigentümer, Ablaufregeln und Sichtbarkeit in Tests sowie Monitoring. Sonst kippt ein nützliches Risikowerkzeug in eine zweite Konfigurationswelt mit unklaren Kombinationen. Besonders kritisch wird das, wenn Flags gleichzeitig Produktlogik, Experimente und Berechtigungen mischen.',
      en: 'Good flag systems need owners, expiration rules, and visibility in tests and monitoring. Otherwise a useful risk-management tool turns into a second configuration world with unclear combinations. This becomes especially dangerous when flags start mixing product logic, experiments, and permissions.',
    },
    resources: ['githubActionsDocs', 'twelveFactor', 'testingLibraryIntro'],
  }),
  q({
    id: 115,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie plant man eine inkrementelle Migration eines gewachsenen Frontends?',
      en: 'How do you plan an incremental migration of a grown frontend?',
    },
    answer: {
      de: 'Inkrementelle Migration beginnt mit klaren Zielbildern, stabilen Übergangsgrenzen und einer Reihenfolge nach Risiko und Nutzen. Große Umschreibungen auf einmal blockieren Teams oft länger, als sie helfen. Besser sind vertikale Schnitte, die alten und neuen Code bewusst eine Zeit lang nebeneinander betreiben.',
      en: 'Incremental migration starts with a clear target shape, stable transition boundaries, and an order driven by risk and value. One-shot rewrites often block teams longer than they help. Vertical slices that let old and new code coexist intentionally for a while are usually the better path.',
    },
    exampleTitle: {
      de: 'Neue Fläche am Rand beginnen',
      en: 'Start at the edge with a new slice',
    },
    exampleExplanation: {
      de: 'Eine einzelne Route oder Funktion wird modernisiert, ohne sofort das gesamte Produkt zu verschieben. So entstehen Lernschleifen statt Big-Bang-Risiko.',
      en: 'A single route or capability gets modernized without moving the whole product immediately. That creates learning loops instead of big-bang risk.',
    },
    exampleCode: `routes = {
  '/reports': NewReportsApp,
  '/legacy-orders': LegacyOrdersPage,
}`,
    explanation: {
      de: 'Migration ist vor allem Portfoliomanagement über Zeit. Erfolgreich wird sie durch messbare Zwischenziele, klare Decommission-Schritte und technische Leitplanken für beide Welten. Wer nur das Zielsystem beschreibt, aber nicht den Übergang plant, produziert meistens lange Doppelhaltung ohne echten Fortschritt.',
      en: 'Migration is primarily portfolio management over time. It succeeds through measurable intermediate goals, clear decommission steps, and technical guardrails for both worlds. Teams that describe only the target system but not the transition usually end up with long-lived duplication and little actual progress.',
    },
    resources: ['tsMigration', 'reactThinking', 'githubActionsDocs'],
  }),
  q({
    id: 116,
    category: 'toolingArchitecture',
    question: {
      de: 'Wofür sind Architecture Decision Records im Frontend nützlich?',
      en: 'What are architecture decision records useful for in frontend work?',
    },
    answer: {
      de: 'ADRs halten fest, welche Entscheidung warum getroffen wurde, welche Alternativen geprüft wurden und welche Folgen bewusst akzeptiert sind. Sie ersetzen keine Diskussion, aber sie konservieren Kontext über Teamwechsel und längere Zeiträume. Besonders wertvoll sind sie bei Infrastruktur-, Tooling- und Plattformentscheidungen mit langem Nachlauf.',
      en: 'ADRs capture what decision was made, why it was made, which alternatives were considered, and which consequences were accepted intentionally. They do not replace discussion, but they preserve context across team changes and long time spans. They are especially valuable for infrastructure, tooling, and platform choices with long tails.',
    },
    exampleTitle: {
      de: 'Nicht nur das Was, auch das Warum festhalten',
      en: 'Record not only the what, but also the why',
    },
    exampleExplanation: {
      de: 'Die Entscheidung ist später noch nachvollziehbar, auch wenn die ursprünglichen Beteiligten nicht mehr da sind. Genau das spart Wiederholungsdiskussionen.',
      en: 'The decision remains understandable later even if the original participants are gone. That is exactly what saves repeated debates.',
    },
    exampleCode: `# ADR-012
Decision: adopt Vite for all new frontend apps
Status: accepted`,
    explanation: {
      de: 'ADRs lohnen sich besonders dort, wo Alternativen realistisch waren und die Entscheidung lange Wirkung hat. Sie sollten kurz, konkret und pflegbar bleiben; zu viel Prozess macht sie wertlos, zu wenig Kontext ebenfalls. Gute ADRs beschleunigen spätere Entscheidungen, weil sie Muster und Gründe sichtbar machen.',
      en: 'ADRs are most valuable where alternatives were realistic and the decision has a long-lasting effect. They should stay short, concrete, and maintainable; too much process makes them useless, but so does too little context. Good ADRs speed up future decisions by making patterns and rationale visible.',
    },
    resources: ['githubActionsDocs', 'twelveFactor', 'viteGuide'],
  }),
  q({
    id: 117,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann ist eine Struktur nach Features sinnvoller als nach technischen Layern?',
      en: 'When is structuring by feature more useful than structuring by technical layers?',
    },
    answer: {
      de: 'Feature-orientierte Struktur hilft, wenn Teams und Änderungen entlang fachlicher Bereiche arbeiten und zusammengehörige UI, State und Datenlogik nah beieinander bleiben sollen. Rein technische Layer kippen in großen Produkten oft in breite Sammelordner ohne klare Ownership. Die beste Struktur folgt Änderungsfluss und Verantwortlichkeit, nicht bloß Ästhetik.',
      en: 'A feature-oriented structure helps when teams and changes align with domain areas and related UI, state, and data logic should stay close together. Pure technical layers often turn into broad catch-all folders without clear ownership in larger products. The best structure follows change flow and responsibility, not just aesthetics.',
    },
    exampleTitle: {
      de: 'Fachliche Schnitte sichtbar machen',
      en: 'Make domain slices visible',
    },
    exampleExplanation: {
      de: 'Alles Relevante für „orders“ liegt nahe beieinander. Das reduziert Suchaufwand und erleichtert spätere Refactors innerhalb des Bereichs.',
      en: 'Everything relevant to “orders” lives close together. That reduces search cost and makes later refactors inside the slice easier.',
    },
    exampleCode: `features/
  orders/
    api.ts
    model.ts
    OrdersPage.tsx`,
    explanation: {
      de: 'Struktur ist ein Kommunikationsmittel für das Team. Wenn häufige Änderungen quer durch viele generische Ordner laufen, spricht das meist gegen die aktuelle Ordnung. Feature-Slices sind besonders stark, wenn sie echte fachliche Grenzen spiegeln und nicht nur einen neuen Dateinamen für dieselbe ungeklärte Kopplung liefern.',
      en: 'Structure is a communication tool for the team. When frequent changes cut across many generic folders, that usually argues against the current organization. Feature slices are especially strong when they reflect real domain boundaries instead of just renaming the same unresolved coupling.',
    },
    resources: ['reactThinking', 'tsPaths', 'storybookDocs'],
  }),
  q({
    id: 118,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann sollte man UI abstrahieren und wann ist lokale Duplikation zunächst besser?',
      en: 'When should you abstract UI and when is local duplication better at first?',
    },
    answer: {
      de: 'Abstraktion lohnt sich erst, wenn sich stabile Gemeinsamkeit in Verhalten, API und Änderungsrichtung zeigt. Frühe Verallgemeinerung produziert oft unlesbare Komponenten mit zu vielen Varianten. Kleine, bewusste Duplikation ist häufig der günstigere Preis, bis die gemeinsame Form wirklich klar ist.',
      en: 'Abstraction becomes worthwhile only once stable commonality appears in behavior, API shape, and change direction. Premature generalization often creates unreadable components with too many variants. Small, deliberate duplication is frequently the cheaper cost until the shared shape is truly clear.',
    },
    exampleTitle: {
      de: 'Zuerst Muster erkennen, dann abstrahieren',
      en: 'Recognize the pattern first, then abstract',
    },
    exampleExplanation: {
      de: 'Zwei ähnliche Karten dürfen zunächst verschieden bleiben, wenn ihre Entwicklung noch nicht stabil ist. Erst echte Konvergenz rechtfertigt ein gemeinsames API.',
      en: 'Two similar cards may stay separate at first if their evolution is not yet stable. Only real convergence justifies a shared API.',
    },
    exampleCode: `// keep two focused components
<OrderSummaryCard />
<InvoiceSummaryCard />`,
    explanation: {
      de: 'Die richtige Frage lautet weniger „Kann man das zusammenfassen?“ als „Werden diese Dinge gemeinsam weiterentwickelt?“. Gute Komponenten spiegeln wiederkehrende Verantwortung, nicht nur optische Ähnlichkeit. Dadurch bleiben APIs kleiner, Tests einfacher und spätere Änderungen billiger.',
      en: 'The better question is less “Can this be generalized?” and more “Will these things evolve together?” Good components reflect recurring responsibility, not just visual similarity. That keeps APIs smaller, tests simpler, and later changes cheaper.',
    },
    resources: ['reactThinking', 'storybookDocs', 'w3cAccessibility'],
  }),
  q({
    id: 119,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann sind Service-, Adapter- oder Ports-and-Adapters-Patterns im Frontend sinnvoll?',
      en: 'When are service, adapter, or ports-and-adapters patterns useful in frontend code?',
    },
    answer: {
      de: 'Solche Patterns sind sinnvoll, wenn man volatile Integrationen wie APIs, Browser-APIs oder Storage von stabilerer Fachlogik trennen will. Sie schaffen klare Testpunkte und verhindern, dass UI-Komponenten jedes Detail externer Systeme kennen müssen. Ohne echten Grenznutzen werden sie aber schnell zu überteilter Architektur.',
      en: 'These patterns are useful when you want to separate volatile integrations such as APIs, browser APIs, or storage from more stable domain logic. They create clear test points and keep UI components from knowing every detail of external systems. Without a real boundary benefit, however, they quickly turn into over-segmented architecture.',
    },
    exampleTitle: {
      de: 'Browser- und API-Details hinter einer Grenze halten',
      en: 'Keep browser and API details behind a boundary',
    },
    exampleExplanation: {
      de: 'Die UI spricht mit einer klaren Schnittstelle statt direkt mit `fetch` und Mapping-Logik. Das vereinfacht Tests und spätere Wechsel.',
      en: 'The UI talks to a clear interface instead of directly to `fetch` and mapping logic. That simplifies tests and later replacement.',
    },
    exampleCode: `export interface OrdersGateway {
  list(): Promise<Order[]>
}`,
    explanation: {
      de: 'Architekturpatterns zahlen sich aus, wenn sie Kopplung sichtbar reduzieren und Änderungswege vereinfachen. Besonders nützlich sind sie in Produkten mit mehreren Datenquellen, Offline-Anforderungen oder stark wechselnden APIs. Wenn hingegen nur ein dünner Pass-through entsteht, ist die zusätzliche Schicht wahrscheinlich nicht gerechtfertigt.',
      en: 'Architecture patterns pay off when they visibly reduce coupling and simplify change paths. They are especially useful in products with multiple data sources, offline needs, or frequently changing APIs. If you only end up with a thin pass-through, the extra layer is probably not justified.',
    },
    resources: ['reactThinking', 'tsEveryday', 'testingLibraryIntro'],
  }),
  q({
    id: 120,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie sollte ein API-Client im Frontend geschnitten sein?',
      en: 'How should an API client be structured in a frontend app?',
    },
    answer: {
      de: 'Ein guter API-Client trennt Transport, Fehlerbehandlung, Authentifizierung und domänenspezifisches Mapping sauber. Komponenten sollten keine rohen Response-Objekte oder Infrastrukturdetails kennen müssen. Entscheidend ist, dass der Client das Datenmodell des Produkts stützt und nicht nur HTTP-Calls verpackt.',
      en: 'A good API client cleanly separates transport, error handling, authentication, and domain-specific mapping. Components should not have to understand raw response objects or infrastructure details. The key is that the client supports the product’s data model instead of merely wrapping HTTP calls.',
    },
    exampleTitle: {
      de: 'Transport und Fachmodell nicht vermischen',
      en: 'Do not mix transport and domain model',
    },
    exampleExplanation: {
      de: 'Die Funktion liefert bereits fachlich nutzbare Daten zurück. Dadurch bleibt die Aufrufstelle schlank und testbar.',
      en: 'The function already returns data in a domain-usable shape. That keeps the call site small and testable.',
    },
    exampleCode: `export async function listOrders(): Promise<Order[]> {
  const response = await fetch('/api/orders')
  return mapOrders(await response.json())
}`,
    explanation: {
      de: 'Viele Frontend-Codebasen verlieren Klarheit, weil Infrastrukturfehler, Auth-Handling und Response-Mapping quer in Komponenten verstreut liegen. Ein sauberer API-Client zentralisiert diese Sorgen, ohne alles in eine riesige Singleton-Klasse zu zwingen. Gute Clients bleiben domänennah und austauschbar an klaren Grenzen.',
      en: 'Many frontend codebases lose clarity because infrastructure errors, auth handling, and response mapping leak across components. A clean API client centralizes those concerns without forcing everything into one giant singleton class. Good clients stay close to the domain and replaceable at clear seams.',
    },
    resources: ['mdnFetch', 'reactThinking', 'tsNarrowing'],
  }),
  q({
    id: 121,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann ist ein Backend-for-Frontend sinnvoller als direkter API-Zugriff aus dem Browser?',
      en: 'When is a backend-for-frontend more useful than direct API access from the browser?',
    },
    answer: {
      de: 'Ein BFF ist sinnvoll, wenn Aggregation, Berechtigung, Caching oder Geheimnisse nicht sinnvoll in den Client gehören. Er kann API-Formate stabilisieren und speziell auf eine Oberfläche zuschneiden. Direkter Browser-Zugriff bleibt dagegen stark, wenn die Domäne einfach, CORS sauber und zusätzliche Serverlogik unnötig wäre.',
      en: 'A BFF is useful when aggregation, authorization, caching, or secrets do not belong in the client. It can stabilize API shapes and tailor them to one frontend surface. Direct browser access remains strong when the domain is simple, CORS is clean, and extra server logic would add no real value.',
    },
    exampleTitle: {
      de: 'Mehrere Dienste hinter einer Frontend-freundlichen Kante',
      en: 'Multiple services behind a frontend-friendly edge',
    },
    exampleExplanation: {
      de: 'Der Client spricht mit einer eigenen Oberfläche, statt mehrere Backends selbst zu koordinieren. Das reduziert Komplexität im Browser.',
      en: 'The client talks to one dedicated surface instead of coordinating several backends on its own. That reduces complexity in the browser.',
    },
    exampleCode: `GET /bff/dashboard
-> { user, notifications, metrics }`,
    explanation: {
      de: 'Die Entscheidung hängt stark von Datenform, Sicherheitsmodell und Teamgrenzen ab. Ein BFF kann Frontend-Entwicklung beschleunigen, aber auch eine neue Betriebs- und Ownership-Schicht schaffen. Er lohnt sich dort, wo er echte Komplexität aus dem Browser nimmt und nicht bloß ein zusätzlicher Proxy ohne Mehrwert ist.',
      en: 'The decision depends heavily on data shape, security model, and team boundaries. A BFF can accelerate frontend development, but it also creates a new operational and ownership layer. It is worth it where it removes real browser complexity rather than acting as an extra proxy with no added value.',
    },
    resources: ['mdnFetch', 'twelveFactor', 'githubActionsDocs'],
  }),
  q({
    id: 122,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie plant man Caching-Grenzen zwischen Browser, Query-Layer und Backend?',
      en: 'How do you plan caching boundaries across browser, query layer, and backend?',
    },
    answer: {
      de: 'Caching ist nur dann hilfreich, wenn klar ist, wer der Besitzer der Wahrheit bleibt und wie Invalidation passiert. Browser-Cache, Query-Cache und Backend-Cache lösen unterschiedliche Probleme und sollten nicht blind übereinander gestapelt werden. Gute Strategien benennen Lebensdauer, Konsistenzbedarf und Fehlerfall pro Ebene.',
      en: 'Caching helps only when it is clear who owns the source of truth and how invalidation happens. Browser cache, query cache, and backend cache solve different problems and should not be stacked blindly. Good strategies define lifetime, consistency needs, and failure modes for each layer.',
    },
    exampleTitle: {
      de: 'Jede Ebene mit eigener Aufgabe',
      en: 'Give each layer its own job',
    },
    exampleExplanation: {
      de: 'Die Query-Schicht hält UI-nahe Aktualität, während der Browser oder CDN eher Übertragungskosten drückt. Das verhindert doppelte Verantwortung.',
      en: 'The query layer owns UI-near freshness while the browser or CDN mostly reduces transfer cost. That prevents duplicated responsibility.',
    },
    exampleCode: `queryClient.setQueryDefaults(['orders'], {
  staleTime: 30_000,
})`,
    explanation: {
      de: 'Cache-Architektur scheitert oft nicht an Technik, sondern an unklaren Erwartungen. Wenn Teams nicht wissen, ob Daten frisch, eventual consistent oder bewusst veraltet sein dürfen, wird jede Ebene inkonsistent konfiguriert. Darum gehören Cache-Regeln in Architekturgespräche und nicht nur in Hook-Implementierungen.',
      en: 'Cache architecture often fails not because of technology, but because expectations stay unclear. If teams do not know whether data must be fresh, eventually consistent, or intentionally stale, every layer gets configured inconsistently. That is why caching rules belong in architecture discussions, not only inside hooks.',
    },
    resources: ['reactUseOptimistic', 'reactThinking', 'twelveFactor'],
  }),
  q({
    id: 123,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie setzt man Fehlergrenzen, Retries und Fallbacks architektonisch sinnvoll?',
      en: 'How do you place error boundaries, retries, and fallbacks sensibly at an architectural level?',
    },
    answer: {
      de: 'Fehlerbehandlung sollte entlang fachlicher Auswirkungen geschnitten werden, nicht nur entlang technischer Schichten. Retries, leere Zustände und harte Fehler brauchen je nach Oberfläche andere Reaktionen. Gute Systeme unterscheiden bewusst zwischen „erneut versuchen“, „teilweise weiterarbeiten“ und „sauber abbrechen“.',
      en: 'Error handling should be cut along business impact rather than purely technical layers. Retries, empty states, and hard failures need different reactions depending on the surface. Good systems intentionally distinguish between “try again,” “continue partially,” and “stop cleanly.”',
    },
    exampleTitle: {
      de: 'Fehler dort abfangen, wo Nutzerwirkung entsteht',
      en: 'Catch failure where user impact happens',
    },
    exampleExplanation: {
      de: 'Nicht jeder Fehler braucht dieselbe UI-Antwort. Eine Widget-Fläche kann degradieren, während ein Checkout hart stoppen muss.',
      en: 'Not every failure deserves the same UI response. A widget may degrade gracefully while a checkout must stop hard.',
    },
    exampleCode: `if (error.canRetry) {
  return <RetryPanel onRetry={reload} />
}

return <FatalErrorScreen />`,
    explanation: {
      de: 'Architektur zeigt sich hier in Grenzen und Standards. Wenn jedes Team eigene Retry- und Fehlerkonzepte baut, leidet das Produkt an inkonsistentem Verhalten und schlechtem Monitoring. Klare Muster für recoverable, partial und fatal failures machen Oberflächen robuster und einfacher zu betreiben.',
      en: 'Architecture shows up here in boundaries and standards. When every team invents its own retry and failure patterns, the product suffers from inconsistent behavior and poor observability. Clear patterns for recoverable, partial, and fatal failures make surfaces more robust and easier to operate.',
    },
    resources: ['reactErrorBoundary', 'mdnFetch', 'openTelemetryJs'],
  }),
  q({
    id: 124,
    category: 'toolingArchitecture',
    question: {
      de: 'Was gehört zu sinnvoller Observability im Frontend?',
      en: 'What belongs to meaningful observability in frontend systems?',
    },
    answer: {
      de: 'Frontend-Observability umfasst Fehler, Performance, zentrale Nutzerflüsse und technische Kontextdaten wie Release, Browser und betroffene Route. Rohes Logging allein reicht nicht; entscheidend ist, dass Signale priorisierbar und mit realem Produktverhalten verknüpft sind. Gute Observability hilft beim Entscheiden, nicht nur beim Sammeln.',
      en: 'Frontend observability includes errors, performance, key user journeys, and technical context such as release, browser, and affected route. Raw logging alone is not enough; the key is that signals can be prioritized and connected to actual product behavior. Good observability helps you decide, not merely collect.',
    },
    exampleTitle: {
      de: 'Fehler mit Betriebs-Kontext melden',
      en: 'Report failures with operational context',
    },
    exampleExplanation: {
      de: 'Ein Fehler ohne Route, Release oder Nutzerfluss ist schwer einzuordnen. Kontext macht aus einem Eintrag eine handhabbare Diagnose.',
      en: 'An error without route, release, or user-flow context is hard to prioritize. Context turns a log line into a manageable diagnosis.',
    },
    exampleCode: `captureError(error, {
  route: '/checkout',
  release: appVersion,
})`,
    explanation: {
      de: 'Viele Frontend-Teams haben Daten, aber keine operativ brauchbaren Signale. Hilfreich sind Standards für Event-Namen, Korrelation mit Deployments und wenige wirklich relevante Qualitätsmetriken. So wird Observability zur Rückkopplung für Architektur- und Produktentscheidungen statt zur bloßen Datensenke.',
      en: 'Many frontend teams have data but no operationally useful signals. Helpful practices include standards for event names, correlation with deployments, and a small set of truly relevant quality metrics. That turns observability into feedback for architecture and product decisions instead of a mere data sink.',
    },
    resources: ['openTelemetryJs', 'mdnPerformance', 'githubActionsDocs'],
  }),
  q({
    id: 125,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann sind Performance-Budgets in CI sinnvoll und wie setzt man sie pragmatisch?',
      en: 'When are performance budgets in CI useful and how do you apply them pragmatically?',
    },
    answer: {
      de: 'Performance-Budgets sind sinnvoll, wenn ein Team verhindern will, dass Bundle-Größe, Ladezeit oder Interaktionskosten schleichend entgleisen. Sie sollten an wenigen relevanten Kennzahlen hängen und bei Überschreitungen handlungsfähig machen, nicht nur rote Builds erzeugen. Gute Budgets schützen Produktqualität ohne falsche Präzision.',
      en: 'Performance budgets are useful when a team wants to prevent bundle size, loading time, or interaction cost from drifting upward unnoticed. They should target a few relevant metrics and make overages actionable instead of merely producing red pipelines. Good budgets protect product quality without pretending to be perfectly precise.',
    },
    exampleTitle: {
      de: 'Guardrail statt theoretische Perfektion',
      en: 'A guardrail instead of theoretical perfection',
    },
    exampleExplanation: {
      de: 'Das Budget markiert eine Grenze, ab der eine Änderung bewusst begründet werden muss. Genau das verhindert stilles Aufblähen.',
      en: 'The budget marks a line beyond which a change has to be justified consciously. That is what prevents silent bloat.',
    },
    exampleCode: `const maxInitialJsKb = 200`,
    explanation: {
      de: 'Budgets funktionieren am besten als Gesprächs- und Review-Instrument. Wenn sie zu viele false positives produzieren oder von der Nutzerwahrnehmung entkoppelt sind, werden sie schnell ignoriert. Erfolgreich sind sie dort, wo Metrik, Produktziel und Gegenmaßnahmen klar zusammenpassen.',
      en: 'Budgets work best as a review and conversation tool. If they produce too many false positives or drift away from user perception, they get ignored quickly. They succeed where metric, product goal, and mitigation path clearly line up.',
    },
    resources: ['mdnPerformance', 'viteGuide', 'githubActionsDocs'],
  }),
  q({
    id: 126,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie gestaltet man Releases und Deployments für Frontends möglichst sicher?',
      en: 'How do you make frontend releases and deployments as safe as possible?',
    },
    answer: {
      de: 'Sichere Frontend-Releases kombinieren automatisierte Checks, reproduzierbare Builds, schnelle Rollback-Pfade und Sichtbarkeit über das ausgerollte Artefakt. Je häufiger ein Team liefert, desto wichtiger werden kleine Änderungen und gute Telemetrie direkt nach dem Deploy. Sicherheit entsteht hier mehr aus Routine und Guardrails als aus seltenen Großreleases.',
      en: 'Safe frontend releases combine automated checks, reproducible builds, fast rollback paths, and visibility into the deployed artifact. The more frequently a team ships, the more important small changes and strong telemetry right after deployment become. Safety here comes more from routine and guardrails than from rare big-bang releases.',
    },
    exampleTitle: {
      de: 'Kleine Deployments, schneller Rückweg',
      en: 'Small deployments, fast way back',
    },
    exampleExplanation: {
      de: 'Eine saubere Pipeline stellt nicht nur bereit, sondern erlaubt auch schnelles Zurückrollen. Das senkt die Kosten von Fehlern erheblich.',
      en: 'A clean pipeline does not just deploy; it also enables a fast rollback. That reduces the cost of mistakes significantly.',
    },
    exampleCode: `deploy -> smoke test -> monitor -> rollback if needed`,
    explanation: {
      de: 'Frontend-Deployments wirken oft harmlos, weil kein Datenbankschema migriert wird. Trotzdem können Caching, Asset-Versionen und clientseitige Fehlerbilder reale Betriebsprobleme erzeugen. Gute Release-Architektur betrachtet daher auch CDN, Cache-Invalidierung und die Sicht auf die tatsächlich laufende Version.',
      en: 'Frontend deployments often look harmless because no database schema is migrating. Yet caching, asset versioning, and client-side failures can still create real operational problems. Good release architecture therefore considers CDN behavior, cache invalidation, and visibility into the actually running version.',
    },
    resources: ['githubActionsDocs', 'githubActionsNode', 'twelveFactor'],
  }),
  q({
    id: 127,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann sind Docker oder Container-Builds für Frontend-Projekte wirklich hilfreich?',
      en: 'When are Docker or container builds genuinely useful for frontend projects?',
    },
    answer: {
      de: 'Container helfen, wenn Build-Umgebungen reproduzierbar sein müssen, mehrere Dienste lokal zusammenspielen oder CI und Produktion dieselben Artefaktgrenzen brauchen. Für eine kleine SPA ohne besondere Betriebsanforderungen kann zusätzlicher Container-Aufwand aber auch nur Reibung erzeugen. Der Nutzen hängt vom Betriebsmodell ab, nicht vom Trend.',
      en: 'Containers help when build environments must be reproducible, several services need to work together locally, or CI and production should share the same artifact boundaries. For a small SPA without special operational needs, however, extra container overhead can create only friction. The value depends on the operating model, not the trend.',
    },
    exampleTitle: {
      de: 'Build-Umgebung standardisieren',
      en: 'Standardize the build environment',
    },
    exampleExplanation: {
      de: 'Der Build läuft überall auf derselben Grundlage. Das reduziert „funktioniert nur auf meinem Rechner“-Abweichungen.',
      en: 'The build runs on the same foundation everywhere. That reduces “works only on my machine” drift.',
    },
    exampleCode: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./`,
    explanation: {
      de: 'Container sind primär ein Liefer- und Betriebswerkzeug. Sie zahlen sich besonders dort aus, wo Team-Setups stark variieren oder Produktionsartefakte eng definiert sein müssen. Wenn sie dagegen nur eine weitere Schicht ohne klaren Nutzen einziehen, verlängern sie Builds und erschweren lokale Iteration unnötig.',
      en: 'Containers are primarily a delivery and operations tool. They pay off especially where team setups vary widely or production artifacts must be tightly defined. If they merely add another layer without clear value, they lengthen builds and make local iteration unnecessarily harder.',
    },
    resources: ['dockerOverview', 'dockerBuild', 'githubActionsDocs'],
  }),
  q({
    id: 128,
    category: 'toolingArchitecture',
    question: {
      de: 'Welche Branch- und Integrationsstrategie passt gut zu Frontend-Teams?',
      en: 'Which branch and integration strategy tends to work well for frontend teams?',
    },
    answer: {
      de: 'Für viele Teams funktioniert ein kurzer Lebenszyklus mit kleinen Branches, häufiger Integration und schneller Review besser als lang laufende Feature-Äste. Je länger Änderungen parallel leben, desto teurer werden Merge-Konflikte, Rebase-Arbeit und unsichere Releases. Entscheidend ist, Integrationskosten klein zu halten, nicht Git philosophisch zu überhöhen.',
      en: 'For many teams, a short lifecycle with small branches, frequent integration, and fast review works better than long-running feature branches. The longer changes live in parallel, the more expensive merge conflicts, rebasing work, and uncertain releases become. The key is to keep integration cost small, not to turn Git into philosophy.',
    },
    exampleTitle: {
      de: 'Kleine Änderungen fließen schneller',
      en: 'Small changes flow faster',
    },
    exampleExplanation: {
      de: 'Ein enger Merge-Rhythmus reduziert Konflikte und beschleunigt Feedback. Das ist meist wertvoller als perfekte lokale Isolation.',
      en: 'A tight merge rhythm reduces conflicts and accelerates feedback. That is usually more valuable than perfect local isolation.',
    },
    exampleCode: `main <- small feature branch <- review <- merge`,
    explanation: {
      de: 'Die beste Branch-Strategie ist die, die mit Review-Kapazität, Testautomatisierung und Release-Modell zusammenpasst. Ohne verlässliche CI hilft auch trunk-basiertes Arbeiten wenig; mit guter Automatisierung werden kleine Branches dagegen sehr effizient. Teams sollten daher den gesamten Delivery-Fluss optimieren und nicht nur die Branch-Namen.',
      en: 'The best branch strategy is the one that fits review capacity, test automation, and the release model. Without reliable CI, even trunk-based work helps little; with strong automation, small branches become very efficient. Teams should therefore optimize the whole delivery flow rather than only branch naming.',
    },
    resources: ['githubActionsDocs', 'githubActionsNode', 'npmCi'],
  }),
  q({
    id: 129,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie bewertet man Third-Party-Dependencies jenseits von „spart Zeit“?',
      en: 'How do you evaluate third-party dependencies beyond “it saves time”?',
    },
    answer: {
      de: 'Eine Dependency sollte nach Nutzen, Wartungszustand, API-Stabilität, Bundle-Kosten, Sicherheitsrisiko und Exit-Kosten bewertet werden. Jede Bibliothek ist eine langfristige Architekturentscheidung mit Update- und Debugging-Folgen. Gute Teams vergleichen deshalb nicht nur Features, sondern auch Ownership-Risiken.',
      en: 'A dependency should be evaluated by benefit, maintenance health, API stability, bundle cost, security risk, and exit cost. Every library is a long-term architecture decision with update and debugging consequences. Good teams therefore compare not just features, but also ownership risks.',
    },
    exampleTitle: {
      de: 'Nicht nur die Einbaukosten ansehen',
      en: 'Do not look only at adoption cost',
    },
    exampleExplanation: {
      de: 'Die spannende Frage ist nicht nur, was die Bibliothek heute kann, sondern was sie morgen an Wechselkosten erzeugt.',
      en: 'The interesting question is not only what the library can do today, but what switching cost it creates tomorrow.',
    },
    exampleCode: `score = value - complexity - bundleCost - migrationRisk`,
    explanation: {
      de: 'Viele Teams optimieren auf die erste Woche und zahlen dann Jahre lang für eine unpassende Abhängigkeit. Hilfreich sind kleine Bewertungsraster, Proofs of Concept und die Frage, wie austauschbar der eingeführte Code später noch bleibt. Besonders kritisch sind Libraries, die tief in Rendering, Routing oder Datenfluss eingreifen.',
      en: 'Many teams optimize for the first week and then pay for an ill-fitting dependency for years. Small scorecards, proofs of concept, and asking how replaceable the introduced code remains later are useful practices. Libraries that cut deeply into rendering, routing, or data flow deserve particular scrutiny.',
    },
    resources: ['viteGuide', 'semverSpec', 'githubActionsDocs'],
  }),
  q({
    id: 130,
    category: 'toolingArchitecture',
    question: {
      de: 'Wann lohnt sich der Aufbau von Design Tokens und Theme-Architektur?',
      en: 'When is it worth building design tokens and theme architecture?',
    },
    answer: {
      de: 'Design Tokens lohnen sich, wenn mehrere Oberflächen, Marken oder Komponenten dieselben Gestaltungsentscheidungen konsistent teilen müssen. Ihr Wert liegt in Übersetzbarkeit zwischen Design und Code, nicht nur in einem neuen Variablennamen. Zu früh eingeführt werden sie allerdings schnell zu unnötiger Abstraktion ohne echte Varianz.',
      en: 'Design tokens pay off when multiple surfaces, brands, or components need to share the same design decisions consistently. Their value lies in translating design intent into code, not merely in inventing new variable names. Introduced too early, however, they quickly become abstraction without meaningful variation.',
    },
    exampleTitle: {
      de: 'Entscheidungen zentral benennen',
      en: 'Name decisions centrally',
    },
    exampleExplanation: {
      de: 'Ein semantischer Token beschreibt die Rolle statt nur die konkrete Farbe. Das macht spätere Themes und Redesigns deutlich einfacher.',
      en: 'A semantic token describes the role rather than just the literal color. That makes later theming and redesign work much easier.',
    },
    exampleCode: `:root {
  --color-surface-muted: #f3f1ed;
}`,
    explanation: {
      de: 'Die Schwierigkeit liegt weniger im Anlegen der Tokens als in ihrer Governance. Ohne klare Semantik, Review-Regeln und Verbindung zur Komponentenschicht wachsen Token-Kataloge schnell unkontrolliert. Gute Token-Architektur bleibt deshalb klein, semantisch und wirklich produktrelevant.',
      en: 'The hard part lies less in creating tokens than in governing them. Without clear semantics, review rules, and a link to the component layer, token catalogs quickly grow out of control. Good token architecture therefore stays small, semantic, and genuinely product-relevant.',
    },
    resources: ['storybookDocs', 'storybookWhy', 'w3cAccessibility'],
  }),
  q({
    id: 131,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie strukturiert man Authentifizierung und Berechtigungen im Frontend sinnvoll?',
      en: 'How do you structure authentication and permissions sensibly in frontend apps?',
    },
    answer: {
      de: 'Authentifizierung, Session-Zustand und Berechtigungsprüfung sollten klar getrennte Sorgen bleiben. Das Frontend kann Sichtbarkeit und Interaktion steuern, darf aber keine Server-Autorisierung ersetzen. Gute Architektur behandelt Berechtigungen daher als Produktzustand mit klaren Quellen und Fallbacks, nicht als verstreute `if`-Ketten.',
      en: 'Authentication, session state, and authorization checks should remain clearly separated concerns. The frontend can control visibility and interaction, but it must not replace server-side authorization. Good architecture therefore treats permissions as product state with clear sources and fallbacks instead of scattered `if` chains.',
    },
    exampleTitle: {
      de: 'Policy zentral lesen, UI lokal anwenden',
      en: 'Read policy centrally, apply it locally in the UI',
    },
    exampleExplanation: {
      de: 'Die Oberfläche konsumiert eine berechnete Berechtigung statt überall rohe Rollenlogik nachzubauen. Das hält Regeln konsistenter.',
      en: 'The UI consumes a derived permission instead of rebuilding raw role logic everywhere. That keeps rules more consistent.',
    },
    exampleCode: `const canEditInvoice = permissions.has('invoice:edit')`,
    explanation: {
      de: 'Berechtigungslogik wird schnell unübersichtlich, wenn Rollen, Flags und Produktzustände gemischt werden. Hilfreich sind zentrale Policy-Modelle, serverseitige Autorisierung und klar testbare UI-Ableitungen pro Anwendungsfall. So bleibt Sicherheit robust und die Oberfläche trotzdem verständlich.',
      en: 'Permission logic becomes messy quickly once roles, flags, and product state get mixed together. Helpful practices include central policy models, server-side authorization, and clearly testable UI derivations for each use case. That keeps security robust while the surface stays understandable.',
    },
    resources: ['twelveFactor', 'testingLibraryIntro', 'mdnFetch'],
  }),
  q({
    id: 132,
    category: 'toolingArchitecture',
    question: {
      de: 'Wie hält man Team-Konventionen technisch durchsetzbar statt nur dokumentiert?',
      en: 'How do you make team conventions enforceable technically instead of merely documented?',
    },
    answer: {
      de: 'Konventionen werden dann wirksam, wenn sie in Scripts, Lint-Regeln, Templates, CI und Review-Hilfen eingebaut sind. Reine Dokumentation reicht selten, sobald Zeitdruck und Teamgröße steigen. Gute Teams machen den gewünschten Weg zum einfachsten Weg.',
      en: 'Conventions become effective when they are built into scripts, lint rules, templates, CI, and review helpers. Documentation alone rarely holds once time pressure and team size increase. Good teams make the desired path the easiest path.',
    },
    exampleTitle: {
      de: 'Standards in Werkzeuge gießen',
      en: 'Turn standards into tooling',
    },
    exampleExplanation: {
      de: 'Die Regel wird automatisiert geprüft statt nur in Reviews erwähnt. Das spart Diskussion und erhöht Verlässlichkeit.',
      en: 'The rule gets checked automatically instead of being mentioned only in reviews. That saves debate and increases reliability.',
    },
    exampleCode: `{
  "scripts": {
    "check": "eslint . && tsc -b && vitest run"
  }
}`,
    explanation: {
      de: 'Technisch durchgesetzte Standards entlasten Menschen von Routinekontrolle. Gleichzeitig sollten Regeln erklärbar bleiben und regelmäßig auf ihren Nutzen geprüft werden, sonst entsteht blinde Bürokratie. Gute Governance verbindet deshalb Automatisierung mit bewusster, gelegentlicher Anpassung.',
      en: 'Technically enforced standards relieve people from routine policing. At the same time, rules should remain explainable and be reviewed for usefulness regularly, otherwise blind bureaucracy emerges. Good governance therefore combines automation with occasional deliberate adjustment.',
    },
    resources: ['eslintGettingStarted', 'prettierDocs', 'githubActionsDocs'],
  }),
  q({
    id: 133,
    category: 'toolingArchitecture',
    question: {
      de: 'Woran erkennt man, dass eine Frontend-Architektur über-engineered ist?',
      en: 'How do you recognize that a frontend architecture is over-engineered?',
    },
    answer: {
      de: 'Over-Engineering zeigt sich oft daran, dass mehr Schichten, Abstraktionen und Regeln existieren als echte Änderungsfälle sie rechtfertigen. Wenn einfache Features nur noch über mehrere Indirektionen umgesetzt werden können, zahlt das Team Wartungskosten ohne Gegenwert. Gute Architektur fühlt sich in häufigen Änderungen leicht an, nicht beeindruckend kompliziert.',
      en: 'Over-engineering often shows up when more layers, abstractions, and rules exist than real change cases justify. If simple features can be implemented only through several indirections, the team is paying maintenance cost without real return. Good architecture feels light during frequent change, not impressively complicated.',
    },
    exampleTitle: {
      de: 'Komplexität am Änderungsfall messen',
      en: 'Measure complexity against the change case',
    },
    exampleExplanation: {
      de: 'Wenn schon kleine Änderungen mehrere technische Stationen brauchen, ist das ein Warnsignal. Komplexität muss sich im Alltag auszahlen.',
      en: 'If even small changes need several technical hops, that is a warning sign. Complexity has to earn its keep in day-to-day work.',
    },
    exampleCode: `ui -> presenter -> service -> adapter -> mapper -> gateway`,
    explanation: {
      de: 'Die Gegenprobe ist einfach: Werden typische Produktänderungen schneller, sicherer oder verständlicher? Wenn nicht, ist die Struktur wahrscheinlich zu schwer für das Problem. Gute Teams vereinfachen Architektur aktiv zurück, sobald sich Annahmen über Wachstum oder Wiederverwendung nicht bestätigt haben.',
      en: 'The counter-test is simple: do typical product changes become faster, safer, or easier to understand? If not, the structure is probably too heavy for the problem. Good teams actively simplify architecture again once assumptions about growth or reuse do not actually hold.',
    },
    resources: ['reactThinking', 'twelveFactor', 'githubActionsDocs'],
  }),
]

export const interviewQuestions = [
  ...javascriptQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...toolingArchitectureQuestions,
]
