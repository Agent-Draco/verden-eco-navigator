## 2024-05-18 - Semantic ARIA and Keyboard Focus
**Learning:** Interactive navigation components lacking clear semantic states (aria-current) and visible keyboard focus significantly impede screen reader and keyboard accessibility.
**Action:** Always ensure active routes utilize semantic ARIA states like aria-current="page" alongside visual active/focus indicators using the Tailwind utility pattern focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2.
