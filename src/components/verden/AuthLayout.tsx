import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthLayoutProps {
  children: ReactNode;
}

import Shell from "./Shell";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect to login if loading is finished AND we have no valid session
    // If we have a session but no user, we are still fetching the profile
    if (!loading && !session) {
      console.log("[AuthLayout] No session, redirecting to login...");
      navigate("/login");
    }
  }, [loading, session, navigate]);

  if (loading || (session && !user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
        <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
        </div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
            Authenticating...
        </p>
      </div>
    );
  }

  if (!user && !session) {
    return null;
  }

  return <Shell>{children}</Shell>;
};

export default AuthLayout;
