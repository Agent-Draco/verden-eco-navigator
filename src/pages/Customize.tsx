import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, User, Lock } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";

const avatars = [
  { id: 0, emoji: "🌿", label: "Leaf" },
  { id: 1, emoji: "🌍", label: "Earth" },
  { id: 2, emoji: "🚗", label: "Car" },
  { id: 3, emoji: "⚡", label: "Bolt", cost: 50 },
  { id: 4, emoji: "🦋", label: "Nature", cost: 50 },
  { id: 5, emoji: "🌊", label: "Wave", cost: 50 },
];

const themes = [
  { id: "default", label: "Pastel Glass", color: "from-verden-mint/40 to-verden-sky/40" },
  { id: "dark", label: "Dark Glass", color: "from-muted to-background", cost: 100 },
  { id: "neon", label: "Neon Eco", color: "from-verden-neon/40 to-verden-electric/40", cost: 100 },
];

const Customize = () => {
  const navigate = useNavigate();
  const { selectedAvatar, unlockedAvatars, unlockedThemes, theme, setAvatar, unlockAvatar, unlockTheme, setTheme, credits } = useApp();

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-verden-lavender/10 blur-[80px]" />

      <div className="relative z-10 flex flex-col min-h-screen px-5 pt-6 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Customize</h1>
        <p className="text-sm text-muted-foreground mb-6">Personalize your Verden experience</p>

        {/* Avatars */}
        <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <User size={16} className="text-primary" /> Avatars
        </h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {avatars.map((a) => {
            const unlocked = unlockedAvatars.includes(a.id);
            const active = selectedAvatar === a.id;
            return (
              <GlassCard
                key={a.id}
                variant={active ? "glow" : "default"}
                className={`text-center p-3 cursor-pointer ${!unlocked ? "opacity-50" : ""}`}
                onClick={() => {
                  if (unlocked) setAvatar(a.id);
                  else unlockAvatar(a.id);
                }}
              >
                <div className="text-3xl mb-1">{a.emoji}</div>
                <p className="text-[10px] font-medium text-foreground">{a.label}</p>
                {!unlocked && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Lock size={8} className="text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground">{a.cost} credits</span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Themes */}
        <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Palette size={16} className="text-primary" /> Themes
        </h2>
        <div className="space-y-3">
          {themes.map((t) => {
            const unlocked = unlockedThemes.includes(t.id);
            const active = theme === t.id;
            return (
              <GlassCard
                key={t.id}
                variant={active ? "glow" : "default"}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  if (unlocked) setTheme(t.id as "default" | "dark" | "neon");
                  else unlockTheme(t.id);
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  {!unlocked && <p className="text-[10px] text-muted-foreground">{t.cost} credits to unlock</p>}
                </div>
                {active && <div className="w-3 h-3 rounded-full bg-primary" />}
              </GlassCard>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">Balance: {credits} credits</p>
      </div>
    </div>
  );
};

export default Customize;
