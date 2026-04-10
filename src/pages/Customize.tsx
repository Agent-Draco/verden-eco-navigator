import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, User, Lock, Sparkles, Car, Bike, Zap, Flame, Droplets, Leaf, Shield, HeartPulse } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import Vehicle3D from "@/components/verden/Vehicle3D";

const avatars = [
  { id: 0, emoji: "🌿", label: "Leaf" },
  { id: 1, emoji: "🌍", label: "Earth" },
  { id: 2, emoji: "🚗", label: "Car" },
  { id: 3, emoji: "⚡", label: "Bolt", cost: 50 },
  { id: 4, emoji: "🦋", label: "Nature", cost: 50 },
  { id: 5, emoji: "🌊", label: "Wave", cost: 50 },
];

const vehicles = [
  { id: 'sedan', label: 'Sedan', icon: Car, tier: 'Bronze', cost: 0 },
  { id: 'sedan_sports', label: 'Sports Sedan', icon: Flame, tier: 'Bronze', cost: 100 },
  { id: 'suv', label: 'SUV', icon: Car, tier: 'Bronze', cost: 0 },
  { id: 'suv_luxury', label: 'Luxury SUV', icon: Sparkles, tier: 'Bronze', cost: 150 },
  { id: 'hatchback', label: 'Sports Hatch', icon: Flame, tier: 'Bronze', cost: 50 },
  { id: 'bike', label: 'Motorcycle', icon: Bike, tier: 'Bronze', cost: 0 },
  { id: 'taxi', label: 'Taxi Cab', icon: Car, tier: 'Bronze', cost: 0 },
  { id: 'police', label: 'Police Cruiser', icon: Shield, tier: 'Bronze', cost: 200 },
  { id: 'ambulance', label: 'Ambulance', icon: HeartPulse, tier: 'Bronze', cost: 200 },
  { id: 'firetruck', label: 'Fire Truck', icon: Flame, tier: 'Bronze', cost: 250 },
  { id: 'garbage_truck', label: 'Waste Truck', icon: Leaf, tier: 'Bronze', cost: 250 },
  { id: 'van', label: 'Commuter Van', icon: Car, tier: 'Bronze', cost: 50 },
  { id: 'truck', label: 'Cargo Truck', icon: Car, tier: 'Bronze', cost: 150 },
  { id: 'truck_flat', label: 'Flatbed Truck', icon: Car, tier: 'Bronze', cost: 150 },
  { id: 'delivery', label: 'Delivery Van', icon: Zap, tier: 'Bronze', cost: 100 },
  { id: 'delivery_flat', label: 'Flatbed Delivery', icon: Zap, tier: 'Bronze', cost: 100 },
  { id: 'tractor', label: 'Farm Tractor', icon: Car, tier: 'Bronze', cost: 100 },
  { id: 'tractor_shovel', label: 'Backhoe Loader', icon: Car, tier: 'Bronze', cost: 150 },
  { id: 'tractor_police', label: 'Patrol Tractor', icon: Shield, tier: 'Bronze', cost: 200 },
  { id: 'kart_blue', label: 'Race Kart (Blue)', icon: Zap, tier: 'Bronze', cost: 200 },
  { id: 'kart_red', label: 'Race Kart (Red)', icon: Zap, tier: 'Bronze', cost: 200 },
  { id: 'kart_green', label: 'Race Kart (Green)', icon: Zap, tier: 'Bronze', cost: 200 },
  { id: 'kart_pink', label: 'Race Kart (Pink)', icon: Zap, tier: 'Bronze', cost: 200 },
  { id: 'kart_yellow', label: 'Race Kart (Yellow)', icon: Zap, tier: 'Bronze', cost: 200 },
  { id: 'hypercar', label: 'Hypercar', icon: Flame, tier: 'Silver', cost: 400 },
  { id: 'supercar', label: 'Supercar', icon: Flame, tier: 'Silver', cost: 300 },
  { id: 'f1', label: 'Formula 1', icon: Zap, tier: 'Gold', cost: 500 },
];

const colors = [
  { name: 'Verden Green', value: '#22c55e' },
  { name: 'Sky Blue', value: '#0ea5e9' },
  { name: 'Electric Purple', value: '#a855f7' },
  { name: 'Crimson Red', value: '#ef4444' },
  { name: 'Sunset Gold', value: '#f59e0b' },
  { name: 'Midnight Black', value: '#18181b' },
  { name: 'Arctic White', value: '#f8fafc' },
];

const themes = [
  { id: "default", label: "Pastel Glass", color: "from-verden-mint/40 to-verden-sky/40", icon: Sparkles },
  { id: "dark", label: "Dark Glass", color: "from-muted to-background", cost: 100, icon: Palette },
  { id: "neon", label: "Neon Eco", color: "from-verden-neon/40 to-verden-electric/40", cost: 150, icon: Zap },
  { id: "phoenix", label: "Phoenix", color: "from-orange-500/40 to-red-600/40", cost: 200, icon: Flame },
  { id: "ocean", label: "Midnight Ocean", color: "from-blue-700/40 to-cyan-500/40", cost: 200, icon: Droplets },
  { id: "forest", label: "Emerald Forest", color: "from-emerald-700/40 to-green-500/40", cost: 200, icon: Leaf },
];

const Customize = () => {
  const navigate = useNavigate();
  const { 
    selectedAvatar, unlockedAvatars, setAvatar, unlockAvatar,
    theme: appTheme, unlockedThemes, setTheme: setAppTheme, unlockTheme,
    selectedVehicle, unlockedVehicles, setVehicle, unlockVehicle,
    credits, tier 
  } = useApp();
  const { setTheme: setSystemTheme } = useTheme();

  // Sync theme with system provider
  useEffect(() => {
    if (appTheme === 'dark' || appTheme === 'neon' || appTheme === 'phoenix' || appTheme === 'ocean' || appTheme === 'forest') {
        setSystemTheme('dark');
    } else {
        setSystemTheme('light');
    }
  }, [appTheme, setSystemTheme]);

  return (
    <div className="relative w-full h-full p-4 pb-32 overflow-y-auto flex flex-col items-center bg-topographic">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-verden-lavender/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] flex flex-col min-h-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-8 hover:text-foreground transition-colors group w-fit">
          <div className="p-2 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Customize</h1>
        <p className="text-sm text-muted-foreground mb-10">Personalize your Verden digital identity</p>

        {/* Avatars Section */}
        <section className="mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <User size={14} className="text-primary" /> Profile Avatars
            </h2>
            <div className="grid grid-cols-3 gap-4">
            {avatars.map((a) => {
                const unlocked = unlockedAvatars.includes(a.id);
                const active = selectedAvatar === a.id;
                return (
                <GlassCard
                    key={a.id}
                    variant={active ? "glow" : "default"}
                    className={cn(
                        "text-center p-4 cursor-pointer transition-all hover:scale-105 active:scale-95",
                        !unlocked && "opacity-60 saturate-50 hover:opacity-90"
                    )}
                    onClick={() => {
                        if (unlocked) setAvatar(a.id);
                        else unlockAvatar(a.id);
                    }}
                >
                    <div className="text-4xl mb-2 drop-shadow-md">{a.emoji}</div>
                    <p className="text-[10px] font-bold text-foreground uppercase tracking-tighter">{a.label}</p>
                    {!unlocked && (
                    <div className="flex items-center justify-center gap-1 mt-2 bg-background/40 py-1 rounded-full">
                        <Lock size={10} className="text-muted-foreground" />
                        <span className="text-[9px] font-bold text-muted-foreground">{a.cost}</span>
                    </div>
                    )}
                </GlassCard>
                );
            })}
            </div>
        </section>

        {/* Themes Section */}
        <section className="mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <Palette size={14} className="text-primary" /> Visual Themes
            </h2>
            <div className="space-y-3">
            {themes.map((t) => {
                const unlocked = unlockedThemes.includes(t.id);
                const active = appTheme === t.id;
                const Icon = t.icon;
                return (
                <GlassCard
                    key={t.id}
                    variant={active ? "glow" : "default"}
                    className={cn(
                        "flex items-center gap-4 cursor-pointer p-3 transition-all hover:translate-x-1",
                        !unlocked && "opacity-60 saturate-50"
                    )}
                    onClick={() => {
                        if (unlocked) setAppTheme(t.id);
                        else unlockTheme(t.id);
                    }}
                >
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br shadow-lg flex items-center justify-center", t.color)}>
                        <Icon size={20} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground">{t.label}</p>
                        {!unlocked && <p className="text-[10px] font-bold text-primary mt-0.5 uppercase tracking-tighter">{t.cost} credits</p>}
                        {active && <p className="text-[10px] text-primary font-bold mt-0.5 uppercase tracking-widest flex items-center gap-1.5"><Sparkles size={10} /> Active</p>}
                    </div>
                </GlassCard>
                );
            })}
            </div>
        </section>

        <section className="mb-10 w-full max-w-7xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <Car size={14} className="text-primary" /> The Garage
            </h2>
            <div className="w-full h-[346px] md:h-[410px] mb-8 relative group">
                <GlassCard className="w-full h-full p-0 overflow-hidden border-primary/20 shadow-inner bg-black/5">
                    <Suspense fallback={
                        <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 gap-3">
                            <Car size={48} className="text-muted-foreground animate-pulse" />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Initialising 3D Assets...</span>
                        </div>
                    }>
                        <Canvas shadows camera={{ position: [0, 2.5, 5.2], fov: 32 }}>
                            <ambientLight intensity={1.2} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                            <Environment files="/hdri/potsdamer_platz_4k.hdr" />
                            <Vehicle3D 
                                model={selectedVehicle.model} 
                                color={selectedVehicle.color} 
                                rotation={0} 
                                scale={1.1} 
                            />
                            <OrbitControls 
                                enableZoom={false} 
                                autoRotate 
                                autoRotateSpeed={2} 
                                target={[0, 0.8, 0]} 
                            />
                            <ContactShadows opacity={0.8} scale={10} blur={2.5} far={10} resolution={256} color="#000000" />
                        </Canvas>
                    </Suspense>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/80">3D Interactive High Fidelity</span>
                    </div>
                </GlassCard>
            </div>
            

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {vehicles.map((v) => {
                const unlocked = unlockedVehicles.includes(v.id);
                const active = selectedVehicle.model === v.id;
                const tierLocked = (v.tier === 'Silver' && tier === 'Bronze') || (v.tier === 'Gold' && (tier === 'Bronze' || tier === 'Silver'));
                const Icon = v.icon;
                
                return (
                <GlassCard
                    key={v.id}
                    variant={active ? "glow" : "default"}
                    className={cn(
                        "p-3 cursor-pointer transition-all hover:scale-[1.02] flex flex-col items-center gap-2",
                        (!unlocked || tierLocked) && "opacity-60 saturate-50"
                    )}
                    onClick={() => {
                        if (tierLocked) return;
                        if (unlocked) setVehicle(v.id, selectedVehicle.color);
                        else unlockVehicle(v.id, v.cost);
                    }}
                >
                    <div className="relative">
                        <Icon size={32} style={{ color: selectedVehicle.color }} className="drop-shadow-sm" />
                        {tierLocked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Lock size={14} className="text-destructive font-black" />
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-foreground uppercase tracking-tight">{v.label}</p>
                        {tierLocked ? (
                            <p className="text-[8px] font-bold text-destructive mt-1 uppercase">{v.tier} TIER ONLY</p>
                        ) : !unlocked ? (
                            <p className="text-[8px] font-bold text-primary mt-1 uppercase">{v.cost} CREDITS</p>
                        ) : active ? (
                            <p className="text-[8px] font-bold text-primary mt-1 uppercase tracking-widest">SELECTED</p>
                        ) : null}
                    </div>
                </GlassCard>
                );
            })}
            </div>
        </section>

        <div className="mt-auto py-10 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <span className="text-xs font-bold text-foreground">Current Balance:</span>
                <span className="text-sm font-black text-primary">{credits} credits</span>
             </div>
             <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">Verden Ecosystem</p>
             
             <div className="mt-4 pt-4 border-t border-muted/30 w-full flex flex-col items-center gap-2 opacity-50">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed text-center">
                    3D Assets by Kenney.nl, Sketchfab, and Poly Pizza
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
