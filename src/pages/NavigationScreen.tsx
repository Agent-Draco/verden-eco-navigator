import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Leaf, Navigation2 } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import MapBackground from "@/components/verden/MapBackground";

const NavigationScreen = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(9.1);
  const [time, setTime] = useState(26);
  const [co2, setCo2] = useState(0.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance((d) => {
        const next = Math.max(0, d - 0.3);
        if (next <= 0) {
          clearInterval(interval);
          setTimeout(() => navigate("/summary"), 500);
        }
        return next;
      });
      setTime((t) => Math.max(0, t - 1));
      setCo2((c) => Math.min(0.6, c + 0.02));
    }, 800);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="mobile-container bg-background">
      <MapBackground />

      {/* Direction banner */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10"
      >
        <div className="mx-4 mt-6">
          <GlassCard variant="strong" className="flex items-center gap-4 px-5 py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-green flex items-center justify-center">
              <ArrowUp size={24} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-lg text-foreground">Continue Straight</p>
              <p className="text-sm text-muted-foreground">for 400m, then turn right</p>
            </div>
          </GlassCard>
        </div>
      </motion.div>

      {/* Navigation icon */}
      <div className="relative z-10 flex-1 flex items-center justify-center" style={{ height: "50vh" }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-green flex items-center justify-center glow-green">
            <Navigation2 size={28} className="text-primary-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8"
      >
        <GlassCard variant="strong" className="p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{distance.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">km left</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{time}</p>
              <p className="text-xs text-muted-foreground mt-1">min left</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-primary">{co2.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">kg CO₂</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-green rounded-full"
              style={{ width: `${((9.1 - distance) / 9.1) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Leaf size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Eco route active • Saving 1.5 kg CO₂</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NavigationScreen;
