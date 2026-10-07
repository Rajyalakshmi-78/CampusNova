import React from "react";
import {
  Activity,
  Users,
  Wrench,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Admin() {
  const { issues, events } = useApp();

  const totalIssues = issues.length;
  const resolvedIssues = issues.filter((i) => i.status === "Resolved").length;
  const resolutionRate = Math.round((resolvedIssues / (totalIssues || 1)) * 100);

  const healthMetrics = [
    { label: "Campus Infrastructure Grid", value: 96, color: "bg-cyan-500" },
    { label: "Safety & Blue-Light Mesh", value: 100, color: "bg-emerald-500" },
    { label: "Academic Event Engagement", value: 89, color: "bg-blue-600" },
    { label: "Student Service Satisfaction", value: 94, color: "bg-cyan-400" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            OPERATIONS DESK TELEMETRY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
            CAMPUS INTELLIGENCE
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
            Central command dashboard aggregating real-time incident resolution,
            student engagement, and facility diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#070e20] border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl font-mono text-xs text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>AUTONOMOUS TELEMETRY ENGINE v2.6</span>
        </div>
      </div>

      {/* Top 5 Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>TOTAL STUDENTS</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
            12,482
          </div>
          <span className="text-[10px] text-emerald-500 font-mono mt-1 block">
            ↑ +4.2% this semester
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ISSUES LOGGED</span>
            <Wrench className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-500">
            {totalIssues}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">
            Active tracking
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>RESOLUTION RATE</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-500">
            98.2%
          </div>
          <span className="text-[10px] text-emerald-500 font-mono mt-1 block">
            Target &gt;95% met
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ANNUAL EVENTS</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-500">
            {events.length} Active
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">
            2,450 total seats
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ENGAGEMENT</span>
            <TrendingUp className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-500">
            92.8%
          </div>
          <span className="text-[10px] text-emerald-500 font-mono mt-1 block">
            Active app MAU
          </span>
        </div>
      </div>

      {/* Grid: Campus Health Diagnostics & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Campus Health (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
              CAMPUS HEALTH METRICS
            </h3>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">
              SYS-OK
            </span>
          </div>

          <div className="space-y-4">
            {healthMetrics.map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600 dark:text-slate-300">{m.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {m.value}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues by Category Breakdown (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                ISSUES BY INFRASTRUCTURE DOMAIN
              </h3>
              <span className="text-[10px] font-mono text-cyan-500">Live Census</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-light">
              Distribution of incoming maintenance tickets across campus facilities.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { cat: "Classroom", count: "32%", color: "text-cyan-500" },
                { cat: "Internet", count: "24%", color: "text-blue-500" },
                { cat: "Infrastructure", count: "18%", color: "text-emerald-500" },
                { cat: "Electrical", count: "14%", color: "text-amber-500" },
                { cat: "Transport", count: "8%", color: "text-cyan-400" },
                { cat: "Cleaning", count: "4%", color: "text-blue-400" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center font-mono"
                >
                  <span className={`text-xl font-bold ${item.color}`}>{item.count}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {item.cat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>AUTOMATED TRIAGE DISPATCH: ACTIVE</span>
            <span className="text-cyan-500">AI AUTO-ROUTED: 94%</span>
          </div>
        </div>
      </div>

      {/* Recent Reports Command Center Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
              RECENT ANOMALY REPORTS TABLE
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
              Live audit ledger of facilities tickets submitted across campus zones.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400">
                <th className="py-3 px-3">REPORT ID</th>
                <th className="py-3 px-3">INCIDENT TITLE</th>
                <th className="py-3 px-3">LOCATION</th>
                <th className="py-3 px-3">PRIORITY</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {issues.slice(0, 5).map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">
                    {iss.id}
                  </td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white truncate max-w-xs">
                    {iss.title}
                  </td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                    {iss.location}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        iss.priority === "Critical"
                          ? "bg-red-500/10 text-red-500"
                          : iss.priority === "High"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-slate-100 dark:bg-white/10 text-slate-400"
                      }`}
                    >
                      {iss.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        iss.status === "Resolved"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                          : iss.status === "In Progress"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                      }`}
                    >
                      {iss.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{iss.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
