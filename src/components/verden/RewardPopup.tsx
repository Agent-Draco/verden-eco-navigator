import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const RewardPopup = () => {
  const { showReward, clearReward } = useApp();

  useEffect(() => {
    if (showReward) {
      const t = setTimeout(clearReward, 2500);
      return () => clearTimeout(t);
    }
  }, [showReward, clearReward]);

  return (
    <AnimatePresence>
      {showReward && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.8 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-[360px]"
        >
          <div className="glass-strong glow-green rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center">
              <Award size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground text-sm">{showReward}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardPopup;
