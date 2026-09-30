import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  FileText, Download, ShieldCheck, CheckCircle2,
  ArrowRight, ArrowLeft, Search, Sparkles, ArrowUpRight,
  Zap, Sun, BookOpen
} from 'lucide-react';
import { HeroVideoBackground, HeroImageBackground } from './Artworks';
import ScrollDownButton from './ScrollDownButton';
import { DOWNLOADS_DATA, DownloadItem } from './DatasheetDetailPage';
import SEO from './SEO';

type SectionCategory = 'Inverters' | 'Solar Panels' | 'Brochures';

interface SectionConfig {
  id: string;
  title: string;
  category: SectionCategory;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  description: string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'inverters',
    title: 'Inverters',
    category: 'Inverters',
    icon: Zap,
    badge: 'Power Conversion & Grid Systems',
    description: 'Technical datasheets, MPPT specifications, and electrical engineering guides for solar grid-tied, commercial, and hybrid inverters.'
  },
  {
    id: 'solar-panels',
    title: 'Solar Panels',
    category: 'Solar Panels',
    icon: Sun,
    badge: 'Photovoltaic Modules',
    description: 'Certified manufacturer technical specifications for high-efficiency TOPCon, Mono PERC, and N-Type Bifacial dual-glass solar PV modules.'
  },
  {
    id: 'brochures',
    title: 'Brochures',
    category: 'Brochures',
    icon: BookOpen,
    badge: 'Catalogs & Product Literature',
    description: 'Official VRM Structures corporate profile, solar mounting systems catalogue, and PM Surya Ghar residential solar kit specifications.'
  }
];

export default function DownloadsPage({ onNavigateToQuote }: { onNavigateToQuote?: () => void }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#downloads/")) {
        const id = hash.replace("#downloads/", "");
        const item = DOWNLOADS_DATA.find(d => d.id === id);
        if (item) {
          setSelectedItem(item);
          window.scrollTo(0, 0);
          return;
        }
      }
      setSelectedItem(null);

      // Handle direct scrolling to section from navigation dropdown
      if (hash.includes("category=solar-panels") || hash.includes("solar-panels")) {
        setTimeout(() => {
          document.getElementById("solar-panels")?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else if (hash.includes("category=inverters") || hash.includes("inverters")) {
        setTimeout(() => {
          document.getElementById("inverters")?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else if (hash.includes("category=brochures") || hash.includes("brochures")) {
        setTimeout(() => {
          document.getElementById("brochures")?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Filter sections and their respective items
  const query = searchQuery.trim().toLowerCase();
  const visibleSections = SECTIONS.map(sec => {
    const items = DOWNLOADS_DATA.filter(item => {
      if (item.category !== sec.category) return false;
      if (!query) return true;
      return item.title.toLowerCase().includes(query) ||
             item.description.toLowerCase().includes(query) ||
             item.badge.toLowerCase().includes(query);
    });
    return {
      ...sec,
      items
    };
  }).filter(sec => {
    // Hide empty sections when searching
    if (query) return sec.items.length > 0;
    return true;
  });

  const totalMatchingItems = visibleSections.reduce((acc, sec) => acc + sec.items.length, 0);

  if (selectedItem) {
    return (
      <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen pt-20">
        <SEO
          title={selectedItem.seoTitle || selectedItem.title}
          description={selectedItem.seoDescription || selectedItem.description}
          canonicalUrl={`https://vrmstructures.in/#downloads/${selectedItem.id}`}
          ogType="article"
          schema={{
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": selectedItem.title,
            "description": selectedItem.description,
            "encodingFormat": "application/pdf",
            "url": `https://vrmstructures.in${selectedItem.pdfUrl}`,
            "publisher": {
              "@type": "Organization",
              "name": "VRM Structures India Private Limited"
            }
          }}
        />
        
        {/* HERO SECTION */}
        <div className="relative overflow-hidden w-full min-h-[50vh] flex flex-col justify-between pt-10 bg-slate-950">
          <HeroImageBackground src="/images/hero-downloads.jpg" alt="VRM Structures Technical Blueprints & Downloads" />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10">
            <main className="py-12 md:py-16 text-left z-10">
              <a
                href="#downloads"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 mb-6 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to all downloads
              </a>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-indigo-600/80 backdrop-blur-md text-white border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
                  {selectedItem.badge}
                </span>
                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/20">
                  {selectedItem.format} • {selectedItem.fileSize}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-4xl leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {selectedItem.title}
              </h1>

              <p className="font-sans text-slate-100 text-sm sm:text-base leading-relaxed max-w-3xl mt-4 font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                {selectedItem.description}
              </p>
            </main>
          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="bg-white relative z-10 w-full border-t border-slate-200/50 py-16 md:py-24">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#E5E7EB]/40 border-[6px] border-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" /> Verified Technical Specification Sheet
                </div>

                <a
                  href={selectedItem.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold text-xs px-8 py-4 rounded-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] shrink-0"
                >
                  <FileText className="w-4 h-4" /> View PDF in Browser ({selectedItem.fileSize})
                </a>
              </div>

              {/* Overview Content */}
              <div className="mt-8 prose max-w-none text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Engineering Overview & Applications</h2>
                <div className="whitespace-pre-line font-light text-slate-600">
                  {selectedItem.contentPlaceholder}
                </div>
              </div>

              {/* Related Products Link Section */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100">
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-900">Compatible Solar Mounting Systems</h4>
                  <p className="font-sans text-xs text-slate-600 font-light mt-1">
                    Explore VRM Structures' hot-dip galvanized and aluminum mounting structures engineered to fit this component.
                  </p>
                </div>
                <a href="#products" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider shrink-0">
                  View Related VRM Products <ArrowRight size={14} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen select-none">
      
      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        
        {/* PHOTOGRAPHIC HERO BACKGROUND (SOLAR MOUNTING BLUEPRINTS & TECHNICAL SPECS) */}
        <HeroImageBackground src="/images/hero-downloads.jpg" alt="VRM Structures Solar Mounting Blueprints & Technical Documentation" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Downloads & Technical Specifications
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Access certified engineering literature organized across Inverters, Solar Panels, and Brochures for turnkey solar installations.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="downloads-content" />
        </div>
      </div>

      {/* WHITE SECTION CONTAINER FOR 3 SECTIONS: INVERTERS, SOLAR PANELS & BROCHURES */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-16 md:pt-20 pb-24 sm:pb-32 overflow-hidden" id="downloads-content">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* TOP CONTROLS: SEARCH & DOCUMENT COUNT */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 pb-8 border-b border-slate-200/80">
            <div className="text-slate-600 font-sans text-xs sm:text-sm font-medium">
              Showing <span className="font-bold text-slate-950 font-mono">{totalMatchingItems}</span> technical datasheets & documents across all categories
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="search-downloads"
                name="searchQuery"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search inverters, panels, brochures..."
                className="w-full pl-11 pr-14 py-2.5 rounded-full bg-slate-50 border-2 border-slate-200 text-xs font-sans font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px] font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* 3 DISTINCT SECTIONS */}
          {visibleSections.length > 0 ? (
            <div className="space-y-20">
              {visibleSections.map((sec, secIdx) => {
                const IconComp = sec.icon;
                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className={`${secIdx > 0 ? "pt-14 border-t border-slate-200/80" : ""}`}
                  >
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 bg-slate-100 text-slate-700 border border-slate-200/80">
                          <IconComp className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{sec.badge}</span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight flex items-center gap-3">
                          {sec.title}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-slate-600 font-light mt-1 max-w-2xl leading-relaxed">
                          {sec.description}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 font-mono text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80 self-start sm:self-auto">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sec.items.length} {sec.items.length === 1 ? 'Document' : 'Documents'}</span>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-left">
                      {sec.items.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            {/* Top Badge & Format Pill */}
                            <div className="flex items-center justify-between gap-4 mb-6">
                              <span className="px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 border border-indigo-200/60 text-[11px] font-bold uppercase tracking-wider">
                                {item.badge}
                              </span>
                              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-500">
                                <span className="px-2.5 py-1 rounded-lg bg-white/90 text-slate-900 shadow-sm border border-slate-200/60">{item.format}</span>
                                <span>{item.fileSize}</span>
                              </div>
                            </div>

                            {/* Title linking to individual datasheet page */}
                            <a href={`#downloads/${item.id}`} className="block cursor-pointer">
                              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug tracking-tight">
                                {item.title}
                              </h3>
                            </a>

                            {/* Description */}
                            <p className="font-sans text-xs sm:text-sm text-slate-600 font-light mt-3 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Download & View Details Buttons */}
                          <div className="pt-6 mt-8 border-t border-slate-200/80 flex items-center justify-between gap-3">
                            <a
                              href={`#downloads/${item.id}`}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                            >
                              View Spec Page <ArrowRight size={14} />
                            </a>

                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold text-xs px-5 py-3 rounded-2xl tracking-wider uppercase transition-all duration-250 cursor-pointer flex items-center gap-2 select-none shadow-md hover:scale-[1.02]"
                            >
                              <FileText className="w-4 h-4" /> View PDF
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-12 text-center shadow-sm max-w-xl mx-auto my-8">
              <p className="text-slate-600 text-sm font-medium">No engineering documents found matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('All');
                }}
                className="mt-4 px-6 py-3 bg-slate-950 text-white text-xs font-bold rounded-2xl cursor-pointer shadow-md hover:bg-slate-900 transition-all"
              >
                Reset Filters & Search
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
