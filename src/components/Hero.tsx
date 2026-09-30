import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onRequestQuote: () => void;
  heroImgPath: string;
}

export default function Hero({ onRequestQuote, heroImgPath }: HeroProps) {
  const [heroTitle, setHeroTitle] = useState('VRM Structures India Pvt Ltd is a leading Solar Structure Manufacturer in India.');
  const [heroSubtitle, setHeroSubtitle] = useState('High-performance Solar Mounting Systems, Solar Tracker Structures, and clean energy infrastructure solutions trusted by leading solar EPC companies across India.');

  useEffect(() => {
    const checkStored = () => {
      try {
        const t = localStorage.getItem('vrm_website_hero_title');
        if (t) setHeroTitle(t);
        const s = localStorage.getItem('vrm_website_hero_subtitle');
        if (s) setHeroSubtitle(s);
      } catch (err) {
        console.error("Error reading hero defaults from storage", err);
      }
    };
    checkStored();
    window.addEventListener('storage', checkStored);
    const intv = setInterval(checkStored, 1000);
    return () => {
      window.removeEventListener('storage', checkStored);
      clearInterval(intv);
    };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgPath}
          alt="Solar mounting architecture in fields"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Centered Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } }
        }}
      >
        {/* Top label */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">
            India's Leading Solar Structure Manufacturer
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-6"
        >
          {heroTitle.split('<br />').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < heroTitle.split('<br />').length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mb-10 font-normal"
        >
          {heroSubtitle.split('<br />').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < heroSubtitle.split('<br />').length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onRequestQuote}
            className="px-8 py-4 bg-teal-400 hover:bg-teal-300 text-white font-bold tracking-wide rounded-full shadow-xl shadow-teal-400/30 hover:shadow-teal-300/40 transition-all duration-300 text-sm cursor-pointer flex items-center gap-2 active:scale-95"
            id="hero-quote-btn"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Our Solutions
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } } }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-8 w-full max-w-2xl"
        >
          {[
            { value: '1.5 GW+', label: 'Installed Capacity' },
            { value: '28+', label: 'States Served' },
            { value: '25 Yrs', label: 'Design Life' },
            { value: '2018', label: 'Est. Year' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">{stat.value}</span>
              <span className="text-xs text-white/50 mt-0.5 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <ArrowDown className="w-5 h-5 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
}
