import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Plus, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import BottomNav from "@/components/verden/BottomNav";
import { useApp } from "@/contexts/AppContext";

const mockMatches = [
  { id: "match1", name: "Tech Park Riders", matchScore: 92, members: 4, route: "HSR Layout → ITPL", time: "8:45 AM" },
  { id: "match2", name: "Eco Warriors", matchScore: 85, members: 3, route: "Jayanagar → MG Road", time: "9:15 AM" },
  { id: "match3", name: "Green Commute Club", matchScore: 78, members: 5, route: "Indiranagar → Whitefield", time: "9:00 AM" },
];

const mockGroups = [
  { id: "group1", name: "Morning Commuters", nextTrip: "Tomorrow, 9:00 AM" },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const EcoMoov = () => {
  const navigate = useNavigate();
  const { user, credits } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = () => {
    // Basic calendar logic
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold">{month} {year}</h3>
                <div className="flex gap-1">
                    <GlassButton size="icon" variant="glass" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}><ChevronLeft size={16}/></GlassButton>
                    <GlassButton size="icon" variant="glass" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}><ChevronRight size={16}/></GlassButton>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
                {weekDays.map(day => <div key={day}>{day}</div>)}
            </div>
            {/* Add calendar days here */}
             <div className="grid grid-cols-7 text-center text-sm mt-2">
                {/* Example days, a full implementation would be needed */}
                <div className="p-1 text-muted-foreground">29</div>
                <div className="p-1 text-muted-foreground">30</div>
                <div className="p-1">1</div>
                <div className="p-1">2</div>
                <div className="p-1 rounded-full bg-primary/20 border-2 border-primary/50">3</div>
                <div className="p-1">4</div>
                <div className="p-1">5</div>
             </div>
        </GlassCard>
    )
  }

  return (
    <div className="mobile-container bg-background text-foreground">
      <div className="p-4 pt-6">
        <h1 className="font-display text-3xl font-bold mb-1">EcoMoov</h1>
        <p className="text-muted-foreground mb-4">Intelligent commute planning.</p>

        {/* Calendar */}
        <div className="mb-5">
          <h2 className="font-display font-semibold mb-2 flex items-center gap-2"><Calendar size={16} className="text-primary" /> My Schedule</h2>
          {renderCalendar()}
        </div>

        {/* My Groups */}
        <div className="mb-5">
            <h2 className="font-display font-semibold mb-2 flex items-center gap-2"><Users size={16} className="text-primary" /> My Groups</h2>
            {mockGroups.map(group => (
                <GlassCard key={group.id} className="p-3 mb-2 flex items-center justify-between" onClick={() => navigate(`/ecomoov/${group.id}`)}>
                    <div>
                        <p className="font-semibold text-foreground">{group.name}</p>
                        <p className="text-xs text-muted-foreground">Next trip: {group.nextTrip}</p>
                    </div>
                    <ChevronRight/>
                </GlassCard>
            ))}
        </div>

        {/* Find Matches */}
        <div>
          <h2 className="font-display font-semibold mb-2 flex items-center gap-2"><Sparkles size={16} className="text-primary" /> Find Matches</h2>
          {mockMatches.map(match => (
            <GlassCard key={match.id} className="p-3 mb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="font-semibold text-foreground">{match.name}</p>
                        <p className="text-xs text-muted-foreground">{match.route} @ {match.time}</p>
                        <p className="text-xs text-muted-foreground">{match.members} members</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-primary">{match.matchScore}%</p>
                        <p className="text-xs text-muted-foreground">Match</p>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <GlassButton size="sm" onClick={() => alert("Joining group...")}>Request to Join</GlassButton>
                </div>
            </GlassCard>
          ))}
        </div>

      </div>
      <BottomNav />
      
    </div>
  );
};

export default EcoMoov;
