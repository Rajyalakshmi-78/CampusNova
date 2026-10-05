import React, { useState, useRef } from "react";
import { Sliders, Sun, Eye, Sparkles, Activity, Layers } from "lucide-react";

export default function ColorLab() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedLut, setSelectedLut] = useState("kodak");
  const [exposure, setExposure] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const containerRef = useRef(null);

  const luts = [
    {
      id: "kodak",
      name: "Kodak 2383 Print Emulation",
      badge: "ACADEMY STANDARD",
      desc: "Rich, dense shadows with creamy highlight roll-off and organic peach skin tone preservation.",
      style: "sepia(20%) saturate(120%) contrast(110%) hue-rotate(-5deg)",
    },
    {
      id: "cyberpunk",
      name: "Neo-Tokyo Cyberpunk",
      badge: "HIGH CONTRAST",
      desc: "Deep cyan shadows matched with electric magenta highlights for futuristic urban night shoots.",
      style: "contrast(135%) saturate(140%) hue-rotate(25deg)",
    },
    {
      id: "arrakis",
      name: "Dune Desert Warm Dust",
      badge: "WARM MONOCHROME",
      desc: "Crushed cold hues and dominant golden amber tint reminiscent of harsh sunlit dunes.",
      style: "sepia(60%) saturate(90%) contrast(105%) brightness(95%)",
    },
    {
      id: "bleach",
      name: "Silver Bleach Bypass",
      badge: "GRITTY ACTION",
      desc: "Retained silver halide producing harsh contrasts and subdued, militaristic colors.",
      style: "contrast(150%) saturate(55%) brightness(90%)",
    },
  ];

  const currentLut = luts.find((l) => l.id === selectedLut) || luts[0];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            ACEScc 32-BIT COLOR SCIENCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            COLOR LAB & LUT SUITE
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Slide horizontally to compare raw 12-bit Log C3 sensor capture against
            custom ACES-calibrated film print emulation.
          </p>
        </div>

        {/* Status indicator */}
        <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FSI 4000-NIT DCI-P3 CALIBRATED</span>
        </div>
      </div>

      {/* Main Split Slider Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-cinemascope w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize bg-black"
          >
            {/* GRADED AFTER IMAGE (Base Layer) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80"
                alt="Graded Footage"
                className="w-full h-full object-cover"
                style={{
                  filter: `${currentLut.style} contrast(${contrast}%) saturate(${saturation}%) brightness(${100 + exposure * 15}%)`,
                }}
              />
              <div className="absolute top-4 right-4 bg-amber-400 text-zinc-950 font-mono text-[10px] font-bold px-2.5 py-1 rounded shadow-lg pointer-events-none">
                GRADED: {currentLut.name.toUpperCase()}
              </div>
            </div>

            {/* RAW LOG C BEFORE IMAGE (Clipped Left Layer) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80"
                alt="RAW Log C Footage"
                className="w-full h-full object-cover filter contrast-75 brightness-125 saturate-50 sepia-0"
              />
              <div className="absolute top-4 left-4 bg-zinc-900/90 text-zinc-300 border border-white/10 font-mono text-[10px] px-2.5 py-1 rounded shadow-lg pointer-events-none">
                RAW SENSOR: ARRI LOG C3 (UNPROCESSED)
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-2xl">
                ↔
              </div>
            </div>

            {/* Bottom Helper */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400 pointer-events-none border border-white/10">
              DRAG SLIDER LEFT / RIGHT TO REVEAL DYNAMIC RANGE
            </div>
          </div>
        </div>

        {/* LUT Selector & Grading Knobs (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Presets */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              3D LUT FILM PROFILES
            </h3>
            <div className="space-y-2.5">
              {luts.map((lut) => (
                <button
                  key={lut.id}
                  onClick={() => setSelectedLut(lut.id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                    selectedLut === lut.id
                      ? "bg-amber-400/10 border-amber-400 shadow-md shadow-amber-500/10"
                      : "bg-black/30 border-white/5 text-zinc-400 hover:text-white hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{lut.name}</span>
                    <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-amber-300">
                      {lut.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug font-sans">
                    {lut.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Color Scopes Simulation */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> REAL-TIME RGB WAVEFORM
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">IRE 0 - 100</span>
            </div>

            {/* Waveform graphic */}
            <div className="h-24 bg-black rounded-xl border border-white/10 p-2 flex items-end justify-between gap-1 overflow-hidden relative">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-600">
                100 IRE (CLIPPING)
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-600">
                0 IRE (NOISE FLOOR)
              </div>
              {[45, 60, 85, 92, 70, 55, 78, 62, 48, 88, 75, 90, 68, 52, 82, 95, 64].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-500 via-amber-400 to-rose-500 rounded-t-xs opacity-75 animate-pulse"
                    style={{
                      height: `${Math.min(100, h * (saturation / 100))}%`,
                      animationDuration: `${0.8 + (i % 5) * 0.2}s`,
                    }}
                  />
                )
              )}
            </div>

            {/* Quick Adjustment Controls */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Exposure Stops:</span>
                  <span className="text-white font-bold">{exposure > 0 ? `+${exposure}` : exposure} EV</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={exposure}
                  onChange={(e) => setExposure(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Gamut Saturation:</span>
                  <span className="text-white font-bold">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
