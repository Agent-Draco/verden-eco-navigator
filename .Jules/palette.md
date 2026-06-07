## 2024-03-20 - Add accessibility states to Navigation buttons

**Learning:** Navigation elements implemented as buttons (instead of standard `<a>` tags) often miss essential accessibility features like `aria-current` indicating the active tab and distinct keyboard focus styles. Adding these improves both screen reader context and keyboard navigation clarity.
**Action:** Always ensure custom navigation components (like BottomNav or SidebarNav) include `aria-current="page"` and `focus-visible` tailwind classes.
