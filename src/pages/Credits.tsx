import { motion } from "framer-motion";
import { Leaf, Flame, Trophy, Target, TrendingUp } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";

const Credits = () => {
  const { credits, ecoScore, streak, totalCO2Saved, totalTrips, badges } = useApp();
  const tierProgress = Math.min(100, (credits / 300) * 100);

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-verden-neon/8 blur-[80px]" />

      <div className="relative z-10 px-5 pt-8 pb-32 overflow-y-auto max-h-screen">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Green Credits</h1>

        {/* Eco Score */}
        <GlassCard variant="glow" className="text-center mb-6 p-6">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-green flex items-center justify-center mx-auto mb-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <span className="font-display text-2xl font-bold text-primary-foreground">{ecoScore}</span>
          </motion.div>
          <p className="font-display font-semibold text-foreground">Eco Score</p>
          <p className="text-sm text-muted-foreground mt-1">Top {Math.max(5, 100 - ecoScore)}% of riders</p>
        </GlassCard>

        {/* Credits Balance */}
        <GlassCard className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-green flex items-center justify-center">
            <Leaf size={22} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Credit Balance</p>
            <p className="font-display text-2xl font-bold text-foreground">{credits}</p>
          </div>
          <TrendingUp size={20} className="text-primary" />
        </GlassCard>

        {/* Progress */}
        <GlassCard className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-foreground">Next Milestone</p>
            <span className="text-xs text-muted-foreground">{credits}/300</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${tierProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{Math.max(0, 300 - credits)} credits to Silver Tier 🥈</p>
        </GlassCard>

        {/* Daily Impact */}
        <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target size={16} className="text-primary" /> Impact Stats
        </h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Saved", value: `${totalCO2Saved} kg`, sub: "CO₂" },
            { label: "Trips", value: `${totalTrips}`, sub: "total" },
            { label: "Streak", value: `${streak}`, sub: "days" },
          ].map((s) => (
            <GlassCard key={s.label} variant="subtle" className="text-center p-3">
              <p className="font-display font-bold text-lg text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.sub}</p>
            </GlassCard>
          ))}
        </div>

        {/* Streak */}
        <GlassCard className="flex items-center gap-3 mb-6">
          <Flame size={22} className="text-destructive" />
          <div>
            <p className="font-display font-semibold text-foreground text-sm">{streak}-Day Streak 🔥</p>
            <p className="text-xs text-muted-foreground">Keep going for a bonus!</p>
          </div>
        </GlassCard>

        {/* Badges */}
        <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy size={16} className="text-primary" /> Achievements
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <GlassCard
              key={b.name}
              variant={b.earned ? "default" : "subtle"}
              className={`text-center p-3 ${!b.earned ? "opacity-40" : ""}`}
            >
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${b.earned ? "bg-gradient-green" : "bg-muted"}`}>
                <Trophy size={16} className={b.earned ? "text-primary-foreground" : "text-muted-foreground"} />
              </div>
              <p className="text-[10px] font-medium text-foreground leading-tight">{b.name}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Credits;
