## 2026-05-27 - Navigation Accessibility Attributes
**Learning:** In navigation components like BottomNav and SidebarNav, dynamic `aria-current` attributes should evaluate conditionally (e.g., `aria-current={active ? 'page' : undefined}`) to ensure the attribute is completely omitted when inactive, avoiding invalid states. Applying explicit `focus-visible` classes ensures keyboard navigation works predictably without disrupting mouse users.
**Action:** Use conditional rendering for `aria-current` and explicitly define `focus-visible` rings on all navigation buttons.
