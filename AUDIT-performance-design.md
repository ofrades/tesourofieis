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

## Remediation completed on 2026-10-03

The prioritized implementation work above is now committed locally:

- Search keyboard listeners use matching capture options. Menu/search/filter/clear actions have accessible names; shared headings expose heading roles and levels. Hidden native language content is excluded from accessibility traversal.
- Navigation uses a generated 304 KB catalog with indexed parent relationships. Full document/search data loads on demand. The index ships serialized and uses MiniSearch's supported `loadJSONAsync` API, yielding between restoration batches. Pending queries are cancelled when superseded, and failed chunk loading offers a tested retry action. This preserves bundled offline native search.
- Phone-width web reading honors the language preference and offers labeled Latim/Português buttons, with approximately 336 px text columns at the inspected viewport. Desktop retains paired columns. The Angelus illustration is shorter on phones, and desktop secondary cards now occupy two columns.
- Web renders readable fallback text while fonts load, and font failure no longer replaces the application with a restart message. Native still waits for the normal font load but continues if it fails.
- Theme subscribers use a stable day context, so minute clock changes no longer invalidate them through the calendar context. Upcoming novena scans use date keys instead of parsing a whole year's dates every minute. Edition settings UI and typography tokens were separated from provider dependencies to remove the observed module cycles.
- Web route splitting is enabled. The intermediate export after search isolation still had a 15 MB full-route entry bundle; the final homepage loads approximately **8.47 MB of initial JavaScript total**, including shared/runtime/layout/route chunks. The **5.16 MB search chunk** is separate. Figures are uncompressed exported bytes, not network transfer sizes or measured launch-time gains. This uses the platform-specific route splitting supported by [Expo Router](https://docs.expo.dev/versions/v55.0.0/sdk/router/).
- Static exports now contain the actual prayer text. The initial browser calendar clock matches the exported clock snapshot, then refreshes after hydration. The office recommendation uses the same clock, preventing time-dependent hydration errors. The snapshot preserves local clock fields for consistent initial rendering across browser timezones.
- Directory rendering no longer sorts shared heading arrays. UI tests now require expected content rather than skipping assertions when it is absent.

Validation: **131 core tests**, including all calendar snapshots, and **9 production browser tests** pass. Browser tests cover navigation, repeated shortcuts, language switching, genuinely blocked font requests in a fresh browser context, JavaScript-disabled reading, and failed-search-chunk retry. The normal browser flows also assert that no uncaught page errors occur. Type checking passes. Web and Android bundle exports succeed. The web export remains free of native bundles and source maps.

The asynchronous search change improves scheduling rather than promising a shorter total wait: a fresh Bun measurement completed in approximately 212 ms with 16 timer ticks during restoration; the longest measured timer gap was about 92 ms. Parsing/batch work still has room for improvement on lower-end devices. Initial JavaScript remains substantial at 8.47 MB, so further shared-bundle profiling is warranted.

Native interaction verification remains incomplete: the available Android emulator failed to boot on two attempts, and iOS simulators are unavailable on this Linux host. Android export verifies bundling, not device behavior. Low-end release profiling, longest-document rendering, telemetry overhead/sampling, and comprehensive contrast checks remain follow-up work requiring measurements. Telemetry configuration was preserved. Nothing was deployed.
