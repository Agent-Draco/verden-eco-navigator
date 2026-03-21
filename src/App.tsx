import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthLayout from "@/components/verden/AuthLayout";

const Home = lazy(() => import("@/pages/Home"));
const Navigation = lazy(() => import("@/pages/Navigation"));
const TripSummary = lazy(() => import("@/pages/TripSummary"));
const Profile = lazy(() => import("@/pages/Profile"));
const Login = lazy(() => import("@/pages/Login"));
const EcoMoov = lazy(() => import("@/pages/EcoMoov"));
const EcoMoovGroup = lazy(() => import("@/pages/EcoMoovGroup"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<AuthLayout><Home /></AuthLayout>} />
              <Route path="/home" element={<AuthLayout><Home /></AuthLayout>} />
              <Route path="/navigation" element={<AuthLayout><Navigation /></AuthLayout>} />
              <Route path="/trip-summary" element={<AuthLayout><TripSummary /></AuthLayout>} />
              <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/ecomoov" element={<AuthLayout><EcoMoov /></AuthLayout>} />
              <Route path="/ecomoov/:id" element={<AuthLayout><EcoMoovGroup /></AuthLayout>} />
            </Routes>
          </AuthProvider>
        </AppProvider>
      </Suspense>
    </Router>
  );
};

export default App;
