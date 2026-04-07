import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/services/supabase";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  credits: number;
  eco_score: number;
  theme: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let initialized = false;
    console.log("[Auth] Initializing AuthContext (Unified Path)...");

    const handleAuthStateChange = async (event: string, newSession: Session | null) => {
      if (!mounted) return;
      
      console.log(`[Auth] Event: ${event} | Session: ${!!newSession}`);
      
      if (newSession?.user) {
          // Stay in loading until profile is ready
          const profile = await fetchUserProfile(newSession.user);
          if (mounted) {
            // Batch updates: set session and user together then stop loading
            setSession(newSession);
            setUser(profile);
            setLoading(false);
            initialized = true;
            console.log("[Auth] Session & Profile ready.");
          }
      } else {
          setSession(null);
          setUser(null);
          setLoading(false);
          initialized = true;
          console.log("[Auth] No active session.");
      }
    };

    // Emergency rescue: If auth never resolves in 8s, force-quit loading
    const rescueTimeout = setTimeout(() => {
        if (mounted && !initialized) {
            console.warn("[Auth] Initialization rescue triggered.");
            setLoading(false);
        }
    }, 8000);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      handleAuthStateChange(event, newSession);
    });

    return () => {
      mounted = false;
      clearTimeout(rescueTimeout);
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
        const { data, error, status } = await supabase
            .from('users')
            .select(`*`)
            .eq('id', supabaseUser.id)
            .single();

        if (error && status !== 406) { 
            throw error;
        }

        if (data) {
            return {
                id: data.id,
                name: data.name,
                email: supabaseUser.email || '',
                avatar: data.avatar || 'default',
                memberSince: new Date(data.created_at).toLocaleDateString(),
                credits: data.credits || 0,
                eco_score: data.eco_score || 0,
                theme: data.theme || 'default',
            };
        } else {
            // Repair missing user profile (e.g. if DB was truncated but Auth remained)
            const { data: newData, error: insertError } = await supabase
                .from('users')
                .upsert([{
                     id: supabaseUser.id,
                     email: supabaseUser.email || '',
                     name: supabaseUser.user_metadata?.name || 'Eco Warrior',
                     credits: 0,
                     eco_score: 0,
                     avatar: 'default',
                     theme: 'default'
                }])
                .select()
                .single();
                
            if (newData) {
                return {
                    id: newData.id,
                    name: newData.name,
                    email: supabaseUser.email || '',
                    avatar: newData.avatar || 'default',
                    memberSince: new Date(newData.created_at).toLocaleDateString(),
                    credits: newData.credits || 0,
                    eco_score: newData.eco_score || 0,
                    theme: newData.theme || 'default',
                };
            } else if (insertError) {
                console.error('Failed to auto-repair missing public.user profile:', insertError);
            }
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Immediate fallback to prevent hanging the UI
        return {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 'Eco Warrior',
          email: supabaseUser.email || '',
          avatar: 'default',
          memberSince: new Date().toLocaleDateString(),
          credits: 0,
          eco_score: 0,
          theme: 'default',
        };
    }
    return null;
  };

  const signup = async (name: string, email: string, password:string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, no user returned");

    const profile = await fetchUserProfile(authData.user);
    setUser(profile);
    setSession(authData.session);
    
    return { user: authData.user, session: authData.session };
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // onAuthStateChange will handle setting the user and session
    return { user: data.user, session: data.session };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out", error);
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
