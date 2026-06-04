## 2024-06-04 - Accessible Navigation Buttons
**Learning:** Navigation buttons that rely solely on visual styling for active state or hover state exclude screen reader and keyboard users.
**Action:** Always add `aria-current="page"` to active links and explicit `focus-visible` utilities (e.g., `focus-visible:ring-2`) to ensure interactive elements are accessible.
