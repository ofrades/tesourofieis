# Tesouro dos Fiéis

<p align="center">
  <samp>
    <img width="50px" src="./assets/images/icon.png" />
  </samp>
</p>

<hr>

## Overview

Tesouro dos Fiéis is a universal Catholic liturgical application that provides:

- Traditional Roman Missal content
- Devotional prayers and novenas
- Sacramental rituals
- Faith documents (catechism)
- Complete liturgical calendar system
- Cross-platform support (iOS, Android, Web)

## Work tracking

Open work is tracked in BB Tasks under the **TES** project:
`bb tasks list --project TES`. See
[docs/agents/issue-tracker.md](docs/agents/issue-tracker.md). The Obsidian vault
tracker was retired on 2026-11-10; its files are frozen history.

## Technology Stack

- **Expo SDK 56** - Universal React Native platform
- **React 19** - Latest React with concurrent features
- **TypeScript 6** - Strict type safety
- **NativeWind 5** - Tailwind CSS for React Native
- **Expo Router** - File-based routing
- **Bun test** - Testing framework
- **oxlint + oxfmt** - Code quality and formatting

## Getting Started

```bash
bun install
bun run hooks:install
bun run dev
```

The installed pre-push hook runs lint, typecheck, and tests before every push.

### Platform-Specific Development

```bash
# Android
bun run dev:android

# iOS
bun run dev:ios

# Web
bun run build:web
```

## Build, Lint & Test Commands

### Core Development

```bash
bun run check        # Type check entire project
bun run lint         # Lint all code with oxlint + oxfmt
bun run test         # Run complete test suite
bun run dev          # Start development server
bun run prebuild # Build search index
```

### Testing

```bash
# Calendar tests (critical)
bun test lib/tests/calendar/

# Single test file
bun test lib/tests/calendar/2024.test.ts

# Coverage report
bun test --coverage

# Benchmarks
bun lib/tests/bench/calendar.perf.ts
```

### Deployment

```bash
# Build for all platforms
bun run deploy

# OTA updates via Expo
bun run update
```

## Code Style Guidelines

### Formatting (oxfmt)

- Prettier-compatible formatting via `.oxfmtrc.json`
- `bun run fmt` to format, `bun run fmt:check` to verify

### Linting (oxlint)

- oxlint with `eslint`, `oxc`, `react` (incl. react-hooks), `unicorn`, `typescript`, `import` plugins
- correctness/suspicious/perf categories at warn (`.oxlintrc.json`)
- Custom **anti-slop** plugin (`tools/oxlint/anti-slop/`) enforces 10 rules as errors
- Expo-specific rules ported to the local **expo** plugin (`tools/oxlint/expo/`) as errors:
  no-env-var-destructuring, no-dynamic-env-var, use-dom-exports

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess: true`
- `strictNullChecks: true`
- Target ES2022, moduleResolution: "Bundler"

### Naming Conventions

- PascalCase for components and types
- camelCase for variables and functions
- Follow existing patterns in codebase

### Error Handling

- Use TypeScript strict null checks
- Prefer explicit error handling over assertions

### Imports

- Match the import order used in neighboring files (no auto-organizer)
- Use `workspace:*` for internal packages

## Project Architecture

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

.githooks/
└── pre-push              # Local lint, typecheck, and test gate

assets/
├── fonts/                # Cardo, DM Serif fonts
└── images/               # Icons, splash screens
```

## Development Guidelines

### Liturgical Content Standards

1. **Accuracy is Paramount** - All liturgical content must be verified against traditional Catholic sources
2. **Respect Traditional Rankings** - Follow proper liturgical precedence and classifications
3. **Authentic Sources** - Use only approved traditional Catholic texts
4. **Reverent Presentation** - Maintain dignified and respectful content presentation

### Calendar System (Critical)

The liturgical calendar in `lib/` is the heart of the application:

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
- Verify moveable feast calculations (Easter, Pentecost, etc.)
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

## Android Development Setup (Arch Linux)

Install the small set of system packages that cannot be managed by mise:

```bash
yay -S --needed mise android-sdk android-sdk-cmdline-tools-latest android-sdk-platform-tools android-emulator
```

Make the shared Arch SDK writable by the Android SDK user group (do not make it world-writable):

```bash
sudo groupadd -f android-sdk
sudo usermod -aG android-sdk "$USER"
sudo chgrp -R android-sdk /opt/android-sdk
sudo chmod -R g+rwX /opt/android-sdk
find /opt/android-sdk -type d -exec sudo chmod g+s {} +
```

Log out and back in once so the new group is active. Then activate mise after any other PATH changes in your shell and bootstrap the repository:

```bash
mise activate bash >> ~/.bashrc
mise trust
mise run setup
```

Install the SDK components reported by `mise run doctor` if the Arch packages did not provide them:

```bash
sdkmanager --licenses
sdkmanager \
  "platforms;android-36" \
  "build-tools;36.0.0" \
  "cmake;3.22.1" \
  "ndk;27.1.12297006" \
  "platform-tools" \
  "emulator" \
  "system-images;android-36;google_apis;x86_64"
mise run doctor
```

Run the local Android app with:

```bash
bun run android
```

Local builds use `com.tesourofieis.app.dev`, so they can coexist with the production app and never collide with its signing key. The native `android/` and `ios/` directories are generated by Expo and are intentionally not committed.

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
