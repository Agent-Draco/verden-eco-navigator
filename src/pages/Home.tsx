import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Leaf, Clock, Navigation2 } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import MapBackground from "@/components/verden/MapBackground";
import BottomNav from "@/components/verden/BottomNav";
import VerdenLogo from "@/components/verden/VerdenLogo";

const Home = () => {
  const [query, setQuery] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) setShowRoutes(true);
  };

  return (
    <div className="mobile-container bg-background">
      <MapBackground />

      {/* Top bar */}
      <div className="relative z-10 px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <VerdenLogo size={32} />
          <div className="glass rounded-full px-3 py-1 flex items-center gap-2">
            <Leaf size={14} className="text-primary" />
            <span className="text-xs font-display font-semibold text-foreground">240 credits</span>
          </div>
        </div>

        {/* Search bar */}
        <GlassCard variant="strong" className="flex items-center gap-3 px-4 py-3">
          <Search size={20} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Where to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body"
          />
          {query && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleSearch}
              className="bg-primary rounded-xl p-2"
            >
              <Navigation2 size={16} className="text-primary-foreground" />
            </motion.button>
          )}
        </GlassCard>
      </div>

      {/* Route options */}
      <AnimatePresence>
        {showRoutes && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-24 left-0 right-0 z-20 px-4 space-y-3"
          >
            {/* Fastest */}
            <GlassCard
              variant="default"
              className="cursor-pointer hover:border-muted-foreground/30 transition-colors"
              onClick={() => navigate("/compare")}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-verden-electric" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">Fastest Route</p>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> 22 min</span>
                    <span>8.4 km</span>
                    <span>2.1 kg CO₂</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Greenest */}
            <GlassCard
              variant="glow"
              className="cursor-pointer"
              onClick={() => navigate("/compare")}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center shrink-0">
                  <Leaf size={20} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">Greenest Route</p>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> 26 min</span>
                    <span>9.1 km</span>
                    <span className="text-primary font-medium">0.6 kg CO₂</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="mt-3 glass rounded-xl px-3 py-2 flex items-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Leaf size={14} className="text-primary" />
                <span className="text-xs font-medium text-foreground">You save 1.5 kg CO₂ with this route</span>
              </motion.div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default Home;
