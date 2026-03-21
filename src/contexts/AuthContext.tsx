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
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);
        if (activeSession?.user) {
            const profile = await fetchUserProfile(activeSession.user);
            setUser(profile);
        }
        setLoading(false);
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

        if (error && status !== 406) { // 406 is for single() not finding a row
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
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, no user returned");

    const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: authData.user.email,
        name: name,
        credits: 0,
        eco_score: 0,
        avatar: 'default',
        theme: 'default'
    });

    if (profileError) {
      throw profileError;
    }

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

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
