import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const GlassButton = ({ variant = "primary", size = "md", className, children, ...props }: GlassButtonProps) => {
  const base = "font-display font-medium rounded-2xl transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-gradient-green text-primary-foreground glow-green-sm hover:brightness-110",
    glass: "glass text-foreground hover:bg-verden-glass/80",
    outline: "border border-primary/30 text-primary hover:bg-primary/10",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(base, variants[variant], sizes[size], className)}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
