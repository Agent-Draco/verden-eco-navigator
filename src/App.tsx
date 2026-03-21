import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import RouteComparison from "./pages/RouteComparison";
import NavigationScreen from "./pages/NavigationScreen";
import TripSummary from "./pages/TripSummary";
import Credits from "./pages/Credits";
import EcoMoov from "./pages/EcoMoov";
import FuelEfficient from "./pages/FuelEfficient";
import VehicleSetup from "./pages/VehicleSetup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/compare" element={<RouteComparison />} />
          <Route path="/navigate" element={<NavigationScreen />} />
          <Route path="/summary" element={<TripSummary />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/ecomoov" element={<EcoMoov />} />
          <Route path="/fuel-efficient" element={<FuelEfficient />} />
          <Route path="/vehicle" element={<VehicleSetup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
