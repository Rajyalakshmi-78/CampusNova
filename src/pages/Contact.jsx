import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, ShieldCheck, Clock, MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Feature Film",
    budget: "$75,000 - $150,000",
    shootDate: "",
    synopsis: "",
    ndaRequired: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire golden cinematic confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#06b6d4", "#ffffff", "#d97706"],
      });
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          PRINCIPAL PHOTOGRAPHY & STAGE BOOKINGS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4">
          INITIATE PRODUCTION
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm font-light">
          Submit your script synopsis, treatment, or commercial brief. Our executive
          producers and technical supervisors review submissions within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-mono">
                DISPATCH TRANSMITTED
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>.
                Your production docket for <span className="text-amber-400">{formData.projectType}</span>{" "}
                has been routed to our Los Angeles and London production desks. An executive producer will contact you directly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  SUBMIT ANOTHER BRIEF
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                    YOUR NAME / DIRECTOR
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Christopher Nolan"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                    STUDIO / PRODUCTION EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="producer@synapsefilms.com"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                    PROJECT FORMAT
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Feature Film (Theatrical)</option>
                    <option>Commercial / Brand Anthem</option>
                    <option>Festival Narrative Short</option>
                    <option>StageCraft Virtual Production</option>
                    <option>Documentary / Expedition</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                    ESTIMATED BUDGET TIER
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>$28,000 - $50,000 (Indie)</option>
                    <option>$75,000 - $150,000 (Commercial)</option>
                    <option>$150,000 - $500,000 (Mid-Feature)</option>
                    <option>$500,000+ (Virtual Production Epic)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                  TARGET PRINCIPAL PHOTOGRAPHY DATE
                </label>
                <input
                  type="date"
                  value={formData.shootDate}
                  onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                  SCRIPT SYNOPSIS & TECHNICAL VISION
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.synopsis}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  placeholder="Describe your story, visual references (e.g., Blade Runner 2049, Dune), preferred camera format, and number of shooting days..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="nda"
                  checked={formData.ndaRequired}
                  onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
                <label htmlFor="nda" className="text-xs text-zinc-300 font-mono cursor-pointer">
                  Request mutual Non-Disclosure Agreement (NDA) prior to script transmission
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold font-mono text-xs tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                TRANSMIT PRODUCTION BRIEF
              </button>
            </form>
          )}
        </div>

        {/* Studio Stages & Direct Comms (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              DIRECT DESK DISPATCH
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">production@cinematiccanvas.studio</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">+1 (310) 842-9900 (Hollywood Desk)</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">Encrypted ACES 2048-Bit Vault</span>
              </div>
            </div>
          </div>

          {/* Stage Hubs */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              GLOBAL STAGES & TIMEZONES
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">LOS ANGELES (HQ)</span>
                  <span className="text-[10px] font-mono text-amber-400">PST [ACTIVE]</span>
                </div>
                <p className="text-zinc-500">Sunset Gower Studios, Stage 6</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">LONDON STAGE</span>
                  <span className="text-[10px] font-mono text-cyan-400">GMT [ACTIVE]</span>
                </div>
                <p className="text-zinc-500">Pinewood 007 Sound Stage, Iver Heath</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">TOKYO POST LAB</span>
                  <span className="text-[10px] font-mono text-emerald-400">JST [ACTIVE]</span>
                </div>
                <p className="text-zinc-500">Roppongi Hills Dolby Atmos Master Suite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
