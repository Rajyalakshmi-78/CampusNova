import React, { useState } from "react";
import {
  Search,
  Plus,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Sparkles,
  Package,
  Phone,
  User,
  Filter,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LostFound() {
  const { lostFound, addLostFoundItem, user } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All"); // 'All', 'Lost', 'Found'
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Lost"); // 'Lost' or 'Found'

  // Modal Form State
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemCat, setNewItemCat] = useState("Electronics");
  const [newItemLocation, setNewItemLocation] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const categories = [
    "All",
    "ID Cards",
    "Electronics",
    "Bags",
    "Books",
    "Accessories",
    "Other",
  ];

  const filtered = lostFound.filter((item) => {
    const matchCat = selectedCat === "All" || item.category === selectedCat;
    const matchType = typeFilter === "All" || item.type === typeFilter;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !newItemLocation.trim()) return;

    const item = {
      id: "lf-" + Date.now(),
      type: modalType,
      title: newItemTitle,
      category: newItemCat,
      location: newItemLocation,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80",
      description: newItemDesc || "Reported via smart campus matching ledger.",
      matchPercent: Math.floor(75 + Math.random() * 23),
      matchItemTitle: `Potential match in ${newItemLocation}`,
      status: modalType === "Lost" ? "Searching Grid" : "Logged at Desk",
      contactName: user.name,
      contactPhone: "+1 (555) 019-8849",
    };

    addLostFoundItem(item);
    setModalOpen(false);
    setNewItemTitle("");
    setNewItemLocation("");
    setNewItemDesc("");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
          AUTOMATED RECOVERY LEDGER
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
          LOST SOMETHING? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            LET'S FIND IT.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
          CampusNova's algorithmic similarity matching indexes campus lost and found
          reports with intelligent photo embeddings and location proximity scores.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => handleOpenModal("Lost")}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            REPORT LOST ITEM
          </button>
          <button
            onClick={() => handleOpenModal("Found")}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            REPORT FOUND ITEM
          </button>
        </div>
      </div>

      {/* Large Search Bar */}
      <div className="max-w-3xl mx-auto mb-8 relative">
        <Search className="w-5 h-5 text-cyan-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by keywords: MacBook, Student ID, Backpack, Library Pods..."
          className="w-full bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-md"
        />
      </div>

      {/* Filters Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                selectedCat === cat
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">TYPE:</span>
          {["All", "Lost", "Found"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                typeFilter === t
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Item Cards Grid with Smart Match Circular Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e20] overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow ${
                      item.type === "Lost"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-cyan-500 text-slate-950"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    {item.location}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-2">
                  {item.description}
                </p>

                {/* Smart Match Percentage Circular Indicator */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                      SMART MATCH ALGORITHM
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {item.matchItemTitle}
                    </span>
                  </div>

                  {/* SVG Circular Progress Meter (Cyan & Blue) */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-white/10"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-cyan-500"
                        strokeDasharray={`${item.matchPercent}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-cyan-500">
                      {item.matchPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact / Claim */}
            <div className="px-6 pb-6 pt-0 border-t border-slate-200 dark:border-white/5 pt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {item.contactName}
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form for Reporting Item */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                REPORT {modalType.toUpperCase()} ITEM
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">
                  ITEM TITLE / MODEL
                </label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="e.g. Blue Hydro Flask or AirPods Pro Case"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={newItemCat}
                    onChange={(e) => setNewItemCat(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>Electronics</option>
                    <option>ID Cards</option>
                    <option>Bags</option>
                    <option>Books</option>
                    <option>Accessories</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">
                    LOCATION FOUND / LOST
                  </label>
                  <input
                    type="text"
                    required
                    value={newItemLocation}
                    onChange={(e) => setNewItemLocation(e.target.value)}
                    placeholder="e.g. Library 2nd Floor"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">
                  DESCRIPTION & NOTABLE MARKS
                </label>
                <textarea
                  rows={3}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Color, serial badges, stickers, condition..."
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider cursor-pointer transition-all shadow-md"
              >
                PUBLISH {modalType.toUpperCase()} ITEM TO LEDGER
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
