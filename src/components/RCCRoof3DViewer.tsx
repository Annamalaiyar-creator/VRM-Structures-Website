import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

// High-performance GLTF/GLB 3D Canvas for RCC Roof MMS
export default function RCCRoof3DViewer({ url, zoom = 1.0 }: { url: string; zoom?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Set when WebGL can't start (old devices, locked-down PCs, crawlers); without it the page went blank.
  const [webglUnavailable, setWebglUnavailable] = useState(false);

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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (error) {
      console.warn("3D preview unavailable: WebGL could not be started.", error);
      setWebglUnavailable(true);
      setIsLoaded(true);
      return;
    }
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
      dracoLoader.dispose();
      try {
        renderer.forceContextLoss();
        renderer.dispose();
      } catch (e) {}
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (loadedObj) {
        loadedObj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else if (child.material) {
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
      {webglUnavailable && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xs font-light text-center px-4">
          3D preview is not supported on this device.
        </div>
      )}
      
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

