## 2024-06-20 - Navigation Accessibility
**Learning:** React Router active route visual indicators don't natively translate to screen-reader context. Relying solely on 'text-primary' or background highlights leaves keyboard/assistive-tech users without active state context or visible focus.
**Action:** Always pair visual active/focus states with 'aria-current="page"' and 'focus-visible:ring-2' utilities on custom navigation components.
