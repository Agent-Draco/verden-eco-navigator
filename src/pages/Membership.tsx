import { motion } from "framer-motion";
import { Crown, Zap, Shield, Gift, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const TIER_BENEFITS = {
  Bronze: [
    "Basic eco-impact tracking",
    "Community group access",
    "Standard credit earning (1x)"
  ],
  Silver: [
    "Everything in Bronze",
    "Exclusive vehicle skins",
    "Silver multiplier (1.5x credits)",
    "Priority support"
  ],
  Gold: [
    "Everything in Silver",
    "Custom avatar creation",
    "Gold multiplier (2.5x credits)",
    "Early access to new features",
    "Zero emission badging"
  ]
};

const Membership = () => {
  const { credits, tier } = useApp();
  const navigate = useNavigate();

  const nextTier = tier === "Bronze" ? "Silver" : tier === "Silver" ? "Gold" : "Maxed Out";
  const progressTarget = tier === "Bronze" ? 300 : tier === "Silver" ? 1000 : 1000;
  const progress = Math.min(100, (credits / progressTarget) * 100);

  return (
    <div className="relative w-full p-5 pb-32 bg-topographic">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Membership</h1>
          <p className="text-muted-foreground text-sm">Your status in the Verden ecosystem.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Crown className="text-primary" size={24} />
        </div>
      </div>

      {/* Active Tier Card */}
      <GlassCard variant="glow" className="mb-8 p-8 relative overflow-hidden group shadow-2xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
        
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Current Tier</p>
            <h2 className="text-5xl font-display font-black text-foreground">{tier}</h2>
          </div>
          <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
             <Star className="text-primary fill-primary" size={32} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end mb-1">
            <p className="text-sm font-bold text-foreground/80">Progress to {nextTier}</p>
            <p className="text-xs font-mono text-muted-foreground">{credits} / {progressTarget} credits</p>
          </div>
          <div className="h-4 rounded-full bg-muted/30 overflow-hidden border border-border/10 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-green rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Benefits List */}
      <section className="mb-10">
        <h3 className="font-display font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <Shield size={14} className="text-primary" /> {tier} Privileges
        </h3>
        <div className="grid gap-3">
          {TIER_BENEFITS[tier as keyof typeof TIER_BENEFITS].map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 flex items-center gap-4 hover:translate-x-1 transition-transform border-white/5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground/90">{benefit}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upgrade Call to Action */}
      <GlassCard className="bg-primary p-6 rounded-[32px] border-none shadow-liquid-strong overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform" />
        <div className="relative z-10 text-primary-foreground">
          <h4 className="text-xl font-display font-black mb-1">Ready for {nextTier}?</h4>
          <p className="text-sm opacity-90 mb-6">Earn more credits by choosing eco-friendly routes and contributing to shared community goals.</p>
          <GlassButton 
            className="w-full bg-white text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-white/90"
            onClick={() => navigate('/home')}
          >
            Start Eco-Trip
          </GlassButton>
        </div>
      </GlassCard>

      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate('/profile')}
          className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
        >
          Back to Profile <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Membership;
