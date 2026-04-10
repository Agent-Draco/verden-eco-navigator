import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Leaf, Clock, Navigation2, MapPin, Car, Bike, Bus } from "lucide-react";
import {GlassCard} from "@/components/verden/GlassCard";
import {GlassButton} from "@/components/verden/GlassButton";
import Map from "@/components/verden/Map";
import { useApp } from "@/contexts/AppContext";
import verdenLogo from "@/assets/verden-logo.png";
import { searchPlaces } from "@/services/nominatim";
import { getRoute } from "@/services/osrm";
import { useGeoNavigation } from "@/hooks/useGeoNavigation";
import {SearchOverlay} from "@/components/verden/SearchOverlay";

const POPULAR_SUGGESTIONS = [
  { name: "Indira Gandhi Int'l Airport", city: "Delhi", state: "Delhi", lat: 28.5562, lon: 77.1000 },
  { name: "Chhatrapati Shivaji Int'l", city: "Mumbai", state: "Maharashtra", lat: 19.0896, lon: 72.8656 },
  { name: "Apollo Hospital", city: "Chennai", state: "Tamil Nadu", lat: 13.0644, lon: 80.2520 },
  { name: "New Delhi Railway Station", city: "Delhi", state: "Delhi", lat: 28.6430, lon: 77.2223 },
  { name: "Phoenix Marketcity", city: "Pune", state: "Maharashtra", lat: 18.5622, lon: 73.9167 },
];

export const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { location: userLocation, bearing: userHeading } = useGeoNavigation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { credits, setLastGreenestRoute, setNavHidden } = useApp();

  // ── Sync Navbar Visibility ────────────────────────────────────────────────
  useEffect(() => {
    setNavHidden(isOverlayOpen);
  }, [isOverlayOpen, setNavHidden]);

  // ── Sort Popular Suggestions by Proximity ──────────────────────────────────
  const sortedPopularSuggestions = [...POPULAR_SUGGESTIONS].sort((a, b) => {
    if (!userLocation || !userLocation[0] || !userLocation[1]) return 0;
    const distA = Math.pow(a.lat - userLocation[0], 2) + Math.pow(a.lon - userLocation[1], 2);
    const distB = Math.pow(b.lat - userLocation[0], 2) + Math.pow(b.lon - userLocation[1], 2);
    return distA - distB;
  });

  // ── Load Recent Searches ──────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("verden_recent_searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // ── Debounced Search Logic ───────────────────────────────────────────────
  useEffect(() => {
    if (query.trim().length >= 3) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        try {
            const results = await searchPlaces(query, userLocation);
            setSuggestions(results || []);
            setShowSuggestions(true);
            setShowRoutes(false);
        } finally {
            setIsSearching(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsSearching(false);
      if (query.length === 0) setShowSuggestions(true);
    }
  }, [query, userLocation]);

  const handleSelect = async (place) => {
    // Save to Recent Searches
    const updatedRecents = [
      place,
      ...recentSearches.filter(r => r.properties.display_name !== place.properties.display_name)
    ].slice(0, 8);
    setRecentSearches(updatedRecents);
    localStorage.setItem("verden_recent_searches", JSON.stringify(updatedRecents));

    setQuery(place.properties.name);
    setSelectedDest(place);
    setShowSuggestions(false);
    setIsOverlayOpen(false);
    setFastestRoute(null);
    setGreenestRoute(null);

    if (userLocation) {
      const userCoords: [number, number] = [userLocation[1], userLocation[0]];
      const destCoords: [number, number] = place.geometry.coordinates;
      
      const routes = await getRoute(userCoords, destCoords);
      if (!routes || routes.length === 0) return;

      const processedRoutes = routes.map(route => ({
        ...route,
        co2: (route.distance / 1000) * 0.12,
        distance: parseFloat((route.distance / 1000).toFixed(1)),
        duration: Math.round(route.duration / 60),
      }));

      setFastestRoute(processedRoutes[0]);
      setGreenestRoute(processedRoutes[0]);
      setShowRoutes(true);
    }
  };

  const handleNavigation = (route) => {
    const isGreenest = route.co2 === greenestRoute?.co2;
    setLastGreenestRoute(route, isGreenest);
    navigate("/navigation", { state: { route, destination: selectedDest } });
  };
  
  const co2Difference = fastestRoute && greenestRoute ? parseFloat((fastestRoute.co2 - greenestRoute.co2).toFixed(1)) : 0;

  return (
    <div className="w-full h-full relative overflow-hidden bg-topographic">
      {/* Background Map */}
      <Map 
        userLocation={userLocation}
        userHeading={userHeading}
        bearing={userHeading}
        destination={selectedDest}
        fastestRoute={fastestRoute}
        greenestRoute={greenestRoute}
      />
      
      {/* Search and Navigation Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col md:flex-row md:items-start md:p-6 p-4 pt-6 gap-4 overflow-hidden">
        
        {/* Main Search Panel */}
        <div className="w-full md:w-[380px] pointer-events-auto flex flex-col gap-4 max-h-full">
          
          {/* Top Bar (Logo & Credits) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-0"
          >
            <img src={verdenLogo} alt="Verden" className="w-8 h-8 drop-shadow-lg" />
            <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2 shadow-liquid transition-liquid hover:scale-105">
              <Leaf size={14} className="text-primary" />
              <span className="text-xs font-display font-bold text-foreground">{credits} credits</span>
            </div>
          </motion.div>

          {/* Search Input Pane */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <GlassCard 
              variant="strong" 
              className="flex items-center gap-4 px-6 py-4 shadow-liquid border-white/20 transition-liquid group cursor-pointer hover:bg-white/5"
              onClick={() => {
                setIsOverlayOpen(true);
              }}
            >
              <Search size={22} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
              <div className="flex-1 text-muted-foreground font-display font-medium text-lg h-5 leading-none overflow-hidden">
                {query || "Where to?"}
              </div>
              {isSearching && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              )}
            </GlassCard>

            {/* Transport & Mode Controls */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-around bg-white/5 backdrop-blur-xl rounded-[24px] p-1 gap-1 border border-white/10 shadow-liquid">
                    <GlassButton onClick={() => setTransportMode('car')} variant={transportMode === 'car' ? 'default' : 'glass'} size="icon" className="flex-1 h-12 text-foreground rounded-[20px]"><Car size={20}/></GlassButton>
                    <GlassButton onClick={() => setTransportMode('bike')} variant={transportMode === 'bike' ? 'default' : 'glass'} size="icon" className="flex-1 h-12 text-xl rounded-[20px]">🏍️</GlassButton>
                    <GlassButton onClick={() => setTransportMode('cycle')} variant={transportMode === 'cycle' ? 'default' : 'glass'} size="icon" className="flex-1 h-12 text-foreground rounded-[20px]"><Bike size={20}/></GlassButton>
                    <GlassButton onClick={() => setTransportMode('public')} variant={transportMode === 'public' ? 'default' : 'glass'} size="icon" className="flex-1 h-12 text-foreground rounded-[20px]"><Bus size={20}/></GlassButton>
                </div>
                
                <div className="flex gap-2">
                    <GlassButton onClick={() => setRoutePreference('fast')} variant={routePreference === 'fast' ? 'default' : 'glass'} size="sm" className="flex-1 h-10 text-xs">
                        <Zap size={14} className="mr-1.5" />
                        Fastest
                    </GlassButton>
                    <GlassButton onClick={() => setRoutePreference('eco')} variant={routePreference === 'eco' ? 'glow' : 'glass'} size="sm" className="flex-1 h-10 text-xs text-primary-foreground">
                        <Leaf size={14} className="mr-1.5" />
                        Eco
                    </GlassButton>
                </div>
            </div>
          </motion.div>

          {/* Search Results Overlay */}
          <SearchOverlay 
            isOpen={isOverlayOpen}
            onClose={() => {
              setIsOverlayOpen(false);
              setNavHidden(false);
            }}
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            recentSearches={recentSearches}
            popularSuggestions={sortedPopularSuggestions}
            onSelect={handleSelect}
            isSearching={isSearching}
          />
        </div>
        
        {/* Additional Desktop Panels */}
        {transportMode === 'public' && (
            <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} className="w-full md:w-[280px] pointer-events-auto">
                <GlassCard className="p-3 shadow-lg">
                    <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">Public Transport</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                            { id: 'bus', label: 'Bus' },
                            { id: 'shuttle', label: 'Shuttle' },
                            { id: 'metro', label: 'Metro' },
                            { id: 'cycle', label: 'Cycle' }
                        ].map(opt => (
                            <label key={opt.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border/50 cursor-pointer hover:bg-secondary transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={publicTransportOptions[opt.id as keyof typeof publicTransportOptions]} 
                                    onChange={e => setPublicTransportOptions({...publicTransportOptions, [opt.id]: e.target.checked})} 
                                    className="accent-primary"
                                /> 
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showRoutes && fastestRoute && greenestRoute && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-24 md:bottom-10 md:left-[400px] left-0 right-0 z-20 px-4 space-y-3 md:max-w-md"
          >
            <GlassCard
              variant="default"
              className="cursor-pointer hover:border-muted-foreground/30 transition-colors shadow-2xl"
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
              className="cursor-pointer shadow-2xl"
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
    </div>
  );
};
