import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SEO from "./SEO";
import {
  Shield,
  Layers,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Download,
  Settings,
  Scale,
  Compass,
  Hammer,
  Plus,
  Minus,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import {
  ImagineLogo,
  HeroImageBackground,
  CityAboveCloudsBackground
} from "./Artworks";
import ScrollDownButton from "./ScrollDownButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

// High-performance GLTF/GLB 3D Canvas for RCC Roof MMS
function RCCRoof3DViewer({ url, zoom = 1.0 }: { url: string; zoom?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const zoomInRef = useRef<() => void>(() => {});
  const zoomOutRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(2.4, 1.4, 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Attach React button handlers to camera distance
    zoomInRef.current = () => {
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
      if (dir.length() > 0.8) {
        dir.multiplyScalar(0.85);
        camera.position.copy(controls.target).add(dir);
        controls.update();
      }
    };

    zoomOutRef.current = () => {
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
      if (dir.length() < 6.0) {
        dir.multiplyScalar(1.15);
        camera.position.copy(controls.target).add(dir);
        controls.update();
      }
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(12, 18, 12);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 2048;
    dirLight1.shadow.mapSize.height = 2048;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.0);
    dirLight2.position.set(-12, 8, -12);
    scene.add(dirLight2);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    loader.setDRACOLoader(dracoLoader);
    let loadedObj: THREE.Group | THREE.Object3D | null = null;

    const tryLoad = (modelUrl: string, isFallback: boolean = false) => {
      loader.load(
        modelUrl,
        (gltf) => {
          const obj = gltf.scene;
          loadedObj = obj;
          const box = new THREE.Box3().setFromObject(obj);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const center = new THREE.Vector3();
          box.getCenter(center);

          const scaleFactor = (2.2 * zoom) / (maxDim || 1);
          obj.scale.set(scaleFactor, scaleFactor, scaleFactor);

          obj.position.x = -center.x * scaleFactor;
          obj.position.y = -center.y * scaleFactor;
          obj.position.z = -center.z * scaleFactor;

          obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.geometry) {
                child.geometry.computeVertexNormals();
              }

              const name = (child.name || "").toLowerCase();
              const isHandrail = url.toLowerCase().includes("handrail");
              const isWalkway = url.toLowerCase().includes("walk_way") || url.toLowerCase().includes("walkway");
              const isPanel = name.includes("panel") || name.includes("solar") || name.includes("glass") || name.includes("pv");
              const isFrame = name.includes("frame") || name.includes("clamp") || name.includes("bolt");

              if (isHandrail) {
                const isCup = name.includes("cup");
                child.material = new THREE.MeshPhongMaterial({
                  color: isCup ? new THREE.Color("#DC2626") : new THREE.Color("#FBBF24"), // Red for cup, Safety Yellow for others
                  specular: new THREE.Color("#FFFFFF"),
                  shininess: isCup ? 85 : 40,
                  side: THREE.DoubleSide
                });
              } else if (isWalkway) {
                child.material = new THREE.MeshPhongMaterial({
                  color: new THREE.Color("#FBBF24"), // Safety Yellow for Walkway
                  specular: new THREE.Color("#FFFFFF"),
                  shininess: 45,
                  side: THREE.DoubleSide
                });
              } else if (isPanel) {
                child.material = new THREE.MeshPhongMaterial({
                  color: new THREE.Color("#0A192F"),
                  specular: new THREE.Color("#38BDF8"),
                  shininess: 120,
                  side: THREE.DoubleSide
                });
              } else if (isFrame) {
                child.material = new THREE.MeshPhongMaterial({
                  color: new THREE.Color("#E2E8F0"), // Shining aluminum base
                  specular: new THREE.Color("#FFFFFF"), // Bright highlight
                  shininess: 130, // High shininess (smooth / reduced roughness)
                  side: THREE.DoubleSide
                });
              } else {
                child.material = new THREE.MeshPhongMaterial({
                  color: new THREE.Color("#E2E8F0"),
                  specular: new THREE.Color("#FFFFFF"),
                  shininess: 130,
                  side: THREE.DoubleSide
                });
              }
            }
          });

          scene.add(obj);
          setIsLoaded(true);
        },
        undefined,
        (err) => {
          console.warn("Failed to load 3D model from:", modelUrl, err);
          if (!isFallback) {
            const fallbackUrl = modelUrl.startsWith("/public/")
              ? modelUrl.replace("/public/", "/")
              : "/public" + modelUrl;
            tryLoad(fallbackUrl, true);
          }
        }
      );
    };

    tryLoad(url);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (loadedObj) {
        loadedObj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [url]);

  return (
    <div className="w-full h-full relative group bg-slate-900 rounded-[1.75rem] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-3">
          <div className="w-7 h-7 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium tracking-wider uppercase">Loading 3D Model...</span>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Interactive Overlay Badge */}
      <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg select-none pointer-events-none z-10 flex items-center justify-center text-center">
        <span className="text-[9.5px] font-bold tracking-[0.15em] text-white uppercase text-center leading-none">
          Drag to Rotate • Use + / − to Zoom
        </span>
      </div>

      {/* Floating Zoom In & Zoom Out Action Buttons */}
      <div className="absolute bottom-5 right-5 flex flex-col gap-2.5 z-10">
        <button
          onClick={() => zoomInRef.current()}
          className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-95 border border-white/20 transition-all flex items-center justify-center shadow-lg cursor-pointer select-none"
          title="Zoom In"
        >
          <Plus size={18} className="stroke-[2.5]" />
        </button>
        <button
          onClick={() => zoomOutRef.current()}
          className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md text-white hover:bg-white/25 active:scale-95 border border-white/20 transition-all flex items-center justify-center shadow-lg cursor-pointer select-none"
          title="Zoom Out"
        >
          <Minus size={18} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

interface ProductDetailsPageProps {
  onNavigate: (page: "home" | "about" | "contact" | "careers" | "articles" | "products" | "services" | "quote" | "product-details", targetId?: string) => void;
  selectedProductTitle?: string;
}

export default function ProductDetailsPage({ onNavigate, selectedProductTitle = "Metal Roof MMS" }: ProductDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "standards" | "guide">("specs");

  const productDetailsMap = {
    "Metal Roof MMS": {
      title: "Metal Roof MMS",
      subTitle: "Module Mounting Structure",
      desc: "A high-performance, lightweight, and corrosion-resistant mounting structure engineered specifically for fast, non-penetrative, and completely leak-proof installation on trapezoidal or standing-seam industrial metal roofs.",
      material: "Aluminum Alloy (6005-T6) & Stainless Steel SS304",
      thickness: "1.5mm - 2.0mm anodized profiles",
      windSpeed: "180 km/h (compliant with IS 875 Part 3)",
      tiltAngle: "5° to 15° (roof-parallel profile mount)",
      standards: [
        "IS 875 (Part 3) for Wind Load structural verification",
        "IS 2062 for structural steel quality guidelines",
        "IS 4759 for hot-dip galvanizing quality standards",
        "ISO 9001:2015 certified design & manufacturing workflows"
      ],
      features: [
        { name: "Material Grade", val: "Aluminum 6005-T6", icon: <Scale size={16} /> },
        { name: "Wind Rating", val: "Up to 180 km/h wind velocity stability", icon: <Compass size={16} /> },
        { name: "Corrosion Grade", val: "C4/C5 Highly Anti-Corrosive durability", icon: <Shield size={16} /> },
        { name: "Fasteners", val: "SS304/SS316 Stainless Steel Grade A2-70", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Direct Rail Clamp / Non-penetrative options", icon: <Hammer size={16} /> }
      ]
    },
    "RCC Roof MMS": {
      title: "RCC Roof MMS",
      subTitle: "Elevated Frame Flat Concrete Ground Solutions",
      desc: "High-performance elevated solar mounting systems designed for commercial flat concrete rooftops, maximizing energy generation with rooftop solar mounting configurations while protecting waterproofing membranes.",
      material: "Structural Pre-Galvanized GP Steel & HDG Details",
      thickness: "RCC Roof System Pack Components",
      windSpeed: "Up to 160 km/h (IS 875 Compliant)",
      tiltAngle: "10° to 20° Fixed angle optimizing spatial density",
      standards: [
        "RCC Roof MMS are designed to deliver high structural reliability with simplified on-site assembly.",
        "Layouts accommodate various module sizes, including portrait and landscape orientations.",
        "Accessories like cable trays, walkways, and earthing provisions are integrated in the design.",
        "Wind tunnel considerations and local code requirements inform key design decisions.",
        "Materials are selected to minimize corrosion and ensure compatibility with roofing/soil conditions.",
        "Adjustable tolerances and slotted connections address site irregularities.",
        "Comprehensive installation manuals and checklists reduce training time.",
        "System components are pre-kitted and labeled to accelerate logistics and assembly.",
        "Lifecycle cost optimization balances CAPEX savings with OPEX durability.",
        "Safety features align with best practices for working at heights and electrical grounding.",
        "System Options: RCC Roof Canopy, Pre-Galvanized GP Steel, Ballast Foundations, Load Distribution."
      ],
      features: [
        { name: "Wind Capability", val: "Up to 160 km/h (IS 875 Compliant)", icon: <Compass size={16} /> },
        { name: "Tilt Tolerance Range", val: "10° to 20° Fixed angle optimizing spatial density", icon: <Scale size={16} /> },
        { name: "Framework", val: "Elevated Frame Flat Concrete Ground Solutions", icon: <Shield size={16} /> },
        { name: "RCC System Pack", val: "Pre-galvanized framing rails, customizable base anchorage & assembly guidelines", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Ballast concrete block foundation / Chemical anchor bolt mounting", icon: <Hammer size={16} /> }
      ]
    },
    "Customized MMS": {
      title: "Customized MMS",
      subTitle: "Engineered Adaptability for Complex Terrains",
      desc: "Specially designed fixed tilt solar structures and custom-engineered mounting frameworks tailored for non-standard industrial sites, variable ground elevations, and complex layouts to ensure long-term stability.",
      material: "High-Tensile Galvanized Steel / Aluminum Alloy",
      thickness: "Custom Design Pack Components",
      windSpeed: "Up to 200+ km/h custom calculated",
      tiltAngle: "0° to 45° Custom Fixed or Semi-Adjustable",
      standards: [
        "Customized MMS are designed to deliver high structural reliability with simplified on-site assembly.",
        "Layouts accommodate various module sizes, including portrait and landscape orientations.",
        "Accessories like cable trays, walkways, and earthing provisions are integrated in the design.",
        "Wind tunnel considerations and local code requirements inform key design decisions.",
        "Materials are selected to minimize corrosion and ensure compatibility with roofing/soil conditions.",
        "Adjustable tolerances and slotted connections address site irregularities.",
        "Comprehensive installation manuals and checklists reduce training time.",
        "System components are pre-kitted and labeled to accelerate logistics and assembly.",
        "Lifecycle cost optimization balances CAPEX savings with OPEX durability.",
        "Safety features align with best practices for working at heights and electrical grounding.",
        "Variations available: Custom Elevational Truss, Wall Mounted Solar Canopy, Variable Pitch Ground MMS, RCC Concrete Pier Canopy."
      ],
      features: [
        { name: "Wind Capability", val: "Up to 200+ km/h custom calculated", icon: <Compass size={16} /> },
        { name: "Tilt Tolerance Range", val: "0° to 45° Custom Fixed or Semi-Adjustable", icon: <Scale size={16} /> },
        { name: "Adaptability", val: "Engineered Adaptability for Complex Terrains", icon: <Shield size={16} /> },
        { name: "Custom Design Pack", val: "Engineering blueprints, STAAD.Pro reports & fabrication sheets", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Custom Elevational Truss / Wall Mounted / Pier Canopy", icon: <Hammer size={16} /> }
      ]
    },
    "Ground Mounted MMS": {
      title: "Ground Mounted MMS",
      subTitle: "Simplified Logistics & Heavy Duty Structural Reliability",
      desc: "Heavy-duty ground mounted solar structures and hot dip galvanized solar structures designed for superior durability, meeting the demanding utility-scale needs across diverse terrains and extreme environmental conditions.",
      material: "Hot-Dip Galvanized Steel (minimum 80 microns)",
      thickness: "Heavy-Duty Utility Racking",
      windSpeed: "Up to 210 km/h (IS 875 Compliant)",
      tiltAngle: "10° to 35° Fixed Angle Layout",
      standards: [
        "Ground Mounted MMS are designed to deliver high structural reliability with simplified on-site assembly.",
        "Layouts accommodate various module sizes, including portrait and landscape orientations.",
        "Accessories like cable trays, walkways, and earthing provisions are integrated in the design.",
        "Wind tunnel considerations and local code requirements inform key design decisions.",
        "Materials are selected to minimize corrosion and ensure compatibility with roofing/soil conditions.",
        "Adjustable tolerances and slotted connections address site irregularities.",
        "Comprehensive installation manuals and checklists reduce training time.",
        "System components are pre-kitted and labeled to accelerate logistics and assembly.",
        "Lifecycle cost optimization balances CAPEX savings with OPEX durability.",
        "Safety features align with best practices for working at heights and electrical grounding."
      ],
      features: [
        { name: "Wind Capability", val: "Up to 210 km/h (IS 875 Compliant)", icon: <Compass size={16} /> },
        { name: "Tilt Tolerance Range", val: "10° to 35° Fixed Angle Layout", icon: <Scale size={16} /> },
        { name: "Reliability", val: "Simplified Logistics & Heavy Duty Structural Reliability", icon: <Shield size={16} /> },
        { name: "Pre-Engineered Pack", val: "Pre-kitted and labeled HDG post & channel components", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Ramming post / Driven pile / Concrete foundation", icon: <Hammer size={16} /> }
      ]
    },
    "Solar Pump MMS": {
      title: "Solar Pump MMS",
      subTitle: "Simplified Logistics & Heavy-Duty Remote Irrigation Support",
      desc: "Ultra-rugged solar mounting structures custom-designed for off-grid pump controllers and rural farm environments, offering reliable fixed tilt solar structures with seasonal manual tilt adjustments and anti-theft design.",
      material: "Hot-Dip Galvanized Steel & Heavy-Duty Anti-Theft Hardware",
      thickness: "Pump System Pack Components",
      windSpeed: "Up to 150 km/h (IS 875 Compliant)",
      tiltAngle: "Manual seasonal adjustment from 10° to 45°",
      standards: [
        "Solar Pump MMS are designed to deliver high structural reliability with simplified on-site assembly.",
        "Layouts accommodate various module sizes, including portrait and landscape orientations.",
        "Accessories like cable trays, walkways, and earthing provisions are integrated in the design.",
        "Wind tunnel considerations and local code requirements inform key design decisions.",
        "Materials are selected to minimize corrosion and ensure compatibility with roofing/soil conditions.",
        "Adjustable tolerances and slotted connections address site irregularities.",
        "Comprehensive installation manuals and checklists reduce training time.",
        "System components are pre-kitted and labeled to accelerate logistics and assembly.",
        "Lifecycle cost optimization balances CAPEX savings with OPEX durability.",
        "Safety features align with best practices for working at heights and electrical grounding.",
        "Configurations: Solar Pump MMS Array, Dual Axis Framework, Ground Anchorage, Elevation Setup."
      ],
      features: [
        { name: "Wind Capability", val: "Up to 150 km/h (IS 875 Compliant)", icon: <Compass size={16} /> },
        { name: "Tilt Adjustment Range", val: "Manual seasonal adjustment from 10° to 45°", icon: <Scale size={16} /> },
        { name: "Irrigation Support", val: "Simplified Logistics & Heavy-Duty Remote Irrigation Support", icon: <Shield size={16} /> },
        { name: "Pump System Pack", val: "Structural post legs, multi-angle tilt arm assemblies & anti-theft hardware", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Concrete foundation anchor / Ground pier installation", icon: <Hammer size={16} /> }
      ]
    },
    "Carport MMS": {
      title: "Carport MMS",
      subTitle: "Simplified Logistics & Architectural Integrity",
      desc: "Premium carport solar mounting structures engineered for high durability and structural safety, providing lightweight solar racking and dual-use solar asset protection for commercial parking areas.",
      material: "High-Tensile Galvanized Steel & Aluminum details",
      thickness: "Pre-Engineered Pack Components",
      windSpeed: "Up to 180 km/h (IS 875 Compliant)",
      tiltAngle: "5° to 12° Optimal Drainage",
      standards: [
        "Carport MMS are designed to deliver high structural reliability with simplified on-site assembly.",
        "Layouts accommodate various module sizes, including portrait and landscape orientations.",
        "Accessories like cable trays, walkways, and earthing provisions are integrated in the design.",
        "Wind tunnel considerations and local code requirements inform key design decisions.",
        "Materials are selected to minimize corrosion and ensure compatibility with roofing/soil conditions.",
        "Adjustable tolerances and slotted connections address site irregularities.",
        "Comprehensive installation manuals and checklists reduce training time.",
        "System components are pre-kitted and labeled to accelerate logistics and assembly.",
        "Lifecycle cost optimization balances CAPEX savings with OPEX durability.",
        "Safety features align with best practices for working at heights and electrical grounding."
      ],
      features: [
        { name: "Wind Capability", val: "Up to 180 km/h (IS 875 Compliant)", icon: <Compass size={16} /> },
        { name: "Tilt Tolerance Range", val: "5° to 12° Optimal Drainage", icon: <Scale size={16} /> },
        { name: "Logistics", val: "Simplified Logistics & Architectural Integrity", icon: <Shield size={16} /> },
        { name: "Pre-Engineered Pack", val: "All modular hardware components packaged together for instant site anchoring", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Concrete pier foundation anchor bolt mounting", icon: <Hammer size={16} /> }
      ]
    },
    "Aluminum Module Mounting Structure": {
      title: "Aluminum Module Mounting Structure",
      subTitle: "Lightweight Strength. Maximum Performance.",
      desc: "Precision-engineered aluminum module mounting structures fabricated with high-strength anodized alloys (6005-T5 / 6063-T6), optimized for rapid installation, zero roof leakage, and 25+ years corrosion-free life.",
      material: "Premium-Grade Anodized Aluminum 6005-T5 / 6063-T6 Alloys",
      thickness: "100 mm to 6 meters profile length flexibility",
      windSpeed: "FEA & Pull-Out Test Certified (up to 180 km/h)",
      tiltAngle: "Roof-parallel or 150 mm elevated bifacial clearance option",
      seoTitle: "Aluminum Module Mounting Structure Manufacturer | VRM Structures",
      seoDescription: "Industrial aluminum module mounting structures designed for trapezoidal, standing seam, and Klip-Lok rooftop solar power projects in India.",
      standards: [
        "Manufactured using premium-grade Aluminum 6005-T5 / 6063-T6 alloys for superior strength and durability.",
        "Anodized surface finish for exceptional corrosion resistance and extended service life.",
        "Lightweight yet high-strength design, reducing dead load on industrial sheet roofs while maintaining structural stability.",
        "Engineered and validated through Finite Element Analysis (FEA) for optimal structural performance.",
        "Pull-Out Test certified to ensure secure anchoring and reliable load-bearing capacity.",
        "Salt Spray Test verified for superior performance in coastal and high-humidity environments.",
        "Available in profile lengths ranging from 100 mm to 6 meters for maximum project flexibility.",
        "Comprehensive mounting solutions for Metal Sheet Roofs, Standing Seam Roofs, and Klip-Lok Roofs.",
        "Optimized profile designs compatible with a wide range of rooftop solar applications.",
        "150 mm module clearance option available to enhance bifacial solar panel energy generation.",
        "Designed for fast installation, reduced maintenance, and long-term reliability.",
        "Suitable for residential, commercial, and industrial rooftop solar projects."
      ],
      features: [
        { name: "Alloy Grade", val: "Aluminum 6005-T5 / 6063-T6", icon: <Scale size={16} /> },
        { name: "Validation", val: "Finite Element Analysis (FEA) & Pull-Out Test Certified", icon: <Compass size={16} /> },
        { name: "Corrosion Test", val: "Salt Spray Test Verified for Coastal & High Humidity Environments", icon: <Shield size={16} /> },
        { name: "Roof Types", val: "Metal Sheet Roofs, Standing Seam Roofs & Klip-Lok Roofs", icon: <Settings size={16} /> },
        { name: "Bifacial Option", val: "150 mm module clearance option to enhance bifacial energy generation", icon: <Hammer size={16} /> }
      ]
    },
    "Aluminum Module Mounting Structures": {
      title: "Aluminum Module Mounting Structure",
      subTitle: "Lightweight Strength. Maximum Performance.",
      desc: "Precision-engineered aluminum module mounting structures fabricated with high-strength anodized alloys (6005-T5 / 6063-T6), optimized for rapid installation, zero roof leakage, and 25+ years corrosion-free life.",
      material: "Premium-Grade Anodized Aluminum 6005-T5 / 6063-T6 Alloys",
      thickness: "100 mm to 6 meters profile length flexibility",
      windSpeed: "FEA & Pull-Out Test Certified (up to 180 km/h)",
      tiltAngle: "Roof-parallel or 150 mm elevated bifacial clearance option",
      seoTitle: "Aluminum Module Mounting Structure Manufacturer | VRM Structures",
      seoDescription: "Industrial aluminum module mounting structures designed for trapezoidal, standing seam, and Klip-Lok rooftop solar power projects in India.",
      standards: [
        "Manufactured using premium-grade Aluminum 6005-T5 / 6063-T6 alloys for superior strength and durability.",
        "Anodized surface finish for exceptional corrosion resistance and extended service life.",
        "Lightweight yet high-strength design, reducing dead load on industrial sheet roofs while maintaining structural stability.",
        "Engineered and validated through Finite Element Analysis (FEA) for optimal structural performance.",
        "Pull-Out Test certified to ensure secure anchoring and reliable load-bearing capacity.",
        "Salt Spray Test verified for superior performance in coastal and high-humidity environments.",
        "Available in profile lengths ranging from 100 mm to 6 meters for maximum project flexibility.",
        "Comprehensive mounting solutions for Metal Sheet Roofs, Standing Seam Roofs, and Klip-Lok Roofs.",
        "Optimized profile designs compatible with a wide range of rooftop solar applications.",
        "150 mm module clearance option available to enhance bifacial solar panel energy generation.",
        "Designed for fast installation, reduced maintenance, and long-term reliability.",
        "Suitable for residential, commercial, and industrial rooftop solar projects."
      ],
      features: [
        { name: "Alloy Grade", val: "Aluminum 6005-T5 / 6063-T6", icon: <Scale size={16} /> },
        { name: "Validation", val: "Finite Element Analysis (FEA) & Pull-Out Test Certified", icon: <Compass size={16} /> },
        { name: "Corrosion Test", val: "Salt Spray Test Verified for Coastal & High Humidity Environments", icon: <Shield size={16} /> },
        { name: "Roof Types", val: "Metal Sheet Roofs, Standing Seam Roofs & Klip-Lok Roofs", icon: <Settings size={16} /> },
        { name: "Bifacial Option", val: "150 mm module clearance option to enhance bifacial energy generation", icon: <Hammer size={16} /> }
      ]
    },
    "Aluminum Mounting Structure": {
      title: "Aluminum Module Mounting Structure",
      subTitle: "Lightweight Strength. Maximum Performance.",
      desc: "Precision engineered with rigorous QA, optimized for quick installation and long service life on sheet roof solar mounting structures.",
      material: "Premium-Grade Aluminum 6005-T5 / 6063-T6 Alloys",
      thickness: "100 mm to 6 meters profile length flexibility",
      windSpeed: "FEA & Pull-Out Test Certified",
      tiltAngle: "Roof-parallel or 150 mm bifacial clearance option",
      standards: [
        "Manufactured using premium-grade Aluminum 6005-T5 / 6063-T6 alloys for superior strength and durability.",
        "Anodized surface finish for exceptional corrosion resistance and extended service life.",
        "Lightweight yet high-strength design, reducing roof load while maintaining structural stability.",
        "Engineered and validated through Finite Element Analysis (FEA) for optimal structural performance.",
        "Pull-Out Test certified to ensure secure anchoring and reliable load-bearing capacity.",
        "Salt Spray Test verified for superior performance in coastal and high-humidity environments.",
        "Available in profile lengths ranging from 100 mm to 6 meters for maximum project flexibility.",
        "Comprehensive mounting solutions for Metal Sheet Roofs, Standing Seam Roofs, and Klip-Lok Roofs.",
        "Optimized profile designs compatible with a wide range of rooftop solar applications.",
        "150 mm module clearance option available to enhance bifacial solar panel energy generation.",
        "Designed for fast installation, reduced maintenance, and long-term reliability.",
        "Suitable for residential, commercial, and industrial rooftop solar projects."
      ],
      features: [
        { name: "Alloy Grade", val: "Aluminum 6005-T5 / 6063-T6", icon: <Scale size={16} /> },
        { name: "Validation", val: "Finite Element Analysis (FEA) & Pull-Out Test Certified", icon: <Compass size={16} /> },
        { name: "Corrosion Test", val: "Salt Spray Test Verified for Coastal & High Humidity Environments", icon: <Shield size={16} /> },
        { name: "Roof Types", val: "Metal Sheet Roofs, Standing Seam Roofs & Klip-Lok Roofs", icon: <Settings size={16} /> },
        { name: "Bifacial Option", val: "150 mm module clearance option to enhance bifacial energy generation", icon: <Hammer size={16} /> }
      ]
    },
    "Hot Dip Galvanized Structures": {
      title: "Hot Dip Galvanized Structures",
      subTitle: "Superior Strength. Advanced Corrosion Protection.",
      desc: "Precision engineered with rigorous QA, optimized for quick installation and long service life.",
      material: "High-Quality Hot Rolled (HR) Steel Sourced from Leading Certified Mills",
      thickness: "Hot Dip Galvanized Coating 80-120 Microns",
      windSpeed: "Design Life Exceeding 25 Years (IS 2062 & ASTM Compliant)",
      tiltAngle: "Customizable to Project-Specific Wind Speeds & Terrain",
      standards: [
        "Manufactured using high-quality Hot Rolled (HR) steel sourced from leading certified steel manufacturers.",
        "High tensile strength steel ensures superior load-bearing capacity and structural integrity.",
        "Optimized yield strength for enhanced durability under wind, seismic, and dynamic loading conditions.",
        "Hot Dip Galvanized coating available up to 80–120 microns (or as project specified) for long-term corrosion protection.",
        "Designed and manufactured in compliance with IS 2062, ASTM, and international structural steel standards.",
        "Galvanization process carried out in accordance with IS 4759, ASTM A123, and relevant global HDG standards.",
        "Engineered for a design life exceeding 25 years in diverse environmental conditions.",
        "Excellent resistance against corrosion, moisture, UV exposure, and harsh weather conditions.",
        "Precision-engineered structures validated for strength, stability, and long-term reliability.",
        "Ideal for PM Surya Ghar residential rooftop solar projects with RCC roof mounting solutions.",
        "Suitable for residential, commercial, and industrial rooftop solar installations.",
        "Proven structural solutions for utility-scale and ground-mounted solar power projects.",
        "Customizable designs to meet project-specific wind speeds, terrain conditions, and site requirements.",
        "Fast installation, low maintenance, and cost-effective lifecycle performance.",
        "Trusted structural solution for large-scale renewable energy and solar EPC projects."
      ],
      features: [
        { name: "Steel Standard", val: "High-Quality Hot Rolled (HR) Steel (IS 2062 & ASTM compliant)", icon: <Scale size={16} /> },
        { name: "HDG Coating", val: "Hot Dip Galvanized 80–120 Microns (IS 4759 & ASTM A123 verified)", icon: <Shield size={16} /> },
        { name: "Design Lifespan", val: "Exceeding 25 Years in Harsh Environments", icon: <Compass size={16} /> },
        { name: "Applications", val: "PM Surya Ghar Rooftop, C&I, and Utility Ground Solar Projects", icon: <Settings size={16} /> },
        { name: "Performance", val: "Fast Installation & Cost-Effective Lifecycle Performance", icon: <Hammer size={16} /> }
      ]
    },
    "FRP Walkway": {
      title: "FRP Walkway",
      subTitle: "Safe High-Strength Rooftop Pathways",
      desc: "Precision engineered with rigorous QA, optimized for quick installation and long service life.",
      material: "Fiber Reinforced Polymer (FRP) (Isophthalic / Vinyl Ester / Polyester Resin)",
      thickness: "272 mm & 310 mm Widths (Mesh size 38 x 38 mm)",
      windSpeed: "Non-Conductive, Anti-Slip Rexine Surface",
      tiltAngle: "Standard Panel Lengths up to 3.66 Meters",
      standards: [
        "Manufactured using premium-grade Fiber Reinforced Polymer (FRP) materials for superior strength and durability.",
        "High-quality resin system (Isophthalic / Vinyl Ester / Polyester Grade) tailored for demanding outdoor environments.",
        "Anti-slip rexine-pattern surface finish for enhanced safety and secure footing during maintenance activities.",
        "Glass fiber content optimized up to 30–35% for exceptional structural performance and load-bearing capability.",
        "UV-protected formulation designed to withstand prolonged exposure to sunlight without degradation.",
        "Available walkway widths of 272 mm and 310 mm to accommodate diverse project requirements.",
        "Precision-engineered mesh size of 38 × 38 mm for excellent drainage, ventilation, and slip resistance.",
        "Standard panel lengths up to 3.66 meters for efficient installation and reduced site joints.",
        "Heavy-duty rib thickness engineered for superior strength and long-term structural stability.",
        "Corrosion-resistant construction ideal for coastal, industrial, and high-humidity environments.",
        "Non-conductive and non-magnetic material enhances electrical safety in solar installations.",
        "Lightweight design enables easy handling, transportation, and rapid installation.",
        "Maintenance-free solution with no rusting, painting, or periodic surface treatment requirements.",
        "Excellent resistance to chemicals, moisture, salts, and harsh environmental conditions.",
        "Designed specifically for solar rooftop projects, utility-scale solar parks, and industrial solar facilities.",
        "Integrated FRP handrail systems provide enhanced worker safety and compliance with industry standards.",
        "Long service life with superior weather resistance and low lifecycle costs."
      ],
      features: [
        { name: "Material Grade", val: "Fiber Reinforced Polymer (FRP) (Glass Fiber 30-35%)", icon: <Scale size={16} /> },
        { name: "Safety Surface", val: "Anti-slip rexine-pattern finish for secure footing", icon: <Shield size={16} /> },
        { name: "Walkway Widths", val: "272 mm & 310 mm (38 x 38 mm mesh size)", icon: <Compass size={16} /> },
        { name: "Panel Length", val: "Standard Panel Lengths up to 3.66 meters", icon: <Settings size={16} /> },
        { name: "Safety Options", val: "Non-conductive, Non-magnetic & Integrated FRP Handrail systems", icon: <Hammer size={16} /> }
      ]
    },
    "FRP Handrails": {
      title: "FRP Handrails",
      subTitle: "Durable Industrial Guarding Systems",
      desc: "Precision engineered with rigorous QA, optimized for quick installation and long service life.",
      material: "Fiber Reinforced Polymer (FRP) (Isophthalic / Vinyl Ester Resin)",
      thickness: "High Glass Fiber Reinforcement Pultruded Profiles",
      windSpeed: "Non-Conductive, Non-Magnetic & UV-Stabilized",
      tiltAngle: "Customizable Heights, Spans & Modular Configurations",
      standards: [
        "Manufactured using premium-grade Fiber Reinforced Polymer (FRP) materials for exceptional durability and strength.",
        "Engineered with high-quality Isophthalic / Vinyl Ester resin systems for superior environmental resistance.",
        "High glass fiber reinforcement content ensures excellent structural integrity and load-bearing performance.",
        "UV-stabilized formulation protects against prolonged sun exposure and outdoor weathering.",
        "Corrosion-resistant construction ideal for coastal, industrial, chemical, and high-humidity environments.",
        "Non-conductive and non-magnetic material enhances safety around electrical equipment and solar installations.",
        "Lightweight design enables faster installation and reduced structural loading.",
        "High strength-to-weight ratio delivers superior performance compared to conventional steel handrails.",
        "Maintenance-free solution requiring no painting, galvanizing, or rust treatment.",
        "Resistant to chemicals, salts, moisture, and harsh environmental conditions.",
        "Available in customizable heights, spans, and configurations to suit project requirements.",
        "Designed for rooftop solar plants, utility-scale solar parks, industrial facilities, and commercial infrastructure.",
        "Smooth finish with safety-compliant edge protection for enhanced worker safety.",
        "Modular design allows easy transportation, assembly, and future expansion.",
        "Long service life with minimal lifecycle maintenance costs.",
        "Engineered to comply with industry safety and access standards.",
        "Compatible with FRP walkways, access platforms, maintenance pathways, and rooftop safety systems.",
        "Provides secure fall protection and safe maintenance access across solar installations."
      ],
      features: [
        { name: "Material Grade", val: "Premium Fiber Reinforced Polymer (FRP) (Isophthalic / Vinyl Ester)", icon: <Scale size={16} /> },
        { name: "Guarding System", val: "Durable Industrial Guarding & Secure Fall Protection", icon: <Shield size={16} /> },
        { name: "Safety Standards", val: "Non-conductive, Non-magnetic & Edge Protection compliant", icon: <Compass size={16} /> },
        { name: "Configurations", val: "Customizable Heights, Spans & Modular Configurations", icon: <Settings size={16} /> },
        { name: "Compatibility", val: "Compatible with FRP walkways, platforms & rooftop safety systems", icon: <Hammer size={16} /> }
      ]
    },
    "PM Surya Ghar Kit": {
      title: "PM Surya Ghar Kit",
      subTitle: "Standardized Rooftop BOS Kits for Residential Solar",
      desc: "VRMS-MAX Solar BOS Kit for PM Surya Ghar Projects: Pre-packaged, MNRE-compliant Balance of System (BOS) kits designed for fast, hassle-free installation on residential rooftops under the PM Surya Ghar scheme.",
      material: "All-In-One VRMS-MAX PACK Consolidated Components",
      thickness: "MNRE-Compliant Standardized Components",
      windSpeed: "Pre-Engineered & Quality-Tested",
      tiltAngle: "Consolidated Nationwide Logistics",
      standards: [
        "Complete Balance of System (BOS) solution delivered in a single installation-ready package.",
        "Includes solar panels, inverter, mounting structure, ACDB, DCDB, solar cables, MC4 connectors, earthing kit, lightning arrester, PVC cable tray, and essential accessories.",
        "Designed specifically for PM Surya Ghar Rooftop Solar Projects and residential solar installations.",
        "Single-source procurement simplifies project planning and reduces vendor management efforts.",
        "Pre-engineered kit ensures seamless component compatibility and faster project execution.",
        "Reduces procurement lead times and accelerates installation schedules.",
        "Available in multiple system capacities to suit diverse residential rooftop requirements.",
        "Premium-quality components sourced from trusted and industry-leading manufacturers.",
        "Optimized for subsidy-compliant PM Surya Ghar installations.",
        "Reliable supply chain support ensuring timely delivery across India.",
        "Customized BOS configurations available based on project specifications and customer requirements.",
        "Suitable for solar installers, EPC companies, channel partners, dealers, and bulk procurement teams.",
        "Reduces inventory management complexity through consolidated packaging.",
        "Comprehensive documentation and technical support for smooth installation.",
        "High-quality solar mounting structures engineered for long-term performance and durability.",
        "Quality-tested electrical components ensuring enhanced system safety and reliability.",
        "Bulk order support available for residential solar programs, government projects, and large-scale deployments.",
        "Cost-effective solution designed to maximize project efficiency and profitability.",
        "Nationwide logistics and delivery support for hassle-free project execution.",
        "Backed by VRM's expertise in solar structures, BOS solutions, and renewable energy infrastructure."
      ],
      features: [
        { name: "Project Target", val: "PM Surya Ghar Rooftop Solar Projects & Residential Solar", icon: <Scale size={16} /> },
        { name: "Included Items", val: "Panels, Inverter, MMS, ACDB/DCDB, Cables, Earthing, Cable Tray & Accessories", icon: <Shield size={16} /> },
        { name: "Compliance", val: "MNRE-Compliant & Subsidy-Compliant PM Surya Ghar Installations", icon: <Compass size={16} /> },
        { name: "Supply Chain", val: "Consolidated Packaging & Nationwide Logistics Support across India", icon: <Settings size={16} /> },
        { name: "Procurement", val: "Single-source procurement for EPCs, Installers & Bulk Buyers", icon: <Hammer size={16} /> }
      ]
    },
    "BOS Kit": {
      title: "PM Surya Ghar Kit",
      subTitle: "Standardized Rooftop BOS Kits for Residential Solar",
      desc: "VRMS-MAX Solar BOS Kit for PM Surya Ghar Projects: Pre-packaged, MNRE-compliant Balance of System (BOS) kits designed for fast, hassle-free installation on residential rooftops under the PM Surya Ghar scheme.",
      material: "All-In-One VRMS-MAX PACK Consolidated Components",
      thickness: "MNRE-Compliant Standardized Components",
      windSpeed: "Pre-Engineered & Quality-Tested",
      tiltAngle: "Consolidated Nationwide Logistics",
      standards: [
        "Complete Balance of System (BOS) solution delivered in a single installation-ready package.",
        "Includes solar panels, inverter, mounting structure, ACDB, DCDB, solar cables, MC4 connectors, earthing kit, lightning arrester, PVC cable tray, and essential accessories.",
        "Designed specifically for PM Surya Ghar Rooftop Solar Projects and residential solar installations.",
        "Single-source procurement simplifies project planning and reduces vendor management efforts.",
        "Pre-engineered kit ensures seamless component compatibility and faster project execution.",
        "Reduces procurement lead times and accelerates installation schedules.",
        "Available in multiple system capacities to suit diverse residential rooftop requirements.",
        "Premium-quality components sourced from trusted and industry-leading manufacturers.",
        "Optimized for subsidy-compliant PM Surya Ghar installations.",
        "Reliable supply chain support ensuring timely delivery across India.",
        "Customized BOS configurations available based on project specifications and customer requirements.",
        "Suitable for solar installers, EPC companies, channel partners, dealers, and bulk procurement teams.",
        "Reduces inventory management complexity through consolidated packaging.",
        "Comprehensive documentation and technical support for smooth installation.",
        "High-quality solar mounting structures engineered for long-term performance and durability.",
        "Quality-tested electrical components ensuring enhanced system safety and reliability.",
        "Bulk order support available for residential solar programs, government projects, and large-scale deployments.",
        "Cost-effective solution designed to maximize project efficiency and profitability.",
        "Nationwide logistics and delivery support for hassle-free project execution.",
        "Backed by VRM's expertise in solar structures, BOS solutions, and renewable energy infrastructure."
      ],
      features: [
        { name: "Project Target", val: "PM Surya Ghar Rooftop Solar Projects & Residential Solar", icon: <Scale size={16} /> },
        { name: "Included Items", val: "Panels, Inverter, MMS, ACDB/DCDB, Cables, Earthing, Cable Tray & Accessories", icon: <Shield size={16} /> },
        { name: "Compliance", val: "MNRE-Compliant & Subsidy-Compliant PM Surya Ghar Installations", icon: <Compass size={16} /> },
        { name: "Supply Chain", val: "Consolidated Packaging & Nationwide Logistics Support across India", icon: <Settings size={16} /> },
        { name: "Procurement", val: "Single-source procurement for EPCs, Installers & Bulk Buyers", icon: <Hammer size={16} /> }
      ]
    },
    "Terrabond Earthing Kit": {
      title: "Terrabond Earthing Kit",
      subTitle: "Terrabond Electrical Grounding Protection",
      desc: "Comprehensive Terrabond solar electrical grounding solutions, including copper-bonded earth rods, grounding clamps, chemical compound fill, and lightning arrestor connectors.",
      material: "Copper-Bonded Steel & Heavy-Duty Cast Brass",
      thickness: "14.2mm / 17.2mm rod diameters",
      windSpeed: "N/A",
      tiltAngle: "Vertical earth-pit insertion",
      seoTitle: "Terrabond Solar Earthing Kit Manufacturer | VRM Structures",
      seoDescription: "Certified Terrabond solar plant earthing kits ensuring electrical safety and compliance for rooftop and ground-mount installations.",
      standards: [
        "IS 3043 code of practice for solar earthing kit compliance & plant electrical safety",
        "IEC 62561-2 standard for lightning arrestor grounding and protection components",
        "Molecularly bonded copper coating on copper bonded earth rod with minimum 250 microns",
        "High-tensile steel core core-bonded with 99.9% pure electrolytic copper for solar plant electrical grounding",
        "Rod diameters available in 14.2mm and 17.2mm to match diverse chemical earth pit profiles",
        "Designed to achieve low electrical resistance path (< 1 Ohm) for rooftop solar earthing systems",
        "Heavy-duty cast brass grounding clamps (U-bolt style) ensuring secure, corrosion-proof connection",
        "High fault current carrying capacity preventing thermal or mechanical grounding breakdown",
        "Premium eco-friendly earth enhancement compound backfill to lower soil resistivity",
        "Durable, maintenance-free grounding service life exceeding 15+ years in harsh soil environments"
      ],
      features: [
        { name: "Material Grade", val: "Copper coating minimum 250 microns", icon: <Scale size={16} /> },
        { name: "Wind Rating", val: "Solid structural build for long service life", icon: <Compass size={16} /> },
        { name: "Corrosion Grade", val: "Excellent soil-corrosion resistance", icon: <Shield size={16} /> },
        { name: "Fasteners", val: "Heavy-duty brass U-bolt clamps", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Soil boring and chemical compound fill", icon: <Hammer size={16} /> }
      ]
    },
    "Earthing Kit": {
      title: "Terrabond Earthing Kit",
      subTitle: "Terrabond Electrical Grounding Protection",
      desc: "Comprehensive Terrabond solar electrical grounding solutions, including copper-bonded earth rods, grounding clamps, chemical compound fill, and lightning arrestor connectors.",
      material: "Copper-Bonded Steel & Heavy-Duty Cast Brass",
      thickness: "14.2mm / 17.2mm rod diameters",
      windSpeed: "N/A",
      tiltAngle: "Vertical earth-pit insertion",
      seoTitle: "Terrabond Solar Earthing Kit Manufacturer | VRM Structures",
      seoDescription: "Certified Terrabond solar plant earthing kits ensuring electrical safety and compliance for rooftop and ground-mount installations.",
      standards: [
        "IS 3043 code of practice for solar earthing kit compliance & plant electrical safety",
        "IEC 62561-2 standard for lightning arrestor grounding and protection components",
        "Molecularly bonded copper coating on copper bonded earth rod with minimum 250 microns",
        "High-tensile steel core core-bonded with 99.9% pure electrolytic copper for solar plant electrical grounding",
        "Rod diameters available in 14.2mm and 17.2mm to match diverse chemical earth pit profiles",
        "Designed to achieve low electrical resistance path (< 1 Ohm) for rooftop solar earthing systems",
        "Heavy-duty cast brass grounding clamps (U-bolt style) ensuring secure, corrosion-proof connection",
        "High fault current carrying capacity preventing thermal or mechanical grounding breakdown",
        "Premium eco-friendly earth enhancement compound backfill to lower soil resistivity",
        "Durable, maintenance-free grounding service life exceeding 15+ years in harsh soil environments"
      ],
      features: [
        { name: "Material Grade", val: "Copper coating minimum 250 microns", icon: <Scale size={16} /> },
        { name: "Wind Rating", val: "Solid structural build for long service life", icon: <Compass size={16} /> },
        { name: "Corrosion Grade", val: "Excellent soil-corrosion resistance", icon: <Shield size={16} /> },
        { name: "Fasteners", val: "Heavy-duty brass U-bolt clamps", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Soil boring and chemical compound fill", icon: <Hammer size={16} /> }
      ]
    },
    "Inverters (Polycab & Deye)": {
      title: "Inverters (Polycab & Deye)",
      subTitle: "Polycab & Deye Power Conversion",
      desc: "High-efficiency Polycab grid-tied string inverters & top-tier Deye hybrid storage inverters with intelligent MPPT tracking, smart load management, and IP65 protection.",
      material: "Polycab & Deye OEM Enclosure",
      thickness: "3kW - 100kW",
      windSpeed: "N/A",
      tiltAngle: "Wall-mount vertical alignment",
      seoTitle: "Solar Inverters – Polycab & Deye Supplier | VRM Structures",
      seoDescription: "Authorized supply of Polycab and Deye grid-tied solar inverters for residential, commercial, and utility-scale projects in India.",
      standards: [
        "Polycab grid-tied solar inverter models with dual MPPT trackers to optimize solar power harvest",
        "Polycab string inverter options built with wide input voltage range for commercial solar rooftop installations",
        "High 98.6% conversion efficiency on Polycab systems for maximum on-grid solar power system yields",
        "Polycab on-grid units equipped with built-in DC switches, Class II SPDs, and anti-islanding safety compliance",
        "IP65 weather-proof dust protection chassis housing Polycab string inverters for outdoor durability",
        "Smart fan-forced active cooling system on Polycab units to prevent thermal derating under Indian summer peaks",
        "Integrated Polycab LCD screens with GPRS/Wi-Fi cloud data stick logs for remote solar generation tracking",
        "Polycab products certified for BIS, IEC 62109, and net-metering approvals across all state electricity boards",
        "Polycab low harmonic distortion (< 3%) ensuring safe, clean utility power injection to commercial grids",
        "Polycab manufacturer warranty support with dedicated local service network for solar EPC partners",
        "Deye hybrid storage inverter systems featuring low-voltage 48V battery bank links for solar battery backup",
        "Seamless paralleling support of up to 16 Deye units to handle commercial energy storage requirements",
        "Ultra-fast under-4ms grid-to-battery transfer time on Deye hybrid units for critical UPS backup power",
        "Deye smart load management supporting direct diesel generator links and auxiliary peak-shaving settings",
        "Deye hybrid solar inverter options with dual/triple MPPT inputs to handle varied rooftop shadow profiles",
        "Wide compatibility on Deye units for standard lithium-ion and lead-acid off-grid solar battery backup packs",
        "Intelligent color touchscreen control panels on Deye inverters for dynamic battery charging setup",
        "High-reliability Deye IP65 dust-proof enclosure designed for natural convection cooling and silent operations",
        "Built-in Deye zero-export limitation features for non-net-metered rooftop solar setups",
        "Deye certification compliance with global grid standards including IEC 62109, EN 50549, and IEEE 1547"
      ],
      features: [
        { name: "Brand Sourcing", val: "Official Polycab & Deye Authorized Units", icon: <Scale size={16} /> },
        { name: "Efficiency Rating", val: "Up to 98.6% Conversion Efficiency", icon: <Compass size={16} /> },
        { name: "Protection Grade", val: "IP65 Weatherproof & Outdoor Rated", icon: <Shield size={16} /> },
        { name: "Monitoring", val: "Touchscreen LCD & Wi-Fi Cloud Monitoring", icon: <Settings size={16} /> },
        { name: "Installation type", val: "Wall bracket mounting with battery link", icon: <Hammer size={16} /> }
      ]
    },
    "Solar Panels (Tier-1 PV Modules)": {
      title: "Solar Panels (Tier-1 PV Modules)",
      subTitle: "Tier-1 Bifacial Dual-Glass Modules",
      desc: "High-efficiency N-Type TOPCon and Heterojunction (HJT) dual-glass bifacial solar modules (550Wp to 730Wp) engineered for maximum energy yield, exceptional low-light response, and 30-year lifecycle performance.",
      material: "Dual-Glass / N-Type TOPCon & HJT",
      thickness: "550Wp - 730Wp",
      windSpeed: "2400 Pa Wind / 5400 Pa Snow Load",
      tiltAngle: "Rooftop, Ground-Mount & Tracker Compatible",
      seoTitle: "Tier-1 Solar Panels & Bifacial PV Modules | VRM Structures",
      seoDescription: "High-efficiency 550Wp to 730Wp bifacial solar panels and PV modules for utility, commercial, and rooftop solar installations in India.",
      standards: [
        "Certified Tier-1 dual-glass bifacial monocrystalline solar PV modules (550Wp to 730Wp ratings)",
        "Advanced N-Type TOPCon and Heterojunction (HJT) cell technology delivering module efficiency up to 23.5%",
        "Bifacial power generation factor of up to 80±5% yielding 10%–30% additional backside solar energy harvest",
        "High mechanical resilience certified for 5400 Pa front snow/gravity load and 2400 Pa rear wind uplift",
        "Superior temperature coefficient (-0.26%/°C to -0.30%/°C) minimizing power loss under extreme Indian summer heat",
        "Certified resistance against Potential Induced Degradation (Anti-PID), salt mist, ammonia, and sand abrasion",
        "IP68 rated split junction boxes with bypass diodes and MC4-compatible 1500V DC connectors",
        "High-transmittance anti-reflective coated dual tempered glass (2.0mm + 2.0mm or 3.2mm) with anodized aluminum alloy frame",
        "Guaranteed 30-year linear power warranty with ultra-low first-year degradation (< 1.0%) and annual degradation (< 0.4%)",
        "Compliance with international safety and quality standards including IEC 61215, IEC 61730, and BIS / ALMM approvals"
      ],
      features: [
        { name: "Power Output", val: "550Wp to 730Wp Tier-1 Modules", icon: <Scale size={16} /> },
        { name: "Module Efficiency", val: "Up to 23.5% Peak Efficiency", icon: <Compass size={16} /> },
        { name: "Load Capacity", val: "5400 Pa Snow / 2400 Pa Wind Load", icon: <Shield size={16} /> },
        { name: "Cell Technology", val: "N-Type TOPCon & HJT Dual-Glass", icon: <Settings size={16} /> },
        { name: "Warranty", val: "12-Yr Product / 30-Yr Linear Performance", icon: <Hammer size={16} /> }
      ]
    },
    "Solar Panels": {
      title: "Solar Panels",
      subTitle: "Tier-1 Bifacial Dual-Glass Modules",
      desc: "High-efficiency N-Type TOPCon and Heterojunction (HJT) dual-glass bifacial solar modules (550Wp to 730Wp) engineered for maximum energy yield, exceptional low-light response, and 30-year lifecycle performance.",
      material: "Dual-Glass / N-Type TOPCon & HJT",
      thickness: "550Wp - 730Wp",
      windSpeed: "2400 Pa Wind / 5400 Pa Snow Load",
      tiltAngle: "Rooftop, Ground-Mount & Tracker Compatible",
      seoTitle: "Tier-1 Solar Panels & Bifacial PV Modules | VRM Structures",
      seoDescription: "High-efficiency 550Wp to 730Wp bifacial solar panels and PV modules for utility, commercial, and rooftop solar installations in India.",
      standards: [
        "Certified Tier-1 dual-glass bifacial monocrystalline solar PV modules (550Wp to 730Wp ratings)",
        "Advanced N-Type TOPCon and Heterojunction (HJT) cell technology delivering module efficiency up to 23.5%",
        "Bifacial power generation factor of up to 80±5% yielding 10%–30% additional backside solar energy harvest",
        "High mechanical resilience certified for 5400 Pa front snow/gravity load and 2400 Pa rear wind uplift",
        "Superior temperature coefficient (-0.26%/°C to -0.30%/°C) minimizing power loss under extreme Indian summer heat",
        "Certified resistance against Potential Induced Degradation (Anti-PID), salt mist, ammonia, and sand abrasion",
        "IP68 rated split junction boxes with bypass diodes and MC4-compatible 1500V DC connectors",
        "High-transmittance anti-reflective coated dual tempered glass (2.0mm + 2.0mm or 3.2mm) with anodized aluminum alloy frame",
        "Guaranteed 30-year linear power warranty with ultra-low first-year degradation (< 1.0%) and annual degradation (< 0.4%)",
        "Compliance with international safety and quality standards including IEC 61215, IEC 61730, and BIS / ALMM approvals"
      ],
      features: [
        { name: "Power Output", val: "550Wp to 730Wp Tier-1 Modules", icon: <Scale size={16} /> },
        { name: "Module Efficiency", val: "Up to 23.5% Peak Efficiency", icon: <Compass size={16} /> },
        { name: "Load Capacity", val: "5400 Pa Snow / 2400 Pa Wind Load", icon: <Shield size={16} /> },
        { name: "Cell Technology", val: "N-Type TOPCon & HJT Dual-Glass", icon: <Settings size={16} /> },
        { name: "Warranty", val: "12-Yr Product / 30-Yr Linear Performance", icon: <Hammer size={16} /> }
      ]
    }
  };

  // Smart lookup to find product by key or normalized name
  const normalizedSearch = selectedProductTitle?.trim().toLowerCase() || "";
  const matchedEntry = Object.entries(productDetailsMap).find(([key]) => {
    const k = key.toLowerCase();
    if (k === normalizedSearch) return true;
    const cleanK = k.replace(/structures?/g, 'structure').replace(/\s+/g, ' ');
    const cleanSearch = normalizedSearch.replace(/structures?/g, 'structure').replace(/\s+/g, ' ');
    if (cleanK === cleanSearch) return true;
    if (cleanSearch.includes("aluminum") && cleanK.includes("aluminum")) return true;
    return false;
  });

  const productDetails = matchedEntry ? matchedEntry[1] : ((productDetailsMap as any)[selectedProductTitle] || (productDetailsMap as any)["Aluminum Module Mounting Structure"] || productDetailsMap["RCC Roof MMS"]);
  const currentSlug = selectedProductTitle?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || "aluminum-module-mounting-structure";

  return (
    <div className="bg-[#F5F1EE] overflow-x-hidden font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 flex flex-col min-h-screen">
      <SEO
        title={productDetails.seoTitle || `${productDetails.title} Manufacturer | VRM Structures`}
        description={productDetails.seoDescription || productDetails.desc}
        canonicalUrl={`https://vrmstructures.in/products/${currentSlug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productDetails.title,
          "description": productDetails.seoDescription || productDetails.desc,
          "brand": {
            "@type": "Brand",
            "name": "VRM Structures"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "VRM Structures India Private Limited"
          }
        }}
      />

      {/* HERO SECTION - EXACT PLACEMENT MATCHING OTHER PAGES */}
      <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-20">
        
        {/* PHOTOGRAPHIC HERO BACKGROUND */}
        <HeroImageBackground src="/images/hero-products.jpg" alt={`${productDetails.title} VRM Structures`} />

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] font-bold tracking-tight text-white max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            {productDetails.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-slate-100 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] max-w-3xl mt-4 font-light px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Discover the engineering specifications, design compliances, and structural drawings for our industrial {productDetails.title} mounting solutions.
          </motion.p>
        </div>

        {/* Scroll down button pinned cleanly at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <ScrollDownButton targetId="product-details-content" />
        </div>
      </div>

      {/* DYNAMIC DETAILS SECTION CONTENT */}
      <div className="bg-white relative z-10 w-full border-t border-slate-200/50 pt-20 pb-32" id="product-details-content">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            <div className="lg:col-span-7 flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-3 shadow-sm h-[350px] sm:h-[480px]">
              <div className="relative w-full h-full flex-1 bg-[#1e293b] rounded-[1.75rem] overflow-hidden flex items-center justify-center">
                {selectedProductTitle.toLowerCase().includes("panel") ? (
                  <img 
                    src="/solar_panels_modules.png" 
                    alt={productDetails.title} 
                    className="w-full h-full object-cover rounded-[1.75rem]" 
                  />
                ) : selectedProductTitle.toLowerCase().includes("surya") || selectedProductTitle.toLowerCase().includes("bos") ? (
                  <img 
                    src="/vrms_bos_kit.jpg" 
                    alt={productDetails.title} 
                    className="w-full h-full object-contain bg-white rounded-[1.75rem]" 
                  />
                ) : selectedProductTitle.toLowerCase().includes("terrabond") || selectedProductTitle.toLowerCase().includes("earthing") ? (
                  <img 
                    src="/vrm_earthing_kit_fit.png" 
                    alt={productDetails.title} 
                    className="w-full h-full object-cover rounded-[1.75rem]" 
                  />
                ) : selectedProductTitle.toLowerCase().includes("polycab") || selectedProductTitle.toLowerCase().includes("deye") || selectedProductTitle.toLowerCase().includes("inverter") ? (
                  <img 
                    src="/polycab_deye_inverters.png" 
                    alt={productDetails.title} 
                    className="w-full h-full object-cover rounded-[1.75rem]" 
                  />
                ) : selectedProductTitle.toLowerCase().includes("pump") ? (
                  <img 
                    src="/solar_pump_mms.jpg" 
                    alt={productDetails.title} 
                    className="w-full h-full object-cover rounded-[1.75rem]" 
                  />
                ) : selectedProductTitle.toLowerCase().includes("galvanized") ? (
                  <RCCRoof3DViewer url="/RCC.bin" />
                ) : selectedProductTitle.toLowerCase().includes("rcc") ? (
                  <RCCRoof3DViewer url="/RCC_Design.bin" />
                ) : selectedProductTitle.toLowerCase().includes("ground mounted") ? (
                  <RCCRoof3DViewer url="/Ground_Mounted.bin" />
                ) : selectedProductTitle.toLowerCase().includes("carport") ? (
                  <RCCRoof3DViewer url="/Carport_Design.bin" zoom={0.8} />
                ) : selectedProductTitle.toLowerCase().includes("customized") ? (
                  <RCCRoof3DViewer url="/Customized.bin" />
                ) : selectedProductTitle.toLowerCase().includes("aluminum") ? (
                  <RCCRoof3DViewer url="/Aluminum.bin" zoom={0.8} />
                ) : selectedProductTitle.toLowerCase().includes("handrail") ? (
                  <RCCRoof3DViewer url="/Handrail.bin" zoom={1.2} />
                ) : selectedProductTitle.toLowerCase().includes("walkway") ? (
                  <RCCRoof3DViewer url="/WALK_WAY.bin" zoom={1.2} />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src="/vrm-factory-building.jpg" 
                      alt={productDetails.title} 
                      className="w-full h-full object-cover rounded-[1.75rem]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent rounded-[1.75rem]" />
                    <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg select-none pointer-events-none z-10 flex items-center gap-2">
                      <span className="text-[10.5px] font-bold tracking-wider text-white uppercase">
                        Manufacturing Facility • {productDetails.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Spec Sheet (Clean Premium Card) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">

              <div>
                {/* Title Header */}
                <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 via-blue-500 to-blue-600 animate-gradient-shift shadow-[0_4px_12px_rgba(99,102,241,0.1)] mb-4">
                  <div className="inline-flex items-center justify-center bg-white px-3.5 py-1 rounded-full">
                    <span className="text-[9.5px] font-bold tracking-[0.15em] text-black uppercase">
                      {productDetails.subTitle}
                    </span>
                  </div>
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-950 tracking-tight leading-none">
                  Overview
                </h2>
                <p className="text-slate-500 font-light text-[13.5px] leading-relaxed mt-4">
                  {productDetails.desc}
                </p>
              </div>

              {/* Spec Attributes List */}
              <div className="my-8 flex flex-col gap-4">
                {productDetails.features.map((feat) => (
                  <div key={feat.name} className="flex items-center gap-3.5 pb-3 border-b border-slate-100 last:border-b-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/50 flex items-center justify-center text-indigo-600">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{feat.name}</h4>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{feat.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA action button */}
              <button
                onClick={() => onNavigate("quote")}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl text-[12px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                Request Engineering Drawing & Quote
              </button>
            </div>

          </div>

          {/* TECHNICAL DATASHEET SECTION */}
          <div className="mt-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-6">
              Key Technical & Design Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
              {productDetails.standards && productDetails.standards.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/80">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TIER-1 BRAND COMPATIBILITY & OFFICIAL LOGOS (FOR SOLAR PANELS) */}
          {selectedProductTitle.toLowerCase().includes("panel") && (
            <div className="mt-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      Authorized & Compatible Tier-1 Modules
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                      ALMM / BIS Approved
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    Supported Solar Panel Brands
                  </h3>
                  <p className="text-slate-500 text-xs font-light mt-1">
                    Pre-engineered structural mounting compatibility, direct OEM distribution, and warranty certification for India's leading manufacturers.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("quote")}
                  className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 shrink-0 shadow-xs"
                >
                  Inquire Bulk Pricing
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* 5 Brand Logo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {[
                  {
                    name: "Waaree Energies",
                    tag: "Tier-1 ALMM List-I",
                    desc: "Aditya & Elite Dual-Glass (540Wp - 700Wp+)",
                    datasheet: "/datasheet-waaree-elite-n-type-bifacial-555W-560W-565W-570W-585W.pdf",
                    logo: (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <svg className="w-8 h-8 shrink-0" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="18" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
                            <circle cx="20" cy="20" r="7" fill="#F58220" />
                            <path d="M20 4V8M20 32V36M4 20H8M32 20H36M8.69 8.69L11.52 11.52M28.48 28.48L31.31 31.31M8.69 31.31L11.52 28.48M28.48 11.52L31.31 8.69" stroke="#006837" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <span className="font-display font-black text-xl tracking-wider text-[#006837]">
                            WAAREE
                          </span>
                        </div>
                        <span className="text-[8.5px] font-bold text-[#F58220] tracking-[0.2em] uppercase mt-0.5">
                          One with the Sun
                        </span>
                      </div>
                    )
                  },
                  {
                    name: "Loom Solar",
                    tag: "Official Channel Partner",
                    desc: "Shark Bifacial & TOPCon (550Wp - 625Wp+)",
                    datasheet: "/loom-solar-shark-n-type-topcon-620w-625w-datasheet.pdf",
                    logo: (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <svg className="w-8 h-8 shrink-0" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="10" fill="#0284C7" />
                            <path d="M12 10L28 20L12 30V10Z" fill="white" />
                            <circle cx="20" cy="20" r="4" fill="#F59E0B" />
                          </svg>
                          <span className="font-display font-black text-lg tracking-wider text-[#0F172A]">
                            LOOM <span className="text-[#0284C7]">SOLAR</span>
                          </span>
                        </div>
                        <span className="text-[8.5px] font-semibold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                          Shark Bi-Facial Series
                        </span>
                      </div>
                    )
                  },
                  {
                    name: "Adani Solar",
                    tag: "Tier-1 G-G Bifacial",
                    desc: "Glass-to-Glass & TOPCon 30mm (550Wp - 585Wp)",
                    datasheet: "/adani-topcon-30mm-framed-module-datasheet.pdf",
                    logo: (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <svg className="w-8 h-8 shrink-0" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
                            <path d="M10 24C14 16 26 14 30 22C26 28 14 30 10 24Z" fill="#003366" />
                            <circle cx="20" cy="18" r="5" fill="#00A86B" />
                            <path d="M16 26C18 22 22 22 24 26" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <span className="font-display font-black text-lg tracking-tight text-[#003366] lowercase">
                            adani <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block -mt-1">Solar</span>
                          </span>
                        </div>
                        <span className="text-[8.5px] font-semibold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                          Renewable Energy
                        </span>
                      </div>
                    )
                  },
                  {
                    name: "Vikram Solar",
                    tag: "Hypersol 144-Cell",
                    desc: "Hypersol M10R Half-Cut (580Wp - 605Wp)",
                    datasheet: "/vikram-hypersol-m10r-580-605w-144-cell-datasheet.pdf",
                    logo: (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <svg className="w-8 h-8 shrink-0" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="16" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
                            <circle cx="20" cy="20" r="8" fill="#EA580C" />
                            <path d="M20 7V10M20 30V33M7 20H10M30 20H33" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <div className="text-left leading-tight">
                            <span className="font-display font-black text-base tracking-wide text-[#EA580C] block">
                              VIKRAM
                            </span>
                            <span className="text-[9px] font-bold text-slate-700 tracking-[0.2em] block uppercase -mt-0.5">
                              SOLAR
                            </span>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-semibold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                          High Efficiency PV
                        </span>
                      </div>
                    )
                  },
                  {
                    name: "ReNew Power",
                    tag: "Mono PERC Utility",
                    desc: "M10 Mono PERC Bifacial Series (540Wp - 550Wp)",
                    datasheet: "/renew-power-m10-mono-perc-bifacial-datasheet.pdf",
                    logo: (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <svg className="w-8 h-8 shrink-0" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="10" fill="#F0FDF4" stroke="#BBF7D0" />
                            <path d="M20 10C15 15 15 25 20 30C25 25 25 15 20 10Z" fill="#16A34A" />
                            <circle cx="20" cy="20" r="3" fill="#0D9488" />
                          </svg>
                          <div className="text-left leading-tight">
                            <span className="font-display font-black text-xl tracking-tight text-[#16A34A] block">
                              Re<span className="text-slate-900">New</span>
                            </span>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-semibold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                          Clean Energy Power
                        </span>
                      </div>
                    )
                  }
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className="group bg-[#F8FAFC]/70 hover:bg-white border border-slate-200/80 hover:border-indigo-300 rounded-3xl p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center text-center hover:-translate-y-1"
                  >
                    <div className="w-full">
                      {/* Brand Logo Container */}
                      <div className="h-16 flex items-center justify-center mb-4 px-2">
                        {brand.logo}
                      </div>

                      {/* Tag */}
                      <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-white border border-slate-200/90 text-slate-700 shadow-2xs mb-2">
                        {brand.tag}
                      </div>

                      {/* Series Info */}
                      <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2 px-1">
                        {brand.desc}
                      </p>
                    </div>

                    {/* Datasheet Link */}
                    <div className="mt-4 pt-3 border-t border-slate-100/90 w-full">
                      <a
                        href={brand.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-950 text-slate-700 hover:text-white border border-slate-200 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:border-slate-950"
                      >
                        <FileText size={12} />
                        Datasheet
                        <ExternalLink size={10} className="opacity-60" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



        </div>
      </div>

    </div>
  );
}
