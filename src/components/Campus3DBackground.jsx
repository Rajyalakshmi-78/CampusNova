import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function Campus3DBackground() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    // Performance detection: detect if mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 400 : 900;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    // Particle Cloud (Cyber Nodes)
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 75;
      positions[i + 1] = (Math.random() - 0.5) * 55;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      // CampusNova Bio-Digital Palette: Emerald (#1F8A5B), Fresh Green (#4CAF73), Warm Gold (#E7B84B), Ivory (#F7F4ED)
      const rnd = Math.random();
      if (rnd > 0.55) {
        // Emerald (#1F8A5B)
        colors[i] = 0.122;
        colors[i + 1] = 0.541;
        colors[i + 2] = 0.357;
      } else if (rnd > 0.25) {
        // Fresh Green (#4CAF73)
        colors[i] = 0.298;
        colors[i + 1] = 0.686;
        colors[i + 2] = 0.451;
      } else if (rnd > 0.1) {
        // Warm Gold (#E7B84B)
        colors[i] = 0.906;
        colors[i + 1] = 0.722;
        colors[i + 2] = 0.294;
      } else {
        // Architectural Ivory (#F7F4ED)
        colors[i] = 0.969;
        colors[i + 1] = 0.957;
        colors[i + 2] = 0.929;
      }
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.5,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Campus Network Structures: Abstract floating geometric rings and towers
    const ringGroup = new THREE.Group();

    // Central Data Ring (Emerald #1F8A5B wireframe)
    const ringGeo1 = new THREE.TorusGeometry(8.5, 0.15, 12, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x1f8a5b, // CampusNova Emerald
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.28,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Outer Network Ring (Warm Gold #E7B84B wireframe)
    const ringGeo2 = new THREE.TorusGeometry(12, 0.12, 12, 90);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe7b84b, // Warm Gold
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.38 : 0.22,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Floating Abstract Campus Tower Nodes (Polyhedrons - Fresh Green & Warm Gold)
    const towerGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const towerMat = new THREE.MeshBasicMaterial({
      color: 0x4caf73, // Fresh Green
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(10, 4, -5);
    ringGroup.add(tower);

    const satelliteGeo = new THREE.OctahedronGeometry(1.8, 0);
    const satelliteMat = new THREE.MeshBasicMaterial({
      color: 0xe7b84b, // Warm Gold Landmark Accent
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
    });
    const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
    satellite.position.set(-11, -3, -4);
    ringGroup.add(satellite);

    scene.add(ringGroup);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize listener
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle rotation
      particles.rotation.y = elapsed * 0.02 + mouseX;
      particles.rotation.x = elapsed * 0.01 + mouseY;

      ring1.rotation.z = elapsed * 0.06;
      ring2.rotation.x = -elapsed * 0.05;
      ring2.rotation.y = elapsed * 0.04;

      tower.rotation.x = elapsed * 0.15;
      tower.rotation.y = elapsed * 0.2;
      satellite.rotation.y = -elapsed * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      towerGeo.dispose();
      towerMat.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  if (!hasWebGL) {
    // CSS Fallback background with subtle glowing Emerald/Gold radial gradients
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#1F8A5B]/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#E7B84B]/10 rounded-full blur-[160px] animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden opacity-90 transition-opacity duration-700"
    />
  );
}
