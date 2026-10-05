import React, { useState } from "react";
import { Film, Sparkles, Menu, X, Disc, Video, Layers, Sliders, Music, Aperture, PhoneCall } from "lucide-react";

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Film },
    { id: "projects", label: "Films Vault", icon: Video },
    { id: "project-detail", label: "Case Study", icon: Sparkles },
    { id: "studio-3d", label: "3D Stage", icon: Aperture, badge: "LIVE 3D" },
    { id: "storyboard", label: "Storyboard", icon: Layers },
    { id: "color-lab", label: "Color Lab", icon: Sliders },
    { id: "soundtrack", label: "Soundtrack", icon: Music },
    { id: "gear", label: "Gear", icon: Disc },
    { id: "creators", label: "Crew", icon: null },
    { id: "journal", label: "Journal", icon: null },
    { id: "pricing", label: "Pricing", icon: null },
  ];

  const handleNav = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white">
                  CINEMATIC<span className="text-amber-400">.</span>CANVAS
                </span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded tracking-widest hidden sm:inline-block">
                  8K VIRTUAL
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                Next-Gen Film Production
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all relative cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer font-mono tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>BOOK SHOOT</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-zinc-950/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/30 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 px-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => handleNav("contact")}
            className="w-full mt-3 py-3 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            BOOK INQUIRY / SCHEDULE PITCH
          </button>
        </div>
      )}
    </nav>
  );
}
