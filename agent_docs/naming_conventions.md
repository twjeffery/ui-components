# Naming Conventions

Comprehensive naming standards for files, components, props, and attributes across all three frameworks.

---

## Component Naming

### Web Components (Svelte)

| Element | Convention | Example |
|---------|-----------|---------|
| Tag name | `goa-{name}` (kebab-case) | `<goa-button>` |
| File name | `{Name}.svelte` (PascalCase) | `Button.svelte` |
| Component class | `{Name}` (PascalCase) | `GoaButton` |
| Multi-word tags | `goa-{word}-{word}` | `<goa-date-picker>` |
| Multi-word files | `{Word}{Word}.svelte` | `DatePicker.svelte` |

**Example:**
```
libs/web-components/src/components/button/Button.svelte
→ Compiles to: <goa-button>
```

### React

| Element | Convention | Example |
|---------|-----------|---------|
| Component name | `Goab{Name}` (PascalCase) | `GoabButton` |
| File name | `{name}.tsx` (kebab-case) | `button.tsx` |
| Multi-word component | `Goab{Word}{Word}` | `GoabDatePicker` |
| Multi-word file | `{word}-{word}.tsx` | `date-picker.tsx` |

**Example:**
```
libs/react-components/src/lib/button/button.tsx
→ Exports: GoabButton
```

### Angular

| Element | Convention | Example |
|---------|-----------|---------|
| Selector | `goab-{name}` (kebab-case) | `<goab-button>` |
| Component class | `Goab{Name}Component` (PascalCase) | `GoabButtonComponent` |
| File name | `{name}.ts` (kebab-case) | `button.ts` |
| Multi-word selector | `goab-{word}-{word}` | `<goab-date-picker>` |
| Multi-word class | `Goab{Word}{Word}Component` | `GoabDatePickerComponent` |
| Multi-word file | `{word}-{word}.ts` | `date-picker.ts` |

**Example:**
```
libs/angular-components/src/lib/components/button/button.ts
→ Selector: goab-button
→ Class: GoabButtonComponent
```

---

## Props and Attributes

### Naming Convention by Framework

| Framework | Convention | Example |
|-----------|-----------|---------|
| Web Component | lowercase (no camelCase) | `leadingicon` |
| React | camelCase | `leadingIcon` |
| Angular | camelCase (for @Input) | `leadingIcon` |

### Multi-Word Props

| Framework | Convention | Example |
|-----------|-----------|---------|
| Web Component | kebab-case attributes | `action-args` |
| React | camelCase props | `actionArgs` |
| Angular | camelCase inputs | `actionArgs` |

**Why lowercase for web components?**
HTML attributes are case-insensitive, so web components receive all attributes as lowercase strings.

---

## Boolean Props/Attributes

Booleans require special handling because web components receive all attributes as strings.

### Web Component (Svelte)

```svelte
<script lang="ts">
  export let disabled: string | undefined = undefined;

  $: isDisabled = disabled === "true";
</script>

<button disabled={isDisabled}>Click me</button>
```

**Usage:**
```html
<goa-button disabled="true"></goa-button>
```

### React

React wrappers must convert boolean props to strings:

```typescript
export interface GoabButtonProps {
  disabled?: boolean;
}

export function GoabButton({ disabled, ...props }: GoabButtonProps) {
  return <goa-button disabled={disabled ? "true" : undefined} {...props} />;
}
```

**Usage:**
```jsx
<GoabButton disabled={true} />
<GoabButton disabled /> {/* Same as disabled={true} */}
```

### Angular

Angular wrappers handle this via attribute binding:

```typescript
@Component({
  selector: 'goab-button',
  template: '<goa-button [attr.disabled]="disabled ? \'true\' : null"></goa-button>'
})
export class GoabButtonComponent {
  @Input() disabled?: boolean;
}
```

**Usage:**
```html
<goab-button [disabled]="true"></goab-button>
<goab-button disabled></goab-button>
```

---

## Event Naming

Events use different conventions across frameworks.

### Web Component (Svelte)

Custom events use **underscore prefix**:

```svelte
<script lang="ts">
import { dispatch } from "../../common/utils";

function handleClick() {
  dispatch("click", { value: "clicked" });
}
</script>

<button on:click={handleClick}>Click</button>
```

**Dispatched event:** `_click`

### React

React wrappers expose events with **camelCase `on` prefix**:

```typescript
export interface GoabButtonProps {
  onClick?: (event: CustomEvent) => void;
}

export function GoabButton({ onClick, ...props }: GoabButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !onClick) return;

    const handler = (e: Event) => onClick(e as CustomEvent);
    ref.current.addEventListener("_click", handler);

    return () => ref.current?.removeEventListener("_click", handler);
  }, [onClick]);

  return <goa-button ref={ref} {...props} />;
}
```

**Usage:**
```jsx
<GoabButton onClick={(e) => console.log('Clicked!', e.detail)} />
```

### Angular

Angular wrappers expose events as **@Output** properties:

```typescript
@Component({
  selector: 'goab-button',
  template: '<goa-button (click)="handleClick($event)"></goa-button>'
})
export class GoabButtonComponent {
  @Output() onClick = new EventEmitter<CustomEvent>();

  handleClick(event: Event) {
    this.onClick.emit(event as CustomEvent);
  }
}
```

**Usage:**
```html
<goab-button (onClick)="handleButtonClick($event)"></goab-button>
```

### Event Naming Summary

| Framework | Convention | Example |
|-----------|-----------|---------|
| Web Component | `_eventname` | `_click`, `_change` |
| React | `onEventname` | `onClick`, `onChange` |
| Angular | `onEventname` (@Output) | `onClick`, `onChange` |

---

## Type Naming

Shared types in `libs/common/src/lib/common.ts` follow these conventions:

### Component Prop Types

```typescript
// Format: Goab{ComponentName}{PropName}
export type GoabButtonType = "primary" | "secondary" | "tertiary";
export type GoabIconType = "add" | "remove" | "edit";
```

### Enum-like Constants

```typescript
// Format: {COMPONENT_NAME}_{PROP_NAME}
export const BUTTON_TYPES = ["primary", "secondary", "tertiary"] as const;
export type GoabButtonType = typeof BUTTON_TYPES[number];
```

---

## File Naming

### Component Files

| Framework | Pattern | Example |
|-----------|---------|---------|
| Svelte component | `{Name}.svelte` | `Button.svelte`, `DatePicker.svelte` |
| Svelte test | `{Name}.spec.ts` | `Button.spec.ts` |
| React component | `{name}.tsx` | `button.tsx`, `date-picker.tsx` |
| React test | `{name}.spec.tsx` | `button.spec.tsx` |
| React browser test | `{name}.browser.spec.tsx` | `button.browser.spec.tsx` |
| Angular component | `{name}.ts` | `button.ts`, `date-picker.ts` |
| Angular test | `{name}.spec.ts` | `button.spec.ts` |

### Documentation Files

| File Type | Pattern | Example |
|-----------|---------|---------|
| Component docs | `doc.md` | `libs/web-components/src/components/button/doc.md` |
| VS Code IntelliSense | `{Name}.html-data.json` | `Button.html-data.json` |

---

## Spacing Values

The `mt`, `mr`, `mb`, `ml` props accept standardized spacing values:

### Numeric Values
```typescript
type NumericSpacing = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
```

### T-Shirt Sizes
```typescript
type TShirtSpacing = "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";
```

### Combined Type
```typescript
export type GoabSpacing = NumericSpacing | TShirtSpacing;
```

**Usage:**
```jsx
// Numeric
<GoabButton mt="4" mb="2" />

// T-shirt
<GoabButton mt="xl" mb="m" />
```

---

## CSS Class Naming

When custom classes are needed (rare, since design tokens handle most styling):

### BEM-like Convention

```css
/* Block */
.goa-button { }

/* Element */
.goa-button__icon { }

/* Modifier */
.goa-button--primary { }
.goa-button--disabled { }

/* State */
.goa-button.is-loading { }
```

**Note:** Most styling should use CSS custom properties (design tokens) instead of custom classes.

---

## Directory Naming

| Directory Type | Convention | Example |
|----------------|-----------|---------|
| Component folder | kebab-case | `button/`, `date-picker/` |
| Library folder | kebab-case | `web-components/`, `react-components/` |
| App folder | kebab-case | `prs/`, `playground/` |

---

## Import/Export Naming

### Exports

**Web Components:**
```typescript
// libs/web-components/src/index.ts
export { default as GoaButton } from './components/button/Button.svelte';
export { default as GoaDatePicker } from './components/date-picker/DatePicker.svelte';
```

**React:**
```typescript
// libs/react-components/src/index.ts
export * from './lib/button/button';
export * from './lib/date-picker/date-picker';

// Or named exports
export { GoabButton } from './lib/button/button';
export type { GoabButtonProps } from './lib/button/button';
```

**Angular:**
```typescript
// libs/angular-components/src/index.ts
export * from './lib/components/button/button';
export * from './lib/components/date-picker/date-picker';
```

### Imports

```typescript
// Web components
import { GoaButton } from '@abgov/web-components';

// React
import { GoabButton } from '@abgov/react-components';
import type { GoabButtonProps } from '@abgov/react-components';

// Angular
import { GoabButtonComponent } from '@abgov/angular-components';
```

---

## Quick Reference Cheat Sheet

| What | Web Component | React | Angular |
|------|---------------|-------|---------|
| **Component** | `<goa-button>` | `GoabButton` | `goab-button` |
| **File** | `Button.svelte` | `button.tsx` | `button.ts` |
| **Props/Attrs** | `leadingicon` | `leadingIcon` | `leadingIcon` |
| **Multi-word prop** | `action-args` | `actionArgs` | `actionArgs` |
| **Boolean value** | `"true"` / `undefined` | `true` / `false` | `true` / `false` |
| **Event** | `_click` | `onClick` | `onClick` |
| **Test file** | `Button.spec.ts` | `button.spec.tsx` | `button.spec.ts` |
