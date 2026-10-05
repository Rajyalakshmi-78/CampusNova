import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeStudioStage({
  preset = "cyberpunk",
  focalLength = 50,
  fogIntensity = 0.5,
  isRotating = true,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const lightsRef = useRef({});
  const subjectRef = useRef(null);

  // Preset lighting color palettes
  const PRESET_CONFIGS = {
    cyberpunk: {
      keyLight: 0x06b6d4, // Cyan
      fillLight: 0xec4899, // Magenta
      rimLight: 0xf59e0b, // Amber
      groundColor: 0x080911,
      emissiveSubject: 0x06b6d4,
    },
    goldenHour: {
      keyLight: 0xf59e0b, // Warm Amber
      fillLight: 0xfbbf24, // Soft Gold
      rimLight: 0x38bdf8, // Sky Blue
      groundColor: 0x140d05,
      emissiveSubject: 0xd97706,
    },
    noir: {
      keyLight: 0xffffff, // Pure Stark White
      fillLight: 0x1e293b, // Deep Charcoal
      rimLight: 0x94a3b8, // Crisp Silver
      groundColor: 0x050505,
      emissiveSubject: 0x334155,
    },
    sciFiIce: {
      keyLight: 0x38bdf8, // Cold Ice Cyan
      fillLight: 0x818cf8, // Indigo
      rimLight: 0xe0e7ff, // White Frost
      groundColor: 0x040814,
      emissiveSubject: 0x6366f1,
    },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    scene.fog = new THREE.FogExp2(0x06070a, 0.025 * fogIntensity);
    sceneRef.current = scene;

    // Camera setup - FOV calculated based on focal length
    // (Standard 35mm sensor diagonal ~ 43.3mm, FOV ~= 2 * atan(18 / focalLength))
    const initialFov = 2 * Math.atan(18 / focalLength) * (180 / Math.PI);
    const camera = new THREE.PerspectiveCamera(
      initialFov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3, 14);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Stage Floor (Grid with reflective dark tiles)
    const floorGeo = new THREE.PlaneGeometry(50, 50, 40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090a10,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Studio Grid Floor Overlay Lines
    const gridHelper = new THREE.GridHelper(50, 50, 0x334155, 0x1e293b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Curved LED Volume Wall (Virtual Production Screen)
    const curveRadius = 20;
    const wallGeo = new THREE.CylinderGeometry(
      curveRadius,
      curveRadius,
      12,
      64,
      1,
      true,
      Math.PI * 0.75,
      Math.PI * 1.5
    );
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      side: THREE.BackSide,
      roughness: 0.4,
      wireframe: true,
    });
    const curvedWall = new THREE.Mesh(wallGeo, wallMat);
    curvedWall.position.set(0, 6, -5);
    scene.add(curvedWall);

    // Central Cinematic Subject: Holographic Polyhedral Artifact
    const subjectGroup = new THREE.Group();
    subjectGroup.position.set(0, 2.2, 0);

    const coreGeo = new THREE.OctahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    subjectGroup.add(coreMesh);

    // Outer orbiting gimbal rings
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    subjectGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    subjectGroup.add(ring2);

    scene.add(subjectGroup);
    subjectRef.current = { group: subjectGroup, core: coreMesh, ring1, ring2 };

    // Cinema Lighting Rig (3-Point Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // Key Light (Large Spotlight with barn-door angle)
    const keyLight = new THREE.SpotLight(0x06b6d4, 80, 40, Math.PI / 4, 0.4, 1);
    keyLight.position.set(-6, 8, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light (Soft warm side fill)
    const fillLight = new THREE.PointLight(0xec4899, 40, 30);
    fillLight.position.set(7, 4, 6);
    scene.add(fillLight);

    // Rim / Hair Light (Positioned behind and above for silhouette separation)
    const rimLight = new THREE.SpotLight(0xf59e0b, 100, 30, Math.PI / 5, 0.3, 1);
    rimLight.position.set(0, 9, -7);
    rimLight.target = subjectGroup;
    scene.add(rimLight);

    lightsRef.current = { keyLight, fillLight, rimLight, ambientLight };

    // Floating Dust Motes on Stage
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 16;
      dustPos[i + 1] = Math.random() * 8;
      dustPos[i + 2] = (Math.random() - 0.5) * 16;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Window Resize
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
      const elapsed = clock.getElapsedTime();

      if (subjectRef.current) {
        if (isRotating) {
          subjectRef.current.core.rotation.y = elapsed * 0.4;
          subjectRef.current.core.rotation.x = elapsed * 0.25;
          subjectRef.current.ring1.rotation.z = elapsed * 0.6;
          subjectRef.current.ring2.rotation.y = -elapsed * 0.5;
        }

        // Gentle floating levitation
        subjectRef.current.group.position.y = 2.2 + Math.sin(elapsed * 1.5) * 0.2;
      }

      // Render
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update lighting whenever preset changes
  useEffect(() => {
    const config = PRESET_CONFIGS[preset] || PRESET_CONFIGS.cyberpunk;
    const { keyLight, fillLight, rimLight } = lightsRef.current;
    if (keyLight && fillLight && rimLight) {
      keyLight.color.setHex(config.keyLight);
      fillLight.color.setHex(config.fillLight);
      rimLight.color.setHex(config.rimLight);
    }
  }, [preset]);

  // Update camera FOV whenever focalLength changes (simulate zoom/lens swap)
  useEffect(() => {
    if (cameraRef.current) {
      const newFov = 2 * Math.atan(18 / Math.max(focalLength, 12)) * (180 / Math.PI);
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [focalLength]);

  // Update Fog
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.fog) {
      sceneRef.current.fog.density = 0.025 * fogIntensity;
    }
  }, [fogIntensity]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl bg-black"
    />
  );
}
