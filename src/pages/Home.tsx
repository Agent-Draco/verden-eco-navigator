import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Leaf, Clock, Navigation2, MapPin } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import MapBackground from "@/components/verden/MapBackground";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";
import verdenLogo from "@/assets/verden-logo.png";

const suggestions = [
  { name: "Central Park", address: "5th Ave, Midtown" },
  { name: "Tech Hub Office", address: "101 Innovation Dr" },
  { name: "Green Valley Mall", address: "42 Eco Boulevard" },
  { name: "University Campus", address: "300 Scholar Way" },
  { name: "Airport Terminal 2", address: "Airport Rd, East" },
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");
  const navigate = useNavigate();
  const { credits } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = suggestions.filter(
    (s) =>
      query.length > 0 &&
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.address.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (name: string) => {
    setQuery(name);
    setSelectedDest(name);
    setShowSuggestions(false);
    setShowRoutes(true);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSelectedDest(query);
      setShowSuggestions(false);
      setShowRoutes(true);
    }
  };

  return (
    <div className="mobile-container bg-background">
      <MapBackground />

      {/* Top bar */}
      <div className="relative z-10 px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <img src={verdenLogo} alt="Verden" className="w-8 h-8" />
          <div className="glass rounded-full px-3 py-1 flex items-center gap-2">
            <Leaf size={14} className="text-primary" />
            <span className="text-xs font-display font-semibold text-foreground">{credits} credits</span>
          </div>
        </div>

        {/* Search bar */}
        <GlassCard variant="strong" className="flex items-center gap-3 px-4 py-3">
          <Search size={20} className="text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Where to?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setShowRoutes(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
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

        {/* Autocomplete */}
        <AnimatePresence>
          {showSuggestions && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2"
            >
              <GlassCard variant="strong" className="p-0 overflow-hidden">
                {filtered.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => handleSelect(s.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <MapPin size={16} className="text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground">{s.address}</p>
                    </div>
                  </button>
                ))}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Destination indicator */}
      <AnimatePresence>
        {selectedDest && showRoutes && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 px-4 mt-3"
          >
            <GlassCard variant="subtle" className="flex items-center gap-2 py-2 px-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-foreground font-medium">Current Location</span>
              <span className="text-xs text-muted-foreground mx-1">→</span>
              <MapPin size={12} className="text-primary" />
              <span className="text-xs text-foreground font-medium truncate">{selectedDest}</span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route options */}
      <AnimatePresence>
        {showRoutes && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-24 left-0 right-0 z-20 px-4 space-y-3"
          >
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
