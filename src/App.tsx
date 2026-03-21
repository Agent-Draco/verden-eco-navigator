import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import RewardPopup from "@/components/verden/RewardPopup";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import RouteComparison from "./pages/RouteComparison";
import NavigationScreen from "./pages/NavigationScreen";
import TripSummary from "./pages/TripSummary";
import Credits from "./pages/Credits";
import EcoMoov from "./pages/EcoMoov";
import Wallet from "./pages/Wallet";
import FuelEfficient from "./pages/FuelEfficient";
import VehicleSetup from "./pages/VehicleSetup";
import Profile from "./pages/Profile";
import Customize from "./pages/Customize";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppProvider>
          <RewardPopup />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/compare" element={<RouteComparison />} />
              <Route path="/navigate" element={<NavigationScreen />} />
              <Route path="/summary" element={<TripSummary />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/ecomoov" element={<EcoMoov />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/fuel-efficient" element={<FuelEfficient />} />
              <Route path="/vehicle" element={<VehicleSetup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
