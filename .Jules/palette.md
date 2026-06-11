## 2024-03-24 - Navigation Accessibility Enhancements

**Learning:** Custom navigation links and icon buttons often lack built-in accessibility properties for screen readers and keyboard users.
**Action:** Always add `aria-current="page"` to active navigation links and apply explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` styling to ensure proper keyboard focus without disrupting mouse users.