import React from "react";
import { motion } from "motion/react";

// ImagineLogo: Uses the actual VRM Structures brand logo image
export const ImagineLogo = ({ invert = false }: { invert?: boolean }) => (
  <div className="flex items-center select-none group cursor-pointer transition-transform duration-300 hover:scale-[1.015]">
    <img
      src="/vrm-logo.png"
      alt="VRM Structures - A Manufacturing Company"
      className={`h-[44px] sm:h-[46px] w-auto object-contain transition-all duration-300 ${invert ? "brightness-0 invert" : ""}`}
    />
  </div>
);

// Y Combinator mini-badge
export const YCBadge = () => (
  <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/40 text-[11px] font-medium text-slate-600 shadow-sm shadow-slate-100/50">
    <span className="text-slate-400">Backed by</span>
    <div className="w-4 h-4 bg-[#FF6600] flex items-center justify-center rounded-[2px] font-mono font-bold text-[10px] text-white leading-none">
      Y
    </div>
    <span className="font-semibold text-slate-800">Combinator</span>
  </div>
);

// Global persistent video state for seamless synchronization across all pages
let sharedHeroVideo: HTMLVideoElement | null = null;
let sharedHeroCurrentTime = 0;
let isSharedHeroMuted = true;

export const getSharedHeroVideo = (): HTMLVideoElement | null => {
  if (typeof document === "undefined") return null;
  if (!sharedHeroVideo) {
    const video = document.createElement("video");
    video.src = "/videos/corporate-film.mp4";
    video.poster = "/videos/corporate-film-poster.jpg";
    video.autoplay = true;
    video.loop = true;
    video.defaultMuted = true;
    video.muted = isSharedHeroMuted;
    video.playsInline = true;
    video.preload = "auto";
    video.className = "w-full h-full object-cover scale-105 pointer-events-none select-none";

    video.addEventListener("timeupdate", () => {
      if (video.currentTime > 0) {
        sharedHeroCurrentTime = video.currentTime;
      }
    });

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay();

    sharedHeroVideo = video;
  }
  return sharedHeroVideo;
};

// High-fidelity continuous loop video background synchronized across all pages
export const HeroVideoBackground = ({ 
  isMuted = true, 
  videoRef 
}: { 
  isMuted?: boolean; 
  videoRef?: React.RefObject<HTMLVideoElement | null>;
} = {}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    isSharedHeroMuted = isMuted;
    const video = getSharedHeroVideo();
    const container = containerRef.current;
    if (!video || !container) return;

    video.muted = isMuted;

    // Reparent the persistent video element without destroying or reloading it
    if (video.parentElement !== container) {
      container.appendChild(video);
    }

    // Ensure playback continues from current timestamp
    if (sharedHeroCurrentTime > 0 && Math.abs(video.currentTime - sharedHeroCurrentTime) > 0.5) {
      try {
        video.currentTime = sharedHeroCurrentTime;
      } catch (_) {}
    }

    if (videoRef) {
      (videoRef as any).current = video;
    }

    // Scroll detection: Pause video when scrolled down past hero, resume when hero enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User scrolled back into hero section: resume playback
            if (video.paused) {
              video.play().catch(() => {});
            }
          } else {
            // User scrolled down past hero section: stop/pause playback
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isMuted, videoRef]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-slate-950">
      <div ref={containerRef} className="w-full h-full" />
      {/* Refined subtle dark overlay so the factory film is vivid, crisp, and vibrant while white text stays perfectly readable */}
      <div className="absolute inset-0 bg-black/25 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 z-10" />
    </div>
  );
};

// High-fidelity photographic background for content-specific Hero sections with balanced opacity
export const HeroImageBackground = ({
  src,
  alt = "VRM Structures Solar Infrastructure",
  opacity = "opacity-25"
}: {
  src: string;
  alt?: string;
  opacity?: string;
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-slate-950">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${opacity}`}
        loading="eager"
      />
      {/* Dark overlay scrims and center vignette to ensure foreground text is 100% crisp, prominent, and effortlessly readable */}
      <div className="absolute inset-0 bg-slate-950/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/80 via-slate-950/50 to-transparent z-10" />
    </div>
  );
};

// High-fidelity background representing the SF Skyline rising above a sea of clouds
export const CityAboveCloudsBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Absolute sky gradient backing */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #DFE6F2 0%, #ECE3E3 35%, #EAE5EC 65%, #F5F1EE 100%)"
        }}
      />

      <svg
        className="absolute bottom-0 left-0 w-full h-full min-h-[600px] md:min-h-[800px]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Glow */}
          <radialGradient id="skyGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF4ED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EAE5EC" stopOpacity="0" />
          </radialGradient>

          {/* Building Gradients for SF-inspired towers */}
          <linearGradient id="needleTowerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#CBD3E2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A5B4CD" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="salesforceTowerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#D2DAE8" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#A8B9D3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8799B5" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cityBlockGradLeft" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#E2E7F2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cityBlockGradRight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#E9EEF6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#CBD5E1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </linearGradient>

          {/* Cloud Radial Gradients for fluffy wisp details */}
          <radialGradient id="cloudGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#F5F3F6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#EAE5EC" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cloudGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#F9F6FA" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#F5F1EE" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cloudPeachGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFEADF" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#F9EFF1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EAE5EC" stopOpacity="0" />
          </radialGradient>

          {/* Soft Blur Filter to replicate misty atmosphere */}
          <filter id="mistBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="lightBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Global ambient lighting overlay */}
        <rect width="1440" height="900" fill="url(#skyGlow)" />

        {/* ================= BACKGROUND SKYLINE LAYER (Enveloped in Clouds) ================= */}

        {/* Far Left Medium Spire Tower */}
        <g opacity="0.45">
          <rect x="120" y="520" width="40" height="180" fill="url(#cityBlockGradLeft)" />
          <polygon points="120,520 160,520 140,470" fill="url(#cityBlockGradLeft)" />
        </g>

        {/* 1. Left Needle Tower (Transamerica-like spire) */}
        <motion.g
          initial={{ y: 25 }}
          animate={{ y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="origin-bottom"
        >
          {/* Main Needle Structure */}
          <polygon
            points="280,420 300,420 290,750"
            fill="url(#needleTowerGrad)"
            opacity="0.8"
          />
          {/* Spire tip extending high */}
          <line x1="290" y1="420" x2="290" y2="350" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          {/* Crossbars / Architectural details */}
          <line x1="288" y1="440" x2="292" y2="440" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <line x1="287" y1="465" x2="293" y2="465" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <line x1="285" y1="495" x2="295" y2="495" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <line x1="283" y1="535" x2="297" y2="535" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
        </motion.g>

        {/* 2. Middle Left Flat-top Skyline Block (Distant silhouettes) */}
        <g opacity="0.35">
          <rect x="380" y="580" width="75" height="200" fill="url(#cityBlockGradLeft)" rx="2" />
          <rect x="420" y="540" width="60" height="240" fill="url(#cityBlockGradLeft)" rx="2" />
          <rect x="470" y="600" width="50" height="180" fill="url(#cityBlockGradLeft)" rx="1" />
        </g>

        {/* 3. Middle-to-Right Salesforce Tower (Sleek, rounded glass dome tower) */}
        <motion.g
          initial={{ y: 35, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="origin-bottom"
        >
          {/* Outer Glass Shell of Salesforce-style skyscraper */}
          <path
            d="M 940 340 
               C 955 340, 970 343, 980 355 
               C 990 367, 1002 410, 1008 480 
               L 1025 800 
               L 855 800 
               L 872 480 
               C 878 410, 890 367, 900 355
               C 910 343, 925 340, 940 340 Z"
            fill="url(#salesforceTowerGrad)"
          />

          {/* Vertical sleek grid columns on the skyscraper */}
          <path d="M 940 340 L 940 800" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.45" />
          <path d="M 920 345 C 923 410, 927 480, 915 800" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
          <path d="M 960 345 C 957 410, 953 480, 965 800" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />

          <path d="M 900 355 C 905 410, 910 480, 890 800" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.2" />
          <path d="M 980 355 C 975 410, 970 480, 990 800" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.2" />

          {/* Horizontal floor highlights (Sleek light panels) */}
          <line x1="880" y1="450" x2="1000" y2="450" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
          <line x1="875" y1="510" x2="1005" y2="510" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
          <line x1="868" y1="580" x2="1012" y2="580" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
          <line x1="862" y1="660" x2="1018" y2="660" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />

          {/* Glowing Beacon on Top */}
          <circle cx="940" cy="340" r="12" fill="#FFFFFF" filter="url(#lightBlur)" opacity="0.5" />
          <circle cx="940" cy="340" r="3" fill="#FFFFFF" />
        </motion.g>

        {/* 4. Far Right Block Silhouettes */}
        <g opacity="0.4">
          <rect x="1070" y="550" width="70" height="250" fill="url(#cityBlockGradRight)" rx="3" />
          <rect x="1130" y="590" width="80" height="210" fill="url(#cityBlockGradRight)" rx="2" />
          <rect x="1200" y="510" width="60" height="290" fill="url(#cityBlockGradRight)" rx="4" />
        </g>


        {/* ================= SEA OF CLOUDS LAYERS (At the bottom) ================= */}

        {/* Deep Background Peach Glow Clouds */}
        <g filter="url(#mistBlur)" opacity="0.8">
          <ellipse cx="250" cy="720" rx="350" ry="120" fill="url(#cloudPeachGrad)" />
          <ellipse cx="750" cy="740" rx="400" ry="140" fill="url(#cloudPeachGrad)" />
          <ellipse cx="1200" cy="700" rx="300" ry="100" fill="url(#cloudPeachGrad)" />
        </g>

        {/* Middle Layer Fluffy White/Lavendar Clouds */}
        <g filter="url(#mistBlur)" opacity="0.9">
          <circle cx="100" cy="780" r="180" fill="url(#cloudGrad1)" />
          <circle cx="450" cy="790" r="220" fill="url(#cloudGrad2)" />
          <circle cx="850" cy="800" r="250" fill="url(#cloudGrad1)" />
          <circle cx="1300" cy="770" r="200" fill="url(#cloudGrad2)" />
        </g>

        {/* Frontmost Cloud Banks (crisper but still soft to create absolute 3D depth) */}
        <g filter="url(#mistBlur)" opacity="0.95">
          {/* Overlapping ellipses spanning the bottom */}
          <ellipse cx="-50" cy="840" rx="250" ry="100" fill="#FFFFFF" />
          <ellipse cx="280" cy="850" rx="300" ry="120" fill="#FFFFFF" />
          <ellipse cx="680" cy="860" rx="320" ry="130" fill="#FFFFFF" />
          <ellipse cx="1080" cy="850" rx="280" ry="110" fill="#FFFFFF" />
          <ellipse cx="1490" cy="830" rx="250" ry="100" fill="#FFFFFF" />

          {/* Warm peachy reflections right on the frontmost mist */}
          <ellipse cx="480" cy="865" rx="180" ry="60" fill="url(#cloudPeachGrad)" opacity="0.4" />
          <ellipse cx="980" cy="860" rx="220" ry="70" fill="url(#cloudPeachGrad)" opacity="0.4" />
        </g>

        {/* Extra dynamic mist strands floating horizontally to blend skyscrapers */}
        <g filter="url(#mistBlur)" opacity="0.5">
          <rect x="0" y="660" width="600" height="40" fill="#FFFFFF" rx="20" />
          <rect x="800" y="690" width="640" height="50" fill="#FFFFFF" rx="25" />
          <rect x="500" y="730" width="500" height="35" fill="#FFFFFF" rx="17" />
        </g>
      </svg>
    </div>
  );
};

// Custom Client Logos (Strict representation of the brand logotypes in the reference)
export const ClientLogos = () => {
  const logos = [
    {
      name: "MULTIFACТOR",
      element: (
        <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-800">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span className="font-display font-extrabold text-[11px] tracking-widest text-slate-900 uppercase">
            MULTIFACТOR
          </span>
        </div>
      )
    },
    {
      name: "Freya",
      element: (
        <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <span className="font-sans font-bold text-[14px] text-slate-900 tracking-tight">
            Freya
          </span>
        </div>
      )
    },
    {
      name: "Stroc",
      element: (
        <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-800">
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>
          <span className="font-display font-semibold text-[13px] text-slate-900 tracking-tight">
            Stroc
          </span>
        </div>
      )
    },
    {
      name: "Prism",
      element: (
        <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-800 stroke-[2] fill-none">
            <polygon points="12 2 22 22 2 22" />
          </svg>
          <span className="font-display font-medium text-[13px] text-slate-900 tracking-wider">
            Prism
          </span>
        </div>
      )
    },
    {
      name: "Parallel",
      element: (
        <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-800 stroke-[2] fill-none">
            <line x1="8" y1="4" x2="8" y2="20" />
            <line x1="16" y1="4" x2="16" y2="20" />
          </svg>
          <span className="font-sans font-extrabold text-[12px] text-slate-900 tracking-wide">
            Parallel
          </span>
        </div>
      )
    },
    {
      name: "Partner",
      element: (
        <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all cursor-pointer whitespace-nowrap">
          <span className="font-mono font-bold text-[11px] text-slate-500 uppercase tracking-widest">
            PAR...
          </span>
        </div>
      )
    }
  ];

  // Duplicate the list 4 times to ensure seamless infinite looping on all screens
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden max-w-4xl mx-auto py-4"
      style={{ maskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)" }}
    >
      <motion.div
        className="flex gap-16 items-center w-max"
        animate={{
          x: [0, "-50%"]
        }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="flex-shrink-0">
            {logo.element}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
