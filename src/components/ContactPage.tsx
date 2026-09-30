import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  Clock,
  Check,
  ChevronRight,
  Menu,
  X,
  Calendar,
  ChevronDown,
  MapPin,
  Layers,
  Shield,
  ArrowLeft,
  Sparkles,
  Building
} from "lucide-react";
import {
  ImagineLogo,
  HeroVideoBackground,
  HeroImageBackground
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";

interface ContactPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {

  // State variables for the updated Contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Quick action validation
  const isFormValid = contactName && contactEmail && contactPhone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-white overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">

      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">

        {/* PHOTOGRAPHIC HERO BACKGROUND (EXECUTIVE ENGINEERING CONSULTATION & CLIENT LOUNGE) */}
        <HeroImageBackground src="/images/hero-contact.jpg" alt="VRM Structures Engineering Consultation & Client Lounge" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          {/* Immersive display typography */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Get in Touch with our Engineering Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Connect with India's leading custom solar structural manufacturer. Reach our Chennai fabrication yards or complete an inquiry below to secure structural engineering and volume pricing within 24 hours.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="contact-form-section" />
        </div>
      </div>

      {/* --- DETAILED INTERACTIVE FORM & VISUAL COMPONENT (THE CELEBRATED DESIGN) --- */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-28 pb-24 md:pb-32" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">

              {/* Left Column Label Panel */}
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
                      Plan Project
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column Content Panel */}
              <div className="flex flex-col">

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
                >
                  Send Your Message{" "}
                  <span className="inline-flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#FFE0B2]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                    <Sparkles size={15} className="stroke-[2.5]" />
                    Secure Pricing
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
                >
                  Provide maximum criteria about your solar layout setup to receive optimized pricing estimates for solar mounting systems, fixed tilt solar structures, and tailored renewable energy solutions.
                </motion.p>
              </div>

            </div>

            {/* Spacing spacer matching standard section margins */}
            <div className="h-16 w-full" />

            {/* Form & Landscape Image Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">

              {/* Form Column (7 cols) */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#F5F5F7]/85 rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.02)] h-full flex flex-col"
                >
                  <AnimatePresence mode="wait">
                    {!contactSubmitted ? (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left h-full">
                        {/* 2-Column Row: Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Name */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-name" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                              Name
                            </label>
                            <input
                              id="contact-name"
                              name="name"
                              autoComplete="name"
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-sans text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-250"
                            />
                          </div>

                          {/* Email */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-email" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                              Email
                            </label>
                            <input
                              id="contact-email"
                              name="email"
                              autoComplete="email"
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-sans text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-250"
                            />
                          </div>
                        </div>

                        {/* Phone Number (Single-column Full Width) */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-phone" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                            Phone Number
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            autoComplete="tel"
                            type="tel"
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="+91 94432 18915"
                            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-sans text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-250"
                          />
                        </div>

                        {/* Message / Special Requests */}
                        <div className="flex flex-col gap-2 flex-grow">
                          <label htmlFor="contact-message" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                            Specific Requirements & Ground Conditions
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Any specific wind speed criteria, soil reports, profile dimensions, or customized requests?"
                            rows={4}
                            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-sans text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-250 resize-none flex-grow"
                          />
                        </div>

                        {/* Action Row: Pill Button + Circle Indicator */}
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={contactLoading}
                            className="bg-black hover:bg-slate-900 text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full tracking-wider uppercase transition-all duration-250 select-none cursor-pointer flex-shrink-0 flex items-center gap-2"
                          >
                            {contactLoading ? "Processing..." : "Send Message"}
                          </button>

                          <button
                            type="submit"
                            disabled={contactLoading}
                            className="w-12 h-12 rounded-full bg-black hover:bg-slate-900 text-white flex items-center justify-center transition-all duration-250 select-none cursor-pointer flex-shrink-0"
                            aria-label="Submit Form"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-16 px-4 h-full my-auto"
                      >
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6">
                          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-spin-slow" style={{ animationDuration: "5s" }} />
                          <div className="absolute inset-[2.5px] rounded-full bg-white flex items-center justify-center">
                            <Check className="w-10 h-10 text-indigo-600 stroke-[3]" />
                          </div>
                        </div>

                        <h3 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">Inquiry Received!</h3>
                        <p className="font-sans text-[14px] text-slate-500 mt-3 leading-relaxed max-w-sm font-light">
                          Thank you, <span className="font-bold text-slate-800">{contactName}</span>. We've received your inquiry. Our structural engineering team will review your specifications and reach out to you at <span className="font-medium text-slate-800">{contactEmail}</span> within 24 hours.
                        </p>

                        <button
                          onClick={() => {
                            setContactName("");
                            setContactEmail("");
                            setContactPhone("");
                            setContactMessage("");
                            setContactSubmitted(false);
                          }}
                          className="mt-8 px-8 py-3 bg-black text-white hover:bg-slate-900 rounded-full font-sans text-xs font-bold tracking-wider uppercase shadow-sm transition-all cursor-pointer"
                        >
                          Send Another Inquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Image Column (5 cols) */}
              <div className="lg:col-span-5 h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative h-full min-h-[420px] md:min-h-[500px] lg:min-h-full rounded-[40px] overflow-hidden shadow-lg group"
                >
                  {/* VRM Structures Manufacturing Facility Building image */}
                  <img
                    src="/vrm-factory-building.jpg"
                    alt="VRM STRUCTURES Manufacturing Building"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Atmospheric Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top-Right pill: Manufacturing HQ */}
                  <div className="absolute top-6 right-6 px-5 py-2 rounded-full border border-white/35 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md bg-white/10 select-none">
                    Manufacturing Plant
                  </div>

                  {/* Bottom Image Caption Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-left text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">VRM Structures Facility</span>
                    <h4 className="font-sans text-lg sm:text-xl font-bold mt-1 text-white tracking-tight leading-snug">State-of-the-art manufacturing plant & corporate engineering hub.</h4>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Bottom Section: Three columns of contact details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-16 border-t border-slate-100 text-center">

              {/* Column 1: Call & WhatsApp */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:scale-105 transition-transform duration-300">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-sans text-[16px] font-bold text-slate-900">
                    Call & WhatsApp
                  </h4>
                  <div className="font-sans text-sm text-slate-500 font-light flex flex-col gap-0.5">
                    <a href="tel:+919884309789" className="hover:text-indigo-600 transition-colors font-medium text-slate-700">+91 98843 09789</a>
                  </div>
                </div>
              </div>

              {/* Column 2: Working Hours */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:scale-105 transition-transform duration-300">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-sans text-[16px] font-bold text-slate-900">
                    Working Hours
                  </h4>
                  <div className="font-sans text-sm text-slate-500 font-light flex flex-col gap-0.5">
                    <span>Mon – Sat: 09:30 AM – 06:30 PM</span>
                    <span>Sunday: Plant Maintenance</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Write Us */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] border border-slate-100 flex items-center justify-center text-slate-900 hover:scale-105 transition-transform duration-300">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-sans text-[16px] font-bold text-slate-900">
                    Write Us
                  </h4>
                  <div className="font-sans text-sm text-slate-500 font-light flex flex-col gap-0.5">
                    <a href="mailto:mms@vrmstructures.in" className="hover:text-indigo-600 transition-colors font-medium text-slate-700">mms@vrmstructures.in</a>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* --- OUR OFFICES SECTION --- */}
      <div className="bg-white relative z-10 w-full border-t border-b border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Section Header */}
          <div className="flex flex-col mb-12">
            <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 to-blue-600 animate-gradient-shift w-fit shadow-[0_4px_12px_rgba(99,102,241,0.15)] mb-4">
              <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                  Locations
                </span>
              </div>
            </div>
            <h3 className="font-display text-[30px] sm:text-[38px] font-bold text-slate-900 leading-tight">
              Our Offices
            </h3>
            <p className="font-sans text-slate-500 text-[15px] sm:text-[16px] font-light mt-2 max-w-2xl">
              Visit or connect with our corporate headquarters and regional branch locations across South India.
            </p>
          </div>

          {/* 3 Offices Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Head Office - Chennai */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                    <MapPin size={22} className="stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/60">
                    1. Head Office
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                  Chennai HQ
                </h4>
                <p className="font-sans text-xs font-semibold text-indigo-600 mb-4">
                  VRM Structures India Private Limited
                </p>
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-light">
                  No 1427, GNT Road,<br />
                  Nagappa Industrial Estate, Puzhal,<br />
                  Chennai – 600066, Tamil Nadu.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=VRM+Structures+No+1427+GNT+Road+Puzhal+Chennai+600066"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider group/link"
              >
                Get Directions
                <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>

            {/* 2. Branch Office - Tirupati */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                    <Building size={22} className="stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100/60">
                    2. Branch Office
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                  Tirupati Branch
                </h4>
                <p className="font-sans text-xs font-semibold text-sky-600 mb-4">
                  Tada Regional Hub
                </p>
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-light">
                  NO 150B,<br />
                  Perumal Kovil Street, Padi, Tada,<br />
                  Tirupati – 524401, Andhra Pradesh.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=NO+150B+Perumal+Kovil+Street+Padi+Tada+Tirupati+524401"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors uppercase tracking-wider group/link"
              >
                Get Directions
                <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>

            {/* 3. Branch Office - Nellore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
                    <Building size={22} className="stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100/60">
                    3. Branch Office
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                  Nellore Branch
                </h4>
                <p className="font-sans text-xs font-semibold text-purple-600 mb-4">
                  VRM Structures India Private Limited
                </p>
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-light">
                  No.684,<br />
                  Podalakur Road,<br />
                  Nellore – 524002, Andhra Pradesh.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=No.684+Podalakur+Road+Nellore+524002"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors uppercase tracking-wider group/link"
              >
                Get Directions
                <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
