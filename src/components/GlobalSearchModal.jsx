import React, { useState, useEffect } from "react";
import { Search, X, Calendar, Wrench, Building2, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { CAMPUS_BUILDINGS } from "../data/buildings";

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const { events, issues, lostFound } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      )
    : [];

  const matchedIssues = q
    ? issues.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      )
    : [];

  const matchedBuildings = q
    ? CAMPUS_BUILDINGS.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.shortCode.toLowerCase().includes(q)
      )
    : [];

  const matchedLostFound = q
    ? lostFound.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedEvents.length + matchedIssues.length + matchedBuildings.length + matchedLostFound.length;

  const handleSelect = (route) => {
    onClose();
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50/50 dark:bg-white/5">
          <Search className="w-5 h-5 text-cyan-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, issues, campus buildings, lost items..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!q && (
            <div className="text-center py-10 space-y-3">
              <p className="text-xs font-mono text-slate-400">
                TYPE TO SEARCH CAMPUSNOVA INTELLIGENCE
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Library", "Hackathon", "Air Conditioning", "MacBook", "CSE Block"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-500 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs font-mono">
              No matching campus records found for "{query}".
            </div>
          )}

          {/* Events */}
          {matchedEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500 font-bold block mb-2">
                CAMPUS EVENTS ({matchedEvents.length})
              </span>
              <div className="space-y-1.5">
                {matchedEvents.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => handleSelect("/events")}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between text-left transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {evt.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {evt.date} • {evt.location}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Issues */}
          {matchedIssues.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 font-bold block mb-2">
                CAMPUS ISSUES ({matchedIssues.length})
              </span>
              <div className="space-y-1.5">
                {matchedIssues.map((iss) => (
                  <button
                    key={iss.id}
                    onClick={() => handleSelect("/issues")}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between text-left transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="w-4 h-4 text-cyan-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          [{iss.id}] {iss.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {iss.location} • Status: {iss.status}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buildings */}
          {matchedBuildings.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
                CAMPUS BUILDINGS & NAVIGATION ({matchedBuildings.length})
              </span>
              <div className="space-y-1.5">
                {matchedBuildings.map((bld) => (
                  <button
                    key={bld.id}
                    onClick={() => handleSelect("/map")}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between text-left transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {bld.name} ({bld.shortCode})
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {bld.hours} • Occupancy: {bld.occupancyRate}%
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lost & Found */}
          {matchedLostFound.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-2">
                LOST & FOUND LEDGER ({matchedLostFound.length})
              </span>
              <div className="space-y-1.5">
                {matchedLostFound.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect("/lost-found")}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between text-left transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          [{item.type}] {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {item.location} • Match: {item.matchPercent}%
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
