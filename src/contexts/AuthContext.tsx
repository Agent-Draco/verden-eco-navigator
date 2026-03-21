import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("verden_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: User = {
      name: "Alex Green",
      email,
      avatar: "AG",
      memberSince: "Jan 2025",
    };
    setUser(u);
    localStorage.setItem("verden_user", JSON.stringify(u));
    return true;
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: User = {
      name,
      email,
      avatar: name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
      memberSince: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
    setUser(u);
    localStorage.setItem("verden_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verden_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
