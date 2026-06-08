import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Fix 1: Mismatched tag error "Unterminated regular expression" is frequently caused by a mismatched tag elsewhere
content = content.replace("</motion.div>\n                </GlassCard>\n              </motion.div>\n            )}\n          </AnimatePresence>", "                </GlassCard>\n              </motion.div>\n            )}\n          </AnimatePresence>")

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
