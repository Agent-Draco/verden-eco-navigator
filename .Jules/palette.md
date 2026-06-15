## 2026-06-15 - Enhance navigation accessibility

**Learning:** Navigation buttons lack explicit ARIA active state `aria-current='page'` and clear keyboard focus styles, which can impair screen reader usage and keyboard navigation.
**Action:** Apply `aria-current={active ? 'page' : undefined}` and Tailwind `focus-visible:ring` classes to active links and icon-only buttons to improve general accessibility.
