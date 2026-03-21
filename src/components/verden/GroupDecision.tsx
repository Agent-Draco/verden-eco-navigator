import { motion } from "framer-motion";
import { Car, Share2, Bus, Sparkles } from "lucide-react";
import GlassCard from "./GlassCard";
import GlassButton from "./GlassButton";

const GroupDecision = ({ decision, setGroup }) => {

    const handleConfirm = (option) => {
        setGroup(prev => ({
            ...prev,
            decision: {
                ...prev.decision,
                status: 'decided', 
                confirmedOption: option.type
            },
            activityFeed: [...prev.activityFeed, { from: 'System', message: `Group decided to ${option.label}.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        }));
    };

  const iconMap = {
    personal_vehicle: <Car size={20} />,
    shared_ride: <Share2 size={20} />,
    public_transport: <Bus size={20} />
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
      <GlassCard variant="glow">
        <h3 className="font-display font-semibold text-center mb-1 flex items-center justify-center gap-2"><Sparkles size={16} className="text-verden-yellow"/> Group Decision</h3>
        <p className="text-xs text-center text-muted-foreground mb-3">Choose the best transport option for tomorrow's trip.</p>
        
        <div className="space-y-2">
          {decision.options.map(opt => (
            <GlassCard 
                key={opt.type} 
                className={`p-3 border-2 ${opt.suggested ? 'border-primary/50' : 'border-transparent'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    {iconMap[opt.type]}
                  </div>
                  <div>
                      <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                          {opt.label}
                          {opt.suggested && <span className="text-[9px] bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded">SUGGESTED</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{opt.emissions} / {opt.cost}</p>
                  </div>
                </div>
                <GlassButton size="sm" variant="glass" onClick={() => handleConfirm(opt)}>Choose</GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default GroupDecision;
