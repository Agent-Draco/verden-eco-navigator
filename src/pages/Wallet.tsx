import { motion } from "framer-motion";
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Plus, ArrowRightLeft } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";

const Wallet = () => {
  const { credits, tier, transactions, addCredits } = useApp();

  return (
    <div className="relative w-full h-full p-5 pb-32 overflow-y-auto">
      <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-verden-sky/10 blur-[80px] pointer-events-none" />

      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Wallet</h1>

      {/* Balance card */}
      <GlassCard variant="glow" className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <WalletIcon size={20} className="text-primary" />
          <span className="font-display font-semibold text-foreground">Green Wallet</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">{tier}</span>
        </div>
        <motion.p
          className="font-display text-4xl font-bold text-foreground mb-1"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {credits}
        </motion.p>
        <p className="text-sm text-muted-foreground">green credits</p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <GlassButton
            variant="glass"
            size="sm"
            className="flex items-center justify-center gap-2 text-xs"
            onClick={() => addCredits(50, "Added credits")}
          >
            <Plus size={14} /> Add Credits
          </GlassButton>
          <GlassButton variant="outline" size="sm" className="flex items-center justify-center gap-2 text-xs">
            <ArrowRightLeft size={14} /> Convert
          </GlassButton>
        </div>
      </GlassCard>

      {/* Transaction history */}
      <h2 className="font-display font-semibold text-foreground mb-3">Recent Activity</h2>
      <div className="space-y-2">
        {transactions.slice(0, 10).map((tx) => (
          <GlassCard key={tx.id} className="flex items-center gap-3 px-4 py-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === "earn" ? "bg-gradient-green" : "bg-secondary"}`}>
              {tx.type === "earn" ? (
                <TrendingUp size={16} className="text-primary-foreground" />
              ) : (
                <TrendingDown size={16} className="text-secondary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.label}</p>
              <p className="text-[10px] text-muted-foreground">{tx.date}</p>
            </div>
            <span className={`font-display font-bold text-sm ${tx.amount > 0 ? "text-primary" : "text-muted-foreground"}`}>
              {tx.amount > 0 ? "+" : ""}{tx.amount}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
