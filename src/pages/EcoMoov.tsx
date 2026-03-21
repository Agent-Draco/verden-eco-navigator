import { motion } from "framer-motion";
import { Users, MapPin, Clock, Star, Plus } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import BottomNav from "@/components/verden/BottomNav";

const groups = [
  { name: "Sarah K.", match: 94, route: "Downtown → University", time: "8:15 AM", avatar: "SK" },
  { name: "Alex M.", match: 90, route: "Downtown → Tech Park", time: "8:30 AM", avatar: "AM" },
  { name: "Priya D.", match: 85, route: "Midtown → Airport Rd", time: "9:00 AM", avatar: "PD" },
  { name: "Jordan L.", match: 78, route: "Westside → Central", time: "7:45 AM", avatar: "JL" },
];

const EcoMoov = () => {
  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-verden-sky/10 blur-[80px]" />

      <div className="relative z-10 px-5 pt-8 pb-28 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">EcoMoov</h1>
          <div className="glass rounded-full px-3 py-1 flex items-center gap-1">
            <Users size={14} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Groups</span>
          </div>
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
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="flex items-center gap-3">
                {/* Avatar */}
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={10} /> {g.time}
                  </p>
                </div>
                <GlassButton variant="outline" size="sm" className="shrink-0 flex items-center gap-1 text-xs px-3 py-1.5">
                  <Plus size={12} /> Join
                </GlassButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EcoMoov;
