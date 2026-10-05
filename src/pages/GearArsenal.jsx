import React, { useState } from "react";
import { GEAR_ITEMS } from "../data/mockData";
import { Disc, Camera, Cpu, Layers, Sparkles, Check, ArrowRight, Shield } from "lucide-react";

export default function GearArsenal() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showComparison, setShowComparison] = useState(false);

  const categories = [
    "All",
    "Camera Systems",
    "Lenses & Optics",
    "Virtual Production",
    "Gimbal & Motion Control",
    "Lighting & Grip",
  ];

  const filteredGear =
    selectedCategory === "All"
      ? GEAR_ITEMS
      : GEAR_ITEMS.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            TECHNICAL ARSENAL & INVENTORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            CINEMATOGRAPHY HARDWARE
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Our private camera fleet, master anamorphic optical glass sets, and
            cutting-edge robotic motion control rigs.
          </p>
        </div>

        <button
          onClick={() => setShowComparison(true)}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-colors shrink-0"
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          COMPARE FLAGSHIP CAMERAS
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-amber-400 text-zinc-950 font-bold"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGear.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded shadow">
                    {item.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">SENSOR / OPTICS:</span>
                    <span className="text-zinc-200 text-[11px] truncate max-w-[180px]">
                      {item.sensor}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">LATITUDE:</span>
                    <span className="text-amber-400 text-[11px]">{item.dynamicRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">SPEED / FPS:</span>
                    <span className="text-cyan-400 text-[11px]">{item.frameRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">WEIGHT:</span>
                    <span className="text-zinc-400 text-[11px]">{item.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>IN-HOUSE FLEET READY FOR PRINCIPAL PHOTOGRAPHY</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flagship Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  FLAGSHIP CINEMA CAMERA MATRIX
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Super 35 vs. Large Format 8K Technical Evaluation
                </p>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400">
                    <th className="py-3 px-4">SPECIFICATION</th>
                    <th className="py-3 px-4 text-amber-400">ARRI ALEXA 35</th>
                    <th className="py-3 px-4 text-cyan-400">RED V-RAPTOR XL 8K</th>
                    <th className="py-3 px-4 text-emerald-400">SONY VENICE 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  <tr>
                    <td className="py-3 px-4 font-bold text-zinc-400">SENSOR SIZE</td>
                    <td className="py-3 px-4">4.6K Super 35 (ALEV 4)</td>
                    <td className="py-3 px-4">8K VV Full Frame</td>
                    <td className="py-3 px-4">8.6K Full Frame 3:2</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-zinc-400">DYNAMIC RANGE</td>
                    <td className="py-3 px-4 text-amber-300">17 Stops (Class Leader)</td>
                    <td className="py-3 px-4">17+ Stops</td>
                    <td className="py-3 px-4">16 Stops</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-zinc-400">MAX FPS</td>
                    <td className="py-3 px-4">120 fps @ 4.6K ARRIRAW</td>
                    <td className="py-3 px-4 text-cyan-300">120 fps 8K / 480 fps 2K</td>
                    <td className="py-3 px-4">90 fps @ 6K / 60 fps 8K</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-zinc-400">COLOR SCIENCE</td>
                    <td className="py-3 px-4">REVEAL Color Science</td>
                    <td className="py-3 px-4">IPP2 Image Processing</td>
                    <td className="py-3 px-4">S-Cinetone / ACES</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-zinc-400">INTERNAL ND</td>
                    <td className="py-3 px-4">FSND 0.6, 1.2, 1.8</td>
                    <td className="py-3 px-4">Electronic ND (2 - 7 stops)</td>
                    <td className="py-3 px-4">8-Step Mechanical Optical ND</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
