import React from "react";
import { CREW_MEMBERS } from "../data/mockData";
import { Award, Film, Mail, ArrowUpRight } from "lucide-react";

export default function CrewRoster({ setActivePage }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          THE ARTISANS OF LIGHT & SHADOW
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4">
          CREW & DIRECTORS ROSTER
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-light">
          Meet our multidisciplinary collective of Academy, BAFTA, and Cannes-recognized
          directors, cinematographers, color scientists, and VFX pioneers.
        </p>
      </div>

      {/* Crew Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CREW_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Portrait */}
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Accolades */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {member.bio}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] truncate">{member.awards}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      NOTABLE CREDITS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.films.map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-400"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquire */}
            <div className="px-6 pb-6 pt-2">
              <button
                onClick={() => {
                  setActivePage("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-zinc-950 border border-white/10 text-white font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>BOOK FOR PRODUCTION</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
