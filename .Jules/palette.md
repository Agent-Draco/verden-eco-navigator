## 2026-06-19 - Standardized Focus States

**Learning:** Custom components like `GlassButton`, `BottomNav`, and `SidebarNav` lack default keyboard focus indicators compared to Radix UI defaults, reducing accessibility for keyboard navigation.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` to custom interactive components to match the app's focus ring pattern.
