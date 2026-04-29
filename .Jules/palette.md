## 2024-05-18 - Keyboard Accessibility for Custom Interactive Components

**Learning:** Custom interactive components (like div-based buttons or styled wrappers) often lack native focus states, which are critical for keyboard navigation and accessibility. They need to be explicitly added to provide visual feedback to users navigating via keyboard.

**Action:** When creating or modifying custom interactive components (like buttons, links, or interactive cards), ensure that `focus-visible` styles are explicitly defined. In Tailwind CSS, this typically involves adding classes like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`. This pattern should be consistently applied across all such components to maintain a high standard of accessibility.
