# FIX-002 Daily Progress Report (DPR) - Restored Dynamic

## Original Code (The "literal" version I am reverting)
```tsx
// src/pages/Settings.tsx

{val ? (
  <button role="switch" aria-checked="true" ...>...</button>
) : (
  <button role="switch" aria-checked="false" ...>...</button>
)}
```

## Modified Code (Back to clean dynamic version)
```tsx
// src/pages/Settings.tsx

<button 
  type="button"
  role="switch"
  aria-checked={val}
  ...
>
  <motion.div animate={{ x: val ? 24 : 0 }} ... />
</button>
```

## Exact Changes
```diff
--- src/pages/Settings.tsx
+++ src/pages/Settings.tsx
@@ -84,31 +84,12 @@
-                {val ? (
-                  <button 
-                    type="button"
-                    role="switch"
-                    aria-checked="true"
-                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
-                    className="w-12 h-6 rounded-full transition-colors relative flex items-center px-1 bg-primary"
-                    aria-label={`Toggle ${key} notifications`}
-                  >
-                    <motion.div 
-                      layout
-                      animate={{ x: 24 }}
-                      className="w-4 h-4 rounded-full bg-white shadow-sm"
-                    />
-                  </button>
-                ) : (
-                  <button 
-                    type="button"
-                    role="switch"
-                    aria-checked="false"
-                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
-                    className="w-12 h-6 rounded-full transition-colors relative flex items-center px-1 bg-muted"
-                    aria-label={`Toggle ${key} notifications`}
-                  >
-                    <motion.div 
-                      layout
-                      animate={{ x: 0 }}
-                      className="w-4 h-4 rounded-full bg-white shadow-sm"
-                    />
-                  </button>
-                )}
+                <button 
+                  type="button"
+                  role="switch"
+                  aria-checked={val}
+                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
+                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${val ? 'bg-primary' : 'bg-muted'}`}
+                  aria-label={`Toggle ${key} notifications`}
+                >
+                  <motion.div 
+                    animate={{ x: val ? 24 : 0 }}
+                    className="w-4 h-4 rounded-full bg-white shadow-sm"
+                  />
+                </button>
```
