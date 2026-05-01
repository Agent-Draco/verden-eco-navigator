## 2026-05-01 - Adding Keyboard Accessibility to Custom Div-based Buttons

**Learning:** When creating custom interactive components like selection lists or cards using `div` elements in React, they lack native keyboard support out-of-the-box. We must explicitly define `role="button"`, `tabIndex={0}`, `onKeyDown` handlers (specifically listening for 'Enter' and 'Space' keys), and apply native focus states (like Tailwind's `focus-visible`) to ensure robust accessibility.
**Action:** Moving forward, any custom, non-native interactive UI elements (like avatars, color swatches, or list items) must be audited to ensure these properties are applied, preventing keyboard traps and ensuring an equitable user experience.
