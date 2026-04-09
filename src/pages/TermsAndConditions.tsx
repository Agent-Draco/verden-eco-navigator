import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container overflow-y-auto p-6 hide-scrollbar relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black font-display text-foreground">Terms &amp; Conditions</h1>
      </div>

      <GlassCard className="p-6 space-y-6">
        <p className="text-sm font-semibold text-primary">Last Updated: 3/21/2026</p>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          Welcome to Verden. By accessing or using our application, you agree to the following terms.
        </p>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">1. Use of Service</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Verden is a navigation and mobility platform designed to provide route optimization, environmental insights, and collaborative travel features. You agree to use the service responsibly and not misuse or disrupt its functionality.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">2. User Accounts</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">You are responsible for maintaining the confidentiality of your account. You agree to provide accurate information and not impersonate others.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">3. Location Data</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Verden uses real-time location data to provide navigation, route suggestions, and EcoMoov matching. By using the app, you consent to this usage.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">4. EcoMoov & Group Travel</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Verden facilitates user coordination for shared travel. Verden is not responsible for user conduct, safety, or arrangements made between users.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">5. Simulated Services</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Some features (such as public transport timing or ride booking simulations) are approximations and may not reflect real-world conditions.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">6. Environmental Insights</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">CO₂ calculations and eco recommendations are estimates and should not be considered scientifically exact.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">7. Payments & Credits</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Credits within the app are virtual and may not have direct monetary value unless explicitly stated.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">8. Limitation of Liability</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Verden is not liable for delays, route inaccuracies, or any damages arising from use of the service.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">9. Changes to Service</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">We may modify or discontinue features at any time without prior notice.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">10. Acceptance</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">By using Verden, you agree to these terms.</p>
        </div>

        <p className="text-sm font-medium text-foreground mt-8">Contact: <a href="mailto:terra.llc@outlook.com" className="text-primary hover:underline">terra.llc@outlook.com</a></p>
      </GlassCard>
      <div className="h-10"></div>
    </div>
  );
};

export default TermsAndConditions;
