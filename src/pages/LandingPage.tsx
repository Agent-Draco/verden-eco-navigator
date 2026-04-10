
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/verden/GlassCard';
import GlassButton from '@/components/verden/GlassButton';
import { VerdenLogo } from '@/components/verden/VerdenLogo';
import { motion } from 'framer-motion';
import { Star, Leaf, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-300" />,
      title: "High-Fidelity 3D Navigation",
      description:
        "Experience your routes in stunning, immersive 3D, providing a clear and intuitive understanding of your journey ahead.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      title: "Eco-Conscious Routing",
      description:
        "Our advanced algorithms find the most fuel-efficient routes, helping you save money and reduce your carbon footprint.",
    },
    {
      icon: <Star className="w-8 h-8 text-blue-400" />,
      title: "Real-time Vehicle Dynamics",
      description:
        "Visualize your vehicle's performance and driving habits to encourage safer, more efficient, and smarter driving.",
    },
  ];

  return (
    <div className="min-h-screen w-full topographic-background text-white flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <VerdenLogo className="w-48 h-48 drop-shadow-[0_5px_15px_rgba(0,255,255,0.2)]" />
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-shadow-md mt-4">
            Welcome to Verden
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 max-w-2xl text-shadow">
            Your Eco-Navigator for a sustainable world. Navigate smarter, drive
            better, and protect our planet.
          </p>
        </motion.div>

        {/* Auth Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Link to="/signup">
            <GlassButton>
              Get Started
            </GlassButton>
          </Link>
          <Link to="/login">
            <GlassButton variant="secondary">
              Sign In
            </GlassButton>
          </Link>
        </motion.div>

        {/* Features Section */}
        <div className="mt-24 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                >
                  <GlassCard className="h-full">
                    <div className="p-6 flex flex-col items-center">
                      <div className="mb-4 bg-black/20 rounded-full p-3">
                        {feature.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-shadow mb-3 text-center">
                        {feature.title}
                      </h2>
                      <p className="text-gray-300 text-center">{feature.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-8 mt-16 border-t border-cyan-500/20">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Verden. Made by Terra LLC.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
