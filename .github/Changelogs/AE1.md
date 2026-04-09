# Changelog Report - [AE1]

## Aim of the Change
The objective was to resolve a series of accessibility errors and maintainability warnings identified in the project's code. Specifically, adding discernible text to buttons for screen readers and removing inline styles to adhere to best practices.

## What was Changed
- **AvatarSelector.tsx**: 
    - Added `aria-label` to the close button and color selection buttons.
    - Replaced inline `backgroundColor` styles with Tailwind utility classes.
    - Added missing `cn` utility import.
- **SidebarNav.tsx**: 
    - Added `aria-label` to Menu and Settings buttons.
- **Navigation.tsx**: 
    - Added `aria-label` to the Back and Print buttons.
- **PrivacyPolicy.tsx** & **TermsAndConditions.tsx**: 
    - Added `aria-label` to the navigation Back buttons.
- **Map.tsx**: 
    - Moved branding watermark styles from inline JavaScript manipulation to a reusable CSS block.
    - Replaced inline dimensions for the 3D vehicle portal with Tailwind classes.

## Result of the Change
All identified accessibility errors regarding "discernible text" for buttons should now be resolved. Inline style warnings for `Map.tsx` and `AvatarSelector.tsx` have been addressed by moving styles to CSS or Tailwind.

## Inspection & Course of Action
I reviewed the `@current_problems` provided by the IDE. I inspected each file at the specified line numbers to identify the problematic elements. For buttons, I added `aria-label`. For styles, I evaluated the best way to move them to external or component-level CSS/Tailwind blocks while maintaining dynamic functionality.

## Tests Done
- Verified that all buttons still function correctly (onClose, navigations, etc.).
- Verified that the color bubbles in `AvatarSelector` correctly show their colors using Tailwind classes.
- Verified that the Map watermark and 3D vehicle portal maintain their positions and dimensions.

## Overall Understanding
This task reinforces the importance of accessibility and maintainability in a modern web app. While inline styles are sometimes convenient for dynamic values, moving them to CSS or Tailwind ensures a cleaner separation of concerns and facilitates consistent styling across the app. The use of `aria-label` ensures that the app remains usable for individuals relying on assistive technologies.
