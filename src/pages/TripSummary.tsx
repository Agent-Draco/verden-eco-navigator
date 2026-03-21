import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Share2, Award, MapPin, Home } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

const TripSummary = () => {
  const navigate = useNavigate();
  const { completeTrip } = useApp();
  const [credited, setCredited] = useState(false);

  const co2Saved = 1.5;
  const creditsEarned = 15;

  useEffect(() => {
    if (!credited) {
      completeTrip(co2Saved, creditsEarned);
      setCredited(true);
    }
  }, [credited, completeTrip]);

  const stats = [
    { label: "Distance", value: "9.1 km", icon: MapPin },
    { label: "CO₂ Saved", value: `${co2Saved} kg`, icon: Leaf },
    { label: "Credits Earned", value: `+${creditsEarned}`, icon: Award },
  ];

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-verden-neon/10 blur-[100px]" />

      {/* Confetti-like particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          initial={{
            x: 200,
            y: 100,
            scale: 0,
          }}
          animate={{
            x: 50 + Math.random() * 300,
            y: 50 + Math.random() * 200,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
        />
      ))}

      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-12 pb-8">
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-green flex items-center justify-center mb-6 glow-green"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Leaf size={40} className="text-primary-foreground" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Great Trip!</h1>
          <p className="text-muted-foreground">You made an eco-friendly choice 🌿</p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-green flex items-center justify-center">
                  <s.icon size={20} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display font-bold text-lg text-foreground">{s.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <GlassButton variant="glass" size="lg" className="w-full flex items-center justify-center gap-2">
            <Share2 size={18} />
            Share Trip
          </GlassButton>
          <GlassButton size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => navigate("/home")}>
            <Home size={18} />
            Back to Map
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
