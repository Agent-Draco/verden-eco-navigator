import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, BookOpen, Globe, Leaf, Zap, Shield, Car } from 'lucide-react';
import { GlassCard } from '@/components/verden/GlassCard';
import { GlassButton } from '@/components/verden/GlassButton';

const RESOURCE_LINKS = [
  {
    title: "Eco-Driving Techniques",
    description: "Learn how to optimize your driving for maximum fuel efficiency and minimum CO₂ emissions.",
    url: "https://www.nrcan.gc.ca/energy-efficiency/transportation-alternative-fuels/personal-vehicles/fuel-efficient-driving-techniques/21038",
    icon: Leaf,
    color: "text-green-500"
  },
  {
    title: "NASA Climate Change",
    description: "Real-time data and research on the current state of our planet's climate.",
    url: "https://climate.nasa.gov/",
    icon: Globe,
    color: "text-blue-500"
  },
  {
    title: "OpenStreetMap Data",
    description: "Our map data is powered by the community-driven OpenStreetMap project.",
    url: "https://www.openstreetmap.org/about",
    icon: BookOpen,
    color: "text-orange-500"
  },
  {
    title: "3D Asset Credits (Kenney)",
    description: "Information about the premium 3D vehicle assets used in the Garage.",
    url: "https://kenney.nl/assets/car-kit",
    icon: Car,
    color: "text-purple-500"
  },
  {
    title: "Supabase Documentation",
    description: "Learn more about the secure cloud infrastructure powering Verden.",
    url: "https://supabase.com/docs",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Privacy & Data Ethics",
    description: "How we protect your location data and ensure user privacy.",
    url: "/terms",
    icon: Shield,
    color: "text-slate-500"
  }
];

const Resources = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Environmental Library",
      icon: Leaf,
      links: RESOURCE_LINKS.filter(l => [0, 1, 4].includes(RESOURCE_LINKS.indexOf(l)))
    },
    {
      name: "Technical Infrastructure",
      icon: Zap,
      links: RESOURCE_LINKS.filter(l => [2, 3, 5].includes(RESOURCE_LINKS.indexOf(l)))
    }
  ];

  return (
    <div className="relative w-full h-full p-6 pb-32 overflow-y-auto flex flex-col items-center bg-abstract">
      <div className="w-full max-w-2xl">
        <header className="flex items-center gap-4 mb-10">
          <GlassButton 
            variant="glass" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-xl shadow-lg border-white/10"
          >
            <ArrowLeft size={20} />
          </GlassButton>
          <div>
            <h1 className="text-3xl font-display font-black text-foreground tracking-tight">Verden Library</h1>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-70">Research & Documentation</p>
          </div>
        </header>

        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/50 pb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <cat.icon size={18} className="text-primary" />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">{cat.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.links.map((link, i) => {
                    const Icon = link.icon;
                    return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <GlassCard 
                        className="h-full p-5 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden"
                        onClick={() => {
                            if (link.url.startsWith('http')) {
                            window.open(link.url, '_blank');
                            } else {
                            navigate(link.url);
                            }
                        }}
                        >
                        <div className="flex flex-col gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center ${link.color} shadow-sm group-hover:scale-110 transition-transform border border-border/50`}>
                            <Icon size={20} />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-bold text-sm text-foreground leading-tight">{link.title}</h3>
                                    <ExternalLink size={10} className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    {link.description}
                                </p>
                            </div>
                        </div>
                        </GlassCard>
                    </motion.div>
                    );
                })}
                </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center">
            <Globe className="mx-auto text-primary mb-3 opacity-50" size={32} />
            <h3 className="font-display font-bold text-foreground mb-1">Our Mission</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Verden is dedicated to accelerating the global transition to sustainable transportation through data-driven insights and gamified eco-navigation.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
