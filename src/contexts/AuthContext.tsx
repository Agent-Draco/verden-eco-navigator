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
    setLoading(true);
    const getActiveSession = async () => {
        try {
            const { data: { session: activeSession } } = await supabase.auth.getSession();
            setSession(activeSession);
            if (activeSession?.user) {
                const profile = await fetchUserProfile(activeSession.user);
                setUser(profile);
            }
        } catch (error) {
            console.warn("Supabase auth check failed. Check your credentials.", error);
        } finally {
            setLoading(false);
        }
    };
    
    getActiveSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
          const profile = await fetchUserProfile(newSession.user);
          setUser(profile);
      } else {
          setUser(null);
      }
      setLoading(false);
    });

    return () => {
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
                     name: supabaseUser.user_metadata?.name || 'Eco User',
                     credits: 100,
                     eco_score: 50,
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
    
    if (data.user) {
        const profile = await fetchUserProfile(data.user);
        setUser(profile);
    }
    setSession(data.session);

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
