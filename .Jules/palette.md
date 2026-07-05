## 2024-05-18 - Standardize navigation accessibility focus indicators

**Learning:** Custom interactive elements easily lose native accessibility states like `aria-current` and keyboard `focus-visible` styling.
**Action:** Always pair `aria-current="page"` with visual active states on navigation, and apply Tailwind `focus-visible` ring utilities to all custom interactive components.
