import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Ticket,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Events() {
  const { events, registeredEvents, registerForEvent } = useApp();
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Hackathon",
    "Cultural",
    "Sports",
    "Workshop",
    "Clubs",
  ];

  const featured = events.find((e) => e.featured) || events[0];
  const isFeaturedRegistered = registeredEvents.includes(featured.id);

  const filtered =
    selectedCat === "All"
      ? events.filter((e) => e.id !== featured.id)
      : events.filter((e) => e.category === selectedCat);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Page Title */}
      <div className="mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
          CAMPUS DISCOVERY & CONVENTIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 mb-2">
          CAMPUS EVENTS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
          Discover high-impact hackathons, academic keynotes, athletic tournaments, and cultural galas.
        </p>
      </div>

      {/* Featured Event Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl mb-14 bg-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          <div className="lg:col-span-7 relative overflow-hidden group">
            <img
              src={featured.banner}
              alt={featured.title}
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded shadow">
                FLAGSHIP CONVENTION
              </span>
              <span className="text-[10px] font-mono bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/10">
                {featured.category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-[#070e20]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.date}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{featured.time}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                {featured.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-4">
                {featured.description}
              </p>

              <div className="space-y-2 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-xs font-mono mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">VENUE:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    {featured.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KEYNOTE:</span>
                  <span className="text-cyan-500 font-bold">{featured.speaker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PARTICIPANTS:</span>
                  <span className="text-emerald-500 font-bold">
                    {featured.participants} / {featured.maxSeats} Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => registerForEvent(featured.id)}
                className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isFeaturedRegistered
                    ? "bg-emerald-500 text-slate-950 shadow-md"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
                }`}
              >
                {isFeaturedRegistered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PASS ACTIVE (CLICK TO CANCEL)</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>REGISTER FOR SMART PASS NOW</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              selectedCat === cat
                ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upcoming Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((evt) => {
          const isRegistered = registeredEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e20] overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={evt.banner}
                    alt={evt.title}
                    className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded shadow">
                      {evt.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/10">
                      {evt.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {evt.date}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {evt.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="pt-2 text-xs font-mono text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>
                        {evt.participants} / {evt.maxSeats} attending
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => registerForEvent(evt.id)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isRegistered
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-100 dark:bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>REGISTERED (CLICK TO CANCEL)</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-3.5 h-3.5" />
                      <span>REGISTER PASS</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
