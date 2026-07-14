## 2024-07-15 - [Accessible Icon Buttons]
**Learning:** Password visibility toggles often lack screen reader labels and clear keyboard focus states, making them inaccessible to keyboard and assistive technology users.
**Action:** Consistently apply dynamic `aria-label`s, `type="button"`, `aria-hidden="true"` on inner decorative icons, and explicit `focus-visible` styles on all icon-only interactive elements.
