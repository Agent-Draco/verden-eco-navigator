import { motion } from "framer-motion";

interface VerdenLogoProps {
  size?: number;
  className?: string;
}

const VerdenLogo = ({ size = 40, className = "" }: VerdenLogoProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {/* Route path */}
    <path
      d="M12 36C12 36 16 28 24 20C32 12 36 8 36 8"
      stroke="url(#routeGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Leaf shape */}
    <path
      d="M24 18C24 18 30 12 36 10C36 10 34 18 28 24C22 30 18 32 18 32C18 32 18 24 24 18Z"
      fill="url(#leafGrad)"
      opacity="0.85"
    />
    {/* Leaf vein */}
    <path
      d="M24 18C24 18 22 24 20 28"
      stroke="hsl(152 60% 45%)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    <defs>
      <linearGradient id="routeGrad" x1="12" y1="36" x2="36" y2="8">
        <stop stopColor="hsl(152, 60%, 45%)" />
        <stop offset="1" stopColor="hsl(140, 90%, 55%)" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="18" y1="32" x2="36" y2="10">
        <stop stopColor="hsl(152, 60%, 45%)" />
        <stop offset="1" stopColor="hsl(140, 90%, 55%)" />
      </linearGradient>
    </defs>
  </motion.svg>
);

export default VerdenLogo;
