# Testing Guide

Comprehensive testing reference for the UI Components monorepo.

---

## Test Commands

### Development (Watch Mode)

Use these during development for fast feedback:

```bash
# Unit tests only (all libraries)
npm run test:unit:watch

# Browser tests (Playwright)
npm run test:browser:watch

# Headless browser tests
npm run test:headless:watch
```

### Full Validation

Run before creating a PR:

```bash
# Build all libraries + run all tests (headless)
npm run test:pr

# This is equivalent to:
npm run build && npm run test:unit && npm run test:headless
```

### Framework-Specific

```bash
# Angular tests only (Jest)
npm run test:angular

# React tests only (Vitest)
npm run test:react

# Web components tests only (Vitest)
npm run test:web
```

---

## Test Framework by Library

Each library uses different testing tools based on framework requirements:

| Library | Test Framework | Test Library | File Pattern |
|---------|---------------|--------------|--------------|
| Web Components | Vitest | @testing-library/svelte | `*.spec.ts` |
| React | Vitest | @testing-library/react | `*.spec.tsx` |
| React (browser) | Vitest + Playwright | @testing-library/react | `*.browser.spec.tsx` |
| Angular | Jest | @testing-library/angular | `*.spec.ts` |

### Why Different Frameworks?

- **Vitest**: Fast, modern testing for Svelte and React
- **Jest**: Standard testing framework for Angular
- **Playwright**: Browser automation for tests requiring real DOM APIs

---

## Test File Locations

Tests live alongside the components they test:

```
libs/web-components/src/components/button/
├── Button.svelte
└── Button.spec.ts          # ← Test here

libs/react-components/src/lib/button/
├── button.tsx
├── button.spec.tsx         # ← Test here
└── button.browser.spec.tsx # ← Browser test here (if needed)

libs/angular-components/src/lib/components/button/
├── button.ts
└── button.spec.ts          # ← Test here
```

---

## Writing Unit Tests

### Web Components (Vitest + @testing-library/svelte)

```typescript
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import GoaButton from './Button.svelte';

describe('GoaButton', () => {
  it('should render with text', () => {
    render(GoaButton, { props: { text: 'Click me' } });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should emit click event', async () => {
    const { component } = render(GoaButton);
    const handleClick = vi.fn();
    component.$on('_click', handleClick);

    await fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(GoaButton, { props: { disabled: 'true' } });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### React (Vitest + @testing-library/react)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GoabButton } from './button';

describe('GoabButton', () => {
  it('should render with text', () => {
    render(<GoabButton>Click me</GoabButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<GoabButton onClick={handleClick}>Click me</GoabButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<GoabButton disabled>Click me</GoabButton>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled', 'true');
  });
});
```

### Angular (Jest + @testing-library/angular)

```typescript
import { render, screen, fireEvent } from '@testing-library/angular';
import { GoabButtonComponent } from './button';

describe('GoabButtonComponent', () => {
  it('should render with text', async () => {
    await render(GoabButtonComponent, {
      componentProperties: { text: 'Click me' }
    });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should emit onClick when clicked', async () => {
    const onClick = jest.fn();
    await render(GoabButtonComponent, {
      componentProperties: { onClick }
    });

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled input is true', async () => {
    await render(GoabButtonComponent, {
      componentProperties: { disabled: true }
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Browser Tests (Playwright)

Use browser tests when you need real browser APIs (like focus management, scroll behavior, or complex DOM interactions).

**File naming:** `*.browser.spec.tsx`

**Example:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('GoabModal', () => {
  test('should trap focus within modal', async ({ page }) => {
    await page.goto('http://localhost:3000/test/modal');

    // Open modal
    await page.click('#open-modal-button');

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const firstFocus = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocus).toBe('BUTTON');

    // Tab to last element and verify focus wraps
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const wrappedFocus = await page.evaluate(() => document.activeElement?.tagName);
    expect(wrappedFocus).toBe('BUTTON');
  });
});
```

---

## Testing Best Practices

### 1. Test User Behavior, Not Implementation

**Good:**
```typescript
it('should show error message when input is invalid', () => {
  render(<GoabInput type="email" />);
  fireEvent.input(screen.getByRole('textbox'), { target: { value: 'invalid' } });
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});
```

**Bad:**
```typescript
it('should set state.error to true', () => {
  const wrapper = mount(<GoabInput />);
  wrapper.setState({ error: true });
  expect(wrapper.state('error')).toBe(true);
});
```

### 2. Use Accessible Queries

Prefer queries that match how users interact with your app:

```typescript
// Good - uses accessible role
screen.getByRole('button', { name: 'Submit' })

// Good - uses label text
screen.getByLabelText('Email address')

// Avoid - fragile, not accessible-focused
screen.getByClassName('submit-button')
```

### 3. Test Accessibility

```typescript
it('should have proper ARIA attributes', () => {
  render(<GoabButton aria-label="Close dialog">×</GoabButton>);
  const button = screen.getByRole('button', { name: 'Close dialog' });
  expect(button).toHaveAttribute('aria-label', 'Close dialog');
});
```

### 4. Test All Three Frameworks

When you update a component, update tests in all three libraries:
- `libs/web-components/src/components/[name]/[Name].spec.ts`
- `libs/react-components/src/lib/[name]/[name].spec.tsx`
- `libs/angular-components/src/lib/components/[name]/[name].spec.ts`

---

## Common Testing Patterns

### Testing Custom Events

**Web Component:**
```typescript
it('should dispatch custom event', async () => {
  const { component } = render(GoaButton);
  const handler = vi.fn();
  component.$on('_click', handler);

  await fireEvent.click(screen.getByRole('button'));
  expect(handler).toHaveBeenCalled();
  expect(handler.mock.calls[0][0].detail).toEqual({ value: 'something' });
});
```

**React:**
```typescript
it('should call event handler with detail', () => {
  const handleClick = vi.fn();
  render(<GoabButton onClick={handleClick} />);

  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledWith(
    expect.objectContaining({ detail: { value: 'something' } })
  );
});
```

### Testing Conditional Rendering

```typescript
it('should show error message when error prop is provided', () => {
  render(<GoabInput error="Invalid value" />);
  expect(screen.getByText('Invalid value')).toBeInTheDocument();
});

it('should not show error message when error prop is not provided', () => {
  render(<GoabInput />);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
```

### Testing Props/Attributes

```typescript
it('should apply variant class based on prop', () => {
  render(<GoabButton variant="primary">Click</GoabButton>);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('variant', 'primary');
});
```

---

## Debugging Tests

### Enable Debug Output

```typescript
import { render, screen } from '@testing-library/react';

it('debug example', () => {
  render(<GoabButton>Click me</GoabButton>);
  screen.debug(); // Prints current DOM to console
});
```

### Run Single Test File

```bash
# Vitest (web components, React)
npm run test:unit:watch -- path/to/file.spec.ts

# Jest (Angular)
npm run test:angular -- path/to/file.spec.ts
```

### Run Single Test

```typescript
// Use .only to run just one test
it.only('should do something', () => {
  // This test will run in isolation
});

// Use .skip to skip a test
it.skip('should do something', () => {
  // This test will be skipped
});
```

---

## CI/CD Testing

In CI/CD pipelines, the following command runs:

```bash
npm run test:pr
```

This ensures:
1. All libraries build successfully
2. All unit tests pass
3. All headless browser tests pass

Make sure this passes locally before pushing your PR.
