import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Share2, Award, MapPin, Home } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

const TripSummary = () => {
  const navigate = useNavigate();
  const { completeTrip, lastGreenestRoute } = useApp();
  const [credited, setCredited] = useState(false);

  const route = lastGreenestRoute;

  const co2Saved = route ? (route.co2 * 0.2).toFixed(1) : 0; // Assuming 20% savings for greenest route
  const creditsEarned = route && route.isGreenest ? 15 : 5;

  useEffect(() => {
    if (route && !credited) {
        completeTrip(parseFloat(co2Saved as string), creditsEarned);
        setCredited(true);
    }
  }, [credited, completeTrip, co2Saved, creditsEarned, route]);

  if (!route) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <GlassCard className="p-8 max-w-sm">
          <Award size={48} className="text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-foreground font-medium">No trip data found.</p>
          <GlassButton className="mt-6 w-full" onClick={() => navigate("/home")}>Go Home</GlassButton>
        </GlassCard>
      </div>
    );
  }

  const stats = [
    { label: "Distance", value: `${route.distance} km`, icon: MapPin },
    { label: "CO₂ Saved", value: `${co2Saved} kg`, icon: Leaf },
    { label: "Credits Earned", value: `+${creditsEarned}`, icon: Award },
  ];

  return (
    <div className="relative w-full h-full p-6 pb-32 overflow-y-auto flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-verden-neon/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col min-h-full pt-8">
        <motion.div
           className="flex flex-col items-center text-center mb-12"
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", duration: 0.6 }}
        >
          <motion.div
            className="w-28 h-28 rounded-full bg-gradient-green flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <Leaf size={48} className="text-primary-foreground" />
          </motion.div>
          <h1 className="font-display text-4xl font-black text-foreground mb-3 tracking-tight">Great Trip!</h1>
          <p className="text-muted-foreground font-medium">You made a significant eco-impact today 🌿</p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-5 p-4 shadow-xl border-primary/5 hover:border-primary/20 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-green flex items-center justify-center shadow-lg shrink-0">
                  <s.icon size={24} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-display font-black text-2xl text-foreground">{s.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto space-y-3 pb-4">
          <GlassButton variant="glow" size="lg" className="w-full h-14 text-sm font-bold flex items-center justify-center gap-3 rounded-2xl">
            <Share2 size={20} />
            Share Your Impact
          </GlassButton>
          <GlassButton variant="glass" size="lg" className="w-full h-14 text-sm font-bold flex items-center justify-center gap-3 rounded-2xl" onClick={() => navigate("/home")}>
            <Home size={20} />
            Back to Map
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
