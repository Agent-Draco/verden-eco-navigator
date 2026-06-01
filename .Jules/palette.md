## 2024-06-01 - Added accessible focus states and aria-current to navigation items

**Learning:** Custom interactive components like `SidebarNav` and `BottomNav` often miss native accessibility features like `aria-current` for indicating active pages and explicit `focus-visible` styling for keyboard users.
**Action:** Ensure all future custom navigation components incorporate `aria-current={active ? 'page' : undefined}` and strong `focus-visible` tailwind classes.