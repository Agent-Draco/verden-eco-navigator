import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Fix 3: Mismatched tags in the suggestions dropdown
content = content.replace(
'''                      ))}
                    </div>
                  </motion.div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>''',
'''                      ))}
                    </div>
                  )}
                  </motion.div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>'''
)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
