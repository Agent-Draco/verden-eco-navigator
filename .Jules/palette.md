## 2024-05-15 - Consistent Keyboard Accessibility for Custom Buttons
**Learning:** Custom interactive components like GlassButton often lack native focus states, leading to poor keyboard navigation experiences.
**Action:** Always include Tailwind's `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` pattern on custom interactive elements to ensure WCAG compliant focus indicators without compromising mouse interactions.
