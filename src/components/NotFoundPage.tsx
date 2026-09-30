import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Home, ShieldAlert } from 'lucide-react';
import { CityAboveCloudsBackground } from './Artworks';

interface NotFoundPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "downloads" | "login" | "quote" | "products" | "services" | "product-details" | "not-found", targetId?: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased flex flex-col min-h-screen pt-20 relative select-none">
      
      {/* Background Canvas */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <CityAboveCloudsBackground />
      </div>
      
      {/* Gradient Bottom Merge */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center py-20 text-center relative z-10">
        
        {/* Animated Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center mb-4"
        >
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-indigo-50/50 filter blur-3xl -z-10 animate-pulse" />
          <h1 className="font-display text-[100px] sm:text-[140px] font-extrabold text-slate-900 leading-none tracking-tighter relative select-all selection:bg-rose-200">
            404
          </h1>
        </motion.div>

        {/* Warning Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 text-xs font-bold uppercase tracking-wider mb-6"
        >
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" /> Route Not Found
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 max-w-xl leading-tight"
        >
          Lost in Orbit? This Page Doesn't Exist.
        </motion.h2>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mt-4 font-light px-4"
        >
          The page or structure drawing you are searching for has either been relocated or doesn't exist. Let's redirect you to safety.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <button
            onClick={() => onNavigate("home")}
            className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold text-xs px-8 py-4 rounded-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" /> Go to Home
          </button>
          
          <button
            onClick={() => onNavigate("products")}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-300 font-sans font-bold text-xs px-8 py-4 rounded-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02]"
          >
            Explore Products <ArrowRight className="w-4 h-4 text-indigo-500" />
          </button>
        </motion.div>

        {/* Dynamic Help Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-slate-500 text-xs font-light"
        >
          Need custom mounting layouts? <button onClick={() => onNavigate("contact")} className="underline font-medium text-slate-700 hover:text-indigo-600 transition-colors">Contact Support</button>
        </motion.div>

      </div>
    </div>
  );
}
