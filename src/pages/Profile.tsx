import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Wallet, Car, Crown, ChevronRight, Palette, Settings, LogOut, Moon, Sun, FileText, Shield } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import GlassCard from "@/components/verden/GlassCard";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import verdenLogo from "@/assets/verden-logo.png";

const avatarEmojis = ["🌿", "🌍", "🚗", "⚡", "🦋", "🌊"];

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { credits, totalTrips, totalCO2Saved, streak, selectedAvatar, tier } = useApp();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { icon: Car, label: "Vehicle Profile", path: "/vehicle", detail: "Setup" },
    { icon: Palette, label: "Customize", path: "/customize", detail: "" },
    { icon: Crown, label: "Membership", path: "/membership", detail: tier },
    { icon: Settings, label: "Settings", path: "/settings", detail: "" },
    { icon: FileText, label: "Terms & Conditions", path: "/terms", detail: "" },
    { icon: Shield, label: "Privacy Policy", path: "/privacy", detail: "" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative w-full p-5 pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-verden-lavender/10 blur-[80px] pointer-events-none" />

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center text-3xl shadow-lg border border-primary/20">
          {avatarEmojis[selectedAvatar] || "🌿"}
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">{user?.name || "Eco Warrior"}</h1>
          <p className="text-sm text-muted-foreground">Member since {user?.memberSince || "Joining..."}</p>
        </div>
      </div>

      <GlassCard variant="glow" className="p-5 mb-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Wallet size={18} className="text-primary" />
          <span className="font-display font-semibold text-foreground">Green Wallet</span>
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="font-display text-3xl font-bold text-foreground">{credits}</span>
          <span className="text-sm text-muted-foreground pb-1">credits</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-green rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (credits / 300) * 100)}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{Math.max(0, 300 - credits)} credits to Silver Tier</p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { val: `${totalTrips}`, label: "Trips" },
          { val: `${totalCO2Saved}`, label: "kg CO₂ saved" },
          { val: `${streak}`, label: "Day streak" },
        ].map((s) => (
          <GlassCard key={s.label} variant="subtle" className="text-center p-3 shadow-md border-primary/5 hover:border-primary/20 transition-all">
            <p className="font-display font-bold text-lg text-foreground">{s.val}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 cursor-pointer px-4 py-4 rounded-2xl bg-muted/30 hover:bg-muted/50 hover:translate-x-1 transition-all border border-border/40"
            onClick={() => item.path !== "#" && navigate(item.path)}
          >
            <item.icon size={18} className="text-primary shrink-0" />
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            {item.detail && <span className="text-xs text-muted-foreground">{item.detail}</span>}
            <ChevronRight size={16} className="text-muted-foreground opacity-50" />
          </div>
        ))}

        <div
          className="flex items-center gap-3 cursor-pointer px-4 py-4 rounded-2xl bg-muted/30 hover:bg-muted/50 hover:translate-x-1 transition-all border border-border/40"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} className="text-primary shrink-0" /> : <Moon size={18} className="text-primary shrink-0" />}
          <span className="flex-1 text-sm font-medium text-foreground">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
          <ChevronRight size={16} className="text-muted-foreground opacity-10" />
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer px-4 py-4 rounded-2xl bg-muted/30 hover:bg-destructive/10 hover:translate-x-1 transition-all border border-border/40 group"
          onClick={handleLogout}
        >
          <LogOut size={18} className="text-destructive shrink-0" />
          <span className="flex-1 text-sm font-medium text-destructive">Sign Out</span>
          <ChevronRight size={16} className="text-destructive opacity-10 group-hover:opacity-50 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10 opacity-40">
        <img src={verdenLogo} alt="Verden" className="w-5 h-5 grayscale" />
        <span className="font-display text-xs text-muted-foreground">Verden v2.0.0 (Beta)</span>
      </div>
    </div>
  );
};

export default Profile;
