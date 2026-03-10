import type { LocalizedText } from '../types'

export const interviewQuestionExplanationDetails: Record<number, LocalizedText> = {
  1: {
    de: 'Relevant wird das vor allem in Schleifen, Closures und größeren Refactors. Wenn du versehentlich `var` nutzt, teilst du Scope über mehr Code als beabsichtigt und erzeugst leichter schwer sichtbare Seiteneffekte.',
    en: 'This matters most in loops, closures, and larger refactors. If you use `var` by accident, you share scope across more code than intended and create subtle side effects more easily.',
  },
  2: {
    de: 'In der Praxis begegnen dir Closures in Factory Functions, Event-Handlern und React Hooks ständig. Gleichzeitig sind sie eine häufige Ursache für stale Werte oder unnötig gehaltene Referenzen, wenn ein Scope zu viel festhält.',
    en: 'In practice, you hit closures constantly in factory functions, event handlers, and React hooks. At the same time, they are a common source of stale values or unnecessarily retained references when a scope captures too much.',
  },
  3: {
    de: 'Wichtig ist die Unterscheidung zwischen Deklaration und Initialisierung. Wer Hoisting nur als Merksatz kennt, übersieht schnell TDZ-Fehler, unerwartete `undefined`-Werte oder Unterschiede zwischen Funktionen, Klassen und Imports.',
    en: 'The key distinction is between declaration and initialization. If you treat hoisting as a slogan only, you will miss TDZ errors, unexpected `undefined` values, and the differences between functions, classes, and imports.',
  },
  4: {
    de: 'Entscheidend ist, dass Rendering nie mitten in einer laufenden JavaScript-Task passiert. Wer den Event Loop versteht, kann erklären, warum lange Tasks das UI blockieren und weshalb Chunking, Idle Work oder Worker überhaupt nötig sind.',
    en: 'The important point is that rendering never happens in the middle of a running JavaScript task. If you understand the event loop, you can explain why long tasks block the UI and why chunking, idle work, or workers are needed at all.',
  },
  5: {
    de: 'Microtasks laufen vor dem nächsten Rendering und können die UI deshalb auch starven, wenn zu viele davon erzeugt werden. Genau dieser Unterschied erklärt viele Überraschungen bei Promise-Ketten, `queueMicrotask` und Timer-basiertem Code.',
    en: 'Microtasks run before the next render and can therefore starve the UI if you create too many of them. That difference explains many surprises in promise chains, `queueMicrotask`, and timer-based code.',
  },
  6: {
    de: 'In der Praxis hilft dieses Modell vor allem beim Debugging von Property Lookup und Shadowing. Du verstehst damit, warum gemeinsames Verhalten auf dem Prototype liegt, Instanzdaten aber bewusst auf dem konkreten Objekt bleiben sollten.',
    en: 'In practice, this model helps most when debugging property lookup and shadowing. It explains why shared behavior belongs on the prototype while instance data should stay on the concrete object.',
  },
  7: {
    de: 'Gerade in Browser-Code entscheidet das darüber, ob `this` auf das DOM-Element, die Klasseninstanz oder den äußeren Scope zeigt. Deshalb sind weitergereichte Methoden, Listener-Callbacks und verschachtelte Funktionen klassische Fehlerquellen.',
    en: 'Especially in browser code, this decides whether `this` points to the DOM element, the class instance, or the outer scope. That is why passed-around methods, listener callbacks, and nested functions are classic sources of bugs.',
  },
  8: {
    de: 'Besonders wichtig ist dabei die Funktionsidentität: jedes `bind` erzeugt eine neue Funktion. Das wirkt sich auf Memoization, Listener-Registrierung und `removeEventListener` aus und ist deshalb nicht nur eine Syntaxfrage.',
    en: 'The important part is function identity: every `bind` call creates a new function. That affects memoization, listener registration, and `removeEventListener`, so this is not just a syntax topic.',
  },
  9: {
    de: 'Für Senior-Level zählt hier, dass Klassen zusätzlich eigene Semantik wie `super`, private Felder und striktere Konstruktorregeln mitbringen, aber das Lookup-Modell trotzdem prototypisch bleibt. Genau daraus ergeben sich viele Missverständnisse in Design-Diskussionen.',
    en: 'At senior level, the key point is that classes add semantics such as `super`, private fields, and stricter constructor rules, while the lookup model still stays prototype-based. Many design misunderstandings come from missing that distinction.',
  },
  10: {
    de: 'Promises lösen nicht nur Callback-Hölle optisch, sondern standardisieren Zustände, Fehlerpropagation und Komposition. Dadurch werden parallele Abläufe, Retry-Strategien und saubere Fehlerketten erst verlässlich modellierbar.',
    en: 'Promises do not just make callback code look nicer; they standardize states, error propagation, and composition. That is what makes parallel flows, retry strategies, and clean error chains reliably modelable.',
  },
  11: {
    de: 'Typisch problematisch sind unnötig serielle `await`s, vergessene `await`s und `try/catch` an der falschen Stelle. Gute Antworten benennen deshalb nicht nur Lesbarkeit, sondern auch Parallelisierung, Abbruch und Fehlergrenzen.',
    en: 'Typical problems are unnecessarily serial `await`s, forgotten `await`s, and `try/catch` in the wrong place. Good answers therefore cover not only readability, but also parallelization, cancellation, and error boundaries.',
  },
  12: {
    de: '`fetch` rejected nicht bei jedem HTTP-Fehler, sondern nur bei Netzwerk- oder Abbruchfehlern. Wer das sauber trennt, behandelt `response.ok`, Parsing-Fehler und Cancellation als unterschiedliche Fälle statt alles in einen Catch zu werfen.',
    en: '`fetch` does not reject on every HTTP error, only on network or cancellation failures. If you separate that cleanly, you handle `response.ok`, parsing failures, and cancellation as different cases instead of dumping everything into one catch block.',
  },
  13: {
    de: 'Das wird praktisch relevant bei Tooling, Tree Shaking und Mischprojekten aus Node, Bundler und Tests. Wer Interop-Probleme versteht, kann Import-Grenzen sauber ziehen und schwer erklärbare Runtime-Unterschiede vermeiden.',
    en: 'This becomes practical in tooling, tree shaking, and mixed projects across Node, bundlers, and tests. If you understand interop issues, you can draw clear module boundaries and avoid hard-to-explain runtime differences.',
  },
  14: {
    de: 'Immutability ist vor allem dann wichtig, wenn Systeme auf Referenzgleichheit optimieren. Das betrifft React Rendering, Memoization, Undo-Logik und Debugging deutlich stärker als die reine Stilfrage mutieren oder nicht.',
    en: 'Immutability matters most when systems optimize by reference equality. That affects React rendering, memoization, undo logic, and debugging far more than the stylistic question of mutating or not.',
  },
  15: {
    de: 'Deep Copy ist außerdem nicht trivial korrekt, sobald Datenstrukturen wie `Date`, `Map`, Klasseninstanzen oder Funktionen vorkommen. Deshalb ist gezielte Datenmodellierung oft robuster als reflexartiges Komplettkopieren.',
    en: 'Deep copying also stops being trivial as soon as structures such as `Date`, `Map`, class instances, or functions appear. That is why deliberate data modeling is often more robust than reflexively cloning everything.',
  },
  16: {
    de: 'Im Alltag geht es weniger um Regelreligion als um Klarheit im Code. Wenn eine Ausnahme wie `== null` bewusst Teil des Vertrags ist, kann sie sinnvoll sein, aber sie sollte dann explizit und teamweit verständlich eingesetzt werden.',
    en: 'In day-to-day code, this is less about dogma and more about clarity. If an exception such as `== null` is an intentional part of the contract, it can be useful, but it should be explicit and understandable across the team.',
  },
  17: {
    de: 'Der eigentliche Wert der Unterscheidung zeigt sich in APIs, Formularen und Persistenz. Dort ist fachlich oft relevant, ob etwas fehlt, noch unbekannt ist oder bewusst leer gesetzt wurde, weil sich daraus unterschiedliche UI- und Validierungslogik ergibt.',
    en: 'The real value of this distinction shows up in APIs, forms, and persistence. In those places it often matters whether something is missing, still unknown, or intentionally empty, because each case leads to different UI and validation logic.',
  },
  18: {
    de: 'Die Operatoren sind besonders gut für tolerante Lesezugriffe, aber schlecht als Pflaster für Pflichtdaten. Wenn ein Wert fachlich vorhanden sein muss, ist ein expliziter Fehler oft hilfreicher als stilles Weiterlaufen mit Fallback.',
    en: 'These operators are great for tolerant reads, but poor as a bandage for required data. If a value must exist by domain rules, an explicit failure is often more helpful than silently continuing with a fallback.',
  },
  19: {
    de: 'In realem Frontend-Code ist das vor allem für Props, API-Responses und State-Updates relevant. Der Nutzen kommt nicht aus der Syntax selbst, sondern aus lesbareren Datenflüssen und weniger Boilerplate bei unveränderlichen Updates.',
    en: 'In real frontend code, this matters mostly for props, API responses, and state updates. The benefit does not come from the syntax itself, but from clearer data flow and less boilerplate in immutable updates.',
  },
  20: {
    de: 'Die Senior-Antwort ist hier meist eine Frage von Absicht und Lesbarkeit. `reduce` ist mächtig, aber wenn aus einer einfache Transformation ein schwer lesbares Mini-Programm wird, ist eine explizitere Schleife oft die bessere Wahl.',
    en: 'The senior answer here is mostly about intent and readability. `reduce` is powerful, but if a simple transformation turns into an unreadable mini program, a more explicit loop is often the better choice.',
  },
  21: {
    de: 'Typische Quellen sind Listener, Intervalle, Subscriptions und Closures, die DOM oder große Daten ungewollt festhalten. Relevant wird das oft schleichend in Single-Page-Apps, wenn Komponenten häufig mounten und unmounten.',
    en: 'Typical sources are listeners, intervals, subscriptions, and closures that accidentally retain DOM nodes or large data. This often becomes relevant gradually in single-page apps when components mount and unmount frequently.',
  },
  22: {
    de: 'Der eigentliche Unterschied ist UX-getrieben: Debounce ist gut für abgeschlossene Eingaben wie Suche, Throttle für kontinuierliche Ereignisse wie Scrollen. Falsch gewählt fühlt sich die Oberfläche entweder träge oder unnötig hektisch an.',
    en: 'The real difference is UX-driven: debounce fits completed input such as search, while throttle fits continuous events such as scrolling. Pick the wrong one and the UI feels either sluggish or unnecessarily noisy.',
  },
  23: {
    de: 'Generatoren lohnen sich vor allem, wenn Daten schrittweise, lazy oder potenziell unendlich verarbeitet werden sollen. Ihr Wert liegt weniger in Alltagscode als in kontrollierter Iteration, Protokollen und Streaming-nahen Aufgaben.',
    en: 'Generators are most useful when data should be processed incrementally, lazily, or potentially infinitely. Their value is less in everyday code and more in controlled iteration, protocols, and stream-like tasks.',
  },
  24: {
    de: 'Praktisch relevant werden `Symbol`s bei kollisionsfreien Keys und bei den eingebauten Sprachprotokollen wie Iteration. Damit sind sie eher ein Werkzeug für Infrastruktur, Bibliotheken und Meta-Programmierung als für normale Geschäftslogik.',
    en: 'In practice, `Symbol`s matter for collision-free keys and for built-in language protocols such as iteration. That makes them more of an infrastructure, library, and meta-programming tool than a business-logic default.',
  },
  25: {
    de: 'Der Mehrwert liegt darin, dass die Zuordnung die Lebensdauer des Schlüssels nicht verlängert. Das ist ideal für Cache-Metadaten zu DOM-Nodes oder Objekten, aber ungeeignet, wenn du Inhalte später wieder vollständig auflisten musst.',
    en: 'The main benefit is that the association does not extend the lifetime of the key. That is ideal for cache metadata tied to DOM nodes or objects, but a poor fit when you later need to enumerate everything again.',
  },
  26: {
    de: 'Gerade in React und gemeinsam genutzten Datenstrukturen wird das schnell kritisch. Eine falsche Annahme darüber, ob eine Methode mutiert, reicht oft schon für kaputte Re-Renders, schwer reproduzierbare Bugs oder schleichend veränderten State.',
    en: 'This gets critical quickly in React and shared data structures. A wrong assumption about whether a method mutates is often enough to cause broken re-renders, hard-to-reproduce bugs, or silently changed state.',
  },
  27: {
    de: '`Object.freeze` ist außerdem nur flach und kein Ersatz für gutes API-Design. Wenn tiefe Unveränderlichkeit wirklich wichtig ist, brauchst du zusätzliche Strategien wie Rekursion, strukturelles Teilen oder konsequente Kapselung.',
    en: '`Object.freeze` is also shallow and not a replacement for good API design. If deep immutability truly matters, you need additional strategies such as recursion, structural sharing, or strong encapsulation.',
  },
  28: {
    de: 'Die richtige Wahl hängt von Lebensdauer, Sicherheitsanforderungen und Transportverhalten ab. Besonders wichtig ist, dass Cookies mit Requests mitlaufen, während Web Storage primär clientseitig bleibt und damit andere Risiken und Einsatzgrenzen hat.',
    en: 'The right choice depends on lifetime, security requirements, and transport behavior. The crucial part is that cookies travel with requests, while Web Storage stays primarily on the client and therefore brings different risks and limits.',
  },
  29: {
    de: 'In der Praxis zählt vor allem, Reads und Writes am DOM zu bündeln. Wer zwischen Messen und Schreiben ständig hin und her springt, erzeugt Layout Thrashing und verschlechtert Performance unabhängig vom eigentlichen Business Code.',
    en: 'In practice, the key is batching DOM reads and writes. If you constantly bounce between measuring and writing, you trigger layout thrashing and hurt performance regardless of the business logic.',
  },
  30: {
    de: 'Event Delegation ist stark bei dynamischen Listen, weil neue Kindelemente keinen eigenen Listener brauchen. Gleichzeitig verlangt sie saubere Zielerkennung über `event.target`, `closest` und einen bewussten Umgang mit Propagation.',
    en: 'Event delegation is strong for dynamic lists because new child elements do not need their own listener. At the same time, it requires clean target detection through `event.target`, `closest`, and deliberate propagation handling.',
  },
  31: {
    de: 'Besonders wertvoll ist `AbortController` bei Navigationen, Suchfeldern und Komponentenwechseln. Dort vermeidest du veraltete Antworten, unnötige Arbeit und State-Updates für Ergebnisse, die fachlich schon nicht mehr gültig sind.',
    en: '`AbortController` is especially valuable in navigation, search, and component-switching flows. It prevents stale responses, wasted work, and state updates for results that are no longer relevant.',
  },
  32: {
    de: 'Der Trade-off ist nicht nur Parallelität, sondern auch Kommunikationskosten. Daten müssen serialisiert oder transferiert werden, weshalb Worker vor allem dann lohnen, wenn die eigentliche CPU-Arbeit den Overhead klar übersteigt.',
    en: 'The trade-off is not just parallelism, but also communication cost. Data must be serialized or transferred, so workers pay off mainly when the CPU-heavy work clearly outweighs that overhead.',
  },
  33: {
    de: 'Senior-Level heißt hier, das Bedrohungsmodell über Frontend und Backend zusammen zu denken. XSS ist oft ein Rendering- und Output-Encoding-Thema, während CSRF stark von Cookie-Strategien, Origin-Prüfung und Serverregeln abhängt.',
    en: 'Senior-level reasoning here means thinking across frontend and backend with a clear threat model. XSS is often about rendering and output encoding, while CSRF depends heavily on cookie strategy, origin checks, and server rules.',
  },
  34: {
    de: 'Eine gute Antwort beschreibt deshalb eine Reihenfolge: messen, reproduzieren, isolieren, erst dann optimieren. So vermeidest du, dass teure Mikro-Optimierungen Zeit fressen, obwohl die eigentliche Ursache im Netzwerk, Rendering oder Speicher liegt.',
    en: 'A good answer therefore describes an order: measure, reproduce, isolate, and only then optimize. That prevents expensive micro-optimizations from wasting time while the real cause lives in networking, rendering, or memory.',
  },
  35: {
    de: 'In echten Systemen markiert `unknown` die Grenze zu untrusted Input, `any` erzeugt oft unsichtbare Typ-Schulden und `never` macht Refactors sicherer. Genau diese Rolle im Kontrollfluss und an API-Grenzen ist wichtiger als die reine Definition.',
    en: 'In real systems, `unknown` marks the boundary to untrusted input, `any` often creates invisible type debt, and `never` makes refactors safer. That role in control flow and at API boundaries matters more than the raw definition.',
  },
  36: {
    de: 'Wichtig ist ein konsistenter Stil mit nachvollziehbaren Gründen. Öffentliche Objektverträge profitieren oft von `interface`, während zusammengesetzte Typen, Unions und Utility-Ketten mit `type` meist lesbarer bleiben.',
    en: 'What matters is a consistent style with understandable reasons. Public object contracts often benefit from `interface`, while composed types, unions, and utility chains usually stay more readable with `type`.',
  },
  37: {
    de: 'Generics sind dann stark, wenn sie echte Beziehungen zwischen Ein- und Ausgabe ausdrücken. Wenn der Typparameter nichts Relevantes koppelt oder sofort gecastet werden muss, ist die Abstraktion meist zu künstlich.',
    en: 'Generics are powerful when they express real relationships between input and output. If the type parameter does not connect anything meaningful or has to be cast immediately, the abstraction is usually too artificial.',
  },
  38: {
    de: 'Constraints sollten echte Anforderungen modellieren, nicht nur den Compiler beruhigen. Zu breite Constraints verlieren Aussagekraft, zu enge machen APIs unnötig unflexibel und drücken oft ein schwaches Datenmodell aus.',
    en: 'Constraints should model real requirements, not just calm the compiler. Constraints that are too broad lose meaning, while constraints that are too narrow make APIs unnecessarily rigid and often reveal weak data modeling.',
  },
  39: {
    de: 'Union und Intersection werden oft nur syntaktisch erklärt, aber ihr Wert liegt in sauberer Fachmodellierung. Gute Typen erlauben sinnvolle Varianten und verhindern unmögliche Zustände, statt nur viele Formen aufeinanderzustapeln.',
    en: 'Union and intersection types are often explained only syntactically, but their value lies in clear domain modeling. Good types allow meaningful variants and prevent impossible states instead of just piling shapes onto each other.',
  },
  40: {
    de: 'Type Narrowing ist am stärksten, wenn Laufzeitchecks und Typmodell zusammenpassen. Dann wird aus validiertem Input wirklich ein sicher nutzbarer Wert und nicht nur ein Typtrick ohne belastbare Runtime-Basis.',
    en: 'Type narrowing is strongest when runtime checks and the type model align. Then validated input turns into a value you can safely use instead of a type trick without a reliable runtime basis.',
  },
  41: {
    de: 'Discriminated Unions sind besonders wertvoll für Reducer, Ladezustände und API-Ergebnisse. Sie machen illegale Kombinationen sichtbar und erzwingen bei neuen Varianten, dass alle relevanten Stellen bewusst nachgezogen werden.',
    en: 'Discriminated unions are especially valuable for reducers, loading states, and API results. They expose illegal combinations and force all relevant places to be updated deliberately when a new variant appears.',
  },
  42: {
    de: 'Der Hauptnutzen liegt in abgeleiteten Varianten eines bestehenden Modells. So bleiben Form-DTOs, Update-Payloads oder Leseansichten mit dem Quelltyp gekoppelt, statt bei jeder Änderung auseinanderzulaufen.',
    en: 'The main benefit lies in derived variants of an existing model. That keeps form DTOs, update payloads, or read views tied to the source type instead of drifting apart with every change.',
  },
  43: {
    de: 'Mapped Types lohnen sich, wenn dieselbe Transformationslogik wiederholt auf viele Felder angewendet werden soll. Ohne echten Wiederholungsgewinn werden sie schnell zu schwer lesbarer Typ-Magie mit wenig praktischem Nutzen.',
    en: 'Mapped types pay off when the same transformation logic should be applied across many fields. Without a real repetition win, they quickly turn into unreadable type magic with little practical value.',
  },
  44: {
    de: 'Conditional Types sind nützlich, um API-Verhalten präziser vom Input ableiten zu lassen. Gleichzeitig sollte man ihre Lesbarkeit ernst nehmen, weil verschachtelte Bedingungen schnell mehr Verwirrung als Typsicherheit erzeugen.',
    en: 'Conditional types are useful for deriving API behavior more precisely from input. At the same time, readability matters because nested conditions can create more confusion than safety very quickly.',
  },
  45: {
    de: '`infer` ist vor allem dann wertvoll, wenn du vorhandene Typinformationen aus komplexeren Strukturen herauslösen willst. Das lohnt sich bei Promise-Werten, Rückgabetypern oder Event-Payloads, aber nicht als Selbstzweck.',
    en: '`infer` is most valuable when you want to extract existing type information from more complex structures. That is useful for promise values, return types, or event payloads, but not as an end in itself.',
  },
  46: {
    de: 'Die Entscheidung hat auch Laufzeitfolgen: Enums erzeugen JavaScript, konstante Objekte mit `as const` meist nicht mehr als ohnehin nötige Daten. In vielen Web-Codebasen ist die leichtere JS-Interop deshalb das entscheidende Argument.',
    en: 'This choice also has runtime consequences: enums emit JavaScript, while constant objects with `as const` often add no extra runtime beyond the data you already need. In many web codebases, that easier JavaScript interop is the deciding factor.',
  },
  47: {
    de: 'Literal Types sind besonders stark für Konfigurationen, Statusmodelle und Event-Namen. Mit `as const` bleiben diese Werte präzise genug, um daraus sichere Unions und Discriminants abzuleiten.',
    en: 'Literal types are especially strong for configuration, status models, and event names. With `as const`, those values stay precise enough to derive safe unions and discriminants from real data.',
  },
  48: {
    de: 'In APIs signalisiert `readonly`, wer etwas verändern darf und wer nicht. Der Nutzen liegt also stark in Ownership und Wartbarkeit, während echter Schutz vor Mutation zusätzlich zur Laufzeit abgesichert werden muss.',
    en: 'In APIs, `readonly` signals who may change something and who may not. The benefit therefore lies heavily in ownership and maintainability, while actual mutation protection still has to be enforced at runtime as needed.',
  },
  49: {
    de: 'Overloads sind stark für ergonomische öffentliche APIs, aber teuer in Wartung und Tests. Sobald viele Signaturen dieselbe Implementierung nur künstlich maskieren, ist oft eine klarere Eingabestruktur oder getrennte Funktion robuster.',
    en: 'Overloads are strong for ergonomic public APIs, but expensive in maintenance and testing. Once many signatures merely mask the same implementation, a clearer input structure or separate function is often more robust.',
  },
  50: {
    de: 'Declaration Merging ist praktisch, kann aber auch überraschende globale Effekte erzeugen. Genau deshalb sollte man Erweiterungen von Window, Express-Request oder Bibliothekstypen bewusst isolieren und dokumentieren.',
    en: 'Declaration merging is practical, but it can also create surprising global effects. That is why extensions of Window, Express request objects, or library types should be isolated and documented deliberately.',
  },
  51: {
    de: 'Type-only Importe machen vor allem dort einen Unterschied, wo Tooling strikt zwischen Typ- und Laufzeitcode trennt. Das verbessert Klarheit und vermeidet Fälle, in denen scheinbar harmlose Imports plötzlich Laufzeitfolgen haben.',
    en: 'Type-only imports matter most where tooling strictly separates type and runtime code. That improves clarity and avoids cases where seemingly harmless imports suddenly have runtime consequences.',
  },
  52: {
    de: '`strict` ist in der Praxis ein Bündel aus frühen Warnsystemen gegen unscharfe Typannahmen. Gerade in größeren Teams verhindert es, dass unsaubere Nullbarkeit, implizite `any`s oder lockere Rückgaben erst spät im Produkt sichtbar werden.',
    en: 'In practice, `strict` is a bundle of early warning systems against fuzzy type assumptions. Especially in larger teams, it prevents sloppy nullability, implicit `any`s, or loose returns from surfacing only late in the product.',
  },
  53: {
    de: '`strictNullChecks` wirkt nicht nur auf den Compiler, sondern auf das Datenmodell. Sobald fehlende Werte explizit modelliert werden müssen, werden API-Verträge, Validierung und UI-Logik meist deutlich sauberer.',
    en: '`strictNullChecks` changes not only compiler output, but the data model itself. Once missing values must be modeled explicitly, API contracts, validation, and UI logic usually become much cleaner.',
  },
  54: {
    de: '`satisfies` ist besonders stark für Konfigurationsobjekte, Mappings und Token-Listen. Du prüfst damit die Form gegen einen Vertrag, ohne die konkreten Literal-Informationen für spätere Ableitungen zu verlieren.',
    en: '`satisfies` is especially strong for configuration objects, mappings, and token lists. It checks shape against a contract without losing the concrete literal information you still want to derive from later.',
  },
  55: {
    de: 'Die Wahl sollte nicht nur typbasiert, sondern auch nach Laufzeitverhalten getroffen werden. `Record` ist ideal für feste, serialisierbare Key-Sets, `Map` für häufige Mutationen, beliebige Schlüssel und klarere Iteration.',
    en: 'The choice should be driven not only by types, but also by runtime behavior. `Record` fits fixed, serializable key sets, while `Map` fits frequent mutation, arbitrary keys, and clearer iteration semantics.',
  },
  56: {
    de: 'Branded Types sind besonders hilfreich, wenn primitive IDs oder Einheiten fachlich ähnlich aussehen, aber nicht vertauschbar sein dürfen. Dadurch kodierst du Domain-Sicherheit in einer sonst strukturellen Typwelt.',
    en: 'Branded types are especially helpful when primitive IDs or units look similar by shape but must not be interchangeable. That lets you encode domain safety inside an otherwise structural type system.',
  },
  57: {
    de: 'Der Kernpunkt ist die Grenze zwischen angenommenen und tatsächlich empfangenen Daten. Erst Validierung oder Parsing machen aus einer äußeren Response einen internen, belastbaren Typ, auf den sich dein Code wirklich verlassen darf.',
    en: 'The core point is the boundary between assumed data and actually received data. Only validation or parsing turns an external response into an internal, trustworthy type that your code may truly rely on.',
  },
  58: {
    de: 'Saubere Typisierung von Props und Events ist vor allem API-Design. Zu breite Typen verlieren Sicherheit, zu komplizierte Signaturen schrecken Nutzer der Komponente ab und machen Refactors unnötig teuer.',
    en: 'Clean typing of props and events is mostly API design. Types that are too broad lose safety, while signatures that are too complex scare off component users and make refactors unnecessarily expensive.',
  },
  59: {
    de: 'Generische React-Komponenten lohnen sich nur bei echter Wiederverwendung über Datenformen hinweg. Der schwierige Teil ist meist nicht die Generik selbst, sondern eine API, die trotz Flexibilität noch gut lesbar und inferierbar bleibt.',
    en: 'Generic React components pay off only when there is real reuse across data shapes. The hard part is usually not the generic itself, but an API that stays readable and inferable despite the flexibility.',
  },
  60: {
    de: '`.d.ts`-Dateien sind die Brücke zwischen vorhandener Laufzeit und dem TypeScript-Compiler. Sie werden wichtig, sobald du globale Objekte, Third-Party-Code oder Bibliotheken ohne eigene Typen präzise beschreiben musst.',
    en: '`.d.ts` files are the bridge between existing runtime code and the TypeScript compiler. They matter as soon as you need to describe global objects, third-party code, or libraries without their own types precisely.',
  },
  61: {
    de: 'Alias-Probleme zeigen sich oft erst außerhalb des Editors, etwa in Tests, Builds oder Produktions-Deployments. Deshalb müssen Bundler, Runtime und Test-Tooling dieselben Auflösungsregeln tatsächlich teilen.',
    en: 'Alias issues often show up only outside the editor, for example in tests, builds, or production deploys. That is why bundler, runtime, and test tooling must truly share the same resolution rules.',
  },
  62: {
    de: 'Relevant wird Varianz vor allem bei Callbacks und Event-Handlern. Wer hier die Regeln nicht versteht, baut schnell unsichere Zuweisungen, die formal kompilieren, aber zur Laufzeit mit unpassenden Werten arbeiten.',
    en: 'Variance matters most with callbacks and event handlers. If you do not understand the rules here, you quickly create unsafe assignments that compile formally but work with invalid values at runtime.',
  },
  63: {
    de: '`never` wird besonders wertvoll in `switch`-Statements über Discriminated Unions. Dann meldet der Compiler neue Fälle sofort und schützt Refactors davor, still unvollständig zu bleiben.',
    en: '`never` becomes especially valuable in `switch` statements over discriminated unions. Then the compiler flags new cases immediately and protects refactors from silently staying incomplete.',
  },
  64: {
    de: 'Decorators sollte man weniger als reines Syntax-Feature und mehr als Architekturentscheidung betrachten. Sie koppeln Typmodell, Emit, Tooling und oft Reflection oder Framework-Konventionen stärker aneinander als viele Teams zunächst denken.',
    en: 'Decorators should be viewed less as a syntax feature and more as an architectural decision. They couple the type model, emitted code, tooling, and often reflection or framework conventions more tightly than many teams expect.',
  },
  65: {
    de: 'TypeScript sichert Annahmen im Code, Zod oder ähnliche Tools sichern echte Eingaben an der Grenze. Diese Kombination ist besonders wertvoll bei Formdaten, URL-Parametern und Netzwerkinhalten, also überall dort, wo Runtime-Wahrheit zählt.',
    en: 'TypeScript protects assumptions in code, while Zod or similar tools protect real inputs at the boundary. That combination is especially valuable for form data, URL params, and network payloads, wherever runtime truth matters.',
  },
  66: {
    de: 'Gute Migrationen setzen klare Prioritäten: erst riskante Domänen, Schnittstellen und Kernmodule, dann breiter. So entsteht früh messbarer Nutzen, ohne dass das Team durch einen Big-Bang-Plan blockiert oder zermürbt wird.',
    en: 'Good migrations set clear priorities: risky domains, boundaries, and core modules first, broader coverage later. That creates visible value early without blocking or exhausting the team through a big bang plan.',
  },
  67: {
    de: 'Wenn Typen Editor und Build spürbar verlangsamen, ist das ein echtes Produktivitätsproblem. Dann lohnt es sich, weniger clever zu sein und stattdessen explizitere, flachere Typen zu bevorzugen, die Menschen und Compiler gleichermaßen verstehen.',
    en: 'When types noticeably slow down the editor and build, that becomes a real productivity problem. At that point, it is often better to be less clever and prefer explicit, flatter types that both humans and the compiler can understand.',
  },
  68: {
    de: 'Besonders wichtig ist, dass Render mehrfach und sogar spekulativ stattfinden kann, ohne dass etwas sichtbar committet wird. Deshalb gehören Nebenwirkungen nicht in die Renderphase, auch wenn der Code dort zunächst bequem wirkt.',
    en: 'What matters most is that render can happen multiple times, even speculatively, without anything being committed visibly. That is why side effects do not belong in the render phase, even if the code feels convenient there.',
  },
  69: {
    de: 'Die relevante Frage ist oft: Wer besitzt den Wert und wer darf ihn ändern? Wenn diese Ownership unklar wird, entstehen doppelte Wahrheiten, umständliche Synchronisation und schwer testbare Komponentenstrukturen.',
    en: 'The relevant question is often: who owns the value and who may change it? Once that ownership becomes unclear, you get duplicate truths, awkward synchronization, and component structures that are hard to test.',
  },
  70: {
    de: 'Controlled Inputs sind stark für Validierung, Formatierung und synchronisierte UI, während uncontrolled Inputs weniger Renderdruck erzeugen können. Gute Lösungen wählen nicht dogmatisch, sondern passend zu Feldtyp, Performance und Integrationsbedarf.',
    en: 'Controlled inputs are strong for validation, formatting, and synchronized UI, while uncontrolled inputs can reduce render pressure. Good solutions choose based on field type, performance, and integration needs instead of dogma.',
  },
  71: {
    de: '`useEffect` ist keine allgemeine Datenpipeline, sondern eine Brücke zu Dingen außerhalb von React. Wenn ein Wert rein aus Props und State abgeleitet werden kann, ist Renderlogik fast immer robuster als ein zusätzlicher Effekt.',
    en: '`useEffect` is not a general data pipeline, but a bridge to things outside React. If a value can be derived purely from props and state, render logic is almost always more robust than adding another effect.',
  },
  72: {
    de: 'Viele Effektprobleme sind eigentlich Modellierungsprobleme: doppelter State, fehlende Abhängigkeiten oder Logik, die gar kein Effekt sein sollte. Wer das erkennt, reduziert oft mehr Komplexität als durch jedes Dependency-Tuning.',
    en: 'Many effect problems are really modeling problems: duplicated state, missing dependencies, or logic that should not be an effect at all. Recognizing that often removes more complexity than any dependency tweaking.',
  },
  73: {
    de: 'Memoization lohnt sich nur, wenn sie reale Arbeit spart oder referenzielle Stabilität für Kinder wichtig ist. Ohne dieses Ziel erhöht sie oft nur mentale Last und erschwert Debugging, ohne die UI messbar zu verbessern.',
    en: 'Memoization pays off only when it saves real work or when referential stability matters for children. Without that goal, it often just increases mental overhead and makes debugging harder without measurable UI benefit.',
  },
  74: {
    de: '`useRef` ist ideal für DOM-Zugriffe und mutable Hilfswerte, die nicht gerendert werden sollen. Problematisch wird es, wenn fachlich relevantes UI-Verhalten in Refs versteckt wird und dadurch am Render-Modell vorbei läuft.',
    en: '`useRef` is ideal for DOM access and mutable helper values that should not trigger rendering. It becomes problematic when meaningful UI behavior gets hidden in refs and starts bypassing the render model.',
  },
  75: {
    de: 'Context ist gut für Verteilung, aber schlecht als pauschaler Ersatz für State-Architektur. Vor allem breit gestreute, häufig wechselnde Provider-Werte können viele unnötige Re-Renders erzeugen und Debugging erschweren.',
    en: 'Context is good for distribution, but poor as a blanket replacement for state architecture. Broad providers with frequently changing values can trigger many unnecessary re-renders and make debugging harder.',
  },
  76: {
    de: 'State nach oben zu ziehen ist kein Qualitätsmerkmal an sich. Wenn du zu früh globalisierst, vergrößerst du Re-Render-Flächen, koppelst Komponenten unnötig und verlierst lokale Klarheit über Verantwortlichkeiten.',
    en: 'Lifting state up is not a quality marker by itself. If you globalize too early, you increase re-render surface area, couple components unnecessarily, and lose local clarity about responsibilities.',
  },
  77: {
    de: 'Keys beschreiben Identität, nicht Reihenfolge. Sobald Listen sortiert, gefiltert oder ergänzt werden, führen instabile Keys sehr schnell dazu, dass React State an das falsche Element wiederverwendet oder zurücksetzt.',
    en: 'Keys describe identity, not order. As soon as lists are sorted, filtered, or extended, unstable keys quickly cause React to reuse or reset state on the wrong element.',
  },
  78: {
    de: 'Reconciliation ist vor allem ein Identitätsproblem. Entscheidend ist, wie React anhand von Typ, Position und Key erkennt, ob etwas dieselbe Sache ist oder ein neuer Teilbaum mit neuem State entstehen muss.',
    en: 'Reconciliation is primarily an identity problem. What matters is how React uses type, position, and key to decide whether something is the same thing or a new subtree that should get fresh state.',
  },
  79: {
    de: 'Transitions helfen dann, wenn unmittelbares Feedback wie Tippen oder Klicken Vorrang haben muss. Sie machen Updates nicht schneller, sondern priorisieren sie so, dass die Oberfläche unter Last reaktionsfähig bleibt.',
    en: 'Transitions help when immediate feedback such as typing or clicking must take priority. They do not make updates faster; they prioritize them so the interface stays responsive under load.',
  },
  80: {
    de: 'Suspense ist vor allem ein Koordinationsmechanismus für Ladezustände an Render-Grenzen. Sein Wert zeigt sich dann, wenn Fallbacks bewusst platziert werden, statt die ganze Oberfläche bei jeder Wartezeit unnötig zu blockieren.',
    en: 'Suspense is primarily a coordination mechanism for loading states at render boundaries. Its value shows up when fallbacks are placed deliberately instead of blocking the entire UI for every wait state.',
  },
  81: {
    de: 'Error Boundaries fangen Renderfehler ab, aber keine Event-Handler- oder asynchronen Fehler. Deshalb sind sie nur ein Teil einer robusten Fehlerstrategie und müssen mit Logging, Retry und Domänengrenzen zusammengedacht werden.',
    en: 'Error boundaries catch render errors, but not event-handler or asynchronous errors. That makes them only one part of a robust error strategy that must be combined with logging, retry paths, and domain boundaries.',
  },
  82: {
    de: 'Die entscheidende Architekturfrage lautet: Was braucht Interaktivität im Browser und was kann als vorbereitete UI vom Server kommen? Daraus ergeben sich Auswirkungen auf Bundle-Größe, Datenzugriff, Caching und Kompositionsmuster.',
    en: 'The central architectural question is: what needs browser interactivity and what can arrive from the server as prepared UI? That choice affects bundle size, data access, caching, and composition patterns.',
  },
  83: {
    de: 'Custom Hooks sind dann gelungen, wenn sie Verhalten kapseln, aber die Ownership von Daten und Effekten klar lassen. Schlechte Hooks verstecken dagegen zu viel Magie und machen Aufrufstellen schwer vorhersagbar.',
    en: 'Custom hooks work well when they encapsulate behavior while keeping data and effect ownership clear. Bad hooks hide too much magic and make call sites hard to reason about.',
  },
  84: {
    de: 'In größeren Formularen geht es schnell um Datenmodell, Validierungsgrenzen und Update-Kosten pro Feld. Gute Strukturen trennen deshalb fachlichen Form-State, UI-State und Seiteneffekte wie Autosave oder Servervalidierung bewusst voneinander.',
    en: 'In larger forms, the real issues quickly become data modeling, validation boundaries, and per-field update cost. Good structures therefore separate domain form state, UI state, and side effects such as autosave or server validation deliberately.',
  },
  85: {
    de: 'Abgeleiteter State klingt bequem, erzeugt aber fast immer Synchronisationsaufwand. Wenn dieselbe Information an zwei Stellen gespeichert wird, musst du ab diesem Moment über Invalidierung und Reihenfolge der Updates nachdenken.',
    en: 'Derived state feels convenient, but it almost always creates synchronization work. Once the same information is stored in two places, you must start thinking about invalidation and update ordering.',
  },
  86: {
    de: 'Die richtige Wahl hängt von Ownership, Änderungsfrequenz und notwendiger Beobachtbarkeit ab. Wer alles global macht, baut schnell zu viel Koordination; wer alles lokal hält, kämpft irgendwann mit Prop Drilling und inkonsistentem Verhalten.',
    en: 'The right choice depends on ownership, change frequency, and required observability. Make everything global and you build too much coordination; keep everything local and you eventually hit prop drilling and inconsistent behavior.',
  },
  87: {
    de: 'Bei großen Listen ist Virtualisierung oft nur ein Teil der Lösung. Ebenso wichtig sind stabile Identität, wenig Arbeit pro Zeile, gezielte Memoization und ein Blick darauf, ob überhaupt so viele Elemente gleichzeitig sichtbar sein müssen.',
    en: 'For large lists, virtualization is often only part of the solution. Equally important are stable identity, little work per row, targeted memoization, and asking whether that many elements need to be visible at once.',
  },
  88: {
    de: '`React.memo` ist ein Werkzeug gegen unnötige Wiederholung, kein Qualitätsstempel. Es lohnt sich vor allem bei teureren Kindern mit stabilen Props und ist wenig wert, wenn ständig neue Objekte oder Callbacks hineingereicht werden.',
    en: '`React.memo` is a tool against unnecessary repetition, not a quality badge. It pays off mainly for expensive children with stable props and adds little value if new objects or callbacks are passed in every render.',
  },
  89: {
    de: 'Gebatchte Updates erklären, warum mehrfaches Setzen von State nicht sofort im selben Tick sichtbar ist. Gerade deshalb sind funktionale Updates wichtig, wenn der nächste Wert aus dem vorherigen berechnet werden muss.',
    en: 'Batched updates explain why setting state multiple times is not immediately visible in the same tick. That is exactly why functional updates matter whenever the next value depends on the previous one.',
  },
  90: {
    de: 'Stale Closures entstehen, weil Callbacks immer an einen bestimmten Render gebunden sind. Abhängigkeitslisten, funktionale Updates oder Refs sind deshalb keine Stilfragen, sondern Werkzeuge zur bewussten Kontrolle dieser Bindung.',
    en: 'Stale closures happen because callbacks are always tied to a specific render. Dependency lists, functional updates, and refs are therefore not style choices, but tools for controlling that binding deliberately.',
  },
  91: {
    de: 'Gute Accessibility zeigt sich nicht nur in ARIA-Attributen, sondern in Fokusfluss, Tastaturbedienung und semantisch sinnvoller Struktur. Genau dort fallen viele React-Apps auf, wenn visuelle Komponenten über native Semantik hinweg gebaut werden.',
    en: 'Good accessibility shows up not only in ARIA attributes, but in focus flow, keyboard support, and meaningful semantic structure. That is where many React apps fail once visual components are built over native semantics.',
  },
  92: {
    de: 'Sinnvolle Tests richten sich nach Risiko und Beobachtbarkeit. Kleine Logik bekommt Unit-Tests, zusammengesetztes Verhalten Integrationstests und kritische Nutzerpfade E2E-Tests, statt alles auf derselben Ebene zu erzwingen.',
    en: 'Useful tests are driven by risk and observability. Small logic gets unit tests, composed behavior gets integration tests, and critical user flows get end-to-end tests instead of forcing everything into one layer.',
  },
  93: {
    de: 'Wichtige Themen sind Caching, Invalidation, Parallelisierung und Fehlerzustände, nicht nur das nackte Laden. Deshalb skalieren dedizierte Query- oder Framework-Patterns oft besser als ein freihändiger `useEffect`-Ansatz.',
    en: 'The important topics are caching, invalidation, parallelization, and error states, not just loading data. That is why dedicated query or framework patterns often scale better than a hand-rolled `useEffect` approach.',
  },
  94: {
    de: 'Optimistic UI ist dort stark, wo Fehler selten und Konflikte beherrschbar sind. Sobald Rollback, Dubletten, IDs oder konkurrierende Änderungen komplex werden, braucht die scheinbar einfache Optimierung deutlich mehr saubere Zustandslogik.',
    en: 'Optimistic UI is strong where failures are rare and conflicts are manageable. Once rollback, duplicates, IDs, or competing changes become complex, that seemingly simple optimization needs much more disciplined state logic.',
  },
  95: {
    de: 'Portals lösen vor allem DOM-Probleme wie Overflow, Stacking Context und Positionierung, ohne den React-Baum zu verlassen. Dadurch bleiben Context und Event-Bubbling erhalten, obwohl das Element visuell ganz woanders gerendert wird.',
    en: 'Portals mainly solve DOM issues such as overflow, stacking context, and positioning without leaving the React tree. That means context and event bubbling still work even though the element renders visually elsewhere.',
  },
  96: {
    de: 'Ein bewusstes Ref-API sollte klein und stabil bleiben. Sinnvoll sind Fokus-, Scroll- oder Mess-Operationen; problematisch wird es, wenn Eltern über Refs anfangen, interne Kindlogik fernzusteuern.',
    en: 'A deliberate ref API should stay small and stable. Focus, scroll, or measurement operations make sense; it becomes problematic when parents start driving internal child logic through refs.',
  },
  97: {
    de: 'Compound Components sind besonders stark, wenn mehrere Teile gemeinsam ein zugrunde liegendes Interaktionsmodell teilen. Der schwierige Teil ist, Flexibilität, verständliche API und Accessibility gleichzeitig sauber zu halten.',
    en: 'Compound components are especially strong when multiple parts share one underlying interaction model. The hard part is keeping flexibility, a clear API, and accessibility clean at the same time.',
  },
  98: {
    de: 'Headless Patterns sind wertvoll, wenn Verhalten mehrfach mit unterschiedlichem Design wiederverwendet werden soll. Sie verschieben die Schwierigkeit von Styling auf API-Design, Zustandskoordination und Accessibility-Verantwortung.',
    en: 'Headless patterns are valuable when behavior should be reused across different visual designs. They shift the difficulty from styling toward API design, state coordination, and accessibility responsibility.',
  },
  99: {
    de: 'Code Splitting lohnt sich vor allem an natürlichen Produktgrenzen wie Routen, Admin-Flächen oder seltenen Features. Zu feingranulares Splitting kann dagegen Netzwerkkosten, Ladezustände und Komplexität stärker erhöhen als den Bundle-Vorteil.',
    en: 'Code splitting pays off mostly at natural product boundaries such as routes, admin areas, or rarely used features. Splitting too finely can increase network cost, loading states, and complexity more than it helps bundle size.',
  },
  100: {
    de: 'Hydration-Probleme werden meist besser gelöst, wenn der erste Render deterministisch bleibt und browserabhängige Logik bewusst verschoben wird. Dann verschwinden nicht nur Warnungen, sondern auch flackernde UI und schwer erklärbare Initialzustände.',
    en: 'Hydration issues are usually solved best by keeping the first render deterministic and moving browser-specific logic deliberately. That removes not only warnings, but also flickering UI and hard-to-explain initial states.',
  },
  101: {
    de: 'Scripts sind dann wertvoll, wenn sie ein gemeinsames Team-Vokabular für wiederkehrende Tätigkeiten schaffen. Wer dieselbe Absicht lokal, in CI und in Dokumentation unterschiedlich ausdrückt, erzeugt unnötige Reibung und schwerer reproduzierbare Fehler.',
    en: 'Scripts are valuable when they create a shared team vocabulary for recurring tasks. If the same intent is expressed differently locally, in CI, and in documentation, teams create unnecessary friction and harder-to-reproduce failures.',
  },
  102: {
    de: 'Ein gepflegter Lockfile reduziert nicht nur Build-Unterschiede, sondern macht Sicherheitsupdates und Rollbacks nachvollziehbar. Gerade bei transitive Dependencies entscheidet das oft darüber, ob ein Vorfall in Minuten oder erst nach langer Suche eingegrenzt werden kann.',
    en: 'A maintained lockfile reduces not only build drift, but also makes security updates and rollbacks traceable. Especially with transitive dependencies, this often decides whether an incident can be narrowed down in minutes or only after a long investigation.',
  },
  103: {
    de: 'Tooling-Wahl hat langfristige Auswirkungen auf Plugins, Debugging, Onboarding und CI-Kosten. Deshalb sollte die Entscheidung an realen Produktanforderungen hängen und nicht daran, welches Tool gerade in Benchmarks oder Social Media am lautesten ist.',
    en: 'Tooling choice has long-term impact on plugins, debugging, onboarding, and CI cost. The decision should therefore be driven by real product requirements instead of whichever tool currently looks best in benchmarks or on social media.',
  },
  104: {
    de: 'Tree Shaking ist nur ein Baustein einer Performance-Strategie und hängt stark von Paketstruktur und Seiteneffekten ab. Bundle-Analyse hilft dabei, Größenprobleme früh an Imports und Dependencies zu sehen, bevor Nutzer sie als langsame Oberfläche spüren.',
    en: 'Tree shaking is only one part of a performance strategy and depends heavily on package structure and side effects. Bundle analysis helps surface size problems in imports and dependencies early, before users feel them as a slow interface.',
  },
  105: {
    de: 'Im Frontend ist die entscheidende Grenze nicht nur zwischen Umgebungen, sondern zwischen öffentlich auslieferbarer Konfiguration und echten Geheimnissen. Wer diese Trennung unscharf hält, baut schnell gefährliche Sicherheitsannahmen in Deployment-Prozesse ein.',
    en: 'In frontend work, the crucial boundary is not only between environments, but between publicly shipped configuration and real secrets. Teams that blur that line quickly encode dangerous security assumptions into their deployment processes.',
  },
  106: {
    de: 'Getrennte CI-Schritte sind ein Mittel für schnellere Diagnose und bessere Parallelisierung, nicht bloße Pedanterie. Sobald Teams wissen, ob Stil, Typen, Verhalten oder Lieferbarkeit gebrochen ist, können sie zielgerichteter reagieren und Pipelines effizienter cachen.',
    en: 'Separate CI steps are a tool for faster diagnosis and better parallelization, not mere pedantry. Once teams know whether style, types, behavior, or ship readiness is broken, they can react more directly and cache pipelines more effectively.',
  },
  107: {
    de: 'Die Trennung zwischen ESLint und Prettier schützt zwei unterschiedliche Arten von Entscheidungen: Qualitätsregeln und Darstellung. Wenn beide Werkzeuge dieselbe Sorge bearbeiten sollen, entsteht meist mehr Konfigurationslärm als echter Nutzen.',
    en: 'The split between ESLint and Prettier protects two different kinds of decisions: quality rules and presentation. When both tools are asked to own the same concern, teams usually get more configuration noise than real value.',
  },
  108: {
    de: 'Eine gute Testverteilung ist vor allem ein ökonomisches Problem: Welche Sicherheit bekommt man für welche Laufzeit und Wartungskosten? Die beste Mischung ist daher selten maximal, sondern bewusst auf Risiko und Systemgrenzen abgestimmt.',
    en: 'A good test distribution is primarily an economic problem: what confidence do you gain for what runtime and maintenance cost? The best mix is therefore rarely maximal; it is intentionally tuned to risk and system boundaries.',
  },
  109: {
    de: 'Flakiness ist oft ein Hinweis darauf, dass Produktzustände oder Testdaten nicht sauber modelliert sind. Wer das Problem nur mit Sleeps oder Retries behandelt, kaschiert Symptome und lässt die eigentliche Systemschwäche unangetastet.',
    en: 'Flakiness is often a sign that product states or test data are not modeled cleanly. Treating it only with sleeps or retries hides symptoms while leaving the actual system weakness untouched.',
  },
  110: {
    de: 'Komponenten-Workbenches entfalten ihren größten Wert, wenn mehrere Disziplinen denselben UI-Baustein gemeinsam betrachten und prüfen müssen. Sie ersetzen jedoch keine echte Produktintegration, weil Datenflüsse und Seiteneffekte dort nur teilweise sichtbar sind.',
    en: 'Component workbenches deliver the most value when several disciplines need to inspect and validate the same UI building block together. They do not replace real product integration, however, because data flow and side effects are only partially visible there.',
  },
  111: {
    de: 'Ein Monorepo ist vor allem ein Koordinationswerkzeug für gemeinsame Änderungen, nicht automatisch eine Produktivitätsabkürzung. Es hilft dort, wo mehrere Pakete oder Apps gemeinsam evolvieren, verlangt aber klare Grenzen und solides Build-Management.',
    en: 'A monorepo is primarily a coordination tool for shared change, not automatically a productivity shortcut. It helps where several packages or apps evolve together, but it demands clear boundaries and solid build management.',
  },
  112: {
    de: 'Paketgrenzen sind nur dann belastbar, wenn sie nicht durch Komfort-Importe oder implizite Abhängigkeiten unterlaufen werden. Gerade in Monorepos entscheidet diese Disziplin darüber, ob Refactors lokal bleiben oder jedes Mal durch das ganze Repository schlagen.',
    en: 'Package boundaries are resilient only if they are not undermined by convenience imports or implicit dependencies. In monorepos especially, that discipline determines whether refactors stay local or ripple across the whole repository.',
  },
  113: {
    de: 'Versionierung interner Pakete schafft Planbarkeit über Teamgrenzen hinweg und macht Kompatibilität sichtbar. Selbst wenn alles aus demselben Repo kommt, müssen Konsumenten wissen, wann ein Update sicher, riskant oder bewusst abgestimmt werden sollte.',
    en: 'Versioning internal packages creates predictability across team boundaries and makes compatibility visible. Even when everything comes from the same repository, consumers still need to know whether an update is safe, risky, or should be coordinated deliberately.',
  },
  114: {
    de: 'Feature Flags wirken harmlos, erhöhen aber die Zahl möglicher Produktzustände oft dramatisch. Ohne Eigentümer, Ablaufdatum und Sichtbarkeit in Tests wachsen sie schnell von einem Risikowerkzeug zu einer dauerhaften Quelle verdeckter Komplexität.',
    en: 'Feature flags may look harmless, but they often increase the number of possible product states dramatically. Without owners, expiration dates, and visibility in tests, they quickly grow from a risk-management tool into a permanent source of hidden complexity.',
  },
  115: {
    de: 'Migrationen scheitern selten am Zielbild, sondern am Übergang. Wer Zwischenzustände, Abschaltpunkte und reale Teamkapazität nicht plant, erzeugt lange Parallelwelten, in denen alter und neuer Code gleichzeitig Kosten verursachen.',
    en: 'Migrations rarely fail because of the target state; they fail because of the transition. Teams that do not plan intermediate states, shutdown points, and actual delivery capacity create long parallel worlds where old and new code both keep costing money.',
  },
  116: {
    de: 'ADRs konservieren den Entscheidungskontext, den Commit-Messages und Tickets meist nicht vollständig tragen. Besonders bei Plattform- und Tooling-Fragen sparen sie später viel Zeit, weil nicht jede Grundsatzentscheidung erneut aus der Luft rekonstruiert werden muss.',
    en: 'ADRs preserve decision context that commit messages and tickets rarely capture fully. Especially for platform and tooling questions, they save a lot of time later because teams do not have to reconstruct each foundational choice from scratch.',
  },
  117: {
    de: 'Dateistruktur ist kein Geschmacksdetail, sondern beeinflusst Suchkosten, Ownership und Refactor-Richtung. Wenn häufige Änderungen quer durch viele technische Sammelordner laufen, ist das oft ein Zeichen für unpassende Architekturgrenzen.',
    en: 'File structure is not a taste issue; it affects search cost, ownership, and refactor direction. When common changes cut across many technical catch-all folders, that is often a sign that the architecture boundaries do not fit the work.',
  },
  118: {
    de: 'Frühe Abstraktion wirkt effizient, bindet aber oft unterschiedliche Änderungsrichtungen künstlich zusammen. Lokale Duplikation kann daher die bessere Investition sein, bis sich wirklich zeigt, welche gemeinsame API dauerhaft stabil bleiben soll.',
    en: 'Early abstraction feels efficient, but it often binds different change directions together artificially. Local duplication can therefore be the better investment until it becomes clear which shared API should remain stable over time.',
  },
  119: {
    de: 'Adapter- oder Service-Schichten sind dann stark, wenn sie volatile Integrationen aus Fachlogik und UI fernhalten. Ohne klaren Grenznutzen werden sie jedoch schnell zu zusätzlicher Indirektion, die Änderungen eher erschwert als erleichtert.',
    en: 'Adapter or service layers are strong when they keep volatile integrations away from domain logic and UI. Without a clear boundary benefit, however, they quickly become extra indirection that makes change harder instead of easier.',
  },
  120: {
    de: 'Ein sauber geschnittener API-Client reduziert die Streuung von Transportwissen im UI und macht Fehlerpfade konsistenter. Besonders wichtig ist, dass Komponenten möglichst fachlich nutzbare Daten sehen und nicht überall dieselben Response-Formate selbst entwirren müssen.',
    en: 'A well-cut API client reduces the spread of transport knowledge across the UI and keeps failure handling more consistent. It matters especially that components see domain-usable data instead of having to untangle the same response shapes everywhere themselves.',
  },
  121: {
    de: 'Ein BFF ist vor allem dann wertvoll, wenn er echte Komplexität aus dem Browser zieht, etwa Aggregation, Geheimnisse oder Produktsicht auf mehrere Services. Ohne diesen Nutzen bleibt er nur eine zusätzliche Betriebs- und Ownership-Schicht.',
    en: 'A BFF is most valuable when it removes real complexity from the browser, such as aggregation, secrets, or a product-specific view over several services. Without that value, it becomes only another operational and ownership layer.',
  },
  122: {
    de: 'Caching wird erst dann tragfähig, wenn Invalidation und Wahrheitsquelle pro Ebene klar benannt sind. Viele Probleme entstehen nicht aus fehlendem Cache, sondern aus mehreren Caches mit widersprüchlichen Lebensdauern und Erwartungen an Frische.',
    en: 'Caching becomes reliable only once invalidation and source of truth are named clearly per layer. Many problems come not from missing cache, but from several caches with conflicting lifetimes and expectations around freshness.',
  },
  123: {
    de: 'Fehlergrenzen sind Produktentscheidungen: Welcher Teil darf degradieren, was muss komplett stoppen und wo hilft ein Retry? Wenn diese Logik unklar bleibt, entstehen inkonsistente Oberflächen und schwer auswertbare Betriebsdaten.',
    en: 'Failure boundaries are product decisions: which part may degrade, what must stop completely, and where does a retry help? When that logic stays unclear, teams end up with inconsistent surfaces and operational signals that are hard to interpret.',
  },
  124: {
    de: 'Observability im Frontend ist nur dann nützlich, wenn sie technische Signale mit Nutzerwirkung und Release-Kontext verbindet. Reine Datensammlung ohne Priorisierung erzeugt meist mehr Dashboards als echte Handlungssicherheit.',
    en: 'Frontend observability is useful only when it connects technical signals with user impact and release context. Data collection without prioritization usually creates more dashboards than real confidence to act.',
  },
  125: {
    de: 'Performance-Budgets funktionieren am besten als bewusst gewählte Leitplanken statt als perfekte Wahrheitsmaschinen. Sie helfen Teams, schleichende Regressionen früh zu sehen und Änderungen ab einer relevanten Größenordnung aktiv zu begründen.',
    en: 'Performance budgets work best as deliberately chosen guardrails instead of pretending to be perfect truth machines. They help teams notice gradual regressions early and justify changes actively once a relevant threshold is crossed.',
  },
  126: {
    de: 'Release-Sicherheit entsteht aus kleinen Änderungen, automatischen Prüfungen und schneller Rückmeldung nach dem Deploy. Gerade bei Frontends gehören dazu auch Asset-Versionierung, Cache-Verhalten und Sichtbarkeit darüber, welche Version Nutzer wirklich geladen haben.',
    en: 'Release safety comes from small changes, automated checks, and fast feedback after deployment. For frontend systems, that also includes asset versioning, cache behavior, and visibility into which version users have actually loaded.',
  },
  127: {
    de: 'Container sind dann sinnvoll, wenn sie echte Reproduzierbarkeit oder klare Artefaktgrenzen schaffen. Werden sie nur aus Gewohnheit eingeführt, verlängern sie Builds und machen lokale Iteration schwerer, ohne ein konkretes Problem zu lösen.',
    en: 'Containers are useful when they create real reproducibility or clear artifact boundaries. Introduced merely out of habit, they lengthen builds and make local iteration harder without solving a concrete problem.',
  },
  128: {
    de: 'Integrationsstrategie ist vor allem eine Frage von Feedback-Zyklus und Konfliktkosten. Lange parallele Branches fühlen sich zunächst sicher an, erzeugen aber oft spätere Unsicherheit genau in den Momenten, in denen Teams eigentlich schnell liefern müssten.',
    en: 'Integration strategy is primarily a question of feedback cycle and conflict cost. Long-lived parallel branches feel safe at first, but they often create later uncertainty precisely when teams need to ship quickly.',
  },
  129: {
    de: 'Dependencies binden nicht nur Code ein, sondern auch Release-Takt, Sicherheitsoberfläche und API-Annahmen fremder Maintainer. Gute Bewertung fragt deshalb immer nach Exit-Kosten und danach, wie tief eine Bibliothek in die eigene Architektur eingreift.',
    en: 'Dependencies bring in not only code, but also release cadence, security surface, and the API assumptions of outside maintainers. Good evaluation therefore always asks about exit cost and how deeply a library cuts into the architecture.',
  },
  130: {
    de: 'Design Tokens sind nur dann wertvoll, wenn sie echte semantische Entscheidungen transportieren und mehrere Oberflächen verbinden. Werden sie zu früh oder zu granular eingeführt, entsteht schnell eine schwer gepflegte Variablenlandschaft ohne klaren Design-Gewinn.',
    en: 'Design tokens are valuable only when they carry real semantic decisions and connect multiple surfaces. Introduced too early or too granularly, they quickly turn into a hard-to-maintain variable landscape without clear design benefit.',
  },
  131: {
    de: 'Berechtigungen im Frontend betreffen Sichtbarkeit und Bedienbarkeit, aber niemals die letzte Sicherheitsentscheidung. Gute Architektur hält deshalb Policy-Information zentral, serverseitige Autorisierung strikt und UI-Ableitungen pro Oberfläche bewusst testbar.',
    en: 'Permissions in the frontend affect visibility and interactivity, but never the final security decision. Good architecture therefore keeps policy information central, server-side authorization strict, and UI derivations intentionally testable per surface.',
  },
  132: {
    de: 'Konventionen skalieren nur dann, wenn Werkzeuge sie unterstützen und Verstöße früh sichtbar machen. Sonst hängt Qualität an individueller Disziplin und Review-Aufmerksamkeit, was in wachsenden Teams schnell zu inkonsistentem Verhalten führt.',
    en: 'Conventions scale only when tools support them and make violations visible early. Otherwise quality depends on individual discipline and reviewer attention, which quickly leads to inconsistent behavior in growing teams.',
  },
  133: {
    de: 'Over-Engineering erkennt man daran, dass typische Änderungen nicht einfacher, sondern langsamer und erklärungsbedürftiger werden. Komplexität sollte immer durch häufige Änderungsfälle gerechtfertigt sein, nicht durch hypothetische Zukunftsszenarien allein.',
    en: 'You recognize over-engineering when typical changes become slower and more explanation-heavy instead of easier. Complexity should always be justified by frequent change cases, not by hypothetical future scenarios alone.',
  },
  134: {
    de: 'Die OWASP Top 10 ist besonders wertvoll, wenn sie Sicherheitsdiskussionen vom diffusen Bauchgefühl zu benennbaren Risikoklassen verschiebt. Sie ersetzt aber nie die Frage, welche Daten, Rollen und Missbrauchswege im eigenen System tatsächlich kritisch sind.',
    en: 'The OWASP Top 10 is most valuable when it moves security discussions from vague gut feeling to named risk classes. It never replaces asking which data, roles, and abuse paths are actually critical in your own system.',
  },
  135: {
    de: 'Injection ist eine klassische Grenzverletzung zwischen Daten und ausführbarer Semantik. Gerade deshalb lohnt es sich, an allen Interpreter-Grenzen dieselbe Disziplin zu fordern: validieren, erlaubte Formen einschränken und Befehle niemals per String-Magie zusammensetzen.',
    en: 'Injection is a classic boundary violation between data and executable semantics. That is exactly why it is worth demanding the same discipline at every interpreter boundary: validate, constrain allowed shapes, and never build commands through string magic.',
  },
  136: {
    de: 'XSS wird oft durch seltene Sonderpfade eingeschleppt, nicht durch normales JSX-Rendering. Rich Text, WYSIWYG-Inhalte, Drittwidgets und URL-basierte DOM-Manipulation verdienen deshalb deutlich mehr Misstrauen als die Standard-Component selbst.',
    en: 'XSS often enters through rare escape hatches rather than normal JSX rendering. Rich text, WYSIWYG content, third-party widgets, and URL-driven DOM manipulation therefore deserve much more suspicion than the standard component path itself.',
  },
  137: {
    de: 'Authentifizierung ist nur dann wirklich robust, wenn auch Fehlversuche, Wiederherstellung, Gerätewechsel und Session-Enden sauber bedacht sind. Viele reale Schwächen liegen genau in diesen Nebenpfaden und nicht im eigentlichen Login-Formular.',
    en: 'Authentication is truly robust only when failed attempts, recovery, device changes, and session termination are considered cleanly as well. Many real weaknesses lie exactly in these side paths and not in the actual login form.',
  },
  138: {
    de: 'Broken Access Control ist so häufig, weil fachliche Regeln oft über mehrere Services, IDs und Oberflächen verstreut sind. Je klarer Ownership, Mandantengrenzen und Policy-Entscheidungen modelliert werden, desto kleiner wird die Chance auf schleichende Rechteeskalation.',
    en: 'Broken access control is so common because business rules are often scattered across multiple services, IDs, and surfaces. The more clearly ownership, tenant boundaries, and policy decisions are modeled, the smaller the chance of gradual privilege escalation becomes.',
  },
  139: {
    de: 'Kryptografische Fehler sind selten rein mathematische Fehler, sondern meist Produkt- und Betriebsfehler rund um Datenklassifikation, Speicherort und Schlüsselhandhabung. Gute Entscheidungen beginnen deshalb mit Datensparsamkeit und erst danach mit Algorithmusdetails.',
    en: 'Cryptographic failures are rarely purely mathematical failures; they are usually product and operations failures around data classification, storage location, and key handling. Good decisions therefore start with data minimization and only then move to algorithm details.',
  },
  140: {
    de: 'SSRF wird gefährlich, sobald ein eigentlich harmloser Fetch nach innen oder in Cloud-Metadatenräume kippen kann. Wer Ziele strikt vorgibt und ausgehenden Traffic technisch begrenzt, reduziert das Risiko deutlich stärker als mit reiner String-Validierung allein.',
    en: 'SSRF becomes dangerous as soon as an apparently harmless fetch can pivot inward or into cloud metadata spaces. Teams that fix target choices strictly and limit outbound traffic technically reduce the risk far more than with string validation alone.',
  },
  141: {
    de: 'Dependency-Risiko ist auch ein Wartungs- und Lieferproblem: ungepflegte Bibliotheken altern still, bis ein Befund plötzlich dringlich wird. Regelmäßige Updates in kleinen Schritten sind deshalb meist sicherer als seltene große Sprünge unter Zeitdruck.',
    en: 'Dependency risk is also a maintenance and delivery problem: unmaintained libraries age quietly until a finding suddenly becomes urgent. Regular updates in small steps are therefore usually safer than rare large jumps under time pressure.',
  },
  142: {
    de: 'Security Logging scheitert oft an fehlender Priorisierung oder an zu viel empfindlichem Rohmaterial in den Events. Wirklich brauchbar werden Signale erst, wenn sie Missbrauch, Ursache und betroffene Oberfläche schnell zusammenführen, ohne neue Datenrisiken zu öffnen.',
    en: 'Security logging often fails because of missing prioritization or because too much sensitive raw material ends up inside events. Signals become truly useful only when they bring together abuse pattern, cause, and affected surface quickly without opening new data risks.',
  },
  143: {
    de: 'CSRF ist weniger ein UI-Problem als eine Folge davon, dass Browser Cookies automatisch mitsenden. Wer das Session-Modell klar versteht, kann Token, SameSite und Origin-Checks passend kombinieren statt Schutzmechanismen zufällig zu stapeln.',
    en: 'CSRF is less a UI problem than a consequence of browsers sending cookies automatically. Teams that understand the session model clearly can combine tokens, SameSite, and origin checks appropriately instead of stacking defenses randomly.',
  },
  144: {
    de: 'Datei-Uploads betreffen nicht nur Annahme und Speicherung, sondern auch Verarbeitung, Vorschaubilder, Downloads und Retention. Genau deshalb sind sie ein guter Test dafür, ob ein Team wirklich in vollständigen Datenlebenszyklen denkt.',
    en: 'File uploads affect not only acceptance and storage, but also processing, previews, downloads, and retention. That is exactly why they are a good test of whether a team truly thinks in complete data lifecycles.',
  },
  145: {
    de: 'Threat Modeling spart vor allem spätere Architekturkosten, weil Sicherheitsannahmen sichtbar werden, bevor sie implizit in APIs und Datenflüsse einbrennen. Der Gewinn zeigt sich meist darin, was ein Team gar nicht erst falsch baut.',
    en: 'Threat modeling mainly saves later architecture cost because security assumptions become visible before they harden implicitly into APIs and data flows. Its benefit often shows up in what a team never builds incorrectly in the first place.',
  },
  146: {
    de: 'Unsichere Deserialisierung ist heute oft hinter moderneren Begriffen versteckt, etwa Mass Assignment oder ungeprüftem Objekt-Merge. Das Grundproblem bleibt aber gleich: externe Daten formen interne Struktur oder Berechtigungen ohne hinreichende Kontrolle.',
    en: 'Insecure deserialization is often hidden today behind newer terms such as mass assignment or unchecked object merge. But the core problem stays the same: external data shapes internal structure or privileges without sufficient control.',
  },
  147: {
    de: 'Secrets und Sicherheitskonfiguration werden besonders dann riskant, wenn Teams sie als reine Deploy-Details behandeln. In Wahrheit bestimmen sie Vertrauensgrenzen, Betriebsfähigkeit und die Geschwindigkeit, mit der sich Vorfälle eingrenzen oder drehen lassen.',
    en: 'Secrets and security configuration become especially risky when teams treat them as mere deployment details. In reality they define trust boundaries, operational resilience, and how quickly incidents can be contained or rotated away.',
  },
  148: {
    de: 'OWASP-Prinzipien bleiben nur dann lebendig, wenn sie in Rituale und Werkzeuge übersetzt werden. Sonst entstehen einmalige Security-Aktionen, aber keine belastbare Routine für Reviews, Updates, Tests und Incident-Response.',
    en: 'OWASP principles stay alive only when they are translated into rituals and tooling. Otherwise you get one-off security actions, but no durable routine for reviews, updates, testing, and incident response.',
  },
}
