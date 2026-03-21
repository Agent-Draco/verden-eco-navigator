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
      className={cn(variants[variant], "rounded-2xl p-4", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
