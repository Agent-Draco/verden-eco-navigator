## 2026-07-06 - Keyboard Accessibility for Hover-only Labels

**Learning:** Tooltip-like labels that rely entirely on hover states (e.g., `opacity-0 group-hover:opacity-100`) remain invisible to keyboard users who navigate via Tab, leading to a degraded navigational experience.
**Action:** Always pair hover-triggered visibility with focus-triggered visibility (e.g., `group-focus-visible:opacity-100`) to ensure UI text remains accessible via keyboard.
