import React from 'react';
import { Lightbulb, Award, Leaf, Handshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function StatsSection() {
  const values = [
    {
      number: '01',
      title: 'Engineering Excellence',
      description: 'We combine technical expertise, innovation, and precision manufacturing to deliver solar mounting solutions that exceed industry standards.',
      icon: Lightbulb,
      color: 'border-teal-400/30'
    },
    {
      number: '02',
      title: 'Uncompromising Quality',
      description: 'Every product is crafted with stringent quality controls, ensuring superior durability, reliability, and long-term performance.',
      icon: Award,
      color: 'border-teal-400/30'
    },
    {
      number: '03',
      title: 'Sustainable Growth',
      description: 'We are committed to supporting the renewable energy transition through environmentally responsible manufacturing and sustainable business practices.',
      icon: Leaf,
      color: 'border-teal-400/30'
    },
    {
      number: '04',
      title: 'Customer-Centric Approach',
      description: 'We work closely with our clients to understand their unique requirements and deliver tailored solutions that maximize project success.',
      icon: Handshake,
      color: 'border-teal-400/30'
    }
  ];

  const headerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const gridVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-[70px] px-4 sm:px-8 md:px-[50px] bg-slate-900 border-y border-slate-800 overflow-hidden w-full">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Heading matching the design system standard */}
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="flex items-center mb-4">
            <span className="font-mono text-teal-300 font-bold text-[12px]">Core Values</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            The Principles That Drive <span className="text-teal-300 font-bold">Every Structure We Build</span>
          </h2>
        </motion.div>

        {/* Core Values 4-container grid layout */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group p-8 bg-slate-950/45 border border-slate-800/80 rounded-2xl flex flex-col justify-between hover:border-teal-400/50 hover:bg-slate-950/80 hover:-translate-y-1 hover:shadow-lg transition-all duration-150 ease-out"
              >
                <div>
                  {/* Top Row: Icon and Value Number */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-teal-300/10 rounded-xl text-teal-300 group-hover:bg-teal-400 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-600 group-hover:text-teal-300/60 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-bold text-lg text-white mb-3 tracking-snug group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
