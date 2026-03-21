import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Wallet, Car, Crown, ChevronRight, Leaf, Settings, LogOut } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import BottomNav from "@/components/verden/BottomNav";
import VerdenLogo from "@/components/verden/VerdenLogo";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Car, label: "Vehicle Profile", path: "/vehicle", detail: "Toyota Camry" },
    { icon: Crown, label: "Membership", path: "#", detail: "Free Tier" },
    { icon: Settings, label: "Settings", path: "#", detail: "" },
    { icon: LogOut, label: "Sign Out", path: "/", detail: "" },
  ];

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-verden-lavender/10 blur-[80px]" />

      <div className="relative z-10 px-5 pt-8 pb-28 overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Alex Green</h1>
            <p className="text-sm text-muted-foreground">Member since Jan 2025</p>
          </div>
        </div>

        {/* Wallet */}
        <GlassCard variant="glow" className="p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Wallet size={18} className="text-primary" />
            <span className="font-display font-semibold text-foreground">Green Wallet</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="font-display text-3xl font-bold text-foreground">240</span>
            <span className="text-sm text-muted-foreground pb-1">credits</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">60 credits to Silver Tier</p>
        </GlassCard>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: "42", label: "Trips" },
            { val: "18.4", label: "kg CO₂ saved" },
            { val: "7", label: "Day streak" },
          ].map((s) => (
            <GlassCard key={s.label} variant="subtle" className="text-center p-3">
              <p className="font-display font-bold text-lg text-foreground">{s.val}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <GlassCard
              key={item.label}
              className="flex items-center gap-3 cursor-pointer px-4 py-3"
              onClick={() => navigate(item.path)}
            >
              <item.icon size={18} className="text-primary" />
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              {item.detail && <span className="text-xs text-muted-foreground">{item.detail}</span>}
              <ChevronRight size={16} className="text-muted-foreground" />
            </GlassCard>
          ))}
        </div>

        {/* Branding */}
        <div className="flex items-center justify-center gap-2 mt-10 opacity-40">
          <VerdenLogo size={20} />
          <span className="font-display text-xs text-muted-foreground">Verden v1.0</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
