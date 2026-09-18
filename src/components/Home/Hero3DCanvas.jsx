import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero3DCanvas = () => {
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Full section canvas sizing
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Dynamic Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 30);
    blueLight.position.set(6, 6, 6);
    scene.add(blueLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 3.5, 30);
    emeraldLight.position.set(-6, -6, 6);
    scene.add(emeraldLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 25);
    purpleLight.position.set(0, 8, -4);
    scene.add(purpleLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 20);
    amberLight.position.set(5, -5, 2);
    scene.add(amberLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Glass Material Factory
    const createGlassMaterial = (colorHex) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorHex),
        metalness: 0.15,
        roughness: 0.12,
        transmission: 0.88,
        thickness: 1.4,
        transparent: true,
        opacity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.18,
      });
    };

    // Extended 3D Tech Data (React, Node, GitHub, Git, Next.js, MongoDB, Firebase, Express, Tailwind)
    const techItems = [
      {
        id: "react",
        name: "React.js",
        label: "Frontend UI Library",
        color: "#38bdf8",
        geo: new THREE.TorusGeometry(0.85, 0.32, 16, 80),
        pos: [-5.2, 2.8, 0],
        rotSpeed: { x: 0.012, y: 0.018 },
      },
      {
        id: "mongodb",
        name: "MongoDB",
        label: "NoSQL Document DB",
        color: "#10b981",
        geo: new THREE.OctahedronGeometry(1.0, 2),
        pos: [-4.2, -2.6, 1],
        rotSpeed: { x: 0.008, y: 0.012 },
      },
      {
        id: "express",
        name: "Express.js",
        label: "Node REST Server Framework",
        color: "#e5e7eb",
        geo: new THREE.IcosahedronGeometry(0.9, 1),
        pos: [-2.2, 3.2, -1],
        rotSpeed: { x: 0.01, y: 0.006 },
      },
      {
        id: "node",
        name: "Node.js",
        label: "Async JS Runtime",
        color: "#22c55e",
        geo: new THREE.DodecahedronGeometry(0.95, 0),
        pos: [1.8, 3.5, 0.5],
        rotSpeed: { x: 0.007, y: 0.014 },
      },
      {
        id: "next",
        name: "Next.js",
        label: "React Framework & SSR",
        color: "#f3f4f6",
        geo: new THREE.BoxGeometry(1.2, 1.2, 1.2),
        pos: [5.2, 2.5, -0.5],
        rotSpeed: { x: 0.009, y: 0.011 },
      },
      {
        id: "firebase",
        name: "Firebase",
        label: "BaaS & Realtime DB",
        color: "#f59e0b",
        geo: new THREE.ConeGeometry(0.9, 1.4, 16),
        pos: [4.8, -2.2, 1],
        rotSpeed: { x: 0.014, y: 0.01 },
      },
      {
        id: "github",
        name: "GitHub",
        label: "Version Control & CI/CD",
        color: "#a855f7",
        geo: new THREE.SphereGeometry(0.85, 24, 24),
        pos: [2.5, -3.2, -1],
        rotSpeed: { x: 0.011, y: 0.015 },
      },
      {
        id: "git",
        name: "Git",
        label: "Distributed VCS",
        color: "#ef4444",
        geo: new THREE.TetrahedronGeometry(1.0, 1),
        pos: [-1.2, -3.5, 0],
        rotSpeed: { x: 0.013, y: 0.009 },
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        label: "Utility-First Styling",
        color: "#06b6d4",
        geo: new THREE.TorusKnotGeometry(0.6, 0.2, 64, 16),
        pos: [0, 0, -2],
        rotSpeed: { x: 0.015, y: 0.012 },
      },
    ];

    const techMeshes = [];

    techItems.forEach((item) => {
      const mat = createGlassMaterial(item.color);
      const mesh = new THREE.Mesh(item.geo, mat);

      mesh.position.set(...item.pos);
      mesh.userData = {
        ...item,
        initialPos: [...item.pos],
        timeOffset: Math.random() * Math.PI * 2,
      };

      // Orbiting glowing ring
      const ringGeo = new THREE.TorusGeometry(1.3, 0.025, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(item.color),
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      mesh.add(ringMesh);

      mainGroup.add(mesh);
      techMeshes.push(mesh);
    });

    // Central Core MERN Sphere
    const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0.5, -3);
    mainGroup.add(coreMesh);

    // Wireframe Outer Orb
    const wireGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.position.set(0, 0.5, -3);
    mainGroup.add(wireMesh);

    // Mouse Tracking across full hero
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      targetMouse.x = mouse.x * 0.45;
      targetMouse.y = mouse.y * 0.45;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(techMeshes);

      if (intersects.length > 0) {
        setHoveredTech(intersects[0].object.userData);
        document.body.style.cursor = "pointer";
      } else {
        setHoveredTech(null);
        document.body.style.cursor = "default";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth full section group rotation based on mouse
      mainGroup.rotation.y += (targetMouse.x - mainGroup.rotation.y) * 0.035;
      mainGroup.rotation.x += (-targetMouse.y - mainGroup.rotation.x) * 0.035;

      // Floating sine wave animation for 3D tech icons
      techMeshes.forEach((mesh) => {
        const { rotSpeed, initialPos, timeOffset } = mesh.userData;
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;

        mesh.position.y = initialPos[1] + Math.sin(elapsed * 1.6 + timeOffset) * 0.25;
        mesh.position.x = initialPos[0] + Math.cos(elapsed * 1.2 + timeOffset) * 0.15;
      });

      // Core sphere rotation & pulse
      coreMesh.rotation.y += 0.012;
      wireMesh.rotation.y -= 0.006;
      wireMesh.rotation.z += 0.004;

      const scale = 1 + Math.sin(elapsed * 2) * 0.08;
      coreMesh.scale.setScalar(scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.style.cursor = "default";
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto z-0">
      {/* 3D WebGL Canvas filling the hero background */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Tech Tooltip Card */}
      {hoveredTech && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl animate-fadeIn pointer-events-none flex items-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full animate-ping"
            style={{ backgroundColor: hoveredTech.color }}
          />
          <div>
            <div className="text-xs font-black text-white tracking-wide">
              {hoveredTech.name}
            </div>
            <div className="text-[11px] text-gray-300 font-medium">
              {hoveredTech.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero3DCanvas;
