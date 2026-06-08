import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Fix 1: Duplicate declarations
content = re.sub(r'const { credits, setLastGreenestRoute, setNavHidden } = useApp\(\);', 'const { setNavHidden } = useApp();', content)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
