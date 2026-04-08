import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container overflow-y-auto bg-abstract p-6 hide-scrollbar relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 glass rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black font-display text-foreground drop-shadow-md">Privacy Policy</h1>
      </div>

      <GlassCard className="p-6 space-y-6">
        <p className="text-sm font-semibold text-primary">Last Updated: 3/21/2026</p>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          Verden values your privacy. This policy explains how we collect, use, and protect your data.
        </p>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">1. Information We Collect</h3>
          <ul className="list-disc list-inside text-muted-foreground text-sm leading-relaxed space-y-1">
            <li>Account information (email, profile data)</li>
            <li>Location data (real-time and historical)</li>
            <li>Device and usage data</li>
            <li>Travel and route history</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">2. How We Use Data</h3>
          <ul className="list-disc list-inside text-muted-foreground text-sm leading-relaxed space-y-1">
            <li>Provide navigation and routing services</li>
            <li>Enable EcoMoov matching</li>
            <li>Calculate environmental impact</li>
            <li>Improve app performance</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">3. Location Data</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Location data is essential for core functionality. It is used to provide accurate routes and matching features.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">4. Data Sharing</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-1">We do not sell your personal data. Data may be shared:</p>
          <ul className="list-disc list-inside text-muted-foreground text-sm leading-relaxed space-y-1">
            <li>With service providers (e.g., Supabase, mapping APIs)</li>
            <li>When required by law</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">5. Data Storage</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Your data is securely stored using trusted backend services.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">6. User Control</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-1">You can:</p>
          <ul className="list-disc list-inside text-muted-foreground text-sm leading-relaxed space-y-1">
            <li>Update your profile</li>
            <li>Request deletion of your data</li>
            <li>Disable location access (with reduced functionality)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">7. Security</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">We implement reasonable safeguards to protect your data.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">8. Children’s Privacy</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Verden is not intended for users under 13 years of age.</p>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">9. Updates</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">We may update this policy periodically.</p>
        </div>

        <p className="text-sm font-medium text-foreground mt-8">Contact: <a href="mailto:terra.llc@outlook.com" className="text-primary hover:underline">terra.llc@outlook.com</a></p>
      </GlassCard>
      <div className="h-10"></div>
    </div>
  );
};

export default PrivacyPolicy;
