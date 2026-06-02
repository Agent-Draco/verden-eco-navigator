## 2024-06-02 - Navigation Accessibility Enhancements
**Learning:** Custom navigation components built with standard tags often lack explicit accessibility states (`aria-current`) and visible keyboard focus states that don't disrupt mouse users.
**Action:** Establish a reusable pattern of applying `aria-current={active ? 'page' : undefined}` and Tailwind's `focus-visible` utilities to all navigation interactive elements.
