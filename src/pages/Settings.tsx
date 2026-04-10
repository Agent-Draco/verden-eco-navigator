import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Moon, Eye, LogOut, ChevronRight, Globe, Database, Smartphone } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { theme, setTheme, unlockedThemes } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    trips: true,
    groups: true,
    achievements: true,
    marketing: false
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative w-full p-5 pb-32 bg-topographic">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">Customize your Verden experience.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-muted/20 flex items-center justify-center border border-border/50">
          <SettingsIcon className="text-foreground/70" size={24} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">Account & Privacy</h2>
          <div className="grid gap-3">
            <GlassCard className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Connected Devices</p>
                  <p className="text-[10px] text-muted-foreground">Manage your synced devices</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </GlassCard>

            <GlassCard className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Privacy Controls</p>
                  <p className="text-[10px] text-muted-foreground">Data sharing & visibility</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </GlassCard>
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">Notifications</h2>
          <GlassCard className="divide-y divide-border/10 p-0 overflow-hidden">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <Bell size={18} className="text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground capitalize">{key} Notifications</p>
                </div>
                {val ? (
                  <button
                    type="button"
                    role="switch"
                    aria-checked="true"
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                    className="w-12 h-6 rounded-full transition-colors relative flex items-center px-1 bg-primary"
                    aria-label={`Toggle ${key} notifications`}
                  >
                    <motion.div
                      layout
                      animate={{ x: 24 }}
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    role="switch"
                    aria-checked="false"
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                    className="w-12 h-6 rounded-full transition-colors relative flex items-center px-1 bg-muted"
                    aria-label={`Toggle ${key} notifications`}
                  >
                    <motion.div
                      layout
                      animate={{ x: 0 }}
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                )}
              </div>
            ))}
          </GlassCard>
        </section>

        {/* Appearance Section */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">Appearance</h2>
          <GlassCard className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Moon size={18} className="text-primary" />
              <p className="text-sm font-bold text-foreground">Active Theme</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {unlockedThemes.map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded-2xl border transition-all text-xs font-bold capitalize ${theme === t
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic text-center">Unlock more high-fidelity themes in the Rewards store!</p>
          </GlassCard>
        </section>

        {/* System & About */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">System</h2>
          <div className="grid gap-3">
            <GlassCard className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
              <div className="flex items-center gap-3">
                <Database size={18} className="text-muted-foreground" />
                <p className="text-sm font-medium">Clear Search Cache</p>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono">1.2 MB</p>
            </GlassCard>
            <GlassCard className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-muted-foreground" />
                <p className="text-sm font-medium">Language</p>
              </div>
              <p className="text-[10px] text-primary font-bold">English (US)</p>
            </GlassCard>
          </div>
        </section>

        {/* Actions */}
        <div className="pt-4 flex flex-col gap-3">
          <GlassButton
            variant="glass"
            className="w-full text-foreground hover:bg-muted font-bold h-14 rounded-2xl flex items-center justify-center gap-2"
            onClick={() => navigate('/resources')}
          >
            <Eye size={18} /> View Privacy Policy
          </GlassButton>
          <GlassButton
            className="w-full bg-destructive text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-liquid border-none"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" /> Logout
          </GlassButton>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/40 mt-10">
          Verden v2.0.0 (Beta Build LG-003)<br />
          Designed with ❤️ for a Greener Planet
        </p>
      </div>
    </div>
  );
};

export default Settings;
