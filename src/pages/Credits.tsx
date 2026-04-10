import { motion } from "framer-motion";
import { Leaf, Flame, Trophy, Target, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { useApp } from "@/contexts/AppContext";

const Credits = () => {
  const { credits, ecoScore, streak, totalCO2Saved, totalTrips, badges } = useApp();
  const tierProgress = Math.min(100, (credits / 300) * 100);

  return (
    <div className="relative w-full h-full p-5 pb-32 overflow-y-auto bg-topographic">
      <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-verden-neon/8 blur-[80px] pointer-events-none" />

      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Green Credits</h1>

      {/* Eco Score */}
      <GlassCard variant="glow" className="text-center mb-6 p-6 shadow-xl border-primary/10">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-green flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span className="font-display text-2xl font-bold text-primary-foreground">{ecoScore}</span>
        </motion.div>
        <p className="font-display font-semibold text-foreground">Eco Score</p>
        <p className="text-sm text-muted-foreground mt-1">Top {Math.max(5, 100 - ecoScore)}% of riders</p>
      </GlassCard>

      {/* Credits Balance */}
      <GlassCard className="flex items-center gap-4 mb-4 shadow-md border-primary/5">
        <div className="w-12 h-12 rounded-xl bg-gradient-green flex items-center justify-center shadow-lg">
          <Leaf size={22} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Credit Balance</p>
          <p className="font-display text-2xl font-bold text-foreground">{credits}</p>
        </div>
        <TrendingUp size={20} className="text-primary opacity-50" />
      </GlassCard>

      {/* Progress */}
      <GlassCard className="mb-8 shadow-md border-primary/5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-bold text-foreground">Next Milestone</p>
          <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">{credits}/300</span>
        </div>
        <div className="h-3 rounded-full bg-muted/30 overflow-hidden border border-border/10">
          <motion.div
            className="h-full bg-gradient-green rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${tierProgress}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-muted-foreground">{Math.max(0, 300 - credits)} credits to Silver Tier 🥈</p>
          <span className="text-[10px] font-bold text-primary/60 uppercase">Bronze Tier 🥉</span>
        </div>
      </GlassCard>

      {/* Daily Impact */}
      <h2 className="font-display font-bold mb-4 flex items-center gap-2 text-foreground/80 uppercase tracking-widest text-xs">
        <Target size={14} className="text-primary" /> Impact Summary
      </h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Saved", value: `${totalCO2Saved} kg`, sub: "CO₂" },
          { label: "Trips", value: `${totalTrips}`, sub: "total" },
          { label: "Streak", value: `${streak}`, sub: "days" },
        ].map((s) => (
          <GlassCard key={s.label} variant="subtle" className="text-center p-3 shadow-sm hover:shadow-md transition-shadow">
            <p className="font-display font-bold text-lg text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Streak */}
      <GlassCard className="flex items-center gap-4 mb-8 bg-destructive/5 border-destructive/20 shadow-lg shadow-destructive/5">
        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center border border-destructive/20">
          <Flame size={24} className="text-destructive" />
        </div>
        <div>
          <p className="font-display font-bold text-foreground text-sm">{streak}-Day Streak 🔥</p>
          <p className="text-xs text-muted-foreground">Keep going for a double bonus!</p>
        </div>
      </GlassCard>

      {/* Badges */}
      <h2 className="font-display font-bold mb-4 flex items-center gap-2 text-foreground/80 uppercase tracking-widest text-xs">
        <Trophy size={14} className="text-primary" /> Achievements
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <GlassCard
            key={b.name}
            variant={b.earned ? "default" : "subtle"}
            className={`text-center p-3 transition-all ${!b.earned ? "opacity-30 grayscale saturate-0" : "shadow-md hover:scale-105"}`}
          >
            <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${b.earned ? "bg-gradient-green shadow-lg" : "bg-muted"}`}>
              <Trophy size={16} className={b.earned ? "text-primary-foreground" : "text-muted-foreground"} />
            </div>
            <p className="text-[10px] font-bold text-foreground leading-tight">{b.name}</p>
            {b.earned && <p className="text-[8px] text-primary font-bold mt-1 uppercase">Earned</p>}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Credits;
