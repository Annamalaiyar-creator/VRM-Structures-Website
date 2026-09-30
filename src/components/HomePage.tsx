import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Menu,
  X,
  Plus,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Layers,
  Building,
  Layout,
  Car,
  Wrench,
  Shield,
  Check,
  Volume2,
  Maximize2,
  Gauge,
  MapPin,
  Monitor,
  Rocket,
  BarChart3,
  Search,
  Star,
  FileText,
  Phone,
  Mail,
  Send
} from "lucide-react";
import {
  ImagineLogo,
  CityAboveCloudsBackground
} from "./Artworks";
import Manufacturing from "./Manufacturing";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  num: string;
  icon: any;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
}

function TestimonialCard({ item, idx }: { item: TestimonialItem; idx: number; key?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 320, height: 280 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        setDimensions({
          width: el.offsetWidth,
          height: el.offsetHeight
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width: W, height: H } = dimensions;
  const R = 24;

  const whiteCardPath = `M 10,${10 + R} A ${R},${R} 0 0,1 ${10 + R},10 L ${W - 30 - R},10 A ${R},${R} 0 0,0 ${W - 30},${10 + R} L ${W - 30},${H - 30 - R} A ${R},${R} 0 0,1 ${W - 30 - R},${H - 30} L ${10 + R},${H - 30} A ${R},${R} 0 0,0 10,${H - 30 - R} Z`.replace(/\s+/g, ' ').trim();

  const outlinePath = `M ${W - 30 - R},10 L ${W - 10 - R},10 A ${R},${R} 0 0,1 ${W - 10},${10 + R} L ${W - 10},${H - 10 - R} A ${R},${R} 0 0,1 ${W - 10 - R},${H - 10} L ${10 + R},${H - 10} A ${R},${R} 0 0,1 10,${H - 10 - R} L 10,${H - 30 - R}`.replace(/\s+/g, ' ').trim();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative w-[310px] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-start pt-[30px] pl-[30px] pr-[50px] pb-[50px] min-h-[330px] sm:min-h-[350px] flex flex-col justify-between transition-all duration-350 select-none group"
    >
      {/* Soft color emission underlay from right and bottom */}
      <div
        className="absolute right-[10px] bottom-[10px] w-[150px] h-[150px] rounded-full filter blur-[35px] opacity-[0.18] group-hover:opacity-[0.32] group-hover:scale-110 transition-all duration-350 pointer-events-none -z-20"
        style={{
          background: `radial-gradient(circle, ${item.colorFrom} 0%, ${item.colorTo} 100%)`,
          transform: 'translate(10px, 10px)'
        }}
      />

      {/* 1. Background SVGs */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${W} ${H}`} fill="none">
          <defs>
            <linearGradient id={`frame-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={item.colorFrom} />
              <stop offset="100%" stopColor={item.colorTo} />
            </linearGradient>
            <filter id={`glow-${idx}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="10" dy="10" stdDeviation="14" floodColor={item.colorFrom} floodOpacity="0.22" />
            </filter>
          </defs>

          {/* A. Outer Colored Frame Line */}
          <path
            d={outlinePath}
            stroke={`url(#frame-grad-${idx})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            filter={`url(#glow-${idx})`}
          />

          {/* B. Foreground White Card Shape with cutouts */}
          <path
            d={whiteCardPath}
            fill="#ffffff"
            className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.015)] group-hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.04)] transition-all duration-350"
          />
        </svg>
      </div>

      {/* 2. Content */}
      <div className="flex flex-col justify-between flex-grow text-left relative z-10">
        {/* Top part: Stars, Semicolon, Title, Quote */}
        <div className="flex flex-col">
          {/* Header Row: Stars on left */}
          <div className="flex items-center justify-between mb-4 mt-1">
            {/* 5 Stars glowing yellow */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 stroke-amber-400 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.85)]"
                />
              ))}
            </div>
          </div>

          {/* Company / Title */}
          <h4 className="font-display text-[11px] font-extrabold tracking-[0.15em] text-slate-800 uppercase">
            {item.company}
          </h4>

          {/* Testimonial Quote */}
          <p className="font-sans text-[11.5px] sm:text-[12.5px] leading-relaxed text-slate-500 font-light mt-3.5 pr-1">
            "{item.quote}"
          </p>
        </div>

        {/* Bottom part: Author */}
        <div className="flex justify-between items-end pt-3 mt-4 border-t border-slate-100/60">
          <div className="flex flex-col min-w-0 w-full">
            <span className="font-display text-[13px] font-bold text-slate-900 truncate">
              {item.author}
            </span>
            <span className="font-sans text-[10px] text-slate-400 truncate mt-0.5">
              {item.role}
            </span>
            <span className="font-sans text-[8.5px] text-indigo-500/80 font-bold tracking-wide uppercase mt-0.5 truncate">
              {item.location}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface InsightItem {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  colorFrom: string;
  colorTo: string;
}

function InsightCard({ item, idx }: { item: InsightItem; idx: number; key?: string }) {
  const year = item.date.split(',')[1]?.trim() || "2026";
  const citationText = `${item.author} (${year}). VRM STRUCTURES Insights, ${item.readTime}.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative flex flex-col justify-between p-8 min-h-[380px] rounded-[24px] border border-slate-100 bg-[#FAFAFA] transition-all duration-500 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)] group cursor-pointer overflow-hidden"
    >
      {/* Absolute dark overlay background that fades in on hover to create a seamless transition */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#4A535A] via-[#2B3237] to-[#191D20] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
      />

      {/* Color glow emission from bottom-right */}
      <div
        className="absolute right-[-20px] bottom-[-20px] w-[180px] h-[180px] rounded-full filter blur-[40px] opacity-[0.06] group-hover:opacity-[0.24] group-hover:scale-110 transition-all duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${item.colorFrom} 0%, ${item.colorTo} 100%)`,
        }}
      />

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col text-left">
        {/* Small "More" / Category label pill */}
        <div className="flex items-center">
          <span className="font-sans text-[11px] font-semibold text-emerald-600 bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-emerald-100/50 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-500">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight leading-snug mt-6 group-hover:text-white transition-colors duration-500">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-[13.5px] sm:text-[14px] font-light leading-relaxed text-slate-500 mt-4 line-clamp-4 group-hover:text-slate-200/90 transition-colors duration-500">
          {item.excerpt}
        </p>
      </div>

      {/* Bottom Footer Section (Citation) */}
      <div className="relative z-10 flex items-start gap-2.5 mt-8 pt-4 border-t border-slate-200/40 group-hover:border-white/10 transition-colors duration-500 text-left">
        <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition-colors duration-500" />
        <span className="font-sans text-[11px] text-slate-400 leading-normal group-hover:text-slate-300/85 transition-colors duration-500">
          {citationText}
        </span>
      </div>
    </motion.div>
  );
}

function FAQAccordionItem({ question, answer, idx, isOpen, onToggle }: {
  question: string;
  answer: string;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  key?: React.Key;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      onClick={onToggle}
      className={`relative w-full text-left rounded-[28px] transition-all duration-300 cursor-pointer overflow-hidden p-6 sm:p-8 ${isOpen
        ? "bg-white shadow-[0_20px_40px_rgba(99,102,241,0.08)]"
        : "bg-[#F5F5F7]/80 hover:bg-[#EAEAEF]/90"
        }`}
    >
      {/* Elegant Gradient Border Overlay */}
      <div
        className={`absolute inset-0 rounded-[28px] p-[1.5px] bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 pointer-events-none transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="w-full flex items-center justify-between gap-4 group">
        {/* Left section: Number Badge and Question Text */}
        <div className="flex items-center gap-4">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold select-none flex-shrink-0 transition-colors duration-300 ${isOpen ? "bg-indigo-50 text-indigo-600" : "bg-white text-slate-400 shadow-sm"
            }`}>
            {idx + 1}
          </span>
          <span className={`font-sans text-[15px] sm:text-[17px] font-bold transition-colors duration-300 leading-snug ${isOpen ? "text-slate-900" : "text-slate-850 group-hover:text-indigo-650"
            }`}>
            {question}
          </span>
        </div>

        {/* Right section: Round plus/close button */}
        <div className="flex-shrink-0">
          {isOpen ? (
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-indigo-50/50 active:scale-95">
              <div
                className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 pointer-events-none"
                style={{
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                }}
              />
              <X className="w-4 h-4 stroke-[2]" />
            </div>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pl-12 pr-6 pb-2">
              <p className="font-sans text-[14px] sm:text-[15px] text-slate-500 font-light leading-relaxed max-w-3xl">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export interface HomePageProps {
  onNavigate: (page: "home" | "about" | "services" | "contact" | "careers" | "articles" | "quote" | "products" | "product-details", targetId?: string) => void;
  currentPage?: string;
}

export default function HomePage({ onNavigate, currentPage = "home" }: HomePageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  React.useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="w-full">
      {/* --- SECTION 1: HERO VIEWPORT (Self-contained screen with City Background) --- */}
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">

        {/* 1. REALISTIC BACKGROUND CITYSCAPE ABOVE CLOUDS */}
        <CityAboveCloudsBackground />

        {/* 2. THE FLOATING NAV BAR & HERO FOREGROUND CONTENT CONTAINER */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">

          {/* Navigation Header */}
          <header className="w-full flex justify-between items-center py-6 mt-6 z-20 relative" id="imagine-header">
            {/* Logo */}
            <div onClick={() => onNavigate("home")} className="cursor-pointer select-none">
              <ImagineLogo />
            </div>

            {/* Desktop Links in Center Capsule */}
            <div className="hidden md:flex items-center bg-white/45 backdrop-blur-md border border-white/50 rounded-full px-7 py-2.5 shadow-sm">
              <nav className="flex items-center gap-7 text-[13px] font-semibold text-slate-700">
                {["Home", "About", "Services", "Products", "Articles", "Contact", "Careers"].map((item) => {
                  const isAbout = item === "About";
                  const isHome = item === "Home";
                  const isContact = item === "Contact";
                  const isCareers = item === "Careers";
                  const isArticles = item === "Articles";
                  const isServices = item === "Services";
                  return (
                    <button
                      key={item}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isAbout) {
                          onNavigate("about");
                        } else if (isHome) {
                          onNavigate("home");
                        } else if (isContact) {
                          onNavigate("contact");
                        } else if (isCareers) {
                          onNavigate("careers");
                        } else if (isArticles) {
                          onNavigate("articles");
                        } else if (isServices) {
                          onNavigate("services");
                        } else {
                          onNavigate("home", item.toLowerCase());
                        }
                      }}
                      className={`hover:text-slate-950 transition-colors duration-250 py-1 cursor-pointer font-semibold ${(isAbout && currentPage === "about") || (isContact && currentPage === "contact") || (isHome && currentPage === "home") || (isCareers && currentPage === "careers") || (isArticles && currentPage === "articles") || (isServices && currentPage === "services")
                        ? "text-indigo-600 font-bold"
                        : "text-slate-700"
                        }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Action Button: "Request a Quote" */}
            <div className="hidden md:flex items-center">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("quote")}
                className="bg-white/50 backdrop-blur-md border border-white/60 text-slate-900 text-[12.5px] font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
              >
                Request a Quote
              </motion.button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-slate-800 hover:bg-white/80 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </header>

          {/* Mobile slide-down menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-24 left-4 right-4 z-50 md:hidden bg-white/85 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/60 overflow-hidden"
              >
                <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
                  {["Home", "About", "Services", "Products", "Articles", "Contact", "Careers"].map((item) => {
                    const isAbout = item === "About";
                    const isHome = item === "Home";
                    const isContact = item === "Contact";
                    const isCareers = item === "Careers";
                    const isArticles = item === "Articles";
                    const isServices = item === "Services";
                    return (
                      <button
                        key={item}
                        onClick={() => {
                          if (isAbout) {
                            onNavigate("about");
                          } else if (isHome) {
                            onNavigate("home");
                          } else if (isContact) {
                            onNavigate("contact");
                          } else if (isCareers) {
                            onNavigate("careers");
                          } else if (isArticles) {
                            onNavigate("articles");
                          } else if (isServices) {
                            onNavigate("services");
                          } else {
                            onNavigate("home", item.toLowerCase());
                          }
                          setMobileMenuOpen(false);
                        }}
                        className="py-2.5 border-b border-slate-100 flex items-center justify-between hover:text-slate-950 cursor-pointer text-left w-full"
                      >
                        <span className={((isAbout && currentPage === "about") || (isContact && currentPage === "contact") || (isHome && currentPage === "home") || (isCareers && currentPage === "careers") || (isArticles && currentPage === "articles") || (isServices && currentPage === "services")) ? "text-indigo-600 font-bold" : ""}>{item}</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      onNavigate("quote");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-white/90 border border-white/60 text-slate-900 text-center py-3 rounded-xl font-bold mt-2 hover:bg-white transition-colors shadow-sm"
                  >
                    Request a Quote
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. HERO CONTENT */}
          <main className="flex-1 flex flex-col justify-center items-center py-12 md:py-16 text-center z-10 px-2 sm:px-4">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
              className="font-display text-[30px] leading-[40px] font-bold tracking-tight text-slate-900 max-w-4xl mt-6"
            >
              VRM STRUCTURES INDIA PRIVATE LIMITED is a leading Solar Structure Manufacturer in India
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
              className="font-sans text-slate-600 text-[16px] leading-[26px] max-w-3xl mt-6 font-light px-4"
            >
              High-performance Solar Mounting Systems, Solar Tracker Structures, and clean energy infrastructure solutions trusted by leading solar EPC companies across India.
            </motion.p>

          </main>

          <div className="h-6 w-full" />

        </div>
      </div>

      {/* --- SECTION 2: ABOUT US BENTO SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <section className="w-full" id="about-content">
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
                      About Us
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Title & 4-Card Bento Grid */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Leading Solar Module Mounting Structure{" "}
                  <span className="inline-flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#FFE0B2]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <Sparkles size={15} className="stroke-[2.5]" />
                    Manufacturer
                  </span>{" "}
                  <span className="font-semibold text-slate-400">in</span>{" "}
                  <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#C8E6C9]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current stroke-[2.5] fill-none">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                    India
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
                >
                  VRM STRUCTURES INDIA PRIVATE LIMITED specializes in high-quality Solar MMS solutions engineered for durability, safety, and performance. Our precision-manufactured structures support rooftop, ground-mounted, and utility-scale solar projects with industry-leading quality and reliability.
                </motion.p>

                {/* Bento Grid: 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">

                  {/* Card 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group bg-white/45 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[330px] md:min-h-[360px] hover:shadow-md hover:bg-white/65 hover:border-white/80 transition-all duration-300"
                  >
                    <div className="flex flex-wrap gap-1.5 pt-1 select-none max-w-[240px]">
                      {[
                        "Solar MMS",
                        "Rooftop",
                        "Ground-Mounted",
                        "Utility-Scale",
                        "Monofacial",
                        "Bifacial",
                        "Glass-Glass",
                        "Bespoke"
                      ].map((tag, index) => (
                        <motion.span
                          key={`${tag}-${index}`}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="text-[10px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 shadow-sm border border-slate-100/60 cursor-pointer"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="text-left mt-6">
                      <span className="text-[11px] font-bold tracking-[0.06em] text-slate-400 uppercase block">
                        Solar MMS Solutions
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900 mt-1 block tracking-tight uppercase">
                        VRM STRUCTURES
                      </span>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group bg-[#FF6B35] hover:bg-[#FF7D4C] border border-[#E0531D] rounded-3xl p-6 flex flex-col justify-between min-h-[330px] md:min-h-[360px] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-300" />

                    <div className="text-left relative z-10">
                      <span className="text-[11px] font-bold tracking-[0.06em] text-white/80 uppercase block">
                        Commitment to Quality
                      </span>
                      <span className="text-5xl font-extrabold text-white tracking-tight mt-3 block">
                        100%
                      </span>
                    </div>

                    <p className="text-[13px] font-medium text-white/95 leading-relaxed text-left relative z-10 mt-auto pt-6">
                      Ensuring structural integrity, operational efficiency, and lasting performance for solar projects across India.
                    </p>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="relative overflow-hidden rounded-3xl min-h-[330px] md:min-h-[360px] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-end"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&h=800&q=80"
                      alt="Premium Solar Panels under blue sky"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                    <div className="relative z-10 p-6 text-left">
                      <span className="text-3xl font-extrabold text-white tracking-tight">Strength & Precision</span>
                      <p className="text-[12px] font-normal text-white/90 leading-relaxed mt-2 font-sans">
                        Advanced solar mounting systems engineered to maximize project performance and guarantee long-term reliability.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group bg-white/45 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[330px] md:min-h-[360px] hover:shadow-md hover:bg-white/65 hover:border-white/80 transition-all duration-300"
                  >
                    <div className="text-left">
                      <span className="text-[11px] font-bold tracking-[0.06em] text-slate-400 uppercase block">
                        Compatibility
                      </span>
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3 block leading-none">
                        Decades
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 block mt-1">
                        of Reliable Service
                      </span>
                    </div>

                    <p className="text-[13px] font-semibold text-slate-600 leading-relaxed text-left mt-auto pt-6">
                      Built for long-term performance with corrosion-resistant materials. Supporting monofacial, bifacial, and glass-glass modules.
                    </p>
                  </motion.div>

                </div>

              </div>

            </div>
          </section>

        </div>
      </div>

      {/* --- SECTION 3: PRODUCTS SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <section className="w-full" id="products-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
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
                      Products
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Solar Module{" "}
                  <span className="inline-flex items-center gap-1.5 bg-[#E3F2FD] text-[#1565C0] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#BBDEFB]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <Layers size={15} className="stroke-[2.5]" />
                    Mounting
                  </span>{" "}
                  Structures
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
                >
                  VRM STRUCTURES manufactures hot-dip galvanized and aluminum module mounting structures for solar installations all over the world. Our range covers Metal Roof MMS, RCC Roof MMS, Ground Mounted Solar Structures, Carport MMS, and Customized MMS engineered for unique site requirements. Every structure is built in-house, from steel sourcing to quality-tested Galvanizing, for reliable EPC and rooftop solar projects.
                </motion.p>

              </div>

            </div>
          </section>

        </div>

        {/* Product 3D Curved Cards Container */}
        <div className="w-full mt-12 md:mt-16 overflow-x-auto md:overflow-visible scrollbar-none [perspective:1500px] [transform-style:preserve-3d]">
          <div className="w-full max-w-[1440px] mx-auto flex flex-row overflow-x-auto md:overflow-visible gap-6 md:gap-4 px-6 md:px-12 lg:px-16 pb-16 pt-6 md:pt-16 [transform-style:preserve-3d] scrollbar-none snap-x snap-mandatory justify-start md:justify-center">
            {[
              {
                title: "Metal Roof MMS",
                desc: "Lightweight, corrosion-resistant structures designed specifically for quick, leak-proof installation on trapezoidal or standing-seam metal sheets.",
                icon: <Layers className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-700"
              },
              {
                title: "RCC Roof MMS",
                desc: "Robust flat-roof systems with ballasted foundations or anchor-fastened mounts, delivering exceptional wind resistance without damaging RCC waterproofing.",
                icon: <Building className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-800"
              },
              {
                title: "Ground Mounted Solar Structures",
                desc: "High-tensile hot-dip galvanized steel structures engineered for utility-scale solar farms, open fields, and extreme environmental wind loads.",
                icon: <Layout className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-emerald-600 via-teal-500 to-indigo-950"
              },
              {
                title: "Carport MMS",
                desc: "Premium, architectural dual-use structures that provide durable vehicle shelter while generating clean, high-yield solar electricity.",
                icon: <Car className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-amber-500 via-rose-500 to-purple-700"
              },
              {
                title: "Customized MMS",
                desc: "Tailor-made solar mounting solutions engineered dynamically for complex topographies, specialized angles, and non-standard project geometries.",
                icon: <Wrench className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-800"
              },
              {
                title: "In-House Quality",
                desc: "Every MMS structure is engineered in-house, from premium steel sourcing to quality-tested hot-dip galvanizing, for reliable EPC projects.",
                icon: <Shield className="text-white stroke-[2]" size={32} />,
                bg: "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-900"
              }
            ].map((prod, index) => {
              const rotations = [24, 14, 4, -4, -14, -24];
              const translatesY = [32, 12, 0, 0, 12, 32];
              const translatesZ = [-40, -15, 10, 10, -15, -40];

              const isHovered = hoveredIndex === index;
              const rot = isHovered ? rotations[index] * 0.2 : rotations[index];
              const ty = isHovered ? translatesY[index] - 20 : translatesY[index];
              const tz = isHovered ? translatesZ[index] + 50 : translatesZ[index];
              const scale = isHovered ? 1.06 : 1;

              const cardStyle = isDesktop ? {
                transform: `perspective(1200px) rotateY(${rot}deg) translateY(${ty}px) translateZ(${tz}px) scale(${scale})`,
                transformStyle: "preserve-3d" as const,
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                zIndex: isHovered ? 50 : 10 + index,
              } : {};

              return (
                <div
                  key={prod.title}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={cardStyle}
                  className="flex flex-col items-center snap-center min-w-[240px] max-w-[280px] md:min-w-[140px] lg:min-w-[170px] md:max-w-none md:flex-1 flex-shrink-0 group cursor-pointer"
                >
                  <div className={`w-full aspect-[9/13] rounded-[2.2rem] ${prod.bg} p-6 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] relative overflow-hidden transition-all duration-300 flex items-center justify-center border border-white/20`}>

                    <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                      <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        {prod.icon}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>

                  <div className="text-center mt-6 px-2">
                    <h4 className="font-display text-[15px] lg:text-[16px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                      {prod.title}
                    </h4>
                    <p className="font-sans text-[12px] leading-relaxed text-slate-500 mt-2 font-light line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-12 md:mt-16 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("products")}
            className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_6px_20px_rgba(99,102,241,0.2)] group cursor-pointer focus:outline-none"
          >
            <div className="inline-flex items-center justify-center bg-white hover:bg-slate-50 transition-colors duration-350 px-8 py-3 rounded-full">
              <span className="text-[11px] font-bold tracking-[0.18em] text-slate-900 uppercase flex items-center gap-2">
                Explore More Products
                <ChevronRight size={14} className="text-slate-900 transition-transform duration-350 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* --- SECTION 4: IN-HOUSE MANUFACTURING PROCESS SECTION --- */}
      <Manufacturing />

      {/* --- SECTION 5: STATS SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <section className="w-full" id="stats-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
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
                      Scale & Stats
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Manufacturing{" "}
                  <span className="inline-flex items-center gap-1.5 bg-[#E1F5FE] text-[#0288D1] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#B3E5FC]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <Gauge size={15} className="stroke-[2.5]" />
                    You Can Measure
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                >
                  From capacity to coverage, the numbers behind VRM STRUCTURES reflect years of consistent, in-house solar structure manufacturing trusted by EPCs across South India.
                </motion.p>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
                  {[
                    {
                      title: "Monthly Capacity",
                      subtitle: "Monthly Output • In-House Mill",
                      num: "2000",
                      unit: "MT",
                      bgGradient: "from-[#8E8B99] via-[#9F9192] to-[#B6968B]"
                    },
                    {
                      title: "Projects Supplied",
                      subtitle: "Pan-India • Installation Base",
                      num: "1500",
                      unit: "MW+",
                      bgGradient: "from-[#5A6E72] via-[#6B8487] to-[#8FA295]"
                    },
                    {
                      title: "Active Network",
                      subtitle: "Pan-India • Delivery Speed",
                      num: "14+",
                      unit: "States",
                      bgGradient: "from-[#51536E] via-[#6C5D7B] to-[#8C6D88]"
                    },
                    {
                      title: "Active Countries",
                      subtitle: "Global Reach • Export Presence",
                      num: "3+",
                      unit: "Countries",
                      bgGradient: "from-[#40434F] via-[#5C5F6F] to-[#7E8294]"
                    }
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-[2.2rem] p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/10 overflow-hidden min-h-[210px] sm:min-h-[230px] transition-all duration-300 group`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col text-left">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide leading-tight">
                            {stat.title}
                          </h3>
                          <span className="font-sans text-[10px] sm:text-[11px] font-light text-white/70 mt-1.5 tracking-wide">
                            {stat.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end gap-4 mt-8">
                        <div className="flex items-start text-left leading-none select-none flex-shrink-0">
                          <span className="font-sans text-5xl sm:text-6xl font-extralight text-white tracking-tighter leading-none">
                            {stat.num}
                          </span>
                          <span className="font-sans text-xs sm:text-sm font-light text-white/75 tracking-wider ml-0.5 mt-1">
                            {stat.unit}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --- SECTION 6: TESTIMONIALS SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full" id="testimonials-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
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
                      Testimonials
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col min-w-0">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight"
                  >
                    What Our{" "}
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100/50 shadow-sm">
                      Clients Say
                    </span>
                  </motion.h2>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const container = document.getElementById('testimonials-slider');
                        if (container) {
                          container.scrollBy({ left: -380, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer focus:outline-none"
                      aria-label="Previous testimonial"
                      id="testimonial-prev-btn"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all duration-200">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const container = document.getElementById('testimonials-slider');
                        if (container) {
                          container.scrollBy({ left: 380, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer focus:outline-none"
                      aria-label="Next testimonial"
                      id="testimonial-next-btn"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all duration-200">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </motion.button>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                >
                  Trusted by EPC contractors and solar developers across Tamil Nadu and Kerala for reliable, quality-tested mounting structures.
                </motion.p>
              </div>
            </div>

            <div
              id="testimonials-slider"
              className="flex flex-row overflow-x-auto gap-8 mt-12 w-full pb-8 pt-4 px-2 snap-x snap-mandatory no-scrollbar"
            >
              {[
                {
                  quote: "VRM's hot-dip galvanizing quality is exceptional. Their structure survived heavy coastal winds in Thoothukudi without any rust issues after 3 years. Delivery is always on time.",
                  author: "Ranganathan K.",
                  role: "Director of Operations",
                  company: "PREMIER SOLAR",
                  location: "Chennai, TN",
                  num: "01",
                  icon: Monitor,
                  colorFrom: "#FF5D63",
                  colorTo: "#FF8B91",
                  glowColor: "rgba(255, 93, 99, 0.12)"
                },
                {
                  quote: "We partnered with VRM STRUCTURES for a 12MW utility scale project in Palakkad. Their pre-drilled accuracy and high-tensile steel grade saved us precious installation hours.",
                  author: "Saji Mathew",
                  role: "Chief Engineer",
                  company: "APEX RENEWABLE",
                  location: "Kochi, Kerala",
                  num: "02",
                  icon: Rocket,
                  colorFrom: "#FF8C42",
                  colorTo: "#FFAE7A",
                  glowColor: "rgba(255, 140, 66, 0.12)"
                },
                {
                  quote: "Their design team is highly supportive. When we had complex terrain challenges in Salem, they customized the mounting brackets quickly. High-standard support.",
                  author: "Arun Prasath",
                  role: "Founder & CEO",
                  company: "KOVAI SOLAR",
                  location: "Coimbatore, TN",
                  num: "03",
                  icon: BarChart3,
                  colorFrom: "#4D62E8",
                  colorTo: "#7B8CFF",
                  glowColor: "rgba(77, 98, 232, 0.12)"
                },
                {
                  quote: "Consistency in structural thickness and perfect galvanizing shield. VRM is our go-to partner for all commercial rooftop installations across South India.",
                  author: "Nikhil Joseph",
                  role: "Procurement Head",
                  company: "GREENFIELD SOLAR",
                  location: "Thrissur, Kerala",
                  num: "04",
                  icon: Search,
                  colorFrom: "#8E44AD",
                  colorTo: "#B775E4",
                  glowColor: "rgba(142, 68, 173, 0.12)"
                }
              ].map((item, idx) => (
                <TestimonialCard key={item.author} item={item} idx={idx} />
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300"
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* --- SECTION 7: INSIGHTS & UPDATES SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="insights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full" id="insights-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
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
                      Insights & News
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Insights &{" "}
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <BookOpen size={15} className="stroke-[2.5]" />
                    Updates
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                >
                  Latest articles on solar mounting structures, industry trends, and EPC best practices from the VRM STRUCTURES team.
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
              {[
                {
                  title: "Designing Wind-Resilient Solar Mounting for Coastal South India",
                  category: "Engineering",
                  excerpt: "How coastal terrain and severe wind speeds in regions like Thoothukudi and Kanyakumari dictate structural steel specifications and hot-dip galvanizing standards.",
                  date: "July 10, 2026",
                  readTime: "5 min read",
                  author: "Er. S. Kathirvel",
                  colorFrom: "#FF5D63",
                  colorTo: "#FF8B91"
                },
                {
                  title: "Why Pre-Drilled MMS Saves Up to 35% on Site Installation Time",
                  category: "Best Practices",
                  excerpt: "A detailed study of how precise CNC factory drilling and standardized modular purlins reduce labor costs and eliminate drilling errors on utility-scale projects in Palakkad.",
                  date: "June 28, 2026",
                  readTime: "4 min read",
                  author: "Rajesh Kumar",
                  colorFrom: "#FF8C42",
                  colorTo: "#FFAE7A"
                },
                {
                  title: "Navigating Hot-Dip Galvanizing Standards (IS 2629 / ISO 1461)",
                  category: "Quality Control",
                  excerpt: "Understanding the chemical composition of raw steel and how the perfect molten zinc bath thickness ensures a 25+ year lifespan for ground-mounted solar structures.",
                  date: "June 15, 2026",
                  readTime: "6 min read",
                  author: "Dr. M. Nair",
                  colorFrom: "#4D62E8",
                  colorTo: "#7B8CFF"
                }
              ].map((item, idx) => (
                <InsightCard key={item.title} item={item} idx={idx} />
              ))}
            </div>

          </section>
        </div>
      </div>

      {/* --- SECTION 8: FAQ SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full" id="faq-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="pt-2"
              >
                <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                  <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                      Support & Help
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Frequently Asked{" "}
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <HelpCircle size={15} className="stroke-[2.5]" />
                    Questions
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                >
                  Common questions about our solar mounting structures, manufacturing process, and ordering answered by the VRM STRUCTURES team.
                </motion.p>

                {/* FAQ Accordion List */}
                <div className="mt-12 max-w-4xl flex flex-col gap-4">
                  {[
                    {
                      question: "What grade of steel does VRM STRUCTURES use for solar mounting structures?",
                      answer: "We primarily use High-Strength Galvanized Steel (YS 250 / YS 350 / YS 550) conforming to IS 2062 and pre-galvanized sheet steel conforming to IS 277. For utility-scale projects, we also provide Hot-Dip Galvanized (HDG) mild steel structure variants with zinc coatings conforming to IS 2629 / ISO 1461."
                    },
                    {
                      question: "Do you provide custom engineering drawings and structure design reports?",
                      answer: "Yes, absolutely. Our internal design and engineering team performs full Wind Speed Analysis (up to 200 km/h conforming to IS 875 Part 3), Staad Pro structural simulation calculations, and optimizes custom profile dimensions based on local site conditions, soil reports, and panel dimension details."
                    },
                    {
                      question: "What is the typical lifespan and corrosion-resistance of your mounting structures?",
                      answer: "All our structures are designed for a 25-year service life. Our Hot-Dip Galvanized structures have a standard zinc coating thickness ranging between 80 to 120 microns, offering phenomenal resistance against atmospheric corrosion even in high-humidity coastal zones of India."
                    },
                    {
                      question: "How does pre-drilled MMS help save on-site installation time?",
                      answer: "Traditional structures require active welding and on-site drilling, which damages protective zinc layers and delays execution. VRM STRUCTURES supplies 100% pre-fabricated, factory pre-drilled, and modularly designed purlins, rafters, and columns, reducing on-site mounting labor by up to 35%."
                    },
                    {
                      question: "What is your manufacturing capacity and standard delivery lead time?",
                      answer: "Operating advanced high-speed CNC roll forming machines and automatic punching lines, our factory capacity exceeds 50 MW of solar mounting structures per month. Standard delivery lead times range from 10 to 15 days from design finalization, depending on project scale and specifications."
                    }
                  ].map((item, idx) => (
                    <FAQAccordionItem
                      key={idx}
                      question={item.question}
                      answer={item.answer}
                      idx={idx}
                      isOpen={openFaqIndex === idx}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    />
                  ))}
                </div>

                <div className="mt-12 flex justify-center w-full max-w-4xl">
                  <motion.button
                    onClick={() => onNavigate("contact")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_6px_20px_rgba(99,102,241,0.2)] group cursor-pointer focus:outline-none"
                  >
                    <div className="inline-flex items-center justify-center bg-white hover:bg-slate-50 transition-colors duration-350 px-8 py-3 rounded-full w-full h-full">
                      <span className="text-[11px] font-bold tracking-[0.18em] text-slate-900 uppercase flex items-center gap-2">
                        Contact Us
                        <ChevronRight size={14} className="text-slate-900 transition-transform duration-350 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.button>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --- SECTION 9: FIND US SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full" id="find-us-content">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column */}
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
                      Contact & Offices
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Find{" "}
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <MapPin size={15} className="stroke-[2.5]" />
                    Us
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                >
                  Visit our manufacturing facility or connect with our team proudly serving EPCs and solar developers across The World.
                </motion.p>
              </div>
            </div>

            <div className="mt-12 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-[48px] p-8 sm:p-10 md:p-12 border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row-reverse gap-10 md:gap-12 w-full max-w-7xl items-stretch"
              >
                <div className="w-full md:w-[50%] shrink-0 relative aspect-[4/3] md:aspect-auto md:min-h-[420px] rounded-[36px] overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                    alt="Coimbatore Manufacturing Facility"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 text-left">
                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">Coimbatore Facility</h3>
                      <p className="font-sans text-sm text-slate-300 font-light mt-1">Sathy Main Road, Tamil Nadu</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=VRM+Structures+Kurumbapalayam+Coimbatore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2E2E2C] hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer select-none border border-white/5 shadow-md"
                    >
                      Directions
                    </a>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between gap-8 text-left py-2">
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md self-start mb-4">
                      Fabrication Hub
                    </span>
                    <h4 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Coimbatore HQ & Yard</h4>
                    <p className="font-sans text-base text-slate-500 font-light mt-3 leading-relaxed">
                      SF No. 248/1A, Sathy Main Road, Kurumbapalayam, Coimbatore, Tamil Nadu, India - 641107
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100" />

                  <div className="flex items-center justify-between gap-6 text-left">
                    <div className="flex-grow grid grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="font-sans text-base sm:text-lg font-bold text-slate-800 leading-none">Coimbatore</span>
                        <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-2.5">HQ Location</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-base sm:text-lg font-bold text-slate-800 leading-none">50+ MW</span>
                        <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-2.5">Monthly Cap</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-base sm:text-lg font-bold text-slate-800 leading-none">2.5 Acres</span>
                        <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-2.5">Yard Area</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-[#F5F5F7]/80 border border-slate-100 rounded-[28px] flex items-center justify-center p-3.5">
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <path
                          d="M 30,55 C 30,35 45,30 55,45 C 65,60 75,40 80,50 C 85,60 75,75 55,75 C 35,75 30,75 30,55 Z"
                          stroke="#1e293b"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="30" cy="55" r="3.5" fill="#1e293b" />
                        <circle cx="55" cy="75" r="4.5" fill="#6366f1" />
                        <circle cx="55" cy="75" r="8" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" style={{ transformOrigin: '55px 75px' }} />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 border-t border-slate-100 text-xs sm:text-[13px] text-slate-500 font-light justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-300" />
                      <a href="tel:+919443218915" className="hover:text-indigo-600 font-normal transition-colors">+91 94432 18915</a>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-300" />
                      <a href="tel:+919842241107" className="hover:text-indigo-600 font-normal transition-colors">+91 98422 41107</a>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail size={13} className="text-slate-300" />
                      <a href="mailto:info@vrmstructures.in" className="hover:text-indigo-600 transition-colors">info@vrmstructures.in</a>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}