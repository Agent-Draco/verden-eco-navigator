import { motion } from "framer-motion";
import { Users, MapPin, Clock, Star, Plus, Check, UserPlus } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";
import useEcoMoov from "@/hooks/use-ecomoov";

const EcoMoov = () => {
  const { joinedGroups, joinGroup, lastGreenestRoute } = useApp();
  const groups = useEcoMoov(lastGreenestRoute);

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-verden-sky/10 blur-[80px]" />

      <div className="relative z-10 px-5 pt-8 pb-28 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">EcoMoov</h1>
          <GlassButton variant="glass" size="sm" className="flex items-center gap-1 text-xs px-3 py-1.5">
            <UserPlus size={14} /> Create Group
          </GlassButton>
        </div>

        {/* Bonus banner */}
        <GlassCard variant="glow" className="flex items-center gap-3 mb-6 p-4">
          <Star size={20} className="text-primary" />
          <div>
            <p className="font-display font-semibold text-sm text-foreground">+5% Bonus Credits</p>
            <p className="text-xs text-muted-foreground">Join a group to earn more</p>
          </div>
        </GlassCard>

        {/* Riders */}
        <div className="space-y-3">
          {groups.map((g, i) => {
            const joined = joinedGroups.includes(g.name);
            return (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-green flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">
                    {g.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-semibold text-sm text-foreground">{g.name}</p>
                      <span className="text-xs text-primary font-semibold">{g.match}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                      <MapPin size={10} /> {g.route}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> {g.time}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users size={10} /> {g.members + (joined ? 1 : 0)} members
                      </p>
                    </div>
                  </div>
                  {joined ? (
                    <div className="shrink-0 flex items-center gap-1 text-xs text-primary font-medium px-3 py-1.5">
                      <Check size={14} /> Joined
                    </div>
                  ) : (
                    <GlassButton
                      variant="outline"
                      size="sm"
                      className="shrink-0 flex items-center gap-1 text-xs px-3 py-1.5"
                      onClick={() => joinGroup(g.name)}
                    >
                      <Plus size={12} /> Join
                    </GlassButton>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EcoMoov;
