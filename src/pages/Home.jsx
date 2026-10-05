import React, { useState } from "react";
import ThreeCanvasHero from "../components/ThreeCanvasHero";
import { FEATURED_FILMS } from "../data/mockData";
import { Play, Sparkles, Film, ArrowRight, Award, Compass, Eye, ShieldCheck, ChevronRight } from "lucide-react";

export default function Home({ setActivePage, onOpenTrailer }) {
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const activeFilm = FEATURED_FILMS[selectedFilmIndex];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Three.js 3D Floating Particle & Prism Canvas */}
        <ThreeCanvasHero />

        {/* Ambient Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md mb-8 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
              NEXT-GEN VIRTUAL PRODUCTION & 8K ANAMORPHIC CINEMA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            WHERE VISION MEETS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              THE SILVER SCREEN
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-10">
            Cinematic Canvas fuses large-format anamorphic glass, 250m² Unreal Engine LED
            virtual production volumes, and Academy-awarded color science to engineer
            breathtaking worlds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenTrailer(FEATURED_FILMS[0])}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-zinc-950 font-bold font-mono tracking-wider text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              WATCH 2026 REEL (4K)
            </button>

            <button
              onClick={() => setActivePage("studio-3d")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono tracking-wider text-xs sm:text-sm flex items-center justify-center gap-3 backdrop-blur-md hover:border-amber-400/40 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              EXPLORE LIVE 3D STAGE
            </button>
          </div>

          {/* Reel Badges */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>48+ FESTIVAL LAURELS</span>
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400" />
              <span>ARRI RAW 8K ACES</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% PRACTICAL & ICVFX</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/10 bg-zinc-900/40 backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                140+
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Completed Films & Ads
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                $1.2B+
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Box Office & Streaming Reach
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                250m²
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Curved LED Volume Stage
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                98%
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Critic Approval Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPOTLIGHT FILM SHOWCASE */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              FEATURED PRODUCTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              THE HALL OF CINEMA
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {FEATURED_FILMS.map((film, index) => (
              <button
                key={film.id}
                onClick={() => setSelectedFilmIndex(index)}
                className={`w-10 h-10 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedFilmIndex === index
                    ? "bg-amber-400 text-zinc-950 scale-105"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                0{index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Banner Media */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[500px] overflow-hidden group">
              <img
                src={activeFilm.banner}
                alt={activeFilm.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-zinc-950" />
              
              <button
                onClick={() => onOpenTrailer(activeFilm)}
                className="absolute inset-0 flex items-center justify-center group/btn cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-amber-500/90 backdrop-blur-md flex items-center justify-center text-zinc-950 shadow-2xl group-hover/btn:scale-110 group-hover/btn:bg-amber-400 transition-all">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </button>

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  {activeFilm.aspectRatio}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/80 text-black">
                  {activeFilm.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-zinc-500">{activeFilm.year}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-500">{activeFilm.duration}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-amber-400">{activeFilm.rating}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {activeFilm.title}
                </h3>
                <p className="text-sm italic text-amber-300/80 mb-4 font-serif">
                  "{activeFilm.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {activeFilm.description}
                </p>

                {/* Tech Pills */}
                <div className="space-y-2 mb-8 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CAMERA:</span>
                    <span className="text-zinc-200">{activeFilm.techSpecs.camera}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">OPTICS:</span>
                    <span className="text-zinc-200">{activeFilm.techSpecs.lens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">SOUND:</span>
                    <span className="text-zinc-200">{activeFilm.techSpecs.sound}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onOpenTrailer(activeFilm)}
                  className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold font-mono text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  PLAY SCREENER
                </button>
                <button
                  onClick={() => setActivePage("project-detail")}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-colors"
                  title="View Full Case Study"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CINEMATIC CANVAS: 4 PILLARS */}
      <section className="py-20 bg-zinc-900/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              DISRUPTIVE CINEMATOGRAPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              THE FOUR PILLARS OF OUR CRAFT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Large Format Anamorphic",
                desc: "Original Panavision & Cooke cylindrical optics for creamy oval bokeh and horizontal flares.",
                icon: Film,
                badge: "OPTICS",
              },
              {
                title: "StageCraft LED Volumes",
                desc: "Unreal Engine 5.5 photoreal real-time parallax projection eliminating post green-screen keys.",
                icon: Sparkles,
                badge: "UNREAL 5.5",
              },
              {
                title: "Organic Film Science",
                desc: "Sub-tractive Kodak 2383 chemical dye simulation calibrated across 17 stops of exposure latitude.",
                icon: Eye,
                badge: "ACEScc",
              },
              {
                title: "128-Object Dolby Atmos",
                desc: "Sculpted 3D soundscapes mixing analog modular synthesizers with 90-piece European philharmonics.",
                icon: ShieldCheck,
                badge: "SPATIAL 3D",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                    <pillar.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK WORKSPACE NAVIGATION STRIP */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/20 via-zinc-900 to-cyan-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              EXPLORE ALL 12+ SUITES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Dive into our Interactive Film Production Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl">
              From our live 3D Virtual Stage and Color Grading LUT Laboratory to our
              interactive Storyboard canvas and audio scoring stems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("projects")}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono font-bold text-xs tracking-wider transition-colors cursor-pointer"
            >
              FILMS VAULT
            </button>
            <button
              onClick={() => setActivePage("color-lab")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              COLOR LAB
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
