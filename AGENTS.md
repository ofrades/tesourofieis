# Agent Guidelines for Tesouro dos Fiéis

This document provides comprehensive guidelines for AI agents working on the Tesouro dos Fiéis project - a traditional Catholic liturgical application built with Expo/React Native.

## Project Context

Tesouro dos Fiéis is a universal Catholic liturgical application that provides:

- Traditional Roman Missal content
- Devotional prayers and novenas
- Sacramental rituals
- Faith documents (catechism)
- Complete liturgical calendar system
- Cross-platform support (iOS, Android, Web)

**Important**: This application serves sacred Catholic traditions. All work must be approached with reverence, accuracy, and cultural sensitivity.

## Build/Lint/Test Commands

### Core Development

- `bun run check` - Type check entire project
- `bun run lint` - Lint all code with oxlint + oxfmt
- `bun run test` - Run complete test suite
- `bun run dev` - Start development server
- `bun run prebuild` - Build search index

### Platform-Specific Development

- `bun run dev:android` - Android development
- `bun run dev:ios` - iOS development
- `bun run build:web` - Web static export

### Testing

- **Calendar Tests** (Critical): `bun test lib/tests/calendar/`
- **Single Test**: `bun test lib/tests/calendar/2024.test.ts`
- **Coverage**: `bun test --coverage`
- **Benchmarks**: `bun lib/tests/bench/calendar.perf.ts`

### Deployment

- `bun run deploy` - EAS build for all platforms
- `bun run update` - OTA updates via Expo

## Code Style Guidelines

### Formatting (oxfmt)

- Prettier-compatible formatting via `.oxfmtrc.json` (2-space indent default)
- `bun run fmt` to format, `bun run fmt:check` to verify

### Linting (oxlint)

- oxlint with `eslint`, `oxc`, `react` (incl. react-hooks), `unicorn`, `typescript`, `import` plugins
- Categories: correctness/suspicious/perf at warn (`.oxlintrc.json`)
- Custom **anti-slop** plugin (`tools/oxlint/anti-slop/`) enforces 10 rules as errors:
  no-chained-type-assertions, no-conditional-empty-object-spread,
  no-known-value-widening, no-object-parameters, no-runtime-typeof,
  no-shape-in-symbol-names, no-unknown-parameters, no-unknown-type-aliases,
  no-unsafe-dictionary-type, no-widen-then-assert
- Expo-specific rules ported to the local **expo** plugin (`tools/oxlint/expo/`) as errors:
  no-env-var-destructuring, no-dynamic-env-var, use-dom-exports

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess: true`
- `strictNullChecks: true`
- Target ES2022, moduleResolution: "Bundler"

### Naming Conventions

- PascalCase for components and types
- camelCase for variables/functions
- Follow existing patterns in codebase

### Error Handling

- Use TypeScript strict null checks
- Prefer explicit error handling over assertions

### Imports

- Match the import order used in neighboring files (no auto-organizer)
- Use workspace:\* for internal packages

## Project Architecture

### Technology Stack

- **Expo SDK 56** - Universal React Native platform
- **React 19** - Latest React with concurrent features
- **TypeScript 6** - Strict type safety
- **NativeWind 5** - Tailwind CSS for React Native
- **Expo Router** - File-based routing
- **Bun test** - Testing framework

### Directory Structure

```
src/
├── app/                    # Expo Router pages
│   ├── missal/            # Roman Missal content
│   ├── devocionario/      # Devotional prayers
│   ├── ritual/            # Sacramental rituals
│   └── fe/                # Faith documents
├── components/            # Reusable UI components
├── providers/             # React Context providers
└── services/              # App services

lib/                       # Core liturgical logic
├── calendar.ts           # Liturgical calendar system
├── observances.ts        # Feast days and seasons
└── tests/                # Calendar calculation tests
```

## Development Guidelines

### Liturgical Content Standards

1. **Accuracy is Paramount**: All liturgical content must be verified against traditional Catholic sources
2. **Respect Traditional Rankings**: Follow proper liturgical precedence and classifications
3. **Authentic Sources**: Use only approved traditional Catholic texts
4. **Reverent Presentation**: Maintain dignified and respectful content presentation

### Calendar System (Critical)

- The liturgical calendar in `lib/` is the heart of the application
- **Always test calendar changes** with the comprehensive test suite
- Verify calculations against official liturgical calendars
- Handle edge cases (leap years, timezone changes, competing observances)
- Support years from 2024 onwards with accurate computations

### Cross-Platform Development

- Code must work identically on iOS, Android, and Web
- Use Expo Router for universal navigation
- Test responsive design on all screen sizes
- Ensure offline functionality for essential content
- Optimize performance for mobile devices

### Component Development

- Create reusable components in `src/components/`
- Use TypeScript interfaces for all props
- Follow NativeWind styling patterns
- Implement proper accessibility features
- Maintain consistent design language

## Testing Requirements

### Calendar Tests (Absolutely Critical)

- Test all liturgical date calculations
- Verify moveable feast calculations (Easter, Pentecostes, etc.)
- Test liturgical season transitions
- Validate observance rankings and precedence
- Check timezone handling and edge cases

### Component Tests

- Test rendering on all platforms
- Verify responsive behavior
- Test user interactions
- Validate accessibility features

### Integration Tests

- Test navigation flows
- Verify provider interactions
- Test search functionality
- Validate offline capabilities

## Content Management

### Adding New Liturgical Content

1. Research traditional sources and verify authenticity
2. Create appropriate route in `src/app/` directory structure
3. Follow existing component patterns and styling
4. Add proper navigation and metadata
5. Test on all platforms
6. Verify offline availability if applicable

### Modifying Calendar Logic

1. Update core logic in `lib/calendar.ts` or related files
2. Add comprehensive test coverage for changes
3. Verify against multiple liturgical calendar sources
4. Test edge cases and boundary conditions
5. Update documentation and comments

<!-- effect-solutions:start -->

## Effect Best Practices

**IMPORTANT:** Always consult effect-solutions before writing Effect code.

1. Run `effect-solutions list` to see available guides
2. Run `effect-solutions show <topic>...` for relevant patterns (supports multiple topics)
3. Search `~/.local/share/effect-solutions/effect` for real implementations

Topics: quick-start, project-setup, tsconfig, basics, services-and-layers, data-modeling, error-handling, config, testing, cli.

Never guess at Effect patterns - check the guide first.

## Local Effect Source

The Effect v4 repository is cloned to `~/.local/share/effect-solutions/effect` for reference.
Use this to explore APIs, find usage examples, and understand implementation
details when the documentation isn't enough.

<!-- effect-solutions:end -->

## AI Assistant Guidelines

When working on this project, always remember:

1. **Sacred Context**: This app serves Catholic liturgical traditions - approach with reverence and accuracy
2. **Test Calendar Changes**: Always run the full test suite for any calendar-related modifications
3. **Cross-Platform First**: Consider iOS, Android, and Web in all development decisions
4. **Performance Matters**: Optimize for mobile devices and slower connections
5. **Accessibility Required**: Implement proper accessibility features for all users
6. **TypeScript Strict**: Use proper typing and avoid any types
7. **Cultural Sensitivity**: Understand the religious significance of the content

Remember: This application preserves and shares sacred Catholic traditions. Every line of code should reflect the dignity and importance of this mission.

## Commit Policy

Commit proactively - do not wait to be asked:

1. **Before running scripts** that mutate files (migrations, generators,
   bulk edits), so a clean rollback point always exists.
2. **When a stage/phase finishes** (e.g. after a refactor step is proven
   by tests/snapshots).
3. **Whenever results will need comparison** later (snapshots, hashes,
   before/after benchmarks).

Stage only files related to the work at hand; never commit unrelated
dirty files.

## Work tracking

Open work lives in BB Tasks under the **TES** project: `bb tasks list --project
TES`. Claim a task before editing (`bb tasks update TES-3 --status in_progress`
and `bb tasks attach TES-3`), work one at a time, and hand implementation off
through `in_review`; owner review is not an agent completion claim. The
operating conventions are in
[docs/agents/issue-tracker.md](docs/agents/issue-tracker.md).

The Obsidian vault tracker at `~/Work/ofrades/notes/tesourofieis/issues/` was
retired on 2026-11-10; its open issues were imported into BB Tasks and the
markdown files are frozen history. Do not edit them.

GitHub Issues is enabled on this repository but is not the tracker; do not open
issues there. If someone files one, create a BB task and close the GitHub issue
with a pointer.

## Agent skills

### Issue tracker

Open work lives in BB Tasks under the TES project. See
`docs/agents/issue-tracker.md`.

### Triage labels

Triage roles are BB Tasks labels (`needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`). See
`docs/agents/triage-labels.md`.
