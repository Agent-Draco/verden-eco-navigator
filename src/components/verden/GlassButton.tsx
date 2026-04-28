import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { Check } from "lucide-react";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "glass" | "outline" | "default" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  showSuccess?: boolean;
  onSuccessComplete?: () => void;
}

export const GlassButton = ({ 
  variant = "primary", 
  size = "md", 
  className, 
  children, 
  showSuccess = false,
  onSuccessComplete,
  onClick,
  ...props 
}: GlassButtonProps) => {
  const [internalStatus, setInternalStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    if (showSuccess && internalStatus === "idle") {
      setInternalStatus("success");
      const timer = setTimeout(() => {
        setInternalStatus("idle");
        if (onSuccessComplete) onSuccessComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, internalStatus, onSuccessComplete]);

  const base = "font-display font-bold rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 relative overflow-hidden flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-green text-primary-foreground shadow-lg hover:shadow-primary/20",
    default: "bg-secondary text-foreground hover:bg-secondary/80",
    glass: "glass text-foreground hover:bg-white/10",
    glow:  "bg-gradient-green text-primary-foreground glow-green hover:brightness-110",
    outline: "border border-primary/30 text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm h-10 min-w-[100px]",
    md: "px-6 py-3 text-base h-12 min-w-[140px]",
    lg: "px-8 py-4 text-lg h-14 min-w-[180px]",
    icon: "p-3 w-12 h-12",
  };

  const isSuccess = internalStatus === "success";

  return (
    <motion.button
      className={cn(
        base, 
        variants[variant], 
        sizes[size], 
        isSuccess && "min-w-[48px] w-12 h-12 rounded-full p-0 px-0 py-0",
        className
      )}
      whileTap={{ scale: 0.96 }}
      onClick={(e) => {
        if (isSuccess) return;
        if (onClick) onClick(e as any);
      }}
      layout
      {...props}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check size={24} strokeWidth={3} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Refraction Rim Effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 pointer-events-none" />
    </motion.button>
  );
};
