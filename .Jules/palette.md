## 2026-06-15 - Keyboard Accessibility & ARIA Current in Custom Nav

**Learning:** Custom navigation components often lack proper screen reader context (active page indication) and keyboard focus indicators, making them difficult to use for non-mouse users.
**Action:** Always add `aria-current={active ? 'page' : undefined}` to navigation links and explicitly define `focus-visible` styles (e.g., `focus-visible:ring-2`) for all interactive elements.
