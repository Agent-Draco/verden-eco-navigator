
## 2024-05-18 - Keyboard Accessibility for Custom Components

**Learning:** When building custom interactive components (like div-based wrappers or styled components like `GlassButton`), standard CSS hover/active states are not enough. It's critical to explicitly define `focus-visible` styles to ensure the component is fully keyboard accessible, without negatively impacting mouse-user aesthetics. Complex arbitrary timing functions in Tailwind can also cause compilation errors in some setups.
**Action:** Always include explicitly defined `focus-visible:ring-primary` and related offset utilities to custom interactive elements, and use standard CSS transition timing functions (e.g., `ease-out`) instead of complex arbitrary `cubic-bezier` strings in Tailwind classes where possible.
