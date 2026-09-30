import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface ScrollDownButtonProps {
  targetId?: string;
  className?: string;
}

export function ScrollDownButton({ targetId, className = "" }: ScrollDownButtonProps) {
  const handleScroll = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: window.innerHeight * 0.75, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`flex justify-center items-center py-4 z-20 ${className}`}
    >
      <button
        onClick={handleScroll}
        className="group flex items-center gap-2 bg-white/75 hover:bg-white backdrop-blur-md border border-slate-200/90 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 px-4.5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none"
        aria-label="Scroll down"
      >
        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600 group-hover:text-indigo-600 transition-colors">
          Scroll Down
        </span>
        <div className="w-5.5 h-5.5 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
          <ChevronDown size={14} className="stroke-[2.5] text-slate-600 group-hover:text-indigo-600 animate-bounce" />
        </div>
      </button>
    </motion.div>
  );
}

export default ScrollDownButton;
