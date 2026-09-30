import React from 'react';
import { ShieldAlert, Cpu, Heart, Users, CheckSquare, Hammer, Compass, Award, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const highlights = [
    {
      title: 'Technical Expertise',
      description: 'Leveraging years of engineering experience, we design solar mounting structures optimized for strength, stability, and long-term performance across diverse project environments.',
      icon: Cpu,
      accent: 'border-l-2 border-[#003579]',
      hoverIconColor: 'group-hover:text-[#003579] group-hover:fill-blue-50 transition-colors duration-300',
      statusLabel: 'Industry Proven'
    },
    {
      title: 'Precision Manufacturing',
      description: 'Our advanced manufacturing processes ensure consistent quality, accurate dimensions, and superior structural reliability in every component we produce.',
      icon: Hammer,
      accent: 'border-l-2 border-[#003579]',
      hoverIconColor: 'group-hover:text-[#003579] group-hover:fill-blue-50 transition-colors duration-300',
      statusLabel: 'Quality Assured'
    },
    {
      title: 'Innovative Engineering',
      description: 'We develop smart, efficient mounting solutions that enhance installation efficiency, maximize durability, and support evolving solar technologies.',
      icon: Compass,
      accent: 'border-l-2 border-[#003579]',
      hoverIconColor: 'group-hover:text-[#003579] group-hover:fill-blue-50 transition-colors duration-300',
      statusLabel: 'Future Ready'
    },
    {
      title: 'Sustainable Solutions',
      description: 'Committed to responsible manufacturing, we create environmentally conscious products that contribute to a cleaner and more sustainable energy future.',
      icon: Leaf,
      accent: 'border-l-2 border-[#003579]',
      hoverIconColor: 'group-hover:text-[#003579] group-hover:fill-blue-50 transition-colors duration-300',
      statusLabel: 'Eco Focused'
    },
    {
      title: 'Dedicated Project Support',
      description: 'From design consultation to project execution, our experienced team provides comprehensive support to ensure seamless project delivery.',
      icon: Users,
      accent: 'border-l-2 border-[#003579]',
      hoverIconColor: 'group-hover:text-[#003579] group-hover:fill-blue-50 transition-colors duration-300',
      statusLabel: 'Customer Driven'
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
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="why-choose-us" className="py-[70px] px-4 sm:px-8 md:px-[50px] bg-slate-50 border-y border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          className="max-w-3xl mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="flex items-center mb-4">
            <span className="font-mono text-[#003579] font-bold text-[12px]">Why Choose VRM Structures</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Engineered for Strength. <span className="font-bold" style={{color: '#0057b8'}}>Built for Performance.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`group p-6 bg-white rounded-2xl shadow-sm border border-transparent flex flex-col justify-between hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50 transition-all duration-200 ease-out ${item.accent}`}
              >
                <div>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 self-start inline-block mb-6 border border-slate-200 group-hover:bg-slate-100 transition-colors duration-300">
                    <Icon className={`w-5 h-5 text-slate-700 ${item.hoverIconColor}`} />
                  </div>
                  <h3 className="font-display font-bold text-[15px] sm:text-base lg:text-[15px] xl:text-base text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  <span>{item.statusLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
