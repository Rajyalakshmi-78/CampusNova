import React, { useState } from "react";
import { Plus, Trash2, Camera, Move, Layers, Download, Check, Film } from "lucide-react";

export default function Storyboard() {
  const [aspectMask, setAspectMask] = useState("2.39:1");
  const [shots, setShots] = useState([
    {
      id: 1,
      scene: "SCENE 01 - ACT I",
      title: "Citadel Dawn Horizon",
      type: "Extreme Wide Shot (EWS)",
      movement: "Slow Technocrane Descent",
      lens: "28mm Anamorphic T2.0",
      notes: "Golden hour sunrise silhouettes towering monolithic energy pylons. Smoke billows from lower vents.",
      audioCue: "Distant sub-bass drone fading into minor string quartet.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      scene: "SCENE 02 - ACT I",
      title: "Dr. Lin Infiltration",
      type: "Medium Close-Up (MCU)",
      movement: "Steadicam Tracking Forward",
      lens: "50mm Anamorphic T2.3",
      notes: "Rain droplets stream over optical visor. Maya glances over her left shoulder before accessing terminal.",
      audioCue: "Footsteps echoing on wet metal grated catwalk.",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      scene: "SCENE 03 - ACT II",
      title: "Quantum Beacon Activation",
      type: "Low Angle Hero (LAH)",
      movement: "Circular Ronin 4D Orbit 360°",
      lens: "35mm Anamorphic T2.0",
      notes: "The central core bursts with horizontal cyan light. Physical reality begins to warp and refract.",
      audioCue: "High-frequency resonant pitch bend and spatial whoosh.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      scene: "SCENE 04 - CLIMAX",
      title: "The Split Timeline Horizon",
      type: "Over-The-Shoulder (OTS)",
      movement: "Dolly Zoom (Vertigo Effect)",
      lens: "85mm Anamorphic T2.8",
      notes: "Maya watches dual suns emerge through the cloud breach. She makes the irreversible choice.",
      audioCue: "Full orchestral swell into sudden silence.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const [copied, setCopied] = useState(false);

  const addShot = () => {
    const newId = shots.length + 1;
    const newShot = {
      id: newId,
      scene: `SCENE 0${newId} - NEW BEAT`,
      title: `Sequence Shot ${newId}`,
      type: "Close-Up (CU)",
      movement: "Handheld Visceral Shake",
      lens: "50mm Prime T1.8",
      notes: "Actor eye reflection reveals incoming hazard beacon.",
      audioCue: "Heartbeat pulse with heavy reverb.",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    };
    setShots([...shots, newShot]);
  };

  const removeShot = (id) => {
    setShots(shots.filter((s) => s.id !== id));
  };

  const copyShotlist = () => {
    const text = shots
      .map(
        (s) =>
          `[${s.scene}] ${s.title}\nShot Type: ${s.type} | Lens: ${s.lens} | Movement: ${s.movement}\nNotes: ${s.notes}\nAudio: ${s.audioCue}\n`
      )
      .join("\n---\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            DIRECTOR & DP PRE-VISUALIZATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            INTERACTIVE STORYBOARD CANVAS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Plan shot lists, define camera movements, assign anamorphic lenses, and audition
            aspect ratio gates before rolling camera on stage.
          </p>
        </div>

        {/* Aspect Ratio and Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-zinc-900 border border-white/10 p-1 rounded-xl flex items-center gap-1 font-mono text-xs">
            {["2.39:1", "1.85:1", "1.43:1"].map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectMask(ratio)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  aspectMask === ratio
                    ? "bg-amber-400 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          <button
            onClick={addShot}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD SHOT BEAT
          </button>

          <button
            onClick={copyShotlist}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold font-mono text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {copied ? "COPIED SHOTLIST" : "EXPORT SHOTLIST"}
          </button>
        </div>
      </div>

      {/* Storyboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shots.map((shot, idx) => (
          <div
            key={shot.id}
            className="bg-zinc-900/70 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Strip */}
              <div className="px-5 py-3 border-b border-white/10 bg-zinc-900/90 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {shot.scene}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-500">
                    GATE: {aspectMask}
                  </span>
                  <button
                    onClick={() => removeShot(shot.id)}
                    className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                    title="Remove Shot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Shot Frame Preview with Aspect Gate Mask */}
              <div
                className={`relative w-full overflow-hidden bg-black flex items-center justify-center ${
                  aspectMask === "2.39:1"
                    ? "aspect-cinemascope"
                    : aspectMask === "1.85:1"
                    ? "aspect-video"
                    : "aspect-imax"
                }`}
              >
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="w-full h-full object-cover filter brightness-85"
                />

                {/* Rule of Thirds Guide Lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-25">
                  <div className="border-r border-b border-white/40" />
                  <div className="border-r border-b border-white/40" />
                  <div className="border-b border-white/40" />
                  <div className="border-r border-b border-white/40" />
                  <div className="border-r border-b border-white/40" />
                  <div className="border-b border-white/40" />
                  <div className="border-r border-white/40" />
                  <div className="border-r border-white/40" />
                  <div />
                </div>

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white backdrop-blur-xs border border-white/10">
                  FRAME 0{idx + 1}
                </div>
              </div>

              {/* Shot Metadata */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">{shot.title}</h3>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-black/40 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">FRAMING:</span>
                    <span className="text-zinc-200">{shot.type}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">LENS:</span>
                    <span className="text-amber-400">{shot.lens}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 block text-[10px]">MOVEMENT:</span>
                    <span className="text-cyan-400">{shot.movement}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                    DIRECTOR NOTES:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {shot.notes}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                    AUDIO STEM CUE:
                  </span>
                  <p className="text-xs text-amber-300/80 font-mono">
                    ♪ {shot.audioCue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
