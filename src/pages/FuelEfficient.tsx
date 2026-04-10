import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Fuel, DollarSign, Gauge, Leaf } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import MapBackground from "@/components/verden/MapBackground";

const FuelEfficient = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background">
      <MapBackground className="opacity-20" />

      <div className="relative z-10 flex flex-col min-h-screen px-5 pt-6 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Fuel Efficient Route</h1>
        <p className="text-sm text-muted-foreground mb-8">No eco route available — here's the most efficient option.</p>

        <div className="space-y-3 mb-8">
          {[
            { icon: Gauge, label: "Optimized Mileage", value: "18.5 km/L", color: "text-verden-electric" },
            { icon: Fuel, label: "Fuel Saved", value: "0.4 L", color: "text-primary" },
            { icon: DollarSign, label: "Cost Saved", value: "$1.20", color: "text-verden-lavender" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                  <s.icon size={20} className={s.color} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display font-bold text-lg text-foreground">{s.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard variant="subtle" className="flex items-center gap-3 mb-8">
          <Leaf size={16} className="text-primary" />
          <p className="text-xs text-muted-foreground">Tip: EVs unlock more eco routes! Check vehicle settings.</p>
        </GlassCard>

        <div className="mt-auto">
          <GlassButton size="lg" className="w-full" onClick={() => navigate("/navigate")}>
            Start Route
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default FuelEfficient;
