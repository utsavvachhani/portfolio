import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Small, optional WebGL ornament. The hero portrait and styling remain visible without WebGL.
export default function Hero3DCanvas() {
  const holder = useRef(null);

  useEffect(() => {
    const target = holder.current;
    if (!target || !window.matchMedia('(min-width: 769px) and (prefers-reduced-motion: no-preference)').matches) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return; // WebGL blocked or unavailable: CSS artwork still works.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    target.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 9;
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(2.1, 0.018, 160, 6, 2, 5);
    const wire = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xc3fb72, transparent: true, opacity: 0.85 }));
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.007, 5, 140), new THREE.MeshBasicMaterial({ color: 0xe9e4db, transparent: true, opacity: 0.52 }));
    orbit.rotation.x = 0.48;
    group.add(wire, orbit);
    const observer = new ResizeObserver(() => {
      const { width, height } = target.getBoundingClientRect();
      if (width && height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    });
    observer.observe(target);
    let frame = 0;
    let active = true;
    const visibility = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; });
    visibility.observe(target);
    const pointer = { x: 0, y: 0 };
    const onPointer = (event) => {
      const rect = target.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const parent = target.parentElement;
    parent?.addEventListener('pointermove', onPointer, { passive: true });
    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || !active) return;
      group.rotation.y += (pointer.x * 0.45 - group.rotation.y) * 0.025;
      group.rotation.x += (-pointer.y * 0.4 - group.rotation.x) * 0.025;
      wire.rotation.z += 0.0013;
      orbit.rotation.z -= 0.001;
      renderer.render(scene, camera);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      parent?.removeEventListener('pointermove', onPointer);
      visibility.disconnect();
      observer.disconnect();
      geometry.dispose();
      wire.material.dispose();
      orbit.geometry.dispose();
      orbit.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-webgl" ref={holder} aria-hidden="true" />;
}
