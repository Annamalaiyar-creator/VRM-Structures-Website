import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Product3DViewerProps {
  url: string;
  zoom?: number;
  autoRotate?: boolean;
  isHovered?: boolean;
}

export default function Product3DViewer({ url, zoom = 1.0, autoRotate = false, isHovered = false }: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isIntersectingRef = useRef(false);

  // Lazy load: Only initialize Three.js and download 3D model when near or in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.01
      }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate && !isHovered;
    }
  }, [isHovered, autoRotate]);

  useEffect(() => {
    if (!isInView) return;

    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 224;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(2.2, 1.3, 2.2);

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
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.autoRotate = autoRotate && !isHovered;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(12, 12, 12);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.0);
    dirLight2.position.set(-12, 8, -12);
    scene.add(dirLight2);

    const loader = new GLTFLoader();
    let loadedObj: THREE.Group | THREE.Object3D | null = null;

    loader.load(
      url,
      (gltf) => {
        const obj = gltf.scene;
        loadedObj = obj;
        const box = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const scaleFactor = (1.95 * zoom) / (maxDim || 1);
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

            const isSheet = name.includes("sheet") && (url.toLowerCase().includes("long_rail") || url.toLowerCase().includes("mini_rail"));

            if (isSheet) {
              child.material = new THREE.MeshPhongMaterial({
                color: new THREE.Color("#1e40af"), // Blue color for sheet
                specular: new THREE.Color("#111111"), // Matte specular highlight (remove white glare)
                shininess: 10,
                side: THREE.DoubleSide
              });
            } else if (name.includes("part1")) {
              child.material = new THREE.MeshPhongMaterial({
                color: new THREE.Color("#E2E8F0"), // White/gray for pillar
                specular: new THREE.Color("#FFFFFF"),
                shininess: 130,
                side: THREE.DoubleSide
              });
            } else if (isHandrail) {
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
      (err) => console.error("Error loading 3D GLB model:", err)
    );

    let animationFrameId: number;
    let isDisposed = false;

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);
      // Only render frame when visible in viewport to conserve GPU & CPU
      if (isIntersectingRef.current) {
        controls.update();
        renderer.render(scene, camera);
      }
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      controlsRef.current = null;
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
  }, [isInView, url, zoom]);

  return (
    <div className="w-full h-full relative group bg-transparent rounded-[2.2rem] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent text-slate-450 gap-2">
          <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
