import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function Manufacturing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const latestTargetTimeRef = useRef(0);

  // Direct fast seeking handler that doesn't drop frames
  const seekVideo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    latestTargetTimeRef.current = time;
    if (!video.seeking) {
      video.currentTime = time;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;
    if (Math.abs(video.currentTime - latestTargetTimeRef.current) > 0.05) {
      video.currentTime = latestTargetTimeRef.current;
    }
  };

  // 1. Direct window scroll listener for 100% rock-solid scrubbing
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;
      if (totalScrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollableDistance));
      
      const totalDur = video.duration && !Number.isNaN(video.duration) ? video.duration : 20;
      const targetTime = progress * totalDur;

      seekVideo(targetTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Framer motion useScroll as complementary listener
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video) return;

    const totalDur = video.duration && !Number.isNaN(video.duration) ? video.duration : 20;
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const targetTime = clampedProgress * totalDur;

    seekVideo(targetTime);
  });

  return (
    <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-0" id="manufacturing">
      
      {/* Standard Section Heading Container (Matches all other sections on the site) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <section className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left">
            
            {/* Left Column Badge */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-2"
            >
              <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                    Our Process
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column Title & Subtitle */}
            <div className="flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
              >
                In-House{" "}
                <span className="inline-flex items-center gap-1.5 bg-[#E0F2F1] text-[#00796B] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#B2DFDB]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  <Settings size={15} className="stroke-[2.5]" />
                  Manufacturing
                </span>{" "}
                Process
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 sm:mt-6 font-light"
              >
                Experience our complete end-to-end solar MMS manufacturing workflow in action. From raw high-tensile steel coil testing to roll forming, CNC punching, hot-dip galvanizing, and dispatch — scroll down to scrub through each process stage.
              </motion.p>
            </div>
            
          </div>
        </section>
      </div>

      {/* Full-Size Edge-to-Edge Sticky Scroll Video Container (Clean Video Only, Zero Overlays) */}
      <div 
        ref={containerRef} 
        id="manufacturing-video"
        className="relative w-full bg-slate-950"
        style={{ height: '240vh' }}
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
          
          {/* 1 Single Merged 20s Video (Full-Size Edge-to-Edge) */}
          <video
            ref={videoRef}
            src="/videos/inhouse-process.mp4"
            poster="/videos/thumbnails/1.mp4.png"
            muted
            playsInline
            preload="auto"
            onSeeked={handleSeeked}
            className="w-full h-full object-cover select-none pointer-events-none"
          />

        </div>
      </div>
    </div>
  );
}
