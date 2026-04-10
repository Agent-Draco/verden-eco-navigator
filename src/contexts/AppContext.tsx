import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "./AuthContext";

interface AppState {
  credits: number;
  ecoScore: number;
  streak: number;
  totalTrips: number;
  totalCO2Saved: number;
  tier: "Bronze" | "Silver" | "Gold";
  theme: string;
  selectedAvatar: number;
  unlockedAvatars: number[];
  unlockedThemes: string[];
  selectedVehicle: { model: string; color: string };
  unlockedVehicles: string[];
  badges: { name: string; earned: boolean }[];
  transactions: { id: number; label: string; amount: number; date: string; type: "earn" | "spend" }[];
  joinedGroups: string[];
  vehicleSetup: boolean;
  lastGreenestRoute: any;
}

interface AppContextType extends AppState {
  addCredits: (amount: number, label: string) => void;
  spendCredits: (amount: number, label: string) => boolean;
  completeTrip: (co2Saved: number, creditsEarned: number) => void;
  joinGroup: (name: string) => void;
  setTheme: (t: string) => void;
  setAvatar: (id: number) => void;
  unlockAvatar: (id: number) => boolean;
  unlockTheme: (t: string) => boolean;
  setVehicle: (model: string, color: string) => void;
  unlockVehicle: (model: string, cost: number) => boolean;
  completeVehicleSetup: () => void;
  setLastGreenestRoute: (route: any, isGreenest: boolean) => void;
  showReward: string | null;
  clearReward: () => void;
}

const defaultState: AppState = {
  credits: 0,
  ecoScore: 0,
  streak: 0,
  totalTrips: 0,
  totalCO2Saved: 0,
  tier: "Bronze",
  theme: "default",
  selectedAvatar: 0,
  unlockedAvatars: [0],
  unlockedThemes: ["default"],
  selectedVehicle: { model: 'sedan', color: '#22c55e' },
  unlockedVehicles: ['sedan', 'suv', 'bike'],
  badges: [],
  transactions: [],
  joinedGroups: [],
  vehicleSetup: false,
  lastGreenestRoute: null,
};

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("verden_app");
    if (saved) {
        try {
            return { ...defaultState, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Failed to parse app state from local storage. Resetting to default.", e);
            localStorage.removeItem("verden_app");
        }
    }
    return defaultState;
  });
  const [showReward, setShowReward] = useState<string | null>(null);

  useEffect(() => {
    // Automatic Tier Calculation
    const newTier = state.credits >= 1000 ? "Gold" : state.credits >= 300 ? "Silver" : "Bronze";
    if (newTier !== state.tier) {
      save({ ...state, tier: newTier });
    }
  }, [state.credits]);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        // Fetch real transactions and sync credits from remote
        const { data: txs } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        const mappedTxs = txs?.map((t: any) => ({
          id: t.id,
          label: t.label,
          amount: t.amount,
          type: t.type,
          date: new Date(t.created_at).toLocaleDateString(),
        })) || [];
        
        // Fetch user's historical trips to aggregate impact stats
        const { data: trips } = await supabase
          .from('trips')
          .select('id, co2_saved, departure_time, created_at')
          .eq('user_id', user.id);

        let sumCO2 = 0;
        let tTrips = 0;
        let streakCount = 0;

        if (trips && trips.length > 0) {
            tTrips = trips.length;
            sumCO2 = trips.reduce((acc, curr) => acc + (Number(curr.co2_saved) || 0), 0);
            
            // Calculate general active streak by counting unique days driven
            const days = new Set(trips.map(t => new Date(t.departure_time || t.created_at).toDateString()));
            streakCount = days.size;
        }

        setState((prev) => ({
          ...prev,
          transactions: mappedTxs,
          credits: user.credits !== undefined ? user.credits : prev.credits,
          ecoScore: user.eco_score !== undefined ? user.eco_score : prev.ecoScore,
          totalTrips: tTrips > 0 ? tTrips : prev.totalTrips,
          totalCO2Saved: sumCO2 > 0 ? Number(sumCO2.toFixed(1)) : prev.totalCO2Saved,
          streak: streakCount > 0 ? streakCount : prev.streak, 
        }));
      };
      
      fetchUserData();
    }
  }, [user]);

  const save = (s: AppState) => {
    setState(s);
    localStorage.setItem("verden_app", JSON.stringify(s));
  };

  const persistTransaction = async (amount: number, label: string, type: 'earn' | 'spend', newTotalCredits: number) => {
    if (!user) return;
    try {
      await supabase.from('transactions').insert([{ 
        user_id: user.id, 
        label, 
        amount: Math.abs(amount), 
        type 
      }]);
      await supabase.from('users').update({ credits: newTotalCredits }).eq('id', user.id);
    } catch (e) {
      console.error("Failed to log transaction remotely:", e);
    }
  };

  const addCredits = (amount: number, label: string) => {
    const newTotal = state.credits + amount;
    save({
      ...state,
      credits: newTotal,
      transactions: [
        { id: Date.now() as any, label, amount, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    persistTransaction(amount, label, 'earn', newTotal);
    setShowReward(`+${amount} credits`);
  };

  const spendCredits = (amount: number, label: string) => {
    if (state.credits < amount) return false;
    const newTotal = state.credits - amount;
    save({
      ...state,
      credits: newTotal,
      transactions: [
        { id: Date.now() as any, label, amount: -amount, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    persistTransaction(amount, label, 'spend', newTotal);
    return true;
  };

  const completeTrip = async (co2Saved: number, creditsEarned: number) => {
    const newTotal = state.credits + creditsEarned;
    if (user) {
      const { error } = await supabase.from('trips').insert([{
        user_id: user.id,
        co2_saved: co2Saved,
        credits_earned: creditsEarned,
      }]);
      if (error) console.error("Error inserting trip:", error);
      persistTransaction(creditsEarned, "Trip Complete", 'earn', newTotal);
    }

    save({
      ...state,
      credits: newTotal,
      totalTrips: state.totalTrips + 1,
      totalCO2Saved: +(state.totalCO2Saved + co2Saved).toFixed(1),
      streak: state.streak + 1,
      ecoScore: Math.min(100, state.ecoScore + 1),
      transactions: [
        { id: Date.now() as any, label: "Trip Complete", amount: creditsEarned, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    setShowReward(`+${creditsEarned} credits earned!`);
  };

  const joinGroup = (name: string) => {
    if (state.joinedGroups.includes(name)) return;
    const bonus = 8;
    const newTotal = state.credits + bonus;
    save({
      ...state,
      credits: newTotal,
      joinedGroups: [...state.joinedGroups, name],
      transactions: [
        { id: Date.now() as any, label: `Joined ${name}'s group`, amount: bonus, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    persistTransaction(bonus, `Joined ${name}'s group`, 'earn', newTotal);
    setShowReward(`+${bonus} bonus credits for joining!`);
  };

  const setTheme = (t: string) => save({ ...state, theme: t });
  const setAvatar = (id: number) => save({ ...state, selectedAvatar: id });
  const setVehicle = (model: string, color: string) => save({ ...state, selectedVehicle: { model, color } });
  const setLastGreenestRoute = (route: any, isGreenest: boolean) => save({ ...state, lastGreenestRoute: {...route, isGreenest} });

  const unlockAvatar = (id: number) => {
    if (state.unlockedAvatars.includes(id)) return true;
    if (state.credits < 50) return false;
    const newTotal = state.credits - 50;
    save({
      ...state,
      credits: newTotal,
      unlockedAvatars: [...state.unlockedAvatars, id],
      selectedAvatar: id,
      transactions: [
        { id: Date.now() as any, label: "Avatar Unlock", amount: -50, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    persistTransaction(50, "Avatar Unlock", 'spend', newTotal);
    setShowReward("New avatar unlocked!");
    return true;
  };

  const unlockTheme = (t: string) => {
    if (state.unlockedThemes.includes(t)) return true;
    if (state.credits < 100) return false;
    const newTotal = state.credits - 100;
    save({
      ...state,
      credits: newTotal,
      unlockedThemes: [...state.unlockedThemes, t],
      theme: t,
      transactions: [
        { id: Date.now() as any, label: "Theme Unlock", amount: -100, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    persistTransaction(100, "Theme Unlock", 'spend', newTotal);
    setShowReward(`New theme "${t}" unlocked!`);
    return true;
  };

  const unlockVehicle = (model: string, cost: number) => {
    if (state.unlockedVehicles.includes(model)) return true;
    if (state.credits < cost) return false;
    const newTotal = state.credits - cost;
    save({
      ...state,
      credits: newTotal,
      unlockedVehicles: [...state.unlockedVehicles, model],
      selectedVehicle: { ...state.selectedVehicle, model },
      transactions: [
        { id: Date.now() as any, label: "Vehicle Unlock", amount: -cost, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    persistTransaction(cost, "Vehicle Unlock", 'spend', newTotal);
    setShowReward(`New vehicle "${model}" unlocked!`);
    return true;
  };

  const completeVehicleSetup = () => {
    if (state.vehicleSetup) return;
    const newTotal = state.credits + 20;
    save({
      ...state,
      vehicleSetup: true,
      credits: newTotal,
      transactions: [
        { id: Date.now() as any, label: "Vehicle Setup Bonus", amount: 20, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    persistTransaction(20, "Vehicle Setup Bonus", 'earn', newTotal);
    setShowReward("+20 credits for vehicle setup!");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addCredits,
        spendCredits,
        completeTrip,
        joinGroup,
        setTheme,
        setAvatar,
        unlockAvatar,
        unlockTheme,
        setVehicle,
        unlockVehicle,
        completeVehicleSetup,
        setLastGreenestRoute,
        showReward,
        clearReward: () => setShowReward(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
