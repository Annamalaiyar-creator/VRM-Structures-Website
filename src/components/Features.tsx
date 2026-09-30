import React from 'react';
import { ShieldCheck, HardHat, Cog, PencilRuler, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const headerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featureLeftVariants: any = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const featureRightVariants: any = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
    }
  };

  return (
    <section id="features" className="py-[70px] px-4 sm:px-8 md:px-[50px] bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          className="max-w-3xl mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1 w-8 bg-teal-500 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-display">Our Features</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            High Range of Innovative <span className="font-bold" style={{color: '#0057b8'}}>Mounting Systems.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Feature 1 */}
          <motion.div 
            className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50 hover:border-blue-300 transition-all duration-200 ease-out"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={featureLeftVariants}
          >
            <div>
              <div className="p-4 bg-teal-400/10 rounded-2xl text-teal-605 self-start inline-block mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="font-display font-semibold text-xl text-slate-900 mb-4">
                Comprehensive Solar Mounting Solutions
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                VRM Structures delivers precision-engineered mounting systems that form the backbone of efficient solar installations. From rooftop applications to large-scale solar parks, our solutions are designed to ensure maximum structural integrity, faster installation, and long-term reliability.
              </p>

              <div className="space-y-3.5">
                {[
                  'Ground Mount Structures (Ramming, Concrete & Screw Foundations)',
                  'Residential & Industrial Rooftop Systems',
                  'Solar Carports with Integrated Drainage Design',
                  'High-Strength Light Gauge Steel C & Z Channels',
                  'Customized MMS Solutions for Diverse Project Requirements',
                  'Corrosion-Resistant Structures for Extended Service Life'
                ].map((item, id) => (
                  <div key={id} className="flex gap-2.5 items-center text-xs text-slate-700 font-medium bg-white/70 border border-slate-100 p-3 rounded-xl shadow-xs hover:border-blue-200 hover:bg-white transition-all duration-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-blue-500/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 ease-out"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={featureRightVariants}
          >
            <div>
              <div className="p-4 bg-teal-400/15 rounded-2xl text-white self-start inline-block mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Cog className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="font-display font-semibold text-xl text-white mb-4">
                Precision-Engineered Solutions Built for Performance
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed font-normal mb-6">
                Our experienced engineering team designs and develops advanced Solar Module Mounting Structures that combine structural strength, installation efficiency, and long-term reliability. From concept and analysis to manufacturing and deployment, we deliver innovative solutions tailored to the demands of modern solar projects.
              </p>

              <div className="space-y-3.5">
                {[
                  'Advanced Finite Element Analysis (FEA) for structural validation and performance optimization',
                  'Wind Load & Structural Calculations designed in accordance with relevant Indian standards and site-specific requirements',
                  '3D CAD Modeling and Detailed Engineering Drawings for accurate planning and seamless execution',
                  'Site Assessment & Technical Consultation to ensure optimal design, safety, and project performance',
                  'Customized MMS Solutions for rooftop, ground-mounted, and utility-scale solar applications',
                  'End-to-End Engineering Support from design development through installation'
                ].map((item, id) => (
                  <div key={id} className="flex gap-2.5 items-center text-xs text-slate-200 font-medium bg-slate-950/40 border border-slate-800 p-3 rounded-xl shadow-xs hover:border-blue-500/50 hover:bg-slate-950/60 transition-all duration-200">
                    <HardHat className="w-4 h-4 text-white flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
