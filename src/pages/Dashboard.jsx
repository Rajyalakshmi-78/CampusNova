import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wrench,
  Search,
  Calendar,
  MapPin,
  Bot,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { user, issues, events, registeredEvents, lostFound } = useApp();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openIssuesCount = issues.filter((i) => i.status !== "Resolved").length;
  const activeLostItems = lostFound.filter((i) => i.type === "Lost").length;
  const userRegisteredEvents = events.filter((e) => registeredEvents.includes(e.id));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              CAMPUS TELEMETRY SYNCHRONIZED
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Good day, {user.name}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">
            {user.studentId} • {user.department}
          </p>
        </div>

        {/* Dynamic Date & Time */}
        <div className="bg-slate-100 dark:bg-[#070e20] border border-slate-200 dark:border-white/10 px-4 py-2.5 rounded-2xl font-mono text-xs flex items-center gap-4 text-slate-600 dark:text-slate-300 shadow-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">CAMPUS TIME</span>
            <span className="font-bold text-slate-900 dark:text-white">{currentTime}</span>
          </div>
          <div className="border-l border-slate-200 dark:border-white/10 pl-4">
            <span className="text-[10px] text-slate-400 block">DATE</span>
            <span className="font-bold text-cyan-500">{currentDate}</span>
          </div>
        </div>
      </div>

      {/* 5 Statistics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              CAMPUS STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-500">
            ONLINE
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            All nodes operating
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              OPEN ISSUES
            </span>
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-500">
            {openIssuesCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            In progress / reported
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              UPCOMING EVENTS
            </span>
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-blue-500">
            {registeredEvents.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Registered passes
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              LOST ITEMS
            </span>
            <Search className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-cyan-500">
            {activeLostItems}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Active searches
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              SAFETY STATUS
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-500">
            SECURE
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            100% perimeter clear
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mb-12">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-4">
          QUICK OPERATIONS TERMINAL
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/report"
            className="p-4 rounded-2xl bg-white dark:bg-[#0a1226] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:-translate-y-1 transition-all shadow-xs group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Report Issue
            </span>
          </Link>

          <Link
            to="/lost-found"
            className="p-4 rounded-2xl bg-white dark:bg-[#0a1226] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 hover:-translate-y-1 transition-all shadow-xs group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Find Lost Item
            </span>
          </Link>

          <Link
            to="/events"
            className="p-4 rounded-2xl bg-white dark:bg-[#0a1226] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:-translate-y-1 transition-all shadow-xs group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Explore Events
            </span>
          </Link>

          <Link
            to="/map"
            className="p-4 rounded-2xl bg-white dark:bg-[#0a1226] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:-translate-y-1 transition-all shadow-xs group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Open Map
            </span>
          </Link>

          <Link
            to="/ai"
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white hover:-translate-y-1 transition-all shadow-md shadow-cyan-500/20 group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold font-mono">Ask Nova (3D)</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Activity Timeline + Live Campus Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Activity Timeline (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
              RECENT ACTIVITY TIMELINE
            </h3>
            <span className="text-[10px] font-mono text-cyan-500">LIVE FEED</span>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
            {user.recentActivity.map((act, i) => (
              <div key={i} className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shrink-0 z-10 bg-white dark:bg-slate-900 text-cyan-500">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {act.text}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Campus Activity Chart (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                CAMPUS SPATIAL ACTIVITY PEAKS
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                Hourly Occupancy
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-light">
              Aggregated Wi-Fi density and smart turnstile load across all academic facilities.
            </p>

            {/* Custom Bar Visualization (Cyan and Blue only) */}
            <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-slate-200 dark:border-white/10 pb-2">
              {[
                { time: "08:00", val: 35 },
                { time: "10:00", val: 78 },
                { time: "12:00", val: 94 },
                { time: "14:00", val: 88 },
                { time: "16:00", val: 65 },
                { time: "18:00", val: 42 },
                { time: "20:00", val: 28 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono text-slate-400">
                    {bar.val}%
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 shadow-xs"
                    style={{ height: `${bar.val}%` }}
                  />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {bar.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>PEAK LOAD: 12:00 PM (COMMONS ATRIUM)</span>
            <span className="text-emerald-500">AIR QUALITY: OPTIMAL (AQI 22)</span>
          </div>
        </div>
      </div>

      {/* Registered & Upcoming Events Ribbon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            YOUR REGISTERED CAMPUS PASSES
          </h3>
          <Link
            to="/events"
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View all events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userRegisteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-center gap-4"
            >
              <img
                src={evt.banner}
                alt={evt.title}
                className="w-full sm:w-28 h-24 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-bold">
                  {evt.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
                  {evt.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {evt.date} • {evt.time}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pass Verified & Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
