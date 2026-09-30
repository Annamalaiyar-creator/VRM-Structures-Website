import React, { useState, Suspense, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  Building, 
  Layout, 
  Car, 
  Wrench, 
  Shield, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  Settings,
  Search,
  Sun
} from "lucide-react";
import { 
  ImagineLogo, 
  HeroVideoBackground,
  HeroImageBackground 
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";

const Product3DViewer = React.lazy(() => import("./Product3DViewer"));

interface ProductsPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote" | "product-details", targetId?: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function ProductsPage({ onNavigate, selectedCategory, setSelectedCategory }: ProductsPageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<"category" | null>(null);

  const productData = [
    {
      title: "RCC Roof MMS",
      desc: "Robust flat-roof systems with ballasted foundations or anchor-fastened mounts, delivering exceptional wind resistance without damaging RCC waterproofing.",
      icon: <Building className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-800",
      category: "Mounting Structures",
      material: "Galvanized Steel",
      thickness: "2.0mm - 3.0mm"
    },
    {
      title: "Ground Mounted MMS",
      desc: "High-tensile hot-dip galvanized steel structures engineered for utility-scale solar farms, open fields, and extreme environmental wind loads.",
      icon: <Layout className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-emerald-600 via-teal-500 to-indigo-950",
      category: "Mounting Structures",
      material: "Galvanized Steel",
      thickness: "Over 3.0mm"
    },
    {
      title: "Carport MMS",
      desc: "Premium, architectural dual-use structures that provide durable vehicle shelter while generating clean, high-yield solar electricity.",
      icon: <Car className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-amber-500 via-rose-500 to-purple-700",
      category: "Mounting Structures",
      material: "High-Tensile Steel",
      thickness: "Over 3.0mm"
    },
    {
      title: "Customized MMS",
      desc: "Tailor-made solar mounting solutions engineered dynamically for complex topographies, specialized angles, and non-standard project geometries.",
      icon: <Wrench className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-800",
      category: "Mounting Structures",
      material: "Aluminum Alloy",
      thickness: "2.0mm - 3.0mm"
    },
    {
      title: "Aluminum Mounting Structure",
      desc: "Anodized, lightweight, and highly aesthetic aluminum structures optimized for rooftop and high-salinity coastal installations.",
      icon: <Building className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800",
      category: "Aluminum & FRP Solutions",
      material: "Aluminum Alloy",
      thickness: "1.5mm - 2.0mm"
    },
    {
      title: "Hot Dip Galvanized Structures",
      desc: "Heavy-duty hot-dip galvanized steel structures built to withstand severe wind loads and corrosive outdoor environments.",
      icon: <Layout className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-slate-650 via-slate-500 to-indigo-900",
      category: "Aluminum & FRP Solutions",
      material: "Galvanized Steel",
      thickness: "Over 3.0mm"
    },
    {
      title: "FRP Walkway",
      desc: "Corrosion-proof Fibreglass Reinforced Plastic walkway panels designed for safe and durable solar rooftop maintenance access.",
      icon: <Shield className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-950",
      category: "Aluminum & FRP Solutions",
      material: "FRP Composite",
      thickness: "Over 3.0mm"
    },
    {
      title: "FRP Handrails",
      desc: "Non-conductive, lightweight, and highly weather-resistant handrail systems ensuring maximum safety across elevated solar plants.",
      icon: <Shield className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-teal-500 via-cyan-600 to-indigo-950",
      category: "Aluminum & FRP Solutions",
      material: "FRP Composite",
      thickness: "Over 3.0mm"
    },
    {
      title: "Solar Pump MMS",
      desc: "High-efficiency, lightweight, and robust mounting systems designed for off-grid irrigation pumps and rural agricultural installations.",
      icon: <Layout className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-indigo-550 via-sky-500 to-teal-800",
      category: "Mounting Structures",
      material: "Galvanized Steel",
      thickness: "2.0mm - 3.0mm",
      image: "/solar_pump_mms.jpg"
    },
    {
      title: "PM Surya Ghar Kit",
      desc: "Complete All-In-One VRMS-MAX PACK Balance of System mechanical & electrical installation kit for PM Surya Ghar residential rooftops including mounting structures, solar panels, inverters, cables, junction boxes & accessories.",
      icon: <Wrench className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-indigo-500 via-purple-650 to-pink-700",
      category: "BOS Solutions",
      material: "All-In-One Complete Kit",
      thickness: "VRMS-MAX PACK",
      image: "/vrms_bos_kit.jpg"
    },
    {
      title: "Terrabond Earthing Kit",
      desc: "Comprehensive Terrabond solar electrical grounding solutions, including copper-bonded earth rods, grounding clamps, chemical compound fill, and lightning arrestor connectors.",
      icon: <Shield className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-amber-600 via-orange-500 to-rose-800",
      category: "BOS Solutions",
      material: "Copper / HDG Steel",
      thickness: "Over 3.0mm",
      image: "/vrm_earthing_kit_fit.png"
    },
    {
      title: "Solar Panels (Tier-1 PV Modules)",
      desc: "High-efficiency N-Type TOPCon & HJT dual-glass bifacial solar panels (550Wp – 730Wp) engineered for utility solar farms, commercial rooftops, and high-yield micro-grids.",
      icon: <Sun className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-amber-500 via-orange-600 to-indigo-950",
      category: "BOS Solutions",
      material: "Tier-1 Dual-Glass Bifacial",
      thickness: "550Wp - 730Wp",
      image: "/solar_panels_modules.png"
    },
    {
      title: "Inverters (Polycab & Deye)",
      desc: "High-efficiency Polycab grid-tied string inverters & top-tier Deye hybrid storage inverters with intelligent MPPT tracking and IP65 protection.",
      icon: <Settings className="text-white stroke-[1.5] w-14 h-14" size={56} />,
      bg: "bg-gradient-to-br from-rose-600 via-indigo-600 to-slate-900",
      category: "BOS Solutions",
      material: "Polycab & Deye OEM / IP65",
      thickness: "3kW - 100kW",
      image: "/polycab_deye_inverters.png"
    }
  ];

  const filteredProducts = productData.filter((prod) => {
    if (selectedCategory !== "All Categories" && prod.category !== selectedCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = prod.title.toLowerCase().includes(q);
      const matchDesc = prod.desc.toLowerCase().includes(q);
      const matchCategory = prod.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">
      
      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        
        {/* PHOTOGRAPHIC HERO BACKGROUND (COMMERCIAL ROOFTOP & CARPORT MMS COMPLEX) */}
        <HeroImageBackground src="/images/hero-products.jpg" alt="VRM Structures Solar Mounting Structure Solutions" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Solar Mounting Solutions Built for Global Standards
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Explore our range of Metal Roof MMS, RCC Roof MMS, Customized MMS, Ground Mounted MMS, Solar Pump MMS, and Carport MMS engineered dynamically for your projects.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="products-explorer" />
        </div>
      </div>

      {/* PRODUCTS EXPLORER SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 pb-32" id="products-explorer">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header exactly like other sections */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16 border-b border-slate-100 pb-10">
            
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
                    Products
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
                Our Product Portfolio
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-500 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
              >
                High-performance solar module mounting structures, safety walkways, and Balance of System accessories built to certified engineering standards.
              </motion.p>
            </div>

          </div>

          {/* Filter and Search Controls (Right Aligned) */}
          <div className="mb-12 flex flex-wrap gap-4 items-center justify-end">
            {/* Search Input */}
            <div className="relative min-w-[220px] sm:min-w-[280px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="search-products"
                name="searchProducts"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 placeholder-slate-400 text-[13px] font-medium pl-10 pr-8 py-3 rounded-xl transition-all duration-200 outline-none shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Dropdown 1: Category */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "category" ? null : "category")}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[13px] font-semibold px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-sm min-w-[190px] justify-between"
              >
                <span>{selectedCategory}</span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${activeDropdown === "category" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "category" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden py-1.5"
                  >
                    {["All Categories", "Mounting Structures", "Aluminum & FRP Solutions", "BOS Solutions"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedCategory(opt);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-[12.5px] hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-slate-700 font-medium"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset Button */}
            {(selectedCategory !== "All Categories" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSearchQuery("");
                }}
                className="text-[12.5px] text-indigo-600 font-bold hover:text-indigo-800 transition-colors px-2 py-2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod, index) => {
              const splitTitle = (title: string) => {
                const words = title.split(" ");
                if (words.length <= 1) return { main: title, sub: "" };
                const sub = words.pop();
                const main = words.join(" ");
                return { main, sub };
              };
              const { main, sub } = splitTitle(prod.title);

              // Determine category dot color
              const dotColor = prod.category === "Roof Mount" 
                ? "bg-sky-500" 
                : prod.category === "Ground Mount" 
                ? "bg-emerald-500" 
                : "bg-amber-500";

              return (
                <motion.div
                  key={prod.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                  className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* 1. Structural / Product Visual Representation Container */}
                  <div className="w-full h-56 rounded-[1.75rem] bg-[#1e293b] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden group perspective-1000">
                    {!prod.image ? (
                      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-light">Loading 3D Model...</div>}>
                        {prod.title.toLowerCase().includes("galvanized") ? (
                          <Product3DViewer url="/RCC.bin" autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("rcc") ? (
                          <Product3DViewer url="/RCC_Design.bin" autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("ground mounted") ? (
                          <Product3DViewer url="/Ground_Mounted.bin" zoom={1.3} autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("carport") ? (
                          <Product3DViewer url="/Carport_Design.bin" zoom={0.95} autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("customized") ? (
                          <Product3DViewer url="/Customized.bin" zoom={1.2} autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("aluminum") ? (
                          <Product3DViewer url="/Aluminum.bin" zoom={0.8} autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("handrail") ? (
                          <Product3DViewer url="/Handrail.bin" zoom={1.2} autoRotate={true} />
                        ) : prod.title.toLowerCase().includes("walkway") ? (
                          <Product3DViewer url="/WALK_WAY.bin" zoom={1.2} autoRotate={true} />
                        ) : (
                          <div className="text-slate-400 text-xs">No Model</div>
                        )}
                      </Suspense>
                    ) : prod.image ? (
                      <img 
                        src={prod.image} 
                        alt={prod.title} 
                        className="w-full h-full object-cover rounded-[1.75rem] transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <>
                        <div className="relative w-44 h-32 transform rotate-x-[35deg] rotate-z-[-45deg] transform-style-3d transition-transform duration-700 group-hover:scale-105 group-hover:rotate-x-[40deg] group-hover:rotate-z-[-35deg] flex items-center justify-center">
                          
                          {/* Support Pillars */}
                          <div className="absolute w-[6px] h-20 bg-slate-200/90 border border-slate-300 shadow-md transform -translate-x-12 translate-z-10 rounded-full" />
                          <div className="absolute w-[6px] h-24 bg-slate-100/90 border border-slate-300 shadow-md transform translate-x-12 translate-z-10 rounded-full" />
                          
                          {/* Truss Channels */}
                          <div className="absolute w-36 h-2 bg-gradient-to-r from-slate-400 to-slate-200 border-t border-slate-100 shadow-sm transform -rotate-12 translate-y-2 translate-z-20 rounded-md" />
                          <div className="absolute w-36 h-2 bg-gradient-to-r from-slate-400 to-slate-200 border-t border-slate-100 shadow-sm transform -rotate-12 -translate-y-8 translate-z-20 rounded-md" />
                          
                          {/* Profile Channel Rails */}
                          <div className="absolute w-2 h-28 bg-gradient-to-b from-indigo-300 to-slate-400/80 shadow-md transform rotate-x-[90deg] translate-x-8 translate-z-24 rounded-sm" />
                          <div className="absolute w-2 h-28 bg-gradient-to-b from-indigo-300 to-slate-400/80 shadow-md transform rotate-x-[90deg] -translate-x-8 translate-z-24 rounded-sm" />

                          {/* Solar PV Panel Array */}
                          <div className="absolute w-24 h-16 bg-gradient-to-br from-indigo-500/80 via-blue-600/95 to-slate-900 border border-indigo-400/40 shadow-2xl transform -rotate-12 -translate-y-2 translate-z-28 rounded-lg opacity-90 flex flex-col justify-between p-1.5 overflow-hidden">
                            <div className="w-full h-full grid grid-cols-3 gap-0.5 pointer-events-none opacity-40">
                              <div className="border border-white/20" />
                              <div className="border border-white/20" />
                              <div className="border border-white/20" />
                              <div className="border border-white/20" />
                              <div className="border border-white/20" />
                              <div className="border border-white/20" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </>
                    )}
                  </div>

                  {/* 2. Specs Pills (Horizontal Row) */}
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {/* Category Pill with colored dot */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      {prod.category}
                    </div>

                    {/* Material Pill */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <Shield size={11} className="text-slate-400" />
                      {prod.material}
                    </div>
                  </div>

                  {/* 3. Product Title & Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-[26px] font-bold text-slate-950 tracking-tight leading-none">
                        {main}
                        {sub && <span className="block text-slate-400 font-bold text-[26px] tracking-tight leading-none mt-1">{sub}</span>}
                      </h3>
                      <p className="text-slate-500 font-normal text-[13px] leading-[20px] mt-4">
                        {prod.desc}
                      </p>
                    </div>
                    
                    {/* 4. Action button */}
                    <button 
                      onClick={() => onNavigate("product-details", prod.title)}
                      className="mt-6 w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-[12px] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      View the Product
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
