# PR Testing Playground Guide

The `apps/prs/` folder contains shared playgrounds for testing bugs and features.

---

## Why This Matters

**Test pages are committed with your PR** - they're shared artifacts, not throwaway code.

- Reviewers use your test page to verify the fix/feature works
- Team members can add additional test cases if they find gaps
- The side menu item makes your test discoverable to everyone
- Test pages become regression tests for future changes

---

## Playground Structure

```
apps/prs/
├── react/          # React playground (primary)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── bugs/       # Bug fix test pages
│   │   │   ├── features/   # Feature test pages
│   │   │   └── _TEMPLATE.tsx
│   │   ├── main.tsx        # Route configuration
│   │   └── app.tsx         # Side menu links
│   └── package.json
├── angular/        # Angular playground
└── web/            # Web components playground
```

---

## Creating a Test Page

### Step 1: Copy the Template

```bash
# For bug fixes (use the GitHub issue number)
cp apps/prs/react/src/routes/_TEMPLATE.tsx apps/prs/react/src/routes/bugs/bug{N}.tsx

# For new features
cp apps/prs/react/src/routes/_TEMPLATE.tsx apps/prs/react/src/routes/features/feat{N}.tsx
```

**Examples:**
- Bug #2878 → `apps/prs/react/src/routes/bugs/bug2878.tsx`
- Feature #1234 → `apps/prs/react/src/routes/features/feat1234.tsx`

### Step 2: Update the File Content

1. **Rename the component:**
   ```typescript
   // Change from:
   export default function TemplateRoute() {

   // To:
   export default function Bug2878Route() {
   // or
   export default function Feat1234Route() {
   ```

2. **Update the issue metadata:**
   ```typescript
   const ISSUE_NUMBER = "2878";  // Your issue number
   const ISSUE_TITLE = "DatePicker onChange not firing";
   const ISSUE_DESCRIPTION = `
     Paste the issue description from GitHub here.
     This helps reviewers understand what they're testing.
   `;
   ```

3. **Add test cases:**
   Create clear test cases that demonstrate the bug fix or new feature. Each test case should:
   - Have a descriptive title
   - Show the expected behavior
   - Be easy to interact with and verify

   ```typescript
   export default function Bug2878Route() {
     return (
       <div>
         <h2>Bug #{ISSUE_NUMBER}: {ISSUE_TITLE}</h2>
         <p>{ISSUE_DESCRIPTION}</p>

         <section>
           <h3>Test Case 1: Basic onChange behavior</h3>
           <p>Expected: onChange should fire when date is selected</p>
           <GoabDatePicker
             onChange={(e) => console.log('Date changed:', e.detail)}
           />
         </section>

         <section>
           <h3>Test Case 2: Edge case with...</h3>
           <p>Expected: ...</p>
           {/* Your test component */}
         </section>
       </div>
     );
   }
   ```

### Step 3: Wire Up the Route

**File:** `apps/prs/react/src/main.tsx`

1. **Add import** (keep alphabetical order):
   ```typescript
   import Bug2878Route from './routes/bugs/bug2878';
   ```

2. **Add route** (keep numerical order):
   ```typescript
   <Route path="/bugs/2878" element={<Bug2878Route />} />
   ```

### Step 4: Add Side Menu Link

**File:** `apps/prs/react/src/app.tsx`

Add a link in the appropriate section with format: `{issue number} {short description}`

```typescript
<nav>
  <h3>Bug Fixes</h3>
  <ul>
    {/* Keep in numerical order */}
    <li><Link to="/bugs/2878">2878 DatePicker onChange</Link></li>
    {/* other links */}
  </ul>
</nav>
```

**Naming guidelines for links:**
- Keep it short (3-5 words after the issue number)
- Describe the component and issue: `2878 DatePicker onChange`
- NOT too generic: ❌ `2878 Bug fix`
- NOT too long: ❌ `2878 DatePicker onChange event not firing when user selects date`

### Step 5: Test Your Page

```bash
npm run serve:prs:react
```

Navigate to your test page via the side menu and verify:
- The route loads correctly
- Test cases are clearly labeled
- Components demonstrate the fix/feature
- No console errors

---

## Complete Checklist

Before submitting your PR, ensure:

- [ ] Test page file created in correct folder (`bugs/` or `features/`)
- [ ] Component renamed from `TemplateRoute` to `Bug{N}Route` or `Feat{N}Route`
- [ ] Issue number, title, and description updated from template
- [ ] Test cases added with clear descriptions and expected behavior
- [ ] Import added to `main.tsx` (alphabetical order)
- [ ] Route added to `main.tsx` (numerical order)
- [ ] **Link added to `app.tsx` side menu** with format: `{issue number} {short description}`
- [ ] Link is in numerical order
- [ ] Page loads without errors
- [ ] Navigation from side menu works

---

## Best Practices

### Good Test Cases

**✓ Clear and specific:**
```typescript
<section>
  <h3>Test Case: onChange fires on date selection</h3>
  <p>Expected: Console should log the selected date</p>
  <GoabDatePicker onChange={(e) => console.log('Selected:', e.detail)} />
</section>
```

**✓ Demonstrates the issue:**
```typescript
<section>
  <h3>Test Case: Before fix (onChange was silent)</h3>
  <p>This would NOT have worked before the fix</p>
  {/* Component showing the problem */}
</section>
```

**✓ Covers edge cases:**
```typescript
<section>
  <h3>Test Case: With disabled state</h3>
  <p>Expected: onChange should not fire when disabled</p>
  <GoabDatePicker disabled onChange={handleChange} />
</section>
```

### Poor Test Cases

**✗ No description:**
```typescript
<GoabDatePicker />
```

**✗ Unclear expected behavior:**
```typescript
<section>
  <h3>Test</h3>
  <GoabDatePicker />
</section>
```

**✗ Too many unrelated components:**
```typescript
// Don't test 10 different components in one test page
// unless they're all related to the same issue
```

---

## Example: Complete Test Page

```typescript
import { useState } from 'react';
import { GoabDatePicker } from '@abgov/react-components';

const ISSUE_NUMBER = "2878";
const ISSUE_TITLE = "DatePicker onChange not firing";
const ISSUE_DESCRIPTION = `
  The onChange event was not being dispatched when users selected a date
  in the DatePicker component. This affected form validation and state updates.
`;

export default function Bug2878Route() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bug #{ISSUE_NUMBER}: {ISSUE_TITLE}</h2>
      <p>{ISSUE_DESCRIPTION}</p>

      <section style={{ marginTop: '2rem' }}>
        <h3>Test Case 1: Basic onChange behavior</h3>
        <p>Expected: Selected date should appear below the picker</p>
        <GoabDatePicker
          onChange={(e) => setSelectedDate(e.detail.value)}
        />
        <p>Selected: {selectedDate || 'None'}</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Test Case 2: onChange with initial value</h3>
        <p>Expected: onChange should fire when changing from initial date</p>
        <GoabDatePicker
          value="2024-01-01"
          onChange={(e) => console.log('Changed from initial:', e.detail)}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Test Case 3: Disabled state</h3>
        <p>Expected: onChange should NOT fire when disabled</p>
        <GoabDatePicker
          disabled
          onChange={(e) => console.log('Should not see this:', e.detail)}
        />
      </section>
    </div>
  );
}
```

---

## Additional Resources

For more details, see: `apps/prs/react/src/routes/README.md`
