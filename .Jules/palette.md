## 2026-04-18 - Div-to-Button Accessibility Transformation

**Learning:** When using `div` elements as interactive clickable items (such as vehicle selectors in the AvatarSelector), they lack native keyboard accessibility and focus states, violating WCAG guidelines and excluding keyboard-only users.

**Action:** Whenever a `div` is used with an `onClick` handler, it must be upgraded to an accessible interactive element by adding:
1. `role="button"`
2. `tabIndex={0}`
3. An `onKeyDown` event handler that triggers the action on `Enter` or `Space` key presses.
4. An `aria-label` for screen readers.
5. Focus states using Tailwind's `focus-visible` utility classes (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) to provide clear visual feedback during keyboard navigation.
