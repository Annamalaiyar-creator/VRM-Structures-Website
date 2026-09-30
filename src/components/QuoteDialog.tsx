import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, Sun, CheckCircle, Loader2 } from 'lucide-react';
import { addQuote } from '../lib/firebase';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export default function QuoteDialog({ isOpen, onClose, preselectedProduct }: QuoteDialogProps) {
  const [mountingType, setMountingType] = useState('Ground Mount');

  React.useEffect(() => {
    if (preselectedProduct) {
      setMountingType(
        preselectedProduct.includes('Tracker') 
          ? 'Solar Tracker' 
          : preselectedProduct.includes('RCC') || preselectedProduct.includes('Metal') || preselectedProduct.includes('Roof')
          ? 'Rooftop System'
          : preselectedProduct.includes('Carport')
          ? 'Solar Carport'
          : 'Ground Mount'
      );
    }
  }, [preselectedProduct, isOpen]);
  const [capacity, setCapacity] = useState<number>(50); // kW
  const [material, setMaterial] = useState('Galvanized Steel (HDG)');
  const [windZone, setWindZone] = useState('Medium (150 km/h)');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Real-time structural estimation algorithms based on typical solar engineering ratios:
  // Ground Mount: ~45 kg of steel per kW, Rooftop: ~12 kg of aluminium/steel per kW
  const weightPerKw = mountingType === 'Ground Mount' ? 42 : mountingType === 'Solar Tracker' ? 55 : mountingType === 'Solar Carport' ? 65 : 14;
  const estimatedWeightTons = ((capacity * weightPerKw) / 1000).toFixed(2);
  
  // Custom material cost multiplier
  const materialMultiplier = material.includes('HDG') ? 1.0 : material.includes('Aluminium') ? 1.4 : 0.85;
  const designComplexity = windZone.includes('High') ? 1.25 : windZone.includes('Extreme') ? 1.45 : 1.0;
  
  // Base structural price estimate (corporate range, approx $60 to $120 per kW support)
  const basePricePerKw = 75; 
  const totalEstimatedPrice = Math.round(capacity * basePricePerKw * materialMultiplier * designComplexity * 83.5); // In INR

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addQuote({
        ...formData,
        mountingType,
        capacity,
        windZone,
        material,
        estimatedWeightTons,
        estimatedPrice: totalEstimatedPrice
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError('Failed to record dynamic quotation. Please check authorization constraints.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalEstimatedPrice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-500" />

        <button 
          onClick={onClose}
          className="absolute p-2 text-gray-400 transition-colors rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-700"
          id="close-quote-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Calculator Panel */}
            <div className="p-6 md:p-8 md:col-span-7 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold font-display text-gray-900">Structural Estimator</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="quote-mounting-type" className="block mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Mounting Solution</label>
                  <select 
                    id="quote-mounting-type"
                    name="mountingType"
                    value={mountingType}
                    onChange={(e) => setMountingType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Ground Mount">Ground Mounted Structures (Heavy-Duty)</option>
                    <option value="Rooftop System">Rooftop Ballasted / Anchored Racks</option>
                    <option value="Solar Carport">Solar Carport Canopy Structures</option>
                    <option value="Solar Tracker">Single-Axis Solar Tracking System</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quote-capacity" className="block mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Capacity (kWp)</label>
                    <input 
                      id="quote-capacity"
                      name="capacity"
                      type="number"
                      min="5"
                      max="100000"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-windzone" className="block mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Wind Load Coefficient</label>
                    <select 
                      id="quote-windzone"
                      name="windZone"
                      value={windZone}
                      onChange={(e) => setWindZone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Low (120 km/h)">Low / Inland (33 m/s)</option>
                      <option value="Medium (150 km/h)">Medium / Dynamic (42 m/s)</option>
                      <option value="High (180 km/h)">High / Heavy Monsoon (50 m/s)</option>
                      <option value="Extreme (210 km/h)">Extreme / Coastal Cyclic (58 m/s)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Structure Material & Finishing</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Galvanized Steel (HDG)', 'Pre-Galvanized', 'Aluminium Alloy'].map((mat) => (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setMaterial(mat)}
                        className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-all ${
                          material === mat 
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Your Contact Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      id="quote-user-name"
                      name="name"
                      autoComplete="name"
                      type="text" 
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="px-3 py-1.5 text-sm border rounded-lg focus:ring-1 focus:ring-emerald-500"
                    />
                    <input 
                      id="quote-user-email"
                      name="email"
                      autoComplete="email"
                      type="email" 
                      placeholder="Business Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="px-3 py-1.5 text-sm border rounded-lg focus:ring-1 focus:ring-emerald-500"
                    />
                    <input 
                      id="quote-user-company"
                      name="company"
                      autoComplete="organization"
                      type="text" 
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="px-3 py-1.5 text-sm border rounded-lg col-span-2 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-650 text-xs rounded-lg">
                    {submitError}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 mt-2 font-semibold text-white rounded-lg transition-colors shadow-lg active:translate-y-px flex items-center justify-center gap-2 ${
                    isSubmitting ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                  }`}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-emerald-100" />}
                  {isSubmitting ? 'Recording Proposal...' : 'Confirm Structuring Proposal'}
                </button>
              </form>
            </div>

            {/* Calculations Summary Panel */}
            <div className="p-6 md:p-8 md:col-span-5 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <span className="px-2 py-1 text-[10px] font-semibold tracking-widest text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded uppercase">
                  Real-time Estimate
                </span>
                <h4 className="mt-4 text-3xl font-bold font-display">{formattedPrice}</h4>
                <p className="mt-1 text-xs text-slate-400">Estimated Project Infrastructure Cost</p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Steel / Alloy Demand</span>
                    <span className="font-semibold text-slate-200">{estimatedWeightTons} Tons</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Ground Anchors/Piles</span>
                    <span className="font-semibold text-slate-200">~{Math.round(capacity * 0.9)} units</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Wind Load Rating</span>
                    <span className="font-semibold text-teal-400">{windZone.split(' ')[0]} Speed</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Design Standards</span>
                    <span className="font-semibold text-emerald-400">IS 875 / ASCE-7</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">ISO & CE Certified Manufacturing</span>
                    <p className="mt-0.5">High-grade structural steel galvanized to 80+ microns ensures a 25-year system lifecycle.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full text-emerald-600 mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-display">Proposal Submitted Successfully!</h3>
            <p className="mt-3 max-w-md text-gray-600">
              Thank you, <span className="font-semibold">{formData.name}</span>. Our solar structural engineers have received your request for {capacity} kW of {mountingType} structures and are compiling a detailed CAD & pricing proposal.
            </p>
            <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-xl text-left max-w-sm w-full">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Summary Details</p>
              <div className="mt-2 text-sm text-slate-700 space-y-1">
                <p>• Structure: <span className="font-semibold">{mountingType}</span></p>
                <p>• Material: <span className="font-semibold">{material}</span></p>
                <p>• Wind Capacity: <span className="font-semibold">{windZone}</span></p>
              </div>
            </div>
            <button 
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-8 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
