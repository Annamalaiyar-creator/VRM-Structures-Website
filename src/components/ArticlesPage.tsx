import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Clock,
  Search,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  X,
  Menu,
  Calendar
} from "lucide-react";
import {
  ImagineLogo,
  HeroImageBackground
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";

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

const getStoredArticles = (): Article[] => {
  const stored = localStorage.getItem("vrm_articles_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  return [
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
};

const ARTICLES_DATA: Article[] = getStoredArticles();

interface ArticlesPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote", targetId?: string) => void;
  onContactClick: () => void;
}

export default function ArticlesPage({ onNavigate, onContactClick }: ArticlesPageProps) {
  const [articlesList, setArticlesList] = useState<Article[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Sync state on storage event
  React.useEffect(() => {
    const handleSync = () => {
      setArticlesList(getStoredArticles());
    };
    window.addEventListener("storage", handleSync);
    return () => window.removeEventListener("storage", handleSync);
  }, []);

  // Scroll to top and check hash on load
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Sync selectedArticle with hash on mount/change to support browser back button
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/articles\/([^?]+)/);
      if (match) {
        const articleId = match[1];
        const found = articlesList.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          return;
        }
      }
      setSelectedArticle(null);
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [articlesList]);

  if (selectedArticle) {
    const formatParagraphText = (text: string) => {
      // Find first period, colon or comma
      const splitPoints = [text.indexOf(". "), text.indexOf(": "), text.indexOf(", ")].filter(i => i > 0);
      if (splitPoints.length === 0) return text;

      // Get the earliest split point
      const firstSplit = Math.min(...splitPoints);

      // If the split point is within a reasonable range (under 80 characters), bold it
      if (firstSplit > 0 && firstSplit < 80) {
        const prefix = text.substring(0, firstSplit + 1);
        const textRest = text.substring(firstSplit + 1);
        return (
          <>
            <strong className="font-semibold text-slate-900">{prefix}</strong>
            {textRest}
          </>
        );
      }

      // Otherwise, bold the first 6 words
      const words = text.split(" ");
      if (words.length > 6) {
        const prefix = words.slice(0, 6).join(" ") + " ";
        const textRest = words.slice(6).join(" ");
        return (
          <>
            <strong className="font-semibold text-slate-900">{prefix}</strong>
            {textRest}
          </>
        );
      }

      return text;
    };

    return (
      <div className="bg-[#f3f4f6] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen pt-20">

        {/* DETAILED ARTICLE VIEW - Seamless layout directly on the background */}
        <div className="flex-1 bg-[#f3f4f6] animate-fade-in">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

            {/* Back to articles button & category wrapper to prevent overlap */}
            <div className="mb-8 flex flex-col items-start gap-4">
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => { window.location.hash = "articles"; }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors group cursor-pointer"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                Back to Articles
              </motion.button>

              {/* Article category label styled in standard site brand theme */}
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-slate-800 uppercase bg-slate-50 border border-slate-200/60 rounded-full px-4.5 py-1.5">
                {selectedArticle.category}
              </span>
            </div>

            <h1 className="font-display text-[32px] md:text-[44px] leading-[42px] md:leading-[54px] font-bold tracking-tight text-slate-900 mb-6 text-left">
              {selectedArticle.title}
            </h1>

            {/* Meta info card */}
            <div className="flex flex-wrap items-center gap-6 border-y border-slate-200 py-4 mb-10 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {selectedArticle.author.charAt(0)}
                </div>
                <span>By {selectedArticle.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>{selectedArticle.date}</span>
              </div>

            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-12 shadow-sm border border-slate-200/50">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-slate max-w-none text-left font-sans text-[16px] leading-[28px] text-slate-700 space-y-6">
              {selectedArticle.content.map((p, idx) => {
                if (p.startsWith("HEADING:")) {
                  const headingText = p.replace("HEADING:", "");
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-3 font-sans">
                      {headingText}
                    </h3>
                  );
                } else if (p.startsWith("IMAGE:")) {
                  const imgData = p.replace("IMAGE:", "").split("|");
                  const url = imgData[0];
                  const caption = imgData[1] || "";
                  return (
                    <figure key={idx} className="my-8 text-center">
                      <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/50 max-h-[500px]">
                        <img src={url} alt={caption || "Article visual"} className="w-full h-full object-cover" />
                      </div>
                      {caption && (
                        <figcaption className="text-xs text-slate-500 mt-2.5 italic font-light">
                          {caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                } else if (p.startsWith("LINK:")) {
                  const linkData = p.replace("LINK:", "").split("|");
                  const label = linkData[0];
                  const url = linkData[1] || "";
                  return (
                    <div key={idx} className="my-6">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                      >
                        {label}
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  );
                } else {
                  return (
                    <p key={idx} className="font-light text-slate-600">
                      {formatParagraphText(p)}
                    </p>
                  );
                }
              })}
            </div>

            {/* Bottom Back Button & Share */}
            <div className="border-t border-slate-200 mt-16 pt-8 flex justify-between items-center">
              <button
                onClick={() => { window.location.hash = "articles"; }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                Back to Articles
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
            <p className="font-light">© {new Date().getFullYear()} VRM Structures India Private Limited. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  const categories = ["All", "Engineering", "Quality Control", "Careers", "Best Practices"];

  const filteredArticles = articlesList.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articlesList[0];

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">

      {/* HERO SECTION - EXACT PLACEMENT MATCHING HOME HERO */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">

        {/* PHOTOGRAPHIC HERO BACKGROUND (SOLAR ENGINEERING CAD & RESEARCH STUDIO) */}
        <HeroImageBackground src="/images/hero-articles.jpg" alt="Solar Engineering CAD & Structural Research" />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Technical Insights & Quality Standards
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Explore our engineering deep-dives, roll forming advances, hot-dip galvanizing quality controls, and clean energy growth benchmarks.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="articles-container" />
        </div>
      </div>

      {/* ARTICLES CONTAINER SECTION - Standard white background, side-by-side bento layout style */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 md:pt-28 pb-28 md:pb-36" id="articles-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 text-left mb-16">

            {/* Left Column: Label */}
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
                    Our Articles
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column Content Panel */}
            <div className="flex flex-col min-w-0">

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.25] text-slate-900 tracking-tight"
              >
                Engineering & Quality{" "}
                <span className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#4F46E5] px-4 py-1.5 rounded-full text-[13.5px] sm:text-[15px] font-bold align-middle mx-1.5 border border-[#C7D2FE]/40 shadow-sm select-none hover:scale-[1.03] transition-transform duration-250 cursor-pointer">
                  Insights
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-sans text-slate-500 text-[14px] sm:text-[15px] leading-[26px] max-w-xl mt-6 font-light"
              >
                In-depth technical guides, metallurgy reviews, load calculations, and industry standards curated by our leadership and design desk.
              </motion.p>

            </div>
          </div>

          {/* CATEGORY FILTER & SEARCH BAR - Spanning full width to use the empty left column space and keep in one line */}
          <div className="w-full mt-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer whitespace-nowrap ${selectedCategory === cat
                      ? "bg-[#1e1e1e] text-white shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SEARCH INPUT */}
            <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={14} className="stroke-[2.5]" />
              </div>
              <input
                id="search-articles"
                name="searchArticles"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics..."
                className="w-full pl-9.5 pr-9 py-2.5 rounded-full bg-slate-50 border border-slate-200/50 text-xs font-semibold tracking-tight text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={14} className="stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>

          {/* NO RESULTS VIEW */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-3xl p-8 max-w-md mx-auto">
              <Search size={32} className="mx-auto text-slate-400 mb-4 stroke-[1.5]" />
              <h3 className="font-display text-lg font-bold text-slate-800">No Articles Found</h3>
              <p className="font-sans text-xs text-slate-500 mt-2 font-light leading-relaxed">
                We couldn't find any articles matching your query. Try switching categories.
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); }}
                className="mt-6 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ARTICLES GRID - Full-width layout spanning the entire page container */}
          {filteredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => {
                    window.location.hash = `articles/${article.id}`;
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="bg-[#E5E7EB]/50 border-[6px] border-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer relative"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="w-full h-56 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-sm relative overflow-hidden bg-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
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

                    {/* Specs / Metadata Pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <div className="bg-white/85 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {article.category}
                      </div>
                      <div className="bg-white/85 backdrop-blur-sm border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <Clock size={11} className="text-slate-400" />
                        {article.readTime}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-[18px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-[13px] leading-relaxed text-slate-500 font-light mt-3 mb-5 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Metadata Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-4 border-t border-dashed border-slate-200/60 mt-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className="w-7 h-7 rounded-full object-cover border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-slate-700 font-semibold text-[12px]">{article.author}</span>
                    </div>
                    <span className="bg-white border border-slate-100 text-[#555555] text-[10.5px] font-bold px-2.5 py-1 rounded-[6px] tracking-tight">
                      {article.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
