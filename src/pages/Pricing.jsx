import React, { useState } from "react";
import { PRICING_TIERS } from "../data/mockData";
import { Check, Calculator, ChevronDown, ChevronUp, Sparkles, Shield, ArrowRight } from "lucide-react";

export default function Pricing({ setActivePage }) {
  // Interactive Budget Calculator State
  const [shootDays, setShootDays] = useState(3);
  const [cameraTier, setCameraTier] = useState("arri"); // 'arri', 'red8k', 'imax'
  const [ledDays, setLedDays] = useState(1);
  const [includeDolby, setIncludeDolby] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic estimate calculation
  const calculateTotal = () => {
    let base = shootDays * 7500;
    if (cameraTier === "arri") base += shootDays * 2500;
    if (cameraTier === "red8k") base += shootDays * 3200;
    if (cameraTier === "imax") base += shootDays * 5500;
    base += ledDays * 12000;
    if (includeDolby) base += 8500;
    return base;
  };

  const faqs = [
    {
      q: "Do you provide full DCI-P3 Theatrical DCP and Dolby Vision deliverables?",
      a: "Yes. Every production includes final master DCP (Digital Cinema Package) for commercial festival projection, uncompressed 16-bit TIFF/EXR archives, ProRes 4444 XQ, and Dolby Vision HDR metadata containers.",
    },
    {
      q: "How does your StageCraft LED Volume compare to traditional green screen?",
      a: "Our 250m² curved LED volume provides real-time parallax lighting directly onto actors, eliminating green light spill and reducing post-production VFX turnaround times by up to 60%.",
    },
    {
      q: "Can we hire individual department heads (e.g. only Cinematographer or Colorist)?",
      a: "Yes. In addition to turnkey packages, our directors, ASC/BSC cinematographers, and chief colorists can be attached to external productions as independent heads of department.",
    },
    {
      q: "What is your typical production timeline from script to final festival lock?",
      a: "Commercials and brand anthems typically deliver in 3–5 weeks. Narrative short films range from 6–10 weeks. Feature films follow custom principal photography schedules.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          TRANSPARENT PRODUCTION TIERS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4">
          PACKAGES & PRODUCTION SCOPE
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm font-light">
          From festival-contending narrative shorts to global broadcast campaigns and
          virtual production features, select an established tier or configure your custom budget below.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl border p-8 flex flex-col justify-between transition-all relative ${
              tier.highlight
                ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-amber-400 shadow-2xl shadow-amber-500/10 scale-100 lg:-translate-y-2"
                : "bg-zinc-900/60 border-white/10 hover:border-white/20"
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
                {tier.badge}
              </span>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-zinc-400 min-h-[36px]">{tier.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-2 pb-6 border-b border-white/10 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  {tier.price}
                </span>
                <span className="text-xs font-mono text-zinc-500">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setActivePage("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer ${
                tier.highlight
                  ? "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg hover:shadow-amber-500/30"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              INQUIRE FOR THIS PACKAGE
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Budget Estimator */}
      <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-white/15 shadow-2xl mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              INTERACTIVE SHOOT ESTIMATOR
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              Adjust parameters in real-time to compute estimated production investment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {/* Shoot Days */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">Principal Shoot Days:</span>
              <span className="text-amber-400 font-bold">{shootDays} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={shootDays}
              onChange={(e) => setShootDays(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
              Grip & Electric crew included
            </span>
          </div>

          {/* Camera Package */}
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-2">
              Camera & Optics Rig:
            </span>
            <select
              value={cameraTier}
              onChange={(e) => setCameraTier(e.target.value)}
              className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            >
              <option value="arri">ARRI Alexa 35 + Cooke /i</option>
              <option value="red8k">RED V-Raptor XL 8K + Blackwing7</option>
              <option value="imax">IMAX 65mm & Master Primes</option>
            </select>
          </div>

          {/* LED Volume Days */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">Virtual Volume Days:</span>
              <span className="text-cyan-400 font-bold">{ledDays} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              value={ledDays}
              onChange={(e) => setLedDays(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
              250m² Unreal Engine 5.5 Stage
            </span>
          </div>

          {/* Dolby Mix */}
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-2">
              Theatrical Audio:
            </span>
            <label className="flex items-center gap-2 text-xs font-mono text-white cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={includeDolby}
                onChange={(e) => setIncludeDolby(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded"
              />
              <span>Dolby Atmos 7.1.4 Mix</span>
            </label>
          </div>
        </div>

        {/* Estimated Price Display */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              ESTIMATED BASE PRODUCTION COST
            </span>
            <div className="text-3xl sm:text-5xl font-black text-amber-400 font-mono mt-1">
              ${calculateTotal().toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              *Excludes actor talent fees, location permits, and catering.
            </span>
          </div>

          <button
            onClick={() => {
              setActivePage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-xl hover:scale-105"
          >
            <span>LOCK ESTIMATE & BOOK CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-white text-center mb-6">
          FREQUENTLY ASKED QUESTIONS
        </h3>
        {faqs.map((f, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden"
          >
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full p-5 text-left text-xs sm:text-sm font-semibold text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span>{f.q}</span>
              {openFaq === i ? (
                <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
            </button>
            {openFaq === i && (
              <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
