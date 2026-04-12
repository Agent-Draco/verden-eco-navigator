## 2025-03-01 - Add ARIA Labels to Icon-Only Buttons

**Learning:** It's common to use icon-only buttons for actions like "Go back" or "Send message" (e.g., using `GlassButton` with `size="icon"`). While visually appealing, these buttons lack context for screen readers if not properly labeled.
**Action:** Always add an explicit `aria-label` attribute to buttons that do not contain visible text content to ensure accessibility for all users.
