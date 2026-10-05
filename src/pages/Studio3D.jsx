import React, { useState } from "react";
import ThreeStudioStage from "../components/ThreeStudioStage";
import { Aperture, Sliders, Sun, Eye, RotateCw, Sparkles, Video, ShieldAlert } from "lucide-react";

export default function Studio3D() {
  const [preset, setPreset] = useState("cyberpunk");
  const [focalLength, setFocalLength] = useState(50);
  const [fogDensity, setFogDensity] = useState(0.5);
  const [isRotating, setIsRotating] = useState(true);

  const presets = [
    { id: "cyberpunk", label: "Neo-Tokyo Cyberpunk", color: "text-cyan-400" },
    { id: "goldenHour", label: "35mm Golden Hour", color: "text-amber-400" },
    { id: "noir", label: "Film Noir High-Contrast", color: "text-zinc-300" },
    { id: "sciFiIce", label: "Deep Space Ice Moon", color: "text-indigo-400" },
  ];

  const focalPresets = [24, 35, 50, 85, 135];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            REAL-TIME THREE.JS VIRTUAL STAGE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            STAGE 01: VIRTUAL PRODUCTION VOLUME
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Manipulate virtual cinema lighting, swap anamorphic focal lengths, and preview
            in-camera VFX parallax inside our interactive 3D WebGL simulator.
          </p>
        </div>

        {/* Telemetry HUD */}
        <div className="bg-zinc-900/90 border border-white/10 px-4 py-2.5 rounded-xl font-mono text-[11px] flex items-center gap-4 text-zinc-400">
          <div>
            <span className="text-zinc-600 block">SHUTTER</span>
            <span className="text-amber-400 font-bold">180.0° [1/48s]</span>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="text-zinc-600 block">EXPOSURE</span>
            <span className="text-white font-bold">T2.8 / ISO 800</span>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="text-zinc-600 block">SYNC</span>
            <span className="text-emerald-400 font-bold">GENLOCKED 24.00</span>
          </div>
        </div>
      </div>

      {/* Main 3D Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive 3D Stage (Col 8) */}
        <div className="lg:col-span-8 relative">
          <div className="relative aspect-[16/10] w-full">
            <ThreeStudioStage
              preset={preset}
              focalLength={focalLength}
              fogIntensity={fogDensity}
              isRotating={isRotating}
            />

            {/* Viewport HUD Overlays */}
            <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                LENS: {focalLength}mm T2.0
              </span>
              <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-white/10">
                ACTIVE RIG: {preset.toUpperCase()}
              </span>
            </div>

            {/* Reticle Crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
              <div className="w-12 h-12 border border-white/40 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-amber-400 rounded-full" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between text-[10px] font-mono text-zinc-500">
              <span>FOV: {Math.round(2 * Math.atan(18 / focalLength) * (180 / Math.PI))}°</span>
              <span>UNREAL ENGINE 5.5 IN-CAMERA VFX PARALLAX</span>
            </div>
          </div>
        </div>

        {/* Controls Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lighting Presets */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Sun className="w-4 h-4" /> LIGHTING SCHEMATIC
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">3-POINT RIG</span>
            </div>

            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    preset === p.id
                      ? "bg-amber-400/10 border-amber-400 text-white font-bold"
                      : "bg-black/40 border-white/5 text-zinc-400 hover:text-white hover:bg-black/60"
                  }`}
                >
                  <span className={p.color}>{p.label}</span>
                  {preset === p.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Focal Length Selector */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Aperture className="w-4 h-4" /> CINE OPTICS LENS (mm)
              </h3>
              <span className="text-xs font-mono text-white font-bold">
                {focalLength}mm
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {focalPresets.map((mm) => (
                <button
                  key={mm}
                  onClick={() => setFocalLength(mm)}
                  className={`py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    focalLength === mm
                      ? "bg-amber-400 text-zinc-950 font-bold shadow-md"
                      : "bg-black/50 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {mm}mm
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="18"
                max="135"
                step="1"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>18mm (Ultra Wide)</span>
                <span>135mm (Tele Macro)</span>
              </div>
            </div>
          </div>

          {/* Environmental FX & Rotation */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Sliders className="w-4 h-4" /> ATMOSPHERIC HAZE & KINETICS
            </h3>

            {/* Fog Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">Stage Fog / Haze:</span>
                <span className="text-white font-bold">
                  {Math.round(fogDensity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={fogDensity}
                onChange={(e) => setFogDensity(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Rotation Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <span className="text-xs font-mono text-zinc-300">
                Gimbal Turntable Rotation
              </span>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                  isRotating
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-white/5 text-zinc-500 border border-white/5"
                }`}
              >
                {isRotating ? "ACTIVE" : "PAUSED"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
