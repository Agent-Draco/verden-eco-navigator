import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Navigation, Wind, Layers } from 'lucide-react';
import GlassCard from '@/components/verden/GlassCard';
import CesiumViewer from '@/components/verden/CesiumViewer';
import { useGeoNavigation } from '@/hooks/useGeoNavigation';
import { useApp } from '@/contexts/AppContext';

const NavigationScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { route } = location.state || {}; // Destination is not strictly required for rendering since routing is pre-determined
  const { location: userLocation, bearing, speedKmh } = useGeoNavigation();
  const [remainingTime, setRemainingTime] = useState(route ? route.duration : 0);
  const [remainingDistance, setRemainingDistance] = useState(route ? route.distance : 0);
  const { selectedVehicle } = useApp();

  useEffect(() => {
    if (!route) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1));
      setRemainingDistance((prev) => Math.max(0, prev - (route.distance / route.duration)));
    }, 60000);

    return () => clearInterval(timer);
  }, [route, navigate]);

  if (!route) return null;

  return (
    <div className="mobile-container bg-background">
      <CesiumViewer 
        userLocation={userLocation}
        bearing={bearing}
        speedKmh={speedKmh}
        vehicle={selectedVehicle}
      />
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <GlassCard>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{remainingTime} min</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-bold">{(remainingDistance).toFixed(1)} km</p>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-bold">{new Date(Date.now() + remainingTime * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-sm text-muted-foreground">ETA</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="absolute bottom-24 left-0 right-0 z-20 px-4">
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
        >
        <GlassCard
          variant="glow"
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
            <div className="flex items-center justify-center">
                <p className="font-display font-semibold text-foreground">End Trip</p>
            </div>
        </GlassCard>
       </motion.div>
      </div>
    </div>
  );
};

export default NavigationScreen;
