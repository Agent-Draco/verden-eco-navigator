import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Map, Calendar, MessageSquare, ArrowLeft, Sun, Moon, Send, Sparkles, Car, Share2 } from "lucide-react";
import GlassCard from "@/components/verden/GlassCard";
import GlassButton from "@/components/verden/GlassButton";
import GroupDecision from "@/components/verden/GroupDecision";
import SimulatedRideBooking from "@/components/verden/SimulatedRideBooking";
import { useApp } from "@/contexts/AppContext";

const mockGroup = {
  id: "group1",
  name: "Morning Commuters",
  members: [
    { name: "You", avatar: "Y", isDriver: false, vehicle: { seating: 4, mileage: 15, fuel: "petrol", emissions: 120 } },
    { name: "Rahul", avatar: "R", isDriver: true, vehicle: { seating: 5, mileage: 20, fuel: "diesel", emissions: 100 } },
    { name: "Sarah K.", avatar: "SK", isDriver: false, vehicle: { seating: 4, mileage: 18, fuel: "petrol", emissions: 115 } },
    { name: "Alex M.", avatar: "AM", isDriver: false, vehicle: { seating: 7, mileage: 12, fuel: "diesel", emissions: 150 } },
  ],
  route: {
    from: "Koramangala",
    to: "Electronic City",
    distance: "12 km",
  },
  schedule: {
    time: "9:00 AM",
    days: "Weekdays",
    nextTrip: "Tomorrow, 9:00 AM",
  },
  transportMode: "car",
  activityFeed: [
    { from: "System", message: "Rahul will drive tomorrow.", time: "6:10 PM" },
    { from: "Sarah K.", message: "Perfect, see you then!", time: "6:15 PM" },
    { from: "You", message: "Sounds good!", time: "6:18 PM" },
  ],
  decision: {
    status: "pending", // 'pending', 'decided'
    options: [
        { type: 'personal_vehicle', label: 'Use Personal Vehicle', emissions: '1.2kg CO2', cost: '₹150', suggested: true, driver: "Rahul" },
        { type: 'shared_ride', label: 'Book a Ride', emissions: '1.5kg CO2', cost: '₹320', suggested: false },
        { type: 'public_transport', label: 'Use Public Transport', emissions: '0.4kg CO2', cost: '₹80', suggested: false },
    ],
    confirmedOption: null,
  }
};

const EcoMoovGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(mockGroup);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newActivity = { from: "You", message: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setGroup(prev => ({
        ...prev,
        activityFeed: [...prev.activityFeed, newActivity]
      }));
      setNewMessage("");
    }
  };

  const handleBookingComplete = () => {
      setGroup(prev => ({
        ...prev,
        activityFeed: [...prev.activityFeed, { from: 'System', message: 'Ride booked successfully!', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
  }

  const driver = group.members.find(m => m.isDriver);

  return (
    <div className="mobile-container bg-background text-foreground">
      <div className="p-4 pt-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <GlassButton size="icon" variant="glass" className="mr-2" onClick={() => navigate("/ecomoov")}>
            <ArrowLeft size={20} />
          </GlassButton>
          <h1 className="font-display text-2xl font-bold">{group.name}</h1>
        </div>

        {/* Group Info Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <GlassCard className="p-3 flex items-start gap-3">
            <Users size={16} className="text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Members</p>
              <div className="flex -space-x-2 mt-1">
                {group.members.map(m => (
                  <div key={m.name} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border-2 border-background">{m.avatar}</div>
                ))}
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 flex items-start gap-3">
            <Map size={16} className="text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Route</p>
              <p className="text-xs font-semibold">{group.route.from} ↔ {group.route.to}</p>
              <p className="text-xs text-muted-foreground">{group.route.distance}</p>
            </div>
          </GlassCard>
        </div>

        {/* Schedule */}
        <GlassCard className="p-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <Calendar size={16} className="text-primary" />
                <div>
                    <p className="text-xs text-muted-foreground">{group.schedule.days} at {group.schedule.time}</p>
                    <p className="text-xs font-semibold">Next trip: {group.schedule.nextTrip}</p>
                </div>
            </div>
            {driver && (
                <div className="text-right">
                    <p className="text-xs flex items-center gap-1.5 justify-end"><Car size={12} className="text-primary"/> Driver</p>
                    <p className="text-xs font-semibold">{driver.name}</p>
                </div>
            )}
        </GlassCard>

        {/* Decision Component / Booking */}
        {group.decision.status === 'pending' && <GroupDecision decision={group.decision} setGroup={setGroup} />}
        {group.decision.status === 'decided' && group.decision.confirmedOption === 'shared_ride' && (
            <GlassCard className="mb-4"><SimulatedRideBooking distance={group.route.distance} onComplete={handleBookingComplete}/></GlassCard>
        )}
        
        {/* Activity Feed */}
        <div className="h-[calc(100vh-450px)] flex flex-col">
            <h2 className="font-display font-semibold mb-2 flex items-center gap-2"><MessageSquare size={16} className="text-primary"/> Activity</h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                <AnimatePresence>
                {group.activityFeed.map((item, i) => (
                    <motion.div 
                        key={i} 
                        className={`flex items-end gap-2 ${item.from === 'You' ? 'justify-end' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                    {item.from !== 'You' && <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold self-start">{item.from.charAt(0)}</div>}
                    <div className={`max-w-[75%] p-2.5 rounded-2xl ${item.from === 'You' ? 'bg-primary/20 rounded-br-md' : 'bg-secondary rounded-bl-md'}`}>
                        <p className="text-xs">{item.message}</p>
                        <p className={`text-[10px] mt-1 ${item.from === 'You' ? 'text-right' : 'text-left'} text-muted-foreground/70`}>{item.time}</p>
                    </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>

            {/* Message Input */}
            <div className="mt-auto pt-2">
                <GlassCard variant="strong" className="flex items-center gap-2 p-1.5">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-transparent text-sm outline-none px-2 text-foreground placeholder:text-muted-foreground"
                />
                <GlassButton size="icon" onClick={handleSendMessage}>
                    <Send size={16} />
                </GlassButton>
                </GlassCard>
            </div>
        </div>

      </div>
    </div>
  );
};

export default EcoMoovGroup;
