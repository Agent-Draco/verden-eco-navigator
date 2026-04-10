import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Vehicle3DProps {
  model: string;
  color: string;
  rotation?: number;
  scale?: number;
}

// Map of model IDs to their local GLB paths in /public/3D Assets/
const MODEL_URLS: Record<string, string> = {
  sedan: '/3D Assets/sedan.glb',
  sedan_sports: '/3D Assets/sedan-sports.glb',
  suv: '/3D Assets/suv.glb',
  suv_luxury: '/3D Assets/suv-luxury.glb',
  hatchback: '/3D Assets/hatchback-sports.glb',
  van: '/3D Assets/van.glb',
  truck: '/3D Assets/truck.glb',
  truck_flat: '/3D Assets/truck-flat.glb',
  delivery: '/3D Assets/delivery.glb',
  delivery_flat: '/3D Assets/delivery-flat.glb',
  ambulance: '/3D Assets/ambulance.glb',
  firetruck: '/3D Assets/firetruck.glb',
  garbage_truck: '/3D Assets/garbage-truck.glb',
  police: '/3D Assets/police.glb',
  taxi: '/3D Assets/taxi.glb',
  bike: '/3D Assets/Motorcycle.glb',
  tractor: '/3D Assets/tractor.glb',
  tractor_shovel: '/3D Assets/tractor-shovel.glb',
  tractor_police: '/3D Assets/tractor-police.glb',
  kart_blue: '/3D Assets/kart-oobi.glb',
  kart_red: '/3D Assets/kart-oodi.glb',
  kart_green: '/3D Assets/kart-ooli.glb',
  kart_pink: '/3D Assets/kart-oopi.glb',
  kart_yellow: '/3D Assets/kart-oozi.glb',
  supercar: '/3D Assets/Supercar.glb',
  hypercar: '/3D Assets/race-future.glb',
  f1: '/3D Assets/race.glb',
};

// Model-specific precision scaling (compensates for design-stage size differences)
const MODEL_SCALES: Record<string, number> = {
  supercar: 50,
  bike: 0.01,
};

// Default scale factor (fits comfortably in the 1x1x1 unit box)
const DEFAULT_PREVIEW_SCALE = 1.8;

const Vehicle3D: React.FC<Vehicle3DProps> = ({ model, color, rotation = 0, scale = 1.5 }) => {
  const url = MODEL_URLS[model] || MODEL_URLS.sedan;
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Auto-normalization Engine (v9): Dynamic Bounding-Box Calculation
  const normalizedScene = useMemo(() => {
    if (!scene) return null;
    
    // Deep clone to avoid modifying preloaded scene
    const cloned = scene.clone();
    
    // Force compute bounding box of the entire hierarchy
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    
    // Handle empty or invalid models
    if (size.length() === 0) return cloned;

    // Calculate normalization scale (Unit Scale = 1.0)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 1.0 / maxDim;
    
    // Apply normalization scale
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // Center the model:
    // X and Z should be centered (0)
    // Y should be offset so the bottom (min.y) is at exactly 0 (ground level)
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.set(
        -center.x * scaleFactor, 
        -box.min.y * scaleFactor, // Align bottom to Y=0
        -center.z * scaleFactor
    );
    
    return cloned;
  }, [scene]);

  const modelScale = MODEL_SCALES[model] || 0.67;
  const finalScale = scale * DEFAULT_PREVIEW_SCALE * modelScale;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(rotation);
    }
  });

  if (!scene) {
    return null;
  }

  return (
    <primitive 
      ref={groupRef}
      object={normalizedScene} 
      scale={[finalScale, finalScale, finalScale]} 
      rotation={[0, Math.PI, 0]} 
    />
  );
};

// Preload models with error handling
Object.entries(MODEL_URLS).forEach(([name, url]) => {
    try {
        useGLTF.preload(url);
    } catch (e) {
        console.warn(`Failed to preload ${name} model:`, e);
    }
});

export default Vehicle3D;
