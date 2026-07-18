## 2024-07-18 - Accessibility for Icon-Only Buttons

**Learning:** When using icon-only buttons for transport mode selection, screen readers need explicit text. Wrapping emojis in spans with aria-hidden="true" and adding aria-labels to the buttons ensures proper semantic context without redundant readouts.
**Action:** Always add aria-labels to buttons containing only icons or emojis, and explicitly hide the decorative element using aria-hidden="true".
