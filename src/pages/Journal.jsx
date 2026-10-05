import React, { useState } from "react";
import { JOURNAL_ARTICLES } from "../data/mockData";
import { BookOpen, Clock, ArrowRight, User, X, Heart, MessageSquare } from "lucide-react";

export default function Journal() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const [likes, setLikes] = useState({});

  const categories = [
    "All",
    "Cinematography",
    "Virtual Production",
    "Color Science",
    "Sound Design",
  ];

  const filtered =
    selectedCategory === "All"
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          BEHIND THE CURTAIN
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4">
          CINEMATIC JOURNAL & MASTERCLASSES
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-light">
          Deep-dive technical essays, lighting schematics, Unreal StageCraft workflows,
          and film theory penned directly by our department leads.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-amber-400 text-zinc-950 font-bold"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((art) => (
          <article
            key={art.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded shadow">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {art.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
              <button
                onClick={() => setActiveArticle(art)}
                className="flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
              >
                <span>READ MASTERCLASS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => toggleLike(art.id)}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                <span>{likes[art.id] || 42}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono bg-amber-400 text-zinc-950 font-bold px-2.5 py-0.5 rounded">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-zinc-300 space-y-4 leading-relaxed font-light">
              <p>
                In the era of hyper-clean digital sensors where every pixel is
                mathematically quantized, cinematographers risk losing the fragile
                organic poetry of classical optics.
              </p>
              <p>
                When cylindrical anamorphic elements squeeze a 2.39:1 field of view
                onto a sensor, they introduce asymmetric astigmatism and distinctive
                elliptical blur. The light bends around spherical boundaries, scattering
                subtle cobalt and amber flares across the gate.
              </p>
              <blockquote className="border-l-2 border-amber-400 pl-4 italic text-amber-300/90 font-serif my-4">
                "Imperfection is not a technical failure; it is the fingerprint of humanity
                on the lens."
              </blockquote>
              <p>
                By coupling these physical vintage glass elements with modern ACEScc
                color management, we retain 17 stops of exposure latitude without
                sacrificing the nostalgic, painterly warmth of the 35mm silver era.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Published by Cinematic Canvas Journal
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold font-mono text-xs cursor-pointer"
              >
                CLOSE ESSAY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
