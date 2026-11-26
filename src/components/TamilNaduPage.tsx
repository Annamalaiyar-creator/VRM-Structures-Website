import React from "react";
import { MapPin, Phone, Clock, ShieldCheck, Factory, Wrench, ArrowRight } from "lucide-react";
import SEO from "./SEO";
import { HeroImageBackground } from "./Artworks";
import { routeToUrl } from "../lib/router";
import { productPath } from "../data/relatedLinks";
import { whatsappUrl } from "../lib/enquiry";

/**
 * Landing page for "solar structure manufacturer in Chennai / Tamil Nadu" searches.
 * Every figure here comes from the VRM brochure or the contact page; keep it that way.
 */
const PRODUCTS: { title: string; note: string }[] = [
  { title: "RCC Roof MMS", note: "Elevated and ballast structures for flat concrete roofs" },
  { title: "Aluminum Mounting Structure", note: "Mini, long and standing-seam rails for metal sheet roofs" },
  { title: "Hot Dip Galvanized Structures", note: "650 GSM hot-dip galvanized steel structures" },
  { title: "Ground Mounted MMS", note: "Ground-mount tables for C&I and utility plants" },
  { title: "Carport MMS", note: "Solar carports for commercial parking" },
  { title: "Solar Pump MMS", note: "Structures for agricultural solar pumps" },
  { title: "PM Surya Ghar Kit", note: "BOS kits for 3 kW and 5 kW home systems" },
  { title: "FRP Walkway", note: "UV-protected FRP walkways and handrails" },
];

const STANDARDS = [
  "Hot-dip galvanizing to IS 4759:1996, maintained at 650 GSM (80–90 µm) as per the MNRE standard",
  "150 GSM Galvalume (YS 550 MPa) and 120 GSM pre-galvanized steel options",
  "Aluminium 6063-T6 rails for metal, Klip-Lok, Kal-Zip and standing-seam roofs",
  "Every structure designed with FEA and STAAD Pro analysis for a wind speed of 47 m/s",
  "Penetrative and non-penetrative (adhesive) roof mounting",
];

export default function TamilNaduPage() {
  const url = routeToUrl("solar-structure-manufacturer-tamil-nadu");
  return (
    <div className="bg-white overflow-x-hidden font-sans text-slate-800 antialiased flex flex-col min-h-screen">
      <SEO
        title="Solar Structure Manufacturer in Chennai, Tamil Nadu"
        description="VRM Structures makes solar mounting structures in Puzhal, Chennai: RCC roof, metal roof, ground mount, carport and PM Surya Ghar kits for Tamil Nadu installers."
        canonicalUrl={url}
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: routeToUrl("") },
            { "@type": "ListItem", position: 2, name: "Solar Structure Manufacturer in Tamil Nadu", item: url },
          ],
        }}
      />

      <div className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        <HeroImageBackground src="/images/hero-products.jpg" alt="Solar mounting structures made by VRM Structures in Chennai" />
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-display text-[28px] sm:text-[36px] leading-tight font-bold tracking-tight text-white">
            Solar Structure Manufacturer in Chennai, Tamil Nadu
          </h1>
          <p className="text-slate-100 text-[15px] sm:text-[16px] leading-relaxed max-w-3xl mx-auto mt-4 font-light">
            VRM Structures India Private Limited designs, fabricates and galvanizes solar module mounting structures at its
            factory in Puzhal, Chennai, for installers, EPC companies and dealers across Tamil Nadu and India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/quote/" className="px-6 py-3 rounded-full bg-white text-slate-900 text-xs font-bold uppercase tracking-wider">Request a Quote</a>
            <a href={whatsappUrl("Hello VRM Structures, I'm an installer in Tamil Nadu and would like pricing for solar structures.")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/60 text-white text-xs font-bold uppercase tracking-wider">WhatsApp Sales</a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <nav aria-label="Breadcrumb" className="text-[12px] text-slate-500 -mt-6">
          <a href="/" className="hover:text-indigo-600">Home</a>
          <span className="mx-2">›</span>
          <span className="text-slate-800 font-medium">Solar Structure Manufacturer in Tamil Nadu</span>
        </nav>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Made in our Chennai factory</h2>
          <p className="text-[15px] leading-relaxed text-slate-600 max-w-4xl">
            Our in-house design and fabrication team, roll-forming and fabrication lines are at Nagappa Industrial Estate on GNT Road,
            Puzhal. Structures are designed for each site, fabricated and galvanized in-house, and supplied as kits ready for installation.
            Our FRP walkways alone are supplied to more than 250 EPC solar contractors across India.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((p) => (
              <a key={p.title} href={productPath(p.title)} className="group block rounded-3xl border border-slate-200 p-5 hover:border-indigo-300 hover:bg-slate-50 transition-colors">
                <span className="font-display text-[15px] font-bold text-slate-900 group-hover:text-indigo-700">{p.title}</span>
                <span className="block text-[13px] text-slate-500 mt-2 leading-relaxed">{p.note}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-indigo-700">View product <ArrowRight size={12} /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck size={22} /> Built to standard</h2>
            <ul className="space-y-3">
              {STANDARDS.map((s) => (
                <li key={s} className="text-[15px] text-slate-600 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-600">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Wrench size={22} /> For installers, EPCs and dealers</h2>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              Rooftop installers get structures for RCC, metal-sheet, tile and asbestos roofs, with clamps, earthing and walkway accessories
              from one supplier. For PM Surya Ghar projects we supply complete BOS kits for 3 kW and 5 kW systems. EPC companies get
              site-specific design with STAAD Pro reports for ground-mount, carport and custom structures.
            </p>
            <p className="text-[15px] text-slate-600 leading-relaxed mt-3">
              Download the <a href="/downloads/datasheet-vrm-corporate-brochure/" className="text-indigo-700 underline underline-offset-2">product brochure</a> or
              the <a href="/downloads/datasheet-pm-surya-ghar-kit/" className="text-indigo-700 underline underline-offset-2">PM Surya Ghar kit catalogue</a>.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-50 border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Factory size={18} /> Chennai factory</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed flex gap-2"><MapPin size={16} className="mt-1 flex-shrink-0" />No 1427, GNT Road, Nagappa Industrial Estate, Puzhal, Chennai 600066</p>
            <a href="https://maps.google.com/?q=13.1520,80.2087" target="_blank" rel="noopener noreferrer" className="text-[13px] text-indigo-700 mt-2 inline-block">Open in Google Maps</a>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Phone size={18} /> Sales</h2>
            <p className="text-[14px] text-slate-600"><a href="tel:+919884309789" className="hover:text-indigo-700">+91 98843 09789</a></p>
            <p className="text-[14px] text-slate-600"><a href="mailto:mms@vrmstructures.in" className="hover:text-indigo-700">mms@vrmstructures.in</a></p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Clock size={18} /> Hours</h2>
            <p className="text-[14px] text-slate-600">Monday to Saturday, 9:30 AM – 6:30 PM</p>
            <p className="text-[13px] text-slate-500 mt-2">Regional hubs: Tada (Tirupati) and Nellore, Andhra Pradesh. See <a href="/contact/" className="text-indigo-700">contact details</a>.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
