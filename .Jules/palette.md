## 2024-06-13 - Improve navigation accessibility

**Learning:** Custom navigation components (SidebarNav, BottomNav) often use basic `<button>` elements that visually indicate active states (e.g. using colors) but lack semantic accessibility indicators (`aria-current="page"`) and keyboard focus states (`focus-visible` classes), which degrades the experience for screen readers and keyboard users.
**Action:** Always add `aria-current={active ? 'page' : undefined}` and explicit `focus-visible` ring styling to custom navigation links/buttons to ensure they are fully accessible out of the box.