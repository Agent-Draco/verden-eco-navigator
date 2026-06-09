import re

with open('src/pages/Navigation.tsx', 'r') as f:
    content = f.read()

content = content.replace("import GlassButton from '@/components/verden/GlassButton';", "import { GlassButton } from '@/components/verden/GlassButton';")
content = content.replace("import GlassCard from '@/components/verden/GlassCard';", "import { GlassCard } from '@/components/verden/GlassCard';")

with open('src/pages/Navigation.tsx', 'w') as f:
    f.write(content)
