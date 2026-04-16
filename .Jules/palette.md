## 2026-04-16 - Interactive Elements Accessibility
**Learning:** Custom UI elements like div-based buttons and icon-only components often miss critical accessibility attributes (ARIA labels, roles, and keyboard event handlers).
**Action:** Always ensure `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` handlers (for Enter/Space) are added to custom interactive elements. Check icon-only buttons for missing `aria-label`s.
