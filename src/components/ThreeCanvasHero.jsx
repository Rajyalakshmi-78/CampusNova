import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvasHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Starfield (Floating stardust)
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;

      // Color tints: amber gold, cyan blue, clean white
      const tint = Math.random();
      if (tint > 0.6) {
        colors[i] = 0.96; // R (amber gold)
        colors[i + 1] = 0.7; // G
        colors[i + 2] = 0.2; // B
      } else if (tint > 0.3) {
        colors[i] = 0.1; // R (cyan)
        colors[i + 1] = 0.75; // G
        colors[i + 2] = 0.95; // B
      } else {
        colors[i] = 0.8; // R (soft white)
        colors[i + 1] = 0.85; // G
        colors[i + 2] = 0.9; // B
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Floating 3D Geometric Cinema Aperture / Prism
    const torusGeo = new THREE.TorusGeometry(8, 0.45, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Outer Gyroscope Ring
    const outerRingGeo = new THREE.TorusGeometry(11, 0.25, 16, 120);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 3;
    scene.add(outerRing);

    // Central Dodecahedron (Lens Crystal)
    const crystalGeo = new THREE.IcosahedronGeometry(3.5, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      emissive: 0x6366f1,
      emissiveIntensity: 0.5,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystal);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf59e0b, 2.5, 50);
    pointLight1.position.set(15, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow drift
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y = elapsedTime * 0.03 + targetX;
      particles.rotation.x = elapsedTime * 0.02 + targetY;

      torus.rotation.x = elapsedTime * 0.15;
      torus.rotation.y = elapsedTime * 0.2;

      outerRing.rotation.y = -elapsedTime * 0.12;
      outerRing.rotation.z = elapsedTime * 0.08;

      crystal.rotation.x = -elapsedTime * 0.25;
      crystal.rotation.y = elapsedTime * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
    />
  );
}
