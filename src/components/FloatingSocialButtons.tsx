import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, ChevronUp } from "lucide-react";

export default function FloatingSocialButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    {
      name: "WhatsApp",
      label: "+91 98843 09789",
      url: "https://wa.me/919884309789?text=Hello%20VRM%20Structures",
      icon: (
        <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current text-slate-800" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.766.46 3.49 1.334 5.006L2 22l5.127-1.336c1.464.798 3.116 1.22 4.881 1.22 5.508 0 9.99-4.478 9.991-9.985 0-2.665-1.038-5.17-2.925-7.057A9.92 9.92 0 0 0 12.012 2zm.001 1.666c4.59 0 8.324 3.734 8.325 8.324 0 2.223-.865 4.312-2.44 5.886a8.27 8.27 0 0 1-5.885 2.44c-1.48 0-2.924-.39-4.186-1.127l-.3-.178-3.045.795.808-2.97-.196-.312A8.28 8.28 0 0 1 3.679 11.99c0-4.59 3.734-8.324 8.334-8.324zm-3.523 4.2c-.172 0-.455.064-.694.322-.238.258-.913.892-.913 2.176 0 1.284.935 2.524 1.064 2.696.129.172 1.839 2.809 4.457 3.94.623.269 1.109.43 1.488.55.626.198 1.196.17 1.646.103.501-.075 1.543-.631 1.761-1.24.218-.609.218-1.132.153-1.24-.064-.108-.238-.172-.51-.308s-1.543-.761-1.782-.848c-.238-.087-.412-.129-.586.129-.172.258-.673.848-.824 1.02-.151.172-.301.193-.573.057s-1.149-.424-2.19-1.353c-.81-.722-1.356-1.614-1.515-1.886-.159-.272-.017-.419.119-.554.122-.122.272-.315.408-.473.136-.158.181-.272.272-.454.091-.182.045-.343-.023-.48-.068-.136-.586-1.411-.803-1.932-.212-.507-.428-.438-.586-.446l-.501-.008z" />
        </svg>
      )
    },
    {
      name: "Phone",
      label: "+91 98843 09789",
      url: "tel:+919884309789",
      icon: <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-800 stroke-[2]" />
    },
    {
      name: "Mail",
      label: "mms@vrmstructures.in",
      url: "mailto:mms@vrmstructures.in",
      icon: <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-800 stroke-[2]" />
    }
  ];

  return (
    <aside aria-label="Quick action links" className="fixed right-4 bottom-6 z-[999] flex flex-col gap-2.5 items-center select-none">
      {/* Separate Round Action Buttons (Completely Still on Hover) */}
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target={item.url.startsWith("http") ? "_blank" : undefined}
          rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group relative p-[1.5px] rounded-full bg-gradient-to-b from-blue-600 via-indigo-500 via-purple-600 to-blue-600 animate-gradient-shift shadow-[0_4px_14px_rgba(99,102,241,0.18)] cursor-pointer flex items-center justify-center"
          aria-label={item.label}
        >
          {/* Inner Clean White Round Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-slate-800">
            {item.icon}
          </div>

          {/* Perfectly Vertically Centered Right-to-Left Slide-in Hover Label */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900 text-white text-[12px] font-medium tracking-wide rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-out whitespace-nowrap translate-x-4 group-hover:translate-x-0 border border-slate-800 leading-none flex items-center">
            {item.label}
          </span>
        </a>
      ))}

      {/* Separate Scroll-to-Top Button (Completely Still on Hover) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-[1.5px] rounded-full bg-gradient-to-b from-blue-600 via-indigo-500 to-purple-600 animate-gradient-shift shadow-[0_4px_14px_rgba(99,102,241,0.18)] flex items-center justify-center"
          >
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex flex-col items-center justify-center text-slate-800 cursor-pointer group relative"
              aria-label="Scroll to top"
            >
              {/* Custom icon with top line and upward chevron */}
              <div className="flex flex-col items-center justify-center gap-0.5">
                <div className="w-3 h-[1.75px] bg-slate-800 rounded-full" />
                <ChevronUp className="w-4 h-4 text-slate-800 stroke-[2.5] -mt-1" />
              </div>

              {/* Perfectly Vertically Centered Right-to-Left Slide-in Hover Label */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900 text-white text-[12px] font-medium tracking-wide rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-out whitespace-nowrap translate-x-4 group-hover:translate-x-0 border border-slate-800 leading-none flex items-center">
                Scroll to Top
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
