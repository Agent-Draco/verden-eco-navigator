import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import verdenLogo from "@/assets/verden-logo.png";

const Splash = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(isAuthenticated ? "/home" : "/onboarding");
    }, 2000);
    return () => clearTimeout(t);
  }, [navigate, isAuthenticated]);

  return (
    <div className="mobile-container bg-background flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-verden-mint/10 via-transparent to-verden-sky/10" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.img
          src={verdenLogo}
          alt="Verden"
          className="w-28 h-28 mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-xl font-semibold text-foreground"
        >
          Verden
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground mt-2"
        >
          Navigate Green
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Splash;
