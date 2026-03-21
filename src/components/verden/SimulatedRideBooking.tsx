import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Check, Loader, User } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';

const rideOptions = [
    { type: 'Economy', seats: 4, priceFactor: 1, icon: <Car/> },
    { type: 'Shared', seats: 2, priceFactor: 0.7, icon: <div className="flex"><User/><User/></div> },
    { type: 'Premium', seats: 4, priceFactor: 1.5, icon: <Car className="text-verden-yellow"/> },
];

const SimulatedRideBooking = ({ distance, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState(rideOptions[0]);
    const [bookingStep, setBookingStep] = useState('options'); // options, confirming, confirmed

    const basePrice = distance ? parseFloat(distance) * 20 : 150;

    const handleBooking = () => {
        setBookingStep('confirming');
        setTimeout(() => {
            setBookingStep('confirmed');
        }, 2500);
    };

    if (bookingStep === 'confirming') {
        return (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center text-center p-4">
                <Loader size={32} className="animate-spin text-primary mb-3" />
                <h3 className="font-display font-semibold">Confirming Ride...</h3>
                <p className="text-sm text-muted-foreground">Finding a driver near you.</p>
            </motion.div>
        )
    }

    if (bookingStep === 'confirmed') {
        return (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center text-center p-4">
                <Check size={32} className="text-primary mb-3" />
                <h3 className="font-display font-semibold">Driver Assigned!</h3>
                <p className="text-sm text-muted-foreground">Toyota Innova - KA 05 MN 1234</p>
                <p className="text-xs text-muted-foreground">Arriving in 3 minutes.</p>
                <GlassButton size="sm" className="mt-4" onClick={onComplete}>Done</GlassButton>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-1">
            <h3 className="font-display text-center font-semibold mb-3">Book a Ride</h3>
            <div className="space-y-2 mb-4">
                {rideOptions.map(opt => {
                    const price = (basePrice * opt.priceFactor).toFixed(0);
                    return (
                        <GlassCard 
                            key={opt.type} 
                            onClick={() => setSelectedOption(opt)} 
                            className={`p-3 flex items-center justify-between cursor-pointer border-2 ${selectedOption.type === opt.type ? 'border-primary/50' : 'border-transparent'}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                                    {opt.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{opt.type}</p>
                                    <p className="text-xs text-muted-foreground">Seats: {opt.seats}</p>
                                </div>
                            </div>
                            <p className="font-semibold">₹{price}</p>
                        </GlassCard>
                    )
                })}
            </div>
            <GlassButton className="w-full" onClick={handleBooking}>Confirm {selectedOption.type}</GlassButton>
        </motion.div>
    )
};

export default SimulatedRideBooking;
