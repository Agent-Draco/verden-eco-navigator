import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Share2, Award, MapPin, Home } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

const TripSummary = () => {
  const navigate = useNavigate();
  const { completeTrip, lastGreenestRoute, addCredits } = useApp();
  const [credited, setCredited] = useState(false);

  const route = lastGreenestRoute;

  const co2Saved = route ? (route.co2 * 0.2).toFixed(1) : 0; // Assuming 20% savings for greenest route
  const creditsEarned = route && route.isGreenest ? 15 : 5;

  useEffect(() => {
    if (route && !credited) {
        completeTrip(parseFloat(co2Saved), creditsEarned);
        setCredited(true);
    }
  }, [credited, completeTrip, co2Saved, creditsEarned, route]);

  if (!route) {
    // navigate('/home'); // Optional: redirect if no route data
    return null;
  }

  const stats = [
    { label: "Distance", value: `${route.distance} km`, icon: MapPin },
    { label: "CO₂ Saved", value: `${co2Saved} kg`, icon: Leaf },
    { label: "Credits Earned", value: `+${creditsEarned}`, icon: Award },
  ];

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-verden-neon/10 blur-[100px]" />

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
