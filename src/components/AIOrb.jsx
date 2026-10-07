import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AIOrb({ isThinking = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Blue Core (High-density sphere)
    const coreGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050b18, // Deep Midnight Navy
      emissive: 0x1d4ed8, // Deep Electric Blue
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Cyan Wireframe Outer Shield
    const wireGeo = new THREE.IcosahedronGeometry(2.1, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff, // Electric Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // 3. Orbiting Gyroscope Rings (Cyan & Blue only)
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, // Electric Blue
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring2);

    // 4. Surrounding Micro-Particle Halo
    const haloCount = 280;
    const haloGeo = new THREE.BufferGeometry();
    const haloPos = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      haloPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      haloPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      haloPos[i + 2] = radius * Math.cos(phi);
    }
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPos, 3));
    const haloMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const haloParticles = new THREE.Points(haloGeo, haloMat);
    scene.add(haloParticles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 4, 20);
    pointLightCyan.position.set(4, 3, 5);
    scene.add(pointLightCyan);

    const pointLightBlue = new THREE.PointLight(0x2563eb, 3, 20);
    pointLightBlue.position.set(-4, -3, 3);
    scene.add(pointLightBlue);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const speedMultiplier = isThinking ? 2.2 : 1.0;

      // Pulse
      const scale = 1 + Math.sin(elapsed * 2.5 * speedMultiplier) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      wireMesh.rotation.y = elapsed * 0.3 * speedMultiplier;
      wireMesh.rotation.x = elapsed * 0.15 * speedMultiplier;

      ring1.rotation.z = elapsed * 0.5 * speedMultiplier;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.8) * 0.2;

      ring2.rotation.y = -elapsed * 0.6 * speedMultiplier;
      ring2.rotation.z = Math.sin(elapsed * 0.6) * 0.2;

      haloParticles.rotation.y = elapsed * 0.2 * speedMultiplier;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, [isThinking]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[320px] sm:min-h-[420px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
    />
  );
}
