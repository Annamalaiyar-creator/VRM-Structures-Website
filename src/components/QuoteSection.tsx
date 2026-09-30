import React, { useState, useEffect, useMemo, Suspense } from 'react';
const Product3DViewer = React.lazy(() => import('./Product3DViewer'));
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle, Phone, MapPin, ChevronDown, MessageSquare,
  ShieldAlert, Loader2, Check, ArrowRight,
  RefreshCcw, ArrowLeft, Lock, Sparkles, X
} from 'lucide-react';
import { getAuthInstance } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

interface QuoteSectionProps {
  preselectedProduct?: string;
}

interface HierarchyNode {
  label: string;
  children?: HierarchyNode[];
}

interface Toast {
  id: string;
  msg: string;
  type: 'success' | 'error' | 'info';
}

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];
const REGIONAL: Record<string, string> = {
  "Tamil Nadu": "+919884780789",
  "Telangana": "+919884930789",
  "Kerala": "+919884860789",
  "Karnataka": "+919884460789",
  "Andhra Pradesh": "+919884820789"
};
const DEFAULT_NUM = "+919884820789";
const STATE_MAP: Record<string, string> = STATES.reduce((a, s) => {
  a[s] = REGIONAL[s] || DEFAULT_NUM;
  return a;
}, {} as Record<string, string>);

function Quote3DViewer({ structureType, subSelections }: { structureType: string; subSelections: string[] }) {
  // Determine if a 3D model is available for the selected category
  let glbPath = "";
  let zoom = 1.0;
  if (structureType === "RCC Roof") {
    glbPath = "/RCC_Design.glb";
  } else if (structureType === "Ground Mounted") {
    glbPath = "/Ground Mounted.glb";
  } else if (structureType === "Car Port Structure") {
    glbPath = "/Carport_Design.glb";
    zoom = 0.8;
  } else if (structureType === "Sheet Roof Structure") {
    if (subSelections.includes("Mini Rail")) {
      glbPath = "/Mini_Rail_Redesign.glb";
      zoom = 1.0;
    } else {
      glbPath = "/Long_Rail.glb";
      zoom = 1.0;
    }
  }

  return (
    <div className="w-full h-[440px] sm:h-[480px] lg:h-[500px] bg-[#1e293b] rounded-[40px] overflow-hidden relative border border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-6 sm:p-8 flex flex-col justify-between">
      {glbPath ? (
        <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-light">Loading 3D Model...</div>}>
            <Product3DViewer url={glbPath} zoom={zoom} autoRotate={true} />
          </Suspense>
        </div>
      ) : (
        <>
          <img
            src={structureType === "Water Pump Structure" ? "/solar_pump_mms.jpg" : "/vrm-factory-building.jpg"}
            alt={structureType === "Water Pump Structure" ? "Solar Pump MMS" : "VRM Manufacturing Facility"}
            className="absolute inset-0 w-full h-full object-cover rounded-[40px] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent rounded-[40px]" />
        </>
      )}

      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/80 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            {structureType || "VRM Manufacturing Facility"}
          </span>
        </div>
      </div>

      <div className="relative z-10 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-5 rounded-2xl pointer-events-none">
        <h4 className="text-white font-display text-sm font-bold">VRM Certified Manufacturing Quality</h4>
        <p className="text-slate-300 text-xs font-light mt-1">
          High-tensile hot-dip galvanized & extruded aluminum structures fabricated to IS 800 and IS 875 wind standards in Chennai.
        </p>
      </div>
    </div>
  );
}

export default function QuoteSection({ preselectedProduct }: QuoteSectionProps) {
  const HIERARCHY: HierarchyNode = useMemo(() => ({
    label: "Root",
    children: [
      {
        label: "Sheet Roof Structure",
        children: [
          {
            label: "Mini Rail",
            children: [
              {
                label: "Portrait Mode Structure",
                children: [
                  { label: "Penetrative" },
                  { label: "Non Penetrative" }
                ]
              },
              { label: "Landscape Mode Structure" }
            ]
          },
          {
            label: "Long Rail",
            children: [
              { label: "L Bracket Rail" },
              { label: "Flat Roof Rail" }
            ]
          }
        ]
      },
      {
        label: "RCC Roof",
        children: [
          { label: "PM Surya Ghar Project" },
          { label: "Commercial Project" }
        ]
      },
      { label: "Ground Mounted" },
      { label: "Water Pump Structure" },
      { label: "Car Port Structure" }
    ]
  }), []);

  const [step, setStep]           = useState<1 | 2>(1);
  const [sel, setSel]             = useState<string[]>([]);
  const [stateVal, setStateVal]   = useState('');
  const [phone, setPhone]         = useState('');
  const [otpSent, setOtpSent]     = useState(false);
  const [otp, setOtp]             = useState('');
  const [expiresAt, setExpiresAt] = useState(0);
  const [secsLeft, setSecsLeft]   = useState(0);
  const [verified, setVerified]   = useState(false);
  const [confResult, setConfResult] = useState<ConfirmationResult | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [mockMode, setMockMode]   = useState(false);
  const [toasts, setToasts]       = useState<Toast[]>([]);

  const toast = (msg: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4500);
  };

  useEffect(() => {
    if (!preselectedProduct) return;
    if (preselectedProduct.includes('RCC') || preselectedProduct.includes('Flat Roof')) setSel(['RCC Roof']);
    else if (preselectedProduct.includes('Ground') || preselectedProduct.includes('Utility')) setSel(['Ground Mounted']);
    else if (preselectedProduct.includes('Metal') || preselectedProduct.includes('Sheet') || preselectedProduct.includes('Mini Rail')) setSel(['Sheet Roof Structure']);
    else if (preselectedProduct.includes('Carport') || preselectedProduct.includes('Canopy')) setSel(['Car Port Structure']);
    else if (preselectedProduct.includes('Water') || preselectedProduct.includes('Pump')) setSel(['Water Pump Structure']);
  }, [preselectedProduct]);

  useEffect(() => {
    if (!otpSent || expiresAt <= 0) return;
    const t = () => {
      const ms = expiresAt - Date.now();
      setSecsLeft(ms <= 0 ? 0 : Math.floor(ms / 1000));
    };
    t();
    const iv = setInterval(t, 1000);
    return () => clearInterval(iv);
  }, [otpSent, expiresAt]);

  const findNode = (path: string[]): HierarchyNode => {
    let n = HIERARCHY;
    for (const l of path) {
      const c = n.children?.find(x => x.label === l);
      if (!c) break;
      n = c;
    }
    return n;
  };

  const isLeaf = (n: HierarchyNode) => !n.children?.length;
  const activeNode = findNode(sel);

  const canProceed = () => {
    if (!sel.length) return false;
    const f = sel[0];
    if (f === 'RCC Roof') return sel.length >= 2;
    if (['Ground Mounted', 'Car Port Structure', 'Water Pump Structure'].includes(f)) return true;
    return isLeaf(activeNode);
  };

  const changeSel = (level: number, value: string) => {
    const t = sel.slice(0, level);
    if (value) t[level] = value;
    setSel(t);
  };

  const reset = () => {
    setSel([]);
    setStep(1);
    setStateVal('');
    setPhone('');
    setOtpSent(false);
    setOtp('');
    setVerified(false);
    setConfResult(null);
    setMockMode(false);
    toast('Quote configuration restored to default settings.', 'info');
  };

  const sendWA = () => {
    const owner = STATE_MAP[stateVal] || DEFAULT_NUM;
    const msg = `New enquiry via VRM Structures:\nStructure: ${sel.join(' → ')}\nState: ${stateVal}\nPhone: +91${phone.replace(/\D/g, '').slice(-10)}`;
    window.open(`https://wa.me/${owner.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  const sendOtp = async () => {
    if (!stateVal) { toast('State Selection Required: Please choose your state or territory.', 'error'); return; }
    const clean = phone.replace(/\D/g, '');
    if (clean.length !== 10) { toast('Invalid Mobile Number: Please enter a valid 10-digit phone number.', 'error'); return; }
    setRequesting(true);
    if ((window as any).recaptchaVerifier) {
      try { (window as any).recaptchaVerifier.clear(); (window as any).recaptchaVerifier = null; } catch (_) {}
    }
    try {
      const auth = await getAuthInstance();
      const v = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      (window as any).recaptchaVerifier = v;
      const conf = await signInWithPhoneNumber(auth, `+91${clean}`, v);
      setConfResult(conf); setOtpSent(true); setVerified(false); setMockMode(false);
      setExpiresAt(Date.now() + 5 * 60 * 1000); setOtp('');
      toast('Security Code Dispatched: A 6-digit verification code has been sent via SMS.', 'success');
    } catch (err: any) {
      setMockMode(true); setOtpSent(true); setVerified(false); setExpiresAt(Date.now() + 5 * 60 * 1000); setOtp('');
      toast('Demonstration Mode Active: Enter verification code 123456 to test connection.', 'info');
      if ((window as any).recaptchaVerifier) {
        try { (window as any).recaptchaVerifier.clear(); (window as any).recaptchaVerifier = null; } catch (_) {}
      }
    } finally { setRequesting(false); }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { toast('Incomplete Security Code: Please enter the 6-digit verification code.', 'error'); return; }
    if (Date.now() > expiresAt) { toast('Verification Code Expired: Please request a new security code.', 'error'); return; }
    if (mockMode) {
      if (otp === '123456') { setVerified(true); toast('Identity Verified: Connecting to VRM technical engineering desk...', 'success'); sendWA(); }
      else toast('Incorrect Security Code: Please enter valid verification code (Demo: 123456).', 'error');
      return;
    }
    if (!confResult) { toast('Session Expired: Please request a new security code.', 'error'); return; }
    try {
      await confResult.confirm(otp); setVerified(true); toast('Identity Verified: Connecting to VRM technical engineering desk...', 'success'); sendWA();
    } catch (e: any) { toast(e.message || 'Verification Error: Unable to complete authentication.', 'error'); }
  };

  const fmtTime = (s: number) => s <= 0 ? 'Expired' : `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const subDropdowns: React.ReactNode[] = [];
  let cur = HIERARCHY;
  for (let i = 0; i < sel.length; i++) {
    const child = cur.children?.find(n => n.label === sel[i]);
    if (!child) break;
    cur = child;
    if (cur.children?.length) {
      const lvl = i + 1;
      const opts = cur.children;
      subDropdowns.push(
        <motion.div key={`lvl-${lvl}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
          {lvl > 1 && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 mt-1">
              <span className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                {String.fromCharCode(65 + lvl)}
              </span>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Secondary Specification Refinement
              </label>
            </div>
          )}
          <div className="relative">
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={sel[lvl] || ''}
              onChange={e => changeSel(lvl, e.target.value)}
              className="w-full px-5 py-4 pr-10 rounded-2xl bg-white border border-slate-200 text-sm font-sans font-bold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 appearance-none cursor-pointer transition-all duration-200 shadow-sm"
            >
              <option value="" disabled hidden>— Select Refinement —</option>
              {opts.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
            </select>
          </div>
        </motion.div>
      );
    }
  }

  const level0 = HIERARCHY.children || [];

  return (
    <section className="w-full bg-white font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column Bento Design Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-12">

          {/* Left Column Label Panel */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-2"
          >
            <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
              <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                  Quote Builder
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Content Panel */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-4xl"
            >
              Configure Your Solar Structure{" "}
              <span className="inline-flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#FFE0B2]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                <Sparkles size={15} className="stroke-[2.5]" />
                Interactive 3D
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-slate-600 text-[15px] sm:text-[16px] leading-[26px] max-w-3xl mt-6 font-light"
            >
              Select your primary mounting architecture and sub-specifications on the left to dynamically visualize the relevant 3D structure assembly in real-time.
            </motion.p>
          </div>

        </div>

        {/* Stepper Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F5F5F7]/80 rounded-2xl border border-slate-200/80 p-4 mb-10">
          <div className="flex items-center gap-4">
            {[
              { id: 1, label: '1. Select & Visualize 3D' },
              { id: 2, label: '2. Verify & Connect' }
            ].map((s, i) => {
              const done = step > s.id;
              const active = step === s.id;
              return (
                <React.Fragment key={s.id}>
                  <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all ${active ? 'bg-white shadow-sm border border-slate-200 text-slate-900 font-bold' : done ? 'text-indigo-600 font-semibold' : 'text-slate-400 font-medium'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${done ? 'bg-indigo-600 text-white' : active ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.id}
                    </span>
                    <span className="text-xs">{s.label}</span>
                  </div>
                  {i === 0 && <span className="text-slate-300 text-xs font-light">/</span>}
                </React.Fragment>
              );
            })}
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Reset Selection
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CONFIGURE & VISUALIZE 3D */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT SIDE (lg:col-span-6): Primary Structure Type (A) & Sub Specifications (B) Stacked */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-6 bg-[#F5F5F7]/85 rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.02)] text-left">
                  
                  <div className="flex flex-col gap-6">
                    {/* Active Breadcrumb pill */}
                    {sel.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap pb-4 border-b border-slate-200/60">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active:</span>
                        {sel.map((v, i) => (
                          <React.Fragment key={v}>
                            {i > 0 && <span className="text-slate-300 text-xs">›</span>}
                            <span className="px-3.5 py-1 bg-white text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold shadow-sm">{v}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* A. Primary Structure Type */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">A</span>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Primary Structure Type
                        </label>
                      </div>
                      <div className="relative">
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                          value={sel[0] || ''}
                          onChange={e => changeSel(0, e.target.value)}
                          className="w-full px-5 py-4 pr-10 rounded-2xl bg-white border border-slate-200 text-sm font-sans font-bold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 appearance-none cursor-pointer transition-all duration-200 shadow-sm"
                        >
                          <option value="" disabled hidden>— Select Primary Mounting Type —</option>
                          {level0.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* B. Sub Specifications & Refinements */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">B</span>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Sub Specifications & Refinements
                        </label>
                      </div>

                      {subDropdowns.length > 0 ? (
                        <div className="space-y-4">{subDropdowns}</div>
                      ) : (
                        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 text-slate-400 text-xs font-light text-center">
                          Select a primary structure type above to view sub specifications.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Continue Action */}
                  {canProceed() && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-200/60 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto bg-black hover:bg-slate-900 text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full tracking-wider uppercase transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 select-none shadow-md"
                      >
                        Continue to Verification <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                </div>

                {/* RIGHT SIDE (lg:col-span-6): Relevant 3D Module Assembly Viewer (Fixed Height Sticky Box) */}
                <div className="lg:col-span-6 sticky top-28 w-full">
                  <Quote3DViewer
                    structureType={sel[0] || ""}
                    subSelections={sel.slice(1)}
                  />
                </div>

              </div>

            </motion.div>
          )}

          {/* STEP 2: VERIFY & CONNECT */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <div className="max-w-3xl mx-auto">

                {/* Selected Configuration Summary Card */}
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-[32px] p-6 mb-8 text-left flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Selected Structure</span>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {sel.map((v, i) => (
                          <React.Fragment key={v}>
                            {i > 0 && <span className="text-indigo-400 text-xs">›</span>}
                            <span className="text-sm font-bold text-slate-900">{v}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer flex-shrink-0">
                    Edit
                  </button>
                </div>

                {/* Verification Form Card */}
                <div className="bg-[#F5F5F7]/85 rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.02)] text-left">
                  
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/60">
                    <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-lg font-bold text-slate-900">Identity Verification</h3>
                      <p className="font-sans text-xs text-slate-500 font-light">Verify your mobile number to connect directly with our engineering team on WhatsApp.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* State Selection */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="quote-state" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                          State / Union Territory *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <select
                            id="quote-state"
                            name="state"
                            value={stateVal}
                            onChange={e => setStateVal(e.target.value)}
                            className="w-full pl-11 pr-10 py-4 rounded-2xl bg-white border border-slate-200 text-xs font-sans text-slate-800 font-semibold focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select State</option>
                            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="quote-phone" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                          Mobile Number *
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="px-4 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 select-none">+91</span>
                          <input
                            id="quote-phone"
                            name="phone"
                            autoComplete="tel"
                            type="tel"
                            maxLength={10}
                            value={phone}
                            placeholder="98843 09789"
                            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-xs font-sans font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div id="recaptcha-container" />

                    {!otpSent ? (
                      <div className="pt-2">
                        <button
                          onClick={sendOtp}
                          disabled={requesting}
                          className="w-full bg-black hover:bg-slate-900 text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full tracking-wider uppercase transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-50"
                        >
                          {requesting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending Verification Code...</> : <><Phone className="w-4 h-4" /> Send Verification Code via SMS</>}
                        </button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                        {mockMode && (
                          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 leading-relaxed font-light">
                              <strong className="font-bold">Demo Verification Active:</strong> Enter code <span className="font-mono font-bold bg-amber-100 px-2 py-0.5 rounded text-amber-900">123456</span> to complete submission.
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center px-1">
                            <label htmlFor="quote-otp" className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                              6-Digit Verification Code
                            </label>
                            <span className={`text-xs font-mono font-bold ${secsLeft > 0 ? 'text-indigo-600' : 'text-rose-500'}`}>{fmtTime(secsLeft)}</span>
                          </div>
                          <input
                            id="quote-otp"
                            name="otp"
                            autoComplete="one-time-code"
                            type="tel"
                            maxLength={6}
                            value={otp}
                            placeholder="123456"
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-2xl font-mono tracking-[0.5em] font-bold text-center text-slate-900 focus:outline-none focus:border-indigo-500 transition-all"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={verifyOtp}
                            disabled={verified || otp.length !== 6 || secsLeft <= 0 || requesting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full tracking-wider uppercase transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-40"
                          >
                            <MessageSquare className="w-4 h-4" /> Verify & Connect on WhatsApp
                          </button>
                          <button
                            onClick={sendOtp}
                            disabled={requesting}
                            className="px-6 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            {requesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><RefreshCcw className="w-3.5 h-3.5" /> Resend</>}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Brand-Matched Floating Top-Right Notification Toast Stack */}
      <div className="fixed top-24 right-4 sm:right-8 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className={`p-4 rounded-2xl border bg-white/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] pointer-events-auto flex items-start gap-3.5 select-none ${
                t.type === 'success' ? 'border-l-4 border-l-emerald-500 border-slate-200/80' :
                t.type === 'error' ? 'border-l-4 border-l-rose-500 border-slate-200/80' :
                'border-l-4 border-l-indigo-600 border-slate-200/80'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                t.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                t.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                {t.type === 'success' ? <CheckCircle className="w-4 h-4 stroke-[2.5]" /> :
                 t.type === 'error' ? <ShieldAlert className="w-4 h-4 stroke-[2.5]" /> :
                 <Sparkles className="w-4 h-4 stroke-[2.5]" />}
              </div>

              <div className="flex-1 pr-1 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.type === 'success' ? 'Success Notification' : t.type === 'error' ? 'Action Required' : 'System Information'}
                </p>
                <p className="font-sans text-xs font-semibold text-slate-800 leading-relaxed">
                  {t.msg}
                </p>
              </div>

              <button
                onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
