import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Compass, ShieldCheck } from 'lucide-react';

interface SupplyTab {
  id: string;
  tabLabel: string;
  name: string;
  badge: string;
  description: string;
  isDomestic: boolean;
  statesList?: string[];
  zonesList?: {
    title: string;
    sub: string;
  }[];
}

const TABS_DATA: SupplyTab[] = [
  {
    id: "states-supply",
    tabLabel: "States We Supply",
    name: "Domestic Reach",
    badge: "India Supply",
    description: "We have supplied to 28+ states including Tamil Nadu, Karnataka, Maharashtra, Gujarat, Rajasthan, Uttar Pradesh, Telangana, Andhra Pradesh, Kerala, West Bengal, Odisha, Madhya Pradesh, Punjab, Haryana, and more.",
    isDomestic: true,
    statesList: [
      "Tamil Nadu",
      "Karnataka",
      "Maharashtra",
      "Gujarat",
      "Rajasthan",
      "Uttar Pradesh",
      "Telangana",
      "Andhra Pradesh",
      "Kerala",
      "West Bengal",
      "Odisha",
      "Madhya Pradesh",
      "Punjab",
      "Haryana",
      "+ more States"
    ]
  },
  {
    id: "countries-supply",
    tabLabel: "Countries We Supply",
    name: "Global Footprint",
    badge: "Global Exports",
    description: "Our supply capabilities export high-performance structures globally, delivering certified load-tested metal structural configurations across major emerging regional zones.",
    isDomestic: false,
    zonesList: [
      { title: "Middle East Zone", sub: "Arid ground frameworks" },
      { title: "Southeast Asia", sub: "Moisture-resistant coating" },
      { title: "South Asia Regions", sub: "High wind-stress arrays" },
      { title: "East African Corridor", sub: "Corrosion-proof materials" }
    ]
  }
];

export default function FootprintMap() {
  const [activeTab, setActiveTab] = useState<SupplyTab>(TABS_DATA[0]);

  return (
    <div className="w-full flex flex-col mt-4 text-left">
      
      {/* 2-Column Grid Layout: Content Left, Globe Video Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
        
        {/* Left Column: Region Details and Switcher Tabs */}
        <div className="lg:col-span-7 flex flex-col w-full">
          {/* Quick Region Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 mb-8">
            {TABS_DATA.map((tab) => {
              const isSelected = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.isDomestic ? "🇮🇳 " : "🌐 "}
                  {tab.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Details Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase w-fit mb-4">
                {activeTab.isDomestic ? <Compass size={12} className="stroke-[2.5]" /> : <Globe size={12} className="stroke-[2.5]" />}
                {activeTab.badge}
              </div>

              {/* Title & Description */}
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                {activeTab.name}
              </h3>

              <p className="font-sans text-slate-500 text-sm leading-relaxed mt-4 font-light max-w-2xl">
                {activeTab.description}
              </p>

              {/* Conditional Rendering based on Tab */}
              {activeTab.isDomestic && activeTab.statesList ? (
                /* Domestic States Badge Grid */
                <div className="flex flex-wrap gap-2.5 mt-8 border-t border-slate-100 pt-8">
                  {activeTab.statesList.map((state, idx) => {
                    const isMore = state === "+ more States";
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-colors duration-250 ${
                          isMore
                            ? 'bg-orange-50 border border-orange-200 text-orange-700 font-bold'
                            : 'bg-slate-50 border border-slate-200/60 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {!isMore && <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />}
                        {state}
                      </span>
                    );
                  })}
                </div>
              ) : (
                /* Global Target Zones Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 border-t border-slate-100 pt-8">
                  {activeTab.zonesList?.map((zone, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-1 hover:border-slate-200 transition-colors duration-250"
                    >
                      <span className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF8C42]" />
                        {zone.title}
                      </span>
                      <span className="font-sans text-xs text-slate-500 font-light leading-relaxed pl-3.5">
                        {zone.sub}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Premium Video Loop Container */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full aspect-video lg:aspect-square max-w-[440px] mx-auto overflow-hidden pointer-events-none select-none">
          {/* HTML5 Autoplayer Loop Video representing Solar Plant Drone footage */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-[2rem] mix-blend-multiply"
            src="/Globe_spinning_left_to_right_202607161229.mp4"
          />
        </div>

      </div>
    </div>
  );
}
