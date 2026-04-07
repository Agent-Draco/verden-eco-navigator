import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Car, Fuel, Gauge, Award, ChevronDown } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

const VehicleSetup = () => {
  const navigate = useNavigate();
  const { vehicleSetup, completeVehicleSetup } = useApp();
  const [fuel, setFuel] = useState("Petrol");
  const [showFuel, setShowFuel] = useState(false);
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");

  const handleSave = () => {
    if (!vehicleSetup) completeVehicleSetup();
    navigate("/profile");
  };

  return (
    <div className="relative w-full h-full p-6 pb-32 overflow-y-auto">
      <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-verden-mint/8 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto flex flex-col min-h-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-8 hover:text-foreground transition-colors group w-fit">
          <div className="p-2 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Vehicle Profile</h1>
        <p className="text-sm text-muted-foreground mb-10">Set up your vehicle for accurate eco routing and carbon tracking.</p>

        {!vehicleSetup && (
          <GlassCard variant="glow" className="flex items-center gap-4 mb-8 shadow-lg border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Award size={20} className="text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground">Welcome! Earn <span className="text-primary">+20 credits</span> for completing setup</p>
          </GlassCard>
        )}

        <div className="space-y-6 mb-12">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Fuel Propulsion</label>
            <GlassCard className="p-0 cursor-pointer shadow-sm hover:shadow-md transition-shadow" onClick={() => setShowFuel(!showFuel)}>
              <div className="flex items-center gap-4 px-4 py-4">
                <Fuel size={20} className="text-primary" />
                <span className="flex-1 text-sm font-bold text-foreground">{fuel}</span>
                <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-300 ${showFuel ? "rotate-180" : ""}`} />
              </div>
              {showFuel && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border/50 bg-muted/20">
                  {fuelTypes.map((f) => (
                    <button
                      key={f}
                      onClick={(e) => { e.stopPropagation(); setFuel(f); setShowFuel(false); }}
                      className={`w-full text-left px-12 py-3 text-sm hover:bg-primary/5 transition-colors ${fuel === f ? "text-primary font-bold" : "text-foreground font-medium"}`}
                    >
                      {f}
                    </button>
                  ))}
                </motion.div>
              )}
            </GlassCard>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Identity & Model</label>
            <GlassCard className="flex items-center gap-4 px-4 py-4 p-0 shadow-sm focus-within:ring-2 ring-primary/20 transition-all">
              <Car size={20} className="text-primary" />
              <input
                type="text"
                placeholder="e.g., Tesla Model 3"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-bold text-foreground placeholder:text-muted-foreground/50"
              />
            </GlassCard>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Efficiency (km/L)</label>
            <GlassCard className="flex items-center gap-4 px-4 py-4 p-0 shadow-sm focus-within:ring-2 ring-primary/20 transition-all">
              <Gauge size={20} className="text-primary" />
              <input
                type="text"
                placeholder="e.g., 20.5"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-bold text-foreground placeholder:text-muted-foreground/50"
              />
            </GlassCard>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <GlassButton size="lg" className="w-full h-14 rounded-2xl font-bold shadow-xl" onClick={handleSave}>
            {vehicleSetup ? "Update Profile" : "Initialize & Claim Reward"}
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default VehicleSetup;
