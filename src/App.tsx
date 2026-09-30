import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Menu,
  X,
  Plus,
  ArrowRight,
  Calendar,
  BookOpen,
  Tag,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  Clock,
  Lightbulb,
  Layers,
  Building,
  Layout,
  Car,
  Wrench,
  Shield,
  Flame,
  Truck,
  Settings,
  Check,
  Activity,
  Volume2,
  VolumeX,
  Maximize2,
  Gauge,
  MapPin,
  TrendingUp,
  Award,
  Zap,
  Home,
  Compass,
  Box,
  Droplets,
  Target,
  Cpu,
  Monitor,
  Rocket,
  BarChart3,
  Search,
  Star,
  FileText,
  Factory,
  Phone,
  Mail,
  Send,
  Globe,
  User,
  Sun
} from "lucide-react";
import {
  ImagineLogo,
  YCBadge,
  CityAboveCloudsBackground,
  ClientLogos,
  HeroVideoBackground
} from "./components/Artworks";
import AboutPage from "./components/AboutPage";
import Product3DViewer from "./components/Product3DViewer";
import ContactPage from "./components/ContactPage";
import CareersPage from "./components/CareersPage";
import ArticlesPage from "./components/ArticlesPage";
import QuotePage from "./components/QuotePage";
import ProductsPage from "./components/ProductsPage";
import ServicesPage from "./components/ServicesPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import DownloadsPage from "./components/DownloadsPage";
import { DOWNLOADS_DATA } from "./components/DatasheetDetailPage";
import LoginPage from "./components/LoginPage";
import FloatingSocialButtons from "./components/FloatingSocialButtons";
import ScrollDownButton from "./components/ScrollDownButton";
import SEO from "./components/SEO";
import NotFoundPage from "./components/NotFoundPage";
import Manufacturing from "./components/Manufacturing";

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

function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = React.useState(1);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const startVal = 1;
          const endVal = value;

          const animateStep = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startVal + (endVal - startVal) * easeProgress);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateStep);
            } else {
              setCount(endVal);
            }
          };

          requestAnimationFrame(animateStep);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef}>{count}</span>;
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

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: idx * 0.04 }}
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
  id?: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  colorFrom: string;
  colorTo: string;
}

function InsightCard({ item, idx, onClick }: { item: InsightItem; idx: number; onClick?: () => void; key?: string }) {
  // Extract year from date or default to 2026
  const year = item.date.split(',')[1]?.trim() || "2026";
  const citationText = item.author;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: idx * 0.04 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
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
      transition={{ duration: 0.2, delay: idx * 0.08 }}
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
              {/* Circular Gradient Border */}
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
            {/* Indented reply matching the start of the question text (align with gap + width) */}
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

function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("EPC Contractor");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_30px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between"
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-left h-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-indigo-600 font-bold">Quick Contact</span>
              <h3 className="font-sans text-lg font-bold text-slate-900 mt-1">Send a Message</h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">We respond within 2 business hours.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="inquiry-name" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">Your Name *</label>
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ranganathan"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="inquiry-email" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">Work Email *</label>
                <input
                  id="inquiry-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-slate-50/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="inquiry-org" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">Organization</label>
                <input
                  id="inquiry-org"
                  name="organization"
                  autoComplete="organization"
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="e.g. Premier Solar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">Your Role</label>
              <div className="grid grid-cols-3 gap-2">
                {["EPC Contractor", "Solar Developer", "Other"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRole(item)}
                    className={`py-2 text-[11px] font-sans font-medium rounded-lg text-center transition-all duration-250 border select-none cursor-pointer ${role === item
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-grow">
              <label htmlFor="inquiry-message" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">Message *</label>
              <textarea
                id="inquiry-message"
                name="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your structure requirements or project size..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-slate-50/50 resize-none flex-grow"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex p-[1.5px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.15)] group cursor-pointer focus:outline-none select-none"
            >
              <div className="w-full inline-flex items-center justify-center bg-[#111] hover:bg-[#1e1e1e] active:scale-[0.99] transition-all duration-200 py-3 rounded-xl">
                <span className="text-[11px] font-bold tracking-[0.18em] text-white uppercase flex items-center gap-2">
                  {loading ? "Sending..." : "Submit Inquiry"}
                  {!loading && <Send size={12} className="text-indigo-300 transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                </span>
              </div>
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center py-12 px-4 h-full"
          >
            {/* Beautiful glowing success icon with outer rotating gradient ring */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 animate-spin-slow" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                <Check className="w-8 h-8 text-indigo-600 stroke-[3]" />
              </div>
            </div>

            <h3 className="font-sans text-xl font-bold text-slate-900">Inquiry Received!</h3>
            <p className="font-sans text-[13.5px] text-slate-500 mt-3 leading-relaxed max-w-xs font-light">
              Thank you, <span className="font-bold text-slate-800">{name}</span>. Our engineering & sales support desk has received your details and will connect with you via email at <span className="font-medium text-slate-800">{email}</span> within 2 hours.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setName("");
                setEmail("");
                setOrg("");
                setMessage("");
                setRole("EPC Contractor");
                setSubmitted(false);
              }}
              className="mt-8 px-6 py-2.5 bg-slate-950 text-white rounded-xl font-sans text-xs font-bold tracking-wider uppercase hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact" | "careers" | "articles" | "downloads" | "login" | "quote" | "products" | "services" | "product-details" | "not-found">("home");
  const [selectedProductTitle, setSelectedProductTitle] = useState("Metal Roof MMS");
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mountingDropdownOpen, setMountingDropdownOpen] = useState(false);
  const [aluminumDropdownOpen, setAluminumDropdownOpen] = useState(false);
  const [bosDropdownOpen, setBosDropdownOpen] = useState(false);
  const [downloadsDropdownOpen, setDownloadsDropdownOpen] = useState(false);
  const [solarPanelsDropdownOpen, setSolarPanelsDropdownOpen] = useState(false);
  const [invertersDropdownOpen, setInvertersDropdownOpen] = useState(false);
  const [brochuresDropdownOpen, setBrochuresDropdownOpen] = useState(false);

  const [mobileDownloadsOpen, setMobileDownloadsOpen] = useState(false);
  const [mobileSolarPanelsOpen, setMobileSolarPanelsOpen] = useState(false);
  const [mobileInvertersOpen, setMobileInvertersOpen] = useState(false);
  const [mobileBrochuresOpen, setMobileBrochuresOpen] = useState(false);

  // Products filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All Materials");
  const [selectedThickness, setSelectedThickness] = useState<string>("All Thicknesses");
  const [activeDropdown, setActiveDropdown] = useState<"category" | "material" | "thickness" | null>(null);

  const updateDocumentTitle = (page: string, hash: string) => {
    const titles: Record<string, string> = {
      home: "VRM Structures India Private Limited | Solar Mounting Structure (MMS) Manufacturer",
      about: "About Us | VRM Structures - Leading Solar PV MMS Manufacturer",
      contact: "Contact Us | VRM Structures India Private Limited",
      careers: "Careers & Openings | VRM Structures India Private Limited",
      articles: "Solar Insights & Articles | VRM Structures",
      downloads: "Product Brochures & Catalog Downloads | VRM Structures",
      login: "Admin Portal | VRM Structures",
      quote: "Get a Custom Quote | VRM Structures India Private Limited",
      products: "Solar Mounting Products & Solutions | VRM Structures",
      services: "EPC, Design, Testing & Galvanizing Services | VRM Structures",
      "product-details": "Product Specifications & Details | VRM Structures",
    };

    let title = titles[page] || "VRM Structures India Private Limited";

    if (page === "downloads" && hash.startsWith("downloads/")) {
      const id = hash.replace("downloads/", "");
      const item = DOWNLOADS_DATA.find(d => d.id === id);
      if (item) {
        title = item.seoTitle || `${item.title} | VRM Structures`;
      }
    } else if (page === "articles" && hash.startsWith("articles/")) {
      const id = hash.replace("articles/", "");
      const stored = localStorage.getItem("vrm_articles_data");
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const article = list.find((a: any) => a.id === id);
          if (article) {
            title = `${article.title} | VRM Structures`;
          }
        } catch (e) {
          // ignore
        }
      }
    } else if (page === "product-details" && hash.startsWith("product-details/")) {
      const pTitle = hash.replace("product-details/", "");
      if (pTitle) {
        title = `${decodeURIComponent(pTitle)} Specifications & Details | VRM Structures`;
      }
    }

    document.title = title;
  };

  const navigateTo = (page: "home" | "about" | "contact" | "careers" | "articles" | "downloads" | "login" | "quote" | "products" | "services" | "product-details" | "not-found", targetId?: string) => {
    // Only update hash if not already matching to avoid history loop
    const targetHash = page === "articles"
      ? (targetId ? `articles/${targetId}` : "articles")
      : page === "product-details"
        ? (targetId ? `product-details/${encodeURIComponent(targetId)}` : "product-details")
        : page === "downloads" && targetId
          ? `downloads?category=${targetId}`
          : page;
    if (window.location.hash.replace("#", "") !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentPage(page);
    updateDocumentTitle(page, targetHash);
    if (page === "product-details" && targetId) {
      setSelectedProductTitle(targetId);
    }
    setMobileMenuOpen(false);

    // Smooth scroll handling with rendering delay
    setTimeout(() => {
      if (targetId && page !== "product-details" && page !== "articles") {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isInsideManufacturing, setIsInsideManufacturing] = useState(false);

  React.useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const mfgVideo = document.getElementById("manufacturing-video");
      if (mfgVideo) {
        const rect = mfgVideo.getBoundingClientRect();
        const isInside = rect.top <= 80 && rect.bottom >= 80;
        setIsInsideManufacturing(isInside);
      } else {
        setIsInsideManufacturing(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        setCurrentPage("home");
        updateDocumentTitle("home", "");
        return;
      }

      if (hash.startsWith("articles")) {
        setCurrentPage("articles");
        updateDocumentTitle("articles", hash);
        return;
      }

      if (hash.startsWith("careers")) {
        setCurrentPage("careers");
        updateDocumentTitle("careers", hash);
        return;
      }

      if (hash.startsWith("downloads")) {
        setCurrentPage("downloads");
        updateDocumentTitle("downloads", hash);
        return;
      }

      if (hash.startsWith("product-details")) {
        setCurrentPage("product-details");
        const title = hash.replace("product-details/", "");
        if (title && title !== "product-details") {
          setSelectedProductTitle(decodeURIComponent(title));
        }
        updateDocumentTitle("product-details", hash);
        return;
      }

      if (hash.startsWith("login") || hash.startsWith("admin")) {
        setCurrentPage("login");
        updateDocumentTitle("login", hash);
        return;
      }

      const validPages = ["home", "about", "contact", "careers", "downloads", "login", "quote", "products", "services", "product-details"];
      const page = hash.split("?")[0];
      if (validPages.includes(page)) {
        setCurrentPage(page as any);
        updateDocumentTitle(page, hash);
      } else {
        setCurrentPage("not-found");
        updateDocumentTitle("not-found", hash);
      }
    };

    // Initialize state from hash if present on mount
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      let initialPage: any = "home";
      if (initialHash.startsWith("articles")) {
        initialPage = "articles";
      } else if (initialHash.startsWith("careers")) {
        initialPage = "careers";
      } else if (initialHash.startsWith("downloads")) {
        initialPage = "downloads";
      } else if (initialHash.startsWith("product-details")) {
        initialPage = "product-details";
        const title = initialHash.replace("product-details/", "");
        if (title && title !== "product-details") {
          setSelectedProductTitle(decodeURIComponent(title));
        }
      } else if (initialHash.startsWith("login") || initialHash.startsWith("admin")) {
        initialPage = "login";
      } else {
        const page = initialHash.split("?")[0];
        const validPages = ["home", "about", "contact", "careers", "downloads", "login", "quote", "products", "services", "product-details"];
        if (validPages.includes(page)) {
          initialPage = page;
        } else {
          initialPage = "not-found";
        }
      }
      setCurrentPage(initialPage);
      updateDocumentTitle(initialPage, initialHash);
    } else {
      window.location.hash = "home";
      updateDocumentTitle("home", "");
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Define dynamic SEO metadata based on active currentPage
  const getPageSEOMetadata = () => {
    switch (currentPage) {
      case "home":
        return {
          title: "Solar Mounting Structure (MMS) Manufacturer",
          description: "VRM Structures India Private Limited is a leading manufacturer of high-quality hot-dip galvanized & aluminum solar mounting structures (MMS) for commercial, residential, and utility-scale projects.",
          canonicalUrl: "https://vrmstructures.in/#home",
        };
      case "about":
        return {
          title: "About Us | Solar MMS Manufacturer in Chennai",
          description: "Learn more about VRM Structures India Private Limited, our high-standard in-house solar structure fabrication, hot-dip galvanizing plant, and our commitment to quality Renewables infrastructure.",
          canonicalUrl: "https://vrmstructures.in/#about",
        };
      case "products":
        return {
          title: "Solar Mounting Structures & Solutions Catalog",
          description: "Browse our solar structure catalog: RCC Roof MMS, Ground Mounted Solar Structures, Carport MMS, Solar Pump MMS, FRP Walkway, FRP Handrails, and Solar BOS Kits.",
          canonicalUrl: "https://vrmstructures.in/#products",
        };
      case "services":
        return {
          title: "In-House Manufacturing & Hot-Dip Galvanizing Services",
          description: "We provide high-capacity in-house cold roll forming, advanced engineering design, custom solar mounting solutions fabrication, and premium hot-dip galvanizing services.",
          canonicalUrl: "https://vrmstructures.in/#services",
        };
      case "contact":
        return {
          title: "Contact Us | Chennai Office & Manufacturing Plant",
          description: "Get in touch with the VRM Structures sales and technical team. Contact details, corporate office location in Chennai, and factory address.",
          canonicalUrl: "https://vrmstructures.in/#contact",
        };
      case "careers":
        return {
          title: "Careers | Join Our Solar Structure Engineering Team",
          description: "Explore career opportunities at VRM Structures. Join us in manufacturing high-durability solar mounting structures and building clean energy solutions.",
          canonicalUrl: "https://vrmstructures.in/#careers",
        };
      case "articles":
        if (window.location.hash.startsWith("#articles/")) return null;
        return {
          title: "Solar Engineering Articles & Industry Insights",
          description: "Read our technical articles and blogs on solar module mounting structures design, hot-dip galvanizing standards, wind load compliance, and solar rooftop safety guidelines.",
          canonicalUrl: "https://vrmstructures.in/#articles",
        };
      case "quote":
        return {
          title: "Interactive 3D Quote Builder | Customized MMS Cost",
          description: "Configure your solar mounting structure online with our interactive 3D quote builder and request customized engineering drawing quotes directly.",
          canonicalUrl: "https://vrmstructures.in/#quote",
        };
      case "downloads":
        if (window.location.hash.startsWith("#downloads/")) return null;
        return {
          title: "Downloads | Technical Datasheets & Product Catalogs",
          description: "Download official technical datasheets, CAD layouts, and product catalogs for all VRM solar mounting structures and safety walkways.",
          canonicalUrl: "https://vrmstructures.in/#downloads",
        };
      case "login":
        return {
          title: "Admin Portal & Login",
          description: "Administrative login portal for VRM Structures team members to manage jobs, requests, and articles.",
          canonicalUrl: "https://vrmstructures.in/#login",
        };
      case "not-found":
        return {
          title: "Page Not Found | 404 Error",
          description: "The requested page was not found on VRM Structures. Navigate back to explore our solar mounting solutions.",
          canonicalUrl: "https://vrmstructures.in/404",
        };
      default:
        return null;
    }
  };

  const seoData = getPageSEOMetadata();

  return (
    <div className="bg-[#F5F1EE] overflow-x-clip font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">
      {seoData && (
        <SEO
          title={seoData.title}
          description={seoData.description}
          canonicalUrl={seoData.canonicalUrl}
        />
      )}

      {/* GLOBAL FIXED NAVBAR FOR ALL PAGES */}
      {currentPage !== "login" && (
        <div className={`fixed top-3 sm:top-5 left-0 right-0 z-50 w-full pointer-events-none transition-all duration-500 ease-in-out ${
          isInsideManufacturing ? "-translate-y-28 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <header className="w-full flex justify-between items-center z-20 relative pointer-events-auto bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] rounded-full px-6 py-2.5 border border-slate-100/80 transition-all duration-300" id="imagine-header">

              {/* Brand Logo */}
              <div
                onClick={() => navigateTo("home")}
                className="cursor-pointer select-none flex items-center"
              >
                <ImagineLogo />
              </div>

              {/* Desktop Links Container */}
              <div className="hidden md:flex items-center transition-all duration-300 border-none bg-transparent shadow-none">
                <nav className="flex items-center gap-5 lg:gap-7 text-[12px] font-bold text-slate-700">
                  {["Home", "About", "Services", "Products", "Articles", "Downloads", "Contact", "Careers"].map((item) => {
                    const isCurrent = currentPage === item.toLowerCase();
                    if (item === "Products") {
                      return (
                        <div
                          key={item}
                          className="relative"
                          onMouseEnter={() => setProductsDropdownOpen(true)}
                          onMouseLeave={() => setProductsDropdownOpen(false)}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo("products");
                            }}
                            className={`hover:text-slate-950 transition-colors duration-250 py-1 cursor-pointer font-semibold flex items-center gap-1 ${isCurrent
                              ? "text-indigo-600 font-bold"
                              : "text-slate-700"
                              }`}
                          >
                            {item}
                            <ChevronDown size={14} className={`transition-transform duration-250 ${productsDropdownOpen ? "rotate-180" : ""}`} />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {productsDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                              >
                                {[
                                  "Mounting Structures",
                                  "Aluminum & FRP Solutions",
                                  "BOS Solutions"
                                ].map((subItem) => {
                                  if (subItem === "Mounting Structures") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => setMountingDropdownOpen(true)}
                                        onMouseLeave={() => setMountingDropdownOpen(false)}
                                      >
                                        <div
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {mountingDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-48 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                                            >
                                              {[
                                                "RCC Roof MMS",
                                                "Customized MMS",
                                                "Ground Mounted MMS",
                                                "Solar Pump MMS",
                                                "Carport MMS"
                                              ].map((productName) => (
                                                <button
                                                  key={productName}
                                                  onClick={() => {
                                                    setMountingDropdownOpen(false);
                                                    setProductsDropdownOpen(false);
                                                    navigateTo("product-details", productName);
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                                >
                                                  {productName}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }

                                  if (subItem === "Aluminum & FRP Solutions") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => setAluminumDropdownOpen(true)}
                                        onMouseLeave={() => setAluminumDropdownOpen(false)}
                                      >
                                        <div
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {aluminumDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-48 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                                            >
                                              {[
                                                "Aluminum Module Mounting Structure",
                                                "Hot Dip Galvanized Structures",
                                                "FRP Walkway",
                                                "FRP Handrails"
                                              ].map((productName) => (
                                                <button
                                                  key={productName}
                                                  onClick={() => {
                                                    setAluminumDropdownOpen(false);
                                                    setProductsDropdownOpen(false);
                                                    navigateTo("product-details", productName);
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                                >
                                                  {productName}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }

                                  if (subItem === "BOS Solutions") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => setBosDropdownOpen(true)}
                                        onMouseLeave={() => setBosDropdownOpen(false)}
                                      >
                                        <div
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {bosDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-48 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                                            >
                                              {[
                                                "PM Surya Ghar Kit",
                                                "Terrabond Earthing Kit",
                                                "Solar Panels",
                                                "Inverters"
                                              ].map((productName) => (
                                                <button
                                                  key={productName}
                                                  onClick={() => {
                                                    setBosDropdownOpen(false);
                                                    setProductsDropdownOpen(false);
                                                    navigateTo("product-details", productName);
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                                >
                                                  {productName}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    if (item === "Downloads") {
                      return (
                        <div
                          key={item}
                          className="relative"
                          onMouseEnter={() => setDownloadsDropdownOpen(true)}
                          onMouseLeave={() => {
                            setDownloadsDropdownOpen(false);
                            setSolarPanelsDropdownOpen(false);
                            setInvertersDropdownOpen(false);
                            setBrochuresDropdownOpen(false);
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo("downloads");
                            }}
                            className={`hover:text-slate-950 transition-colors duration-250 py-1 cursor-pointer font-semibold flex items-center gap-1 ${isCurrent
                              ? "text-indigo-600 font-bold"
                              : "text-slate-700"
                              }`}
                          >
                            {item}
                            <ChevronDown size={14} className={`transition-transform duration-250 ${downloadsDropdownOpen ? "rotate-180" : ""}`} />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {downloadsDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                              >
                                {[
                                  "Solar Panels",
                                  "Inverters",
                                  "Brochures"
                                ].map((subItem) => {
                                  if (subItem === "Solar Panels") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => {
                                          setSolarPanelsDropdownOpen(true);
                                          setInvertersDropdownOpen(false);
                                          setBrochuresDropdownOpen(false);
                                        }}
                                        onMouseLeave={() => setSolarPanelsDropdownOpen(false)}
                                      >
                                        <div
                                          onClick={() => {
                                            setDownloadsDropdownOpen(false);
                                            navigateTo("downloads", "solar-panels");
                                          }}
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {solarPanelsDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-60 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto max-h-80 overflow-y-auto"
                                            >
                                              {[
                                                { title: "CSI Solar 730Wp HJT Bifacial", id: "datasheet-730w-hjt-bifacial" },
                                                { title: "550Wp Dual-Glass Bifacial", id: "datasheet-550w-bifacial" },
                                                { title: "Loom Solar SHARK (625W)", id: "datasheet-loom-solar-shark-topcon" },
                                                { title: "Waaree Elite N-Type (585W)", id: "datasheet-waaree-elite" },
                                                { title: "Adani Bifacial PERC (550W)", id: "datasheet-adani-bifacial" },
                                                { title: "Adani TOPCon 30mm (585W)", id: "datasheet-adani-topcon" },
                                                { title: "Vikram Solar HYPERSOL (605W)", id: "datasheet-vikram-hypersol" },
                                                { title: "Waaree Mono PERC (545W)", id: "datasheet-waaree-mono-perc" },
                                                { title: "ReNew M10 Bifacial (560W)", id: "datasheet-renew-bifacial" },
                                                { title: "TOPCon G2G Gen-II (590W)", id: "datasheet-topcon-g2g" },
                                                { title: "TOPCon G2TB 35mm (590W)", id: "datasheet-topcon-g2tb-35mm" },
                                                { title: "Waaree Bifacial 30mm (550W)", id: "datasheet-waaree-bi-550" },
                                              ].map((panel) => (
                                                <button
                                                  key={panel.id}
                                                  onClick={() => {
                                                    setSolarPanelsDropdownOpen(false);
                                                    setDownloadsDropdownOpen(false);
                                                    window.location.hash = `#downloads/${panel.id}`;
                                                    setCurrentPage("downloads");
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer truncate block"
                                                  title={panel.title}
                                                >
                                                  {panel.title}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }

                                  if (subItem === "Inverters") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => {
                                          setInvertersDropdownOpen(true);
                                          setSolarPanelsDropdownOpen(false);
                                          setBrochuresDropdownOpen(false);
                                        }}
                                        onMouseLeave={() => setInvertersDropdownOpen(false)}
                                      >
                                        <div
                                          onClick={() => {
                                            setDownloadsDropdownOpen(false);
                                            navigateTo("downloads", "inverters");
                                          }}
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {invertersDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-60 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                                            >
                                              {[
                                                { title: "Polycab Grid-Tied & Hybrid", id: "datasheet-polycab-inverter" },
                                                { title: "On-Grid Architecture Guide", id: "datasheet-ongrid-systems" },
                                                { title: "Polycab 3-Phase Commercial", id: "datasheet-polycab-commercial-inverter" },
                                              ].map((inv) => (
                                                <button
                                                  key={inv.id}
                                                  onClick={() => {
                                                    setInvertersDropdownOpen(false);
                                                    setDownloadsDropdownOpen(false);
                                                    window.location.hash = `#downloads/${inv.id}`;
                                                    setCurrentPage("downloads");
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer truncate block"
                                                  title={inv.title}
                                                >
                                                  {inv.title}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }

                                  if (subItem === "Brochures") {
                                    return (
                                      <div
                                        key={subItem}
                                        className="relative"
                                        onMouseEnter={() => {
                                          setBrochuresDropdownOpen(true);
                                          setSolarPanelsDropdownOpen(false);
                                          setInvertersDropdownOpen(false);
                                        }}
                                        onMouseLeave={() => setBrochuresDropdownOpen(false)}
                                      >
                                        <div
                                          onClick={() => {
                                            setDownloadsDropdownOpen(false);
                                            navigateTo("downloads", "brochures");
                                          }}
                                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 select-none flex items-center justify-between hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
                                        >
                                          <span>{subItem}</span>
                                          <ChevronRight size={12} className="text-slate-400" />
                                        </div>

                                        {/* Sub-sub dropdown (Flyout) */}
                                        <AnimatePresence>
                                          {brochuresDropdownOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                              transition={{ duration: 0.15 }}
                                              className="absolute left-full top-0 ml-1.5 w-60 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50 text-left pointer-events-auto"
                                            >
                                              {[
                                                { title: "VRM Corporate Brochure", id: "datasheet-vrm-corporate-brochure" },
                                                { title: "PM Surya Ghar Kit Catalogue", id: "datasheet-pm-surya-ghar-kit" },
                                              ].map((brochure) => (
                                                <button
                                                  key={brochure.id}
                                                  onClick={() => {
                                                    setBrochuresDropdownOpen(false);
                                                    setDownloadsDropdownOpen(false);
                                                    window.location.hash = `#downloads/${brochure.id}`;
                                                    setCurrentPage("downloads");
                                                  }}
                                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer truncate block"
                                                  title={brochure.title}
                                                >
                                                  {brochure.title}
                                                </button>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }

                                  return null;
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(item.toLowerCase() as any);
                        }}
                        className={`hover:text-slate-950 transition-colors duration-250 py-1 cursor-pointer font-semibold ${isCurrent
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

              {/* Action Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateTo("quote")}
                  className="text-[12px] font-bold px-5 py-2 rounded-full transition-all duration-200 cursor-pointer border-none bg-black text-white hover:bg-slate-900 shadow-md"
                >
                  Request a Quote
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateTo("login")}
                  className="text-[12px] font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer border-none bg-slate-100 text-slate-800 hover:bg-slate-200"
                >
                  Login
                </motion.button>
              </div>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors border-none"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </header>

            {/* Mobile slide-down menu with premium glass-like style */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-20 left-4 right-4 z-50 md:hidden bg-white/85 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/60 overflow-hidden"
                >
                  <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
                    {["Home", "About", "Services", "Products", "Articles", "Downloads", "Contact", "Careers"].map((item) => {
                      const isCurrent = currentPage === item.toLowerCase();
                      if (item === "Products") {
                        return (
                          <div key={item} className="flex flex-col w-full">
                            <button
                              onClick={() => {
                                navigateTo("products");
                                setMobileMenuOpen(false);
                              }}
                              className="py-2.5 border-b border-slate-100 flex items-center justify-between hover:text-slate-950 cursor-pointer text-left w-full font-semibold"
                            >
                              <span className={isCurrent ? "text-indigo-600 font-bold" : ""}>{item}</span>
                              <ChevronDown size={16} className="text-slate-400" />
                            </button>

                            {/* Mobile Sub-Links */}
                            <div className="flex flex-col pl-4 border-l border-slate-100 mt-1 gap-1.5 py-1">
                              {[
                                "Mounting Structures",
                                "Aluminum & FRP Solutions",
                                "BOS Solutions"
                              ].map((subItem) => {
                                if (subItem === "Mounting Structures") {
                                  return (
                                    <div key={subItem} className="flex flex-col w-full">
                                      <div
                                        className="py-2 text-xs text-slate-700 font-semibold select-none flex items-center justify-between pr-4"
                                      >
                                        <span>{subItem}</span>
                                        <ChevronDown size={12} className="text-slate-400" />
                                      </div>

                                      {/* Mobile Sub-Sub Links */}
                                      <div className="flex flex-col pl-4 border-l border-slate-100/50 mt-1 gap-1 py-0.5">
                                        {[
                                          "RCC Roof MMS",
                                          "Customized MMS",
                                          "Ground Mounted MMS",
                                          "Solar Pump MMS",
                                          "Carport MMS"
                                        ].map((productName) => (
                                          <button
                                            key={productName}
                                            onClick={() => {
                                              navigateTo("product-details", productName);
                                              setMobileMenuOpen(false);
                                            }}
                                            className="py-1.5 text-[11px] text-slate-400 hover:text-indigo-600 text-left font-medium cursor-pointer"
                                          >
                                            {productName}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }

                                if (subItem === "Aluminum & FRP Solutions") {
                                  return (
                                    <div key={subItem} className="flex flex-col w-full">
                                      <div
                                        className="py-2 text-xs text-slate-700 font-semibold select-none flex items-center justify-between pr-4"
                                      >
                                        <span>{subItem}</span>
                                        <ChevronDown size={12} className="text-slate-400" />
                                      </div>

                                      {/* Mobile Sub-Sub Links */}
                                      <div className="flex flex-col pl-4 border-l border-slate-100/50 mt-1 gap-1 py-0.5">
                                        {[
                                          "Aluminum Module Mounting Structure",
                                          "Hot Dip Galvanized Structures",
                                          "FRP Walkway",
                                          "FRP Handrails"
                                        ].map((productName) => (
                                          <button
                                            key={productName}
                                            onClick={() => {
                                              navigateTo("product-details", productName);
                                              setMobileMenuOpen(false);
                                            }}
                                            className="py-1.5 text-[11px] text-slate-400 hover:text-indigo-600 text-left font-medium cursor-pointer"
                                          >
                                            {productName}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }

                                if (subItem === "BOS Solutions") {
                                  return (
                                    <div key={subItem} className="flex flex-col w-full">
                                      <div
                                        className="py-2 text-xs text-slate-700 font-semibold select-none flex items-center justify-between pr-4"
                                      >
                                        <span>{subItem}</span>
                                        <ChevronDown size={12} className="text-slate-400" />
                                      </div>

                                      {/* Mobile Sub-Sub Links */}
                                      <div className="flex flex-col pl-4 border-l border-slate-100/50 mt-1 gap-1 py-0.5">
                                        {[
                                          "PM Surya Ghar Kit",
                                          "Terrabond Earthing Kit",
                                          "Solar Panels",
                                          "Inverters"
                                        ].map((productName) => (
                                          <button
                                            key={productName}
                                            onClick={() => {
                                              navigateTo("product-details", productName);
                                              setMobileMenuOpen(false);
                                            }}
                                            className="py-1.5 text-[11px] text-slate-400 hover:text-indigo-600 text-left font-medium cursor-pointer"
                                          >
                                            {productName}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        );
                      }

                      if (item === "Downloads") {
                        return (
                          <div key={item} className="flex flex-col w-full">
                            <button
                              onClick={() => {
                                setMobileDownloadsOpen(!mobileDownloadsOpen);
                              }}
                              className="py-2.5 border-b border-slate-100 flex items-center justify-between hover:text-slate-950 cursor-pointer text-left w-full font-semibold"
                            >
                              <span className={isCurrent ? "text-indigo-600 font-bold" : ""}>{item}</span>
                              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${mobileDownloadsOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Mobile Sub-Links */}
                            {mobileDownloadsOpen && (
                              <div className="flex flex-col pl-4 border-l border-slate-100 mt-1 gap-1.5 py-1">
                                <button
                                  onClick={() => {
                                    navigateTo("downloads");
                                    setMobileMenuOpen(false);
                                  }}
                                  className="py-1.5 text-xs text-indigo-600 hover:text-indigo-800 text-left font-bold cursor-pointer"
                                >
                                  View All Downloads →
                                </button>
                                {[
                                  "Solar Panels",
                                  "Inverters",
                                  "Brochures"
                                ].map((subItem) => {
                                  const isSubOpen = subItem === "Solar Panels"
                                    ? mobileSolarPanelsOpen
                                    : subItem === "Inverters"
                                      ? mobileInvertersOpen
                                      : mobileBrochuresOpen;
                                  const setSubOpen = subItem === "Solar Panels"
                                    ? setMobileSolarPanelsOpen
                                    : subItem === "Inverters"
                                      ? setMobileInvertersOpen
                                      : setMobileBrochuresOpen;
                                  const categorySlug = subItem === "Solar Panels" ? "solar-panels" : subItem === "Inverters" ? "inverters" : "brochures";
                                  const subDocs = subItem === "Solar Panels"
                                    ? [
                                        { title: "CSI Solar 730Wp HJT Bifacial", id: "datasheet-730w-hjt-bifacial" },
                                        { title: "550Wp Dual-Glass Bifacial", id: "datasheet-550w-bifacial" },
                                        { title: "Loom Solar SHARK (625W)", id: "datasheet-loom-solar-shark-topcon" },
                                        { title: "Waaree Elite N-Type (585W)", id: "datasheet-waaree-elite" },
                                        { title: "Adani Bifacial PERC (550W)", id: "datasheet-adani-bifacial" },
                                        { title: "Adani TOPCon 30mm (585W)", id: "datasheet-adani-topcon" },
                                        { title: "Vikram Solar HYPERSOL (605W)", id: "datasheet-vikram-hypersol" },
                                        { title: "Waaree Mono PERC (545W)", id: "datasheet-waaree-mono-perc" },
                                        { title: "ReNew M10 Bifacial (560W)", id: "datasheet-renew-bifacial" },
                                        { title: "TOPCon G2G Gen-II (590W)", id: "datasheet-topcon-g2g" },
                                        { title: "TOPCon G2TB 35mm (590W)", id: "datasheet-topcon-g2tb-35mm" },
                                        { title: "Waaree Bifacial 30mm (550W)", id: "datasheet-waaree-bi-550" },
                                      ]
                                    : subItem === "Inverters"
                                      ? [
                                          { title: "Polycab Grid-Tied & Hybrid", id: "datasheet-polycab-inverter" },
                                          { title: "On-Grid Architecture Guide", id: "datasheet-ongrid-systems" },
                                          { title: "Polycab 3-Phase Commercial", id: "datasheet-polycab-commercial-inverter" },
                                        ]
                                      : [
                                          { title: "VRM Corporate Brochure", id: "datasheet-vrm-corporate-brochure" },
                                          { title: "PM Surya Ghar Kit Catalogue", id: "datasheet-pm-surya-ghar-kit" },
                                        ];

                                  return (
                                    <div key={subItem} className="flex flex-col w-full">
                                      <div
                                        onClick={() => setSubOpen(!isSubOpen)}
                                        className="py-2 text-xs text-slate-700 font-semibold select-none flex items-center justify-between pr-4 cursor-pointer"
                                      >
                                        <span>{subItem}</span>
                                        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`} />
                                      </div>

                                      {/* Mobile Sub-Sub Links */}
                                      {isSubOpen && (
                                        <div className="flex flex-col pl-4 border-l border-slate-100/50 mt-1 gap-1 py-0.5">
                                          <button
                                            onClick={() => {
                                              navigateTo("downloads", categorySlug);
                                              setMobileMenuOpen(false);
                                            }}
                                            className="py-1.5 text-[11px] text-indigo-600 hover:text-indigo-800 text-left font-bold cursor-pointer"
                                          >
                                            View All {subItem} →
                                          </button>
                                          {subDocs.map((doc) => (
                                            <button
                                              key={doc.id}
                                              onClick={() => {
                                                window.location.hash = `#downloads/${doc.id}`;
                                                setCurrentPage("downloads");
                                                setMobileMenuOpen(false);
                                              }}
                                              className="py-1.5 text-[11px] text-slate-400 hover:text-indigo-600 text-left font-medium cursor-pointer truncate"
                                            >
                                              {doc.title}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={item}
                          onClick={() => {
                            navigateTo(item.toLowerCase() as any);
                            setMobileMenuOpen(false);
                          }}
                          className="py-2.5 border-b border-slate-100 flex items-center justify-between hover:text-slate-950 cursor-pointer text-left w-full"
                        >
                          <span className={isCurrent ? "text-indigo-600 font-bold" : ""}>{item}</span>
                          <ChevronRight size={16} className="text-slate-400" />
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        navigateTo("contact");
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
          </div>
        </div>
      )}

      {currentPage === "home" ? (
        <>
          {/* --- SECTION 1: HERO VIEWPORT (Full Video with Centered Text) --- */}
          <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">

            {/* FULL-WIDTH BACKGROUND VIDEO (Continuous Autoplay, Loop, No Play/Pause) */}
            <HeroVideoBackground videoRef={heroVideoRef} isMuted={isHeroMuted} />

            {/* CENTER TEXT CONTENT */}
            <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">

              {/* Superb Headline Centered */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
                className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
              >
                VRM STRUCTURES INDIA PRIVATE LIMITED is a leading Solar Structure Manufacturer in India
              </motion.h1>

              {/* Subtitle Centered */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
              >
                High-performance Solar Mounting Systems, Solar Tracker Structures, and clean energy infrastructure solutions trusted by leading solar EPC companies across India.
              </motion.p>

            </div>

            {/* Bottom-right sound toggle (Mute / Unmute only - no play/pause) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (heroVideoRef.current) {
                  heroVideoRef.current.muted = !isHeroMuted;
                  setIsHeroMuted(!isHeroMuted);
                }
              }}
              className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition-all duration-200 shadow-xl cursor-pointer select-none group/sound hover:scale-105 active:scale-95"
              title={isHeroMuted ? "Unmute audio" : "Mute audio"}
            >
              {isHeroMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-slate-300 group-hover/sound:text-white transition-colors" />
                  <span className="hidden sm:inline text-[11px] font-medium tracking-wide">Unmute Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 group-hover/sound:text-emerald-300 transition-colors" />
                  <span className="hidden sm:inline text-[11px] text-emerald-300 font-semibold tracking-wide">Sound On</span>
                </>
              )}
            </button>

          </div>

          {/* --- SECTION 2: ABOUT US BENTO SECTION (Totally separate page section below the fold!) --- */}
          <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* ABOUT US BENTO SECTION - Adapting reference layout perfectly to our theme */}
              <section className="w-full" id="about-content">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                    {/* Heading with circular badges inline */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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

                    {/* Subheading / Description paragraph */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
                    >
                      VRM STRUCTURES INDIA PRIVATE LIMITED specializes in high-quality Solar MMS solutions engineered for durability, safety, and performance. Our precision-manufactured structures support rooftop, ground-mounted, and utility-scale solar projects with industry-leading quality and reliability.
                    </motion.p>

                    {/* Bento Grid: 4 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">

                      {/* Card 1: Light gray with Tag Cloud */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.06 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="group bg-white/45 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[330px] md:min-h-[360px] hover:shadow-md hover:bg-white/65 hover:border-white/80 transition-all duration-300"
                      >
                        {/* Floating Tag Cloud */}
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

                        {/* Stat at bottom */}
                        <div className="text-left mt-6">
                          <span className="text-[11px] font-bold tracking-[0.06em] text-slate-400 uppercase block">
                            Solar MMS Solutions
                          </span>
                          <span className="text-2xl font-extrabold text-slate-900 mt-1 block tracking-tight uppercase">
                            VRM STRUCTURES
                          </span>
                        </div>
                      </motion.div>

                      {/* Card 2: Solid Warm Orange Highlight Card for Solar Energy Theme */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.04 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="group bg-[#FF6B35] hover:bg-[#FF7D4C] border border-[#E0531D] rounded-3xl p-6 flex flex-col justify-between min-h-[330px] md:min-h-[360px] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Decorative faint glow */}
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

                      {/* Card 3: Solar Panels Close-Up Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.044 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="relative overflow-hidden rounded-3xl min-h-[330px] md:min-h-[360px] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-end"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&h=800&q=80"
                          alt="Premium Solar Panels under blue sky reflecting sunlight"
                          loading="lazy"
                          decoding="async"
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

                      {/* Card 4: Light gray with Data Points */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.048 }}
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

          {/* --- SECTION 3: PRODUCTS SECTION (Refined visual style using Section 2 as reference) --- */}
          <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <section className="w-full" id="products-content">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Title, Description & Products Grid */}
                  <div className="flex flex-col">

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
                    >
                      VRM STRUCTURES manufactures hot-dip galvanized and aluminum module mounting structures for solar installations all over the world. Our range covers Metal Roof MMS, RCC Roof MMS, Ground Mounted Solar Structures, Carport MMS, and Customized MMS engineered for unique site requirements. Every structure is built in-house, from steel sourcing to quality-tested Galvanizing, for reliable EPC and rooftop solar projects.
                    </motion.p>

                    {/* End of Right Column Content */}
                  </div>

                </div>
              </section>

            </div>

            {/* Product 3D Curved Cards Container - PLACED OUTSIDE max-w-7xl TO SPAN THE ENTIRE SCREEN WIDTH */}
            <div className="w-full mt-12 md:mt-16 overflow-x-auto md:overflow-visible scrollbar-none [perspective:1500px] [transform-style:preserve-3d]">
              <div className="w-full max-w-[1440px] mx-auto flex flex-row overflow-x-auto md:overflow-visible gap-6 md:gap-4 px-6 md:px-12 lg:px-16 pb-16 pt-6 md:pt-16 [transform-style:preserve-3d] scrollbar-none snap-x snap-mandatory justify-start md:justify-center">
                {[
                  {
                    title: "RCC Roof MMS",
                    desc: "Robust flat-roof systems with ballasted foundations or anchor-fastened mounts, delivering exceptional wind resistance without damaging RCC waterproofing.",
                    icon: <Building className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-800",
                    category: "Roof Mount",
                    material: "Galvanized Steel",
                    thickness: "2.0mm - 3.0mm",
                    glb: "/RCC_Design.bin",
                    zoom: 0.7
                  },
                  {
                    title: "Customized MMS",
                    desc: "Tailor-made solar mounting solutions engineered dynamically for complex topographies, specialized angles, and non-standard project geometries.",
                    icon: <Wrench className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-800",
                    category: "Special Structure",
                    material: "Aluminum Alloy",
                    thickness: "2.0mm - 3.0mm",
                    glb: "/Customized.bin",
                    zoom: 0.8
                  },
                  {
                    title: "Aluminum Mounting Structures",
                    desc: "Anodized, lightweight, and highly aesthetic aluminum structures optimized for rooftop and high-salinity coastal installations.",
                    icon: <Building className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800",
                    category: "Rooftop & Coastal",
                    material: "Aluminum Alloy",
                    thickness: "1.5mm - 2.0mm",
                    glb: "/Aluminum.bin",
                    zoom: 0.6
                  },
                  {
                    title: "Hot Dip Galvanized",
                    desc: "Heavy-duty hot-dip galvanized steel structures built to withstand severe wind loads and corrosive outdoor environments.",
                    icon: <Layout className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-slate-650 via-slate-500 to-indigo-900",
                    category: "Heavy Duty",
                    material: "Galvanized Steel",
                    thickness: "Over 3.0mm",
                    glb: "/RCC.bin",
                    zoom: 0.7
                  },
                  {
                    title: "FRP Walkway",
                    desc: "Corrosion-proof Fibreglass Reinforced Plastic walkway panels designed for safe and durable solar rooftop maintenance access.",
                    icon: <Shield className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-950",
                    category: "Safety Access",
                    material: "FRP Composite",
                    thickness: "Over 3.0mm",
                    glb: "/WALK_WAY.bin",
                    zoom: 0.75
                  },
                  {
                    title: "FRP Handrail",
                    desc: "Non-conductive, lightweight, and highly weather-resistant handrail systems ensuring maximum safety across elevated solar plants.",
                    icon: <Shield className="text-white stroke-[2]" size={32} />,
                    bg: "bg-gradient-to-br from-teal-500 via-cyan-600 to-indigo-950",
                    category: "Safety Access",
                    material: "FRP Composite",
                    thickness: "Over 3.0mm",
                    glb: "/Handrail.bin",
                    zoom: 0.75
                  }
                ].map((prod: any, index) => {
                  const rotations = [20, 12, 4, -4, -12, -20];
                  const translatesY = [24, 10, 0, 0, 10, 24];
                  const translatesZ = [-30, -10, 10, 10, -10, -30];

                  const isHovered = hoveredIndex === index;

                  const cardStyle = isDesktop ? {
                    transform: `rotateY(${rotations[index]}deg) translateY(${translatesY[index]}px) translateZ(${translatesZ[index]}px)`,
                    transformStyle: "preserve-3d" as const,
                    zIndex: 10 + index,
                  } : {};

                   return (
                    <div
                      key={prod.title}
                      style={cardStyle}
                      className="flex flex-col items-center snap-center min-w-[240px] max-w-[280px] md:min-w-[140px] lg:min-w-[170px] md:max-w-none md:flex-1 flex-shrink-0"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                        className="w-full flex flex-col items-center"
                      >
                        <div 
                          className="w-full aspect-[9/13] rounded-[2.2rem] bg-[#1e293b] shadow-[0_10px_25px_rgba(0,0,0,0.12)] relative overflow-hidden flex items-center justify-center"
                        >
                          {prod.glb ? (
                            <div className="absolute inset-0 w-full h-full">
                              <Product3DViewer url={prod.glb} zoom={prod.zoom} autoRotate={true} isHovered={isHovered} />
                            </div>
                          ) : prod.image ? (
                            <img 
                              src={prod.image} 
                              alt={prod.title} 
                              className="absolute inset-0 w-full h-full object-cover" 
                            />
                          ) : (
                            <>
                              {/* Radial overlay to add depth */}
                              <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                              {/* Steel grid line details */}
                              <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                              {/* Central Glowing Icon Block */}
                              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                                <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-0" />
                                <div className="relative z-10">
                                  {prod.icon}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Subtle reflection/shimmer sheet */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full pointer-events-none" />
                        </div>

                        {/* Text Label Section Below Card (Exactly replicating reference image layout) */}
                        <div className="text-center mt-6 px-2">
                          <h4 
                            className="font-display text-[15px] lg:text-[16px] font-bold leading-tight text-slate-900"
                          >
                            {prod.title}
                          </h4>
                          <p className="font-sans text-[12px] leading-relaxed text-slate-500 mt-2 font-light line-clamp-3">
                            {prod.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Centered Explore More Button styled like Products & About Us */}
            <div className="flex justify-center mt-12 md:mt-16 relative z-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("products")}
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

          {/* --- SECTION 4: IN-HOUSE MANUFACTURING PROCESS SECTION (Symmetric & Elegant) --- */}
          <Manufacturing />

          {/* --- SECTION 5: STATS SECTION (Manufacturing You Can Measure) --- */}
          <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="stats">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <section className="w-full" id="stats-content">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Title, Description & Stats Grid */}
                  <div className="flex flex-col">

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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
                      transition={{ duration: 0.35, delay: 0.06 }}
                      className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                    >
                      From capacity to coverage, the numbers behind VRM STRUCTURES reflect years of consistent, in-house solar structure manufacturing trusted by EPCs across South India.
                    </motion.p>                {/* Stats Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
                      {[
                        {
                          title: "Monthly Capacity",
                          subtitle: "Monthly Output • In-House Mill",
                          num: "2000",
                          unit: "MT",
                          bgGradient: "from-[#8E8B99] via-[#9F9192] to-[#B6968B]",
                          orbGradient: "from-amber-200 via-orange-300 to-rose-300"
                        },
                        {
                          title: "Projects Supplied",
                          subtitle: "Pan-India • Installation Base",
                          num: "1500",
                          unit: "MW+",
                          bgGradient: "from-[#5A6E72] via-[#6B8487] to-[#8FA295]",
                          orbGradient: "from-teal-200 via-emerald-300 to-green-200"
                        },
                        {
                          title: "Active Network",
                          subtitle: "Pan-India • Delivery Speed",
                          num: "14+",
                          unit: "States",
                          bgGradient: "from-[#51536E] via-[#6C5D7B] to-[#8C6D88]",
                          orbGradient: "from-pink-200 via-purple-300 to-indigo-300"
                        },
                        {
                          title: "Active Countries",
                          subtitle: "Global Reach • Export Presence",
                          num: "3+",
                          unit: "Countries",
                          bgGradient: "from-[#40434F] via-[#5C5F6F] to-[#7E8294]",
                          orbGradient: "from-slate-100 via-zinc-300 to-slate-300"
                        }
                      ].map((stat, idx) => (
                        <motion.div
                          key={stat.title}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: idx * 0.05 }}
                          whileHover={{ y: -5, scale: 1.01 }}
                          className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-[2.2rem] p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/10 overflow-hidden min-h-[210px] sm:min-h-[230px] transition-all duration-300 group`}
                        >
                          {/* Top Row: Title / Subtitle on Left */}
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

                          {/* Bottom Section: Giant Stat Number */}
                          <div className="flex justify-between items-end gap-4 mt-8">
                            {/* Giant Temperature/Stat Callout */}
                            <div className="flex items-start text-left leading-none select-none flex-shrink-0">
                              <span className="font-sans text-5xl sm:text-6xl font-extralight text-white tracking-tighter leading-none">
                                <AnimatedCounter value={parseInt(stat.num, 10)} />
                                {stat.num.includes("+") && "+"}
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

          {/* --- SECTION 6: TESTIMONIALS SECTION (What Our Clients Say) --- */}
          <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <section className="w-full" id="testimonials-content">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Content */}
                  <div className="flex flex-col min-w-0">

                    {/* Top Row: Heading and Navigation Arrows */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.04 }}
                        className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight"
                      >
                        What Our{" "}
                        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-indigo-100/50 shadow-sm">
                          Clients Say
                        </span>
                      </motion.h2>

                      {/* Left/Right Navigation controls for beautiful desktop and mobile browsing */}
                      <div className="flex items-center gap-3">
                        {/* Previous Button with gradient border */}
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

                        {/* Next Button with gradient border */}
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
                      transition={{ duration: 0.35, delay: 0.06 }}
                      className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                    >
                      Trusted by EPC contractors and solar developers across the world for reliable, quality-tested mounting structures.
                    </motion.p>
                  </div>
                </div>

                {/* Testimonials Slider (Outside the 2-column grid layout so that it is left-aligned perfectly with the whole section width) */}
                <div
                  id="testimonials-slider"
                  className="flex flex-row overflow-x-auto gap-8 mt-12 w-full pb-8 pt-4 px-2 snap-x snap-mandatory no-scrollbar"
                >
                  {[
                    {
                      quote: "The non-penetrative sheet roof model was ideal for our site and delivered on time. The team provided excellent support throughout.",
                      author: "Ranganathan K.",
                      role: "",
                      company: "",
                      location: "Chennai, Tamil Nadu",
                      num: "01",
                      icon: Monitor,
                      colorFrom: "#FF5D63",
                      colorTo: "#FF8B91",
                      glowColor: "rgba(255, 93, 99, 0.12)"
                    },
                    {
                      quote: "VRM Structures India Pvt Ltd. is known for their durable products and professional service. We’re delighted with the FRP walkway they supplied.",
                      author: "Saji Mathew",
                      role: "",
                      company: "",
                      location: "Kochi, Kerala",
                      num: "02",
                      icon: Rocket,
                      colorFrom: "#FF8C42",
                      colorTo: "#FFAE7A",
                      glowColor: "rgba(255, 140, 66, 0.12)"
                    },
                    {
                      quote: "VRMSTRUCTURES offers cost-effective solutions without compromising on quality. Their products and service are exceptional. The team worked closely with us to deliver exactly what we needed. Their mounting structures are reliable and durable for long-term use.",
                      author: "Arun Prasath",
                      role: "",
                      company: "",
                      location: "Coimbatore, Tamil Nadu",
                      num: "03",
                      icon: BarChart3,
                      colorFrom: "#4D62E8",
                      colorTo: "#7B8CFF",
                      glowColor: "rgba(77, 98, 232, 0.12)"
                    },
                    {
                      quote: "Their technical expertise and innovative designs stand out. VRM Structures India Pvt Ltd. is a trusted partner for all solar mounting needs.",
                      author: "Nikhil Joseph",
                      role: "",
                      company: "",
                      location: "Thrissur, Kerala",
                      num: "04",
                      icon: Search,
                      colorFrom: "#8E44AD",
                      colorTo: "#B775E4",
                      glowColor: "rgba(142, 68, 173, 0.12)"
                    },
                    {
                      quote: "The team is highly professional and responsive throughout the process. Their FRP walkways are robust and perfect for heavy-duty applications.",
                      author: "Rajesh Kumar",
                      role: "",
                      company: "",
                      location: "Bangalore, Karnataka",
                      num: "05",
                      icon: Shield,
                      colorFrom: "#06B6D4",
                      colorTo: "#67E8F9",
                      glowColor: "rgba(6, 182, 212, 0.12)"
                    },
                    {
                      quote: "VRM Structures delivers excellent-quality solar mounting solutions tailored to customer needs. Their products are durable and reliable, ensuring long-term performance. The team is professional and supportive throughout the process. We were impressed by the innovative and cost-effective solutions provided by VRM Structures. Their FRP walkways and mounting systems are of top-notch quality. Highly recommend their services for solar projects!",
                      author: "Srinivas Rao",
                      role: "",
                      company: "",
                      location: "Hyderabad, Telangana",
                      num: "06",
                      icon: Award,
                      colorFrom: "#10B981",
                      colorTo: "#6EE7B7",
                      glowColor: "rgba(16, 189, 129, 0.12)"
                    },
                    {
                      quote: "VRM Structures India Pvt Ltd, is a trusted name for solar mounting structures. Their commitment to quality and service is remarkable. The team at VRM Structures is professional and responsive, ensuring a smooth experience. Their FRP walkways and non-penetrative roof models are excellent. Highly satisfied with their products and service!",
                      author: "Amit Sharma",
                      role: "",
                      company: "",
                      location: "Pune, Maharashtra",
                      num: "07",
                      icon: Target,
                      colorFrom: "#F59E0B",
                      colorTo: "#FCD34D",
                      glowColor: "rgba(245, 158, 11, 0.12)"
                    },
                    {
                      quote: "VRMSTRUCTURES solutions are innovative, durable, and cost-effective. The team is professional and ensures customer satisfaction at every step. The products were of high quality and delivered within the promised timeline.",
                      author: "Vikram Singh",
                      role: "",
                      company: "",
                      location: "Ahmedabad, Gujarat",
                      num: "08",
                      icon: Cpu,
                      colorFrom: "#EC4899",
                      colorTo: "#F472B6",
                      glowColor: "rgba(236, 72, 153, 0.12)"
                    },
                    {
                      quote: "VRM Structures offers premium solar mounting structures at competitive prices. Their technical expertise and timely delivery are commendable. A reliable choice for all solar installation needs.",
                      author: "Karthik Raja",
                      role: "",
                      company: "",
                      location: "Madurai, Tamil Nadu",
                      num: "09",
                      icon: Globe,
                      colorFrom: "#3B82F6",
                      colorTo: "#60A5FA",
                      glowColor: "rgba(59, 130, 246, 0.12)"
                    },
                    {
                      quote: "Quick delivery.. good quality",
                      author: "Manish Patel",
                      role: "",
                      company: "",
                      location: "Surat, Gujarat",
                      num: "10",
                      icon: Zap,
                      colorFrom: "#EF4444",
                      colorTo: "#F87171",
                      glowColor: "rgba(239, 68, 68, 0.12)"
                    },
                    {
                      quote: "We appreciate VRM Structures India Pvt Ltd commitment to quality and customer satisfaction. Their non-penetrative roof models worked perfectly for our site.",
                      author: "Babu Sundaram",
                      role: "",
                      company: "",
                      location: "Trichy, Tamil Nadu",
                      num: "11",
                      icon: Building,
                      colorFrom: "#14B8A6",
                      colorTo: "#5EEAD4",
                      glowColor: "rgba(20, 184, 166, 0.12)"
                    },
                    {
                      quote: "Exceptional Mounting Structures! VRM Structures provides durable, well-designed solutions with excellent service. Reliable team and timely delivery. Perfect for any solar project!",
                      author: "Anand Krishnan",
                      role: "",
                      company: "",
                      location: "Palakkad, Kerala",
                      num: "12",
                      icon: Wrench,
                      colorFrom: "#6366F1",
                      colorTo: "#818CF8",
                      glowColor: "rgba(99, 102, 241, 0.12)"
                    },
                    {
                      quote: "VRM Structures India Pvt Ltd exceeded our expectations with their innovative solutions and premium products. Highly recommended for solar projects!!!",
                      author: "Deepak Reddy",
                      role: "",
                      company: "",
                      location: "Nellore, Andhra Pradesh",
                      num: "13",
                      icon: Layout,
                      colorFrom: "#8B5CF6",
                      colorTo: "#A78BFA",
                      glowColor: "rgba(139, 92, 246, 0.12)"
                    },
                    {
                      quote: "Their attention to detail and commitment to excellence are impressive. The non-penetrative mounting models were perfect for our project.",
                      author: "Siddharth Mehta",
                      role: "",
                      company: "",
                      location: "Mumbai, Maharashtra",
                      num: "14",
                      icon: Settings,
                      colorFrom: "#6B7280",
                      colorTo: "#9CA3AF",
                      glowColor: "rgba(107, 114, 128, 0.12)"
                    },
                    {
                      quote: "Very good product's and quality was good,correct time delivered the product.. really good experience with your service",
                      author: "Ganesh Moorthy",
                      role: "",
                      company: "",
                      location: "Salem, Tamil Nadu",
                      num: "15",
                      icon: Activity,
                      colorFrom: "#F43F5E",
                      colorTo: "#FB7185",
                      glowColor: "rgba(244, 63, 94, 0.12)"
                    },
                    {
                      quote: "The complete solar mounting kit was delivered on time with every required component included. Great Experience with the sales team. They guide us with their experience",
                      author: "Praveen Kumar",
                      role: "",
                      company: "",
                      location: "Vijayawada, Andhra Pradesh",
                      num: "16",
                      icon: Gauge,
                      colorFrom: "#059669",
                      colorTo: "#34D399",
                      glowColor: "rgba(5, 150, 105, 0.12)"
                    }
                  ].map((item, idx) => (
                    <TestimonialCard key={item.author + idx} item={item} idx={idx} />
                  ))}
                </div>

                {/* Slider indicator dots */}
                <div className="flex justify-center gap-2 mt-4 flex-wrap max-w-md mx-auto">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-slate-350"
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

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Title & Description */}
                  <div className="flex flex-col">

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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
                      transition={{ duration: 0.35, delay: 0.06 }}
                      className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                    >
                      Latest articles on solar mounting structures, industry trends, and EPC best practices from the VRM STRUCTURES team.
                    </motion.p>
                  </div>
                </div>

                {/* Insights Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
                  {[
                    {
                      id: "mms-foundation-solar-success",
                      title: "Building the Foundation for India’s Solar Success: The Role of Module Mounting Structures - VRM STRUCTURES",
                      category: "Placement Yield",
                      excerpt: "In the dynamic landscape of India's solar industry, Module Mounting Structures (MMS) stand as essential pillars supporting the nation's ambitious renewable energy goals. As the country strives to enhance its solar capacity and reduce dependency on fossil fuels, the significance of robust and efficient MMS cannot be overstated.",
                      date: "July 10, 2026",
                      readTime: "5 min read",
                      author: "Velmurugan Rathinam (Founder & Director Of VRM Structure)",
                      colorFrom: "#FF5D63",
                      colorTo: "#FF8B91"
                    },
                    {
                      id: "surya-ghar-yojana-mms",
                      title: "MMS for PM Surya Ghar Muft Bijli Yojana - VRM STRUCTURES",
                      category: "Placement Yield",
                      excerpt: "VRM Structures India Private Limited provides high-quality Module Mounting Structures (MMS) ready stock for the PM Surya Ghar Muft Bijli Yojana, supporting projects from 2kW to 10kW with hot-dip galvanized materials.",
                      date: "June 28, 2026",
                      readTime: "4 min read",
                      author: "Velmurugan Rathinam (Founder & Director Of VRM Structures)",
                      colorFrom: "#FF8C42",
                      colorTo: "#FFAE7A"
                    },
                    {
                      id: "boost-bifacial-performance-mms",
                      title: "Boost Bifacial Panel Performance with VRM Structures: Maximizing Solar Generation Efficiency",
                      category: "Wind Dynamics",
                      excerpt: "Discover how specially designed mounting structures, elevated layouts, optimized tilt angles, and tracking systems from VRM Structures unlock the maximum energy output of bifacial solar panels.",
                      date: "June 15, 2026",
                      readTime: "6 min read",
                      author: "Velmurugan Rathinam (Founder & Director Of VRM Structures)",
                      colorFrom: "#4D62E8",
                      colorTo: "#7B8CFF"
                    }
                  ].map((item, idx) => (
                    <InsightCard key={item.title} item={item} idx={idx} onClick={() => navigateTo("articles", item.id)} />
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

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Title, Description, and Accordion */}
                  <div className="flex flex-col">

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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
                      transition={{ duration: 0.35, delay: 0.06 }}
                      className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                    >
                      Common questions about our solar mounting structures, manufacturing process, and ordering answered by the VRM STRUCTURES team.
                    </motion.p>

                    {/* FAQ Accordion List */}
                    <div className="mt-12 max-w-4xl flex flex-col gap-4">
                      {[
                        {
                          question: "What type of Solar mounting structures do you offer?",
                          answer: "We offer a variety of solar mounting structures, including ground mount systems, rooftop mounts, pole mounts, and non-penetrative roof mounts, designed to meet diverse project needs and site conditions."
                        },
                        {
                          question: "Are your products customisable?",
                          answer: "Yes, we provide customised solar racking solutions tailored to your specific project requirements, ensuring optimal performance and compatibility with your unique architectural design."
                        },
                        {
                          question: "What materials are your mounting system made of?",
                          answer: "Our mounting systems are constructed from high-quality steel and aluminum, ensuring durability, strength, and resistance to harsh weather conditions."
                        },
                        {
                          question: "Do you provide installation support?",
                          answer: "Yes, we offer comprehensive support that includes installation guidelines, technical documentation, and design assistance to ensure your project is successful from start to finish"
                        },
                        {
                          question: "What certifications do your products have?",
                          answer: "Our products adhere to industry standards and regulations, and we provide Material Test Certificates, load data, and compliance documents to assure you of their quality and reliability."
                        },
                        {
                          question: "How do I determine which mounting solution is right for my project?",
                          answer: "Our experienced team is available to assess your project needs, providing recommendations based on factors such as site conditions, energy requirements, and architectural design."
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

                    {/* Bottom CTA to contact */}
                    <div className="mt-12 flex justify-center w-full max-w-4xl">
                      <motion.button
                        onClick={() => navigateTo("contact")}
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

                  {/* Left Column: Label */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
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

                  {/* Right Column: Content */}
                  <div className="flex flex-col">

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.04 }}
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
                      transition={{ duration: 0.35, delay: 0.06 }}
                      className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-slate-500 mt-6 max-w-4xl font-light"
                    >
                      Visit our manufacturing facility or connect with our team proudly serving EPCs and solar developers across The World.
                    </motion.p>
                  </div>
                </div>

                {/* Centered Single Facility Details Card matching the user's reference image */}
                <div className="mt-12 w-full flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: 0.08 }}
                    className="bg-white rounded-[48px] p-8 sm:p-10 md:p-12 border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row-reverse gap-10 md:gap-12 w-full max-w-7xl items-stretch"
                  >
                    {/* Right Column: Image with overlay */}
                    <div className="w-full md:w-[50%] shrink-0 relative aspect-[4/3] md:aspect-auto md:min-h-[420px] rounded-[36px] overflow-hidden shadow-inner">
                      <img
                        src="/vrm-office-factory.jpg"
                        alt="Chennai Manufacturing Facility"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Text and Button Overlay exactly like reference */}
                      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 text-left">
                        <div>
                          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">Chennai Facility</h3>
                          <p className="font-sans text-sm text-slate-300 font-light mt-1">Nagappa Industrial Estate, Puzhal</p>
                        </div>
                        <a
                          href="https://maps.google.com/?q=13.1520,80.2087"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2E2E2C] hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer select-none border border-white/5 shadow-md"
                        >
                          Directions
                        </a>
                      </div>
                    </div>

                    {/* Left Column: Content */}
                    <div className="flex-1 flex flex-col justify-between gap-8 text-left py-2">
                      {/* Info Area below image exactly matching reference "Hard" and subtext */}
                      <div className="flex flex-col text-left">
                        <h4 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Office & Factory Address</h4>
                        <p className="font-sans text-base text-slate-500 font-light mt-3 leading-relaxed">
                          <span className="font-extrabold text-slate-800">VRM STRUCTURES INDIA PRIVATE LIMITED</span>, <br />
                          No 1427, GNT Road, Nagappa Industrial Estate, <br />
                          Puzhal, Chennai – 600066.
                        </p>
                        <p className="font-sans text-[13.5px] text-slate-400 mt-2 font-mono">
                          Coordinates: 13°09'07.2"N 80°12'31.2"E
                        </p>
                      </div>

                      {/* Horizontal line divider */}
                      <div className="w-full h-[1px] bg-slate-100" />

                      {/* Business Hours Row */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold">Business Hours</span>
                        <div className="flex flex-wrap items-center gap-x-2.5 text-xs sm:text-[13px] text-slate-800 font-semibold">
                          <span>Mon – Sat: 09:30 AM – 06:30 PM</span>
                          <span className="text-slate-300 font-light hidden sm:inline">|</span>
                          <span className="text-[11px] text-slate-500 font-light">Sunday: Plant Maintenance</span>
                        </div>
                      </div>

                      {/* Divider line between hours and contacts */}
                      <div className="w-full h-[1px] bg-slate-100/50" />

                      {/* Contact Row (Call & Email in Black) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pb-1">
                        <div className="flex flex-col">
                          <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Call Directly</span>
                          <a href="tel:+919884309789" className="font-sans text-sm font-extrabold text-slate-900 hover:text-indigo-650 transition-colors">
                            +91 98843 09789
                          </a>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Email</span>
                          <a href="mailto:mms@vrmstructures.in" className="font-sans text-sm font-extrabold text-slate-900 hover:text-indigo-650 transition-colors">
                            mms@vrmstructures.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        </>
      ) : currentPage === "about" ? (
        <AboutPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
          onContactClick={() => navigateTo("quote")}
        />
      ) : currentPage === "contact" ? (
        <ContactPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
        />
      ) : currentPage === "articles" ? (
        <ArticlesPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
          onContactClick={() => navigateTo("quote")}
        />
      ) : currentPage === "downloads" ? (
        <DownloadsPage
          onNavigateToQuote={() => navigateTo("quote")}
        />
      ) : currentPage === "login" ? (
        <LoginPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
          initialTab={
            window.location.hash.includes("jobs")
              ? "jobs"
              : window.location.hash.includes("articles")
                ? "articles"
                : "overview"
          }
        />
      ) : currentPage === "quote" ? (
        <QuotePage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
        />
      ) : currentPage === "product-details" ? (
        <ProductDetailsPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
          selectedProductTitle={selectedProductTitle}
        />
      ) : currentPage === "products" ? (
        <ProductsPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ) : currentPage === "services" ? (
        <ServicesPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
        />
      ) : currentPage === "careers" ? (
        <CareersPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
        />
      ) : (
        <NotFoundPage
          onNavigate={(page, targetId) => navigateTo(page, targetId)}
        />
      )}

      {/* --- SECTION 10: FINAL CTA & FOOTER --- */}
      {currentPage !== "login" && (
        <div className="bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white pt-24 pb-16 relative overflow-hidden w-full border-t border-slate-100">
          {/* Soft atmospheric aura matching the top of the reference image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent rounded-full filter blur-[80px] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            {/* Main Footer Card matching Nietzsche reference style exactly */}
            <div className="bg-white rounded-[48px] p-12 md:p-20 lg:p-24 border border-slate-100/80 shadow-[0_32px_64px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.015)] w-full text-left mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                {/* Left Column (Brand & Subscription) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div onClick={() => navigateTo("home")} className="cursor-pointer select-none">
                    <ImagineLogo />
                  </div>

                  <p className="font-sans text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
                    Sign up to receive structure specifications.
                  </p>

                  {/* Email subscription box with pill outline */}
                  <div className="relative flex items-center max-w-md w-full bg-slate-50 rounded-full p-1 border border-slate-200/60 shadow-sm focus-within:border-slate-300 transition-all">
                    <input
                      id="footer-email-input"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter you email"
                      className="flex-1 bg-transparent px-5 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-normal focus:outline-none w-full"
                    />
                    <button
                      type="submit"
                      onClick={() => alert("Thank you for subscribing!")}
                      className="px-6 py-3 bg-[#0F172A] hover:bg-black text-white text-xs font-bold rounded-full transition-all duration-200 select-none cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>

                  <p className="font-sans text-[11px] text-slate-500 font-normal leading-normal max-w-sm">
                    By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
                  </p>
                </div>

                {/* Right Columns (Links Grid) */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {/* Col 1: Products */}
                  <div className="flex flex-col gap-4">
                    <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                      Products
                    </span>
                    <ul className="flex flex-col gap-3 text-xs sm:text-[13px] text-slate-700 font-normal">
                      <li><button onClick={() => navigateTo("products")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Metal Roof</button></li>
                      <li><button onClick={() => navigateTo("products")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">RCC Roof</button></li>
                      <li><button onClick={() => navigateTo("products")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Ground Mount</button></li>
                      <li><button onClick={() => navigateTo("products")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Carports</button></li>
                      <li><button onClick={() => navigateTo("products")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Accessories</button></li>
                    </ul>
                  </div>

                  {/* Col 2: Services */}
                  <div className="flex flex-col gap-4">
                    <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                      Services
                    </span>
                    <ul className="flex flex-col gap-3 text-xs sm:text-[13px] text-slate-700 font-normal">
                      <li><button onClick={() => navigateTo("services")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Engineering</button></li>
                      <li><button onClick={() => navigateTo("services")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Fabrication</button></li>
                      <li><button onClick={() => navigateTo("services")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">STAAD Pro</button></li>
                      <li><button onClick={() => navigateTo("services")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Galvanizing</button></li>
                      <li><button onClick={() => navigateTo("services")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Installation</button></li>
                    </ul>
                  </div>

                  {/* Col 3: Company */}
                  <div className="flex flex-col gap-4">
                    <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                      Company
                    </span>
                    <ul className="flex flex-col gap-3 text-xs sm:text-[13px] text-slate-700 font-normal">
                      <li><button onClick={() => navigateTo("about")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">About Us</button></li>
                      <li><button onClick={() => navigateTo("careers")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Careers</button></li>
                      <li><button onClick={() => navigateTo("articles")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Blogs</button></li>
                      <li><button onClick={() => navigateTo("contact")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Contact Us</button></li>
                    </ul>
                  </div>

                  {/* Col 4: Support */}
                  <div className="flex flex-col gap-4">
                    <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                      Support
                    </span>
                    <ul className="flex flex-col gap-3 text-xs sm:text-[13px] text-slate-700 font-normal">
                      <li><button onClick={() => navigateTo("home", "faq")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">FAQ's</button></li>
                      <li><button onClick={() => navigateTo("contact")} className="hover:text-indigo-600 transition-colors text-left cursor-pointer">Contact Us</button></li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Centered copyright at the bottom border row */}
              <div className="mt-14 pt-8 border-t border-slate-100 flex items-center justify-center">
                <p className="font-sans text-xs text-slate-400 font-normal text-center">
                  © 2026 VRM STRUCTURES INDIA PRIVATE LIMITED. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Floating Social Media Buttons across all screens (hidden on Login page) */}
      {currentPage !== "login" && <FloatingSocialButtons />}

    </div>
  );
}
