import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, MapPin, Zap } from "lucide-react";
import GlassCard from "./GlassCard";
import GlassButton from "./GlassButton";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  suggestions: any[];
  recentSearches: any[];
  popularSuggestions: any[];
  onSelect: (place: any) => void;
  isSearching: boolean;
}

const SearchOverlay = ({
  isOpen,
  onClose,
  query,
  setQuery,
  suggestions,
  recentSearches,
  popularSuggestions,
  onSelect,
  isSearching,
}: SearchOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background/60 backdrop-blur-2xl flex flex-col items-center p-4 md:p-8 overflow-hidden"
        >
          {/* Main Container */}
          <div className="w-full max-w-2xl flex flex-col h-full gap-6">
            
            {/* Header / Search Bar */}
            <div className="flex items-center gap-4">
              <GlassCard variant="strong" className="flex-1 flex items-center gap-4 px-6 py-4 shadow-liquid border-white/20 group focus-within:ring-2 focus-within:ring-primary/40">
                <Search size={24} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Where to?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-display font-medium text-xl leading-none"
                />
                {isSearching && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                )}
                {query.length > 0 && (
                  <button onClick={() => setQuery("")} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} className="text-muted-foreground" />
                  </button>
                )}
              </GlassCard>
              <GlassButton 
                variant="glass" 
                size="icon" 
                onClick={onClose}
                className="w-14 h-14 rounded-2xl shrink-0"
              >
                <X size={24} />
              </GlassButton>
            </div>

            {/* Results Area */}
            <GlassCard className="flex-1 overflow-hidden p-0 flex flex-col shadow-2xl bg-white/5 border-white/5 rounded-[40px]">
              <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                
                {/* Active Search Results */}
                {query.length >= 3 && (
                  <div className="px-2">
                    {suggestions.length > 0 ? (
                      suggestions.map((place, i) => (
                        <motion.button
                          key={`res-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => onSelect(place)}
                          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/10 transition-colors rounded-[24px] mb-1 group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <MapPin size={22} className="text-primary" />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <p className="text-lg font-bold text-foreground truncate">{place.properties.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {place.properties.city}
                              {place.properties.state ? ', ' + place.properties.state : ''}
                              {place.properties.country ? ', ' + place.properties.country : ''}
                            </p>
                          </div>
                        </motion.button>
                      ))
                    ) : !isSearching && (
                      <div className="py-20 text-center opacity-50">
                        <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium italic">No results found for "{query}"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Default State: Recent & Popular */}
                {query.length < 3 && (
                  <div className="space-y-6">
                    {recentSearches.length > 0 && (
                      <section className="px-6">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <Clock size={14} /> Recent Searches
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {recentSearches.map((place, i) => (
                            <button
                              key={`recent-${i}`}
                              onClick={() => onSelect(place)}
                              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center shrink-0">
                                <Clock size={16} className="text-muted-foreground" />
                              </div>
                              <div className="truncate">
                                <p className="text-sm font-bold text-foreground truncate">{place.properties.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{place.properties.city}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </section>
                    )}

                    <section className="px-6 pb-6">
                      <p className="text-xs font-black uppercase tracking-widest text-verden-electric mb-4 flex items-center gap-2">
                        <Zap size={14} /> Popular Destinations
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {popularSuggestions.map((place, i) => (
                          <button
                            key={`pop-${i}`}
                            onClick={() => onSelect({
                              type: "Feature",
                              geometry: { type: "Point", coordinates: [place.lon, place.lat] },
                              properties: { 
                                name: place.name, 
                                display_name: place.name, 
                                city: place.city, 
                                state: place.state,
                                country: "India" // Default for popular items
                              }
                            })}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-verden-electric/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <Zap size={20} className="text-verden-electric" />
                            </div>
                            <div className="truncate">
                              <p className="text-base font-bold text-foreground truncate">{place.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{place.city}, {place.state}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </GlassCard>
            
          </div>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary-rgb), 0.2); border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--primary-rgb), 0.3); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
