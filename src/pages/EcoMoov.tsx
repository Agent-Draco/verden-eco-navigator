import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Plus, ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/services/supabase";

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const EcoMoov = () => {
  const navigate = useNavigate();
  const { credits } = useApp();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [matches, setMatches] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all available commute matches
        const { data: matchesData } = await supabase
          .from('commute_matches')
          .select('*')
          .order('match_score', { ascending: false });
        
        if (matchesData) setMatches(matchesData);

        // Fetch groups where the user is a member
        if (user) {
          const { data: memberOf } = await supabase
            .from('group_members')
            .select('group_id')
            .eq('user_id', user.id);
          
          if (memberOf && memberOf.length > 0) {
            const groupIds = memberOf.map(m => m.group_id);
            const { data: groupsData } = await supabase
              .from('groups')
              .select('*')
              .in('id', groupIds);
            
            if (groupsData) setGroups(groupsData);
          }
        }
      } catch (error) {
        console.error("Error fetching EcoMoov data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const renderCalendar = () => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    
    // Calculate days for the grid
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    
    // Adjust for Monday start (0=Sun, 1=Mon... in JS Date, but our weekDays starts with Mon)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const prevMonthDays = new Date(year, currentDate.getMonth(), 0).getDate();
    const calendarDays = [];
    
    // Add prev month days
    for (let i = startOffset - 1; i >= 0; i--) {
      calendarDays.push({ day: prevMonthDays - i, current: false });
    }
    // Add current month days
    const todayNum = new Date().getDate();
    const isThisMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
    
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, current: true, isToday: isThisMonth && i === todayNum });
    }
    
    // Fill remaining days to make complete weeks (rows of 7)
    const remaining = 42 - calendarDays.length; 
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, current: false });
    }

    return (
      <GlassCard className="p-4 shadow-lg border-primary/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground">{month} {year}</h3>
          <div className="flex gap-2">
            <GlassButton 
              size="icon" 
              variant="glass" 
              className="w-8 h-8 rounded-full"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <ChevronLeft size={16}/>
            </GlassButton>
            <GlassButton 
              size="icon" 
              variant="glass" 
              className="w-8 h-8 rounded-full"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <ChevronRight size={16}/>
            </GlassButton>
          </div>
        </div>
        
        <div className="grid grid-cols-7 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-2">
          {weekDays.map(day => <div key={day}>{day}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-medium">
          {calendarDays.slice(0, 35).map((d, i) => (
            <div key={i} className="flex items-center justify-center p-0.5">
              <div className={cn(
                "w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                d.isToday ? "bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20" : 
                d.current ? "text-foreground/80 hover:bg-white/10 cursor-pointer" : "text-muted-foreground/20"
              )}>
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="relative w-full p-5 pb-32">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <h1 className="font-display text-3xl font-bold mb-1 text-foreground">EcoMoov</h1>
      <p className="text-muted-foreground mb-8 text-sm">Intelligent commute planning.</p>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-50">
          <Loader2 className="animate-spin mb-4 text-primary" size={32} />
          <p className="text-sm font-medium tracking-wide">Finding eco-matches...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Calendar */}
          <section>
            <h2 className="font-display font-bold mb-4 flex items-center gap-2 text-foreground/80 uppercase tracking-widest text-xs">
              <Calendar size={14} className="text-primary" /> My Schedule
            </h2>
            {renderCalendar()}
          </section>

          {/* My Groups */}
          <section>
            <h2 className="font-display font-bold mb-4 flex items-center gap-2 text-foreground/80 uppercase tracking-widest text-xs">
              <Users size={14} className="text-primary" /> My Groups
            </h2>
            <div className="space-y-3">
              {groups.length > 0 ? (
                groups.map(group => (
                  <GlassCard key={group.id} className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 hover:translate-x-1 transition-all group" onClick={() => navigate(`/ecomoov/${group.id}`)}>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{group.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Next trip: {group.next_trip || 'Scheduled soon'}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </GlassCard>
                ))
              ) : (
                <GlassCard className="p-8 text-center border-dashed border-primary/20">
                  <p className="text-xs text-muted-foreground italic">No groups joined yet. Match with others below to start saving CO₂!</p>
                </GlassCard>
              )}
            </div>
          </section>

          {/* Find Matches */}
          <section>
            <h2 className="font-display font-bold mb-4 flex items-center gap-2 text-foreground/80 uppercase tracking-widest text-xs">
              <Sparkles size={14} className="text-primary" /> Recommended Matches
            </h2>
            <div className="space-y-4">
              {matches.length > 0 ? (
                matches.map(match => (
                  <GlassCard key={match.id} className="p-4 shadow-md hover:shadow-xl transition-shadow border-primary/5 hover:border-primary/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-lg mb-1">{match.name}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="bg-secondary/50 px-2 py-0.5 rounded text-[10px] font-bold text-primary">COMMUTE</span>
                          <p>{match.route_from} → {match.route_to}</p>
                          <span className="opacity-50">•</span>
                          <p>{match.time}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="bg-primary/10 rounded-2xl px-3 py-1 border border-primary/20">
                          <p className="text-xl font-black text-primary leading-none">{match.match_score}%</p>
                          <p className="text-[8px] font-bold text-primary uppercase tracking-tighter mt-0.5 text-center">Match</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/20">
                      <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
                        <Users size={12} /> {match.members_count || 0} members active
                      </p>
                      <GlassButton size="sm" variant="glow" onClick={() => alert("Joining group...")} className="text-[10px] px-4">Request to Join</GlassButton>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard className="p-8 text-center opacity-70 border-dashed border-primary/20">
                  <p className="text-xs text-muted-foreground italic">No matches found in your area. Try broadening your schedule!</p>
                </GlassCard>
              )}
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
};

export default EcoMoov;
