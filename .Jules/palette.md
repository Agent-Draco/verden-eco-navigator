## 2025-03-09 - Accessible Icon Buttons in Glass UI

**Learning:** When using custom icon-only components like `GlassButton` with lucide-react or emojis, the lack of textual labels causes screen readers to either announce nothing or announce unhelpful markup.
**Action:** Always add descriptive `aria-label`s to icon-only buttons. Additionally, set `aria-hidden="true"` on the SVG components themselves (or wrap emojis in a `span` with `aria-hidden="true"`) to prevent screen readers from reading out the raw SVGs or generic emoji names redundantly.
