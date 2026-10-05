import React, { useState } from "react";
import { FEATURED_FILMS } from "../data/mockData";
import { Play, Award, Film, Layers, Sliders, CheckCircle2, ArrowLeft, Disc } from "lucide-react";

export default function ProjectDetail({ setActivePage, onOpenTrailer }) {
  const film = FEATURED_FILMS[0]; // Chrono: Odyssey
  const [activeTab, setActiveTab] = useState("breakdown");

  const colorPalette = [
    { hex: "#06B6D4", name: "Quantum Cyan (Key Accent)" },
    { hex: "#F59E0B", name: "Anamorphic Streak Gold" },
    { hex: "#090A12", name: "Obsidian Void (Sub-Dermal)" },
    { hex: "#8B5CF6", name: "Tachyon Violet (Ambient)" },
    { hex: "#E2E8F0", name: "Starlight Highlight Roll-off" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => setActivePage("projects")}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO FILMS VAULT</span>
        </button>
      </div>

      {/* Hero Cinema Banner */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[21/9] sm:aspect-cinemascope shadow-2xl bg-black">
          <img
            src={film.banner}
            alt={film.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Overlay Details */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-mono bg-amber-400 text-zinc-950 px-2.5 py-0.5 rounded font-bold">
                  CASE STUDY
                </span>
                <span className="text-[11px] font-mono bg-black/60 border border-white/10 px-2.5 py-0.5 rounded text-zinc-300">
                  {film.aspectRatio}
                </span>
                <span className="text-[11px] font-mono bg-black/60 border border-white/10 px-2.5 py-0.5 rounded text-amber-300">
                  {film.awards[0]}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {film.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 font-serif italic mt-1">
                "{film.tagline}"
              </p>
            </div>

            <button
              onClick={() => onOpenTrailer(film)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              WATCH 4K TRAILER
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-white/10 mb-8 gap-4">
          {[
            { id: "breakdown", label: "Production Breakdown" },
            { id: "screenplay", label: "Screenplay Excerpt" },
            { id: "color", label: "Color Science & Palette" },
            { id: "tech", label: "Optics & Camera Matrix" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs sm:text-sm font-mono tracking-wider transition-colors relative cursor-pointer ${
                activeTab === tab.id
                  ? "text-amber-400 font-bold border-b-2 border-amber-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Production Breakdown */}
        {activeTab === "breakdown" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Director's Log: Architecting Quantum Realities
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  "When we embarked on Chrono: Odyssey, our primary manifesto was that
                  futurism should feel visceral, tactile, and heavy. We resisted the
                  temptation of sterile digital aesthetics by marrying ARRI’s ALEV 4
                  sensor with customized Panavision 1.3x cylindrical anamorphic glass.
                  Every streak of light across the frame is optical glass flare, not
                  synthetic post-effects."
                </p>
                <p className="text-xs text-zinc-500 font-mono mt-2">
                  — Elena Vance, Director & Showrunner
                </p>
              </div>

              {/* Behind the scenes VFX progression */}
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
                <h4 className="text-sm font-mono text-amber-400 uppercase tracking-widest mb-4">
                  VFX COMPOSITING PIPELINE
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                      PASS 01
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">
                      Practical Stage Plate
                    </h5>
                    <p className="text-[11px] text-zinc-400">
                      Physical actors on 250m² LED volume with real-time camera tracking.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-mono text-amber-400 block mb-1">
                      PASS 02
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">
                      Unreal Nanite Mesh
                    </h5>
                    <p className="text-[11px] text-zinc-400">
                      12 billion polygons rendered at 24fps with volumetric fluid dynamics.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-mono text-emerald-400 block mb-1">
                      PASS 03
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">
                      ACES Kodak 2383 Grade
                    </h5>
                    <p className="text-[11px] text-zinc-400">
                      Subtractive cyan dye density & organic film halation emulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar quick specs */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
                  PRODUCTION CREDITS
                </h4>
                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block">DIRECTOR:</span>
                    <span className="text-white font-semibold">{film.director}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">CINEMATOGRAPHER:</span>
                    <span className="text-white font-semibold">{film.dp}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">VFX SUPERVISOR:</span>
                    <span className="text-white font-semibold">Dr. Sora Takahashi</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">MASTER COLORIST:</span>
                    <span className="text-white font-semibold">Chloé Fontaine</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">COMPOSER:</span>
                    <span className="text-white font-semibold">Julian Mendoza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Screenplay Excerpt */}
        {activeTab === "screenplay" && (
          <div className="max-w-3xl mx-auto bg-zinc-900/90 border border-white/15 rounded-2xl p-8 sm:p-12 shadow-2xl font-mono text-zinc-300">
            <div className="text-center text-xs text-zinc-500 pb-6 border-b border-white/10 mb-6">
              CHRONO: ODYSSEY 2088 — SHOOTING SCRIPT DRAFT 4.2 <br />
              SCENE 48 / EXT. NEO-TOKYO CITADEL - NIGHT [RAIN]
            </div>

            <p className="text-sm font-bold text-amber-400 mb-4">
              EXT. LOWER CITADEL SUB-AQUATIC AQUEDUCT - NIGHT
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Torrential rain hammers against translucent carbon-glass trusses.
              The cyan luminescence of holographic advertisements refracts through
              droplets dripping from DR. MAYA LIN'S protective visor.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              She clutches the TITANIUM QUANTUM BEACON. It emits a low, resonant 40Hz
              vibrato that ripples the puddles around her boots.
            </p>

            <div className="text-center my-4">
              <span className="text-xs font-bold text-white tracking-widest">
                MAYA
              </span>
              <p className="text-xs text-zinc-300 mt-1 italic max-w-md mx-auto">
                (into sub-vocal comms) <br />
                Kaelen... the timeline isn't collapsing. It's remembering itself.
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Behind her, the silhouette of an ENFORCER DRONE cuts through the steam.
              A sharp anamorphic amber lens flare slices across the screen.
            </p>
          </div>
        )}

        {/* Tab 3: Color Palette */}
        {activeTab === "color" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                ACEScc Spectral Color Harmony
              </h3>
              <p className="text-xs text-zinc-400 max-w-2xl">
                Tuned precisely for high-contrast OLED theatrical projection and HDR10+
                home master. Balancing extreme neon cyan highlights against organic
                skin tones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {colorPalette.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
                >
                  <div
                    className="h-28 w-full shadow-inner"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="p-3 text-center">
                    <span className="font-mono text-xs font-bold text-white block">
                      {item.hex}
                    </span>
                    <span className="text-[10px] text-zinc-500 block truncate mt-0.5">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Optics & Camera Matrix */}
        {activeTab === "tech" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "PRIMARY CAMERA",
                val: "ARRI ALEXA 35",
                detail: "4.6K Super 35 CMOS ALEV 4 sensor, 17 stops exposure latitude.",
              },
              {
                label: "ANAMORPHIC GLASS",
                val: "Panavision Ultra Panatar",
                detail: "1.3x squeeze ratio producing organic oval out-of-focus highlights.",
              },
              {
                label: "AUDIO MASTER",
                val: "Dolby Atmos 7.1.4",
                detail: "Mixed on 32-channel Genelec SAM active studio monitors.",
              },
              {
                label: "STORAGE & BITRATE",
                val: "Codex ARRIRAW 8TB",
                detail: "Uncompressed 12-bit LogC4 at 2.8 Gbps data rate.",
              },
            ].map((box, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  {box.label}
                </span>
                <h4 className="text-base font-bold text-white mb-2">{box.val}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{box.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
