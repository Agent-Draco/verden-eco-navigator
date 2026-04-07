import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system" | string;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  systemTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.forEach((className) => {
      if (className !== 'dark' && className !== 'light' && className !== 'system') {
        root.classList.remove(className);
      }
    });
    root.classList.remove("light", "dark");
    
    let resolvedTheme: string = "light";

    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      resolvedTheme = theme;
    }

    root.classList.add(resolvedTheme);
    
    // If it's a custom theme like phoenix, also add 'dark' for general dark-mode support if intended
    if (theme !== 'light' && theme !== 'system' && theme !== 'dark') {
        root.classList.add('dark'); // Most custom themes are dark-based
    }

    setSystemTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? "dark" : "light");
        if (theme === "system") {
            root.classList.remove("light", "dark");
            root.classList.add(e.matches ? "dark" : "light");
        }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
    
  }, [theme]);

  const value = {
    theme,
    systemTheme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
