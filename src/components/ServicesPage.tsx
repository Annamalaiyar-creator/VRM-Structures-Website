import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Gauge,
  Wrench,
  Shield,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  MessageSquare,
  Truck,
  Target,
  Settings,
  CircleDollarSign,
  CheckCircle2,
  ShieldCheck,
  Award,
  FileText,
  Sun
} from "lucide-react";
import { 
  ImagineLogo, 
  HeroVideoBackground,
  HeroImageBackground 
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";

interface ServicesPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">
      
      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        
        {/* PHOTOGRAPHIC HERO BACKGROUND (PRECISION LOAD TESTING & FABRICATION SERVICES) */}
        <HeroImageBackground src="/images/hero-services.jpg" alt="VRM Structures Precision Engineering & Load Testing" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Engineering & Manufacturing Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            From structural design to final quality testing, VRM Structures delivers complete in-house engineering and manufacturing support for solar mounting solutions built to perform.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="services-listing" />
        </div>
      </div>

      {/* SERVICES LISTING SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 pb-32" id="services-listing">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16">
            
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
                    Capabilities
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
                Core Technical Capabilities
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-500 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
              >
                We leverage state-of-the-art facilities and certified engineering tools to deliver high-performance solar mounting structures.
              </motion.p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Structural Design & FEA Engineering",
                desc: "Our engineering team designs and validates every structure using Finite Element Analysis (FEA), ensuring accurate load calculations for wind, seismic, and site-specific conditions before manufacturing begins.",
                icon: <Activity className="text-white stroke-[1.5] w-6 h-6" size={24} />,
                pills: ["FEA Validation", "Load Calculations", "Wind & Seismic"],
                image: "/fea_design_capability.png"
              },
              {
                title: "In-House Fabrication",
                desc: "From laser and CNC cutting to hot-dip galvanizing, every structure is fabricated entirely in-house — giving us complete control over precision, consistency, and turnaround time.",
                icon: <Wrench className="text-white stroke-[1.5] w-6 h-6" size={24} />,
                pills: ["Laser & CNC", "Roll Forming", "Full In-House"],
                image: "/factory_fabrication_capability.png"
              },
              {
                title: "Quality Assurance & Testing",
                desc: "Every batch undergoes rigorous quality checks and load testing before dispatch, ensuring structures meet durability and safety standards on every project.",
                icon: <Shield className="text-white stroke-[1.5] w-6 h-6" size={24} />,
                pills: ["Quality Control", "Load Testing", "Safety Standards"],
                image: "/quality_testing_capability.png"
              }
            ].map((srv, index) => {
              const splitTitle = (title: string) => {
                const words = title.split(" ");
                if (words.length <= 1) return { main: title, sub: "" };
                const sub = words.pop();
                const main = words.join(" ");
                return { main, sub };
              };
              const { main, sub } = splitTitle(srv.title);

              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* 1. Card Image Background */}
                  <div className="w-full h-56 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden group">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay with Icon */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-100 group-hover:bg-slate-950/50 transition-all duration-300 flex items-center justify-center">
                      <div className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 p-4.5 rounded-2xl text-white shadow-lg">
                        {srv.icon}
                      </div>
                    </div>
                  </div>

                  {/* 2. Specs Pills */}
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {srv.pills.map((pill, pIdx) => (
                      <div 
                        key={pill}
                        className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5"
                      >
                        {pIdx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        {pIdx === 1 && <Wrench size={11} className="text-slate-400" />}
                        {pIdx === 2 && <Shield size={11} className="text-slate-400" />}
                        {pill}
                      </div>
                    ))}
                  </div>

                  {/* 3. Service Title & Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-[26px] font-bold text-slate-950 tracking-tight leading-none">
                        {main}
                        {sub && <span className="block text-slate-400 font-bold text-[26px] tracking-tight leading-none mt-1">{sub}</span>}
                      </h3>
                      <p className="text-slate-500 font-normal text-[13px] leading-[20px] mt-4">
                        {srv.desc}
                      </p>
                    </div>
                    
                    {/* 4. Action button */}
                    <button 
                      onClick={() => onNavigate("quote")}
                      className="mt-6 w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-[12px] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      Consult Engineering Details
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* AUTHORIZED DEALERSHIP & BRAND PARTNERSHIPS SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/30 pt-20 md:pt-28 pb-24 sm:pb-32 overflow-hidden" id="authorized-dealership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <section className="w-full">
            {/* Header Offset Layout exactly matching other sections */}
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16">
              
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
                      Dealership
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
                  Authorized Dealers for Loom Solar & Waaree Energies
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-500 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
                >
                  We are official channel partners and authorized distributors for India's leading Tier-1 solar module manufacturers, offering direct factory pricing, ALMM & BIS certification, and seamless bundling with our mounting structures.
                </motion.p>
              </div>

            </div>

            {/* 2-Card Grid Featuring Official Partners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Loom Solar Modules",
                  desc: "Authorized channel partner for Loom Solar. We supply high-efficiency Shark Bifacial and N-Type TOPCon panels (550Wp–625Wp+) certified for residential rooftop projects and PM Surya Ghar schemes.",
                  icon: <Sun className="text-white stroke-[1.5] w-6 h-6" size={24} />,
                  pills: ["Official Partner", "Shark Bifacial", "550Wp - 625Wp+"],
                  image: "/solar_panels_modules.png",
                  actionText: "Inquire Loom Solar",
                  datasheetUrl: "/loom-solar-shark-n-type-topcon-620w-625w-datasheet.pdf"
                },
                {
                  title: "Waaree Energies Panels",
                  desc: "Authorized dealer for India's largest solar module manufacturer (12GW+ capacity). Delivering ALMM List-I certified dual-glass bifacial modules (540Wp–700Wp+) backed by 30-year performance warranties.",
                  icon: <Award className="text-white stroke-[1.5] w-6 h-6" size={24} />,
                  pills: ["Authorized Dealer", "Aditya & Elite", "540Wp - 700Wp+"],
                  image: "/images/hero-products.jpg",
                  actionText: "Inquire Waaree",
                  datasheetUrl: "/datasheet-waaree-elite-n-type-bifacial-555W-560W-565W-570W-585W.pdf"
                }
              ].map((item, index) => {
                const splitTitle = (title: string) => {
                  const words = title.split(" ");
                  if (words.length <= 1) return { main: title, sub: "" };
                  const sub = words.pop();
                  const main = words.join(" ");
                  return { main, sub };
                };
                const { main, sub } = splitTitle(item.title);

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* 1. Card Image Background with Hover Overlay */}
                    <div className="w-full h-56 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay with Icon */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-100 group-hover:bg-slate-950/50 transition-all duration-300 flex items-center justify-center">
                        <div className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 p-4.5 rounded-2xl text-white shadow-lg">
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* 2. Specs Pills */}
                    <div className="flex flex-wrap gap-2.5 mb-5">
                      {item.pills.map((pill, pIdx) => (
                        <div 
                          key={pill}
                          className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5"
                        >
                          {pIdx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                          {pIdx === 1 && <ShieldCheck size={11} className="text-slate-400" />}
                          {pIdx === 2 && <Award size={11} className="text-slate-400" />}
                          {pill}
                        </div>
                      ))}
                    </div>

                    {/* 3. Title & Description */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-[26px] font-bold text-slate-950 tracking-tight leading-none">
                          {main}
                          {sub && <span className="block text-slate-400 font-bold text-[26px] tracking-tight leading-none mt-1">{sub}</span>}
                        </h3>
                        <p className="text-slate-500 font-normal text-[13px] leading-[20px] mt-4">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* 4. Action buttons */}
                      <div className="mt-6 flex items-center gap-2">
                        <button 
                          onClick={() => onNavigate("quote")}
                          className="flex-1 bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-[12px] transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          {item.actionText}
                          <ArrowRight size={14} />
                        </button>
                        {item.datasheetUrl && (
                          <a
                            href={item.datasheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors flex items-center justify-center"
                            title="Download Datasheet"
                          >
                            <FileText size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </section>

        </div>
      </div>

      {/* HOW IT WORKS SECTION - IMPLEMENTING THE ATTACHED DESIGN */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/30 pt-20 md:pt-28 pb-24 sm:pb-32 overflow-hidden" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <section className="w-full">
            {/* Header Offset Layout matching other sections */}
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-20">
              
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
                      Workflow
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
                  How It Works
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-500 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
                >
                  From first enquiry to final delivery, here's what to expect when you work with our engineering and manufacturing team.
                </motion.p>
              </div>

            </div>

            {/* Modern Card Timeline Wrapper */}
            <div className="relative w-full mt-12">
              
              {/* Grid of Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {[
                  {
                    num: "01",
                    title: "Enquiry",
                    desc: "Share your project requirements, site conditions, and structural needs with our team.",
                    glow: "group-hover:shadow-sky-500/10",
                    badgeColor: "bg-sky-500",
                    textColor: "text-sky-500",
                    iconColor: "bg-sky-50 text-sky-500 border-sky-100",
                    icon: <MessageSquare size={20} className="stroke-[1.5]" />
                  },
                  {
                    num: "02",
                    title: "Design & FEA Review",
                    desc: "Our engineers design and validate the structure using Finite Element Analysis for your specific load and site conditions.",
                    glow: "group-hover:shadow-indigo-500/10",
                    badgeColor: "bg-indigo-500",
                    textColor: "text-indigo-500",
                    iconColor: "bg-indigo-50 text-indigo-500 border-indigo-100",
                    icon: <Layers size={20} className="stroke-[1.5]" />
                  },
                  {
                    num: "03",
                    title: "Manufacturing",
                    desc: "Approved designs move to in-house fabrication — cutting, forming, and hot-dip galvanizing.",
                    glow: "group-hover:shadow-purple-500/10",
                    badgeColor: "bg-purple-500",
                    textColor: "text-purple-500",
                    iconColor: "bg-purple-50 text-purple-500 border-purple-100",
                    icon: <Wrench size={20} className="stroke-[1.5]" />
                  },
                  {
                    num: "04",
                    title: "Quality Testing",
                    desc: "Every structure is tested for load and durability before it leaves our facility.",
                    glow: "group-hover:shadow-pink-500/10",
                    badgeColor: "bg-pink-500",
                    textColor: "text-pink-500",
                    iconColor: "bg-pink-50 text-pink-500 border-pink-100",
                    icon: <Shield size={20} className="stroke-[1.5]" />
                  },
                  {
                    num: "05",
                    title: "Delivery",
                    desc: "Completed structures are dispatched and delivered to your project site.",
                    glow: "group-hover:shadow-rose-500/10",
                    badgeColor: "bg-rose-500",
                    textColor: "text-rose-500",
                    iconColor: "bg-rose-50 text-rose-500 border-rose-100",
                    icon: <Truck size={20} className="stroke-[1.5]" />
                  }
                ].map((step, index) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white border border-slate-100 rounded-3xl p-6 relative flex flex-col items-start text-left shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {/* Top Glow on Hover */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] ${step.glow}`} />

                    {/* Step Number Badge */}
                    <div className="absolute top-6 right-6 font-display text-[26px] font-black text-slate-100 group-hover:text-slate-200/60 group-hover:scale-105 transition-all duration-300 italic select-none">
                      {step.num}
                    </div>

                    {/* Icon Wrapper */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.iconColor} mb-6 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[15px] font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed font-light mt-1">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        </div>
      </div>

    </div>
  );
}
