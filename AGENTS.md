# AGENTS.md — ToDoList Vue 3 App

## Project Overview

A Todo List single-page application built with Vue 3 and TypeScript. The app consists of three components:

- **TodoInput.vue** (`src/components/TodoInput.vue`) — Text input field with a submit button. Emits `add-todo` with the trimmed text and clears the field after submit. Ignores empty or whitespace-only input. The submit button is disabled when the input is empty.
- **TodoItem.vue** (`src/components/TodoItem.vue`) — Renders a single todo with a checkbox, text label, and delete button. Emits `toggle` and `delete` events with the todo `id`. Completed todos receive a `completed` CSS class on the text element.
- **TodoList.vue** (`src/components/TodoList.vue`) — Main container component. Manages state for adding, deleting, and toggling todos. Provides filters (all / active / completed), a "clear completed" action, an empty state, a "no results" state, and an active-count display (singular "taak" / plural "taken").

## Tech Stack

- **Framework:** Vue 3 (`<script setup lang="ts">`)
- **Build tool:** Vite
- **Test runner:** Vitest
- **Test utilities:** @vue/test-utils (`shallowMount`)
- **Test environment:** jsdom
- **Coverage:** @vitest/coverage-v8

## Test Conventions

- **Location:** `tests/components/ComponentName.spec.ts` (one file per component)
- **Structure:** `describe` block per component, `it` blocks per test case
- **Mounting:** Always use `shallowMount` (never `mount`) — child components are auto-stubbed
- **Selectors:** Always use `data-test` attributes — never CSS classes or tag names
- **Pattern:** AAA (Arrange / Act / Assert) with `// Arrange`, `// Act`, `// Assert` comments
- **Async:** Always `await` async interactions (`await input.setValue(...)`, `await button.trigger('click')`)
- **Names:** Test names describe WHAT is being tested, not HOW
- **Behavior:** Test behavior (emitted events, rendered output) — not implementation details
- **Snapshots:** No snapshot tests as a substitute for explicit assertions

## Acceptance Criteria

- All three components have test files in `tests/components/` (TodoInput.spec.ts, TodoItem.spec.ts, TodoList.spec.ts)
- TodoInput has 4-5 tests covering all functionality
- TodoItem has 5-6 tests covering all props, events and conditional rendering
- TodoList has 10-12 tests covering all state management and filtering
- Every test follows the AAA pattern (Arrange, Act, Assert) with clear comments marking each phase
- All tests use `shallowMount` (not `mount`)
- All tests use `data-test` attributes for selectors
- All async interactions use `await` (e.g. `await input.setValue(...)`, `await button.trigger('click')`)
- Test names are descriptive and say WHAT is being tested
- Edge cases are covered (empty input, whitespace-only input, etc.)
- 100% code coverage for all three components
- All tests pass (green) and are reliable (not flaky)

### shallowMount notes for TodoList.spec.ts

Child components are stubbed by `shallowMount`, so `data-test` selectors inside TodoInput or TodoItem are **not** available. Use:
- `findComponent(TodoInput)` / `findAllComponents(TodoItem)` to locate child components
- `.props()` to check props passed to children
- `.vm.$emit('add-todo', 'text')` / `.vm.$emit('toggle', id)` / `.vm.$emit('delete', id)` to trigger child events

Use `data-test` selectors for elements that belong to TodoList itself (filters, empty state, no-results, footer, clear-completed).

## Rules

- **Do NOT modify component files** — only write test files
- **No snapshot tests** as a substitute for explicit assertions
- **Every test must have meaningful assertions** — no tests that just call methods without verifying results

## Definition of Done

- Coverage thresholds (100% statements, branches, functions, lines) configured in vitest config
- All tests pass (`npm run test` is green)
- All tests are non-flaky (reliable on repeated runs)
- Coverage report (`npm run test:coverage`) shows 100% for all three components

## Commands

- `npm run test` — run tests once (vitest run)
- `npm run test:coverage` — run tests with coverage report
