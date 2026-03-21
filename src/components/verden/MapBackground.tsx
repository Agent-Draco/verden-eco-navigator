const MapBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 ${className}`}>
    {/* Simulated map with gradient layers */}
    <div className="absolute inset-0 bg-gradient-to-br from-verden-mint/10 via-verden-sky/10 to-verden-lavender/10" />
    {/* Grid pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Route lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
      <path d="M80 700 Q120 500 200 400 Q280 300 300 200 Q310 150 320 100" stroke="hsl(152 60% 45% / 0.3)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 6" />
      <path d="M80 700 Q150 550 180 450 Q210 350 280 250 Q320 180 340 100" stroke="hsl(140 90% 55% / 0.5)" strokeWidth="4" strokeLinecap="round" />
      {/* Glow effect on green route */}
      <path d="M80 700 Q150 550 180 450 Q210 350 280 250 Q320 180 340 100" stroke="hsl(140 90% 55% / 0.15)" strokeWidth="16" strokeLinecap="round" />
      {/* Start point */}
      <circle cx="80" cy="700" r="8" fill="hsl(152 60% 45%)" opacity="0.8" />
      <circle cx="80" cy="700" r="4" fill="white" />
      {/* End point */}
      <circle cx="340" cy="100" r="8" fill="hsl(140 90% 55%)" opacity="0.8" />
      <circle cx="340" cy="100" r="4" fill="white" />
    </svg>
  </div>
);

export default MapBackground;
