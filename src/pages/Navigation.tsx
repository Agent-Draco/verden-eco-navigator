import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flag, Clock, Navigation2, AlertCircle, MapPin, ChevronRight, Share2, Printer } from 'lucide-react';
import GlassButton from '@/components/verden/GlassButton';
import GlassCard from '@/components/verden/GlassCard';
import Map from '@/components/verden/Map';
import { useGeoNavigation } from '@/hooks/useGeoNavigation';
import { haversineDistance } from '@/lib/navUtils';
import { useApp } from '@/contexts/AppContext';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Vehicle3D from '@/components/verden/Vehicle3D';
import AvatarSelector from '@/components/verden/AvatarSelector';

const FALLBACK_SPEED_MS = 13.89; // 50 km/h fallback for ETA when stationary

/** Converts OSRM step into a human-readable instruction */
function parseInstruction(step: any): string {
  if (!step) return 'Continue on route';
  const type: string = step.maneuver?.type ?? '';
  const modifier: string = step.maneuver?.modifier ?? '';
  const street = step.name ? `onto ${step.name}` : '';
  const dirs: Record<string, string> = {
    left: 'left', right: 'right',
    'slight left': 'slight left', 'slight right': 'slight right',
    'sharp left': 'sharp left', 'sharp right': 'sharp right',
    uturn: 'U-turn', straight: 'straight',
  };
  const dir = dirs[modifier] ?? modifier;
  if (type === 'depart') return `Head ${dir} ${street}`.trim();
  if (type === 'arrive') return 'You have arrived';
  if (type === 'turn') return `Turn ${dir} ${street}`.trim();
  if (type === 'continue') return `Continue ${dir} ${street}`.trim();
  if (type === 'roundabout') return 'Enter the roundabout';
  if (type === 'exit roundabout') return `Exit the roundabout ${street}`.trim();
  if (type === 'merge') return `Merge ${dir} ${street}`.trim();
  if (type === 'fork') return `Keep ${dir} at the fork ${street}`.trim();
  return `${type} ${dir} ${street}`.trim();
}

/** Utility for class merging */
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const Navigation = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { route, destination } = routerLocation.state || {};

  // ── Real-time GPS + compass + speed (all automatic) ───────────────────────
  const { location, bearing, speedKmh, error: gpsError, ready } = useGeoNavigation();

  // ── Route state ───────────────────────────────────────────────────────────
  const [eta, setEta] = useState<number>(route?.duration ?? 0);
  const [remainingDist, setRemainingDist] = useState<number>(route?.distance ?? 0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showStartPopup, setShowStartPopup] = useState(true);
  const speedMsRef = useRef(0);

  const steps: any[] = useMemo(() => route?.legs?.[0]?.steps ?? [], [route]);
  const activeInstruction = useMemo(() => parseInstruction(steps[currentStepIndex] ?? null), [steps, currentStepIndex]);

  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const { selectedVehicle, setVehicle } = useApp();

  // Guard
  useEffect(() => { if (!route) navigate('/home'); }, [route, navigate]);

  // Startup popup auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => setShowStartPopup(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // ── Live ETA + remaining distance ─────────────────────────────────────────
  useEffect(() => {
    if (!location || !destination) return;

    const destLat = destination.geometry.coordinates[1];
    const destLon = destination.geometry.coordinates[0];
    const remM = haversineDistance(location[0], location[1], destLat, destLon);

    setRemainingDist(parseFloat((remM / 1000).toFixed(2)));

    speedMsRef.current = speedKmh / 3.6;
    const effectiveMs = speedMsRef.current > 0.5 ? speedMsRef.current : FALLBACK_SPEED_MS;
    setEta(Math.round(remM / effectiveMs / 60));
  }, [location, speedKmh, destination]);

  // ── Step advancement ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!location || steps.length === 0 || currentStepIndex >= steps.length - 1) return;
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep?.maneuver?.location) {
      const [sLon, sLat] = nextStep.maneuver.location;
      if (haversineDistance(location[0], location[1], sLat, sLon) < 40) {
        setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
      }
    }
  }, [location, steps, currentStepIndex]);

  if (!route) return null;

  const arrivalTime = new Date(Date.now() + eta * 60000).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="flex w-full h-full relative overflow-hidden bg-[#f0f0f0] dark:bg-[#1a1a1a]">
      {/* ── Desktop Directions Panel ── */}
      <div className="hidden md:flex flex-col w-[380px] glass-strong border-r border-white/10 h-full z-20 overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
             <button 
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Back to home"
             >
                <ArrowLeft size={20} className="text-foreground" />
             </button>
             <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">From Your location</p>
                <p className="text-sm font-bold text-foreground truncate">{destination?.properties?.name || 'Destination'}</p>
             </div>
          </div>

          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-display font-black text-foreground">{eta} min</span>
            <span className="text-muted-foreground mb-1">({remainingDist.toFixed(1)} km)</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">via Best route now due to traffic conditions</p>

          <div className="flex items-center gap-2">
            <button className="flex-1 py-1.5 px-3 rounded-full border border-border text-xs font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Share2 size={14} /> Send to phone
            </button>
            <button 
              className="p-2 rounded-full border border-border hover:bg-muted font-bold"
              aria-label="Print directions"
            >
               <Printer size={14} />
            </button>
          </div>
        </div>

        {/* Instructions List */}
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <div className="px-4 py-4 flex items-start gap-4 border-b border-border/50">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
              <MapPin size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Your location</p>
            </div>
          </div>

          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const instruction = parseInstruction(step);
            return (
              <div 
                key={`step-${idx}`} 
                className={cn(
                  "px-4 py-5 flex items-start gap-4 border-b border-border/40 transition-colors",
                  isActive ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/30"
                )}
              >
                <div className="shrink-0 mt-1">
                   <ChevronRight size={18} className={cn(isActive ? "text-primary rotate-90" : "text-muted-foreground/60")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm leading-relaxed", isActive ? "font-bold text-foreground" : "text-muted-foreground")}>
                    {instruction}
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-1 font-medium">
                    {step.duration < 60 ? `${Math.round(step.duration)} sec` : `${Math.round(step.duration / 60)} min`} ({Math.round(step.distance)} m)
                  </p>
                </div>
              </div>
            );
          })}

          <div className="px-4 py-8 flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-1">
              <Flag size={14} className="text-destructive" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{destination?.properties?.name || 'Destination'}</p>
              <p className="text-xs text-muted-foreground mt-1">{destination?.properties?.display_name}</p>
            </div>
          </div>
        </div>

        <div className="p-6 glass-strong border-t border-white/10 mt-auto">
          <GlassButton 
            className="w-full bg-destructive text-white rounded-2xl shadow-liquid"
            onClick={() => navigate('/trip-summary')}
            variant="primary"
          >
            End Navigation
          </GlassButton>
        </div>
      </div>

      {/* ── Map (Main Area) ── */}
      <div className="flex-1 relative bg-[#e0e0e0] dark:bg-[#202020]">
        <Map
          userLocation={location}
          userHeading={bearing}
          bearing={bearing}
          destination={destination}
          greenestRoute={route}
          fastestRoute={null}
        />

        {/* ── Mobile-only overlays ── */}
        
        {/* Google Maps Style Top Bar (Maneuver Indicator) */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-40 p-4 pt-10 bg-gradient-to-b from-black/20 to-transparent pointer-events-none">
          <motion.div 
            initial={{ y: -100 }} 
            animate={{ y: 0 }} 
            className="pointer-events-auto"
          >
            <div className="bg-[#0f6b40] rounded-[32px] p-6 flex items-center gap-5 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl">
                 <Navigation2 size={42} className="text-white -rotate-45 drop-shadow-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-3xl font-black text-white leading-none tracking-tight mb-1">
                   {steps[currentStepIndex + 1]?.distance < 500 
                     ? `${Math.round(steps[currentStepIndex + 1]?.distance)} m` 
                     : `${(steps[currentStepIndex + 1]?.distance / 1000).toFixed(1)} km`}
                </p>
                <p className="text-xl font-bold text-white leading-tight truncate">
                  {activeInstruction}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Actions (Right Side) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          <GlassButton className="w-14 h-14 p-0 rounded-full shadow-liquid glass border-white/20" aria-label="Search along route">
            <Search size={24} strokeWidth={2.5} />
          </GlassButton>
          <GlassButton className="w-14 h-14 p-0 rounded-full shadow-liquid glass border-white/20" aria-label="Toggle voice navigation">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </GlassButton>
          <GlassButton className="w-14 h-14 p-0 rounded-full shadow-liquid bg-[#fdbd2d] text-black border-none font-black text-2xl" aria-label="Report issue">
             !
          </GlassButton>
        </div>

        {/* Google Maps Style Bottom Card */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border">
          <div className="flex items-center justify-between gap-6 mb-4">
             <div className="flex-1">
                <p className="text-3xl font-black text-[#0f6b40] dark:text-[#22c55e] leading-none mb-1">
                  {eta}<span className="text-lg font-bold"> min</span>
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                   <span>{remainingDist.toFixed(1)} km</span>
                   <span className="opacity-30">•</span>
                   <span>Arrival: {arrivalTime}</span>
                </div>
             </div>
             
             <div 
               className="w-16 h-16 rounded-2xl bg-muted/30 flex flex-col items-center justify-center p-2 cursor-pointer active:scale-95 transition-transform"
               onClick={() => setIsAvatarSelectorOpen(true)}
             >
                <div className="w-full h-full relative">
                   <Canvas camera={{ position: [2, 2, 2], fov: 40 }}>
                      <ambientLight intensity={1.5} />
                      <Suspense fallback={null}>
                        <Vehicle3D 
                          model={selectedVehicle.model} 
                          color={selectedVehicle.color} 
                          rotation={0} 
                          scale={1.2} 
                        />
                      </Suspense>
                   </Canvas>
                </div>
             </div>

             <GlassButton 
              className="bg-destructive/10 text-destructive hover:bg-destructive shadow-none rounded-2xl px-6 h-14 font-black uppercase tracking-widest text-sm border-2 border-destructive/20"
              onClick={() => navigate('/trip-summary')}
             >
               Exit
             </GlassButton>
          </div>
        </div>

        {/* Avatar Selector Modal */}
        <AvatarSelector 
          isOpen={isAvatarSelectorOpen}
          onClose={() => setIsAvatarSelectorOpen(false)}
          onSelect={(m, c) => setVehicle(m, c)}
          currentModel={selectedVehicle.model}
          currentColor={selectedVehicle.color}
        />

        {/* Global Nav/GPS Overlays */}
        <AnimatePresence>
          {!ready && !gpsError && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                <GlassCard className="p-6 text-center max-w-xs mx-4 shadow-2xl">
                    <div className="flex items-center justify-center mb-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Acquiring GPS signal…</p>
                </GlassCard>
            </div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showStartPopup && ready && (
            <motion.div className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GlassCard className="p-6 text-center max-w-xs mx-4 shadow-2xl border-primary/20">
                <Navigation2 size={40} className="text-primary mx-auto mb-3" />
                <h2 className="text-xl font-display font-black text-foreground mb-1">Navigation Started</h2>
                <p className="text-xs text-primary mt-2 font-medium bg-primary/10 py-1.5 px-3 rounded-full inline-block">{activeInstruction}</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary), 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--primary), 0.2); }
      `}</style>
    </div>
  );
};

export default Navigation;
