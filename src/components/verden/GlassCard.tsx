import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "strong" | "subtle" | "glow";
  children: React.ReactNode;
}

const GlassCard = ({ variant = "default", className, children, ...props }: GlassCardProps) => {
  const variants = {
    default: "glass",
    strong: "glass-strong",
    subtle: "glass-subtle",
    glow: "glass glow-green glow-border",
  };

  return (
    <motion.div
      className={cn(variants[variant], "rounded-[32px] p-6 shadow-liquid", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
