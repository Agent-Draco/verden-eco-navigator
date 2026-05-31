## 2024-05-31 - Navigation Accessibility Improvements

**Learning:** Many interactive React components (like custom `button` navigation items) lack explicit keyboard focus indicators and standard screen reader states, making them inaccessible for non-mouse users.
**Action:** Consistently add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for explicit keyboard focus, and conditionally apply `aria-current={active ? 'page' : undefined}` to dynamically communicate active application states.
