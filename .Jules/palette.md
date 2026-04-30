## 2024-05-01 - Explicit Focus States on Custom Elements

**Learning:** Custom interactive elements (e.g., div-based buttons or styled components wrapper around `<button>`) must have explicitly defined native focus states using Tailwind CSS's `focus-visible` pseudo-class (e.g., `focus-visible:ring-primary focus-visible:ring-offset-background`) to maintain accessibility standards. Relying purely on default browser outlines or hover states is insufficient for users navigating with keyboards.
**Action:** When creating or modifying custom interactive components (like `GlassButton`), always ensure `focus-visible` styles are included in the base classes for robust keyboard accessibility.
