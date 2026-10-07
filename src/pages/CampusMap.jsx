import React, { useState } from "react";
import {
  MapPin,
  Search,
  Filter,
  Layers,
  Compass,
  Clock,
  Users,
  Activity,
  X,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { CAMPUS_BUILDINGS } from "../data/buildings";

export default function CampusMap() {
  const [selectedBuilding, setSelectedBuilding] = useState(CAMPUS_BUILDINGS[2]); // Default Central Library
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Academic", "Food", "Sports", "Medical", "Administration"];

  const filteredBuildings = CAMPUS_BUILDINGS.filter((b) => {
    const matchCat = activeFilter === "All" || b.category === activeFilter;
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.shortCode.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#18201C] dark:text-[#F5F3EA]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#D9E1DB] dark:border-[#2D3A32] gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1F8A5B] dark:text-[#3FAE75]">
            SPATIAL TELEMETRY & INDOOR WAYFINDING
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 text-[#18201C] dark:text-[#F5F3EA]">
            CAMPUS SPATIAL MAP
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6962] dark:text-[#AEB9B1] mt-1 font-light">
            Interactive isometric navigation grid tracking live building occupancy,
            quiet zones, and operational facilities.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeFilter === f
                  ? "bg-[#1F8A5B] text-white font-bold shadow-xs"
                  : "bg-[#EEF3EE] dark:bg-[#1C2921] text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Viewport & Floating Information Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Map Grid (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5D6962] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search building name or acronym (e.g. CSE, LIB, MED)..."
              className="w-full bg-[#FFFFFF] dark:bg-[#152019] border border-[#D9E1DB] dark:border-[#2D3A32] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#18201C] dark:text-[#F5F3EA] placeholder-[#5D6962] focus:outline-none focus:border-[#1F8A5B] dark:focus:border-[#3FAE75] shadow-xs"
            />
          </div>

          {/* Isometric Campus Canvas Board */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#D9E1DB] dark:border-[#2D3A32] bg-[#12372A]/90 shadow-2xl p-6 select-none bg-digital-grid">
            {/* Map Ambient Vector Graphic Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1F8A5B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E7B84B" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Walking route and perimeter paths */}
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#grid-grad)" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="50%" cy="50%" r="20%" fill="none" stroke="url(#grid-grad)" strokeWidth="1.5" />
                <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#4CAF73" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="#1F8A5B" strokeOpacity="0.2" strokeWidth="2" />
              </svg>
            </div>

            {/* Map Markers */}
            {filteredBuildings.map((b) => {
              const isSelected = selectedBuilding?.id === b.id;
              const isLandmark = b.category === "Administration" || b.id === "bld-library";
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBuilding(b)}
                  style={{ top: `${b.y}%`, left: `${b.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                    isSelected ? "scale-125 z-30" : "hover:scale-110"
                  }`}
                  title={b.name}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing beacon ping */}
                    <span
                      className={`absolute w-8 h-8 rounded-full animate-ping opacity-70 ${
                        isSelected
                          ? "bg-[#1F8A5B]"
                          : isLandmark
                          ? "bg-[#E7B84B] opacity-50"
                          : "bg-[#D9DDD8] opacity-30"
                      }`}
                    />

                    {/* Marker Icon Shield */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-colors border ${
                        isSelected
                          ? "bg-[#1F8A5B] text-white border-white shadow-[#1F8A5B]/50"
                          : isLandmark
                          ? "bg-[#18201C] text-[#E7B84B] border-[#E7B84B]/60 hover:bg-[#E7B84B] hover:text-[#18201C]"
                          : "bg-[#18201C] text-[#D9DDD8] border-[#D9DDD8]/40 hover:bg-[#1F8A5B] hover:text-white"
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                    </div>

                    {/* Code label pill */}
                    <span
                      className={`mt-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border tracking-wider transition-colors ${
                        isSelected
                          ? "bg-[#1F8A5B] text-white border-[#4CAF73]"
                          : isLandmark
                          ? "bg-[#18201C]/90 text-[#E7B84B] border-[#E7B84B]/40"
                          : "bg-[#18201C]/80 text-[#D9DDD8] border-white/20"
                      }`}
                    >
                      {b.shortCode}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom HUD */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-[10px] font-mono text-[#AEB9B1]">
              <span className="bg-[#12372A]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2D3A32] text-[#4CAF73] font-semibold">
                ● CLICK ANY NODE TO INSPECT SPATIAL DETAILS
              </span>
              <span className="hidden sm:inline bg-[#12372A]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2D3A32] text-[#F5F3EA]">
                ACTIVE GRID: 9 COMPLEXES MONITORED
              </span>
            </div>
          </div>
        </div>

        {/* Floating Building Information Panel (Col 4) */}
        <div className="lg:col-span-4">
          {selectedBuilding ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#152019] border border-[#D9E1DB] dark:border-[#2D3A32] shadow-2xl space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#18201C]">
                <img
                  src={selectedBuilding.image}
                  alt={selectedBuilding.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold bg-[#1F8A5B] text-white px-2 py-0.5 rounded shadow">
                    {selectedBuilding.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono bg-[#18201C]/80 backdrop-blur-md text-[#E7B84B] px-2 py-0.5 rounded border border-[#E7B84B]/30 font-semibold">
                    CODE: {selectedBuilding.shortCode}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#18201C] dark:text-[#F5F3EA]">
                  {selectedBuilding.name}
                </h3>
                <p className="text-xs text-[#5D6962] dark:text-[#AEB9B1] mt-1 leading-relaxed font-light">
                  {selectedBuilding.description}
                </p>
              </div>

              {/* Status and Occupancy */}
              <div className="space-y-3 bg-[#EEF3EE] dark:bg-[#1C2921] p-4 rounded-2xl border border-[#D9E1DB] dark:border-[#2D3A32] text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-[#5D6962] dark:text-[#AEB9B1]">OPERATING HOURS:</span>
                  <span className="text-[#18201C] dark:text-[#F5F3EA] font-bold">
                    {selectedBuilding.hours}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5D6962] dark:text-[#AEB9B1]">CAPACITY:</span>
                  <span className="text-[#1F8A5B] dark:text-[#3FAE75] font-bold">{selectedBuilding.capacity}</span>
                </div>

                {/* Occupancy bar */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-[11px]">
                    <span className="text-[#5D6962] dark:text-[#AEB9B1]">LIVE OCCUPANCY RATE:</span>
                    <span className="font-bold text-[#18201C] dark:text-[#F5F3EA]">
                      {selectedBuilding.occupancyRate}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#D9E1DB] dark:bg-[#2D3A32] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        selectedBuilding.occupancyRate > 90
                          ? "bg-[#D99A32]"
                          : "bg-[#1F8A5B]"
                      }`}
                      style={{ width: `${selectedBuilding.occupancyRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="text-[10px] font-mono text-[#5D6962] dark:text-[#AEB9B1] uppercase tracking-widest block mb-2 font-bold">
                  FACILITIES & KEY ZONES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBuilding.amenities.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#E5EFE8] dark:bg-[#1C2921] text-[#18201C] dark:text-[#AEB9B1] border border-[#D9E1DB] dark:border-[#2D3A32]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#EEF3EE] dark:bg-[#1C2921] border border-[#D9E1DB] dark:border-[#2D3A32] text-center text-[#5D6962] dark:text-[#AEB9B1] font-mono text-xs">
              Select a building marker to inspect telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
