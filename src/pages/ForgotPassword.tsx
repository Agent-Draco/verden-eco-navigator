import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import verdenLogo from "@/assets/verden-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (email.includes("@")) setSent(true);
  };

  return (
    <div className="mobile-container bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-verden-mint/10 via-transparent to-verden-sky/10" />
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-8 pb-8">
        <Link to="/login" className="flex items-center gap-2 text-muted-foreground mb-8">
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-10">
          <img src={verdenLogo} alt="Verden" className="w-16 h-16 mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center max-w-[240px]">
            Enter your email and we'll send you a reset link.
          </p>
        </motion.div>

        {sent ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-green flex items-center justify-center mb-4 glow-green">
              <CheckCircle size={32} className="text-primary-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground mb-2">Email Sent!</p>
            <p className="text-sm text-muted-foreground text-center">Check your inbox for reset instructions.</p>
          </motion.div>
        ) : (
          <>
            <GlassCard className="flex items-center gap-3 px-4 py-3 p-0 mb-6">
              <Mail size={18} className="text-primary" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </GlassCard>
            <GlassButton size="lg" className="w-full" onClick={handleSend}>
              Send Reset Link
            </GlassButton>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
