# tasks.md — Test Coverage for ToDoList Components

Work through top to bottom. Tick each item when done, and run the tests after every component.

## Step 1: Verify / prepare test setup

- [x] Delete leftover demo tests/components if present (e.g. HelloWorld). No `tests/` directory existed — created `tests/components/`.
- [x] Add scripts `"test": "vitest run"` and `"test:coverage": "vitest run --coverage"` to `package.json` (added alongside the existing `test:unit`).
- [x] **@vitest/coverage-v8 was NOT installed** — installed `@vitest/coverage-v8@4.1.12` as a dev dependency (pinned to the installed Vitest 4.x to avoid the npm arborist bug hit by the latest 5.x).
- [x] Vitest picks up tests in `tests/components/` (default `**/*.spec.ts` glob).
- [x] Added coverage config to `vitest.config.ts`: provider `'v8'`, `include: ['src/components/**/*.vue']`, 100% thresholds for statements, branches, functions, lines.

## Step 2: TodoInput tests (5 tests)

- [x] Render test
- [x] Typing + submit emits `add-todo` with trimmed text
- [x] Input is cleared after submit
- [x] Empty and whitespace-only submit emits nothing
- [x] Button disabled state (empty vs filled)

## Step 3: TodoItem tests (5 tests)

- [x] Renders text
- [x] Checkbox checked state matches `completed`
- [x] `completed` class on text
- [x] Toggle emits id
- [x] Delete emits id

## Step 4: TodoList tests (12 tests)

- [x] Empty state
- [x] Add todo
- [x] Delete todo
- [x] Toggle todo
- [x] Toggle non-existent todo (covers the `if (todo)` false branch)
- [x] Filter all (including counts)
- [x] Filter active (including count)
- [x] Filter completed (including count)
- [x] "No results" message per filter
- [x] Active count singular/plural
- [x] Clear-completed button only visible when there are completed todos
- [x] Clear-completed removes them

## Step 5: Coverage gaps

- [x] Ran `npm run test:coverage`
- [x] No uncovered lines/branches — 100% on first run
- [x] No gaps to fill

## Step 6: Final check

- [x] `npm run test` is all green (22/22, stable across 3 runs)
- [x] `npm run test:coverage` shows 100% for statements, branches, functions, lines (per-component verified via coverage-final.json)
