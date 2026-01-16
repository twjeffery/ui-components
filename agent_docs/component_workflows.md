# Component Development Workflows

Detailed step-by-step workflows for working with components in the UI Components monorepo.

---

## Updating an Existing Component

When modifying an existing component, you must update all three framework implementations.

### Step 1: Modify the Svelte Component

Location: `libs/web-components/src/components/[name]/`

1. Update the `.svelte` file with your changes:
   - Modify logic, props, or styling
   - Ensure design tokens are used (never hardcode values)
   - Maintain WCAG 2.2 AA accessibility compliance

2. Update the `.spec.ts` test file:
   - Add tests for new functionality
   - Update existing tests if behavior changed
   - Run tests: `npm run test:unit:watch`

### Step 2: Update the React Wrapper

Location: `libs/react-components/src/lib/[name]/`

1. Update `[name].tsx`:
   - Add new props to the TypeScript interface
   - Handle prop transformation if needed (e.g., boolean → string)
   - Add event handlers for new events

2. Update `[name].spec.tsx`:
   - Add tests for new props/events
   - Run tests: `npm run test:unit:watch`

### Step 3: Update the Angular Wrapper

Location: `libs/angular-components/src/lib/components/[name]/`

1. Update `[name].ts`:
   - Add new `@Input()` decorators for props
   - Add new `@Output()` decorators for events
   - Update `ControlValueAccessor` implementation if needed

2. Update `[name].spec.ts`:
   - Add tests for new inputs/outputs
   - Run tests: `npm run test:angular`

### Step 4: Update Shared Types (if needed)

Location: `libs/common/src/lib/common.ts`

If you added new prop types or shared constants, update the common types file and ensure all three frameworks reference them.

### Step 5: Build and Test

```bash
# Build all libraries
npm run build

# Run full PR validation
npm run test:pr

# Test in playgrounds
npm run serve:prs:react
npm run serve:prs:angular
npm run serve:prs:web
```

### Step 6: Create PR Test Page

See `agent_docs/pr_testing_guide.md` for detailed instructions on creating a test page in `apps/prs/`.

---

## Adding a New Component

New components require files in all three libraries plus shared types.

### File Structure Required

**Web Component (Svelte):**
```
libs/web-components/src/components/[name]/
├── ComponentName.svelte        # Main implementation
├── ComponentName.spec.ts       # Unit tests
├── ComponentName.html-data.json # VS Code IntelliSense (optional)
└── doc.md                      # Documentation (optional)
```

**React Wrapper:**
```
libs/react-components/src/lib/[name]/
├── component-name.tsx          # Wrapper component
└── component-name.spec.tsx     # Tests
```

**Angular Wrapper:**
```
libs/angular-components/src/lib/components/[name]/
├── component-name.ts           # Wrapper component
└── component-name.spec.ts      # Tests
```

### Step-by-Step Process

1. **Create the Svelte component** in `libs/web-components/src/components/[name]/`
   - Use `customElement` directive: `<svelte:options customElement="goa-[name]" />`
   - Import and use design tokens from CSS custom properties
   - Add comprehensive tests
   - Follow WCAG 2.2 AA guidelines

2. **Export from web-components** in `libs/web-components/src/index.ts`:
   ```typescript
   export { default as GoaComponentName } from './components/[name]/ComponentName.svelte';
   ```

3. **Create React wrapper** in `libs/react-components/src/lib/[name]/[name].tsx`:
   ```typescript
   import React from 'react';

   export interface GoabComponentNameProps {
     // Define props with camelCase naming
   }

   export function GoabComponentName(props: GoabComponentNameProps) {
     // Wrap <goa-component-name> element
     // Transform props as needed
   }
   ```

4. **Export from react-components** in `libs/react-components/src/index.ts`:
   ```typescript
   export * from './lib/[name]/[name]';
   ```

5. **Create Angular wrapper** in `libs/angular-components/src/lib/components/[name]/[name].ts`:
   ```typescript
   import { Component, Input, Output, EventEmitter } from '@angular/core';

   @Component({
     selector: 'goab-component-name',
     template: '<goa-component-name></goa-component-name>'
   })
   export class GoabComponentNameComponent {
     @Input() someProp?: string;
     @Output() onClick = new EventEmitter();
   }
   ```

6. **Export from angular-components** in `libs/angular-components/src/index.ts`:
   ```typescript
   export * from './lib/components/[name]/[name]';
   ```

7. **Add shared types** to `libs/common/src/lib/common.ts` if needed:
   ```typescript
   export type GoabComponentNameType = "primary" | "secondary";
   ```

8. **Build, test, and create PR test page** (see steps in "Updating an Existing Component")

---

## Props Transformation Rules

Web components receive all attributes as strings. Wrappers must handle type conversion.

### Boolean Props

```typescript
// React wrapper
disabled={disabled ? "true" : undefined}

// Angular wrapper
[attr.disabled]="disabled ? 'true' : null"
```

### Enum/Union Props

```typescript
// React wrapper - pass through as-is
type={type}

// Angular wrapper - pass through as-is
[attr.type]="type"
```

### Object/Array Props

Web components cannot receive objects/arrays as attributes. Either:
1. Use JSON stringification (not recommended)
2. Use child elements or slots
3. Set properties directly via ref (React) or ViewChild (Angular)

---

## Event Handling

Web components dispatch custom events with underscore prefix. Wrappers expose them with framework conventions.

### Web Component (Svelte)

```svelte
<script>
import { dispatch } from "../../common/utils";

function handleClick() {
  dispatch("click", { detail: someData });
}
</script>

<button on:click={handleClick}>Click me</button>
```

### React Wrapper

```typescript
export interface GoabButtonProps {
  onClick?: (event: CustomEvent) => void;
}

export function GoabButton({ onClick, ...props }: GoabButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handler = (e: Event) => onClick?.(e as CustomEvent);
    ref.current.addEventListener("_click", handler);

    return () => ref.current?.removeEventListener("_click", handler);
  }, [onClick]);

  return <goa-button ref={ref} {...props} />;
}
```

### Angular Wrapper

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
