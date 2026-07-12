## 2025-02-14 - Improve Sidebar Keyboard Accessibility & Screen Reader Experience

**Learning:** Custom tooltip-like labels relying on `group-hover:opacity-100` are invisible to keyboard navigators unless paired with `group-focus-visible`. Furthermore, visible icons inside labeled buttons or `aria-label` buttons should have `aria-hidden="true"` to avoid redundant screen reader announcements.
**Action:** Consistently use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` alongside `group-focus-visible:opacity-100` for custom tooltips, and add `aria-hidden="true"` to decorative inner icons.
