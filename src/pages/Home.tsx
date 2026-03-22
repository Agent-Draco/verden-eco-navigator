import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Leaf, Clock, Navigation2, MapPin, Car, Bike, Bus } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import Map from "@/components/verden/Map";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";
import verdenLogo from "@/assets/verden-logo.png";
import { searchPlaces } from "@/services/photon";
import { getRoute } from "@/services/osrm";
import { useGeoNavigation } from "@/hooks/useGeoNavigation";

const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [fastestRoute, setFastestRoute] = useState(null);
  const [greenestRoute, setGreenestRoute] = useState(null);

  const [transportMode, setTransportMode] = useState<'car' | 'bike' | 'cycle' | 'public'>('car');
  const [routePreference, setRoutePreference] = useState<'fast' | 'eco'>('fast');
  const [publicTransportOptions, setPublicTransportOptions] = useState({
    bus: true, shuttle: true, metro: true, cycle: true,
  });

  // ── Automatic GPS + compass + speed (no manual entry) ─────────────────────
  const { location: userLocation, bearing: userHeading } = useGeoNavigation();

  const navigate = useNavigate();
  const { credits, setLastGreenestRoute } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (query.trim()) {
      const results = await searchPlaces(query);
      setSuggestions(results);
      setShowSuggestions(true);
    }
  };

  const calculateCO2 = (distance, duration) => {
    const distance_km = distance / 1000;
    const duration_min = duration / 60;
    if (duration_min === 0) return 0;

    const avgSpeed = distance_km / (duration_min / 60);
    
    let stopPenalty = 1;
    if (avgSpeed < 25) {
      stopPenalty = 1.25;
    } else if (avgSpeed <= 40) {
      stopPenalty = 1.1;
    }

    const roadEfficiency = 1;

    const co2 = distance_km * 0.12 * stopPenalty * roadEfficiency;
    return parseFloat(co2.toFixed(1));
  };

  const handleSelect = async (place) => {
    setQuery(place.properties.name);
    setSelectedDest(place);
    setShowSuggestions(false);
    setFastestRoute(null);
    setGreenestRoute(null);

    if (userLocation) {
      const userCoords: [number, number] = [userLocation[1], userLocation[0]];
      const destCoords: [number, number] = place.geometry.coordinates;
      
      const routes = await getRoute(userCoords, destCoords);
      if (!routes || routes.length === 0) return;

      const processedRoutes = routes.map(route => ({
        ...route,
        co2: calculateCO2(route.distance, route.duration),
        distance: parseFloat((route.distance / 1000).toFixed(1)),
        duration: Math.round(route.duration / 60),
      }));

      const fastest = [...processedRoutes].sort((a, b) => a.duration - b.duration)[0];
      const greenest = [...processedRoutes].sort((a, b) => a.co2 - b.co2)[0];

      setFastestRoute(fastest);
      setGreenestRoute(greenest);
      setShowRoutes(true);
    }
  };

  const handleNavigation = (route) => {
    const isGreenest = route.co2 === greenestRoute.co2;
    setLastGreenestRoute(route, isGreenest);
    navigate("/navigation", { state: { route, destination: selectedDest } });
  };
  
  const co2Difference = fastestRoute && greenestRoute ? parseFloat((fastestRoute.co2 - greenestRoute.co2).toFixed(1)) : 0;

  return (
    <div className="mobile-container bg-background">
      <Map 
        userLocation={userLocation}
        userHeading={userHeading}
        bearing={userHeading}
        destination={selectedDest}
        fastestRoute={fastestRoute}
        greenestRoute={greenestRoute}
      />

      <div className="relative z-10 px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <img src={verdenLogo} alt="Verden" className="w-8 h-8" />
          <div className="glass rounded-full px-3 py-1 flex items-center gap-2">
            <Leaf size={14} className="text-primary" />
            <span className="text-xs font-display font-semibold text-foreground">{credits} credits</span>
          </div>
        </div>

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
              if(e.target.value.length > 2) handleSearch();
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body"
          />
        </GlassCard>

        <div className="flex justify-around my-3">
            <GlassButton onClick={() => setTransportMode('car')} variant={transportMode === 'car' ? 'default' : 'glass'} size="icon" className="w-14 h-14"><Car/></GlassButton>
            <GlassButton onClick={() => setTransportMode('bike')} variant={transportMode === 'bike' ? 'default' : 'glass'} size="icon" className="w-14 h-14 text-2xl">🏍️</GlassButton>
            <GlassButton onClick={() => setTransportMode('cycle')} variant={transportMode === 'cycle' ? 'default' : 'glass'} size="icon" className="w-14 h-14"><Bike/></GlassButton>
            <GlassButton onClick={() => setTransportMode('public')} variant={transportMode === 'public' ? 'default' : 'glass'} size="icon" className="w-14 h-14"><Bus/></GlassButton>
        </div>
        
        {transportMode === 'public' && (
            <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}}>
                <GlassCard className="p-2 mb-3">
                    <p className="text-xs text-center text-muted-foreground mb-2">Select public transport</p>
                    <div className="flex justify-around text-xs text-foreground">
                        <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={publicTransportOptions.bus} onChange={e => setPublicTransportOptions({...publicTransportOptions, bus: e.target.checked})} className="form-checkbox h-3 w-3 text-primary bg-secondary border-border" /> Bus</label>
                        <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={publicTransportOptions.shuttle} onChange={e => setPublicTransportOptions({...publicTransportOptions, shuttle: e.target.checked})} className="form-checkbox h-3 w-3 text-primary bg-secondary border-border"/> Shuttle</label>
                        <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={publicTransportOptions.metro} onChange={e => setPublicTransportOptions({...publicTransportOptions, metro: e.target.checked})} className="form-checkbox h-3 w-3 text-primary bg-secondary border-border"/> Metro</label>
                        <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={publicTransportOptions.cycle} onChange={e => setPublicTransportOptions({...publicTransportOptions, cycle: e.target.checked})} className="form-checkbox h-3 w-3 text-primary bg-secondary border-border"/> Cycle</label>
                    </div>
                </GlassCard>
            </motion.div>
        )}

        <div className="flex justify-center gap-2">
            <GlassButton onClick={() => setRoutePreference('fast')} variant={routePreference === 'fast' ? 'default' : 'glass'} size="sm" className="w-1/2">
                <Zap size={16} className="mr-2" />
                Fastest
            </GlassButton>
            <GlassButton onClick={() => setRoutePreference('eco')} variant={routePreference === 'eco' ? 'glow' : 'glass'} size="sm" className="w-1/2">
                <Leaf size={16} className="mr-2" />
                Eco
            </GlassButton>
        </div>

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
                      <p className="text-[11px] text-muted-foreground">{place.properties.city || place.properties.country}</p>
                    </div>
                  </button>
                ))}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
              {co2Difference > 0 && (
                <motion.div
                  className="mt-3 glass rounded-xl px-3 py-2 flex items-center gap-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Leaf size={14} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">You save {co2Difference} kg CO₂ with this route</span>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default Home;
