
## 2024-05-01 - Ensuring Focus Visibility on Custom Motion Elements

**Learning:** Custom interactive elements (like Framer Motion's `motion.button` wrappers) often inherit base button resets but may lack a defined, visible focus ring out-of-the-box. This creates an accessibility gap for keyboard users who rely on visual indicators to navigate.
**Action:** Always explicitly define `focus-visible` states using Tailwind CSS (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) on custom button wrappers to ensure robust keyboard navigation support that aligns with modern web accessibility guidelines.
