import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, Download, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';
import { CityAboveCloudsBackground } from './Artworks';
import ScrollDownButton from './ScrollDownButton';

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Inverters' | 'Solar Panels' | 'Brochures';
  description: string;
  fileSize: string;
  format: 'PDF' | 'CAD' | 'DOCX';
  badge: string;
  pdfUrl: string;
  contentPlaceholder?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const DOWNLOADS_DATA: DownloadItem[] = [
  // SECTION: INVERTERS
  {
    id: 'datasheet-polycab-inverter',
    title: 'Polycab Solar Grid-Tied & Hybrid Inverter India Catalog',
    category: 'Inverters',
    description: 'Complete Polycab India technical datasheet detailing MPPT specifications, electrical efficiency (98.6%), and IP65 weatherproof protection.',
    fileSize: '1.4 MB',
    format: 'PDF',
    pdfUrl: '/polycab-solar--inverter-datasheet-india.pdf',
    badge: 'Grid-Tied & Hybrid',
    seoTitle: 'Polycab Solar Inverter Technical Datasheet',
    seoDescription: 'Download technical datasheet for Polycab grid-tied string and hybrid inverters featuring MPPT tracking, IP65 protection, and high efficiency.',
    contentPlaceholder: `Polycab grid-tied and hybrid solar inverters deliver high conversion efficiency, multi-MPPT tracking, and robust electrical protection for residential, commercial, and utility-scale solar projects across India. This datasheet details AC/DC electrical parameters, surge protection ratings, and ambient operating ranges.

Typical Use Cases:
- Commercial rooftop solar arrays requiring multi-MPPT string optimization.
- PM Surya Ghar residential solar installations with smart grid synchronization.
- Industrial solar plants integrated with VRM earthing kits and BOS accessories.

Why EPCs Need This Datasheet:
Essential for inverter pairing, AC/DC cable sizing, protection breaker selection, and wall-mounting bracket load validation.`
  },
  {
    id: 'datasheet-ongrid-systems',
    title: 'On-Grid Solar System Engineering & Inverter Architecture Guide',
    category: 'Inverters',
    description: 'Comprehensive technical handbook for grid-tied solar power plant design, inverter pairing, string sizing, and mounting structures.',
    fileSize: '9.2 MB',
    format: 'PDF',
    pdfUrl: '/on-grid-solar-system-engineering-guide.pdf',
    badge: 'Inverter & Architecture',
    seoTitle: 'On-Grid Solar System Engineering & Inverter Architecture Guide',
    seoDescription: 'Download comprehensive technical guide for grid-tied solar power plant architecture, inverter pairing, and MMS structural design.',
    contentPlaceholder: `The On-Grid Solar System Engineering & Architecture Guide provides a complete technical walkthrough for designing grid-connected solar power plants. It covers solar resource assessment, module stringing, inverter topology, mounting structure selection, and earthing compliance.

Typical Use Cases:
- Solar EPC project engineering, design validation, and technical training.
- Architectural planning for C&I rooftop and ground-mount solar arrays.
- System compliance verification against IS 800, IS 875, and IS 3043 codes.

Why EPCs Need This Datasheet:
Serves as an authoritative engineering reference for structural integrity, electrical safety, and single-line diagram (SLD) creation.`
  },
  {
    id: 'datasheet-polycab-commercial-inverter',
    title: 'Polycab Three-Phase Commercial String Inverters (10kW - 100kW)',
    category: 'Inverters',
    description: 'Technical specifications for Polycab commercial three-phase string inverters with integrated smart monitoring, DC disconnect switches, and anti-PID protection.',
    fileSize: '1.4 MB',
    format: 'PDF',
    pdfUrl: '/polycab-solar--inverter-datasheet-india.pdf',
    badge: 'Three-Phase Inverters',
    seoTitle: 'Polycab Commercial String Inverters Technical Specification',
    seoDescription: 'Download commercial three-phase solar string inverter technical specifications with multi-MPPT tracking and IP65 protection.',
    contentPlaceholder: `Engineered for high-yield commercial and industrial rooftop solar projects, Polycab Three-Phase String Inverters feature multi-channel MPPT tracking, wide DC voltage operation, and real-time cloud analytics integration.

Typical Use Cases:
- Industrial shed solar installations with multi-pitch roofs.
- Ground-mount distributed solar projects.
- Commercial complexes requiring zero-export grid compliance.

Why EPCs Need This Datasheet:
Provides detailed string calculation tables, short-circuit current limits, and AC output protection requirements.`
  },

  // SECTION: SOLAR PANELS
  {
    id: 'datasheet-730w-hjt-bifacial',
    title: 'CSI Solar 730Wp HJT Bifacial High-Power Solar Module Datasheet',
    category: 'Solar Panels',
    description: 'Official technical datasheet for 730Wp Heterojunction (HJT) dual-glass bifacial solar module with up to 23.5% efficiency and superior temperature performance.',
    fileSize: '13 MB',
    format: 'PDF',
    pdfUrl: '/730_Wp_datasheet.pdf',
    badge: '730Wp HJT Bifacial',
    seoTitle: '730Wp HJT Bifacial Solar Module Datasheet | VRM Structures',
    seoDescription: 'Download CSI Solar 730Wp HJT dual-glass bifacial module technical specifications with electrical ratings, CAD dimensions, and mounting specifications.',
    contentPlaceholder: `The 730Wp HJT Dual-Glass Bifacial solar module represents cutting-edge photovoltaic engineering delivering ultra-high power output up to 730Wp with module efficiency exceeding 23.5%. Built with advanced Heterojunction Technology (HJT) N-type silicon wafer architecture, this module provides industry-leading temperature coefficients (-0.26%/°C) and superior generation in high-ambient temperature regions.

Key Electrical Specifications (STC):
- Peak Power: Up to 730 Wp
- Module Efficiency: Up to 23.5%
- Cell Technology: N-Type Heterojunction (HJT) Half-Cut Cells
- Temperature Coefficient of Pmax: -0.26%/°C (maximum hot-weather yield)
- Bifaciality Factor: Up to 85%–90% rear-side power boost
- Maximum System Voltage: 1500 V DC

Mechanical & Structural Parameters:
- Encapsulation: Dual-glass (2.0mm + 2.0mm) ARC semi-tempered glass
- Frame: 35mm heavy-duty anodized aluminium alloy frame
- Mechanical Load: 5400 Pa front snow/static load | 2400 Pa rear wind load
- Junction Box: IP68 rated with 4.0 mm² landscape/portrait cable runs
- Mounting Compatibility: Pre-drilled mounting slots engineered for VRM tracker and fixed-tilt purlins

Why EPCs Need This Datasheet:
Critical for high-density utility solar plants, tracker torque-tube spacing calculations, and foundation pile structural validation under IS 875 wind codes.`
  },
  {
    id: 'datasheet-550w-bifacial',
    title: '550Wp High-Efficiency Dual-Glass Bifacial Solar Module Datasheet',
    category: 'Solar Panels',
    description: 'Technical specifications for 550Wp dual-glass bifacial solar PV modules with ultra-low degradation, high mechanical load capacity, and enhanced rear-side energy yield.',
    fileSize: '11 MB',
    format: 'PDF',
    pdfUrl: '/550_Wp_Bifacial_Datasheet.pdf',
    badge: '550Wp Bifacial',
    seoTitle: '550Wp Dual-Glass Bifacial Solar Module Datasheet | VRM Structures',
    seoDescription: 'Download 550Wp dual-glass bifacial solar PV module datasheet detailing electrical parameters, mounting hole dimensions, and mechanical tolerances.',
    contentPlaceholder: `The 550Wp High-Efficiency Dual-Glass Bifacial module delivers robust mechanical performance and high energy yield for commercial, industrial, and ground-mounted solar power plants across India.

Key Electrical Specifications (STC):
- Peak Power: 550 Wp
- Module Efficiency: Up to 21.3%
- Cell Arrangement: 144 Half-Cut Multi-Busbar (MBB) mono PERC / TOPCon cells
- Operating Voltage & Current: Optimized for 1500V DC string inverter topology
- Bifaciality Factor: 70%–80% rear-side gain on reflective surfaces

Mechanical & Structural Parameters:
- Dimensions: Standard large-format module footprint with 30mm/35mm anodized aluminium frame
- Glass: Dual-glass architecture providing PID resistance, moisture impermeability, and fire safety Class A
- Mechanical Load Tolerance: Front load 5400 Pa / Rear load 2400 Pa
- Ingress Protection: IP68 rated junction box with bypass diodes

Why EPCs Need This Datasheet:
Provides exact mechanical clamp attachment zones, allowable cantilever spans, and hole coordinates required for VRM Structures C-purlin and hat-section mounting arrays.`
  },
  {
    id: 'datasheet-loom-solar-shark-topcon',
    title: 'Loom Solar SHARK N-Type TOPCon Bifacial Datasheet (620W-625W)',
    category: 'Solar Panels',
    description: 'Official Loom Solar technical datasheet for SHARK N-Type TOPCon bifacial modules featuring 620W-625W power output, 23.2% efficiency, and 30-year warranty.',
    fileSize: '6.5 MB',
    format: 'PDF',
    pdfUrl: '/loom-solar-shark-n-type-topcon-620w-625w-datasheet.pdf',
    badge: 'N-Type TOPCon 625W',
    seoTitle: 'Loom Solar SHARK N-Type TOPCon Datasheet (620W-625W)',
    seoDescription: 'Download official Loom Solar SHARK N-Type TOPCon bifacial module datasheet with 620W-625W peak power, 23.2% efficiency, and mechanical dimensions.',
    contentPlaceholder: `Loom Solar SHARK N-Type TOPCon Bifacial series delivers cutting-edge solar photovoltaic performance with up to 625W maximum power output and 23.2% module efficiency. Built with 132 half-cut multi-busbar (MBB) cells, ARC tempered glass, and a sturdy 30mm anodized aluminium frame, this module is engineered for low temperature coefficients (-0.29%/°C) and superior low-irradiance generation.

Key Electrical Specifications (STC):
- Peak Power: 620W (SHARK620) / 625W (SHARK625)
- Module Efficiency: Up to 23.2%
- Open Circuit Voltage (Voc): 48.75V - 48.95V
- Short Circuit Current (Isc): 16.03A - 16.09A
- Maximum Power Voltage (Vmp): 41.01V - 41.18V
- Maximum Power Current (Imp): 15.12A - 15.18A
- Power Tolerance: 0±2%
- Maximum System Voltage: 1500 V DC

Mechanical & Structural Parameters:
- Dimensions: 2382 x 1134 x 30 mm
- Module Area: 2.70 m² | Weight: 33.0 kg
- Cell Arrangement: 132 Half-Cut Cells (11x6 / 11x6)
- Frame: 30mm Anodized Aluminium Alloy
- Junction Box: IP68 rated with 4.0 mm² cables and MC4 connectors
- Mounting & Grounding: Pre-engineered 1400mm / 400mm hole centers (Ø 4.2mm & 9x14mm slots)

Warranty & Certifications:
- 15-Year Enhanced Product Warranty on Materials & Workmanship
- 30-Year Linear Power Performance Warranty (First-year degradation <= 2%, subsequent annual degradation <= 0.5%)
- Certifications: Tested as per IEC 61215 & IEC 61730 standards, CE, BIS, ISO 9001, ISO 14001, ISO 45001

Why EPCs Need This Datasheet:
Provides precise mounting hole layouts, clamp attachment zones, and wind/snow load capacities essential for engineering compliant VRM Structures mounting purlins and tracker brackets.`
  },
  {
    id: 'datasheet-waaree-elite',
    title: 'Waaree Elite N-Type Bifacial Technical Datasheet (555W-585W)',
    category: 'Solar Panels',
    description: 'Official Waaree technical datasheet for N-Type Dual Glass Bifacial modules featuring 555W to 585W power output.',
    fileSize: '336 KB',
    format: 'PDF',
    pdfUrl: '/datasheet-waaree-elite-n-type-bifacial-555W-560W-565W-570W-575W-580W-585W.pdf',
    badge: 'N-Type Bifacial',
    seoTitle: 'Waaree Elite N-Type Bifacial Datasheet (555W-585W)',
    seoDescription: 'Download official technical specifications and electrical dimensions for Waaree Elite N-Type Dual Glass Bifacial solar modules (555W to 585W).',
    contentPlaceholder: `The Waaree Elite N-Type Bifacial series represents next-generation solar photovoltaic engineering with ultra-high conversion efficiency and bifacial gain. This official datasheet provides solar EPC contractors, electrical engineers, and procurement specialists with comprehensive electrical ratings, temperature coefficients, and mechanical load tolerances.

Typical Use Cases:
- Utility-scale solar power plants requiring high power density and rear-side albedo gain.
- Commercial rooftop solar projects needing long-term performance guarantees and low degradation.
- High-humidity and coastal solar installations paired with VRM aluminum or hot-dip galvanized mounting structures.

Why EPCs Need This Datasheet:
Accurate CAD dimensions, clamp mounting zones, and structural load allowances are essential when sizing mounting Purlins, tilt brackets, and wind-resistance ballast for IS 875 wind zone compliance.`
  },
  {
    id: 'datasheet-adani-bifacial',
    title: 'Adani Bifacial Glass-to-Glass PERC Module Datasheet (535W-550W)',
    category: 'Solar Panels',
    description: 'Technical specs for Adani PERC Bifacial G-G Gen-II solar modules designed for utility-scale solar projects.',
    fileSize: '1.7 MB',
    format: 'PDF',
    pdfUrl: '/adani-bifacial-perc-gen-ii-datasheet.pdf',
    badge: 'Bifacial PERC',
    seoTitle: 'Adani Bifacial Glass-to-Glass PERC Module Datasheet',
    seoDescription: 'Download technical datasheet for Adani PERC Bifacial Glass-to-Glass Gen-II modules with mechanical dimensions and performance curves.',
    contentPlaceholder: `Adani PERC Bifacial Glass-to-Glass Gen-II modules are engineered for demanding environmental conditions, offering high mechanical strength, bifacial energy yield, and enhanced fire resistance.

Typical Use Cases:
- Utility-scale ground-mounted solar power plants across high-wind locations.
- Commercial rooftop arrays requiring durable dual-glass encapsulation.
- Ground-mount installations paired with VRM hot-dip galvanized steel structures.

Why EPCs Need This Datasheet:
Provides exact hole dimensions, frame profile specifications, and wind/snow load tolerances required for structural engineering verification.`
  },
  {
    id: 'datasheet-adani-topcon',
    title: 'Adani TOPCon 30mm Frame Solar Module Specification (560W-585W)',
    category: 'Solar Panels',
    description: 'High-efficiency Adani TOPCon 30mm framed module mechanical specs, cell dimensions, and temperature coefficients.',
    fileSize: '428 KB',
    format: 'PDF',
    pdfUrl: '/adani-topcon-30mm-framed-module-datasheet.pdf',
    badge: 'TOPCon 30mm',
    seoTitle: 'Adani TOPCon 30mm Frame Solar Module Datasheet',
    seoDescription: 'Download mechanical & electrical specifications for Adani TOPCon 30mm framed solar modules, optimized for low light and high temperatures.',
    contentPlaceholder: `Adani TOPCon 30mm slim-frame solar modules combine N-type cell efficiency with lightweight mechanical design, maximizing energy harvest per square meter while reducing dead load on rooftops.

Typical Use Cases:
- Metal sheet and RCC rooftop solar installations with strict weight limits.
- High-temperature regions benefiting from TOPCon's low temperature coefficient.
- Ground-mount and commercial arrays using VRM aluminum racking.

Why EPCs Need This Datasheet:
Crucial for clamp location verification, mid-clamp/end-clamp sizing, and structural deflection calculations.`
  },
  {
    id: 'datasheet-vikram-hypersol',
    title: 'Vikram Solar HYPERSOL M10R 144-Cell Datasheet (580W-605W)',
    category: 'Solar Panels',
    description: 'Official Vikram Solar Hypersol M10R 144-cell high-power module datasheet with 580W to 605W ratings.',
    fileSize: '597 KB',
    format: 'PDF',
    pdfUrl: '/vikram-hypersol-m10r-580-605w-144-cell-datasheet.pdf',
    badge: 'M10R 144-Cell',
    seoTitle: 'Vikram Solar HYPERSOL M10R 144-Cell Datasheet (580W-605W)',
    seoDescription: 'Download official Vikram Solar Hypersol M10R 144-cell module datasheet (580W to 605W) with electrical ratings and dimensions.',
    contentPlaceholder: `Vikram Solar HYPERSOL M10R series modules deliver ultra-high power output (up to 605W) using 144 half-cut M10R cells, reducing balance of system costs and land footprint.

Typical Use Cases:
- Utility-scale solar parks aiming for low Levelized Cost of Energy (LCOE).
- Commercial rooftops with high power requirements per square foot.
- Ground-mounted solar arrays paired with VRM 2-in-portrait mounting structures.

Why EPCs Need This Datasheet:
Provides exact physical dimensions, cable lengths, junction box locations, and allowable mechanical clamp zones.`
  },
  {
    id: 'datasheet-waaree-mono-perc',
    title: 'Waaree Mono PERC M10 Series Module Datasheet (515W-545W)',
    category: 'Solar Panels',
    description: 'Mechanical and electrical specs for Waaree M10 mono PERC solar PV modules ranging from 515W to 545W.',
    fileSize: '945 KB',
    format: 'PDF',
    pdfUrl: '/datasheet-waaree-solar-mono-perc-m10-515W-520W-525W-530W-535W-540W-545W.pdf',
    badge: 'Mono PERC',
    seoTitle: 'Waaree Mono PERC M10 Series Datasheet (515W-545W)',
    seoDescription: 'Download Waaree M10 Mono PERC module datasheet (515W to 545W) detailing electrical performance, cell layout, and mechanical load limits.',
    contentPlaceholder: `Waaree M10 Mono PERC solar PV modules feature proven half-cut cell technology, delivering reliable power output and high resistance to PID and shade losses.

Typical Use Cases:
- Commercial & industrial rooftop solar installations across India.
- On-grid solar plants requiring proven PERC technology.
- Rooftop arrays supported by VRM RCC ballasted mounting systems.

Why EPCs Need This Datasheet:
Essential for string design, inverter DC sizing, and structural purlin spacing calculations.`
  },
  {
    id: 'datasheet-renew-bifacial',
    title: 'ReNew Power M10 Mono PERC Bifacial Module Datasheet (535W-560W)',
    category: 'Solar Panels',
    description: 'ReNew M10 Mono PERC Bifacial solar PV module datasheet featuring dual-glass durability and 535W to 560W outputs.',
    fileSize: '1.3 MB',
    format: 'PDF',
    pdfUrl: '/renew-power-m10-mono-perc-bifacial-datasheet.pdf',
    badge: 'Bifacial M10',
    seoTitle: 'ReNew Power M10 Mono PERC Bifacial Datasheet (535W-560W)',
    seoDescription: 'Download ReNew Power M10 Mono PERC Bifacial dual-glass module specifications (535W to 560W) for utility solar engineering.',
    contentPlaceholder: `ReNew Power M10 Mono PERC Bifacial modules feature dual-glass architecture for maximum protection against moisture, PID, and mechanical stress in harsh outdoor environments.

Typical Use Cases:
- Utility solar farms built on high-albedo ground surfaces (sand, concrete, light soil).
- Ground-mount structures requiring 25+ year outdoor durability.
- Solar parks utilizing VRM hot-dip galvanized 80-120 micron purlins.

Why EPCs Need This Datasheet:
Allows engineers to evaluate rear-side gain potential, module weight distribution, and clamp mounting zones.`
  },
  {
    id: 'datasheet-topcon-g2g',
    title: 'TOPCon G2G Gen-II Solar Module Technical Data (560W-590W)',
    category: 'Solar Panels',
    description: 'Generation II TOPCon Glass-to-Glass module mechanical dimensions, load resistance, and connector details.',
    fileSize: '2.7 MB',
    format: 'PDF',
    pdfUrl: '/topcon-g2g-gen-ii-solar-module-datasheet.pdf',
    badge: 'TOPCon Gen-II',
    seoTitle: 'TOPCon Glass-to-Glass Gen-II Module Technical Datasheet',
    seoDescription: 'Download technical data for Generation II TOPCon Glass-to-Glass modules including mechanical load limits, dimensions, and electrical specs.',
    contentPlaceholder: `TOPCon Glass-to-Glass Gen-II modules offer premium N-type efficiency with dual-glass sealing, virtually eliminating PID and micro-cracking risks over extended operation.

Typical Use Cases:
- Extreme weather solar installations (coastal marine, high humidity, desert).
- Long-term utility power purchase agreement (PPA) solar projects.
- Ground-mount arrays supported by VRM structural steel racking.

Why EPCs Need This Datasheet:
Critical for structural wind load calculations (IS 875), foundation depth sizing, and electrical array wiring.`
  },
  {
    id: 'datasheet-topcon-g2tb-35mm',
    title: 'TOPCon G2TB Series Gen-I 35mm Solar Module Specification',
    category: 'Solar Panels',
    description: 'Heavy-duty 35mm frame TOPCon Gen-I solar module technical datasheet with high static load ratings (5400Pa front / 2400Pa rear).',
    fileSize: '3.7 MB',
    format: 'PDF',
    pdfUrl: '/TOPCon_G2TBmodules(Gen-I)_26.12.23 35mm Size (1).pdf',
    badge: 'TOPCon 35mm',
    seoTitle: 'TOPCon G2TB Gen-I 35mm Module Technical Datasheet',
    seoDescription: 'Download specifications for TOPCon G2TB 35mm framed solar modules designed for severe wind load zones.',
    contentPlaceholder: `The TOPCon G2TB 35mm framed series provides enhanced torsional rigidity for high-wind geographic regions and cyclone-prone coastal installations.

Typical Use Cases:
- Cyclone-prone coastal solar installations requiring robust 35mm frames.
- Utility-scale tracker systems with high dynamic vibration loads.
- Large industrial rooftops with elevated wind exposures.

Why EPCs Need This Datasheet:
Provides exact mechanical clamping dimensions, ground hole positions, and torque specifications.`
  },
  {
    id: 'datasheet-waaree-bi-550',
    title: 'Waaree 520W-550W Bifacial Dual Glass Module Datasheet (30mm)',
    category: 'Solar Panels',
    description: 'Certified technical specifications for Waaree 520W to 550W dual-glass bifacial modules with slim 30mm profile.',
    fileSize: '916 KB',
    format: 'PDF',
    pdfUrl: '/Waree datasheet_bi_55_520_550_14_15012026_30mm_1782475797.pdf',
    badge: 'Dual Glass 30mm',
    seoTitle: 'Waaree 520W-550W Bifacial 30mm Module Datasheet',
    seoDescription: 'Download Waaree 520W-550W bifacial dual-glass module datasheet with electrical and mechanical data.',
    contentPlaceholder: `Waaree 520W-550W Dual Glass modules provide proven bifacial gain, high fire safety class, and optimized dimensions for standard rooftop and ground-mount arrays.

Typical Use Cases:
- Commercial rooftop arrays requiring lightweight bifacial generation.
- Ground-mount solar power plants.
- Agricultural solar installations with ground reflectance.

Why EPCs Need This Datasheet:
Enables precise mounting clamp distance verification and structural loading calculations.`
  },

  // SECTION: BROCHURES
  {
    id: 'datasheet-vrm-corporate-brochure',
    title: 'VRM Structures Solar Mounting Systems Corporate & Technical Brochure',
    category: 'Brochures',
    description: 'Official 12-page VRM Structures brochure showcasing manufacturing infrastructure, cold roll-formed purlins, rooftop & ground-mount structures, carports, and structural warranties.',
    fileSize: '32 MB',
    format: 'PDF',
    pdfUrl: '/Brochers.pdf',
    badge: 'Corporate Brochure',
    seoTitle: 'VRM Structures Solar Mounting Systems Corporate Brochure (32MB)',
    seoDescription: 'Download official 12-page VRM Structures corporate profile and solar mounting systems product brochure with engineering specifications.',
    contentPlaceholder: `VRM Structures is an ISO 9001:2015 certified premier manufacturer of high-strength structural steel and aluminum solar mounting structures. This comprehensive 12-page corporate brochure highlights our 35,000 MT/year manufacturing infrastructure, automated cold roll-forming lines, CNC punching, and structural engineering capabilities.

Key Topics Covered:
- Manufacturing Infrastructure: In-house roll-forming mills, automated high-speed punching, robotic welding, and quality testing labs.
- Ground-Mount Solar MMS: Fixed tilt, seasonal tilt, and customized dual-post/single-post structural frameworks for utility-scale solar parks.
- Rooftop Mounting Solutions: Elevated RCC roof structures, super structures, ballasted roof mounts, and industrial shed sheet clamps with leak-proof EPDM protection.
- Solar Carports & Walkways: Architectural elevated carport structures, FRP/galvanized walkways, and safety handrail systems.
- Cold Roll-Formed Purlins: High-tensile C-purlins, Z-purlins, and hat profiles (G350, G450, G550, and Galvalume).
- Corrosion Resistance & Standards: Hot-dip galvanization conforming to IS 4759 / ISO 1461 (80-120 microns) and Pre-Galvanized 550 GSM options for 25+ year lifespan in aggressive environments.`
  },
  {
    id: 'datasheet-pm-surya-ghar-kit',
    title: 'PM Surya Ghar Muft Bijli Yojana Solar Kit Catalogue',
    category: 'Brochures',
    description: 'Comprehensive product catalogue for PM Surya Ghar residential solar rooftop kits, complete with pre-engineered mounting structures, BOS accessories, inverter compatibility, and installation specifications.',
    fileSize: '20 MB',
    format: 'PDF',
    pdfUrl: '/PM%20SURYA%20GHAR%20KIT%20CATALOGUE.pdf',
    badge: 'PM Surya Ghar Kit',
    seoTitle: 'PM Surya Ghar Kit Catalogue | VRM Structures',
    seoDescription: 'Download the official PM Surya Ghar Muft Bijli Yojana Solar Kit catalogue featuring pre-engineered mounting structures, BOS kits, and inverter compatibility.',
    contentPlaceholder: `The PM Surya Ghar Muft Bijli Yojana Solar Kit Catalogue details VRM Structures' standardized, pre-engineered mounting structure and Balance of System (BOS) kits designed specifically for the national PM Surya Ghar residential solar mission across India.

Key Features & Specifications:
- Standardized System Capacities: Pre-configured kits for 1 kW, 2 kW, 3 kW, 5 kW, and up to 10 kW residential rooftop solar installations.
- Pre-Engineered MMS: High-strength galvanized C-purlins, pre-punched mounting rails, and modular tilt legs engineered for rapid on-site assembly without welding or drilling.
- Universal Roof Compatibility: Designed for flat RCC rooftops (expansion anchor bolted or ballasted), elevated structures, and corrugated metal sheets with mini-rail / short-rail systems.
- Inverter & Module Compatibility: Pre-engineered layouts tested for leading certified solar panels (Waaree, Adani, Loom Solar, Vikram) and inverters (Polycab, Deye, Growatt).
- Integrated BOS Components: ACDB & DCDB distribution boxes with SPD protection, copper-bonded chemical earthing electrodes, solar DC cables, and lightning arresters.
- Wind Load Certification: Structural engineering validation conforming to IS 875 (Part 3) with wind resistance up to 150 km/h.`
  }
];

export default function DatasheetDetailPage() {
  const { datasheetId } = useParams();
  const item = DOWNLOADS_DATA.find(d => d.id === datasheetId);

  if (!item) {
    return (
      <div className="bg-[#F5F1EE] min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-slate-900 font-display">Datasheet Not Found</h1>
        <p className="text-slate-600 text-sm mt-2 font-light">The requested technical document could not be located.</p>
        <Link to="/downloads" className="mt-6 px-6 py-3 bg-slate-950 text-white rounded-2xl text-xs font-bold uppercase tracking-wider">
          Back to all downloads
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen pt-20">
      <SEO
        title={item.seoTitle || `${item.title} | VRM Structures`}
        description={item.seoDescription || item.description}
        canonicalUrl={`https://vrmstructures.in/downloads/${item.id}`}
        ogType="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "name": item.title,
          "description": item.description,
          "encodingFormat": "application/pdf",
          "url": `https://vrmstructures.in${item.pdfUrl}`,
          "publisher": {
            "@type": "Organization",
            "name": "VRM Structures India Private Limited"
          }
        }}
      />

      {/* HERO SECTION */}
      <div className="relative overflow-hidden w-full min-h-[50vh] flex flex-col justify-between pt-10">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <CityAboveCloudsBackground />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10">
          <main className="py-12 md:py-16 text-left z-10">
            <Link to="/downloads" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 mb-6">
              <ArrowLeft size={14} /> Back to all downloads
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
                {item.badge}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/90 text-slate-900 font-mono text-xs font-bold border border-slate-200">
                {item.format} • {item.fileSize}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 max-w-4xl leading-tight">
              {item.title}
            </h1>

            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mt-4 font-light">
              {item.description}
            </p>
          </main>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E5E7EB]/40 border-[6px] border-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" /> Verified Technical Specification Sheet
              </div>

              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold text-xs px-8 py-4 rounded-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] shrink-0"
              >
                <FileText className="w-4 h-4" /> View PDF in Browser ({item.fileSize})
              </a>
            </div>

            {/* Overview Content */}
            <div className="mt-8 prose max-w-none text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Engineering Overview & Applications</h2>
              <div className="whitespace-pre-line font-light text-slate-600">
                {item.contentPlaceholder}
              </div>
            </div>

            {/* Related Products Link Section */}
            {/* TODO: Map specific products to specific datasheets later */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100">
              <div>
                <h4 className="font-display text-sm font-bold text-slate-900">Compatible Solar Mounting Systems</h4>
                <p className="font-sans text-xs text-slate-600 font-light mt-1">
                  Explore VRM Structures' hot-dip galvanized and aluminum mounting structures engineered to fit this component.
                </p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider shrink-0">
                View Related VRM Products <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
