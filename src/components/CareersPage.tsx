import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  MapPin,
  Clock,
  Check,
  ChevronRight,
  Menu,
  X,
  Award,
  Cpu,
  Users,
  Send,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
  User,
  Mail,
  Phone,
  ArrowUpRight,
  Star,
  BookOpen
} from "lucide-react";
import {
  ImagineLogo,
  HeroVideoBackground,
  HeroImageBackground
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";

interface CareersPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  perks: string[];
}

const getStoredJobs = (): Job[] => {
  const stored = localStorage.getItem("vrm_jobs_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  return [
    {
      id: "design-eng-mms-chennai",
      title: "Design Engineer – MMS",
      department: "Design Division",
      location: "Chennai",
      type: "Full-Time",
      experience: "Freshers",
      description: "Design Innovation. Build Solar Excellence. Design Smarter. Engineer Stronger. Power the Future of Solar.",
      requirements: [
        "Bachelor's Degree in Mechanical, Civil, or Structural Engineering",
        "Experience in solar mounting structure design and engineering",
        "Proficiency in AutoCAD, SolidWorks, SketchUp, STAAD Pro, or similar design software",
        "Understanding of structural analysis, wind load calculations, and design standards",
        "Ability to prepare GA drawings, fabrication drawings, BOMs, and design documentation",
        "Knowledge of solar project layouts, mounting systems, and structural components",
        "Strong analytical, problem-solving, and technical communication skills"
      ],
      perks: [
        "Competitive salary with performance-based growth opportunities",
        "Exposure to utility-scale, commercial, and rooftop solar projects",
        "Opportunity to work with advanced design and engineering tools",
        "Collaborative and innovation-driven work environment",
        "Continuous learning and career advancement opportunities",
        "Contribution to India's growing renewable energy infrastructure sector"
      ]
    },
    {
      id: "production-supervisor-chennai",
      title: "Production Supervisor",
      department: "Production Division",
      location: "Chennai",
      type: "Full-Time",
      experience: "2-5 Years",
      description: "Lead Operations. Deliver Excellence. Join VRM Structures and play a key role in overseeing daily manufacturing operations, ensuring production efficiency, quality compliance, and timely project delivery. Shape production excellence. Build the future of solar infrastructure.",
      requirements: [
        "Diploma or B.E. in Mechanical or Production Engineering",
        "Experience in sheet metal fabrication, welding, or roll forming processes",
        "Strong leadership, scheduling, and floor safety management skills"
      ],
      perks: [
        "Exposure to state-of-the-art automated manufacturing plants",
        "Health benefits, safety gear allowance, and performance bonuses"
      ]
    },
    {
      id: "bd-executive-pan-india",
      title: "Business Development Executive",
      department: "Sales & Client Relations",
      location: "Pan-India",
      type: "Full-Time",
      experience: "1-3 Years",
      description: "Drive Growth in Renewable Energy. Be part of a team that's building the future of clean energy.",
      requirements: [
        "Track record in sales/client acquisition, preferably in the B2B solar or steel engineering space.",
        "Excellent communication, pitch building, and client relationship management skills.",
        "Strong coordination abilities to liaison between clients and the design desk."
      ],
      perks: [
        "Competitive base salary with highly lucrative sales commission incentives.",
        "Travel support, mobile allowances, and premium mentorship."
      ]
    },
    {
      id: "accounts-manager-chennai",
      title: "Accounts Manager",
      department: "Finance & Accounts",
      location: "Chennai",
      type: "Full-Time",
      experience: "4-7 Years",
      description: "Manage Finance. Drive Business Growth. Join VRM Structures as an Accounts Manager and oversee financial operations, accounting operations, compliance, and reporting to support strategic business decisions and sustainable growth. Ensure Financial Excellence. Enable Sustainable Growth.",
      requirements: [
        "Chartered Accountant (CA) / Inter CA or MBA in Finance with solid experience in corporate accounting.",
        "Thorough knowledge of GST filing, taxation compliance, and industrial audit preparations.",
        "Proficiency in accounting ERP systems, ledger reconciliation, and treasury management."
      ],
      perks: [
        "Competitive annual package with performance-linked incentives.",
        "Executive level health coverage and professional workspace benefits."
      ]
    }
  ];
};

const JOBS_DATA: Job[] = getStoredJobs();

export default function CareersPage({ onNavigate }: CareersPageProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Application form states
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantRole, setApplicantRole] = useState("");
  const [applicantExperience, setApplicantExperience] = useState("");
  const [applicantSkills, setApplicantSkills] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantMessage, setApplicantMessage] = useState("");
  const [appliedSubmitted, setAppliedSubmitted] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const handleOpenApplyModal = (job: Job) => {
    window.location.hash = "careers/" + job.id;
  };

  const handleCloseApplyModal = () => {
    window.location.hash = "careers";
  };

  // Sync selectedJob with hash on mount/change to support browser back button
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/careers\/([^?]+)/);
      if (match) {
        const jobId = match[1];
        const found = JOBS_DATA.find(j => j.id === jobId);
        if (found) {
          setSelectedJob(found);
          setApplicantRole(found.title);
          window.scrollTo(0, 0);
          return;
        }
      }
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setApplicantRole("");
      setApplicantExperience("");
      setApplicantSkills("");
      setApplicantPortfolio("");
      setApplicantMessage("");
      setAppliedSubmitted(false);
      window.scrollTo(0, 0);
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      setAppliedSubmitted(true);
    }, 1500);
  };

  if (selectedJob) {
    return (
      <div className="bg-[#f3f4f6] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen pt-20">
        
        {/* DETAILED JOB VIEW */}
        <div className="flex-1 bg-[#f3f4f6]">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            
            {/* Back to careers button & department tag */}
            <div className="mb-8 flex flex-col items-start gap-4">
              <motion.button
                whileHover={{ x: -4 }}
                onClick={handleCloseApplyModal}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                Back to Careers
              </motion.button>

              <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-slate-800 uppercase bg-slate-50 border border-slate-200/60 rounded-full px-4.5 py-1.5">
                {selectedJob.department}
              </span>
            </div>

            <h1 className="font-display text-[32px] md:text-[44px] leading-[42px] md:leading-[54px] font-bold tracking-tight text-slate-900 mb-6 text-left">
              {selectedJob.title}
            </h1>

            {/* Meta info card */}
            <div className="flex flex-wrap items-center gap-6 border-y border-slate-200 py-4 mb-10 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-slate-400" />
                <span>{selectedJob.experience} Exp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                <span>{selectedJob.type}</span>
              </div>
            </div>

            {/* Main Content Layout: Details + Application Form */}
            <div className="flex flex-col gap-10 text-left mt-8">
              
              {/* Job Details Specification */}
              <div className="space-y-8 bg-white border border-slate-100 rounded-[32px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.015)]">
                <div>
                  <h4 className="font-display text-[15px] font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                    Job Overview
                  </h4>
                  <p className="font-sans text-[14.5px] leading-relaxed text-slate-600 font-light">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-[15px] font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                    Key Requirements
                  </h4>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-slate-600 font-light leading-relaxed">
                        <Check size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-[15px] font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                    Perks & Benefits
                  </h4>
                  <ul className="space-y-3">
                    {selectedJob.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-slate-600 font-light leading-relaxed">
                        <Star size={14} className="text-amber-500 fill-current mt-1 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="space-y-6 bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <h4 className="font-display text-[16px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Secure Application Portal
                </h4>
                <p className="text-xs text-slate-400 font-light mb-6">
                  Submit your details and file credentials below to register with our hiring team.
                </p>

                {appliedSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4">
                      <Check size={24} />
                    </div>
                    <h5 className="font-display text-base font-bold text-slate-900">Application Submitted!</h5>
                    <p className="font-sans text-xs text-slate-500 mt-2 leading-relaxed font-light">
                      Our HR department will review your credentials and contact you shortly.
                    </p>
                    <button
                      onClick={handleCloseApplyModal}
                      className="mt-6 w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                    >
                      Return to Careers
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="applicant-name" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="applicant-name"
                          name="name"
                          autoComplete="name"
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Anjali Nair"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="applicant-email" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Primary Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="applicant-email"
                          name="email"
                          autoComplete="email"
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="nair@engineering.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="applicant-phone" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="applicant-phone"
                          name="phone"
                          autoComplete="tel"
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                        />
                      </div>

                      {/* Experience Level */}
                      <div>
                        <label htmlFor="applicant-experience" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Experience Level <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="applicant-experience"
                          name="experience"
                          type="text"
                          required
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          placeholder="1-3 years"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                        />
                      </div>

                      {/* Notable Skills */}
                      <div>
                        <label htmlFor="applicant-skills" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Notable Skills <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="applicant-skills"
                          name="skills"
                          type="text"
                          required
                          value={applicantSkills}
                          onChange={(e) => setApplicantSkills(e.target.value)}
                          placeholder="AutoCAD, Staad.Pro, Sales Pitch, etc."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                        />
                      </div>

                      {/* Portfolio URL (Conditional for design job only) */}
                      {selectedJob.id === "design-eng-mms-chennai" && (
                        <div>
                          <label htmlFor="applicant-portfolio" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Portfolio URL (Required) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="applicant-portfolio"
                            name="portfolio"
                            autoComplete="url"
                            type="url"
                            required
                            value={applicantPortfolio}
                            onChange={(e) => setApplicantPortfolio(e.target.value)}
                            placeholder="https://behance.net/yourname (Mandatory)"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs font-medium bg-slate-50/50"
                          />
                        </div>
                      )}

                      {/* Resume Upload */}
                      <div className="md:col-span-2">
                        <label htmlFor="applicant-resume" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Submit Resume (PDF, DOCX max 5MB) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative border border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50/50 transition-colors cursor-pointer group">
                          <input
                            id="applicant-resume"
                            name="resume"
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <FileText size={24} className="text-slate-400 group-hover:text-[#0066fe] transition-colors" />
                            <span className="text-[12px] font-semibold text-slate-600">Select File</span>
                            <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 5MB</span>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter & Experience Summary */}
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Cover Letter & Experience Summary <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={applicantMessage}
                          onChange={(e) => setApplicantMessage(e.target.value)}
                          placeholder="Tell us why you want this job, details of your relevant experience, and what values you will bring to VRM Structures..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs font-medium resize-none bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={applyLoading}
                        className="w-full md:w-auto md:px-8 bg-[#0066fe] hover:bg-[#0052cc] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] cursor-pointer text-xs uppercase tracking-wider disabled:opacity-50 mt-2"
                      >
                        {applyLoading ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">

      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">

        {/* PHOTOGRAPHIC HERO BACKGROUND (INSPIRED CHENNAI MANUFACTURING ENGINEERING TEAM) */}
        <HeroImageBackground src="/images/hero-careers.jpg" alt="VRM Structures Clean Energy Engineering Team" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Build the Foundations of Clean Energy Infrastructure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Join VRM STRUCTURES in Chennai. We manufacture extreme-durability, structurally optimized solar mounting structures powering India's green transition.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="culture" />
        </div>
      </div>

      {/* CORE CULTURE SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-20 sm:pb-24 lg:pb-32 overflow-hidden" id="culture">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <section className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center text-left">

              {/* Left Column Arched Images Panel */}
              <div className="relative flex items-center justify-center py-10 lg:py-0">
                {/* Subtle back-glow */}
                <div className="absolute bg-emerald-50/60 rounded-full w-80 h-80 blur-3xl -z-10 -translate-x-10" />

                <div className="relative flex items-center gap-6 w-full max-w-[480px]">
                  {/* Sparkle / Starburst Icon */}
                  <div className="absolute -top-8 -left-2 text-emerald-500/80">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="animate-pulse">
                      <path d="M12 2v20M2 12h20M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Arched Image 1 (Left - Colorful collaboration) */}
                  <div className="w-1/2 aspect-[3/4.5] rounded-full overflow-hidden border border-slate-100 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
                      alt="Engineering collaboration"
                      className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Arched Image 2 Wrapper */}
                  <div className="relative w-1/2 translate-y-12">
                    <div className="w-full aspect-[3/4.5] rounded-full overflow-hidden border border-slate-100 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                        alt="Lead Structural Engineer"
                        className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Floating Badge (anchored relative to right image) */}
                    <div className="absolute -bottom-4 -right-4 bg-white border border-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.08)] rounded-2xl p-4 max-w-[170px] z-20 text-left">
                      <div className="text-[9px] uppercase tracking-wider font-bold text-emerald-600 mb-1">
                        Chennai Hub
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 leading-tight">
                        In-House Design & Fabrication Yards
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-slate-400 font-medium">Fully Operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Content Panel */}
              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.15)]">
                    <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-black uppercase">
                        Work Culture
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight max-w-xl"
                >
                  Why Engineers & Builders Thrive at VRM
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-500 text-[14px] sm:text-[15px] leading-[26px] max-w-xl mt-6 font-light"
                >
                  We merge high-accuracy design software with modern automated manufacturing to make structures that withstand India's harshest environments for 25+ years.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                  {/* Value Card 1 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
                      <Cpu size={18} />
                    </div>
                    <h3 className="font-display text-[16px] font-bold text-slate-950 tracking-tight">
                      Advanced Structural R&D
                    </h3>
                    <p className="font-sans text-slate-500 text-[12.5px] font-light mt-2 leading-relaxed">
                      Work with high-spec wind simulation scripts, Staad Pro models, and custom profile optimization metrics. We believe in design excellence, not over-design.
                    </p>
                  </div>

                  {/* Value Card 2 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                      <Award size={18} />
                    </div>
                    <h3 className="font-display text-[16px] font-bold text-slate-950 tracking-tight">
                      Galvanizing-grade Quality
                    </h3>
                    <p className="font-sans text-slate-500 text-[12.5px] font-light mt-2 leading-relaxed">
                      Every structure built at our yards is verified down to the micron. We teach you rigor and the precision standards required by top tier global solar developers.
                    </p>
                  </div>

                  {/* Value Card 3 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 sm:col-span-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                      <Users size={18} />
                    </div>
                    <h3 className="font-display text-[16px] font-bold text-slate-950 tracking-tight">
                      Chennai Hub
                    </h3>
                    <p className="font-sans text-slate-500 text-[12.5px] font-light mt-2 leading-relaxed">
                      Be a part of India's manufacturing backbone. Collaborate with skilled metal crafters and operational technicians in clean, safety-first fabrication yards.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>

      {/* OPEN VACANCIES SECTION */}
      <div id="openings-section" className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-0 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
          <section className="w-full">

            {/* PROCESS HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-12 sm:mb-16">

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
                      Join Us
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
                  Exciting Roles in Chennai
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-slate-500 text-[14px] sm:text-[16px] leading-[26px] max-w-3xl mt-4 font-light"
                >
                  Explore your fit. Select any vacancy to view criteria and directly submit an instant application.
                </motion.p>
              </div>
            </div>

            {/* ACTIVE POSITIONS LIST */}
            <div id="active-positions" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16 text-left">
              {JOBS_DATA.map((job) => {
                const isDesign = job.title.toLowerCase().includes("design") || job.title.toLowerCase().includes("engineer");
                const imageUrl = isDesign 
                  ? "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600"
                  : "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600";
                
                return (
                  <div
                    key={job.id}
                    onClick={() => handleOpenApplyModal(job)}
                    className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer group relative"
                  >
                    <div>
                      {/* Job Role Thumbnail */}
                      <div className="w-full h-56 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden bg-slate-100">
                        <img
                          src={imageUrl}
                          alt={job.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Hover Overlay with Icon */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-100 group-hover:bg-slate-950/50 transition-all duration-300 flex items-center justify-center">
                          <div className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 p-4.5 rounded-2xl text-white shadow-lg">
                            <Briefcase className="w-6 h-6 stroke-[1.5]" size={24} />
                          </div>
                        </div>
                      </div>

                      {/* Specs / Metadata Pills */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {job.type}
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <MapPin size={11} className="text-slate-400" />
                          {job.location}
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <Award size={11} className="text-slate-400" />
                          {job.experience} Exp
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[19px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="font-sans text-[10.5px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">
                        {job.department}
                      </p>

                      {/* Description */}
                      <p className="font-sans text-[13.5px] leading-relaxed text-slate-500 font-light mt-3.5 mb-5 line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Bottom CTA Arrow Indicator */}
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-600 border-t border-dashed border-slate-200/60 pt-4 mt-2">
                      <span>Apply Instantly</span>
                      <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-105 transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </section>
        </div>
      </div>

      {/* LET'S CONNECT: WE'RE HERE TO HELP SECTION */}
      <div className="bg-white relative z-10 w-full pt-20 md:pt-28 pb-24 sm:pb-32 overflow-hidden">
        {/* Colorful soft background glows matching the uploaded design exactly */}
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-r from-orange-300/20 via-pink-300/15 via-blue-400/15 via-sky-400/20 to-cyan-300/15 blur-[80px] sm:blur-[110px] pointer-events-none translate-y-12" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-r from-orange-400/20 via-rose-300/10 via-indigo-400/15 to-cyan-400/20 blur-[50px] sm:blur-[70px] pointer-events-none translate-y-6" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <section className="w-full flex flex-col items-center text-center">

            {/* AVATARS & RATING GROUP */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8"
            >
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Customer Avatar ${i + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              {/* Stars & Text Rating */}
              <div className="flex flex-col items-center sm:items-start leading-tight">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-current text-amber-500 stroke-[1.5]" />
                  ))}
                </div>
                <span className="font-sans text-[11.5px] font-bold text-slate-500 tracking-tight mt-1">
                  1,000+ customers joined
                </span>
              </div>
            </motion.div>

            {/* TITLE & DESCRIPTION */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.2] text-slate-950 tracking-tight max-w-2xl"
            >
              Partner with VRM Structures
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-slate-500 text-[14px] sm:text-[15.5px] leading-[26px] max-w-2xl mt-5 font-light"
            >
              Accelerate your solar power infrastructure deployment with Chennai's leading structural manufacturing specialists. Secure certified high-durability mounting structures built for extreme wind loads.
            </motion.p>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mt-8 sm:mt-10 w-full px-4"
            >
              <button
                onClick={() => onNavigate("contact")}
                className="w-full sm:w-auto bg-[#0066fe] hover:bg-[#0052cc] text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer text-xs uppercase tracking-wider"
              >
                Get in touch <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </motion.div>

          </section>
        </div>
      </div>

    </div>
  );
}
