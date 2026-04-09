import { useLocation, useNavigate } from "react-router-dom";
import { Map, Leaf, Users, Wallet, User, Menu, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

const navItems = [
  { icon: Map, label: "Map", path: "/home" },
  { icon: Leaf, label: "Eco", path: "/credits" },
  { icon: Users, label: "Groups", path: "/ecomoov" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: BookOpen, label: "Library", path: "/resources" },
  { icon: User, label: "Profile", path: "/profile" },
];

const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavHidden } = useApp() || { isNavHidden: false };

  if (isNavHidden || location.pathname === '/navigation') return null;

  return (
    <div className="hidden md:flex flex-col items-center py-6 w-20 border-r border-border bg-background/80 backdrop-blur-xl h-screen z-[50] shrink-0">
      {/* Top Logo/Menu Area */}
      <div className="mb-8">
        <button 
          className="p-3 rounded-2xl hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
                active 
                  ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(34,197,94,0.15)]" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 1.8} />
              
              {/* Tooltip-like label */}
              <span className="text-[10px] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>

              {/* Active Indicator Line */}
              {active && (
                <motion.div 
                  layoutId="activeSideNav"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto">
        <button 
          onClick={() => navigate('/customize')}
          className="p-3 rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Open settings"
        >
          <Settings size={22} />
        </button>
      </div>
    </div>
  );
};

export default SidebarNav;
