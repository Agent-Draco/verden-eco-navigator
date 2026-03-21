import { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  credits: number;
  ecoScore: number;
  streak: number;
  totalTrips: number;
  totalCO2Saved: number;
  tier: string;
  theme: "default" | "dark" | "neon";
  selectedAvatar: number;
  unlockedAvatars: number[];
  unlockedThemes: string[];
  badges: { name: string; earned: boolean }[];
  transactions: { id: number; label: string; amount: number; date: string; type: "earn" | "spend" }[];
  joinedGroups: string[];
  vehicleSetup: boolean;
}

interface AppContextType extends AppState {
  addCredits: (amount: number, label: string) => void;
  spendCredits: (amount: number, label: string) => boolean;
  completeTrip: (co2Saved: number, creditsEarned: number) => void;
  joinGroup: (name: string) => void;
  setTheme: (t: "default" | "dark" | "neon") => void;
  setAvatar: (id: number) => void;
  unlockAvatar: (id: number) => boolean;
  unlockTheme: (t: string) => boolean;
  completeVehicleSetup: () => void;
  showReward: string | null;
  clearReward: () => void;
}

const defaultState: AppState = {
  credits: 240,
  ecoScore: 82,
  streak: 7,
  totalTrips: 42,
  totalCO2Saved: 18.4,
  tier: "Bronze",
  theme: "default",
  selectedAvatar: 0,
  unlockedAvatars: [0, 1, 2],
  unlockedThemes: ["default"],
  badges: [
    { name: "First Ride", earned: true },
    { name: "10 Eco Trips", earned: true },
    { name: "CO₂ Saver", earned: true },
    { name: "Group Rider", earned: false },
    { name: "100 Credits", earned: false },
    { name: "Streak King", earned: false },
  ],
  transactions: [
    { id: 1, label: "Green Route Bonus", amount: 15, date: "Today", type: "earn" },
    { id: 2, label: "Eco Trip Complete", amount: 10, date: "Today", type: "earn" },
    { id: 3, label: "EcoMoov Group Bonus", amount: 8, date: "Yesterday", type: "earn" },
    { id: 4, label: "Avatar Unlock", amount: -50, date: "2 days ago", type: "spend" },
    { id: 5, label: "Streak Reward", amount: 20, date: "3 days ago", type: "earn" },
  ],
  joinedGroups: [],
  vehicleSetup: false,
};

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("verden_app");
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  });
  const [showReward, setShowReward] = useState<string | null>(null);

  const save = (s: AppState) => {
    setState(s);
    localStorage.setItem("verden_app", JSON.stringify(s));
  };

  const addCredits = (amount: number, label: string) => {
    save({
      ...state,
      credits: state.credits + amount,
      transactions: [
        { id: Date.now(), label, amount, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    setShowReward(`+${amount} credits`);
  };

  const spendCredits = (amount: number, label: string) => {
    if (state.credits < amount) return false;
    save({
      ...state,
      credits: state.credits - amount,
      transactions: [
        { id: Date.now(), label, amount: -amount, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    return true;
  };

  const completeTrip = (co2Saved: number, creditsEarned: number) => {
    save({
      ...state,
      credits: state.credits + creditsEarned,
      totalTrips: state.totalTrips + 1,
      totalCO2Saved: +(state.totalCO2Saved + co2Saved).toFixed(1),
      streak: state.streak + 1,
      ecoScore: Math.min(100, state.ecoScore + 1),
      transactions: [
        { id: Date.now(), label: "Trip Complete", amount: creditsEarned, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    setShowReward(`+${creditsEarned} credits earned!`);
  };

  const joinGroup = (name: string) => {
    if (state.joinedGroups.includes(name)) return;
    const bonus = 8;
    save({
      ...state,
      credits: state.credits + bonus,
      joinedGroups: [...state.joinedGroups, name],
      transactions: [
        { id: Date.now(), label: `Joined ${name}'s group`, amount: bonus, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
    setShowReward(`+${bonus} bonus credits for joining!`);
  };

  const setTheme = (t: "default" | "dark" | "neon") => save({ ...state, theme: t });
  const setAvatar = (id: number) => save({ ...state, selectedAvatar: id });

  const unlockAvatar = (id: number) => {
    if (state.unlockedAvatars.includes(id)) return true;
    if (state.credits < 50) return false;
    save({
      ...state,
      credits: state.credits - 50,
      unlockedAvatars: [...state.unlockedAvatars, id],
      selectedAvatar: id,
      transactions: [
        { id: Date.now(), label: "Avatar Unlock", amount: -50, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    setShowReward("New avatar unlocked!");
    return true;
  };

  const unlockTheme = (t: string) => {
    if (state.unlockedThemes.includes(t)) return true;
    if (state.credits < 100) return false;
    save({
      ...state,
      credits: state.credits - 100,
      unlockedThemes: [...state.unlockedThemes, t],
      theme: t as AppState["theme"],
      transactions: [
        { id: Date.now(), label: "Theme Unlock", amount: -100, date: "Just now", type: "spend" },
        ...state.transactions,
      ],
    });
    setShowReward("New theme unlocked!");
    return true;
  };

  const completeVehicleSetup = () => {
    if (state.vehicleSetup) return;
    save({
      ...state,
      vehicleSetup: true,
      credits: state.credits + 20,
      transactions: [
        { id: Date.now(), label: "Vehicle Setup Bonus", amount: 20, date: "Just now", type: "earn" },
        ...state.transactions,
      ],
    });
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
        completeVehicleSetup,
        showReward,
        clearReward: () => setShowReward(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
