import React, { useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Disc, Radio, Sliders } from "lucide-react";

export default function Soundtrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stems, setStems] = useState([
    { id: 1, name: "Orchestral Strings (Philharmonic)", active: true, vol: 85, color: "from-amber-400 to-amber-600" },
    { id: 2, name: "Cinematic Brass & Horn Swell", active: true, vol: 75, color: "from-rose-500 to-rose-700" },
    { id: 3, name: "Analog Sub Bass (Moog Sub 37)", active: true, vol: 90, color: "from-cyan-400 to-blue-600" },
    { id: 4, name: "Cyber Arpeggiator (Prophet-6)", active: false, vol: 60, color: "from-purple-400 to-indigo-600" },
    { id: 5, name: "Atmos Foley & Rain Hydrophone", active: true, vol: 50, color: "from-emerald-400 to-teal-600" },
  ]);

  const toggleStem = (id) => {
    setStems(
      stems.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const updateVol = (id, newVol) => {
    setStems(
      stems.map((s) => (s.id === id ? { ...s, vol: newVol } : s))
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            DOLBY ATMOS 128-OBJECT SPATIAL SUITE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            ORIGINAL SCORE & STEM MIXER
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Deconstruct the original orchestral and modular score for "Chrono: Odyssey".
            Solo or mute individual stems in real-time.
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/10 px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-4 text-zinc-400">
          <div>
            <span className="text-zinc-500 block text-[10px]">TEMPO</span>
            <span className="text-white font-bold">72 BPM (ADAGIO)</span>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="text-zinc-500 block text-[10px]">KEY</span>
            <span className="text-amber-400 font-bold">D MINOR SPATIAL</span>
          </div>
        </div>
      </div>

      {/* Main Scoring Board */}
      <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
        {/* Master Player Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/60 border border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center font-bold shadow-xl transition-all cursor-pointer hover:scale-105 shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                MAIN THEATRICAL CUE
              </span>
              <h3 className="text-lg font-bold text-white">
                CHRONO: CONVERGENCE OF TIME
              </h3>
              <p className="text-xs text-zinc-400">
                Composed by Julian Mendoza • London Philharmonic Orchestra
              </p>
            </div>
          </div>

          {/* Animated Waveform Visualization */}
          <div className="w-full sm:w-80 h-14 bg-zinc-950 rounded-xl p-2 flex items-end justify-between gap-1 border border-white/5 overflow-hidden">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-amber-500 to-cyan-400 rounded-t-xs transition-all"
                style={{
                  height: isPlaying
                    ? `${Math.max(15, ((Math.sin(i * 0.4) + 1.2) * 40))}%`
                    : "8%",
                  opacity: isPlaying ? 0.9 : 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Individual Stems Console */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              INDIVIDUAL STEM CHANNELS (5 TRACKS)
            </h4>
            <span className="text-[11px] font-mono text-zinc-500">
              CLICK MUTE TO ISOLATE STRINGS OR SYNTH
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stems.map((stem) => (
              <div
                key={stem.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  stem.active
                    ? "bg-zinc-950/80 border-white/10"
                    : "bg-black/40 border-white/5 opacity-40"
                }`}
              >
                {/* Stem Title & Active Status */}
                <div className="flex items-center gap-3 w-full sm:w-1/3">
                  <span
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${stem.color} ${
                      isPlaying && stem.active ? "animate-ping" : ""
                    }`}
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white font-mono">
                      {stem.name}
                    </h5>
                    <span className="text-[10px] font-mono text-zinc-500">
                      CHANNEL 0{stem.id} • 96kHz / 24-BIT
                    </span>
                  </div>
                </div>

                {/* Volume Level Slider */}
                <div className="w-full sm:w-1/3 flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-zinc-500 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    disabled={!stem.active}
                    value={stem.vol}
                    onChange={(e) => updateVol(stem.id, Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400 disabled:opacity-30"
                  />
                  <span className="text-xs font-mono text-zinc-400 w-8 text-right">
                    {stem.vol}%
                  </span>
                </div>

                {/* Solo / Mute Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => toggleStem(stem.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-colors cursor-pointer ${
                      stem.active
                        ? "bg-amber-400 text-zinc-950"
                        : "bg-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {stem.active ? "ACTIVE" : "MUTED"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
