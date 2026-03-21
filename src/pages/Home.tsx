import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Leaf, Clock, Navigation2, MapPin } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import Map from "@/components/verden/Map";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";
import verdenLogo from "@/assets/verden-logo.png";
import { searchPlaces } from "@/services/photon";
import { getRoute } from "@/services/osrm";

const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [fastestRoute, setFastestRoute] = useState(null);
  const [greenestRoute, setGreenestRoute] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const navigate = useNavigate();
  const { credits, addCredits } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
      });
    }
  }, []);

  const handleSearch = async () => {
    if (query.trim()) {
      const results = await searchPlaces(query);
      setSuggestions(results);
      setShowSuggestions(true);
    }
  };

  const handleSelect = async (place) => {
    setQuery(place.properties.name);
    setSelectedDest(place);
    setShowSuggestions(false);

    if (userLocation) {
      const route = await getRoute(userLocation, place.geometry.coordinates);
      const distanceInKm = route.distance / 1000;
      const durationInMin = Math.round(route.duration / 60);

      const fastest = {
        distance: distanceInKm.toFixed(1),
        duration: durationInMin,
        co2: (distanceInKm * 0.12).toFixed(1),
        geometry: route.geometry,
      };

      const greenest = {
        ...fastest,
        duration: Math.round(durationInMin * 1.1),
        co2: (distanceInKm * 0.12 * 0.8).toFixed(1), // 20% reduction
      };

      setFastestRoute(fastest);
      setGreenestRoute(greenest);
      setShowRoutes(true);
    }
  };

  const handleNavigation = (route) => {
    addCredits(route === greenestRoute ? 15 : 5);
    navigate("/navigation", { state: { route } });
  };

  return (
    <div className="mobile-container bg-background">
      <Map destination={selectedDest} fastestRoute={fastestRoute} greenestRoute={greenestRoute} />

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
              handleSearch();
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
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2"
            >
              <GlassCard variant="strong" className="p-0 overflow-hidden">
                {suggestions.map((place, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(place)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <MapPin size={16} className="text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{place.properties.name}</p>
                      <p className="text-[11px] text-muted-foreground">{place.properties.street}, {place.properties.city}</p>
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
              <span className="text-xs text-foreground font-medium truncate">{selectedDest.properties.name}</span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route options */}
      <AnimatePresence>
        {showRoutes && fastestRoute && greenestRoute && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-24 left-0 right-0 z-20 px-4 space-y-3"
          >
            <GlassCard
              variant="default"
              className="cursor-pointer hover:border-muted-foreground/30 transition-colors"
              onClick={() => handleNavigation(fastestRoute)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-verden-electric" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">Fastest Route</p>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> {fastestRoute.duration} min</span>
                    <span>{fastestRoute.distance} km</span>
                    <span>{fastestRoute.co2} kg CO₂</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              variant="glow"
              className="cursor-pointer"
              onClick={() => handleNavigation(greenestRoute)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center shrink-0">
                  <Leaf size={20} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">Greenest Route</p>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> {greenestRoute.duration} min</span>
                    <span>{greenestRoute.distance} km</span>
                    <span className="text-primary font-medium">{greenestRoute.co2} kg CO₂</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="mt-3 glass rounded-xl px-3 py-2 flex items-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Leaf size={14} className="text-primary" />
                <span className="text-xs font-medium text-foreground">You save {(fastestRoute.co2 - greenestRoute.co2).toFixed(1)} kg CO₂ with this route</span>
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
