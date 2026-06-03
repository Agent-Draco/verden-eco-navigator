## 2024-05-15 - Navigation Keyboard Accessibility

**Learning:** Navigation buttons (SidebarNav, BottomNav) lacked visual focus states for keyboard users and aria-current indications for assistive technologies.
**Action:** Applied conditionally rendered `aria-current="page"` and robust `focus-visible` styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) to all navigation targets across repositories to ensure consistent and accessible navigation.