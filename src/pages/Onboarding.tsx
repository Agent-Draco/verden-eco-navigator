import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Leaf, Route, Award } from "lucide-react";
import GlassButton from "@/components/verden/GlassButton";
import MapBackground from "@/components/verden/MapBackground";
import verdenLogo from "@/assets/verden-logo.png";

const slides = [
  {
    title: "Your Route.\nYour Impact.",
    subtitle: "Navigate smarter. Every route counts.",
    icon: Route,
    color: "from-verden-mint/20 to-verden-sky/20",
  },
  {
    title: "Choose Green,\nSave CO₂",
    subtitle: "Compare routes by environmental impact.",
    icon: Leaf,
    color: "from-verden-neon/20 to-verden-mint/20",
  },
  {
    title: "Earn Green\nCredits",
    subtitle: "Get rewarded for sustainable choices.",
    icon: Award,
    color: "from-verden-electric/20 to-verden-lavender/20",
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (step < 2) setStep(step + 1);
    else navigate("/login");
  };

  return (
    <div className="mobile-container bg-background">
      <MapBackground className="opacity-40" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col min-h-screen px-6 pt-16 pb-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <img src={verdenLogo} alt="Verden" className="w-9 h-9" />
            <span className="font-display text-lg font-semibold text-foreground">Verden</span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${slides[step].color} flex items-center justify-center mb-8 glow-green-sm`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              {(() => {
                const Icon = slides[step].icon;
                return <Icon size={40} className="text-primary" strokeWidth={1.5} />;
              })()}
            </motion.div>

            <motion.h1
              className="text-4xl font-display font-bold text-foreground leading-tight mb-4 whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {slides[step].title}
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-[260px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {slides[step].subtitle}
            </motion.p>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <GlassButton onClick={next} className="flex items-center gap-2">
              {step === 2 ? "Get Started" : "Next"}
              <ChevronRight size={18} />
            </GlassButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
