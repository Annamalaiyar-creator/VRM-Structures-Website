import React from "react";
import { motion } from "motion/react";
import { HeroVideoBackground, HeroImageBackground } from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";
import QuoteSection from "./QuoteSection";

interface QuotePageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
}

export default function QuotePage({ onNavigate }: QuotePageProps) {
  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">

      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">

        {/* PHOTOGRAPHIC HERO BACKGROUND (PROJECT ESTIMATION DESK & G550 STRUCTURAL STEEL) */}
        <HeroImageBackground src="/images/hero-quote.jpg" alt="VRM Structures Solar MMS Engineering Estimation Desk" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Request a Structural MMS Quote
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Configure your solar utility structure specifications in real-time, get factory weight estimations, and submit your technical parameters directly to our fabrication engineers in Chennai.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="quote-form-section" />
        </div>
      </div>

      {/* STREAMLINED QUOTE CONFIGURATION & OTP VERIFICATION SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 py-12" id="quote-form-section">
        <QuoteSection />
      </div>

    </div>
  );
}
