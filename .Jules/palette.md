## 2024-05-15 - [Add ARIA attributes and focus styles to icon buttons]
**Learning:** Icon-only buttons often lack accessibility context for screen readers and visible focus states for keyboard navigation.
**Action:** Always add dynamic `aria-label`, `aria-pressed` (for toggles), and explicit `focus-visible:ring-2` styles to all icon-only interactive elements.
