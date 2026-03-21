import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Leaf, Clock, Fuel, CloudRain, ArrowLeft, Check } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import MapBackground from "@/components/verden/MapBackground";

const RouteComparison = () => {
  const navigate = useNavigate();

  const routes = [
    {
      label: "Fastest",
      icon: Zap,
      iconColor: "text-verden-electric",
      iconBg: "bg-secondary",
      time: "22 min",
      fuel: "0.8 L",
      co2: "2.1 kg",
      variant: "default" as const,
    },
    {
      label: "Greenest",
      icon: Leaf,
      iconColor: "text-primary-foreground",
      iconBg: "bg-gradient-green",
      time: "26 min",
      fuel: "0.3 L",
      co2: "0.6 kg",
      variant: "glow" as const,
    },
  ];

  return (
    <div className="mobile-container bg-background">
      <MapBackground className="opacity-30" />

      <div className="relative z-10 flex flex-col min-h-screen px-4 pt-6 pb-8">
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Compare Routes</h1>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {routes.map((r, i) => (
            <GlassCard key={r.label} variant={r.variant} className="flex flex-col items-center text-center p-5"
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-2xl ${r.iconBg} flex items-center justify-center mb-3`}>
                <r.icon size={24} className={r.iconColor} />
              </div>
              <p className="font-display font-semibold text-foreground text-sm mb-4">{r.label}</p>

              <div className="space-y-3 w-full text-left">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{r.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{r.fuel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain size={14} className="text-muted-foreground" />
                  <span className={`text-sm ${r.label === "Greenest" ? "text-primary font-semibold" : "text-foreground"}`}>{r.co2}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Savings indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="subtle" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center">
              <Leaf size={18} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-foreground">Save 1.5 kg CO₂</p>
              <p className="text-xs text-muted-foreground">+15 green credits earned</p>
            </div>
          </GlassCard>
        </motion.div>

        <div className="mt-auto">
          <GlassButton size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => navigate("/navigate")}>
            <Check size={18} />
            Choose Greener Route
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default RouteComparison;
