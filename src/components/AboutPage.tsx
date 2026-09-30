import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Factory,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Database,
  Cpu,
  Compass,
  Target,
  Lightbulb,
  Award,
  Leaf,
  Globe,
  MapPin,
  Users,
  Linkedin,
  Mail,
  ArrowLeft,
  ArrowRight,
  Star
} from "lucide-react";
import {
  ImagineLogo,
  HeroVideoBackground,
  HeroImageBackground
} from "./Artworks";
import { SpinningGlobe } from "./SpinningGlobe";
import FootprintMap from "./FootprintMap";
import ScrollDownButton from "./ScrollDownButton";

// Beautiful, responsive 3D Isometric Wordmark component for luxury brutalist style
const IsometricWordmark = ({ text, color = "text-slate-800", shadowColor = "text-indigo-500/10" }: { text: string; color?: string; shadowColor?: string }) => {
  return (
    <div className="relative select-none flex items-center justify-center py-6 w-full overflow-hidden sm:overflow-visible">
      {/* Dynamic 3D Isometric container with precise skew and rotation ratios */}
      <div className="transform -rotate-[12deg] sm:-rotate-[15deg] skew-x-[18deg] sm:skew-x-[22deg] scale-y-[0.85] transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1 relative flex items-center justify-center">
        {/* Shadow Layer 4 (Deepest Extrusion) */}
        <span className={`absolute top-[16px] left-[16px] font-sans font-black text-[56px] sm:text-[84px] md:text-[104px] tracking-widest uppercase leading-none opacity-20 ${shadowColor}`}>
          {text}
        </span>
        {/* Shadow Layer 3 */}
        <span className={`absolute top-[12px] left-[12px] font-sans font-black text-[56px] sm:text-[84px] md:text-[104px] tracking-widest uppercase leading-none opacity-40 ${shadowColor}`}>
          {text}
        </span>
        {/* Shadow Layer 2 */}
        <span className={`absolute top-[8px] left-[8px] font-sans font-black text-[56px] sm:text-[84px] md:text-[104px] tracking-widest uppercase leading-none opacity-60 ${shadowColor}`}>
          {text}
        </span>
        {/* Shadow Layer 1 */}
        <span className={`absolute top-[4px] left-[4px] font-sans font-black text-[56px] sm:text-[84px] md:text-[104px] tracking-widest uppercase leading-none opacity-80 ${shadowColor}`}>
          {text}
        </span>
        {/* Front Foreground layer */}
        <span className={`relative font-sans font-black text-[56px] sm:text-[84px] md:text-[104px] tracking-widest uppercase leading-none ${color} drop-shadow-sm`}>
          {text}
        </span>
      </div>
    </div>
  );
};

// Extreme 3D brutalist extruded wordmark matching the reference dark design perfectly
const Brutalist3DWord = ({ text, isLightBackground = true }: { text: string; isLightBackground?: boolean }) => {
  const depth = 20; // Number of layers for thick extrusion
  const layers = Array.from({ length: depth }, (_, i) => i);

  return (
    <div className="relative select-none flex items-center justify-center py-6 sm:py-10 w-full overflow-visible" style={{ perspective: "1000px" }}>
      {/* 3D Scene holding the text with real preserve-3d */}
      <div
        className="relative transition-transform duration-500 hover:scale-[1.04]"
        style={{
          transform: "rotateX(20deg) rotateY(-20deg) rotateZ(-3deg)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Layered rendering for a perfect, continuous, solid 3D extrusion block */}
        {layers.map((layer) => {
          // Precise offsets for solid depth. Each layer is 1px deeper in Z and shifted down-left
          const zOffset = -layer * 1.5;
          const xOffset = -layer * 1.2;
          const yOffset = layer * 1.2;

          const isFront = layer === 0;

          // Outer layers are darker to simulate realistic depth shading
          const opacity = 1 - (layer / depth) * 0.4;
          let colorClass = "";

          if (isFront) {
            colorClass = isLightBackground ? "text-slate-900" : "text-white";
          } else {
            if (isLightBackground) {
              if (layer < 5) colorClass = "text-slate-200";
              else if (layer < 12) colorClass = "text-slate-300";
              else colorClass = "text-slate-400";
            } else {
              if (layer < 5) colorClass = "text-[#3f3f46]";
              else if (layer < 12) colorClass = "text-[#27272a]";
              else colorClass = "text-[#1c1c1e]";
            }
          }

          return (
            <span
              key={layer}
              className={`font-sans font-black text-[44px] sm:text-[68px] md:text-[84px] lg:text-[100px] tracking-[0.06em] uppercase leading-none select-none absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap ${colorClass}`}
              style={{
                transform: `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px)`,
                zIndex: depth - layer,
                opacity: opacity,
                textShadow: layer === depth - 1
                  ? isLightBackground
                    ? "12px 12px 24px rgba(15, 23, 42, 0.12)"
                    : "12px 12px 24px rgba(0,0,0,0.75)"
                  : "none",
              }}
            >
              {text}
            </span>
          );
        })}

        {/* Transparent helper to reserve layout space since actual layers are absolutely positioned */}
        <span className="font-sans font-black text-[44px] sm:text-[68px] md:text-[84px] lg:text-[100px] tracking-[0.06em] uppercase leading-none opacity-0 select-none block whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
};



const SlashedNumber = ({ num, isActive }: { num: string; isActive: boolean }) => {
  return (
    <span
      className={`inline-flex items-center font-display leading-none tracking-tight transition-all duration-300 ${isActive
          ? "text-slate-900 font-bold text-[60px]"
          : "text-slate-300 font-medium text-[24px] sm:text-[30px]"
        }`}
    >
      {num}
    </span>
  );
};



const InteractiveTimelineWheel = ({
  timelineSteps,
  activeTimelineIndex,
  setActiveTimelineIndex
}: {
  timelineSteps: Array<{ year: string; title: string; description: string }>;
  activeTimelineIndex: number;
  setActiveTimelineIndex: (idx: number) => void;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width || 800, height: height || 500 });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const isMobileLayout = dimensions.width < 768;

  // Circle parameters based on active screen size
  let xc = 0;
  let yc = 0;
  let R = 0;
  let getCoords = (index: number) => { return { x: 0, y: 0, theta: 0 }; };

  if (isMobileLayout) {
    const w = dimensions.width;
    xc = w / 2;
    R = Math.min(260, w * 0.75);
    yc = -R + 100; // Position arc centered at top, peaking beautifully

    getCoords = (index: number) => {
      // Angular spacing on mobile
      const angularSpacing = 24; // degrees
      // Center at 90 deg (straight down)
      const thetaDeg = 90 + (index - activeTimelineIndex) * angularSpacing;
      const thetaRad = (thetaDeg * Math.PI) / 180;

      const x = xc + R * Math.cos(thetaRad);
      const y = yc + R * Math.sin(thetaRad);

      return { x, y, theta: thetaDeg - 90 };
    };
  } else {
    // Desktop: Left-side arc curving towards the right
    xc = -220;
    yc = dimensions.height / 2;
    R = 420;

    getCoords = (index: number) => {
      // Angular spacing on desktop
      const angularSpacing = 16; // degrees
      // Center around 0 deg (pointing straight right)
      const thetaDeg = (index - activeTimelineIndex) * angularSpacing;
      const thetaRad = (thetaDeg * Math.PI) / 180;

      const x = xc + R * Math.cos(thetaRad);
      const y = yc + R * Math.sin(thetaRad);

      return { x, y, theta: thetaDeg };
    };
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden transition-all duration-300"
      style={{ height: isMobileLayout ? "480px" : "420px" }}
    >
      {/* Background Subtle Curved Arc Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <circle
          cx={xc}
          cy={yc}
          r={R}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray={isMobileLayout ? "4 4" : "none"}
        />
      </svg>

      {/* Render Steps along the Arc */}
      {timelineSteps.map((step, idx) => {
        const isActive = idx === activeTimelineIndex;
        const { x, y, theta } = getCoords(idx);

        // Adjust text offset based on layout direction
        const offsetX = isMobileLayout ? 0 : 55;
        const offsetY = isMobileLayout ? 48 : 0;

        return (
          <React.Fragment key={step.year}>
            {/* The Dot on the circle line */}
            <motion.div
              className={`absolute rounded-full transition-all duration-300 z-20 cursor-pointer ${isActive
                  ? "w-2.5 h-2.5 bg-slate-900 shadow-[0_0_12px_rgba(15,23,42,0.3)]"
                  : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.3 }}
              onClick={() => setActiveTimelineIndex(idx)}
            />

            {/* The Number label next to/below the dot */}
            <motion.div
              className="absolute cursor-pointer origin-left z-20 flex items-center justify-center"
              style={{
                left: x + offsetX,
                top: y + offsetY,
                x: isMobileLayout ? "-50%" : "0%",
                y: "-50%",
              }}
              animate={{
                rotate: theta,
                scale: isActive ? 1 : 0.8,
                opacity: isActive ? 1 : 0.45,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={() => setActiveTimelineIndex(idx)}
            >
              <SlashedNumber num={step.year} isActive={isActive} />
            </motion.div>
          </React.Fragment>
        );
      })}

      {/* Active Milestone Details Panel */}
      <div
        className={`absolute flex ${isMobileLayout
            ? "left-6 right-6 flex-col items-center gap-5"
            : "left-[380px] sm:left-[420px] md:left-[460px] right-12 top-0 bottom-0 flex-row items-center gap-8"
          }`}
        style={isMobileLayout ? { top: "180px", bottom: "24px" } : undefined}
      >
        {/* Text details */}
        <div className={`flex-1 min-w-0 ${isMobileLayout ? "text-center" : "text-left"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTimelineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col gap-2 ${isMobileLayout ? "items-center" : "items-start"}`}
            >
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {timelineSteps[activeTimelineIndex].title}
              </h3>
              <p className={`font-sans text-[14.5px] text-slate-600 font-light leading-relaxed mt-2 ${isMobileLayout ? "max-w-md" : "max-w-lg"}`}>
                {timelineSteps[activeTimelineIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top/Bottom Navigation Arrow Bar (like testimonials but vertical, now on the right side) */}
        <div className="flex flex-col gap-2.5 shrink-0 justify-center">
          {/* Up Button with gradient border */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTimelineIndex(Math.max(0, activeTimelineIndex - 1))}
            disabled={activeTimelineIndex === 0}
            className={`inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer focus:outline-none transition-all duration-200 ${activeTimelineIndex === 0 ? "opacity-30 pointer-events-none" : ""
              }`}
            aria-label="Previous milestone"
            id="timeline-prev-btn"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all duration-200">
              <ChevronUp className="w-5 h-5" />
            </div>
          </motion.button>

          {/* Down Button with gradient border */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTimelineIndex(Math.min(timelineSteps.length - 1, activeTimelineIndex + 1))}
            disabled={activeTimelineIndex === timelineSteps.length - 1}
            className={`inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer focus:outline-none transition-all duration-200 ${activeTimelineIndex === timelineSteps.length - 1 ? "opacity-30 pointer-events-none" : ""
              }`}
            aria-label="Next milestone"
            id="timeline-next-btn"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all duration-200">
              <ChevronDown className="w-5 h-5" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};



interface AboutPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
  onContactClick: () => void;
}

export default function AboutPage({ onNavigate, onContactClick }: AboutPageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lastHoveredCard, setLastHoveredCard] = useState<number>(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  // Scroll to top on load
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const timelineSteps = [
    {
      year: "2018",
      title: "The Foundation",
      description: "VRM Structures India Pvt. Ltd. was established with a vision to deliver high-quality solar mounting structures and engineering solutions that support the growing renewable energy sector."
    },
    {
      year: "2020",
      title: "Expanding Manufacturing Capabilities",
      description: "Commissioned a dedicated 8,000 sq. ft. manufacturing facility for aluminum rooftop solar mounting structures, strengthening our product portfolio and production capacity."
    },
    {
      year: "2022",
      title: "Advanced Technology & Growth",
      description: "Enhanced manufacturing capabilities through the installation of advanced roll-forming machinery for ground-mount solar projects, enabling in-house production of C and Hat sections. Expanded operational footprint with a 20,000 sq. ft. facility."
    },
    {
      year: "2024",
      title: "Product Diversification & Global Reach",
      description: "Launched in-house manufacturing of FRP walkways and FRP handrail systems, further expanding our renewable energy infrastructure solutions. Marked a significant milestone by commencing exports of solar mounting structures to Middle Eastern markets."
    },
    {
      year: "2025",
      title: "Strategic Expansion & Industry Partnerships",
      description: "Expanded manufacturing operations with an additional 50,000 sq. ft. facility and established a dedicated warehouse in Nellore to strengthen supply chain efficiency."
    },
    {
      year: "2026",
      title: "Powering Solar Growth Worldwide",
      description: "Formed a strategic partnership with Waaree panels for PM Surya Ghar projects, supplying comprehensive Balance of System (BOS) kits nationwide. Achieved a cumulative supply milestone of over 1.5 GW of solar mounting and tracking solutions worldwide."
    }
  ];

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">

      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        {/* PHOTOGRAPHIC HERO BACKGROUND (AUTOMATED COLD ROLL-FORMING MILL) */}
        <HeroImageBackground src="/images/hero-about.jpg" alt="VRM Structures Precision Cold Roll-Forming Mill" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Engineering High-Performance Steel for India's Solar Landscape
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            For over a decade, VRM STRUCTURES has manufactured precision solar mounting frameworks and structural mounting solutions designed to withstand India's harshest wind zones and soil conditions.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="identity" />
        </div>
      </div>

      {/* DETAILED MISSION, HISTORY & MANUFACTURING FLOW SECTION - COMBINED COHESIVELY AS A SINGLE SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-24 sm:pb-32 lg:pb-40 overflow-hidden" id="identity">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <section className="w-full" id="identity-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column: Label */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="pt-2"
              >
                <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                  <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                      Identity & Values
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Title, Description & Bento Grid of Mission, Vision, Values, Goals */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Leading India's{" "}
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <Target size={15} className="stroke-[2.5]" />
                    Solar Structure
                  </span>{" "}
                  Revolution
                </motion.h2>



                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
                >
                  VRM Structures India Pvt. Ltd. is a trusted manufacturer of high-performance solar mounting structures, tracker systems, and renewable energy infrastructure. Leveraging advanced engineering and manufacturing, we deliver durable, wind-resilient solutions for utility-scale, commercial, and industrial solar projects across India and global markets.
                </motion.p>
              </div>

            </div>
          </section>

          {/* Combined Strategic Blueprint Flow - No separating borders or isolated wrapper backgrounds */}
          <div id="operational-pillars-section" className="w-full mt-20 sm:mt-24 lg:mt-32 relative">

            {/* DESKTOP VERSION (lg:block): Complete, jaw-dropping circular flow diagram 1:1 like reference */}
            <div className="hidden lg:block relative w-[960px] h-[760px] mx-auto select-none">

              {/* SVG Background Layer for Curved Ribbons, Connectors & Clockwise Flow Arrows */}
              <svg
                className="absolute left-0 w-full h-[680px] pointer-events-none"
                style={{ top: "60px" }}
                viewBox="0 0 960 680"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Definitions for arrowheads and high-glow radial/linear gradients */}
                <defs>
                  {/* Arrowhead marker */}
                  <marker id="flow-arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="rgba(100,116,139,0.7)" />
                  </marker>

                  {/* High-glow gradients matching coordinates exactly */}
                  <linearGradient id="top-left-grad" x1="280" y1="340" x2="480" y2="140" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="top-right-grad" x1="480" y1="140" x2="680" y2="340" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="bottom-right-grad" x1="680" y1="340" x2="480" y2="540" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="bottom-left-grad" x1="480" y1="540" x2="280" y2="340" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                  </linearGradient>

                  {/* Blur filter for the high-end neon glowing ribbon effect */}
                  <filter id="ribbon-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="24" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Glowing, translucent colored sweeps curving organic bands into the center */}
                {/* Top-Left (Blue) swoosh */}
                <path
                  d="M 280,340 C 370,340 480,250 480,140"
                  fill="none"
                  stroke="url(#top-left-grad)"
                  strokeWidth="72"
                  strokeLinecap="round"
                  opacity="0.35"
                  filter="url(#ribbon-glow)"
                />
                {/* Top-Right (Green) swoosh */}
                <path
                  d="M 480,140 C 480,250 590,340 680,340"
                  fill="none"
                  stroke="url(#top-right-grad)"
                  strokeWidth="72"
                  strokeLinecap="round"
                  opacity="0.35"
                  filter="url(#ribbon-glow)"
                />
                {/* Bottom-Right (Teal) swoosh */}
                <path
                  d="M 680,340 C 590,340 480,430 480,540"
                  fill="none"
                  stroke="url(#bottom-right-grad)"
                  strokeWidth="72"
                  strokeLinecap="round"
                  opacity="0.35"
                  filter="url(#ribbon-glow)"
                />
                {/* Bottom-Left (Purple) swoosh */}
                <path
                  d="M 480,540 C 480,430 370,340 280,340"
                  fill="none"
                  stroke="url(#bottom-left-grad)"
                  strokeWidth="72"
                  strokeLinecap="round"
                  opacity="0.35"
                  filter="url(#ribbon-glow)"
                />

                {/* FOUR SLENDER CLOCKWISE FLOW ARROWS running perfectly along the centers of the arcs */}
                {/* Top -> Right */}
                <path
                  d="M 480,140 C 480,250 590,340 680,340"
                  fill="none"
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  markerEnd="url(#flow-arrowhead)"
                />
                {/* Right -> Bottom */}
                <path
                  d="M 680,340 C 590,340 480,430 480,540"
                  fill="none"
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  markerEnd="url(#flow-arrowhead)"
                />
                {/* Bottom -> Left */}
                <path
                  d="M 480,540 C 480,430 370,340 280,340"
                  fill="none"
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  markerEnd="url(#flow-arrowhead)"
                />
                {/* Left -> Top */}
                <path
                  d="M 280,340 C 370,340 480,250 480,140"
                  fill="none"
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  markerEnd="url(#flow-arrowhead)"
                />
              </svg>

              {/* CENTRAL TEXT NODE - Removed as requested */}

              {/* TOP NODE (12 O'Clock) - Missions */}
              <div className="absolute z-10 text-center w-[400px] flex flex-col items-center" style={{ left: "480px", top: "20px", transform: "translateX(-50%)" }}>
                <span className="text-[15px] font-sans font-bold text-slate-900 tracking-wide">
                  Missions - Engineering Structures That Endure
                </span>
                <p className="font-sans text-slate-600 text-[12px] leading-relaxed mt-1.5 max-w-[320px] font-light">
                  Deliver high-performance solar mounting & tracking systems exceeding standards, driving innovation, supporting the clean energy transition, and fostering customer success through quality and transparency.
                </p>
              </div>
              {/* Top Node Button */}
              <div
                className="absolute z-30 w-[56px] h-[56px] bg-white border border-slate-200/80 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                style={{ left: "480px", top: "200px", transform: "translate(-50%, -50%)" }}
              >
                <Target size={20} className="text-slate-800" />
              </div>

              {/* RIGHT NODE (3 O'Clock) - Visions */}
              <div className="absolute z-30 w-[56px] h-[56px] bg-white border border-slate-200/80 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                style={{ left: "680px", top: "400px", transform: "translate(-50%, -50%)" }}
              >
                <Lightbulb size={20} className="text-slate-800" />
              </div>
              <div className="absolute z-10 text-left w-[320px] flex flex-col" style={{ left: "750px", top: "400px", transform: "translateY(-50%)" }}>
                <span className="text-[15px] font-sans font-bold text-slate-900 tracking-wide">
                  Visions - Envisioning Reliable Solar Infrastructure
                </span>
                <p className="font-sans text-slate-600 text-[12px] leading-relaxed mt-1.5 font-light">
                  To become the most trusted and innovative solar infrastructure manufacturing company, enabling renewable energy growth through advanced engineering, sustainable solutions, and global-quality manufacturing.
                </p>
              </div>

              {/* BOTTOM NODE (6 O'Clock) - Value */}
              <div
                className="absolute z-30 w-[56px] h-[56px] bg-white border border-slate-200/80 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                style={{ left: "480px", top: "600px", transform: "translate(-50%, -50%)" }}
              >
                <Award size={20} className="text-slate-800" />
              </div>
              <div className="absolute z-10 text-center w-[400px] flex flex-col items-center" style={{ left: "480px", top: "665px", transform: "translateX(-50%)" }}>
                <span className="text-[15px] font-sans font-bold text-slate-900 tracking-wide">
                  Value - Built On Quality And Trust
                </span>
                <p className="font-sans text-slate-600 text-[12px] leading-relaxed mt-1.5 max-w-[320px] font-light">
                  Quality-first manufacturing, on-time delivery, engineering-led design, and complete transparency with every client we work with.
                </p>
              </div>

              {/* LEFT NODE (9 O'Clock) - Sustainability */}
              <div className="absolute z-10 text-right w-[280px] flex flex-col" style={{ left: "210px", top: "400px", transform: "translate(-100%, -50%)" }}>
                <span className="text-[15px] font-sans font-bold text-slate-900 tracking-wide">
                  Sustainability - Manufacturing For A Cleaner Future
                </span>
                <p className="font-sans text-slate-600 text-[12px] leading-relaxed mt-1.5 font-light">
                  We manufacture with a focus on material efficiency and structure longevity, supporting India's transition to clean, reliable renewable energy.
                </p>
              </div>
              {/* Left Node Button */}
              <div className="absolute z-30 w-[56px] h-[56px] bg-white border border-slate-200/80 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                style={{ left: "280px", top: "400px", transform: "translate(-50%, -50%)" }}
              >
                <Leaf size={20} className="text-slate-800" />
              </div>

            </div>

            {/* MOBILE VERSION (lg:hidden): Sleek responsive cascade aligned beautifully with clean timeline styling */}
            <div className="lg:hidden flex flex-col gap-12 relative z-20">
              {/* Center connector line for mobile */}
              <div className="absolute left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-600 via-emerald-500 via-teal-500 to-purple-600 opacity-20" />

              {/* Item 1 */}
              <div className="flex gap-6 items-start text-left">
                <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(15,23,42,0.06)] flex-shrink-0 relative z-10">
                  <Target size={20} className="text-slate-800" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-sans font-bold text-slate-900 tracking-wide">
                    Missions - Engineering Structures That Endure
                  </span>
                  <p className="font-sans text-slate-600 text-[13px] leading-relaxed mt-1.5 font-light">
                    Deliver high-performance solar mounting & tracking systems exceeding standards, driving innovation, supporting the clean energy transition, and fostering customer success through quality and transparency.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6 items-start text-left">
                <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(15,23,42,0.06)] flex-shrink-0 relative z-10">
                  <Lightbulb size={20} className="text-slate-800" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-sans font-bold text-slate-900 tracking-wide">
                    Visions - Envisioning Reliable Solar Infrastructure
                  </span>
                  <p className="font-sans text-slate-600 text-[13px] leading-relaxed mt-1.5 font-light">
                    To become the most trusted and innovative solar infrastructure manufacturing company, enabling renewable energy growth through advanced engineering, sustainable solutions, and global-quality manufacturing.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-6 items-start text-left">
                <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(15,23,42,0.06)] flex-shrink-0 relative z-10">
                  <Award size={20} className="text-slate-800" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-sans font-bold text-slate-900 tracking-wide">
                    Value - Built On Quality And Trust
                  </span>
                  <p className="font-sans text-slate-600 text-[13px] leading-relaxed mt-1.5 font-light">
                    Quality-first manufacturing, on-time delivery, engineering-led design, and complete transparency with every client we work with.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-6 items-start text-left">
                <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(15,23,42,0.06)] flex-shrink-0 relative z-10">
                  <Leaf size={20} className="text-slate-800" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-sans font-bold text-slate-900 tracking-wide">
                    Sustainability - Manufacturing For A Cleaner Future
                  </span>
                  <p className="font-sans text-slate-600 text-[13px] leading-relaxed mt-1.5 font-light">
                    We manufacture with a focus on material efficiency and structure longevity, supporting India's transition to clean, reliable renewable energy.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-200/50 relative z-10" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Grid matching Identity & Values style exactly */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16 md:mb-20">
            {/* Left Column: Label */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-2"
            >
              <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                    Why Choose Us
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
              >
                Engineered for{" "}
                <span className="inline-flex items-center gap-1.5 bg-lime-50 text-lime-700 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-lime-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  <Shield size={15} className="stroke-[2.5]" />
                  Strength
                </span>{" "}
                & Built for Performance.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
              >
                We combine raw industrial muscle with advanced design engineering to manufacture India's most reliable solar mounting solutions. Here is why leading EPC contractors and solar developers trust VRM.
              </motion.p>
            </div>
          </div>

          {/* Main Rounded Board Container merged seamlessly with the section */}
          <div className="max-w-4xl mx-auto py-4">

            {/* Desktop 3x3 Grid Layout */}
            <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-4 items-stretch relative">

              {/* Row 1, Col 1: Premium Steel Sourcing (Active Card) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onMouseEnter={() => { setHoveredCard(1); setLastHoveredCard(1); }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`border rounded-[32px] p-8 flex flex-col items-start text-left h-full transition-all duration-300 cursor-pointer ${hoveredCard === 1
                    ? "bg-white border-lime-500/30 shadow-[0_20px_45px_rgba(132,204,22,0.1)] scale-[1.02] -translate-y-1.5"
                    : "bg-white border-transparent shadow-[0_10px_35px_rgba(15,23,42,0.02),0_1px_3px_rgba(0,0,0,0.01)]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 ${hoveredCard === 1 ? "bg-lime-50 border-lime-200 text-lime-600" : "bg-slate-50 border-slate-100/60 text-slate-800"
                  }`}>
                  <Database size={20} className="stroke-[1.75]" />
                </div>
                <h3 className="font-sans text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  Premium Steel <br />Sourcing
                </h3>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  We use high-tensile certified steel (YS 250 / YS 350 / YS 550) conforming to IS 2062, sourced directly from premier Indian steel conglomerates.
                </p>
              </motion.div>

              {/* Row 1, Col 2: Connection Spacer */}
              <div className={`rounded-[28px] h-full w-full min-h-[110px] flex items-center justify-center relative overflow-hidden transition-all duration-500 border ${(hoveredCard === 1 || hoveredCard === 2)
                  ? "bg-slate-50/80 border-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.02)]"
                  : "bg-[#EDF0F4]/30 border-slate-200/40"
                }`} />

              {/* Row 1, Col 3: Optimized Wind Resilience (Active Card) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onMouseEnter={() => { setHoveredCard(2); setLastHoveredCard(2); }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`border rounded-[32px] p-8 flex flex-col items-start text-left h-full transition-all duration-300 cursor-pointer ${hoveredCard === 2
                    ? "bg-white border-lime-500/30 shadow-[0_20px_45px_rgba(132,204,22,0.1)] scale-[1.02] -translate-y-1.5"
                    : "bg-white border-transparent shadow-[0_10px_35px_rgba(15,23,42,0.02),0_1px_3px_rgba(0,0,0,0.01)]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 ${hoveredCard === 2 ? "bg-lime-50 border-lime-200 text-lime-600" : "bg-slate-50 border-slate-100/60 text-slate-800"
                  }`}>
                  <Compass size={20} className="stroke-[1.75]" />
                </div>
                <h3 className="font-sans text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  Optimized Wind <br />Resilience
                </h3>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  Structures are engineered and certified to survive wind loads up to 180 km/h, fully matching IS 875 wind codes and optimized via simulations.
                </p>
              </motion.div>

              {/* Row 2, Col 1: Connection Spacer */}
              <div className={`rounded-[28px] h-full w-full min-h-[110px] flex items-center justify-center relative overflow-hidden transition-all duration-500 border ${(hoveredCard === 1 || hoveredCard === 3)
                  ? "bg-slate-50/80 border-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.02)]"
                  : "bg-[#EDF0F4]/30 border-slate-200/40"
                }`} />

              {/* Row 2, Col 2: Center Circular Interactive Core */}
              <div className="flex items-center justify-center h-full w-full relative">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Outer concentric dashed orbiting circle */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-slate-200/80 animate-[spin_60s_linear_infinite]" />
                  {/* Inner concentric thin solid circle */}
                  <div className="absolute inset-3 rounded-full border border-slate-100" />

                  {/* Static background circle track for the dial pointer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#e2e8f0"
                      strokeWidth="4"
                      className="opacity-60"
                    />
                  </svg>

                  {/* Central Pure White Card Node with CPU symbol */}
                  <div className={`absolute w-16 h-16 rounded-full bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08),0_1px_2px_rgba(0,0,0,0.02)] border flex items-center justify-center z-10 transition-all duration-300 ${hoveredCard !== null
                      ? "border-lime-400/40 scale-110 shadow-[0_0_25px_rgba(132,204,22,0.15)]"
                      : "border-slate-200/50"
                    }`}>
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <Cpu size={20} className={`transition-all duration-500 ${hoveredCard !== null ? "text-lime-600 stroke-[2] rotate-180" : "text-slate-850 stroke-[1.5]"
                        }`} />
                    </div>
                  </div>

                  {/* Glowing Lime/Green SVG Partial Arc wrapping the core - Animates to active quadrant on hover and stays still otherwise! */}
                  <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    animate={{
                      rotate: lastHoveredCard === 1 ? -180 : lastHoveredCard === 2 ? -90 : lastHoveredCard === 3 ? 90 : lastHoveredCard === 4 ? 0 : 0,
                      opacity: hoveredCard !== null ? 1 : 0.65,
                      scale: hoveredCard !== null ? 1.05 : 1
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#84cc16"
                        strokeWidth="5"
                        strokeDasharray="238.76"
                        strokeDashoffset="179"
                        strokeLinecap="round"
                        className={`transition-all duration-300 ${hoveredCard !== null ? "stroke-[#84cc16] stroke-[6]" : "stroke-lime-500/80"
                          }`}
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Row 2, Col 3: Connection Spacer */}
              <div className={`rounded-[28px] h-full w-full min-h-[110px] flex items-center justify-center relative overflow-hidden transition-all duration-500 border ${(hoveredCard === 2 || hoveredCard === 4)
                  ? "bg-slate-50/80 border-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.02)]"
                  : "bg-[#EDF0F4]/30 border-slate-200/40"
                }`} />

              {/* Row 3, Col 1: Superior Corrosion Protection (Active Card) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onMouseEnter={() => { setHoveredCard(3); setLastHoveredCard(3); }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`border rounded-[32px] p-8 flex flex-col items-start text-left h-full transition-all duration-300 cursor-pointer ${hoveredCard === 3
                    ? "bg-white border-lime-500/30 shadow-[0_20px_45px_rgba(132,204,22,0.1)] scale-[1.02] -translate-y-1.5"
                    : "bg-white border-transparent shadow-[0_10px_35px_rgba(15,23,42,0.02),0_1px_3px_rgba(0,0,0,0.01)]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 ${hoveredCard === 3 ? "bg-lime-50 border-lime-200 text-lime-600" : "bg-slate-50 border-slate-100/60 text-slate-800"
                  }`}>
                  <Shield size={20} className="stroke-[1.75]" />
                </div>
                <h3 className="font-sans text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  Superior Corrosion <br />Protection
                </h3>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  Hot-Dip Galvanization conforming to IS 2629 (80-120 microns) and pre-galvanized options ensure a maintenance-free lifespan of over 25 years.
                </p>
              </motion.div>

              {/* Row 3, Col 2: Connection Spacer */}
              <div className={`rounded-[28px] h-full w-full min-h-[110px] flex items-center justify-center relative overflow-hidden transition-all duration-500 border ${(hoveredCard === 3 || hoveredCard === 4)
                  ? "bg-slate-50/80 border-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.02)]"
                  : "bg-[#EDF0F4]/30 border-slate-200/40"
                }`} />

              {/* Row 3, Col 3: 100% In-House Processing (Active Card) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onMouseEnter={() => { setHoveredCard(4); setLastHoveredCard(4); }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`border rounded-[32px] p-8 flex flex-col items-start text-left h-full transition-all duration-300 cursor-pointer ${hoveredCard === 4
                    ? "bg-white border-lime-500/30 shadow-[0_20px_45px_rgba(132,204,22,0.1)] scale-[1.02] -translate-y-1.5"
                    : "bg-white border-transparent shadow-[0_10px_35px_rgba(15,23,42,0.02),0_1px_3px_rgba(0,0,0,0.01)]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 ${hoveredCard === 4 ? "bg-lime-50 border-lime-200 text-lime-600" : "bg-slate-50 border-slate-100/60 text-slate-800"
                  }`}>
                  <Factory size={20} className="stroke-[1.75]" />
                </div>
                <h3 className="font-sans text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  100% In-House <br />Processing
                </h3>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  Zero outsourcing. From slitting and high-speed cold roll-forming to computerized multi-station CNC punching, we control every step for millimeter precision.
                </p>
              </motion.div>

            </div>

            {/* Mobile Layout (Stacked active cards with a central core at the top) */}
            <div className="grid grid-cols-1 gap-6 md:hidden">

              {/* Centered Decorative Core for Mobile */}
              <div className="flex justify-center py-4">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-slate-200 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute w-14 h-14 rounded-full bg-white shadow-md border border-slate-150 flex items-center justify-center z-10">
                    <Cpu size={18} className="text-slate-800" />
                  </div>
                  <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#84cc16"
                      strokeWidth="5"
                      strokeDasharray="238.76"
                      strokeDashoffset="160"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Mobile Card 1 */}
              <div className="bg-white border border-slate-150 rounded-[28px] p-6 shadow-sm text-left">
                <div className="w-10 h-10 rounded-xl border border-slate-200/60 flex items-center justify-center mb-4 text-slate-850 bg-white shadow-sm">
                  <Database size={18} />
                </div>
                <h4 className="font-sans text-base font-bold text-slate-900">Premium Steel Sourcing</h4>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed mt-2">
                  YS 250 / YS 350 / YS 550 steel conforming to IS 2062, sourced directly from premier Indian steel conglomerates.
                </p>
              </div>

              {/* Mobile Card 2 */}
              <div className="bg-white border border-slate-150 rounded-[28px] p-6 shadow-sm text-left">
                <div className="w-10 h-10 rounded-xl border border-slate-200/60 flex items-center justify-center mb-4 text-slate-855 bg-white shadow-sm">
                  <Compass size={18} />
                </div>
                <h4 className="font-sans text-base font-bold text-slate-900">Optimized Wind Resilience</h4>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed mt-2">
                  Engineered and certified for wind loads up to 180 km/h, matching IS 875 wind codes via structure simulations.
                </p>
              </div>

              {/* Mobile Card 3 */}
              <div className="bg-white border border-slate-150 rounded-[28px] p-6 shadow-sm text-left">
                <div className="w-10 h-10 rounded-xl border border-slate-200/60 flex items-center justify-center mb-4 text-slate-850 bg-white shadow-sm">
                  <Shield size={18} />
                </div>
                <h4 className="font-sans text-base font-bold text-slate-900">Superior Corrosion Protection</h4>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed mt-2">
                  Hot-Dip Galvanization conforming to IS 2629 (80-120 microns) and pre-galvanized options ensure 25+ years lifespan.
                </p>
              </div>

              {/* Mobile Card 4 */}
              <div className="bg-white border border-slate-150 rounded-[28px] p-6 shadow-sm text-left">
                <div className="w-10 h-10 rounded-xl border border-slate-200/60 flex items-center justify-center mb-4 text-slate-850 bg-white shadow-sm">
                  <Factory size={18} />
                </div>
                <h4 className="font-sans text-base font-bold text-slate-900">100% In-House Processing</h4>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed mt-2">
                  Zero outsourcing. From slitting to high-speed cold roll-forming and CNC punching, we control every single step.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* New Geographic Presence Section */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden bg-white border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Grid matching Identity & Values, Why Choose Us, and Journey styles exactly */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16 md:mb-20">
            {/* Left Column: Label */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-2"
            >
              <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                    Presence
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
              >
                Trusted Across India.{" "}
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-blue-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  <Globe size={15} className="stroke-[2.5]" />
                  Expanding
                </span>{" "}
                Across the World.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
              >
                As a leading solar structure manufacturer, VRM Structures delivers advanced solar mounting systems, tracker structures, and engineered steel solutions to renewable energy projects across India and international markets. Our growing presence reflects our commitment to quality, innovation, and sustainable infrastructure development.
              </motion.p>
            </div>
          </div>

          <FootprintMap />
        </div>
      </section>

      {/* OUR JOURNEY SO FAR SECTION - ELEGANT CHRONOLOGY */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden bg-white border-b border-slate-200/50" id="journey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Grid matching Identity & Values and Why Choose Us styles exactly */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16 md:mb-20">
            {/* Left Column: Label */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-2"
            >
              <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                    Our History
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title & Narrative Description */}
            <div className="flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
              >
                Milestones{" "}
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  <Award size={15} className="stroke-[2.5]" />
                  Along The Way
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
              >
                From a modest custom fabrication workshop in Chennai to a state-of-the-art automated manufacturing enterprise, our growth has been driven by continuous engineering innovation and a commitment to quality.
              </motion.p>
            </div>
          </div>

          {/* Left Aligned Interactive Wheel Container */}
          <div className="w-full py-4 relative">
            <InteractiveTimelineWheel
              timelineSteps={timelineSteps}
              activeTimelineIndex={activeTimelineIndex}
              setActiveTimelineIndex={setActiveTimelineIndex}
            />
          </div>
        </div>
      </section>

      {/* MEET THE TEAM BEHIND VRM STRUCTURES - 3D CAROUSEL COVERFLOW */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden bg-white border-b border-slate-200/50" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Grid matching other sections exactly */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16 md:mb-20">
            {/* Left Column: Label */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-2"
            >
              <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                    Team
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
              >
                Meet the Team{" "}
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  Behind VRM STRUCTURES
                </span>
                .
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
              >
                Behind every VRM STRUCTURES solution is a dedicated team of engineers, technical specialists, manufacturing experts, and industry professionals committed to delivering excellence.
              </motion.p>
            </div>
          </div>

          {/* 1. FOUNDER & MANAGING DIRECTOR (PHOTOS ALONE) */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap max-w-4xl mx-auto">
              {executiveLeadership.map((leader, idx) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-lg border border-slate-200/80 group w-[260px] xs:w-[280px] sm:w-[310px] md:w-[330px] h-[360px] sm:h-[430px] text-left"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Portrait Image Background */}
                  <div className="absolute inset-0 z-0 bg-slate-900">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Vignette overlay at bottom for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-5" />
                  </div>

                  {/* Card Content: Name and Role Alone */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6 text-white">
                    <h4 className="font-sans font-bold text-white text-base sm:text-lg lg:text-xl drop-shadow-md">
                      {leader.name}
                    </h4>
                    <p className="font-sans text-slate-300 font-light mt-0.5 text-xs sm:text-sm drop-shadow-md">
                      {leader.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2. OPERATIONAL & ENGINEERING TEAM CAROUSEL */}
          <div className="pt-10 border-t border-slate-200/80">
            {/* 3D Carousel container */}
            <div className="w-full flex justify-center py-4 relative overflow-visible">
              <Team3DCarousel />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Executive Leadership data for Founder & Managing Director
const executiveLeadership = [
  {
    id: 1,
    name: "Velmurugan Rathinam",
    role: "Founder",
    bio: "Founded VRM STRUCTURES with a vision to automate solar mounting fabrication. Led the team from a local Chennai workshop to a trusted national brand.",
    image: "/founder.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "VR",
    specialty: "Visionary Leadership",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Our automated manufacturing and precision-engineered structures deliver maximum solar yield for India's largest infrastructure projects.",
    subtitle: "We started with a simple belief that solar structural design could be automated, accurate, and incredibly fast. Today, we deliver nation-wide with unmatched quality."
  },
  {
    id: 2,
    name: "Anjali Velmurugan",
    role: "Managing Director",
    bio: "Drives organizational growth, operational frameworks, and strategic client collaborations, ensuring high standards across all business verticals.",
    image: "/managing_director.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "AV",
    specialty: "Strategic Governance",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Operational efficiency and client satisfaction are the cornerstones of our long-term market leadership.",
    subtitle: "By aligning advanced manufacturing capacity with strong corporate management, we execute utility-scale projects with absolute timelines."
  }
];

// 3D cover flow Carousel data representing the operational team
const teamMembers = [
  {
    id: 3,
    name: "Paramasivam K",
    role: "Chief Financial Officer",
    bio: "Manages financial strategies, investment planning, and budget allocations to ensure sustainable project feasibility and economic scaling.",
    image: "/cfo.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "PK",
    specialty: "Financial Strategy",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Healthy financial frameworks enable us to scale our fabrication output and sustain raw material partnerships.",
    subtitle: "We align financial growth with technological investments, ensuring our manufacturing yards are always equipped with the finest machinery."
  },
  {
    id: 4,
    name: "Ajith R",
    role: "Accounts Manager",
    bio: "Supervises audit operations, client invoicing protocols, and transaction ledgers to maintain complete corporate accountability.",
    image: "/accounts_manager.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "AR",
    specialty: "Corporate Accounting",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Transparent accounting systems ensure seamless collaboration with major energy developers and utility builders.",
    subtitle: "Accuracy is our standard in both metal forming and commercial accounting. We ensure smooth financial workflows on every delivery."
  },
  {
    id: 5,
    name: "Sangeetha S",
    role: "Procurement Manager",
    bio: "Coordinates supply chains, sourcing certified structural steel and raw inputs from top steel conglomerates to ensure absolute consistency.",
    image: "/procurement_manager.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "SS",
    specialty: "Supply Chain",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Securing premium, high-yield certified raw steel is the foundation of our structural performance guarantee.",
    subtitle: "We maintain close alliances with India's primary steel manufacturers to secure premium grades like YS 350 and YS 550 for our fabrication lines."
  },
  {
    id: 6,
    name: "Manoj Raj S",
    role: "Business Development Head",
    bio: "Spearheads sales initiatives, client acquisition strategies, and utility-scale partnerships across both domestic and export markets.",
    image: "/bd_head.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "MR",
    specialty: "Market Expansion",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "We build long-term value partnerships, offering developers custom engineered solutions that optimize site yield.",
    subtitle: "Our client-focused expansion model ensures that solar developers receive structural systems engineered precisely for their regional loads."
  },
  {
    id: 7,
    name: "Karthik R",
    role: "Design Engineer",
    bio: "Engineers custom solar mounting profiles, conducting rigorous wind speed, terrain category, and structural stress CAD simulations.",
    image: "/design_engineer.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "KR",
    specialty: "Structural Design",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "We design structures conforming to IS 875 parameters, achieving high yield strength and material efficiency.",
    subtitle: "By simulating extreme wind dynamics, we optimize purlin dimensions and column thickness, eliminating unnecessary structural weight."
  },
  {
    id: 8,
    name: "Pavithra Ravi",
    role: "Digital Marketing Expert",
    bio: "Coordinates digital strategy, corporate communications, and online brand representation, showcasing VRM's manufacturing milestones.",
    image: "/digital_marketing.png",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "PR",
    specialty: "Brand Communication",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "We leverage digital channels to share our technical insights and showcase our automated manufacturing capabilities.",
    subtitle: "Telling the story of clean energy infrastructure development is key to driving industrial adoption of smart, sustainable mounting configurations."
  },
  {
    id: 9,
    name: "Arun Boopathi M",
    role: "Operational Head",
    bio: "Supervises day-to-day manufacturing workflows, resource optimization, and scheduling to meet demanding delivery timelines.",
    image: "/operational_head.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "AB",
    specialty: "Operations Control",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Ensuring a seamless flow from raw steel receipt to final hot-dip galvanization guarantees project execution speed.",
    subtitle: "We synchronize production shifts with dispatch schedules, ensuring zero down-time and maintaining strict project timelines."
  },
  {
    id: 10,
    name: "Ashok Kumar A",
    role: "Factory Supervisor",
    bio: "Manages assembly floor workflows, safety compliance, and machinery uptime to maintain peak fabrication efficiency.",
    image: "/factory_supervisor.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "AK",
    specialty: "Fabrication Quality",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "A safe, structured factory floor guarantees that every modular component matches precise engineering drawings.",
    subtitle: "We maintain close supervision on punching and cutting lines, keeping mechanical tolerances to under ±0.5 mm for quick site assembly."
  },
  {
    id: 11,
    name: "Jawahirula M",
    role: "Production Manager",
    bio: "Coordinates roll-forming machinery, punching processes, and custom steel profile runs to maintain optimal output capacities.",
    image: "/production_manager.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "JM",
    specialty: "Roll-Forming Tech",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Our high-speed automated lines shape C and Hat profiles with absolute consistency across thousands of tons.",
    subtitle: "We leverage precise PLC controls to ensure uniform cold-roll forming, preventing structural stresses in steel members."
  },
  {
    id: 12,
    name: "Kalpana",
    role: "Dispatch Coordinator",
    bio: "Manages logistics networks, customized project bundling, and freight dispatch schedules for safe, prompt delivery to sites.",
    image: "/dispatch_coordinator.jpg",
    gradient: "from-amber-600/20 to-amber-950/40",
    initials: "K",
    specialty: "Freight Logistics",
    linkedin: "https://linkedin.com",
    email: "mailto:mms@vrmstructures.in",
    quote: "Proper packaging and systematically labeled structural bundles ensure quick, error-free assembly on site.",
    subtitle: "We organize freight dispatches to arrive sequentially at project sites, matching the civil foundation team's progress."
  }
];

const Team3DCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const N = teamMembers.length;
  const leftIdx = (activeIdx - 1 + N) % N;
  const mid1Idx = activeIdx;
  const mid2Idx = (activeIdx + 1) % N;
  const rightIdx = (activeIdx + 2) % N;

  const handlePrev = () => {
    setActiveIdx((activeIdx - 1 + N) % N);
  };

  const handleNext = () => {
    setActiveIdx((activeIdx + 1) % N);
  };

  const visibleIndices = [
    { idx: leftIdx, position: -1 },
    { idx: mid1Idx, position: 0 },
    { idx: mid2Idx, position: 1 },
    { idx: rightIdx, position: 2 }
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center relative select-none px-4 sm:px-6">

      {/* Cards track */}
      <div className="relative w-full flex items-center justify-center gap-3 sm:gap-4 md:gap-6 py-6 overflow-visible min-h-[220px] sm:min-h-[340px] md:min-h-[440px] lg:min-h-[480px]">

        {visibleIndices.map(({ idx, position }) => {
          const member = teamMembers[idx];
          const isActive = position === 0 || position === 1;

          // On mobile, only render the active cards to prevent horizontal cramped overflow
          if (isMobile && !isActive) return null;

          return (
            <motion.div
              key={`${member.id}-${position}`}
              onClick={() => {
                if (position === -1) handlePrev();
                if (position === 2) handleNext();
              }}
              className={`relative cursor-pointer overflow-hidden transition-all duration-500 rounded-[20px] sm:rounded-[28px] md:rounded-[32px] shadow-lg border border-white/10 group ${isActive
                  ? "w-[140px] h-[200px] xs:w-[155px] xs:h-[220px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px] lg:w-[310px] lg:h-[420px] z-20 scale-100"
                  : "hidden sm:block sm:w-[130px] sm:h-[180px] md:w-[180px] md:h-[250px] lg:w-[210px] lg:h-[300px] z-10 scale-95 opacity-50 hover:opacity-80"
                }`}
              whileHover={{ scale: isActive ? 1.02 : 0.97 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Card Portrait Image Background */}
              <div className="absolute inset-0 z-0 bg-[#e2e2e2]">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "grayscale-0" : "grayscale opacity-70"}`}
                  style={{
                    objectPosition: (member.id === 5 || member.id === 6 || member.id === 7 || member.id === 8 || member.id === 9 || member.id === 11) ? "center 5%" : "center"
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* Modern subtle vignette/dark overlay at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-5" />
              </div>

              {/* Card Inner Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-3.5 sm:p-5 md:p-6 lg:p-8 text-white">

                {/* Bottom Row: Info */}
                <div className="z-10">
                  {/* Member Name and Role */}
                  <div>
                    <h4 className={`font-sans font-bold text-white drop-shadow-md ${isActive
                        ? "text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl"
                        : "text-[10px] sm:text-xs md:text-sm"
                      }`}>
                      {member.name}
                    </h4>
                    <p className={`font-sans text-slate-300 font-light mt-0.5 drop-shadow-md ${isActive
                        ? "text-[9px] xs:text-[10px] sm:text-xs md:text-sm"
                        : "text-[8px] sm:text-[10px] md:text-xs"
                      }`}>
                      {member.role}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Floating absolute arrows exactly matching reference design */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-100 hover:bg-slate-50 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Previous team member"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-100 hover:bg-slate-50 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Next team member"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

      </div>

    </div>
  );
};
