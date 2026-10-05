import React, { useState, useEffect } from "react";
import { Film, Award, Send, CheckCircle2, Globe, Disc, Mail } from "lucide-react";

export default function Footer({ setActivePage }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [timecode, setTimecode] = useState("01:24:59:12");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${frames}`);
    }, 41); // ~24fps update rate
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-zinc-400">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Bar: SMPTE Timecode & Laurel Recognition */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-white/5 gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              STUDIO TIMECODE:
            </span>
            <span className="font-mono text-sm tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
              {timecode} FPS [24.000]
            </span>
          </div>

          <div className="flex items-center gap-6 text-zinc-500 text-xs font-mono">
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Award className="w-4 h-4 text-amber-500" /> CANNES 2026
            </span>
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Award className="w-4 h-4 text-amber-500" /> VENICE SILVER LION
            </span>
            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Award className="w-4 h-4 text-amber-500" /> BAFTA WINNER
            </span>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center border border-amber-400/40">
                <Film className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-bold text-lg text-white tracking-wider">
                CINEMATIC CANVAS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              A bespoke full-spectrum film production studio and virtual production
              stagecraft lab. Fusing classical optical anamorphic warmth with
              cutting-edge real-time 8K Unreal Engine rendering.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {["IMAX", "ARRI", "RED 8K", "DOLBY ATMOS", "UNREAL 5.5"].map((badge) => (
                <span
                  key={badge}
                  className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              STUDIO PORTALS
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Featured Films Vault", id: "projects" },
                { label: "Chrono Case Study", id: "project-detail" },
                { label: "Live 3D Virtual Stage", id: "studio-3d" },
                { label: "Interactive Storyboard", id: "storyboard" },
                { label: "Color Grading Suite", id: "color-lab" },
                { label: "Audio Scoring Lab", id: "soundtrack" },
                { label: "Technical Gear Arsenal", id: "gear" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Locations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              GLOBAL STAGES
            </h4>
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-semibold text-white">STAGE 01 — LOS ANGELES</p>
                <p className="text-zinc-500">8420 Sunset Blvd, Hollywood, CA</p>
                <p className="text-zinc-500 font-mono text-[11px] mt-0.5">StageCraft LED Volume: 250m²</p>
              </div>
              <div>
                <p className="font-semibold text-white">STAGE 02 — LONDON</p>
                <p className="text-zinc-500">Pinewood Studios, Iver Heath, UK</p>
                <p className="text-zinc-500 font-mono text-[11px] mt-0.5">Underwater & Motion Rig</p>
              </div>
              <div>
                <p className="font-semibold text-white">STAGE 03 — TOKYO</p>
                <p className="text-zinc-500">Roppongi Hills Mori Tower, Minato, JP</p>
                <p className="text-zinc-500 font-mono text-[11px] mt-0.5">ACES Color & Dolby Atmos Lab</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter Screener */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              SCREENER DISPATCH
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Subscribe to receive exclusive 4K festival screeners, behind-the-scenes
              breakdowns, and director commentary podcasts.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the private festival screener list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@studio.com"
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  Encrypted via TLS 1.3. Zero spam policy.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 CINEMATIC CANVAS STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>PRIVACY PROTOCOL</span>
            <span>•</span>
            <span>LICENSING & DCI SPEC</span>
            <span>•</span>
            <span className="text-amber-400/80">REACT 19 + THREE.JS + TAILWIND</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
