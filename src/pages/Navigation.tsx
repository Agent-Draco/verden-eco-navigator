import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, Flag } from 'lucide-react';
import GlassButton from '@/components/verden/GlassButton';
import GlassCard from '@/components/verden/GlassCard';
import Map from '@/components/verden/Map';
import { useApp } from '@/contexts/AppContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, lastGreenestRoute } = useApp();

  const { route, destination } = location.state || {};

  const [userLocation, setUserLocation] = useState(null);
  const [eta, setEta] = useState(route ? route.duration : 0);
  const [remainingDist, setRemainingDist] = useState(route ? route.distance : 0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => console.error('Unable to retrieve your location')
      );
    }
  }, []);

  useEffect(() => {
    if (!route) {
      navigate('/home');
      return;
    }

    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
      setRemainingDist(prev => Math.max(0, prev - (route.distance / route.duration) / 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [route, navigate]);

  const handleFinishTrip = () => {
    navigate('/trip-summary');
  };

  if (!route) return null;

  return (
    <div className="mobile-container bg-background">
      <Map 
        userLocation={userLocation}
        destination={destination}
        greenestRoute={route}
        fastestRoute={null}
      />

      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
                <button onClick={() => navigate('/home')} className="p-2">
                    <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div className='text-center'>
                    <p className="text-lg font-bold font-display text-foreground">{Math.round(eta)} min</p>
                    <p className="text-sm text-muted-foreground">{remainingDist.toFixed(1)} km remaining</p>
                </div>
                <div className='w-8'/>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>
          <GlassButton size="lg" className="w-full" onClick={handleFinishTrip}>
            <Flag size={18} className="mr-2" />
            Finish Trip
          </GlassButton>
        </motion.div>
      </div>
    </div>
  );
};

export default Navigation;
