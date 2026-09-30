import React, { useState } from 'react';
import { ChevronDown, MessageSquare, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one for visual density

  const faqs: FAQItem[] = [
    {
      question: 'What type of Solar mounting structures do you offer?',
      answer: 'We offer a variety of solar mounting structures, including ground mount systems, rooftop mounts, pole mounts, and non-penetrative roof mounts, designed to meet diverse project needs and site conditions.'
    },
    {
      question: 'Are your products customisable?',
      answer: 'Yes, we provide customised solar racking solutions tailored to your specific project requirements, ensuring optimal performance and compatibility with your unique architectural design.'
    },
    {
      question: 'What materials are your mounting system made of?',
      answer: 'Our mounting systems are constructed from high-quality steel and aluminum, ensuring durability, strength, and resistance to harsh weather conditions.'
    },
    {
      question: 'Do you provide installation support?',
      answer: 'Yes, we offer comprehensive support that includes installation guidelines, technical documentation, and design assistance to ensure your project is successful from start to finish.'
    },
    {
      question: 'What certifications do your products have?',
      answer: 'Our products adhere to industry standards and regulations, and we provide Material Test Certificates, load data, and compliance documents to assure you of their quality and reliability.'
    },
    {
      question: 'How do I determine which mounting solution is right for my project?',
      answer: 'Our experienced team is available to assess your project needs, providing recommendations based on factors such as site conditions, energy requirements, and architectural design.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100 overflow-hidden w-full relative">
      {/* Decorative background glow for realistic atmosphere */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title & Informative Callout Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1 w-8 rounded-full" style={{backgroundColor: '#0057b8'}} />
                <span className="text-xs font-bold uppercase tracking-widest font-mono" style={{color: '#003579'}}>FAQ DESK</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none mb-4">
                Frequently Asked <br />
                <span className="font-extrabold" style={{color: '#0057b8'}}>Questions.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Got questions about materials, compliance certifications, or installation? Discover detail specifications about how we build robust engineering assets.
              </p>
            </motion.div>

            {/* Premium Sticky Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24 text-teal-400" />
              </div>

              <div className="flex items-center gap-2 mb-4 bg-white/10 self-start text-[10px] font-mono tracking-wider font-bold text-white uppercase border border-white/20 px-2.5 py-1 rounded-full w-fit">
                <Sparkles className="w-3 h-3 text-white animate-spin" style={{ animationDuration: '6s' }} />
                <span>Expert Guidance</span>
              </div>
              
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Need a Custom Analysis?
              </h4>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6">
                Our in-house design and FEA testing engineers are ready to build fully configured blueprints optimized specifically for your wind load map and local standards.
              </p>

              <div className="flex items-center gap-4 border-t border-slate-800 pt-5">
                <div className="p-3 bg-slate-800 rounded-2xl">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Immediate support</span>
                  <a href="mailto:mms@vrmstructures.in" className="text-xs sm:text-sm font-bold text-white hover:text-teal-300 transition-colors">
                    mms@vrmstructures.in
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Redesigned Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-350 ${
                    isOpen 
                      ? 'border-blue-300 bg-white shadow-lg shadow-blue-50' 
                      : 'border-slate-200/60 bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Trigger Button with sophisticated layouts */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-start gap-4 justify-between group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      {/* Premium Number indicator instead of plain help circles */}
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md transition-colors duration-300 shrink-0 mt-1 ${
                        isOpen 
                          ? 'bg-[#003579] text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#003579]'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className={`font-display font-bold text-sm sm:text-base transition-colors duration-300 leading-snug ${
                        isOpen ? 'text-slate-900 font-extrabold' : 'text-slate-800 group-hover:text-[#003579]'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-1 rounded-full transition-all duration-300 shrink-0 mt-0.5 ${
                      isOpen ? 'bg-blue-50 text-[#003579]' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#003579]'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-350 ${
                        isOpen ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1] // Custom ultra-smooth easeOutExpo
                            },
                            opacity: {
                              duration: 0.2,
                              delay: 0.05
                            }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1]
                            },
                            opacity: {
                              duration: 0.15
                            }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pl-14 pr-5 sm:pr-8 pb-5 sm:pb-6 pt-0 border-t border-slate-100">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
