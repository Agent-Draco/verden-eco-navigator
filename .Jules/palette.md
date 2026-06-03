## 2024-06-03 - Accessible Navigation Components
**Learning:** Navigation components require explicit `focus-visible` styles and conditional `aria-current="page"` attributes to ensure keyboard users and screen readers can identify the active page without disrupting mouse users.
**Action:** Consistently apply explicit `focus-visible` ring styling and `aria-current={active ? 'page' : undefined}` to all future navigation links.
