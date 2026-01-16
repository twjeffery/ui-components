# Common Issues & Troubleshooting

Solutions to frequently encountered problems when developing UI components.

---

## Component Issues

### Boolean Prop Not Working

**Symptom:** Boolean prop has no effect on web component

**Cause:** Web components receive all attributes as strings, not booleans.

**Solution:**

Web components must check for the string `"true"`:

```svelte
<!-- ❌ Wrong -->
<script>
  export let disabled: boolean = false;
</script>
<button disabled={disabled}>Click</button>

<!-- ✅ Correct -->
<script>
  export let disabled: string | undefined = undefined;
  $: isDisabled = disabled === "true";
</script>
<button disabled={isDisabled}>Click</button>
```

React/Angular wrappers must convert boolean to string:

```typescript
// React
<goa-button disabled={disabled ? "true" : undefined} />

// Angular
<goa-button [attr.disabled]="disabled ? 'true' : null"></goa-button>
```

---

### Event Not Firing

**Symptom:** Custom event listener not being called

**Possible Causes:**

#### 1. Event Name Mismatch

Web component events use underscore prefix (`_click`), but wrappers expose them without it (`onClick`).

**Check:**
- Web component dispatches: `_click`
- React prop name: `onClick`
- Angular output name: `onClick`

#### 2. Event Not Being Dispatched

Ensure the web component uses the `dispatch` utility:

```svelte
<script>
import { dispatch } from "../../common/utils";

function handleClick() {
  // ✅ Correct
  dispatch("click", { value: "clicked" });

  // ❌ Wrong - missing underscore prefix in CustomEvent
  this.dispatchEvent(new CustomEvent("click", { detail: { value: "clicked" } }));
}
</script>
```

#### 3. Event Listener Not Attached (React)

React wrappers need to manually attach event listeners:

```typescript
// ✅ Correct
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

// ❌ Wrong - missing event listener
export function GoabButton({ onClick, ...props }: GoabButtonProps) {
  return <goa-button {...props} />; // onClick is lost!
}
```

---

### Styles Not Applying

**Symptom:** Component doesn't look right; styles are missing or incorrect

**Possible Causes:**

#### 1. Hardcoded Values Instead of Design Tokens

```svelte
<!-- ❌ Wrong -->
<style>
  button {
    height: 48px;
    background-color: #0070f3;
  }
</style>

<!-- ✅ Correct -->
<style>
  button {
    height: var(--goa-button-height);
    background-color: var(--goa-color-primary);
  }
</style>
```

**Solution:** Always use CSS custom properties from `libs/web-components/src/assets/css/variables.css`

#### 2. Missing CSS Imports

Ensure your Svelte component imports the necessary CSS files:

```svelte
<svelte:options customElement="goa-button" />

<script>
  // Component logic
</script>

<style>
  @import "../../assets/css/reset.css";
  @import "../../assets/css/variables.css";

  button {
    /* Your styles using design tokens */
  }
</style>
```

#### 3. Styles Not Scoped Correctly

Svelte automatically scopes styles to the component. If you need global styles, use `:global()`:

```svelte
<style>
  /* Scoped to this component */
  button {
    color: var(--goa-color-text);
  }

  /* Global style (use sparingly) */
  :global(.special-class) {
    font-weight: bold;
  }
</style>
```

#### 4. Styles Overridden by Specificity

Check browser DevTools to see if styles are being overridden. Increase specificity if needed:

```css
/* Lower specificity */
.button { }

/* Higher specificity */
.goa-button.goa-button--primary { }
```

---

### Tests Failing After Component Update

**Symptom:** Tests fail after making changes to a component

**Possible Causes:**

#### 1. Libraries Not Rebuilt

Wrappers depend on the built web components. Rebuild before running tests:

```bash
npm run build
npm run test:unit
```

#### 2. Test Snapshots Outdated

If using snapshot tests, update them:

```bash
# Vitest
npm run test:unit -- -u

# Jest (Angular)
npm run test:angular -- -u
```

#### 3. Tests Not Updated in All Three Frameworks

When you change a component, you must update tests in **all three libraries**:

- `libs/web-components/src/components/[name]/[Name].spec.ts`
- `libs/react-components/src/lib/[name]/[name].spec.tsx`
- `libs/angular-components/src/lib/components/[name]/[name].spec.ts`

#### 4. Async State Not Awaited

Ensure async updates are properly awaited:

```typescript
// ❌ Wrong
fireEvent.click(button);
expect(screen.getByText('Clicked')).toBeInTheDocument();

// ✅ Correct
await fireEvent.click(button);
expect(await screen.findByText('Clicked')).toBeInTheDocument();
```

---

### Type Errors in Shared Types

**Symptom:** TypeScript errors about missing or incompatible types

**Solution:**

Ensure types are properly exported from `libs/common/src/lib/common.ts` and imported in all three libraries:

```typescript
// libs/common/src/lib/common.ts
export type GoabButtonType = "primary" | "secondary" | "tertiary";

// libs/web-components/src/components/button/Button.svelte
import type { GoabButtonType } from '@abgov/common';

// libs/react-components/src/lib/button/button.tsx
import type { GoabButtonType } from '@abgov/common';

// libs/angular-components/src/lib/components/button/button.ts
import type { GoabButtonType } from '@abgov/common';
```

After updating types, rebuild:

```bash
npm run build
```

---

## Build Issues

### Build Fails with "Module not found"

**Symptom:** Build error: `Cannot find module '@abgov/web-components'`

**Cause:** Dependencies not properly built or installed

**Solution:**

```bash
# Clean and rebuild
rm -rf node_modules
npm install
npm run build
```

### Build Fails with Vite Errors

**Symptom:** Vite configuration or plugin errors

**Solution:**

Check `vite.config.js` files in each library. Common issues:
- Incorrect plugin configuration
- Missing dependencies
- Outdated Vite version

```bash
# Update Vite and plugins
npm update vite @vitejs/plugin-react vite-plugin-dts
```

### Angular Build Fails

**Symptom:** `ng-packagr` errors during Angular build

**Solution:**

Check `ng-package.json` configuration. Ensure:
- Entry file path is correct
- TypeScript configuration is valid
- All dependencies are installed

```bash
# Rebuild Angular library specifically
npm run build:angular
```

---

## Development Server Issues

### Playground Not Loading Components

**Symptom:** Components don't appear in the playground

**Cause:** Libraries not built or hot reload issues

**Solution:**

```bash
# Build all libraries
npm run build

# Restart the playground server
npm run serve:prs:react
```

### Port Already in Use

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**

Kill the process using the port:

```bash
# Find process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run serve:prs:react
```

### Hot Reload Not Working

**Symptom:** Changes not reflected in browser after saving

**Solution:**

1. Hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache
3. Restart dev server
4. Rebuild libraries: `npm run build`

---

## Testing Issues

### Tests Timeout

**Symptom:** Tests fail with timeout errors

**Possible Causes:**

#### 1. Async Operations Not Resolved

```typescript
// ❌ Wrong - missing await
it('should update after click', () => {
  fireEvent.click(button);
  expect(screen.getByText('Updated')).toBeInTheDocument();
});

// ✅ Correct
it('should update after click', async () => {
  await fireEvent.click(button);
  expect(await screen.findByText('Updated')).toBeInTheDocument();
});
```

#### 2. Infinite Loops or Unresolved Promises

Check for infinite loops or promises that never resolve. Use `waitFor` with timeout:

```typescript
await waitFor(
  () => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  },
  { timeout: 5000 }
);
```

### Tests Passing Locally but Failing in CI

**Possible Causes:**

#### 1. Timing Issues

CI environments may be slower. Increase timeouts:

```typescript
it('should load data', async () => {
  // ...
}, { timeout: 10000 }); // 10 second timeout
```

#### 2. Missing Dependencies

Ensure `package.json` includes all dev dependencies needed for testing.

#### 3. Environment Differences

Check Node version, environment variables, and browser availability in CI.

### Browser Tests Not Running

**Symptom:** Playwright tests fail to run

**Solution:**

Install Playwright browsers:

```bash
npx playwright install
```

---

## Git/PR Issues

### PR Checks Failing

**Symptom:** GitHub Actions checks fail on PR

**Solution:**

Run the same commands locally before pushing:

```bash
npm run build
npm run test:pr
```

Fix any errors before pushing again.

### Merge Conflicts in package-lock.json

**Solution:**

```bash
# Accept their version
git checkout --theirs package-lock.json

# Regenerate lock file
npm install

# Stage and continue
git add package-lock.json
git rebase --continue
```

---

## Accessibility Issues

### Screen Reader Not Announcing Changes

**Cause:** Missing ARIA live regions or labels

**Solution:**

Add appropriate ARIA attributes:

```svelte
<!-- For dynamic content -->
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<!-- For form controls -->
<label for="email">Email address</label>
<input id="email" type="email" aria-required="true" />

<!-- For error messages -->
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Focus Not Visible

**Cause:** Missing or removed focus outline

**Solution:**

Never remove focus outline without providing an alternative:

```css
/* ❌ Wrong */
button:focus {
  outline: none;
}

/* ✅ Correct */
button:focus {
  outline: 2px solid var(--goa-color-focus);
  outline-offset: 2px;
}

/* Or use :focus-visible for keyboard-only focus */
button:focus-visible {
  outline: 2px solid var(--goa-color-focus);
  outline-offset: 2px;
}
```

---

## Performance Issues

### Slow Component Rendering

**Possible Causes:**

#### 1. Inefficient Reactivity (Svelte)

Avoid expensive computations in reactive statements:

```svelte
<!-- ❌ Wrong - recalculates on every prop change -->
<script>
  $: expensiveValue = props.items.map(item => heavyCalculation(item));
</script>

<!-- ✅ Correct - only recalculates when items change -->
<script>
  $: expensiveValue = (() => {
    if (!props.items) return [];
    return props.items.map(item => heavyCalculation(item));
  })();
</script>
```

#### 2. Missing Memoization (React)

Use `useMemo` and `useCallback` for expensive operations:

```typescript
// ❌ Wrong - recreates function on every render
const handleClick = () => doSomething(prop);

// ✅ Correct
const handleClick = useCallback(() => doSomething(prop), [prop]);
```

---

## When All Else Fails

1. **Read error messages carefully** - they often tell you exactly what's wrong
2. **Check the git history** - see how similar components were implemented
3. **Search the codebase** - use grep to find similar patterns: `grep -r "pattern" libs/`
4. **Ask the team** - they may have encountered the issue before
5. **Create a minimal reproduction** - isolate the problem in a simple test case
