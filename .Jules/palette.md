## 2023-10-25 - Accessible Password Visibility Toggle
**Learning:** Icon-only buttons used for toggling state often lack accessible names, confusing screen reader users. Adding dynamic `aria-label` and hiding the decorative icons via `aria-hidden` improves accessibility, and using `focus-visible` styles ensures keyboard navigability.
**Action:** Always provide dynamic `aria-label` attributes to toggle buttons and apply clear `focus-visible` ring styles for keyboard navigation.
