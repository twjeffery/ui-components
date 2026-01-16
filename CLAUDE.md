# UI Components - Development Guide

Development guidance for the GoA Design System UI Components monorepo.

## Project Overview

This is a **monorepo** that provides UI components for Alberta government applications across three frameworks: Web Components (Svelte), React, and Angular. The project uses **Nx** for monorepo management and follows a **wrapper pattern** where Svelte is the single source of truth.

## Quick Reference

| Library | Location | Framework | Naming |
|---------|----------|-----------|--------|
| Web Components | `libs/web-components/` | Svelte | `goa-*` tags |
| React Wrappers | `libs/react-components/` | React | `Goab*` components |
| Angular Wrappers | `libs/angular-components/` | Angular | `goab-*` selectors |
| Shared Types | `libs/common/` | TypeScript | Types + utilities |

---

## Architecture: The Wrapper Pattern

**This is the most important concept in the codebase.**

```
┌─────────────────────────────────────────────────────────────────┐
│ Source of Truth                                                 │
│                                                                 │
│ libs/web-components/src/components/button/Button.svelte        │
│   - All logic, styling, and behavior                           │
│   - Compiles to <goa-button> custom element                    │
│   - Uses Svelte's customElement directive                      │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Framework Wrappers                                              │
│                                                                 │
│ React: libs/react-components/src/lib/button/button.tsx         │
│   - Wraps <goa-button> element                                 │
│   - Transforms React props → web component attributes          │
│   - Handles React-specific event binding                       │
│                                                                 │
│ Angular: libs/angular-components/src/lib/components/button/    │
│   - Wraps <goa-button> element                                 │
│   - Uses @Input/@Output decorators                             │
│   - Integrates with Angular forms (ControlValueAccessor)       │
└─────────────────────────────────────────────────────────────────┘
```

**Key insight:** Svelte components are the source of truth. When fixing bugs or adding features, start with the Svelte component first. The wrappers are thin layers that expose the web component to each framework.

---

## Core Development Principles

1. **Svelte is the source of truth** - Fix bugs in Svelte first, then update wrappers
2. **Design tokens first** - Use design tokens from `@abgov/design-tokens` (CSS custom properties in `libs/web-components/src/assets/css/`). Avoid hardcoding colors, spacing, or typography
3. **WCAG 2.2 AA compliance** - Accessibility is mandatory, not optional
4. **All three frameworks** - Every component change needs corresponding React + Angular wrapper updates
5. **Tests required** - No component changes without corresponding test updates
6. **Backward compatibility** - Don't break existing implementations

---

## Package Manager & Commands

- **Package manager:** `npm` (not yarn, pnpm, or bun)
- **Build all libraries:** `npm run build`
- **Full PR validation:** `npm run test:pr` (builds + runs all tests)
- **Run playgrounds:** `npm run serve:prs:react`, `npm run serve:prs:angular`, `npm run serve:prs:web`

---

## Detailed Documentation

For step-by-step workflows, testing strategies, and troubleshooting:

- **Component Workflows:** `agent_docs/component_workflows.md` - Updating existing components and adding new ones
- **PR Testing Guide:** `agent_docs/pr_testing_guide.md` - How to use the PR playground in `apps/prs/`
- **Testing:** `agent_docs/testing.md` - Test commands, frameworks, and strategies
- **Naming Conventions:** `agent_docs/naming_conventions.md` - File, component, and prop naming rules
- **Common Issues:** `agent_docs/common_issues.md` - Troubleshooting guide
- **Folder Structure:** `agent_docs/folder_structure.md` - Complete directory reference

These documents provide detailed guidance for specific tasks. Read them when relevant to your current work.
