## 2024-07-02 - Enhance navigation accessibility with semantic ARIA and focus states
**Learning:** Custom interactive elements like BottomNav and SidebarNav often lack proper keyboard focus states and semantic active indications, making them hard to use for screen readers and keyboard users.
**Action:** Always add `aria-current="page"` to active navigation routes and apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` to custom interactive UI elements to ensure consistent accessibility.
