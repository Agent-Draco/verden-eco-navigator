import { useLocation, useNavigate } from "react-router-dom";
import { Map, Leaf, Users, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";

const navItems = [
  { icon: Map, label: "Map", path: "/home" },
  { icon: Leaf, label: "Eco", path: "/credits" },
  { icon: Users, label: "Groups", path: "/ecomoov" },
  { icon: BookOpen, label: "Library", path: "/resources" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavHidden } = useApp() || { isNavHidden: false };

  if (isNavHidden || location.pathname === '/navigation' || location.pathname === '/navigation-dev') return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] safe-bottom md:hidden">
      <div className="glass-strong mx-4 mb-4 rounded-2xl px-1 py-3 flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200",
                active
                  ? "text-primary glow-green-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
