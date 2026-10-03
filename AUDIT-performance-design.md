# Performance and design audit

Date: 2026-10-03. Reviewed commit: `18b82ed12`.

## Scope and evidence

Reviewed startup, shared providers, search, navigation, typography, directory rendering, bilingual reading, and UI test coverage. Inspected the local Expo web development app at 1280 × 800 and approximately 390 × 844, including the home page, Angelus, search opening, and light/dark appearance. This is a targeted audit of shared systems and representative screens, not a review of all 994 route files or liturgical text accuracy.

`bun run check` passed. The calendar benchmark and search measurements below ran in Bun on this development machine. They are not production browser or Hermes timings. No application code was changed. Native device profiling, production Core Web Vitals, offline verification, and a comprehensive contrast/accessibility audit remain unmeasured.

## Findings, in recommended order

### 1. High — Search data participates in startup, and the first query blocks synchronously

Evidence: `src/services/search.ts:4` imports the 2.4 MB search index and 2.1 MB document catalog. Both Search and Drawer import this service, and the root layout imports both components. `getSearchIndex()` serializes the imported index again and loads it synchronously through MiniSearch. Thus lazy index construction does not make the underlying data lazy. Sizes are uncompressed on-disk JSON, not transferred bundle sizes.

Measured one fresh-process first query for `Maria`: **185.2 ms**, excluding module import time. Subsequent queries for Maria, Deus, and missa took **1.6–2.2 ms**. Slower native devices may be worse; that needs measurement. The loading state around synchronous search cannot reliably paint before the work completes.

Action: generate a small navigation catalog separate from full document bodies; isolate full-text search from navigation imports. Load/prepare the index on demand using a platform-appropriate strategy that preserves native offline search. Avoid the stringify/parse round trip where supported. Measure cold-search interaction and memory in release builds before and after.

### 2. High — Phone-width web reading always uses two columns

Evidence: `src/components/Language.tsx:148` chooses side-by-side Latin/Portuguese solely by platform, with no width breakpoint. Angelus at phone width had reading columns about **160 px wide at 16 px type**. Long prayers wrap heavily. The web branch also ignores the selected default language for presentation.

Action: use a labeled Latin/Português selector at narrow widths, keeping paired columns on wider screens. Honor the language preference and preserve reading position when switching. Verify large text as well as default text.

### 3. High — Shared headings and mobile header controls lack accessibility semantics

Evidence: `src/components/Headings.tsx:31` and the other heading components render styled Text without heading roles/levels. Browser inspection on Angelus found **zero h1/h2/h3 or role=heading elements**. Mobile header menu/search Pressables in `src/app/_layout.tsx:330`, `:349`, `:367`, and `:383` lack button roles and accessible names; the preview exposed them as unnamed divs. Their visual targets are 36 × 36 with no explicit hitSlop there.

Action: expose heading semantics and levels, name all icon actions in Portuguese, and enlarge touch targets or add suitable hitSlop. Give search input/filter/clear controls accessible names and filters selected-state semantics. Verify keyboard focus and screen-reader navigation on web and both native platforms.

### 4. Medium — Search keyboard listeners accumulate across open/close cycles

Evidence: `src/components/Search.tsx:129` registers keydown with `capture: true`; cleanup at line 132 removes it without the capture flag. The effect depends on open state and toggleSearch, so opening and closing registers additional listeners while the previous capture listeners remain. Old closures can issue conflicting open/close requests, and are retained until page unload.

Action: use matching capture options for registration and removal, or a stable listener with current state. Verify repeated Ctrl/Cmd+K and Escape cycles, including after navigation.

### 5. Medium — The minute clock invalidates theme consumers throughout the app

Evidence: `src/providers/calendar.tsx:42` sets a new Date every minute. The context value at line 108 is a fresh object, and its novena scan depends on that Date. `src/theme/index.ts:112` consumes this calendar context, coupling themed cards, headings, and chrome to clock updates even if the liturgical day is unchanged.

Action: separate clock-dependent UI from date/day/calendar state; stabilize provider values and actions. Use a date key for work that only changes daily. Profile commits while reading a long page before adding component-level memoization.

### 6. Medium — Font loading gates all content and a font error blocks the app

Evidence: `src/app/_layout.tsx:32` loads eight faces before rendering the app. It returns null while loading and replaces the entire application with a restart message on error at line 49.

Action: provide a readable fallback when a font fails. Evaluate loading essential faces first, with optional display/italic faces later where practical. Measure startup in release builds; no launch duration was established in this audit.

### 7. Medium — Desktop homepage has unused space and ineffective card breakpoints

Evidence: `src/app/index.tsx:93` caps the homepage at half the available scene width. At 1280 px the visible cards were about 444 px wide despite the permanent sidebar. Prayer/office/novena wrappers at lines 231, 247, and 253 specify inline `width: "100%"` alongside `md:w-1/2`; inspected desktop cards remained full-width. The intended two-column layout does not take effect.

Action: replace conflicting inline widths with one responsive sizing mechanism. Use a bounded content width appropriate to the dashboard, with secondary prayer cards in two columns on desktop. Keep long-form reading widths governed separately.

### 8. Medium — Angelus illustration delays access to the prayer on phones

Evidence: `src/app/devocionario/dia/angelus.tsx:12` places a fixed 400 px illustration before the rubric and text. At phone width the prayer begins near the bottom of the first screen. This is a usability judgement, not a rendering failure.

Action: make illustration height responsive or collapsible, or provide a direct “Ir para a oração” action. Preserve the artwork while reducing repeated scrolling for daily use.

### 9. Medium — UI tests can pass when required content is absent

Evidence: `e2e/landing.spec.tsx` wraps many expectations in `if (count > 0)`. Removing a rosary, morning prayer, Angelus, or Mass card can skip the assertion. The branding/responsive tests also expect `#tesouro-dos-fiis`, which is absent from the inspected homepage, and the date expectation differs from the current split weekday/date presentation. The E2E suite was inspected, not executed.

Action: make expected content mandatory at fixed dates; assert absence only when absence is expected. Refresh selectors to accessible names and add narrow-width reading, search keyboard cycles, and large-font checks. The current “responsive design and accessibility” test checks a title's visibility rather than accessibility.

## Additional observations

- **Shared data mutation:** `src/components/DirectoryList.tsx:73` sorts `page.content.headings` in place during render. These objects come from the shared catalog; this changes ordering seen by subsequent search/other consumers. Use a non-mutating selection or sorting operation.
- **Module coupling:** Metro reports cycles between theme, calendar/edition providers, SettingsControls, Headings, and Typography. Move font/type tokens into a dependency-free module and separate settings UI from provider state. No cycle-induced crash was reproduced.
- **Long content rendering risk:** PageWrapper uses ScrollView, directory results use map, and native Language mounts both language trees. Large documents may incur significant mounting/layout costs. Profile the longest real pages on a lower-end device before choosing section virtualization; preserve anchors and bilingual alignment.
- **Telemetry cost needs measurement:** Root PostHog configuration enables session replay and touch capture. Compare release startup, scroll, memory, and network use with replay enabled/disabled before deciding on sampling. No quantified telemetry slowdown was established.

## What is already working well

The sepia/serif visual identity is coherent and appropriate to the content. Shared semantic colors and liturgical palettes provide a useful foundation. The drawer has virtualized rows, web search results use FlatList, queries are debounced, and calendar construction uses a bounded LRU store.

Calendar benchmark medians: **5.066 ms** for the simulated app workload (two years plus repeated reads and novena queries), **0.138 ms** for the hot workload, and **107.432 ms** for the cold workload (39 year builds). These are different workloads, not per-year or per-screen timings. Calendar caching does not appear to be the first optimization target based on this evidence.

## Suggested delivery sequence

1. Fix keyboard cleanup, accessibility semantics, and shared heading-array mutation.
2. Separate navigation metadata from search data and measure release cold search/startup.
3. Add narrow-width language selection, responsive illustration sizing, and desktop card sizing.
4. Separate clock/day contexts and remove module cycles; profile before larger rendering changes.
5. Update UI tests and establish production/native performance baselines.
