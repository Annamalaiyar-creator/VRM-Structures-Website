import React from "react";

export const SpinningGlobe: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[440px] aspect-square mx-auto">
      {/* CSS Styles for ultra-realistic horizontal spinning, cloud movement, and scanline overlay */}
      <style>{`
        @keyframes globe-spin-left-to-right {
          0% {
            transform: translate3d(-400px, 0, 0);
          }
          100% {
            transform: translate3d(0px, 0, 0);
          }
        }
        @keyframes clouds-drift {
          0% {
            transform: translate3d(-300px, -10px, 0);
          }
          100% {
            transform: translate3d(0px, 10px, 0);
          }
        }
        .animate-globe-spin-lr-dark {
          animation: globe-spin-left-to-right 40s linear infinite;
        }
        .animate-clouds-drift {
          animation: clouds-drift 65s linear infinite;
        }
        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.55;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main black aesthetic globe stage matching the image */}
      <div className="relative w-full h-full rounded-full bg-[#02040a] border border-slate-900 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 via-black to-black pointer-events-none opacity-95" />
        
        {/* Starry background overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} 
        />

        {/* Ambient Outer Halo Glow matching the image's luminous edge */}
        <div className="absolute inset-1 rounded-full border border-white/[0.03] shadow-[inset_0_0_50px_rgba(255,255,255,0.08),_0_0_40px_rgba(255,255,255,0.04)] pointer-events-none" />

        {/* Animated Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-101 animate-pulse-ring" />

        {/* Main Globe SVG Layer */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Globe Spherical Lighting / Shading Overlay (fades out at the edges, dark on left and bottom right) */}
            <radialGradient id="dark-globe-shading" cx="35%" cy="30%" r="65%">
              {/* Highlight area */}
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.05" />
              {/* Core shadow */}
              <stop offset="75%" stopColor="#04060c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.99" />
            </radialGradient>

            {/* Glowing atmosphere gradient - matches the white luminous halo on the real Earth */}
            <radialGradient id="dark-globe-rim" cx="50%" cy="50%" r="50%">
              <stop offset="88%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="94%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="97%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
            </radialGradient>

            {/* Detailed Horizontal Scanlines Pattern (to look like a real high-tech digital/satellite feed) */}
            <pattern id="scanlines" x="0" y="0" width="400" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="400" y2="0" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.09" />
            </pattern>

            {/* Realistic Continent Fill Gradient */}
            <linearGradient id="dark-continent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Perfect circular clipping mask to restrict moving landmasses to the sphere */}
            <clipPath id="dark-globe-clip">
              <circle cx="200" cy="200" r="190" />
            </clipPath>
          </defs>

          {/* Outer Atmospheric Aura (Thin, sharp, glowing edge) */}
          <circle cx="200" cy="200" r="192" fill="url(#dark-globe-rim)" />

          {/* Solid deep space backdrop of the sphere */}
          <circle cx="200" cy="200" r="190" fill="#040711" stroke="#334155" strokeWidth="0.8" />

          {/* Fine longitudinal & latitudinal mesh lines (Graticules) matching the image */}
          <g clipPath="url(#dark-globe-clip)" stroke="#475569" strokeWidth="0.5" strokeOpacity="0.2" fill="none">
            {/* Equator & Latitudes */}
            <line x1="10" y1="200" x2="390" y2="200" />
            <line x1="25" y1="120" x2="375" y2="120" />
            <line x1="25" y1="280" x2="375" y2="280" />
            <line x1="65" y1="70" x2="335" y2="70" />
            <line x1="65" y1="330" x2="335" y2="330" />
            
            {/* Fine Longitude Ellipses */}
            <ellipse cx="200" cy="200" rx="50" ry="190" />
            <ellipse cx="200" cy="200" rx="110" ry="190" />
            <ellipse cx="200" cy="200" rx="160" ry="190" />
          </g>

          {/* Rotating Continents and Clouds Group (Constrained to Sphere) */}
          <g clipPath="url(#dark-globe-clip)">
            {/* 1. Continents Layer */}
            <g>
              {/* Set A: Main realistic Map */}
              <g fill="url(#dark-continent-grad)" stroke="#475569" strokeWidth="0.4" strokeOpacity="0.4">
                {/* Detailed geographic paths modeled closely to realistic coordinates scaled to 400x400 */}
                {/* North America & Canada */}
                <path d="M 30,70 C 45,60 55,50 75,50 C 95,50 115,55 125,75 C 115,85 105,80 90,95 C 75,100 65,115 50,115 C 35,115 25,105 15,115 C 5,110 5,90 15,80 C 20,80 25,85 30,70 Z" />
                {/* Central America & Caribbean */}
                <path d="M 50,115 C 55,120 60,125 55,130 C 50,135 48,140 45,145 C 40,140 42,130 50,115 Z" />
                {/* South America (Precise curvature) */}
                <path d="M 45,145 C 55,148 70,165 80,185 C 85,200 80,220 75,235 C 70,250 60,265 52,280 C 48,275 48,260 50,240 C 48,220 40,200 35,185 C 32,175 35,160 45,145 Z" />
                {/* Greenland */}
                <path d="M 95,30 C 110,35 125,25 130,35 C 120,50 100,55 95,30 Z" />
                {/* Africa (Accurate profile) */}
                <path d="M 175,125 C 195,120 215,120 235,135 C 245,145 248,160 242,175 C 238,190 228,215 220,230 C 210,245 200,255 195,260 C 190,255 190,240 192,230 C 190,215 180,205 175,190 C 170,180 165,170 168,155 C 170,140 170,130 175,125 Z" />
                {/* Europe & United Kingdom */}
                <path d="M 145,65 C 150,60 165,55 180,55 C 195,55 200,70 195,80 C 185,85 175,80 165,90 C 155,95 150,85 145,65 Z" />
                {/* Middle East */}
                <path d="M 195,95 C 205,95 215,100 225,105 C 220,115 210,120 200,120 C 195,115 190,105 195,95 Z" />
                {/* Eurasia / Russia / China */}
                <path d="M 180,55 C 210,50 250,45 290,50 C 330,55 355,70 365,95 C 345,115 320,105 295,125 C 270,135 245,125 225,115 C 210,110 195,100 180,55 Z" />
                {/* India & South Asia */}
                <path d="M 235,115 C 245,120 255,130 262,145 C 255,155 245,150 235,135 Z" />
                {/* Japan & East Asian Islands */}
                <path d="M 345,90 C 350,95 355,105 350,110 C 345,105 342,95 345,90 Z" />
                {/* Australia */}
                <path d="M 310,210 C 330,200 350,210 360,230 C 345,255 320,250 310,230 C 305,220 305,215 310,210 Z" />
                {/* Madagascar */}
                <path d="M 238,215 C 242,220 240,230 236,235 C 234,230 234,220 238,215 Z" />
              </g>
 
              {/* Set B: Seamless Duplicate shifted by exactly 400 units */}
              <g fill="url(#dark-continent-grad)" stroke="#475569" strokeWidth="0.4" strokeOpacity="0.4" transform="translate(400, 0)">
                <path d="M 30,70 C 45,60 55,50 75,50 C 95,50 115,55 125,75 C 115,85 105,80 90,95 C 75,100 65,115 50,115 C 35,115 25,105 15,115 C 5,110 5,90 15,80 C 20,80 25,85 30,70 Z" />
                <path d="M 50,115 C 55,120 60,125 55,130 C 50,135 48,140 45,145 C 40,140 42,130 50,115 Z" />
                <path d="M 45,145 C 55,148 70,165 80,185 C 85,200 80,220 75,235 C 70,250 60,265 52,280 C 48,275 48,260 50,240 C 48,220 40,200 35,185 C 32,175 35,160 45,145 Z" />
                <path d="M 95,30 C 110,35 125,25 130,35 C 120,50 100,55 95,30 Z" />
                <path d="M 175,125 C 195,120 215,120 235,135 C 245,145 248,160 242,175 C 238,190 228,215 220,230 C 210,245 200,255 195,260 C 190,255 190,240 192,230 C 190,215 180,205 175,190 C 170,180 165,170 168,155 C 170,140 170,130 175,125 Z" />
                <path d="M 145,65 C 150,60 165,55 180,55 C 195,55 200,70 195,80 C 185,85 175,80 165,90 C 155,95 150,85 145,65 Z" />
                <path d="M 195,95 C 205,95 215,100 225,105 C 220,115 210,120 200,120 C 195,115 190,105 195,95 Z" />
                <path d="M 180,55 C 210,50 250,45 290,50 C 330,55 355,70 365,95 C 345,115 320,105 295,125 C 270,135 245,125 225,115 C 210,110 195,100 180,55 Z" />
                <path d="M 235,115 C 245,120 255,130 262,145 C 255,155 245,150 235,135 Z" />
                <path d="M 345,90 C 350,95 355,105 350,110 C 345,105 342,95 345,90 Z" />
                <path d="M 310,210 C 330,200 350,210 360,230 C 345,255 320,250 310,230 C 305,220 305,215 310,210 Z" />
                <path d="M 238,215 C 242,220 240,230 236,235 C 234,230 234,220 238,215 Z" />
              </g>
            </g>
 
            {/* 2. Realistic Clustered Cloud Formations (Drifts slowly at a different rate) */}
            <g>
              <g fill="#FFFFFF" fillOpacity="0.12" filter="blur(2px)">
                {/* Cloud mass 1 */}
                <path d="M 40,65 Q 60,55 80,75 T 120,65 T 160,85 T 120,105 T 70,95 Z" />
                {/* Cloud mass 2 */}
                <path d="M 180,140 Q 210,120 240,150 T 300,140 T 260,180 T 200,170 Z" />
                {/* Cloud mass 3 */}
                <path d="M 60,200 Q 90,190 120,215 T 180,200 T 130,240 T 80,230 Z" />
                {/* Cloud mass 4 */}
                <path d="M 240,75 Q 270,60 300,85 T 350,75 T 310,115 T 260,105 Z" />
              </g>

              {/* Seamless copy of Clouds shifted by exactly 300 units */}
              <g fill="#FFFFFF" fillOpacity="0.12" filter="blur(2px)" transform="translate(300, 0)">
                <path d="M 40,65 Q 60,55 80,75 T 120,65 T 160,85 T 120,105 T 70,95 Z" />
                <path d="M 180,140 Q 210,120 240,150 T 300,140 T 260,180 T 200,170 Z" />
                <path d="M 60,200 Q 90,190 120,215 T 180,200 T 130,240 T 80,230 Z" />
                <path d="M 240,75 Q 270,60 300,85 T 350,75 T 310,115 T 260,105 Z" />
              </g>
            </g>
          </g>

          {/* High-Tech Realistic Scanlines Overlay (Creates the gorgeous digitized texture from the reference image) */}
          <rect x="0" y="0" width="400" height="400" fill="url(#scanlines)" clipPath="url(#dark-globe-clip)" pointerEvents="none" />

          {/* 3D Spherical Shading & Highlight Overlay */}
          <circle cx="200" cy="200" r="190" fill="url(#dark-globe-shading)" style={{ mixBlendMode: "multiply" }} />

          {/* Central Orbit-Axis Rotation Indicator Overlay (replicated EXACTLY from your uploaded image) */}
          <g transform="translate(200, 200)" className="pointer-events-none select-none">
            {/* Outer dotted/dashed orbit ellipse */}
            <ellipse cx="0" cy="0" rx="30" ry="16" stroke="#FFFFFF" strokeWidth="0.85" strokeDasharray="4 4" strokeOpacity="0.5" fill="none" />
            
            {/* Inner solid high-contrast orbit ring */}
            <ellipse cx="0" cy="0" rx="22" ry="11" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" fill="none" />

            {/* Micro Rotation Arrows on the ring edges */}
            <path d="M -22,-1.5 L -22,1.5 L -19,0 Z" fill="#FFFFFF" />
            <path d="M 22,1.5 L 22,-1.5 L 25,0 Z" fill="#FFFFFF" />
            
            {/* Center glowing dot */}
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="6" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" />
          </g>
        </svg>

        {/* Dynamic high-tech coordinate metadata elements at the corners of the dark globe module */}
        <div className="absolute top-5 left-5 font-mono text-[9px] text-slate-500 tracking-wider font-semibold opacity-75">
          LAT: 20.5937° N
        </div>
        <div className="absolute top-5 right-5 font-mono text-[9px] text-slate-500 tracking-wider font-semibold opacity-75">
          LON: 78.9629° E
        </div>
        <div className="absolute bottom-5 left-5 font-mono text-[9px] text-slate-500 tracking-wider font-semibold opacity-75">
          SYS: SATELLITE.FEED
        </div>
        <div className="absolute bottom-5 right-5 font-mono text-[9px] text-slate-500 tracking-wider font-semibold opacity-75">
          ROT: L-TO-R / SLOW
        </div>

        {/* Elegant "EXPLORE" text overlay at the bottom - styled exactly like the uploaded image */}
        <div className="absolute bottom-7 left-0 right-0 text-center z-20 pointer-events-none">
          <span className="font-mono text-[11px] uppercase font-bold tracking-[0.55em] text-white/95 drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
            EXPLORE
          </span>
        </div>
      </div>
    </div>
  );
};
