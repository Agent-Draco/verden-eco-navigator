import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Map, Calendar, MessageSquare, ArrowLeft, Sun, Moon, Send, Sparkles, Car, Share2, Loader2, Plus } from "lucide-react";
import { GlassCard } from "@/components/verden/GlassCard";
import { GlassButton } from "@/components/verden/GlassButton";
import GroupDecision from "@/components/verden/GroupDecision";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/services/supabase";
import { cn } from "@/lib/utils";

const EcoMoovGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            // 1. Fetch Group Details
            const { data: groupData } = await supabase
                .from('groups')
                .select('*')
                .eq('id', id)
                .single();
            
            if (groupData) setGroup(groupData);

            // 2. Fetch Group Members
            const { data: membersData } = await supabase
                .from('group_members')
                .select('user_id, is_driver, avatar_label, users(name)')
                .eq('group_id', id);
            
            if (membersData) {
                setMembers(membersData.map((m: any) => ({
                    userId: m.user_id,
                    name: m.users?.name || 'User',
                    avatar: m.avatar_label || (m.users?.name ? m.users.name.charAt(0) : '?'),
                    isDriver: m.is_driver
                })));
            }

            // 3. Fetch Message History
            const { data: messagesData } = await supabase
                .from('group_messages')
                .select('*')
                .eq('group_id', id)
                .order('created_at', { ascending: true });
            
            if (messagesData) setMessages(messagesData);

        } catch (error) {
            console.error("Error fetching group data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchGroupData();
    
    // Subscribe to new messages
    const channel = supabase
        .channel(`group-${id}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${id}` }, 
        (payload) => {
            setMessages(prev => [...prev, payload.new]);
        })
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && user && id) {
      const msgText = newMessage.trim();
      setNewMessage("");
      
      try {
          await supabase.from('group_messages').insert([{
              group_id: id,
              user_id: user.id,
              sender_name: user.name || 'Anonymous',
              message: msgText
          }]);
      } catch (err) {
          console.error("Failed to send message:", err);
      }
    }
  };

  if (isLoading) {
      return (
          <div className="flex h-full w-full items-center justify-center bg-background">
              <Loader2 className="animate-spin text-primary" size={32} />
          </div>
      );
  }

  if (!group) {
      return (
          <div className="flex flex-col h-full w-full items-center justify-center p-6 text-center bg-background">
              <p className="text-muted-foreground mb-4">Group not found.</p>
              <GlassButton onClick={() => navigate('/ecomoov')}>Go Back</GlassButton>
          </div>
      );
  }

  const driver = members.find(m => m.isDriver);

  return (
    <div className="relative w-full h-full flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden px-4 py-6 md:px-8">
        {/* Header */}
        <div className="flex items-center mb-6 shrink-0">
          <GlassButton size="icon" variant="glass" className="mr-4 rounded-xl shadow-sm" onClick={() => navigate("/ecomoov")}>
            <ArrowLeft size={20} />
          </GlassButton>
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight">{group.name}</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Eco Synergy Group</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-6 custom-scrollbar">
            {/* Group Info Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassCard className="p-4 flex items-start gap-4 shadow-md border-primary/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Users size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Active Members</p>
                  <div className="flex -space-x-2">
                    {members.map(m => (
                      <div key={m.userId} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold border-2 border-background ring-1 ring-border shadow-sm" title={m.name}>
                        {m.avatar}
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold border-2 border-background ring-1 ring-primary/20 text-primary">
                        <Plus size={12} />
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-4 flex items-start gap-4 shadow-md border-primary/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Map size={20} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Eco-Route</p>
                  <p className="text-sm font-bold truncate">{group.route_from} ↔ {group.route_to}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">{group.distance}</p>
                </div>
              </GlassCard>
            </div>

            {/* Schedule */}
            <GlassCard className="p-4 flex items-center justify-between shadow-md border-primary/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{group.schedule_days}</p>
                        <p className="text-sm font-bold">Planned Arrival: {group.schedule_time}</p>
                        <p className="text-[10px] text-primary font-bold mt-1">Next: {group.next_trip || 'Coming soon'}</p>
                    </div>
                </div>
                {driver && (
                    <div className="text-right pl-4">
                        <div className="flex items-center gap-1.5 justify-end mb-1">
                            <Car size={14} className="text-primary"/> 
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Pilot</span>
                        </div>
                        <p className="text-sm font-bold truncate max-w-[100px]">{driver.name}</p>
                    </div>
                )}
            </GlassCard>

            {/* Decision Helper */}
            <section>
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/80">Commute Strategy</h2>
                    <Sparkles size={14} className="text-primary" />
                </div>
                <GroupDecision 
                    decision={{ status: 'pending', options: [
                        { type: 'personal_vehicle', label: 'Use Personal Car', emissions: '1.2kg CO2', cost: '₹150', suggested: true, driver: driver?.name },
                        { type: 'shared_ride', label: 'Book a Shuttle', emissions: '0.8kg CO2', cost: '₹220', suggested: false },
                    ] }} 
                    setGroup={() => {}} 
                />
            </section>
            
            {/* Activity Feed */}
            <section className="flex flex-col">
                <div className="flex items-center justify-between mb-4 px-1 sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-1">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/80">Command Center</h2>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         <span className="text-[10px] font-bold text-primary">LIVE</span>
                    </div>
                </div>
                
                <div className="space-y-4 pb-4 px-1" ref={scrollRef}>
                    <AnimatePresence>
                    {messages.map((item, i) => {
                        const isSelf = item.user_id === user?.id;
                        return (
                            <motion.div 
                                key={item.id || i} 
                                className={`flex items-end gap-3 ${isSelf ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                            >
                            {!isSelf && (
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0 border border-border shadow-sm">
                                    {item.sender_name.charAt(0)}
                                </div>
                            )}
                            <div className={cn(
                                "max-w-[75%] p-3.5 rounded-2xl shadow-sm",
                                isSelf 
                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                    : "bg-verden-glass border border-border/50 text-foreground rounded-bl-none backdrop-blur-md"
                            )}>
                                {!isSelf && <p className="text-[10px] font-black opacity-60 mb-1.5 uppercase tracking-wider">{item.sender_name}</p>}
                                <p className="text-sm leading-relaxed font-medium">{item.message}</p>
                                <p className={cn(
                                    "text-[9px] mt-2 font-bold opacity-40",
                                    isSelf ? "text-right" : "text-left"
                                )}>
                                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            </motion.div>
                        );
                    })}
                    </AnimatePresence>
                </div>
            </section>
        </div>

        {/* Message Input - Sticky Bottom */}
        <div className="pt-5 mt-4 border-t border-border/40 shrink-0">
            <div className="flex items-center gap-3">
                <GlassCard variant="strong" className="flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl ring-1 ring-border shadow-inner-xl focus-within:ring-primary/40 transition-all">
                    <input
                        type="text"
                        placeholder="Broadcast to group..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-transparent text-sm outline-none py-1 text-foreground placeholder:text-muted-foreground font-medium"
                    />
                </GlassCard>
                <GlassButton 
                    className="rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg active:scale-95 transition-transform" 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                >
                    <Send size={18} />
                </GlassButton>
            </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary-rgb), 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--primary-rgb), 0.2); }
      `}</style>
    </div>
  );
};

export default EcoMoovGroup;
