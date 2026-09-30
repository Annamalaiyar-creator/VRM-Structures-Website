import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addInquiry } from '../lib/firebase';

interface CTASectionProps {
  onRequestQuote: () => void;
  ctaImgPath: string;
}

export default function CTASection({ onRequestQuote, ctaImgPath }: CTASectionProps) {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectName: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setSubmitError(null);

    // Construct mailto link parameters
    const subject = encodeURIComponent(`Solar Inquiry: ${formData.projectName} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Project Name: ${formData.projectName}\n\n` +
      `Message/Specifications:\n${formData.message}`
    );

    try {
      await addInquiry({
        ...formData,
        inquiryType: 'Quick Contact CTA'
      });
    } catch (err: any) {
      console.warn('Database write failed, continuing with email composer:', err);
    } finally {
      // Always open email composer and complete submission state
      window.location.href = `mailto:gamespace751@gmail.com?subject=${subject}&body=${body}`;
      setInquirySubmitted(true);
      setIsSubmitting(false);
    }
  };

  const leftVariants: any = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rightVariants: any = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.15 }
    }
  };

  return (
    <section id="contact" className="relative py-[70px] px-4 sm:px-8 md:px-[50px] bg-slate-950 overflow-hidden">
      
      {/* Background Image backup with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ctaImgPath} 
          alt="Clean bright future of solar" 
          className="w-full h-full object-cover opacity-15"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-955 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <motion.div 
            className="lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftVariants}
          >
            <div className="flex items-center mb-4">
              <span className="font-mono text-teal-300 font-bold text-[12px]">Talk to Our Engineering Team</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Build the Future of Solar Energy with <span className="text-teal-300 font-bold">VRM STRUCTURES</span>
            </h2>

            <p className="mt-6 text-slate-200 leading-relaxed font-normal text-md max-w-xl">
              Whether you need rooftop, ground-mounted, carport, or customized solar mounting systems, our team is ready to deliver solutions engineered for strength, efficiency, and long-term performance. Partner with us to create reliable solar infrastructure that stands the test of time.
            </p>

            <div className="mt-10 space-y-6 text-sm text-slate-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-xl text-teal-300 border border-slate-800">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Corporate Hotline</p>
                  <p className="font-semibold text-white mt-0.5">
                    +91 98843 09789
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-xl text-teal-300 border border-slate-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Sales & Estimations</p>
                  <p className="font-semibold text-white mt-0.5">
                    <a href="mailto:mms@vrmstructures.in" className="hover:text-teal-350 transition-colors">
                      mms@vrmstructures.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-xl text-teal-300 border border-slate-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Manufacturing Headquarters</p>
                  <p className="font-semibold text-white mt-0.5">
                    VRM Structures India Private Limited, No 1427, GNT Road, Nagappa Industrial Estate, Puzhal, Chennai – 600066.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick contact form on the right */}
          <motion.div 
            className="lg:col-span-6 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800 p-8 shadow-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightVariants}
          >
            <AnimatePresence mode="wait">
              {!inquirySubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-white font-display">Send Your Message</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Include a form for prospective clients to provide details about their project, helping us respond with the most accurate information.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cta-name" className="block mb-1 text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                      <input 
                        id="cta-name"
                        name="name"
                        autoComplete="name"
                        type="text" 
                        required
                        placeholder="e.g. Anand Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-600 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-email" className="block mb-1 text-[10px] font-bold uppercase text-slate-400">Inquiry Email</label>
                      <input 
                        id="cta-email"
                        name="email"
                        autoComplete="email"
                        type="email" 
                        required
                        placeholder="kumar@epcpartner.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-600 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cta-phone" className="block mb-1 text-[10px] font-bold uppercase text-slate-400">Contact Number</label>
                      <input 
                        id="cta-phone"
                        name="phone"
                        autoComplete="tel"
                        type="tel" 
                        placeholder="+91 90000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-600 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-project" className="block mb-1 text-[10px] font-bold uppercase text-slate-400">Project Name</label>
                      <input 
                        id="cta-project"
                        name="projectName"
                        type="text" 
                        required
                        placeholder="e.g. Oragadam Solar Phase II"
                        value={formData.projectName}
                        onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-600 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cta-message" className="block mb-1 text-[10px] font-bold uppercase text-slate-400">Project specifications / Message</label>
                    <textarea 
                      id="cta-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe capacity (eg. 250kW), terrain details, specific galvanized steel micron requirements or timeline goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-600 focus:border-transparent"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl text-xs font-normal">
                      {submitError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white font-bold uppercase tracking-wider rounded-xl transition-all duration-150 ease-out hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-705' : 'bg-teal-400 hover:bg-teal-500 hover:shadow-teal-400/15'
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 px-6 text-center flex flex-col items-center justify-center min-h-[350px]"
                >
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-display">Inquiry Transmitted Successfully</h4>
                  <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-sm">
                    Thank you <b>{formData.name}</b>. A design estimate engineer has been assigned for your <b>{formData.projectName}</b> proposal and will email you at <b>{formData.email}</b> within 4 business hours.
                  </p>
                  <button 
                    onClick={() => {
                      setInquirySubmitted(false);
                      setFormData({ name: '', email: '', phone: '', projectName: '', message: '' });
                    }}
                    className="mt-8 px-6 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl font-medium text-xs transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
