import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Issues() {
  const { issues } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "All",
    "Classroom",
    "Electrical",
    "Infrastructure",
    "Cleaning",
    "Internet",
    "Transport",
    "Other",
  ];

  const statuses = ["All", "Reported", "In Progress", "Resolved", "Critical"];
  const priorities = ["All", "Critical", "High", "Medium", "Low"];

  // Filtering
  const filtered = issues
    .filter((item) => {
      const matchCat = selectedCat === "All" || item.category === selectedCat;
      const matchStatus = selectedStatus === "All" || item.status === selectedStatus;
      const matchPri = selectedPriority === "All" || item.priority === selectedPriority;
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchPri && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return (order[b.priority] || 0) - (order[a.priority] || 0);
      }
      return 0; // Default order
    });

  // Status badge styling (Blue = Reported, Orange = In Progress, Green = Resolved, Red = Critical)
  const getStatusBadge = (status) => {
    switch (status) {
      case "Reported":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "In Progress":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Critical":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            INCIDENT TELEMETRY & FACILITY LOGISTICS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
            SMART CAMPUS ISSUES
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
            "See it. Report it. Track it. Resolve it."
          </p>
        </div>

        <Link
          to="/report"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>SUBMIT REPORT</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#070e20] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID (e.g. CN-2048), description, or location..."
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">STATUS:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {statuses.map((s) => (
                <option key={s} value={s} className="bg-white dark:bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">PRIORITY:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {priorities.map((p) => (
                <option key={p} value={p} className="bg-white dark:bg-slate-900">
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCat === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((issue) => (
          <div
            key={issue.id}
            className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e20] overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 px-2 py-0.5 rounded">
                    {issue.id}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
                    {issue.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border backdrop-blur-md ${getStatusBadge(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    {issue.location}
                  </span>
                  <span>{issue.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {issue.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-2">
                  {issue.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">PRIORITY:</span>
                    <span
                      className={`text-[11px] font-bold ${
                        issue.priority === "Critical"
                          ? "text-red-500"
                          : issue.priority === "High"
                          ? "text-amber-500"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">ASSIGNED:</span>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[170px]">
                      {issue.assignedTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-3">
              <span className="text-[10px] font-mono text-slate-400">
                Logged by {issue.reportedBy}
              </span>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                TELEMETRY ACTIVE
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
