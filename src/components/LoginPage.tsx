import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Mail, Lock, Phone, KeyRound, Globe,
  Home, Folder, FileText, MessageSquare, Settings, HelpCircle, Search, SlidersHorizontal,
  Calendar, Plus, Bell, UserPlus, LogOut, ChevronRight, Edit2, Trash2, XCircle,
  LayoutDashboard, Briefcase, BookOpen, ChevronLeft, MapPin, Clock, Award
} from 'lucide-react';
import { ImagineLogo } from './Artworks';

interface LoginPageProps {
  onNavigate?: (page: any, targetId?: string) => void;
  initialTab?: 'overview' | 'jobs' | 'articles';
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

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  colorFrom: string;
  colorTo: string;
}

export default function LoginPage({ onNavigate, initialTab }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [passwordOrOtp, setPasswordOrOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("vrm_admin_logged_in") === "true");

  const [adminSubTab, setAdminSubTab] = useState<'overview' | 'jobs' | 'articles' | 'settings'>(initialTab || 'overview');

  useEffect(() => {
    if (initialTab) {
      setAdminSubTab(initialTab);
    }
  }, [initialTab]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  // Settings form states
  const [companyName, setCompanyName] = useState("VRM Structures India Private Limited");
  const [companyEmail, setCompanyEmail] = useState("mms@vrmstructures.in");
  const [companyPhone, setCompanyPhone] = useState("+91 98843 09789");
  const [seoTitle, setSeoTitle] = useState("Solar Mounting Structure (MMS) Manufacturer");
  const [seoDesc, setSeoDesc] = useState("VRM Structures India Private Limited is a leading manufacturer of high-quality hot-dip galvanized & aluminum solar mounting structures.");
  const [analyticsId, setAnalyticsId] = useState("UA-19842621-1");
  const [adminName, setAdminName] = useState("Velmurugan Rathinam");
  const [adminPass, setAdminPass] = useState("••••••••");
  
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; text: string; time: string; read: boolean }[]>(() => {
    const stored = localStorage.getItem("vrm_notifications");
    return stored ? JSON.parse(stored) : [
      { id: "notif-1", text: "Welcome to VRM Structures Admin Dashboard Portal.", time: "10:30 AM", read: false },
      { id: "notif-2", text: "System Online & Securely Connected to Renewables Infrastructure DB.", time: "09:15 AM", read: false }
    ];
  });
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const addNotification = (text: string) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem("vrm_notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    // Seed initial jobs data if not present or incomplete
    const storedJobs = localStorage.getItem("vrm_jobs_data");
    const defaultJobs: Job[] = [
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

    if (!storedJobs || JSON.parse(storedJobs).length < 4) {
      localStorage.setItem("vrm_jobs_data", JSON.stringify(defaultJobs));
    }

    // Seed initial articles data if not present or incomplete
    const storedArticles = localStorage.getItem("vrm_articles_data");
    const defaultArticles: Article[] = [
      {
        id: "mms-foundation-solar-success",
        title: "Building the Foundation for India’s Solar Success: The Role of Module Mounting Structures - VRM STRUCTURES",
        category: "Placement Yield",
        excerpt: "In the dynamic landscape of India's solar industry, Module Mounting Structures (MMS) stand as essential pillars supporting the nation's ambitious renewable energy goals. As the country strives to enhance its solar capacity and reduce dependency on fossil fuels, the significance of robust and efficient MMS cannot be overstated.",
        content: [
          "In the dynamic landscape of India's solar industry, Module Mounting Structures (MMS) stand as essential pillars supporting the nation's ambitious renewable energy goals. As the country strives to enhance its solar capacity and reduce dependency on fossil fuels, the significance of robust and efficient MMS cannot be overstated.",
          "Empowering India's Solar Revolution: The Role of Module Mounting Structures",
          "The Growth Trajectory of India's Solar Market: India has emerged as a global leader in renewable energy deployment, with solar energy playing a pivotal role in its sustainable development agenda. The government's initiatives, including the PM Surya Ghar Muft Bijli Yojana and various state policies, have propelled rapid growth in solar installations across the country. Today, India's solar capacity continues to expand, driven by competitive tariffs, technological advancements, and increasing environmental consciousness.",
          "Understanding the Critical Role of Module Mounting Structures: At the heart of every solar installation lies the Module Mounting Structure, which serves multiple crucial functions: 1) Optimal Panel Orientation: MMS ensures solar panels are positioned at precise angles to maximize sunlight exposure, thereby optimizing energy generation efficiency. 2) Durability and Reliability: In India's diverse climatic conditions, MMS must withstand high wind speeds, torrential rains, and extreme temperatures to ensure long-term operational reliability. 3) Support for Innovation: As technology evolves, MMS must adapt to accommodate newer panel designs and configurations, supporting innovations in solar energy production.",
          "VRM Structures India Pvt Ltd: Pioneering Excellence in MMS: Amidst the evolving landscape of India's solar sector, VRM Structures India Pvt Ltd has emerged as a trusted partner in providing cutting-edge Module Mounting Structures. We offer customized solutions designed to meet specific project requirements, ensuring optimal performance and efficiency. With a team of experienced professionals, we provide comprehensive support from design to installation, addressing complex challenges and delivering superior results. Our solutions prioritize durability and environmental sustainability (such as tailored solar carport structures built with high-grade steel for commercial applications), aligning with India's vision for a greener future.",
          "Partnering for a Sustainable Future: As India continues its journey towards renewable energy leadership, collaboration and innovation in MMS will be pivotal. At VRM Structures India Pvt Ltd, we are committed to empowering the solar revolution by providing reliable, high-quality MMS solutions that drive efficiency, sustainability, and long-term value. Let's harness the power of solar energy together and pave the way for a brighter, cleaner future. VRM Structures India Private Limited."
        ],
        date: "July 10, 2026",
        readTime: "5 Min Read",
        author: "Velmurugan Rathinam",
        authorRole: "Founder & Director Of VRM Structure",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#FF5D63",
        colorTo: "#FF8B91"
      },
      {
        id: "surya-ghar-yojana-mms",
        title: "MMS for PM Surya Ghar Muft Bijli Yojana - VRM STRUCTURES",
        category: "Placement Yield",
        excerpt: "VRM Structures India Private Limited is a leading name in the manufacturing of Solar PV Module Mounting Structures (MMS). As your comprehensive partner for Design, Fabrication, and Installation, we ensure our solutions meet both International and National Standards.",
        content: [
          "VRM Structures India Private Limited is a leading name in the manufacturing of Solar PV Module Mounting Structures (MMS). As your comprehensive partner for Design, Fabrication, and Installation, we ensure our solutions meet both International and National Standards.",
          "Empowering Residential Solar with PM Surya Ghar Muft Bijli Yojana: We are confident that our solutions align perfectly with the PM Surya Ghar Muft Bijli Yojana project’s requirements. Feel free to reach out if you need further information or wish to discuss your project needs.",
          "Our Offerings Include: 1) Ready stock of Hot Dip Galvanized Materials: Tailored solutions from 2kW to 10kW projects. 2) Diverse Mounting Options: Standard, Elevated, and fully Customized Structures. 3) Flexible Clearances: Ground clearance options ranging from 500mm to 3000mm. 4) Premium Coating: Minimum galvanizing thickness coating of 85 microns to guarantee corrosion resistance.",
          "Our team conducts precise site measurements and provides detailed STAAD Analysis, validated by IIT Chennai. Our structures are versatile and suitable for various module dimensions through clamps and panel mounting.",
          "Learn More and Get Started: For more details, check out our product demonstration and download our comprehensive Product Brochure. We look forward to connecting with you! VRM Structures India Private Limited."
        ],
        date: "June 28, 2026",
        readTime: "4 Min Read",
        author: "Velmurugan Rathinam",
        authorRole: "Founder & Director Of VRM Structures",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#FF8C42",
        colorTo: "#FFAE7A"
      },
      {
        id: "boost-bifacial-performance-mms",
        title: "Boost Bifacial Panel Performance with VRM Structures: Maximizing Solar Generation Efficiency",
        category: "Wind Dynamics",
        excerpt: "Mounting structures play a crucial role in optimizing the performance of bifacial solar panels, which generate electricity from both their front and rear surfaces by capturing direct sunlight and reflected light (albedo). Specially designed mounting structures significantly enhance the energy output of bifacial panels.",
        content: [
          "Mounting structures play a crucial role in optimizing the performance of bifacial solar panels, which generate electricity from both their front and rear surfaces by capturing direct sunlight and reflected light (albedo). Specially designed mounting structures significantly enhance the energy output of bifacial panels.",
          "1. Elevated Mounting for Improved Albedo Capture: Bifacial panels perform best when they can capture reflected light from the ground or surrounding surfaces. Mounting structures designed for bifacial modules are often elevated higher than traditional ones to maximize the exposure of the rear side to sunlight and reflected light. The increased height helps reduce shading on the rear side, allowing more light to reach it, which directly increases the panel’s energy output.",
          "2. Optimal Tilt and Orientation: Mounting structures for bifacial panels are engineered to provide the ideal tilt angle, enhancing direct sunlight absorption on the front side while maximizing the amount of reflected light hitting the rear side. Adjusting the tilt angle for seasonal changes can further increase the energy generation from both sides, improving the overall efficiency of the bifacial system.",
          "3. Ground Surface Considerations: The choice of ground surface material below bifacial panels significantly impacts the albedo reflection. A well-designed mounting system ensures that the ground is optimized for high reflectivity, allowing for the use of reflective surfaces like white gravel, sand, or specialized coatings that enhance the panel's rear-side generation.",
          "4. Minimized Shading and Structural Interference: Bifacial-specific mounting structures are designed to minimize shading caused by the system’s own components, like rails, beams, and supports. By adopting a slim profile to reduce shadowing on the rear side of the panel, these systems help maintain a consistent level of light on the rear surface, maximizing the bifacial gain.",
          "5. Single-axis and Dual-axis Trackers: Using solar trackers with bifacial panels significantly boosts energy generation. Trackers adjust the angle of the panels throughout the day to follow the sun's path, ensuring that the front side gets maximum exposure while also enhancing rear-side illumination. This dynamic adjustment, combined with the bifacial capability, can lead to a substantial increase in overall energy output.",
          "6. Durable and Stable Structures: Bifacial panels require durable, stable structures due to their unique load distributions and dual-surface operations. High-quality materials like galvanized steel are used to ensure long-term stability and resistance to harsh weather conditions, keeping panels securely aligned.",
          "7. Compatibility and Versatility: Whether on rooftops, ground-mount systems, or floating solar farms, VRM Structures offers specialized mounting solutions (elevated custom mounts, tailored engineering, tracking compatibility) designed to maximize bifacial gain and deliver a higher return on investment."
        ],
        date: "June 15, 2026",
        readTime: "6 Min Read",
        author: "Velmurugan Rathinam",
        authorRole: "Founder & Director Of VRM Structures",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#4D62E8",
        colorTo: "#7B8CFF"
      },
      {
        id: "aluminum-rail-height-metal-roof",
        title: "The Importance of Height in Aluminum Mounting Rails for Solar Panels",
        category: "Quality Control",
        excerpt: "Explore why the height of aluminum mounting rails is critical for optimal airflow, thermal expansion, water runoff, and keeping your solar panel warranties active.",
        content: [
          "In the rapidly evolving field of solar energy, the efficiency and longevity of solar panel installations are paramount. One critical factor often overlooked is the height of aluminum mounting rails used to secure solar panels to metal roofs. This article explores why the height of these rails is important, the minimum height required, the advantages of proper rail height, and the implications for panel warranties.",
          "Why Height Matters: When installing solar panels on metal roofs, the height of the aluminum mounting rails is crucial for several reasons. First is Optimal Airflow: Higher mounting rails promote better airflow beneath the solar panels, reducing heat buildup and enhancing the efficiency of the panels. Elevated panels can cool more effectively, leading to improved energy production. Second is Avoiding Water Accumulation: Adequate height prevents water pooling around the mounting brackets and panels, which can lead to corrosion of the metal components and potential damage to the roof and the solar system itself. Third is Accommodating Thermal Expansion: Metal roofs can expand and contract with temperature changes. A higher rail height allows for necessary movement, reducing stress on the panels and the mounting system.",
          "Minimum Height Requirements: The minimum height for aluminum mounting rails typically depends on the specific solar panel and manufacturer guidelines. However, a common industry recommendation is to maintain a rail height of at least 4 to 6 inches above the metal roof surface. This height ensures adequate airflow and prevents water accumulation while accommodating thermal expansion.",
          "Advantages of Proper Rail Height: Proper rail height contributes directly to Enhanced Energy Efficiency, allowing panels to operate at cooler temperatures for higher energy output. It also ensures Improved Longevity by preventing water pooling and allowing for thermal expansion, extending the lifespan of both the solar panels and the roofing materials. Finally, it ensures Compliance with Industry Standards, meeting local building codes and industry best practices.",
          "Manufacturer Recommendations and Warranty Implications: Most solar panel manufacturers provide specific installation guidelines, including recommendations for mounting rail height. Adhering to these guidelines is crucial not only for optimizing performance but also for maintaining warranty coverage. If lower height rails are used contrary to the manufacturer’s specifications, it may void the warranty on the solar panels. Therefore, it is essential to consult the panel manufacturer’s recommendations to understand the minimum height required for your specific installation. Generally, a height of 4 to 6 inches is advised, but it can vary, so always check the manufacturer's documentation.",
          "VRM Structures India Private Limited: Your Trusted Partner: At VRM Structures India Private Limited, we understand the significance of proper mounting solutions for solar panel installations. Our aluminum mounting rails are designed to meet industry standards while providing optimal height for enhancing efficiency and durability. We are committed to supporting our clients by offering expert guidance on installation practices, including rail height, to ensure compliance with manufacturer recommendations. Trust VRM Structures to provide the expertise and products necessary to make your solar project a success."
        ],
        date: "July 12, 2026",
        readTime: "4 Min Read",
        author: "HR Division",
        authorRole: "Talent Acquisition Team",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#00C9FF",
        colorTo: "#92FE9D"
      },
      {
        id: "optimizing-solar-tilt-angles",
        title: "Optimizing Solar Tilt Angles: VRM Structures India Pvt Ltd’s Customized Mounting Solutions for Maximum Solar Efficiency - Part 1",
        category: "Engineering",
        excerpt: "Part 1 of our guide outlines how to determine the optimal tilt angle for solar modules based on latitude, seasonal dynamics, and local terrain parameters.",
        content: [
          "Identifying the optimal tilt angle for solar modules and ensuring the mounting structure contributes to better efficiency are crucial steps in maximizing the energy output of a solar PV system. Here's how these aspects work together.",
          "1. Determining Optimal Tilt Angle Based on Location: The tilt angle of solar panels should be based on the geographic location and site conditions. The general rule is that the tilt angle should be close to the latitude of the location for maximum efficiency (e.g. 20° tilt for a 20° latitude). Decreasing the tilt by 10-15° in summer captures more sunlight when the sun is high, while increasing it by 10-15° in winter maximizes low-lying sun exposure. Alternatively, trackers or solar design tools like PVGIS or Helioscope can calculate dynamic tilt coordinates based on site shadowing and roof orientation.",
          "2. Role of Mounting Structures in Maximizing Efficiency: Fixed tilt mounting structures are engineered with pre-set optimal tilt angles, while adjustable structures allow manual changes to capitalize on seasonal variances. Shading is minimized through spacing in ground installations, ventilation is enhanced by elevating panels above surfaces to cool modules, and load resistance guards against mechanical damage from heavy winds. Trackers can dynamically follow the sun to increase generation by 25-35%.",
          "3. Maximizing Efficiency with Tilt and Mounting Structures: In summary, aligning the tilt with geographic latitude, using ventilated and secure structures, and adopting trackers on large projects harvests the maximum possible solar energy. For example, a site at 15° latitude will optimize with a 15° average tilt (5-10° summer tilt, and 25-30° winter tilt) for peak year-round production.",
          "With VRM Structures India Private Limited, you get advanced mounting solutions specifically designed to support superior performance, ensuring you get the maximum energy output and returns from your solar investments."
        ],
        date: "July 05, 2026",
        readTime: "6 Min Read",
        author: "Operations Team",
        authorRole: "Manufacturing Technology Group",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#11998e",
        colorTo: "#38ef7d"
      },
      {
        id: "p-type-vs-n-type-pv-cells",
        title: "Differences between P-type and N-type photovoltaic (PV) cells",
        category: "Engineering",
        excerpt: "An engineering comparison detailing the doping processes, majority carrier dynamics, degradation patterns, and efficiency differences between P-type and N-type PV cells.",
        content: [
          "Photovoltaic (PV) cells are fundamentally categorized into P-type and N-type cells depending on their chemical doping. When selecting solar panels for residential or commercial installations, understanding this underlying semiconductor technology is vital to assessing performance, lifespan, and long-term return on investment.",
          "P-Type PV Cells: Doped with elements like boron, creating 'holes' (positive charge carriers) that act as majority carriers. They are typically less expensive to manufacture, though they offer slightly lower conversion efficiency compared to N-type cells and are more susceptible to Light-Induced Degradation (LID) over their operating lifespan.",
          "N-Type PV Cells: Doped with elements like phosphorus, adding extra electrons (negative charge carriers) that act as majority carriers. This enables higher conversion efficiency, better performance in low-light conditions, and exceptional resistance to Light-Induced Degradation (LID) for an extended operational lifespan.",
          "Reasons for the Industry Shift to N-Type Technology: 1) Higher Efficiency: Better conversion ratios translate to more electricity from the same module footprint. 2) Better Low-Light Performance: Stronger generation during cloudy or shaded periods. 3) Longevity and Durability: Less drop-off in generation capacity over time. 4) Improved Temperature Coefficient: Enhanced operational performance in hot climates. 5) Market Trend: Major manufacturers are scaling N-type production, driving down costs.",
          "In summary, while P-type cells remain highly cost-effective, the superior efficiency, temperature coefficient, and durability characteristics of N-type cells are driving consumer preference for long-term and high-yield energy projects. Trust VRM Structures India Private Limited to provide mounting rails and trackers engineered to support these state-of-the-art solar installations."
        ],
        date: "June 20, 2026",
        readTime: "5 Min Read",
        author: "Training Academy",
        authorRole: "Safety and Human Development",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        colorFrom: "#8e2de2",
        colorTo: "#4a00e0"
      }
    ];

    if (!storedArticles || JSON.parse(storedArticles).length < 6) {
      localStorage.setItem("vrm_articles_data", JSON.stringify(defaultArticles));
    }

    const loadData = () => {
      const storedJobs = localStorage.getItem("vrm_jobs_data");
      if (storedJobs) setJobs(JSON.parse(storedJobs));
      const storedArticles = localStorage.getItem("vrm_articles_data");
      if (storedArticles) setArticles(JSON.parse(storedArticles));
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const saveJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem("vrm_jobs_data", JSON.stringify(newJobs));
    window.dispatchEvent(new Event("storage"));
  };

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("vrm_articles_data", JSON.stringify(newArticles));
    window.dispatchEvent(new Event("storage"));
  };

  const renderJobsManager = () => {
    if (editingJob) {
      return (
        <div className="col-span-12 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {editingJob.id ? 'Edit Job Opening' : 'Create Job Opening'}
            </h2>
            <button
              onClick={() => setEditingJob(null)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const requirements = (editingJob.requirements as any) || [];
              const perks = (editingJob.perks as any) || [];
              const reqArray = typeof requirements === 'string' 
                ? (requirements as string).split('\n').map(r => r.trim()).filter(Boolean)
                : requirements;
              const perkArray = typeof perks === 'string'
                ? (perks as string).split('\n').map(p => p.trim()).filter(Boolean)
                : perks;

              const jobToSave: Job = {
                id: editingJob.id || `job-${Date.now()}`,
                title: editingJob.title || '',
                department: editingJob.department || 'General',
                location: editingJob.location || 'Chennai',
                type: editingJob.type || 'Full-Time',
                experience: editingJob.experience || 'Freshers',
                description: editingJob.description || '',
                requirements: reqArray,
                perks: perkArray,
              };

              let updatedJobs: Job[];
              if (editingJob.id) {
                updatedJobs = jobs.map(j => j.id === editingJob.id ? jobToSave : j);
                addNotification(`Updated Job Posting: "${jobToSave.title}"`);
              } else {
                updatedJobs = [jobToSave, ...jobs];
                addNotification(`New Job Posting Published: "${jobToSave.title}"`);
              }
              saveJobs(updatedJobs);
              setEditingJob(null);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Title</label>
              <input
                type="text"
                required
                value={editingJob.title || ''}
                onChange={e => setEditingJob({...editingJob, title: e.target.value})}
                placeholder="e.g. Senior Structural Engineer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Department</label>
              <input
                type="text"
                required
                value={editingJob.department || ''}
                onChange={e => setEditingJob({...editingJob, department: e.target.value})}
                placeholder="e.g. Design Division"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
              <input
                type="text"
                required
                value={editingJob.location || ''}
                onChange={e => setEditingJob({...editingJob, location: e.target.value})}
                placeholder="e.g. Chennai"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Type</label>
              <select
                value={editingJob.type || 'Full-Time'}
                onChange={e => setEditingJob({...editingJob, type: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Experience Required</label>
              <input
                type="text"
                required
                value={editingJob.experience || ''}
                onChange={e => setEditingJob({...editingJob, experience: e.target.value})}
                placeholder="e.g. Freshers, 2-5 Years"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Description</label>
              <textarea
                required
                rows={3}
                value={editingJob.description || ''}
                onChange={e => setEditingJob({...editingJob, description: e.target.value})}
                placeholder="Provide a brief introductory description..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Requirements</label>
              <span className="text-[10px] text-slate-400 block mb-2">Enter each requirement on a new line</span>
              <textarea
                required
                rows={5}
                value={Array.isArray(editingJob.requirements) ? editingJob.requirements.join('\n') : (editingJob.requirements || '')}
                onChange={e => setEditingJob({...editingJob, requirements: e.target.value as any})}
                placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Perks & Benefits</label>
              <span className="text-[10px] text-slate-400 block mb-2">Enter each perk on a new line</span>
              <textarea
                required
                rows={5}
                value={Array.isArray(editingJob.perks) ? editingJob.perks.join('\n') : (editingJob.perks || '')}
                onChange={e => setEditingJob({...editingJob, perks: e.target.value as any})}
                placeholder="Perk 1&#10;Perk 2&#10;Perk 3..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#18181B] text-white hover:bg-black font-bold text-xs cursor-pointer"
              >
                Save Opening
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="col-span-12 bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900">Active Job Postings</h3>
            <p className="text-xs text-slate-500 mt-1">Create, update, or remove job listings on your Careers page</p>
          </div>
          <button
            onClick={() => setEditingJob({})}
            className="px-4 py-2 rounded-full bg-[#18181B] text-white hover:bg-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Job Opening
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl p-8 max-w-md mx-auto">
            <Briefcase size={32} className="mx-auto text-slate-400 mb-4 stroke-[1.5]" />
            <h3 className="font-display text-base font-bold text-slate-800">No Job Openings</h3>
            <p className="font-sans text-xs text-slate-500 mt-2 font-light leading-relaxed">
              Click "Add Job Opening" to post a new opening.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const isDesign = job.title?.toLowerCase().includes("design") || job.title?.toLowerCase().includes("engineer");
              const imageUrl = isDesign 
                ? "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600"
                : "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600";
              
              return (
                <div
                  key={job.id}
                  className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between text-left group relative"
                >
                  <div>
                    {/* Job Role Thumbnail */}
                    <div className="w-full h-44 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden bg-slate-100">
                      <img
                        src={imageUrl}
                        alt={job.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Hover Overlay with Icon */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-100 group-hover:bg-slate-950/50 transition-all duration-300 flex items-center justify-center">
                        <div className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white shadow-lg">
                          <Briefcase className="w-6 h-6 stroke-[1.5]" size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Specs / Metadata Pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {job.type}
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <MapPin size={11} className="text-slate-400" />
                        {job.location}
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <Award size={11} className="text-slate-400" />
                        {job.experience} Exp
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-[18px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[13px] leading-relaxed text-slate-500 font-light mt-3 mb-5 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Actions & Department Footer */}
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 border-t border-dashed border-slate-200/60 pt-4 mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.department}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                        title="Edit Job"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${job.title}"?`)) {
                            addNotification(`Deleted Job Posting: "${job.title}"`);
                            saveJobs(jobs.filter(j => j.id !== job.id));
                          }
                        }}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all cursor-pointer"
                        title="Delete Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderArticlesManager = () => {
    if (editingArticle) {
      return (
        <div className="col-span-12 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {editingArticle.id ? 'Edit Article' : 'Write New Article'}
            </h2>
            <button
              onClick={() => setEditingArticle(null)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = (editingArticle.content as any) || [];
              const contentArray = typeof content === 'string'
                ? (content as string).split('\n\n').map(p => p.trim()).filter(Boolean)
                : content;

              const articleToSave: Article = {
                id: editingArticle.id || `art-${Date.now()}`,
                title: editingArticle.title || '',
                category: editingArticle.category || 'Engineering',
                excerpt: editingArticle.excerpt || '',
                content: contentArray,
                date: editingArticle.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                readTime: editingArticle.readTime || '5 Min Read',
                author: editingArticle.author || 'Velmurugan Rathinam',
                authorRole: editingArticle.authorRole || 'Founder & Director Of VRM Structures',
                authorAvatar: editingArticle.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
                image: editingArticle.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
                colorFrom: editingArticle.colorFrom || '#FC466B',
                colorTo: editingArticle.colorTo || '#3F5EFB',
              };

              let updatedArticles: Article[];
              if (editingArticle.id) {
                updatedArticles = articles.map(a => a.id === editingArticle.id ? articleToSave : a);
                addNotification(`Updated Article: "${articleToSave.title}"`);
              } else {
                updatedArticles = [articleToSave, ...articles];
                addNotification(`New Article Published: "${articleToSave.title}"`);
              }
              saveArticles(updatedArticles);
              setEditingArticle(null);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Article Title</label>
              <input
                type="text"
                required
                value={editingArticle.title || ''}
                onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                placeholder="e.g. The Future of Smart Solar Trackers in India"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
              <select
                value={editingArticle.category || 'Engineering'}
                onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              >
                <option value="Engineering">Engineering</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Careers">Careers</option>
                <option value="Best Practices">Best Practices</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Read Time</label>
              <input
                type="text"
                required
                value={editingArticle.readTime || ''}
                onChange={e => setEditingArticle({...editingArticle, readTime: e.target.value})}
                placeholder="e.g. 5 Min Read"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author Name</label>
              <input
                type="text"
                required
                value={editingArticle.author || ''}
                onChange={e => setEditingArticle({...editingArticle, author: e.target.value})}
                placeholder="Velmurugan Rathinam"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author Role / Designation</label>
              <input
                type="text"
                required
                value={editingArticle.authorRole || ''}
                onChange={e => setEditingArticle({...editingArticle, authorRole: e.target.value})}
                placeholder="Founder & Director Of VRM Structures"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Featured Image</label>
              <div className="space-y-3">
                {editingArticle.image && (
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                    <img src={editingArticle.image} alt="Featured Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upload from Computer</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setEditingArticle({ ...editingArticle, image: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Or Paste Image URL</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.image?.startsWith('data:') ? '' : (editingArticle.image || '')}
                      placeholder="Paste URL here..."
                      onChange={e => setEditingArticle({ ...editingArticle, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Publish Date</label>
              <input
                type="text"
                required
                value={editingArticle.date || ''}
                onChange={e => setEditingArticle({...editingArticle, date: e.target.value})}
                placeholder="e.g. June 25, 2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Excerpt / Summary</label>
              <textarea
                required
                rows={2}
                value={editingArticle.excerpt || ''}
                onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                placeholder="Provide a brief summary card excerpt..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Article Body (Block Editor)</label>
                  <span className="text-[10px] text-slate-400 block">Add, edit, reorder headings, text, images, and links like Behance.</span>
                </div>
              </div>

              {/* Blocks container */}
              <div className="space-y-4 mb-6">
                {(() => {
                  const blocks = Array.isArray(editingArticle.content) ? editingArticle.content : [];
                  if (blocks.length === 0) {
                    return (
                      <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/50">
                        <p className="text-slate-400 text-xs font-light">No content blocks added yet. Use the buttons below to build your article.</p>
                      </div>
                    );
                  }

                  return blocks.map((blockVal, idx) => {
                    let type = "paragraph";
                    let contentVal = blockVal;

                    if (blockVal.startsWith("HEADING:")) {
                      type = "heading";
                      contentVal = blockVal.replace("HEADING:", "");
                    } else if (blockVal.startsWith("IMAGE:")) {
                      type = "image";
                      contentVal = blockVal.replace("IMAGE:", "");
                    } else if (blockVal.startsWith("LINK:")) {
                      type = "link";
                      contentVal = blockVal.replace("LINK:", "");
                    }

                    // Handlers for modifying this specific block
                    const updateBlock = (newVal: string) => {
                      const updated = [...blocks];
                      updated[idx] = newVal;
                      setEditingArticle({ ...editingArticle, content: updated });
                    };

                    const removeBlock = () => {
                      const updated = blocks.filter((_, i) => i !== idx);
                      setEditingArticle({ ...editingArticle, content: updated });
                    };

                    const moveBlock = (direction: 'up' | 'down') => {
                      if (direction === 'up' && idx === 0) return;
                      if (direction === 'down' && idx === blocks.length - 1) return;
                      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
                      const updated = [...blocks];
                      const temp = updated[idx];
                      updated[idx] = updated[targetIdx];
                      updated[targetIdx] = temp;
                      setEditingArticle({ ...editingArticle, content: updated });
                    };

                    return (
                      <div key={idx} className="border border-slate-200/80 rounded-2xl bg-white p-4 shadow-sm hover:shadow transition-shadow flex gap-4 items-start">
                        {/* Type Icon and Indicator */}
                        <div className="flex flex-col items-center gap-1.5 pt-1">
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                            type === 'heading' ? 'bg-amber-100 text-amber-700' :
                            type === 'image' ? 'bg-emerald-100 text-emerald-700' :
                            type === 'link' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                        </div>

                        {/* Block Editors */}
                        <div className="flex-1 min-w-0">
                          {type === 'heading' && (
                            <input
                              type="text"
                              required
                              value={contentVal}
                              placeholder="Section Heading Text..."
                              onChange={e => updateBlock("HEADING:" + e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-white"
                            />
                          )}

                          {type === 'paragraph' && (
                            <textarea
                              required
                              rows={3}
                              value={contentVal}
                              placeholder="Write your text paragraph here..."
                              onChange={e => updateBlock(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-light focus:outline-none focus:border-slate-500 bg-white"
                            />
                          )}

                          {type === 'image' && (() => {
                            const parts = contentVal.split("|");
                            const url = parts[0] || "";
                            const caption = parts[1] || "";

                            const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  if (typeof reader.result === 'string') {
                                    updateBlock("IMAGE:" + reader.result + "|" + caption);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            };

                            return (
                              <div className="space-y-3">
                                {url && (
                                  <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upload from Computer</label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileUpload}
                                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Or Paste Image URL</label>
                                    <input
                                      type="text"
                                      required
                                      value={url.startsWith('data:') ? '' : url}
                                      placeholder="Paste URL here..."
                                      onChange={e => updateBlock("IMAGE:" + e.target.value + "|" + caption)}
                                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 bg-white"
                                    />
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={caption}
                                  placeholder="Optional Image Caption / Alt Text"
                                  onChange={e => updateBlock("IMAGE:" + url + "|" + e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 bg-white"
                                />
                              </div>
                            );
                          })()}

                          {type === 'link' && (() => {
                            const parts = contentVal.split("|");
                            const label = parts[0] || "";
                            const url = parts[1] || "";
                            return (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  required
                                  value={label}
                                  placeholder="Button Label (e.g. Learn More)"
                                  onChange={e => updateBlock("LINK:" + e.target.value + "|" + url)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                />
                                <input
                                  type="text"
                                  required
                                  value={url}
                                  placeholder="Destination URL (e.g. https://...)"
                                  onChange={e => updateBlock("LINK:" + label + "|" + e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                />
                              </div>
                            );
                          })()}
                        </div>

                        {/* Controls (Reorder / Delete) */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveBlock('up')}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            disabled={idx === blocks.length - 1}
                            onClick={() => moveBlock('down')}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={removeBlock}
                            className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Action Buttons to Add New Blocks */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2.5 justify-center items-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase mr-1">Add Element:</span>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(editingArticle.content) ? editingArticle.content : [];
                    setEditingArticle({ ...editingArticle, content: [...current, ""] });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Text Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(editingArticle.content) ? editingArticle.content : [];
                    setEditingArticle({ ...editingArticle, content: [...current, "HEADING:"] });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-xs font-medium text-amber-700 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Heading Section
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(editingArticle.content) ? editingArticle.content : [];
                    setEditingArticle({ ...editingArticle, content: [...current, "IMAGE:|"] });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-medium text-emerald-700 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Image Block
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(editingArticle.content) ? editingArticle.content : [];
                    setEditingArticle({ ...editingArticle, content: [...current, "LINK:|"] });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-xs font-medium text-indigo-700 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Link / CTA Button
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#18181B] text-white hover:bg-black font-bold text-xs cursor-pointer"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="col-span-12 bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900">Published Articles</h3>
            <p className="text-xs text-slate-500 mt-1">Manage educational blogs, insights, and news updates</p>
          </div>
          <button
            onClick={() => setEditingArticle({})}
            className="px-4 py-2 rounded-full bg-[#18181B] text-white hover:bg-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Write New Article
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl p-8 max-w-md mx-auto">
            <BookOpen size={32} className="mx-auto text-slate-400 mb-4 stroke-[1.5]" />
            <h3 className="font-display text-base font-bold text-slate-800">No Published Articles</h3>
            <p className="font-sans text-xs text-slate-500 mt-2 font-light leading-relaxed">
              Click "Write New Article" to post your first article.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between text-left group relative"
              >
                <div>
                  {/* Article Thumbnail cover */}
                  <div className="w-full h-44 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover Overlay with Icon */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-100 group-hover:bg-slate-950/50 transition-all duration-300 flex items-center justify-center">
                      <div className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white shadow-lg">
                        <BookOpen className="w-6 h-6 stroke-[1.5]" size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Specs / Category & readTime pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {art.category}
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-400" />
                      {art.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[18px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-[13px] leading-relaxed text-slate-500 font-light mt-3 mb-5 line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>

                {/* Actions & Author Metadata Footer */}
                <div className="flex items-center justify-between text-xs font-bold text-indigo-600 border-t border-dashed border-slate-200/60 pt-4 mt-2">
                  <div className="flex flex-col text-left">
                    <span className="text-slate-700 font-semibold text-[11px]">By {art.author}</span>
                    <span className="text-[10px] text-slate-400 font-light mt-0.5">{art.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingArticle(art)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${art.title}"?`)) {
                          addNotification(`Deleted Article: "${art.title}"`);
                          saveArticles(articles.filter(a => a.id !== art.id));
                        }
                      }}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSettingsManager = () => {
    return (
      <div className="col-span-12 bg-white rounded-[32px] p-8 border border-slate-100/50 shadow-sm text-left">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800">System & General Settings</h2>
          <p className="text-xs text-slate-400 mt-1">Configure global variables, metadata SEO details, and administrator account preferences.</p>
        </div>

        <form 
          onSubmit={e => {
            e.preventDefault();
            addNotification("System Settings saved successfully.");
            alert("Settings successfully updated!");
          }}
          className="space-y-8"
        >
          {/* Section 1: Company Profile */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Company Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={companyName} 
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Email</label>
                <input 
                  type="email" 
                  value={companyEmail} 
                  onChange={e => setCompanyEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Phone</label>
                <input 
                  type="text" 
                  value={companyPhone} 
                  onChange={e => setCompanyPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Global SEO */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Global SEO & Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Default Meta Title</label>
                <input 
                  type="text" 
                  value={seoTitle} 
                  onChange={e => setSeoTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Google Analytics ID</label>
                <input 
                  type="text" 
                  value={analyticsId} 
                  onChange={e => setAnalyticsId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Default Meta Description</label>
                <textarea 
                  rows={3} 
                  value={seoDesc} 
                  onChange={e => setSeoDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white resize-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3: Admin Credentials */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Account Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Administrator Name</label>
                <input 
                  type="text" 
                  value={adminName} 
                  onChange={e => setAdminName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update Password</label>
                <input 
                  type="password" 
                  value={adminPass} 
                  onChange={e => setAdminPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm bg-white"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-sm select-none"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (isLoggedIn) {
    return (
      <div className="w-full bg-[#F4F4F6] min-h-screen text-slate-800 font-sans flex p-4 lg:p-6 overflow-x-hidden select-none">
        
        {/* SIDEBAR NAVIGATION (LEFT) */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarExpanded ? 240 : 80 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-[#18181B] text-white rounded-[32px] py-6 px-4 flex flex-col items-center justify-between shadow-xl shrink-0 hidden md:flex fixed left-4 lg:left-6 top-4 lg:top-6 h-[calc(100vh-32px)] lg:h-[calc(100vh-48px)] z-30 overflow-visible"
        >
          {/* Logo Brand Icon */}
          <div className="w-full flex items-center bg-white/10 rounded-2xl p-2 cursor-pointer hover:bg-white/20 transition-all select-none justify-center">
            {isSidebarExpanded ? (
              <ImagineLogo invert />
            ) : (
              <div className="w-10 h-10 bg-white/10 rounded-xl overflow-visible flex items-center justify-center shrink-0 p-1">
                <img src="/vrm-logo.png" className="w-full h-full object-contain brightness-0 invert" alt="VRM Logo" />
              </div>
            )}
          </div>

          {/* Nav Icons */}
          <div className="flex flex-col gap-6 w-full">
            <div className="relative group w-full">
              <button
                onClick={() => {
                  setAdminSubTab('overview');
                  setEditingJob(null);
                  setEditingArticle(null);
                  window.location.hash = 'admin/dashboard';
                }}
                className={`p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-3 w-full ${
                  isSidebarExpanded ? 'justify-start text-left pl-4' : 'justify-center text-center'
                } ${
                  adminSubTab === 'overview' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title={!isSidebarExpanded ? "Dashboard" : ""}
              >
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                {isSidebarExpanded && <span className="text-xs font-semibold select-none truncate">Dashboard</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md font-sans border border-white/5">
                  Dashboard
                </span>
              )}
            </div>

            <div className="relative group w-full">
              <button
                onClick={() => {
                  setAdminSubTab('jobs');
                  setEditingJob(null);
                  setEditingArticle(null);
                  window.location.hash = 'admin/jobs';
                }}
                className={`p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-3 w-full ${
                  isSidebarExpanded ? 'justify-start text-left pl-4' : 'justify-center text-center'
                } ${
                  adminSubTab === 'jobs' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title={!isSidebarExpanded ? "Careers" : ""}
              >
                <Briefcase className="w-5 h-5 shrink-0" />
                {isSidebarExpanded && <span className="text-xs font-semibold select-none truncate">Job Posting</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md font-sans border border-white/5">
                  Careers
                </span>
              )}
            </div>

            <div className="relative group w-full">
              <button
                onClick={() => {
                  setAdminSubTab('articles');
                  setEditingJob(null);
                  setEditingArticle(null);
                  window.location.hash = 'admin/articles';
                }}
                className={`p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-3 w-full ${
                  isSidebarExpanded ? 'justify-start text-left pl-4' : 'justify-center text-center'
                } ${
                  adminSubTab === 'articles' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title={!isSidebarExpanded ? "Articles" : ""}
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                {isSidebarExpanded && <span className="text-xs font-semibold select-none truncate">Articles</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md font-sans border border-white/5">
                  Articles
                </span>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-4 w-full items-center">
            {/* Expand / Shrink Toggle Button */}
            <div className="relative group w-full">
              <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className={`p-3 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all flex items-center gap-3 w-full ${
                  isSidebarExpanded ? 'justify-start text-left pl-4' : 'justify-center text-center'
                }`}
                title={isSidebarExpanded ? "Collapse" : "Expand"}
              >
                {isSidebarExpanded ? (
                  <>
                    <ChevronLeft className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-semibold select-none">Collapse</span>
                  </>
                ) : (
                  <ChevronRight className="w-5 h-5 shrink-0" />
                )}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md font-sans border border-white/5">
                  Expand
                </span>
              )}
            </div>

            {/* Settings */}
            <div className="relative group w-full">
              <button
                onClick={() => {
                  setAdminSubTab('settings');
                  setEditingJob(null);
                  setEditingArticle(null);
                  window.location.hash = 'admin/settings';
                }}
                className={`p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-3 w-full ${
                  isSidebarExpanded ? 'justify-start text-left pl-4' : 'justify-center text-center'
                } ${
                  adminSubTab === 'settings' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title={!isSidebarExpanded ? "Settings" : ""}
              >
                <Settings className="w-5 h-5 shrink-0" />
                {isSidebarExpanded && <span className="text-xs font-semibold select-none">Settings</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md font-sans border border-white/5">
                  Settings
                </span>
              )}
            </div>
          </div>
        </motion.aside>

        {/* MAIN WORKSPACE CONTENT */}
        <motion.div
          initial={false}
          animate={{ paddingLeft: isSidebarExpanded ? 256 : 96 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full"
        >
          
          {/* TOP BAR / NAVIGATION */}
          <div className="w-full flex items-center justify-between gap-4 bg-white rounded-3xl p-4 px-6 shadow-sm border border-slate-100/50">
            {/* Left Page Heading */}
            <h1 className="font-sans text-lg md:text-xl font-bold text-slate-900 tracking-tight text-left">
              {adminSubTab === 'overview' ? 'Admin Dashboard' : adminSubTab === 'jobs' ? 'Manage Careers' : adminSubTab === 'articles' ? 'Manage Articles' : 'System Settings'}
            </h1>
            {/* Right Actions & Profile */}
            <div className="flex items-center gap-4">
              {/* Avatars Overlay */}
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[9px] font-bold text-white">+6</div>
              </div>



              {/* Icons */}
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <div className="relative">
                  <button 
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer relative"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse border border-white" />
                    )}
                  </button>

                  {/* Dropdown panel */}
                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-slate-100 shadow-xl p-4 z-50 text-left">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                        <span className="font-sans text-xs font-extrabold text-slate-800 uppercase tracking-wider">Notifications</span>
                        {notifications.filter(n => !n.read).length > 0 && (
                          <button 
                            onClick={() => {
                              const updated = notifications.map(n => ({ ...n, read: true }));
                              setNotifications(updated);
                              localStorage.setItem("vrm_notifications", JSON.stringify(updated));
                            }}
                            className="text-[10px] text-indigo-600 hover:text-indigo-850 font-bold select-none cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-thin pr-1">
                        {notifications.length === 0 ? (
                          <div className="text-xs text-slate-400 text-center py-6 font-normal">No notifications yet.</div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id} 
                              className={`flex flex-col gap-1 p-3 rounded-2xl transition-all relative ${
                                notif.read ? "bg-slate-50/50 opacity-60" : "bg-indigo-50/20 border border-indigo-100/50"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 pr-6">
                                <span className="text-xs text-slate-800 leading-normal font-sans tracking-tight">
                                  {notif.text}
                                </span>
                                {!notif.read && (
                                  <button
                                    onClick={() => {
                                      const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                                      setNotifications(updated);
                                      localStorage.setItem("vrm_notifications", JSON.stringify(updated));
                                    }}
                                    className="absolute right-2 top-2 w-4.5 h-4.5 flex items-center justify-center bg-indigo-100/40 text-indigo-600 rounded-full hover:bg-indigo-200/50 cursor-pointer"
                                    title="Mark as read"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              <span className="text-[9px] text-slate-400 font-light tracking-wide self-end">
                                {notif.time}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <button
                    onClick={() => onNavigate && onNavigate("home")}
                    className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
                    title="Go to Website"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm font-sans">
                    Go to Website
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      sessionStorage.removeItem("vrm_admin_logged_in");
                      setEmailOrPhone('');
                      setPasswordOrOtp('');
                      window.location.hash = "login";
                    }}
                    className="p-2.5 rounded-full hover:bg-rose-50 text-rose-600 cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm font-sans">
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD GRID WORKSPACE */}
          {adminSubTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* Top Row - 3 Cards matching our Services Card design style (White, border, shadow, hover) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-slate-200/60 hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Publications</p>
                <h4 className="text-3xl font-extrabold mt-2 font-display text-slate-900">{articles.length}</h4>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Verify structural analyses & data sheets</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-slate-200/60 hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Active Career Openings</p>
                <h4 className="text-3xl font-extrabold mt-2 font-display text-slate-900">{jobs.length}</h4>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Opportunities for EPC joint validation</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-slate-200/60 hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Technical Domains</p>
                <h4 className="text-3xl font-extrabold mt-2 font-display text-slate-900">3 Fields</h4>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Wind Yield, Metallurgy, Solar Systems</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
            </div>

            {/* Second Row - Left (Published Articles, spans 2 cols) & Right (Article Readership, spans 1 col) */}
            <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Published Articles</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Most recent Technical Releases & Compliance Sheets</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setAdminSubTab('articles'); window.location.hash = 'admin/articles'; }}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200/60 shadow-sm cursor-pointer select-none"
                  >
                    View More &rarr;
                  </button>
                </div>

                <div className="space-y-4">
                  {articles.slice(0, 3).map((art) => (
                    <div 
                      key={art.id} 
                      onClick={() => setEditingArticle(art)}
                      className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="text-left pr-4 space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-md uppercase tracking-wider">
                            {art.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{art.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 font-light">
                          {art.excerpt}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                  {articles.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-400">No published articles yet.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Article Readership</h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Performance analytics & readership index</p>
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-full">
                    <Search className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900 font-display">2,472</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded-full">
                      +12.4% this week
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Views By Domain</p>

                  <div className="space-y-3.5 mt-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                        <span>Wind (Design & Aerodynamics)</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-650 h-full rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                        <span>Solar (EPC Partner Systems)</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                        <span>Metallurgy (Material Sciences)</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: "20%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
                Readership sync successful
              </div>
            </div>

            {/* Third Row - Left (Jobs Posted, spans 2 cols) & Right (Design Standards, spans 1 col) */}
            <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Jobs Posted</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Active engineering career openings and joint EPC roles</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setAdminSubTab('jobs'); window.location.hash = 'admin/jobs'; }}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200/60 shadow-sm cursor-pointer select-none"
                  >
                    View More &rarr;
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.slice(0, 3).map((job) => (
                    <div 
                      key={job.id} 
                      onClick={() => setEditingJob(job)}
                      className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="text-left pr-4 space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded-md uppercase tracking-wider">
                            {job.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{job.location}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 font-light">
                          {job.department}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                  {jobs.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-400">No active job posts yet.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Design Standards</h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Active compliance & verification codes</p>
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-full">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-3 text-xs font-semibold text-slate-600 text-left">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shrink-0" />
                    <span>IS 875 (Part 3) Wind Load Code</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>IS 2062 Structural Steel Quality</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shrink-0" />
                    <span>IS 4759 Hot-Dip Galvanizing Code</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-center text-[10px] text-indigo-600 font-bold uppercase tracking-wider select-none">
                All Standards Active & Sync'd
              </div>
            </div>

          </div>
          ) : adminSubTab === 'jobs' ? (
            renderJobsManager()
          ) : adminSubTab === 'articles' ? (
            renderArticlesManager()
          ) : (
            renderSettingsManager()
          )}

        </motion.div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!emailOrPhone.trim()) {
      setErrorMsg('Please enter your admin email address.');
      return;
    }

    if (!passwordOrOtp.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (emailOrPhone.trim().toLowerCase() !== 'mms@vrmstructures.in' || passwordOrOtp !== 'vrm@2018') {
      setErrorMsg('Invalid admin email address or password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      sessionStorage.setItem("vrm_admin_logged_in", "true");
      window.location.hash = "admin/dashboard";
    }, 900);
  };

  return (
    <div className="w-full bg-[#EFECE6] min-h-screen text-slate-800 font-sans relative flex flex-col justify-between overflow-hidden p-4 sm:p-6 lg:p-10 select-none">
      
      {/* BACKGROUND ABSTRACT ARCHITECTURAL SHAPES & ORBS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-stone-200/50 via-indigo-100/30 to-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-20">
        <div
          onClick={() => onNavigate && onNavigate('home')}
          className="cursor-pointer"
        >
          <ImagineLogo />
        </div>

        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md text-xs font-bold text-slate-800 hover:bg-white transition-all shadow-sm cursor-pointer border border-white/60"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </header>

      <main className="w-full max-w-5xl mx-auto my-auto py-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT COLUMN: LOGIN FORM & BRAND CARD */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              {/* MAIN FROSTED GLASS LOGIN CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/65 backdrop-blur-2xl border border-white/80 rounded-[36px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-left flex flex-col justify-between"
              >
                <div>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-[11px] font-bold tracking-widest text-slate-800 uppercase">
                      VRM Admin Access
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl sm:text-4xl font-normal text-slate-900 mb-8 tracking-tight">
                    Admin Log in
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
                        {errorMsg}
                      </div>
                    )}

                    {/* Pill Input 1 */}
                    <div>
                      <input
                        type="email"
                        value={emailOrPhone}
                        placeholder="admin email address"
                        onChange={e => setEmailOrPhone(e.target.value)}
                        className="w-full px-6 py-4 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-sm font-sans font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:shadow-md transition-all"
                      />
                    </div>

                    {/* Pill Input 2 (Password) */}
                    <div>
                      <input
                        type="password"
                        value={passwordOrOtp}
                        placeholder="admin security password"
                        onChange={e => setPasswordOrOtp(e.target.value)}
                        className="w-full px-6 py-4 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-sm font-sans font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:shadow-md transition-all"
                      />
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-[11px] text-slate-400 font-light">
                        Authorized personnel only.
                      </span>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-12 h-12 rounded-full bg-slate-300/80 hover:bg-slate-900 hover:text-white text-slate-800 transition-all flex items-center justify-center cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>

              {/* DARK BRAND BADGE CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#18181B] text-white rounded-[28px] p-7 shadow-xl text-left"
              >
                <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight">
                  New in
                </h3>
                <p className="font-sans text-sm font-normal text-slate-300 mt-0.5">
                  VRM Structures India Private Limited
                </p>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: ELEGANT ARCHITECTURAL SHOWCASE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 bg-white/70 backdrop-blur-2xl rounded-[36px] p-8 sm:p-10 border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden min-h-[460px] text-left"
            >
              {/* Floating Glass Gradient Blue Sphere */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 opacity-90 blur-[2px] shadow-2xl pointer-events-none" />

              {/* Glass Overlay over Orb */}
              <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-white/30 backdrop-blur-lg border-l border-white/40 pointer-events-none" />

              {/* Top Text */}
              <div className="relative z-10">
                <h2 className="font-display text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight leading-none">
                  Solar MMS <br />
                  <span className="font-light text-slate-600">2026 Edition</span>
                </h2>

                <div className="mt-12 space-y-1 text-slate-600 text-xs sm:text-sm font-medium">
                  <p>Hot-Dip Galvanized & Aluminum</p>
                  <p className="text-slate-900 font-bold">Chennai & Tada Plants</p>
                  <p className="text-slate-500 font-light">Pan-India Supply Chain</p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="relative z-10 pt-8 flex items-center justify-between border-t border-slate-200/60">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>IS 800 Certified</span>
                </div>

                <button
                  onClick={() => onNavigate && onNavigate('quote')}
                  className="px-6 py-3 rounded-full bg-[#18181B] text-white text-xs font-bold hover:bg-black transition-all shadow-md cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </motion.div>

          </div>
      </main>

    </div>
  );
}
