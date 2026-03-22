import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthLayout from "@/components/verden/AuthLayout";
import LoadingScreen from "@/components/verden/LoadingScreen";

const Home = lazy(() => import("@/pages/Home"));
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


const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingScreen />}>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/" element={<AuthLayout><Home /></AuthLayout>} />
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
            </Routes>
          </AppProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  );
};

export default App;
