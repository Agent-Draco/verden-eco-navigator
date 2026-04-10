import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthLayout from "@/components/verden/AuthLayout";

const Home = lazy(() => import("@/pages/Home"));
const Index = lazy(() => import("@/pages/Index"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const Navigation = lazy(() => import("@/pages/Navigation"));
const TripSummary = lazy(() => import("@/pages/TripSummary"));
const Profile = lazy(() => import("@/pages/Profile"));
const Login = lazy(() => import("@/pages/Login"));
const EcoMoov = lazy(() => import("@/pages/EcoMoov"));
const EcoMoovGroup = lazy(() => import("@/pages/EcoMoovGroup"));
const Signup = lazy(() => import("@/pages/Signup"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Credits = lazy(() => import("@/pages/Credits"));
const Wallet = lazy(() => import("@/pages/Wallet"));
const VehicleSetup = lazy(() => import("@/pages/VehicleSetup"));
const Customize = lazy(() => import("@/pages/Customize"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Resources = lazy(() => import("@/pages/Resources"));

const Root = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <AuthLayout><Home /></AuthLayout> : <LandingPage />;
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/home" element={<AuthLayout><Home /></AuthLayout>} />
              <Route path="/navigation" element={<AuthLayout><Navigation /></AuthLayout>} />
              <Route path="/trip-summary" element={<AuthLayout><TripSummary /></AuthLayout>} />
              <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/ecomoov" element={<AuthLayout><EcoMoov /></AuthLayout>} />
              <Route path="/ecomoov/:id" element={<AuthLayout><EcoMoovGroup /></AuthLayout>} />
              <Route path="/credits" element={<AuthLayout><Credits /></AuthLayout>} />
              <Route path="/wallet" element={<AuthLayout><Wallet /></AuthLayout>} />
              <Route path="/vehicle" element={<AuthLayout><VehicleSetup /></AuthLayout>} />
              <Route path="/customize" element={<AuthLayout><Customize /></AuthLayout>} />
              <Route path="/resources" element={<AuthLayout><Resources /></AuthLayout>} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  );
};

export default App;
