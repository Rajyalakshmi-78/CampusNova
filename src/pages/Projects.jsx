import React, { useState } from "react";
import { FEATURED_FILMS } from "../data/mockData";
import { Play, Filter, Search, Award, ArrowUpRight, Film, Clock } from "lucide-react";

export default function Projects({ setActivePage, onOpenTrailer }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Sci-Fi",
    "Feature Film",
    "VFX & Virtual Production",
    "Commercial",
    "Documentary",
  ];

  const filteredFilms = FEATURED_FILMS.filter((film) => {
    const matchesCat =
      selectedCategory === "All" || film.category === selectedCategory;
    const matchesSearch =
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          ARCHIVE & SHOWCASE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4">
          THE CINEMA VAULT
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-light">
          Explore our award-winning catalogue spanning festival-lauded feature narratives,
          heavyweight sci-fi world-building, and high-octane luxury commercials.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, director..."
            className="w-full bg-zinc-900/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Film Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Poster/Thumb */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={film.banner}
                  alt={film.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                {/* Aspect Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/10">
                    {film.aspectRatio}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-amber-400/90 text-black px-2 py-0.5 rounded">
                    {film.category}
                  </span>
                </div>

                {/* Play Button Trigger */}
                <button
                  onClick={() => onOpenTrailer(film)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </button>
              </div>

              {/* Film Details */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span>{film.year}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {film.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {film.title}
                </h3>
                <p className="text-xs text-amber-400/80 italic font-serif my-1">
                  "{film.tagline}"
                </p>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                  {film.description}
                </p>

                {/* Laurel Badges */}
                {film.awards && film.awards.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-amber-400/90">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{film.awards[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-white/5">
              <button
                onClick={() => onOpenTrailer(film)}
                className="flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>4K TRAILER</span>
              </button>

              <button
                onClick={() => {
                  setActivePage("project-detail");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>CASE STUDY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
