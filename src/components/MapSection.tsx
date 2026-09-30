import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function MapSection() {
  const address = "VRM Structures India Private Limited, No 1427, GNT Road, Nagappa Industrial Estate, Puzhal, Chennai - 600066";
  
  // Google Map embed using the company's official business listing
  const mapEmbedUrl = "https://maps.google.com/maps?q=VRM+Structures+India+Pvt+Ltd,+Puzhal,+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed";
  
  // Direct Google Maps navigation URL (routing to VRM Structures)
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=VRM+Structures+India+Pvt+Ltd,+Puzhal,+Chennai";

  return (
    <section id="map-location" className="py-20 bg-slate-50 border-b border-slate-100 overflow-hidden relative w-full">
      {/* Decorative background visual ambient flares */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-1 w-6 bg-teal-500 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Location Map</span>
            <span className="h-1 w-6 bg-teal-500 rounded-full" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Visit Our Manufacturing facility
          </h2>
          <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Our corporate office and light gauge steel manufacturing center is strategically located in Nagappa Industrial Estate, Puzhal, Chennai.
          </p>
        </div>

        {/* Map and Card Immersive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Floating Details Info Card (lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-teal-50 border border-teal-100/55 rounded-2xl text-teal-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Office & Factory Address</h4>
                  <p className="font-semibold text-slate-900 text-sm mt-1 leading-relaxed">
                    VRM Structures India Private Limited, No 1427, GNT Road, Nagappa Industrial Estate, Puzhal, Chennai – 600066.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-2">
                    Coordinates: 13°09'07.2"N 80°12'31.2"E
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-3 bg-teal-50 border border-teal-100/55 rounded-2xl text-teal-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Business Hours</h4>
                  <p className="font-semibold text-slate-900 text-sm mt-1">
                    Mon – Sat: 09:30 AM – 06:30 PM
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sunday: Plant Maintenance
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-3 bg-teal-50 border border-teal-100/55 rounded-2xl text-teal-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Call Directly</h4>
                  <p className="font-semibold text-slate-900 text-sm mt-1">
                    <a href="tel:9884309789" className="hover:text-teal-600 transition-colors">
                      +91 98843 09789
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Email: <a href="mailto:mms@vrmstructures.in" className="hover:text-teal-600 underline">mms@vrmstructures.in</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100">
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors cursor-pointer shadow-sm active:translate-y-2xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Map Iframe Container (lg:col-span-8) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-3 shadow-md min-h-[350px] sm:min-h-[450px] relative overflow-hidden"
          >
            <iframe 
              src={mapEmbedUrl}
              title="VRM Structures Manufacturing Plant Google Map Location"
              className="w-full h-full rounded-2xl border-0 bg-slate-100"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
