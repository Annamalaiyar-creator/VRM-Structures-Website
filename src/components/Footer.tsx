import React from 'react';
import { Sun, Leaf, ArrowUp, Linkedin, Youtube, ShieldAlert, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';

export default function Footer() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center">
                <CompanyLogo className="h-16 w-auto" variant="light" />
              </div>
              <p className="mt-4 text-xs leading-relaxed font-normal max-w-xs text-slate-400">
                Building robust solar infrastructure through advanced engineering, customized mounting solutions, and high-performance light gauge steel products.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://www.instagram.com/popular/vrm-structures/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:bg-teal-400 hover:text-white transition-all duration-300"
                title="VRM Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://in.linkedin.com/company/vrm-structures-india-pvt-ltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:bg-teal-400 hover:text-white transition-all duration-300"
                title="VRM LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@VRM_STRUCTURES" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:bg-teal-400 hover:text-white transition-all duration-300"
                title="VRM YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Spacer columns */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Column 2: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-left">
              <li>
                <button 
                  onClick={() => { navigate('/about'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('testimonials-section-id')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Racking solutions</h4>
            <ul className="space-y-2.5 text-xs text-left">
              <li>
                <button 
                  onClick={() => { navigate('/products'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Ground Mounts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/products'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Roof Supports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/products'); window.scrollTo(0, 0); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Solar Carports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('why-choose-us-section-id')?.scrollIntoView({ behavior: 'smooth' }); }, 155); }}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Why Choose Us
                </button>
              </li>
            </ul>
          </div>



        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-2xs sm:text-xs">
            <p>© 2026 VRM Structures India Pvt Ltd. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-800">|</span>
            <div className="flex items-center gap-1 text-white">
              <Leaf className="w-3.5 h-3.5" />
              <span>Made with renewable green energy</span>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full text-xs font-bold transition-all"
          >
            Scroll to Top
            <ArrowUp className="w-4 h-4 text-teal-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}
