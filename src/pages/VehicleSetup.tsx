import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Car, Fuel, Gauge, Award, ChevronDown } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

const VehicleSetup = () => {
  const navigate = useNavigate();
  const [fuel, setFuel] = useState("Petrol");
  const [showFuel, setShowFuel] = useState(false);

  return (
    <div className="mobile-container bg-background">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-verden-mint/8 blur-[80px]" />

      <div className="relative z-10 flex flex-col min-h-screen px-5 pt-6 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Vehicle Profile</h1>
        <p className="text-sm text-muted-foreground mb-8">Set up your vehicle for accurate eco routing.</p>

        {/* Reward */}
        <GlassCard variant="glow" className="flex items-center gap-3 mb-6">
          <Award size={20} className="text-primary" />
          <p className="text-sm font-display font-semibold text-foreground">+20 credits for completing setup</p>
        </GlassCard>

        <div className="space-y-4 mb-8">
          {/* Fuel type */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Fuel Type</label>
            <GlassCard className="p-0 cursor-pointer" onClick={() => setShowFuel(!showFuel)}>
              <div className="flex items-center gap-3 px-4 py-3">
                <Fuel size={18} className="text-primary" />
                <span className="flex-1 text-sm text-foreground">{fuel}</span>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform ${showFuel ? "rotate-180" : ""}`} />
              </div>
              {showFuel && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="border-t border-border">
                  {fuelTypes.map((f) => (
                    <button
                      key={f}
                      onClick={(e) => { e.stopPropagation(); setFuel(f); setShowFuel(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors ${fuel === f ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      {f}
                    </button>
                  ))}
                </motion.div>
              )}
            </GlassCard>
          </div>

          {/* Other fields */}
          {[
            { label: "Vehicle Model", icon: Car, placeholder: "e.g., Toyota Camry" },
            { label: "Mileage (km/L)", icon: Gauge, placeholder: "e.g., 15" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs text-muted-foreground mb-2 block">{field.label}</label>
              <GlassCard className="flex items-center gap-3 px-4 py-3 p-0">
                <field.icon size={18} className="text-primary" />
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <GlassButton size="lg" className="w-full" onClick={() => navigate("/profile")}>
            Save & Earn Credits
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default VehicleSetup;
