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
    title: 'Polycab PSIS Single-Phase Grid-Tie String Inverter Datasheet (1-5 kW)',
    category: 'Inverters',
    description: 'Polycab Solar technical brochure for PSIS series single-phase grid-tie string inverters (1 kW to 5 kW): transformerless design, up to 97.8% max efficiency and IP65 enclosure.',
    fileSize: '1.4 MB',
    format: 'PDF',
    pdfUrl: '/polycab-solar--inverter-datasheet-india.pdf',
    badge: 'Single-Phase Grid-Tie',
    seoTitle: 'Polycab PSIS Single-Phase Grid-Tie Inverter (1-5 kW)',
    seoDescription: 'Polycab PSIS single-phase grid-tie string inverter datasheet, 1-5 kW: 220/230/240 V output, up to 97.8% max efficiency, IP65, RS485, optional Wi-Fi/GPRS.',
    contentPlaceholder: `The Polycab Solar Grid-Tie String Inverter technical brochure (2016) covers two transformerless inverter families on one sheet. This page covers the PSIS series: single-phase grid-tie inverters for homes and small rooftops, from PSIS-1K to PSIS-5K. The three-phase PSIT series (6-40 kW) from the same leaflet has its own page.

PSIS Series Specifications (from the datasheet):
- Models: PSIS-1K, 1.5K, 2K, 3K, 4K and 5K (rated output 1 kW to 5 kW)
- Grid: single phase, 220/230/240 V rated (180-270 V adjustable), 50 Hz (47-52 Hz operating range)
- Maximum DC input voltage: 450 V (1K-1.5K), 500 V (2K), 600 V (3K-5K)
- Start-up voltage: 60 V (1K-2K) / 120 V (3K-5K)
- MPPT: 1 tracker (1K-2K), 2 trackers (3K-5K); MPPT efficiency above 99.5%
- Maximum efficiency: 96.7% (1K-2K), 97.5% (3K), 97.8% (4K-5K)
- Enclosure: IP65, natural cooling, noise below 30 dB, -25 to 60 °C ambient
- Dimensions: 270 x 433 x 105 mm (1K-2K) / 339 x 565 x 172.5 mm (3K-5K); weight 5.2 kg to 15.8 kg
- Communication: RS485 and optional Wi-Fi / GPRS, 2 x 20 LCD display
- Protections: DC reverse polarity, short circuit, output over-voltage and over-current, insulation resistance monitoring, residual current detection, surge, grid monitoring, islanding and temperature protection
- Certificates: IEC 61727, EN 50438, VDE0126-1-1, AS4777, G83/2, G59/3, IEC 62116, IEC 60068-2, IEC 62109-1/2, AS3100
- Warranty: 5 years standard

Typical Use Cases:
- PM Surya Ghar and other residential rooftop systems up to 5 kW.
- Small commercial premises on a single-phase connection.

Why EPCs Need This Datasheet:
Needed for string sizing against the MPPT voltage window, AC breaker and cable selection from the output current, and wall-mount planning from the enclosure dimensions and weight.`
  },
  {
    id: 'datasheet-ongrid-systems',
    title: 'Deye On-Grid String Inverter Brochure (Single & Three Phase, 1.5-136 kW)',
    category: 'Inverters',
    description: 'Deye on-grid string inverter brochure covering single-phase SUN-G03 models (1.5-6.2 kW) and three-phase models from 4 kW to 136 kW, with a technical data table for each range.',
    fileSize: '9.7 MB',
    format: 'PDF',
    pdfUrl: '/on-grid-solar-system-engineering-guide.pdf',
    badge: 'Deye On-Grid Inverters',
    seoTitle: 'Deye On-Grid String Inverter Brochure (1.5-136 kW)',
    seoDescription: 'Deye on-grid string inverter brochure: single-phase SUN-G03 (1.5-6.2 kW) and three-phase 4-136 kW models, up to 98.8% max efficiency, zero export, IP65.',
    contentPlaceholder: `This 20-page Deye brochure presents the full Deye on-grid (grid-tied) string inverter line, from single-phase residential units to 136 kW three-phase commercial inverters. Each model range has a feature page and a full technical data table (input, output, efficiency, protection, general data and certifications).

Model Ranges Covered:
- Single phase SUN-1.5 / 2.2 / 2.7 / 3 / 3.3 / 3.6 / 4K-G03: 1 MPP tracker, max efficiency up to 97.5%
- Single phase SUN-3.6 / 4 / 4.2 / 5 / 5.2 / 6 / 6.2K-G03: 2 MPP trackers, max efficiency up to 97.5%
- Three phase SUN-4 to 12K-G03: 2 MPP trackers, max efficiency up to 98.3%
- Three phase SUN-15K-G03: 2 MPP trackers, max efficiency up to 98.5%
- Three phase SUN-18 / 20 / 25K-G05 and SUN-30 / 33 / 35K-G03: 2 MPP trackers, max efficiency up to 98.6%
- Three phase SUN-40 / 45 / 50K-G03: up to 4 MPP trackers, max efficiency up to 98.7%
- Three phase SUN-60 / 70 / 75 / 80K-G03: 4 MPP trackers, max efficiency up to 98.7%
- Three phase SUN-70 / 80 / 90 / 100 / 110K-G03: up to 6 MPP trackers, max efficiency up to 98.8%
- Three phase SUN-120 / 125 / 130 / 135 / 136K-G01P3-EU-AM8: 8 MPP trackers, max efficiency up to 98.8%

Common Features Listed:
- Zero export application and VSG application
- String intelligent monitoring, wide output voltage range, anti-PID function (optional on several ranges)
- DC Type II / AC Type II surge protection, IP65 ingress protection, transformerless topology
- RS485 / RS232 / Wi-Fi / LAN interfaces

Why EPCs Need This Brochure:
Used for inverter selection by phase and capacity, string sizing against each model's MPPT voltage range and input current, and planning wall or frame mounting from the listed dimensions and weights.`
  },
  {
    id: 'datasheet-polycab-commercial-inverter',
    title: 'Polycab PSIT Three-Phase Grid-Tie String Inverter Datasheet (6-40 kW)',
    category: 'Inverters',
    description: 'Polycab Solar technical specifications for PSIT series three-phase grid-tie string inverters (6 kW to 40 kW) with 2 or 4 MPPTs, 1000 V DC input, up to 98.6% max efficiency and IP65 enclosure.',
    fileSize: '1.4 MB',
    format: 'PDF',
    pdfUrl: '/polycab-solar--inverter-datasheet-india.pdf',
    badge: 'Three-Phase Grid-Tie',
    seoTitle: 'Polycab PSIT Three-Phase Grid-Tie Inverter (6-40 kW)',
    seoDescription: 'Polycab PSIT three-phase string inverter datasheet, 6-40 kW: 1000 V DC input, 2 or 4 MPPTs, up to 98.6% max efficiency, IP65, for C&I rooftop solar.',
    contentPlaceholder: `The Polycab Solar Grid-Tie String Inverter technical brochure (2016) also covers the PSIT series: transformerless three-phase grid-tie string inverters for commercial and industrial rooftops, from PSIT-6K to PSIT-40K. The single-phase PSIS series (1-5 kW) from the same leaflet has its own page.

PSIT Series Specifications (from the datasheet):
- Models: PSIT-6K, 10K, 15K, 20K, 25K, 30K, 36K and 40K (rated output 6 kW to 40 kW)
- Grid: three phase, 380/400 V (6K-15K, 25K-30K), 400 V (20K) or 480 V (36K-40K) rated, 50 Hz
- Maximum DC input voltage: 1000 V; start-up voltage 330 V (6K-15K) / 350 V (20K-40K)
- MPPT voltage range: 200-800 V (6K-15K) / 200-850 V (20K-40K)
- MPPT: 2 trackers (6K-15K), 4 trackers (20K-40K); MPPT efficiency above 99.5%
- Maximum efficiency: 98.2% (6K-10K), 98.3% (15K), 98.6% (20K-40K); Euro efficiency up to 98.3%
- Power factor: 0.8 leading to 0.8 lagging; grid current THD below 3%
- Enclosure: IP65, natural cooling, -25 to 60 °C ambient
- Dimensions: 430 x 613 x 269 mm (6K-15K) / 530 x 700 x 356.5 mm (20K-40K); weight 29 kg to 58.2 kg
- Connections: MC4 DC input; IP67 rated AC plug (6K-15K) or terminal connectors (20K-40K)
- Display and communication: LCD (6K-15K) or 7-inch colour LCD (20K-40K); RS485 and optional Wi-Fi / GPRS
- Protections: DC reverse polarity, short circuit, output over-voltage and over-current, insulation resistance monitoring, residual current detection, surge, grid monitoring, islanding and temperature protection
- Warranty: 5 years standard

Typical Use Cases:
- Industrial shed and factory rooftop solar plants.
- Commercial buildings with a three-phase grid connection.
- Distributed ground-mount systems up to 40 kW per inverter.

Why EPCs Need This Datasheet:
Provides the MPPT voltage windows, input currents and AC output currents needed for string calculations, cable sizing and protection selection.`
  },

  // SECTION: SOLAR PANELS
  {
    id: 'datasheet-730w-hjt-bifacial',
    title: 'Loom Solar SHARK 730 HJT Bifacial Solar Module Datasheet (730Wp)',
    category: 'Solar Panels',
    description: 'Loom Solar datasheet for the SHARK 730 HJT bifacial module: 730 Wp, 23.5% efficiency, 132 half-cut MBB cells, 2382 x 1134 x 33 mm, 3.2 mm ARC tempered glass.',
    fileSize: '624 KB',
    format: 'PDF',
    pdfUrl: '/730-wp-datasheet.pdf',
    badge: '730Wp HJT Bifacial',
    seoTitle: 'Loom Solar SHARK 730 HJT Bifacial Module Datasheet',
    seoDescription: 'Loom Solar SHARK 730 HJT datasheet: 730 Wp, 23.5% efficiency, 132 half-cut cells, 2382 x 1134 x 33 mm, 37.9 kg, 1500 V, electrical and mechanical data.',
    contentPlaceholder: `The Loom Solar SHARK 730 is a heterojunction (HJT) solar module built with half-cut multi-busbar (MBB) cells, with bifacial gain from the rear side. The datasheet rates it at 730 Wp and 23.5% module efficiency, with a 0 to +5 Wp power tolerance.

Electrical Data (STC):
- Model: SHARK 730 | Peak Power: 730 Wp
- Maximum Power Voltage / Current: 42.32 V / 17.26 A
- Open Circuit Voltage / Short Circuit Current: 50.37 V / 18.35 A
- Module Efficiency: 23.5%
- NOCT Peak Power: 557 Wp
- Maximum System Voltage: 1500 V | Max. Series Fuse: 35 A | Bypass Diode: 30 A
- Temperature Coefficients (specification table): Pmax -0.24%/°C, Voc -0.22%/°C, Isc +0.04%/°C (the cover page quotes -0.29%/°C for Pmax)

Mechanical Data:
- Cell Arrangement: 132 cells (11x6 || 11x6)
- Dimensions: 2382 x 1134 x 33 mm | Weight: 37.9 kg
- Glass: 3.2 mm ARC tempered glass
- Frame: Anodized aluminium alloy
- Junction Box: IP68 | Cable: 4.0 mm² | Connector: MC4
- Operating Temperature: -40 °C to 85 °C

Warranty & Certifications:
- 15-year product warranty on materials and workmanship; 30-year linear power performance warranty
- Degradation: no more than 1% in year 1, then no more than 0.3% per year
- Tested as per IEC 61215 & IEC 61730; ISO 9001, ISO 14001 and ISO 45001 management systems

Why EPCs Need This Datasheet:
Module length, width and weight drive purlin spacing, clamp positions and dead-load checks for VRM ground-mount and rooftop structures.`
  },
  {
    id: 'datasheet-550w-bifacial',
    title: 'Loom Solar SHARK 550W Bifacial Mono PERC Module Datasheet',
    category: 'Solar Panels',
    description: 'Loom Solar SHARK 550 bifacial datasheet: 144 half-cut mono PERC cells (DCR/non-DCR), 21.35% efficiency, 2+2 mm double glass, 30 mm frame and 5400/2400 Pa test load.',
    fileSize: '648 KB',
    format: 'PDF',
    pdfUrl: '/550-wp-bifacial-datasheet.pdf',
    badge: '550Wp Bifacial PERC',
    seoTitle: 'Loom Solar SHARK 550W Bifacial Mono PERC Datasheet',
    seoDescription: 'Loom Solar SHARK 550W bifacial datasheet: 144 half-cut mono PERC cells, DCR/non-DCR, 21.35% efficiency, 2+2 mm double glass, 2278 x 1134 x 30 mm, 32 kg.',
    contentPlaceholder: `The Loom Solar SHARK 550W Bifacial is a 144 half-cut mono PERC solar PV module, offered in DCR and non-DCR versions, with multi-busbar cells and double-glass construction. Loom Solar positions it for rooftop installations, with a 25-year performance warranty.

Electrical Data (STC):
- Model: SHARK 550 Bifacial | Maximum Power: 550 W
- Maximum Power Voltage / Current: 42.40 V / 12.98 A
- Open Circuit Voltage / Short Circuit Current: 50.20 V / 13.82 A
- Module Efficiency: 21.35%
- Temperature Coefficients: Pmax -0.350%/°C, Voc -0.270%/°C, Isc +0.048%/°C | NOCT 45 °C ± 2 °C
- Maximum System Voltage: 1500 V DC | Maximum Series Fuse: 30 A | Operating Temperature: -40 °C to 85 °C

Mechanical Data:
- Cells: Mono PERC, 144 cells (12x6)(12x6), 10 busbars
- Dimensions: 2278 x 1134 x 30 mm | Weight: 32 kg
- Glass: double glass, AR-coated toughened glass, 2 + 2 mm
- Frame: black / silver anodized aluminium, 30 mm
- Junction Box: split junction box (IP68) | Cable: 400 mm, 4 mm² | Connector: MC4 IP68 compatible
- Maximum Test Load (push / pull): 5400 Pa / 2400 Pa
- Mounting holes: 1095 mm across, at 1176 mm and 1500 mm centres
- Packing: 36 modules per commercial pack

Why EPCs Need This Datasheet:
Gives the module footprint, weight, mounting hole centres and test loads needed to lay out clamps and purlins on VRM rooftop and ground-mount structures.`
  },
  {
    id: 'datasheet-loom-solar-shark-topcon',
    title: 'Loom Solar SHARK N-Type TOPCon Bifacial Datasheet (620W-625W)',
    category: 'Solar Panels',
    description: 'Official Loom Solar technical datasheet for SHARK N-Type TOPCon bifacial modules featuring 620W-625W power output, 23.2% efficiency, and 30-year warranty.',
    fileSize: '6.8 MB',
    format: 'PDF',
    pdfUrl: '/loom-solar-shark-n-type-topcon-620w-625w-datasheet.pdf',
    badge: 'N-Type TOPCon 625W',
    seoTitle: 'Loom Solar SHARK N-Type TOPCon Datasheet (620W-625W)',
    seoDescription: 'Download official Loom Solar SHARK N-Type TOPCon bifacial module datasheet with 620W-625W peak power, 23.2% efficiency, and mechanical dimensions.',
    contentPlaceholder: `Loom Solar SHARK N-Type TOPCon modules deliver up to 625W maximum power output and 23.2% module efficiency, with bifacial gain from the rear side. They are built with 132 half-cut multi-busbar (MBB) cells, ARC tempered glass and a 30mm anodized aluminium alloy frame.

Key Electrical Specifications (STC):
- Peak Power: 620W (SHARK620) / 625W (SHARK625)
- Module Efficiency: 23% / 23.2%
- Open Circuit Voltage (Voc): 48.75V - 48.95V
- Short Circuit Current (Isc): 16.03A - 16.09A
- Maximum Power Voltage (Vmp): 41.01V - 41.18V
- Maximum Power Current (Imp): 15.12A - 15.18A
- Power Tolerance: 0±2%
- Maximum System Voltage: 1500 V | Max. Series Fuse: 35 A | Fire Rating: Class C
- Temperature Coefficients (specification table): Pmax -0.39%/°C, Voc -0.25%/°C, Isc 0.046%/°C (the cover page quotes -0.29%/°C for Pmax)

Mechanical & Structural Parameters:
- Dimensions: 2382 x 1134 x 30 mm
- Module Area: 2.70 m² | Weight: 33.0 kg
- Cell Arrangement: 132 Half-Cut Cells (11x6 / 11x6)
- Frame: 30mm Anodized Aluminium Alloy
- Junction Box: IP68 rated with 4.0 mm² cables and MC4 connectors
- Mounting & Grounding: 1400mm / 400mm mounting hole centres (9x14mm slots) and Ø 4.2mm grounding holes

Warranty & Certifications:
- 15-Year Enhanced Product Warranty on Materials & Workmanship
- 30-Year Linear Power Performance Warranty (First-year degradation <= 2%, subsequent annual degradation <= 0.5%)
- Certifications: Tested as per IEC 61215 & IEC 61730 standards, CE, BIS, ISO 9001, ISO 14001, ISO 45001

Why EPCs Need This Datasheet:
Provides precise mounting hole layouts and module dimensions and weight, essential for engineering compliant VRM Structures mounting purlins and tracker brackets.`
  },
  {
    id: 'datasheet-waaree-elite',
    title: 'Waaree Elite N-Type Bifacial Technical Datasheet (555W-585W)',
    category: 'Solar Panels',
    description: 'Official Waaree datasheet for Elite Series BiN-01 N-type TOPCon framed dual glass bifacial modules (555W to 585W), 108 G12 half-cut cells, up to 22.85% efficiency.',
    fileSize: '344 KB',
    format: 'PDF',
    pdfUrl: '/datasheet-waaree-elite-n-type-bifacial-555W-560W-565W-570W-575W-580W-585W.pdf',
    badge: 'N-Type Bifacial',
    seoTitle: 'Waaree Elite N-Type Bifacial Datasheet (555W-585W)',
    seoDescription: 'Waaree Elite BiN-01 N-type TOPCon dual glass bifacial datasheet (555W-585W): 108 G12 cells, up to 22.85% efficiency, 1965 x 1303 x 35 mm.',
    contentPlaceholder: `The Waaree Elite Series (BiN-01-555 to BiN-01-585) is a framed dual glass bifacial module built on G12 N-type TOPCon cells. The datasheet gives full STC and NOCT ratings, rear-side power gain tables, thermal characteristics and mechanical drawings.

Key Specifications (from the datasheet):
- Models: BiN-01-555 to BiN-01-585 (555 W to 585 W)
- Module Efficiency: 21.68% to 22.85%
- Cells: 108 cells (9x6 || 9x6), G12 N-type TOPCon bifacial
- Dimensions: 1965 x 1303 x 35 mm | Weight: 32.5 kg
- Glass: 2 mm low-iron HTAR semi-tempered front glass + 2 mm low-iron printed semi-tempered back glass
- Temperature Coefficient of Pmax: -0.30%/°C | Bifaciality: 80 ± 10%
- System Voltage: 1500 V | Series Fuse Rating: 35 A
- Mechanical Load: 5400 Pa snow / 2400 Pa wind
- Junction Box: IP68, 3 diodes | Cable: 4 mm², 500 mm, MC4 compatible
- Warranty: 12-year product, 30-year power output

Typical Use Cases:
- Utility-scale solar power plants requiring high power density and rear-side albedo gain.
- Commercial rooftop solar projects needing long-term performance guarantees.
- Installations paired with VRM aluminium or hot-dip galvanized mounting structures.

Why EPCs Need This Datasheet:
Accurate dimensions, mounting hole positions and load ratings are essential when sizing mounting purlins, tilt brackets and ballast for wind-zone compliance.`
  },
  {
    id: 'datasheet-adani-bifacial',
    title: 'Adani ELAN SHINE Bifacial PERC Dual Glass Module Datasheet (520W-555W)',
    category: 'Solar Panels',
    description: 'Adani Solar ELAN SHINE ASB-M10-144 Gen-II datasheet: bifacial dual glass P-type PERC half-cut modules from 520 Wp to 555 Wp, up to 21.5% efficiency.',
    fileSize: '1.8 MB',
    format: 'PDF',
    pdfUrl: '/adani-bifacial-perc-gen-ii-datasheet.pdf',
    badge: 'Bifacial PERC',
    seoTitle: 'Adani ELAN SHINE Bifacial PERC Dual Glass (520-555W)',
    seoDescription: 'Adani ELAN SHINE ASB-M10-144 Gen-II bifacial PERC dual glass datasheet, 520-555 Wp: 2278 x 1133 x 30 mm, 31.3 kg, up to 21.5% efficiency.',
    contentPlaceholder: `The Adani Solar ELAN SHINE Series ASB-M10-144 (Gen-II) is a bifacial dual glass module with 144 multi-busbar P-type PERC half-cut cells made with gallium-doped wafers.

Key Specifications (from the datasheet):
- Models: ASB-M10-144-520 to 555 (520 Wp to 555 Wp, 0 to +4.99 Wp tolerance)
- Module Efficiency: 20.15% to 21.5%
- Bifaciality Factor: up to 70 ± 5%
- Dimensions: 2278 x 1133 x 30 mm | Weight: 31.3 kg
- Glass: dual glass, 2.0 mm high-transmission ARC heat-strengthened glass and 2.0 mm semi-tempered glass; anodized frame
- Temperature Coefficients: Pmax -0.32%/°C, Voc -0.24%/°C, Isc 0.037%/°C | NOCT 45 °C ± 2 °C
- Maximum System Voltage: 1500 VDC (IEC & UL) | Max. Series Fuse: 30 A
- Design Mechanical Load: 3600 Pa downward / 1600 Pa upward (safety factor 1.5)
- Warranty: 30 years on power, 0.45% annual degradation

Typical Use Cases:
- Utility-scale ground-mounted solar power plants.
- Ground-mount installations paired with VRM hot-dip galvanized steel structures.

Why EPCs Need This Datasheet:
Provides hole positions, frame cross-sections and design loads required for structural engineering verification.`
  },
  {
    id: 'datasheet-adani-topcon',
    title: 'Adani ELAN SHINE TOPCon Bifacial 30mm Frame Module Datasheet (550W-575W)',
    category: 'Solar Panels',
    description: 'Adani Solar ELAN SHINE TOPCon Gen-II datasheet: N-type bifacial transparent backsheet modules, 550-575 Wp, up to 22.3% efficiency, 30 mm frame, 28 kg.',
    fileSize: '438 KB',
    format: 'PDF',
    pdfUrl: '/adani-topcon-30mm-framed-module-datasheet.pdf',
    badge: 'TOPCon 30mm',
    seoTitle: 'Adani ELAN SHINE TOPCon 30mm Module (550-575W)',
    seoDescription: 'Adani ELAN SHINE TOPCon Gen-II datasheet: N-type bifacial transparent backsheet module, 550-575 Wp, 2278 x 1133 x 30 mm, 28 kg, up to 22.3% efficiency.',
    contentPlaceholder: `The Adani Solar ELAN SHINE TOPCon Series ASB-M10-144 (Gen-II) is an N-type bifacial module with a transparent backsheet and a 30 mm frame.

Key Specifications (from the datasheet):
- Models: ASB-M10-144-550 to 575 (550 Wp to 575 Wp, 0 to +5 W tolerance)
- Module Efficiency: 21.3% to 22.3%
- Cells: 144 N-type bifacial half-cut cells | Bifaciality Factor: 80 ± 5%
- Dimensions: 2278 x 1133 x 30 mm | Weight: 28 kg
- Front Glass: 3.2 mm high-transmission ARC glass | Rear: transparent / patterned backsheet | Anodized frame
- Temperature Coefficients: Pmax -0.31%/°C, Voc -0.26%/°C, Isc 0.046%/°C | NOCT 45 °C ± 2 °C
- Maximum System Voltage: 1500 VDC (IEC & UL) | Max. Series Fuse: 30 A
- Design Mechanical Load: 3600 Pa downward / 1600 Pa upward (safety factor 1.5)
- Warranty: 12-year product; under 1.0% degradation in year 1 and under 0.40% per year in years 2-30

Typical Use Cases:
- Rooftop installations where module weight matters.
- Ground-mount and commercial arrays using VRM racking.

Why EPCs Need This Datasheet:
Crucial for clamp location verification, mid-clamp/end-clamp sizing, and structural deflection calculations.`
  },
  {
    id: 'datasheet-vikram-hypersol',
    title: 'Vikram Solar HYPERSOL M10R 144-Cell Datasheet (580W-605W)',
    category: 'Solar Panels',
    description: 'Official Vikram Solar HYPERSOL VSMDH.72 datasheet: N-type bifacial glass-glass modules with 144 M10R half-cut cells, 580W to 605W, up to 23.42% efficiency.',
    fileSize: '611 KB',
    format: 'PDF',
    pdfUrl: '/vikram-hypersol-m10r-580-605w-144-cell-datasheet.pdf',
    badge: 'M10R 144-Cell',
    seoTitle: 'Vikram Solar HYPERSOL M10R 144-Cell Datasheet (580W-605W)',
    seoDescription: 'Vikram Solar HYPERSOL VSMDH.72 N-type bifacial glass-glass datasheet (580W-605W): 144 M10R half-cut cells, up to 23.42% efficiency, 2278 x 1134 x 30 mm.',
    contentPlaceholder: `Vikram Solar HYPERSOL (VSMDH.72.AAA.05) modules are N-type bifacial glass-glass modules with 144 M10R half-cut cells, rated from 580 Wp to 605 Wp.

Key Specifications (from the datasheet):
- Peak Power: 580 Wp to 605 Wp (0 to +4.99 Wp tolerance)
- Module Efficiency: 22.45% to 23.42%
- Cells: 72 (144 half-cells) N-type bifacial | Bifaciality: 75 ± 5%
- Dimensions: 2278 x 1134 x 30 mm | Weight: 31.6 kg ± 5%
- Glass: 2.0 mm ARC semi-tempered front glass + 2.0 mm heat-strengthened rear glass
- Temperature Coefficients: Pmax -0.28%/°C, Voc -0.26%/°C
- Maximum System Voltage: 1500 V | Max. Series Fuse: 30 A
- Mechanical Load Test: 5400 Pa snow / 2400 Pa wind | Hail test: 40 mm
- Warranty: 12-year product; 30-year linear power warranty (1% in year 1, 0.4% per year to year 30)

Typical Use Cases:
- Utility-scale solar parks aiming for low Levelized Cost of Energy (LCOE).
- Ground-mounted solar arrays paired with VRM 2-in-portrait mounting structures.

Why EPCs Need This Datasheet:
Provides exact physical dimensions, cable lengths, junction box locations, and mounting and grounding hole positions.`
  },
  {
    id: 'datasheet-waaree-mono-perc',
    title: 'Waaree Mono PERC M10 Series Module Datasheet (515W-545W)',
    category: 'Solar Panels',
    description: 'Waaree Arka Series WSMD-515 to WSMD-545 datasheet: 144 half-cut mono PERC M10 (182 mm) cells, 515W to 545W, up to 21.17% efficiency, 35 mm frame.',
    fileSize: '968 KB',
    format: 'PDF',
    pdfUrl: '/datasheet-waaree-solar-mono-perc-m10-515W-520W-525W-530W-535W-540W-545W.pdf',
    badge: 'Mono PERC',
    seoTitle: 'Waaree Mono PERC M10 Series Datasheet (515W-545W)',
    seoDescription: 'Waaree Arka WSMD mono PERC M10 datasheet (515W-545W): 144 half-cut cells, up to 21.17% efficiency, 2272 x 1133 x 35 mm, 27.5 kg, 3.2 mm glass.',
    contentPlaceholder: `The Waaree Arka Series (WSMD-515 to WSMD-545) uses 144 half-cut mono PERC M10 cells (182 mm) with 10 busbars and a split junction box.

Key Specifications (from the datasheet):
- Models: WSMD-515 to WSMD-545 (515 W to 545 W)
- Module Efficiency: 20.01% to 21.17%
- Cells: 144 cells (12x6 || 12x6), mono PERC, 91 x 182 mm
- Dimensions: 2272 x 1133 x 35 mm | Weight: 27.5 kg
- Front Glass: 3.2 mm low-iron tempered glass with ARC coating
- Temperature Coefficients: Pmax -0.35%/°C, Voc -0.27%/°C, Isc 0.05%/°C | NOCT 43 °C ± 2 °C
- System Voltage: 1500 V | Series Fuse Rating: 25 A
- Junction Box: IP68 | Cable: 4 mm², 500 mm, MC4 compatible
- Warranty: 12-year product, 27-year power output

Typical Use Cases:
- Commercial & industrial rooftop solar installations across India.
- On-grid solar plants using proven PERC technology.

Why EPCs Need This Datasheet:
Essential for string design, inverter DC sizing, and structural purlin spacing calculations.`
  },
  {
    id: 'datasheet-renew-bifacial',
    title: 'ReNew Power M10 Mono PERC Bifacial Module Datasheet (535W-560W)',
    category: 'Solar Panels',
    description: 'ReNew RPS2MH72BD bifacial mono PERC datasheet: 144 half-cut M10 cells, 2 mm + 2 mm glass, 535W to 560W, up to 21.68% efficiency.',
    fileSize: '1.4 MB',
    format: 'PDF',
    pdfUrl: '/renew-power-m10-mono-perc-bifacial-datasheet.pdf',
    badge: 'Bifacial M10',
    seoTitle: 'ReNew Power M10 Mono PERC Bifacial Datasheet (535W-560W)',
    seoDescription: 'ReNew M10 mono PERC bifacial dual-glass datasheet (535W-560W): 144 half-cut cells, up to 21.68% efficiency, 2278 x 1134 x 30 mm, 32.5 kg.',
    contentPlaceholder: `ReNew bifacial mono PERC modules (RPS2MH72BD series) use 144 half-cut M10 cells with multi-busbar, gallium-doped PERC technology and glass on both sides.

Key Specifications (from the datasheet):
- Peak Power: 535 W to 560 W (0 to +5 W tolerance)
- Module Efficiency: 20.71% to 21.68% | Bifaciality factor up to 70%
- Dimensions: 2278 x 1134 x 30 mm | Weight: 32.5 kg
- Front Glass: 2 mm high-transmission tempered ARC glass | Rear Cover: 2 mm high-transmission glass
- Frame: 30 mm anodized aluminium | Junction Box: IP68 / IP67 | Cable: 4.0 mm², 300 mm
- Temperature Coefficients: Pmax -0.33%/°C, Voc -0.25%/°C, Isc 0.06%/°C | NOCT 43 °C ± 2 °C
- Mechanical Load: up to 5400 Pa snow / 2400 Pa wind | Max. Series Fuse: 30 A
- Warranty: 12-year product workmanship; 30-year power (2% first-year, 0.45% annual degradation)

Typical Use Cases:
- Utility solar farms built on high-albedo ground surfaces (sand, concrete, light soil).
- Large-scale ground-mount projects on VRM hot-dip galvanized structures.

Why EPCs Need This Datasheet:
Allows engineers to evaluate rear-side gain potential, module weight distribution, and clamp mounting zones.`
  },
  {
    id: 'datasheet-topcon-g2g',
    title: 'Adani ELAN SHINE TOPCon Dual Glass Gen-II Module Datasheet (550W-580W)',
    category: 'Solar Panels',
    description: 'Adani Solar ELAN SHINE TOPCon Gen-II datasheet: N-type bifacial dual glass ASB-M10-144 modules, 550-580 Wp, with mechanical drawings, design loads and electrical data.',
    fileSize: '2.8 MB',
    format: 'PDF',
    pdfUrl: '/topcon-g2g-gen-ii-solar-module-datasheet.pdf',
    badge: 'TOPCon Gen-II',
    seoTitle: 'Adani ELAN SHINE TOPCon Dual Glass Gen-II (550-580W)',
    seoDescription: 'Adani ELAN SHINE TOPCon Gen-II N-type dual glass datasheet, 550-580 Wp: 2278 x 1133 x 30 mm, 31.3 kg, 3600/1600 Pa design load, electrical specs.',
    contentPlaceholder: `The Adani Solar ELAN SHINE TOPCon Series ASB-M10-144 (Gen-II) is an N-type bifacial dual glass module with 144 half-cut cells, listed from 550 Wp to 580 Wp.

Key Specifications (from the datasheet):
- Models: ASB-M10-144-550 to 580 (STC table lists 550-575 Wp at 21.3% to 22.3% efficiency; headline maximum 22.5%)
- Cells: 144 N-type bifacial half-cut cells | Bifaciality Factor: 80 ± 5%
- Dimensions: 2278 x 1133 x 30 mm | Weight: 31.3 kg
- Glass: dual glass, 2.0 mm high-transmission ARC glass and 2.0 mm semi-tempered glass; anodized frame
- Temperature Coefficients: Pmax -0.32%/°C, Voc -0.24%/°C, Isc 0.028%/°C | NOCT 45 °C ± 2 °C
- Maximum System Voltage: 1500 VDC (IEC & UL) | Max. Series Fuse: 30 A
- Design Mechanical Load: 3600 Pa downward / 1600 Pa upward (safety factor 1.5)
- Warranty: 12-year product; under 1.0% degradation in year 1 and under 0.40% per year in years 2-30

Typical Use Cases:
- Coastal, high-humidity and desert installations where dual glass protects the cells.
- Long-term utility power purchase agreement (PPA) solar projects.
- Ground-mount arrays supported by VRM structural steel racking.

Why EPCs Need This Datasheet:
Critical for structural wind load calculations (IS 875), foundation depth sizing, and electrical array wiring.`
  },
  {
    id: 'datasheet-topcon-g2tb-35mm',
    title: 'Adani ELAN SHINE TOPCon Bifacial Gen-I 35mm Frame Module Datasheet (550W-575W)',
    category: 'Solar Panels',
    description: 'Adani Solar ELAN SHINE TOPCon Gen-I datasheet: N-type bifacial transparent backsheet modules with 35 mm frame, 550-575 Wp, 3600 Pa / 1600 Pa design load.',
    fileSize: '3.8 MB',
    format: 'PDF',
    pdfUrl: '/TOPCon_G2TBmodules(Gen-I)_26.12.23 35mm Size (1).pdf',
    badge: 'TOPCon 35mm',
    seoTitle: 'Adani ELAN SHINE TOPCon Gen-I 35mm Module (550-575W)',
    seoDescription: 'Adani ELAN SHINE TOPCon Gen-I bifacial transparent backsheet datasheet, 550-575 Wp: 2266 x 1133 x 35 mm, 28 kg, up to 22.4% efficiency.',
    contentPlaceholder: `The Adani Solar ELAN SHINE TOPCon Series ASB-M10-144 (Gen-I) is an N-type bifacial module with a transparent backsheet and a 35 mm frame.

Key Specifications (from the datasheet):
- Models: ASB-M10-144-550 to 575 (550 Wp to 575 Wp, 0 to +5 W tolerance)
- Module Efficiency: 21.42% to 22.40%
- Cells: 144 N-type bifacial half-cut cells | Bifaciality Factor: 80 ± 5%
- Dimensions: 2266 x 1133 x 35 mm | Weight: 28 kg
- Front Glass: 3.2 mm high-transmission ARC glass | Rear: transparent / patterned backsheet | Anodized frame
- Temperature Coefficients: Pmax -0.31%/°C, Voc -0.26%/°C, Isc 0.046%/°C | NOCT 45 °C ± 2 °C
- Maximum System Voltage: 1500 VDC (IEC & UL) | Max. Series Fuse: 30 A
- Design Mechanical Load: 3600 Pa downward / 1600 Pa upward (safety factor 1.5)
- Warranty: 12-year product; under 1.0% degradation in year 1 and under 0.40% per year in years 2-30

Typical Use Cases:
- Utility-scale ground-mount and tracker projects.
- Large industrial rooftops.

Why EPCs Need This Datasheet:
Provides frame cross-sections, mounting and grounding hole positions, and design loads for clamp and purlin selection.`
  },
  {
    id: 'datasheet-waaree-bi-550',
    title: 'Waaree 520W-550W Bifacial Dual Glass Module Datasheet (30mm)',
    category: 'Solar Panels',
    description: 'Waaree Ahnay Series Bi-55-520 to Bi-55-550 datasheet: framed dual glass bifacial mono PERC modules, 520W to 550W, with a slim 30 mm profile.',
    fileSize: '938 KB',
    format: 'PDF',
    pdfUrl: '/Waree datasheet_bi_55_520_550_14_15012026_30mm_1782475797.pdf',
    badge: 'Dual Glass 30mm',
    seoTitle: 'Waaree 520W-550W Bifacial 30mm Module Datasheet',
    seoDescription: 'Waaree Ahnay Bi-55 bifacial mono PERC dual glass datasheet (520W-550W): 144 half-cut cells, up to 21.36% efficiency, 2272 x 1133 x 30 mm, 32 kg.',
    contentPlaceholder: `The Waaree Ahnay Series (Bi-55-520 to Bi-55-550) is a framed dual glass bifacial module built on 144 half-cut mono PERC M10 cells.

Key Specifications (from the datasheet):
- Models: Bi-55-520 to Bi-55-550 (520 W to 550 W)
- Module Efficiency: 20.20% to 21.36% | Bifaciality Factor: 70 ± 10%
- Cells: 144 cells (12x6 || 12x6), mono PERC bifacial, 91 x 182 mm
- Dimensions: 2272 x 1133 x 30 mm | Weight: 32 kg
- Glass: 2 mm low-iron HTAR semi-tempered front glass + 2 mm low-iron printed semi-tempered back glass
- Temperature Coefficients: Pmax -0.34%/°C, Voc -0.25%/°C, Isc 0.05%/°C | NOCT 43 °C ± 2 °C
- System Voltage: 1500 V | Series Fuse Rating: 25 A
- Mechanical Load: 5400 Pa snow / 2400 Pa wind
- Warranty: 12-year product, 30-year power output

Typical Use Cases:
- Commercial rooftop arrays requiring bifacial generation.
- Ground-mount solar power plants.
- Agricultural solar installations with ground reflectance.

Why EPCs Need This Datasheet:
Enables precise mounting clamp distance verification and structural loading calculations.`
  },

  // SECTION: BROCHURES
  {
    id: 'datasheet-vrm-corporate-brochure',
    title: 'VRM Structures Solar Mounting Systems Corporate & Product Brochure',
    category: 'Brochures',
    description: 'Official 12-page VRM Structures brochure covering RCC flat roof, sheet roof, aluminium, ground-mount and carport mounting structures, FRP walkways, accessories and the PM Surya Ghar BOS kit.',
    fileSize: '4.6 MB',
    format: 'PDF',
    pdfUrl: '/vrm-structures-brochure.pdf',
    badge: 'Corporate Brochure',
    seoTitle: 'VRM Structures Solar Mounting Systems Brochure',
    seoDescription: 'VRM Structures 12-page brochure: HDG, Galvalume and aluminium solar mounting structures, carports, FRP walkways, accessories and PM Surya Ghar BOS kits.',
    contentPlaceholder: `VRM Structures India Private Limited, Chennai, manufactures solar module mounting structures for rooftop and ground-mounted projects. This 12-page brochure covers the full product range, the material and galvanizing standards behind it, and the PM Surya Ghar BOS kit.

Key Topics Covered:
- Company & Facilities: customized and engineered solutions for sheet roofs, RCC and elevated structures; hot-dip galvanized (HDG) structures; non-penetrative mounting; an in-house design and fabrication team; roll-forming and fabrication facilities.
- RCC Flat Roof MMS: 1-row and 2-row HDG models, elevated and customized HDG structures, angle ballast HDG structure, and 1M / 2M aluminium ballast structures.
- Material Standards: 650 GSM hot-dip galvanized (YS 240 / 350 MPa), 150 GSM Galvalume (JSW make, YS 550 MPa) and 120 GSM pre-galvanized (YS 240 MPa).
- Galvanizing Standard: IS 4759:1996 hot-dip galvanizing, maintained at 650 GSM (80-90 µm) as per the MNRE standard.
- Section Range: C lip channels (web 60-120 mm), L angles (20-50 mm), U channels (web 50-70 mm) and Galvalume top-hat sections (web 60 / 80 / 100 mm).
- Rooftop MMS: mini rails from 40 mm to 150 mm, 70-120 mm landscape rails, angle and strut short rails.
- Aluminium 6063 T6 Rooftop MMS: double-C long rails, Klip-Lok and Kal-Zip rails, 50 / 75 mm standing seam, tile and asbestos roof rails, and 2M reverse tilt; anodizing at 8-10 microns on request.
- Design & Mounting: all structures designed with FEA and STAAD Pro analysis to pass a wind speed of 47 m/s; penetrative (rivets / self-tapping screws) and non-penetrative (Parker LORD acrylic adhesive) mounting.
- Ground Mount & Carport MMS: HDG (80-90 microns) or 150 GSM Galvalume; pile depth 1.5 m for ground mount and 2 m for carports; 2-row and 3-row portrait tables.
- FRP Walkway & Handrail: UV-protected FRP with 35% glass content, 2000 / 3660 mm gratings in 273 / 310 mm widths, 38x38 and 38x75 mm mesh; supplied to more than 250 EPC solar contractors across India.
- Accessories: mid and end clamps, L brackets, T nuts, spring nuts, walkway clamps, earth strips, LORD adhesives, earth rods and lightning arresters.
- PM Surya Ghar BOS Kit: bill of materials for 3 kW and 5 kW residential kits.`
  },
  {
    id: 'datasheet-pm-surya-ghar-kit',
    title: 'PM Surya Ghar Muft Bijli Yojana Solar Kit Catalogue',
    category: 'Brochures',
    description: 'VRM Structures catalogue for PM Surya Ghar residential solar kits: the full bill of materials for 3 kW and 5 kW systems, from modules and inverter to structure, cables and earthing.',
    fileSize: '2.5 MB',
    format: 'PDF',
    pdfUrl: '/pm-surya-ghar-kit-catalogue.pdf',
    badge: 'PM Surya Ghar Kit',
    seoTitle: 'PM Surya Ghar 3 kW & 5 kW Solar Kit Catalogue | VRM',
    seoDescription: 'VRM Structures PM Surya Ghar kit catalogue: 3 kW and 5 kW bills of materials with modules, inverter, ACDB-DCDB, earthing kit, RCC structure and cables.',
    contentPlaceholder: `This 4-page VRM Structures catalogue presents the PM Surya Ghar BOS and mounting kit: one source for the modules, inverter, structure, distribution boxes, cables and earthing of a residential rooftop system.

Kit Contents (3 kW / 5 kW):
- Solar Modules: Adani, Waaree, ReNew Power or Vikram Solar (6 modules for 3 kW, 10 for 5 kW)
- Inverter: Polycab, Growatt or Deye (1)
- ACDB-DCDB with MCB: MCB & SPD, L-Max make (Polycab) (1)
- Earthing Kit (Terrabond): 1 lightning arrester, 3 earth rods, 3 earth pit chambers, 3 chemical bags of 10 kg
- Structure for RCC / high-rise roofs, VRM Structures make (1)
- Polycab 4 sq mm DC cable, red & black (40) and Polycab 4 sq mm AC cable, red & black (40)
- Orbit 16 sq mm green earthing cable (90 for 3 kW, 100 for 5 kW)
- MC4 connectors (2), cable ties, lugs and glands (5), PVC cable tray

Service Promise:
End-to-end support, on-time delivery, complete BOS supply, nationwide service network, expert technical assistance and hassle-free procurement.`
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
