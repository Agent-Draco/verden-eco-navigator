import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flag, Clock, Navigation2, AlertCircle } from 'lucide-react';
import GlassButton from '@/components/verden/GlassButton';
import GlassCard from '@/components/verden/GlassCard';
import Map from '@/components/verden/Map';
import { useGeoNavigation } from '@/hooks/useGeoNavigation';
import { haversineDistance } from '@/lib/navUtils';

const FALLBACK_SPEED_MS = 13.89; // 50 km/h fallback for ETA when stationary

/** Converts OSRM step into a human-readable instruction */
function parseInstruction(step: any): string {
  if (!step) return '';
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

  const steps: any[] = route?.legs?.[0]?.steps ?? [];
  const nextInstruction = parseInstruction(steps[currentStepIndex] ?? null);

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
      if (haversineDistance(location[0], location[1], sLat, sLon) < 30) {
        setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
      }
    }
  }, [location, steps, currentStepIndex]);

  if (!route) return null;

  const arrivalTime = new Date(Date.now() + eta * 60000).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="mobile-container bg-background">
      {/* ── Map ── */}
      <Map
        userLocation={location}
        userHeading={bearing}
        bearing={bearing}
        destination={destination}
        greenestRoute={route}
        fastestRoute={null}
      />

      {/* ── "Acquiring GPS…" overlay before first fix ── */}
      <AnimatePresence>
        {!ready && !gpsError && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard className="p-6 text-center max-w-xs mx-4">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm font-semibold text-foreground">Acquiring GPS signal…</p>
              <p className="text-xs text-muted-foreground mt-1">Keep the app open and move to an open area for best results.</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Startup popup ── */}
      <AnimatePresence>
        {showStartPopup && ready && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard className="p-6 text-center max-w-xs mx-4">
              <Navigation2 size={40} className="text-primary mx-auto mb-3" />
              <h2 className="text-xl font-display font-black text-foreground mb-1">Navigation Started</h2>
              <p className="text-sm text-muted-foreground">
                Heading to{' '}
                <span className="text-foreground font-semibold">
                  {destination?.properties?.name ?? 'your destination'}
                </span>
              </p>
              {nextInstruction && (
                <p className="text-xs text-primary mt-2 font-medium">{nextInstruction}</p>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar: destination + turn instruction ── */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 space-y-2">
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>
          <div className="glass-strong rounded-2xl p-3 flex items-center justify-between shadow-lg">
            <button onClick={() => navigate('/home')} className="p-2 glass rounded-xl text-foreground">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 text-center">
              <p className="text-xl font-display font-black text-foreground drop-shadow-md">
                {destination?.properties?.name || 'Destination'}
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                {remainingDist.toFixed(1)} km left
              </p>
            </div>
            <div className="w-10" />
          </div>
        </motion.div>

        {/* Turn instruction banner */}
        <AnimatePresence mode="wait">
          {nextInstruction && !showStartPopup && (
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md border border-primary/30">
                <AlertCircle size={18} className="text-primary shrink-0" />
                <p className="text-sm font-semibold text-foreground leading-snug">{nextInstruction}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GPS error banner */}
        <AnimatePresence>
          {gpsError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 border border-yellow-500/40 bg-yellow-500/10">
                <AlertCircle size={16} className="text-yellow-400 shrink-0" />
                <p className="text-xs font-medium text-foreground">{gpsError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom: ETA + live speed + end drive ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>
          <GlassCard className="p-4 border-primary/40 rounded-3xl glow-green-sm mb-3">
            <div className="flex justify-between items-center px-2">
              <div className="flex flex-col">
                <span className="text-4xl font-black font-display text-primary">
                  {eta}<span className="text-lg text-foreground"> min</span>
                </span>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock size={14} />Arrival {arrivalTime}
                </span>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex flex-col items-center justify-center">
                <span className="text-lg font-black font-display text-foreground leading-none">{speedKmh}</span>
                <span className="text-[10px] text-muted-foreground font-bold leading-none">km/h</span>
              </div>
            </div>
          </GlassCard>
          <GlassButton
            size="lg"
            className="w-full bg-destructive/10 text-destructive hover:bg-destructive shadow-lg rounded-2xl"
            onClick={() => navigate('/trip-summary')}
          >
            <Flag size={20} className="mr-2" />End Drive
          </GlassButton>
        </motion.div>
      </div>
    </div>
  );
};

export default Navigation;
