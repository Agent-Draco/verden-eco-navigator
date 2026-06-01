## 2024-06-01 - Navigation Accessibility Enhancements

**Learning:** Improving keyboard navigation requires explicit `focus-visible` states to not disrupt mouse users while aiding keyboard users. Dynamic `aria-current="page"` correctly indicates the active route to screen readers.
**Action:** Apply `aria-current` dynamically and explicit `focus-visible` ring styling (e.g., `focus-visible:ring-2`) to navigation elements.
