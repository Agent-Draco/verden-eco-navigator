## 2024-04-20 - Ensure Explicit Focus States on Custom Buttons

**Learning:** Custom UI components wrapped in div/motion elements or heavily styled generic buttons (like `GlassButton`) often lack obvious native focus rings. This creates severe keyboard accessibility barriers since users navigating via Tab cannot tell which element is currently active.
**Action:** Always add explicit `focus-visible` utility classes (e.g., `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`) to all interactive elements to ensure clear, accessible keyboard navigation without relying purely on hover or native browser defaults.
