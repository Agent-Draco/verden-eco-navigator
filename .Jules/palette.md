## 2024-07-09 - Accessible Icon Buttons and Tooltips

**Learning:** Icon-only buttons with hover-revealed tooltips often lack keyboard accessibility. Users navigating via keyboard cannot see the tooltip if it relies solely on `group-hover`.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` for tooltips, and ensure the parent button has clear `focus-visible` styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
