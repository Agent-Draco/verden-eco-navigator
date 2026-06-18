## 2026-06-18 - Improved Keyboard Navigation Across Shared Components

**Learning:** Custom interactive elements (like GlassButton, BottomNav, and SidebarNav) often lack native keyboard focus indicators when default styles are overridden or completely custom styles are applied. This severely impacts keyboard navigation accessibility.
**Action:** Apply a consistent `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` Tailwind pattern to all custom buttons and navigation items to ensure clear, accessible focus states without impacting mouse users.
