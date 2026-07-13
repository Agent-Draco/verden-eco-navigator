## 2024-07-13 - Enhance Keyboard Focus and Screen Reader Support in Interactive Navigation

**Learning:** Custom interactive elements (like icon-only buttons with `aria-label` or hover-based tooltips) often lack visual focus indicators and can trigger redundant screen reader announcements if icons aren't explicitly hidden. Also, tooltip labels relying only on `group-hover:opacity-100` are invisible to keyboard users.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` to custom buttons. Pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` for tooltips. Add `aria-hidden="true"` to decorative icons inside elements that already have text or an `aria-label`.
