import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useMediaImage } from '../lib/mediaStore';

export default function AboutSection() {
  // Live image URLs — update instantly when changed in Media Library admin panel
  const steelCoilsImg       = useMediaImage('about_steel_coils');
  const steelProfilesImg    = useMediaImage('about_steel_profiles');
  const manufacturingImg    = useMediaImage('about_manufacturing');
  const heroImg             = useMediaImage('shared_hero_banner');
  const laserCncImg         = useMediaImage('about_laser_cnc');
  const solarHardwareImg    = useMediaImage('about_hardware');
  const qualityAssuranceImg = useMediaImage('about_quality');

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const bentoItemVariants: any = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const textColumnVariants: any = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section 
      id="about" 
      className="w-full max-w-[1441px] mx-auto bg-[#FFFFFF] py-[70px] px-4 sm:px-8 md:px-[50px] flex flex-col items-start gap-[10px] order-1 flex-none grow-0 overflow-hidden"
    >
      <div className="w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Staggered Bento Grid representing the original grey shapes */}
          <motion.div 
            className="lg:col-span-6 order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="relative p-2 bg-slate-50/50 rounded-3xl border border-slate-100 flex flex-wrap justify-center gap-4 max-w-lg mx-auto">
              
              {/* Box 1 (120x120 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[120px] h-[120px] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={steelCoilsImg} alt="steel fabrication materials" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 2 (122x141 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[122px] h-[141px] rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <img src={steelProfilesImg} alt="steel mounting structures" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 3 (167x170 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[167px] h-[170px] rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={manufacturingImg} alt="robotic steel welding" className="w-full h-full object-cover animate-pulse-slow" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 4 (171x171 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[171px] h-[171px] rounded-3xl shadow-xl shadow-teal-950/10 overflow-hidden hover:scale-[1.03] transition-transform duration-300"
              >
                <img src={heroImg} alt="galvanized earth-mount framing" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 5 (148x108 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[148px] h-[108px] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={laserCncImg} alt="C-channel laser cutting" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 6 (167x170 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[167px] h-[170px] rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={solarHardwareImg} alt="solar mounting bolts fasteners" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
              {/* Box 7 (99x100 shape) */}
              <motion.div 
                variants={bentoItemVariants}
                className="w-[99px] h-[100px] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={qualityAssuranceImg} alt="ISO certified quality parameters" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
 
            </div>
          </motion.div>
 
          {/* Right Column: Information content */}
          <motion.div 
            className="lg:col-span-6 order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textColumnVariants}
          >
            <div className="flex items-center mb-4">
              <span className="font-mono text-[#003579] font-bold text-[12px]">About us</span>
            </div>
 
            <h2 className="font-display font-bold text-[30px] text-slate-900 tracking-tight leading-tight">
              Leading Solar <span className="font-bold" style={{color: '#0057b8'}}>Module Mounting Structure</span> Manufacturer in India
            </h2>

            <p className="mt-6 text-md text-slate-650 leading-relaxed font-normal">
              <span className="font-semibold text-slate-900">VRM Structures India Pvt. Ltd.</span> specializes in high-quality Solar MMS solutions engineered for durability, safety, and performance. Our precision-manufactured structures support rooftop, ground-mounted, and utility-scale solar projects with industry-leading quality and reliability.
            </p>

            <p className="mt-4 text-md text-slate-650 leading-relaxed font-normal">
              We specialize in designing and manufacturing advanced solar mounting systems that combine strength, precision, and long-term reliability. Our solutions are engineered to maximize project performance while ensuring quick installation, superior durability, and seamless scalability for solar projects across India.
            </p>

            <p className="mt-4 text-sm text-slate-700 leading-relaxed font-normal italic bg-slate-50 border-l-4 border-teal-400 py-3.5 px-4 rounded-r-xl">
              "At VRM Structures, we are dedicated to manufacturing high-quality Solar Module Mounting Structures that ensure structural integrity, operational efficiency, and lasting performance for solar projects across India."
            </p>
 
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Built for Long-Term Performance</h4>
                  <p className="text-[14px] text-slate-500 mt-0.5">Engineered with corrosion-resistant materials to ensure decades of reliable service.</p>
                </div>
              </div>
 
              <div className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Designed for Maximum Compatibility</h4>
                  <p className="text-[14px] text-slate-500 mt-0.5">Supporting monofacial, bifacial, and glass-glass modules across diverse solar applications.</p>
                </div>
              </div>
            </div>
 
            <div className="mt-10">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer"
              >
                Learn More
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
 
          </motion.div>
 
        </div>
 
      </div>
    </section>
  );
}
