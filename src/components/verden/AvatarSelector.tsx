import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';
import Vehicle3D from './Vehicle3D';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface Vehicle {
  id: string;
  label: string;
}

const vehicles: Vehicle[] = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
  { id: 'hatchback', label: 'Sports Hatch' },
  { id: 'supercar', label: 'Supercar' },
  { id: 'truck', label: 'Cargo Truck' },
  { id: 'bike', label: 'Motorcycle' },
];

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Green', value: '#10b981' },
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#18181b' },
];

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: string, color: string) => void;
  currentModel: string;
  currentColor: string;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelect,
  currentModel,
  currentColor
}) => {
  const [selectedModel, setSelectedModel] = useState(currentModel);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="absolute inset-0 z-[100] flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <motion.div 
          className="relative bg-background rounded-t-[32px] p-6 pb-10 shadow-2xl"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-display font-black text-foreground">Choose driving avatar</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close selection"
            >
              <X size={24} />
            </button>
          </div>

          {/* Model Preview Scroll */}
          <div className="flex gap-6 overflow-x-auto py-4 px-2 no-scrollbar snap-x snap-mandatory mb-8">
            {vehicles.map((v) => (
              <div 
                key={v.id}
                className={React.useMemo(() => `flex-shrink-0 w-48 snap-center transition-all ${selectedModel === v.id ? 'scale-110' : 'scale-90 opacity-40'}`, [selectedModel, v.id])}
                onClick={() => setSelectedModel(v.id)}
              >
                <div className="h-32 mb-3">
                  <Canvas camera={{ position: [2, 2, 2], fov: 40 }}>
                    <ambientLight intensity={1.5} />
                    <pointLight position={[5, 5, 5]} intensity={1} />
                    <Suspense fallback={null}>
                      <Vehicle3D 
                        model={v.id} 
                        color={selectedColor} 
                        rotation={0} 
                        scale={1.2} 
                      />
                    </Suspense>
                  </Canvas>
                </div>
                <p className="text-center text-xs font-bold uppercase tracking-widest text-foreground">{v.label}</p>
              </div>
            ))}
          </div>

          {/* Color Selection */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Colour</p>
            <div className="flex gap-4">
              {colors.map((c) => (
                <button
                  key={c.name}
                  className={cn(
                    "w-10 h-10 rounded-full border-4 transition-all shadow-lg flex items-center justify-center",
                    selectedColor === c.value ? "scale-110 border-primary" : "border-transparent",
                    c.name === 'Blue' && "bg-[#3b82f6]",
                    c.name === 'Red' && "bg-[#ef4444]",
                    c.name === 'Yellow' && "bg-[#f59e0b]",
                    c.name === 'Green' && "bg-[#10b981]",
                    c.name === 'White' && "bg-[#ffffff]",
                    c.name === 'Black' && "bg-[#18181b]"
                  )}
                  onClick={() => setSelectedColor(c.value)}
                  aria-label={`Select ${c.name} color`}
                >
                  {selectedColor === c.value && <Check size={18} className={c.name === 'White' ? 'text-black' : 'text-white'} />}
                </button>
              ))}
            </div>
          </div>

          <GlassButton 
            className="w-full bg-primary py-4 rounded-2xl text-lg font-black tracking-widest uppercase shadow-[0_8px_30px_rgb(34,197,94,0.3)]"
            onClick={() => {
              onSelect(selectedModel, selectedColor);
              onClose();
            }}
          >
            Done
          </GlassButton>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvatarSelector;
