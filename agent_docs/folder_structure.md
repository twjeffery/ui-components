# Folder Structure Reference

Complete directory structure and organization of the UI Components monorepo.

---

## High-Level Overview

```
ui-components/
├── libs/              # Component libraries
│   ├── web-components/    # Svelte → Web Components
│   ├── react-components/  # React wrappers
│   ├── angular-components/# Angular wrappers
│   └── common/            # Shared types
├── apps/              # Applications
│   ├── prs/               # PR testing playgrounds
│   └── playground/        # Development playgrounds
├── docs/              # Documentation
├── tools/             # Build tools and scripts
└── agent_docs/        # Detailed development guides
```

---

## Libraries Directory (`libs/`)

### Web Components (`libs/web-components/`)

The source of truth for all UI components. Svelte components compile to web components.

```
libs/web-components/
├── src/
│   ├── components/               # All UI components
│   │   ├── button/
│   │   │   ├── Button.svelte    # Main component
│   │   │   ├── Button.spec.ts   # Unit tests
│   │   │   ├── Button.html-data.json # VS Code IntelliSense (optional)
│   │   │   └── doc.md           # Documentation (optional)
│   │   ├── input/
│   │   │   ├── Input.svelte
│   │   │   └── Input.spec.ts
│   │   ├── date-picker/
│   │   │   ├── DatePicker.svelte
│   │   │   └── DatePicker.spec.ts
│   │   └── ... (other components)
│   │
│   ├── assets/                   # Shared assets
│   │   └── css/
│   │       ├── variables.css     # Design tokens (CSS custom properties)
│   │       ├── components.css    # Component-specific global styles
│   │       ├── fonts.css         # Typography
│   │       └── reset.css         # CSS reset
│   │
│   ├── common/                   # Shared utilities
│   │   ├── utils.ts              # Utility functions (e.g., dispatch)
│   │   └── types.ts              # Internal types
│   │
│   └── index.ts                  # Public exports
│
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Library documentation
```

**Key Files:**
- **`Button.svelte`**: Component implementation with `<svelte:options customElement="goa-button" />`
- **`Button.spec.ts`**: Vitest tests using `@testing-library/svelte`
- **`index.ts`**: Exports all components: `export { default as GoaButton } from './components/button/Button.svelte'`
- **`variables.css`**: Design tokens from `@abgov/design-tokens`

---

### React Components (`libs/react-components/`)

React wrappers for web components.

```
libs/react-components/
├── src/
│   ├── lib/                      # React components
│   │   ├── button/
│   │   │   ├── button.tsx        # GoabButton wrapper
│   │   │   ├── button.spec.tsx   # Unit tests
│   │   │   └── button.browser.spec.tsx # Playwright tests (optional)
│   │   ├── input/
│   │   │   ├── input.tsx
│   │   │   └── input.spec.tsx
│   │   ├── date-picker/
│   │   │   ├── date-picker.tsx
│   │   │   └── date-picker.spec.tsx
│   │   └── ... (other wrappers)
│   │
│   └── index.ts                  # Public exports
│
├── package.json
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md
```

**Key Files:**
- **`button.tsx`**: React wrapper that wraps `<goa-button>`, handles props/events
- **`button.spec.tsx`**: Vitest tests using `@testing-library/react`
- **`button.browser.spec.tsx`**: Playwright browser tests (when needed)
- **`index.ts`**: Exports: `export * from './lib/button/button'`

---

### Angular Components (`libs/angular-components/`)

Angular wrappers for web components.

```
libs/angular-components/
├── src/
│   ├── lib/
│   │   └── components/           # Angular components
│   │       ├── button/
│   │       │   ├── button.ts     # GoabButtonComponent
│   │       │   └── button.spec.ts # Jest tests
│   │       ├── input/
│   │       │   ├── input.ts
│   │       │   └── input.spec.ts
│   │       ├── date-picker/
│   │       │   ├── date-picker.ts
│   │       │   └── date-picker.spec.ts
│   │       └── ... (other wrappers)
│   │
│   └── index.ts                  # Public exports
│
├── package.json
├── ng-package.json               # Angular packaging configuration
├── tsconfig.json
└── README.md
```

**Key Files:**
- **`button.ts`**: Angular component with `@Component` decorator, selector `goab-button`
- **`button.spec.ts`**: Jest tests using `@testing-library/angular`
- **`index.ts`**: Exports: `export * from './lib/components/button/button'`

---

### Common (`libs/common/`)

Shared TypeScript types and utilities used across all three frameworks.

```
libs/common/
├── src/
│   ├── lib/
│   │   └── common.ts             # Shared types
│   └── index.ts                  # Public exports
│
├── package.json
└── tsconfig.json
```

**`common.ts` Example:**
```typescript
// Prop types
export type GoabButtonType = "primary" | "secondary" | "tertiary";
export type GoabIconType = "add" | "remove" | "edit" | "close";
export type GoabSpacing = "0" | "1" | "2" | "3" | "m" | "l" | "xl";

// Constants
export const BUTTON_TYPES = ["primary", "secondary", "tertiary"] as const;
```

---

## Applications Directory (`apps/`)

### PR Testing Playgrounds (`apps/prs/`)

Shared testing playgrounds where PR test pages are committed.

```
apps/prs/
├── react/                        # React playground (primary)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── _TEMPLATE.tsx    # Template for new test pages
│   │   │   ├── bugs/            # Bug fix test pages
│   │   │   │   ├── bug2878.tsx  # Example: Bug #2878
│   │   │   │   ├── bug2922.tsx
│   │   │   │   └── ...
│   │   │   └── features/        # Feature test pages
│   │   │       ├── feat1234.tsx
│   │   │       └── ...
│   │   ├── main.tsx             # Route configuration
│   │   ├── app.tsx              # App shell with side menu
│   │   └── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── angular/                      # Angular playground
│   ├── src/
│   │   ├── app/
│   │   │   ├── bugs/
│   │   │   └── features/
│   │   └── main.ts
│   └── package.json
│
└── web/                          # Web components playground
    ├── src/
    │   ├── bugs/
    │   └── features/
    └── package.json
```

**Key Files:**
- **`_TEMPLATE.tsx`**: Template for creating new test pages
- **`main.tsx`**: Route definitions - add new routes here
- **`app.tsx`**: Side menu links - add navigation links here
- **`bugs/bug{N}.tsx`**: Bug fix test pages (committed with PR)
- **`features/feat{N}.tsx`**: Feature test pages (committed with PR)

---

### Development Playgrounds (`playground/`)

Personal playgrounds for local development (not committed to git).

```
playground/
├── react/
│   ├── src/
│   └── package.json
├── angular/
│   ├── src/
│   └── package.json
└── web/
    ├── src/
    └── package.json
```

**Note:** These are typically `.gitignore`d for quick local experimentation.

---

## Documentation Directory (`docs/`)

```
docs/
├── components/                   # Component documentation
│   ├── button.md
│   ├── input.md
│   └── ...
├── guides/                       # Developer guides
│   ├── getting-started.md
│   ├── contributing.md
│   └── ...
└── api/                          # API references
```

---

## Agent Documentation (`agent_docs/`)

Detailed guides for AI-assisted development (see CLAUDE.md).

```
agent_docs/
├── component_workflows.md        # Updating/adding components
├── pr_testing_guide.md          # PR playground usage
├── testing.md                   # Testing strategies
├── naming_conventions.md        # Naming standards
├── common_issues.md             # Troubleshooting
└── folder_structure.md          # This file
```

---

## Build Tools (`tools/`)

```
tools/
├── scripts/                      # Build and automation scripts
│   ├── build.sh
│   └── test.sh
└── generators/                   # Code generators (if any)
```

---

## Configuration Files (Root)

```
ui-components/
├── package.json                  # Root package.json (monorepo workspace)
├── package-lock.json
├── nx.json                       # Nx configuration
├── tsconfig.base.json            # Base TypeScript config
├── .gitignore
├── .prettierrc                   # Prettier configuration
├── .eslintrc.json                # ESLint configuration
├── vitest.config.ts              # Vitest configuration (if global)
├── playwright.config.ts          # Playwright configuration
├── README.md                     # Project README
└── CLAUDE.md                     # AI assistant guide
```

---

## Component File Example

### Complete Web Component Structure

```
libs/web-components/src/components/button/
├── Button.svelte                 # Main implementation
├── Button.spec.ts                # Unit tests
├── Button.html-data.json         # VS Code IntelliSense (optional)
└── doc.md                        # Component documentation (optional)
```

**Button.svelte:**
```svelte
<svelte:options customElement="goa-button" />

<script lang="ts">
  import type { GoabButtonType } from '@abgov/common';
  import { dispatch } from '../../common/utils';

  export let type: GoabButtonType = 'primary';
  export let disabled: string | undefined = undefined;

  $: isDisabled = disabled === 'true';

  function handleClick() {
    if (!isDisabled) {
      dispatch('click', { type });
    }
  }
</script>

<button
  class="goa-button goa-button--{type}"
  disabled={isDisabled}
  on:click={handleClick}
>
  <slot />
</button>

<style>
  @import "../../assets/css/variables.css";

  .goa-button {
    height: var(--goa-button-height);
    padding: var(--goa-button-padding);
    background-color: var(--goa-color-primary);
    color: var(--goa-color-text-on-primary);
  }

  .goa-button--secondary {
    background-color: var(--goa-color-secondary);
  }
</style>
```

---

## Testing File Locations Summary

| Framework | Component | Test | Browser Test |
|-----------|-----------|------|--------------|
| Web Components | `libs/web-components/src/components/button/Button.svelte` | `Button.spec.ts` | N/A |
| React | `libs/react-components/src/lib/button/button.tsx` | `button.spec.tsx` | `button.browser.spec.tsx` |
| Angular | `libs/angular-components/src/lib/components/button/button.ts` | `button.spec.ts` | N/A |

---

## Import Path Examples

### From Libraries

```typescript
// Web Components
import { GoaButton } from '@abgov/web-components';

// React
import { GoabButton } from '@abgov/react-components';
import type { GoabButtonProps } from '@abgov/react-components';

// Angular
import { GoabButtonComponent } from '@abgov/angular-components';

// Common types
import type { GoabButtonType } from '@abgov/common';
```

### Internal Imports (within a library)

```typescript
// Web Components
import { dispatch } from '../../common/utils';
import type { InternalType } from '../../common/types';

// React
import { GoabButton } from '../button/button';

// Angular
import { GoabButtonComponent } from '../button/button';
```

---

## Build Output Locations

After running `npm run build`, compiled files appear in:

```
libs/web-components/dist/       # Built web components
libs/react-components/dist/     # Built React library
libs/angular-components/dist/   # Built Angular library
libs/common/dist/               # Built common types
```

These are what get published to npm or consumed by applications.

---

## Quick Navigation

**Need to:**
- **Update a component?** → `libs/web-components/src/components/[name]/`
- **Add tests?** → Same folder as component, `*.spec.ts` or `*.spec.tsx`
- **Create PR test page?** → `apps/prs/react/src/routes/bugs/` or `features/`
- **Update shared types?** → `libs/common/src/lib/common.ts`
- **Check design tokens?** → `libs/web-components/src/assets/css/variables.css`
- **Find troubleshooting help?** → `agent_docs/common_issues.md`
