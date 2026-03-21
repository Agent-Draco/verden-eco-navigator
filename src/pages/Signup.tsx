import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import verdenLogo from "@/assets/verden-logo.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields"); return; }
    if (!email.includes("@")) { setError("Please enter a valid email"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      await signup(name, email, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-verden-mint/10 via-transparent to-verden-lavender/10" />
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-16 pb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-10">
          <img src={verdenLogo} alt="Verden" className="w-16 h-16 mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the green movement</p>
        </motion.div>

        <div className="space-y-4 mb-6">
          {[
            { icon: User, placeholder: "Full Name", value: name, set: setName, type: "text" },
            { icon: Mail, placeholder: "Email", value: email, set: setEmail, type: "email" },
            { icon: Lock, placeholder: "Password", value: password, set: setPassword, type: "password" },
          ].map((f) => (
            <GlassCard key={f.placeholder} className="flex items-center gap-3 px-4 py-3 p-0">
              <f.icon size={18} className="text-primary" />
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </GlassCard>
          ))}
          {error && <p className="text-destructive text-xs text-center">{error}</p>}
        </div>

        <GlassButton size="lg" className="w-full mb-4" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </GlassButton>

        <p className="text-center text-sm text-muted-foreground mt-auto">
          Already have an account? <Link to="/login" className="text-primary font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
