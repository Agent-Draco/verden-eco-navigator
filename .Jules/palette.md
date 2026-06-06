## 2024-03-24 - Accessibility improvements for GlassButton component
**Learning:** Custom UI components built with Framer Motion and Tailwind often lack standard accessibility states like focus rings and disabled styling. Additionally, Tailwind pseudo-classes (`active:scale`) can conflict with Framer Motion interaction props (`whileTap`).
**Action:** Added explicit focus-visible and disabled utility classes to ensure keyboard accessibility and visual feedback. Swapped ambiguous custom bezier curves for standard tailwind easings. Removed active:scale-95 when whileTap is used.
