import React, { useState } from "react";
import {
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  Flame,
  HeartPulse,
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  ShieldAlert,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Safety() {
  const { addToast } = useApp();
  const [activeCall, setActiveCall] = useState(null);

  const triggerEmergency = (serviceName, number) => {
    setActiveCall(serviceName);
    addToast(`Emergency Dispatch initiated for ${serviceName} (${number}). Connecting...`, "warning");
    setTimeout(() => {
      setActiveCall(null);
    }, 4000);
  };

  const emergencyActions = [
    {
      title: "Campus Security Desk",
      desc: "Immediate security escort & incident response",
      number: "+1 (555) 019-9111",
      icon: ShieldCheck,
      color: "border-blue-500/40 text-blue-500 bg-blue-500/10",
      btnColor: "bg-blue-600 hover:bg-blue-500 text-white",
    },
    {
      title: "Medical Trauma & First Aid",
      desc: "24/7 on-campus ambulance & ER physicians",
      number: "+1 (555) 019-9222",
      icon: HeartPulse,
      color: "border-emerald-500/40 text-emerald-500 bg-emerald-500/10",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
    },
    {
      title: "Fire & Hazmat Emergency",
      desc: "Immediate building evacuation & fire control",
      number: "+1 (555) 019-9333",
      icon: Flame,
      color: "border-red-500/40 text-red-500 bg-red-500/10",
      btnColor: "bg-red-600 hover:bg-red-500 text-white",
    },
    {
      title: "Emergency Distress Beacon",
      desc: "Activate nearest smart blue-light tower audio",
      number: "PERIMETER-BROADCAST",
      icon: Radio,
      color: "border-cyan-500/40 text-cyan-500 bg-cyan-500/10",
      btnColor: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold",
    },
  ];

  const safetyZones = [
    { name: "Central Quadrangle Atrium", status: "Secure", patrol: "Unit Alpha (Mobile Cart)" },
    { name: "North Engineering Plaza", status: "Secure", patrol: "Stationary Post 4" },
    { name: "Science Research Skybridge", status: "Secure", patrol: "Smart Turnstile Node" },
    { name: "Residential Hostel Perimeter", status: "Secure", patrol: "Unit Gamma (K9 Escort)" },
    { name: "South Athletics Parking", status: "Secure", patrol: "Autonomous Camera Drone" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            RAPID RESPONSE & EMERGENCY TELEMETRY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
            CAMPUS SAFETY CENTER
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
            24/7 unified emergency dispatch, verified safe zones, and automated perimeter monitoring.
          </p>
        </div>

        {/* Big Status Badge */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-2xl">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">CAMPUS PERIMETER</span>
            <span className="text-sm font-black font-mono text-emerald-500 tracking-wider">
              🟢 CAMPUS SECURE
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Action Cards (4 Services) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {emergencyActions.map((action, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow"
          >
            <div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${action.color}`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {action.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light">
                {action.desc}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 block mb-2">
                DISPATCH LINE: {action.number}
              </span>
              <button
                onClick={() => triggerEmergency(action.title, action.number)}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${action.btnColor}`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>CONNECT DISPATCH</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Emergency Map Representation & Safety Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Safety Zones Status (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
              CAMPUS SAFETY ZONES
            </h3>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">
              100% MONITORED
            </span>
          </div>

          <div className="space-y-3">
            {safetyZones.map((zone, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {zone.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    Patrol: {zone.patrol}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{zone.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Evacuation & Exits Grid (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                EMERGENCY BLUE-LIGHT TOWER MESH
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                18 Towers Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
              Pressing the emergency switch on any illuminated tower sounds a localized
              110dB siren, flashes high-intensity strobe beacons, and activates 360° HD camera recording.
            </p>

            {/* Visual Mesh Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { code: "TWR-01", loc: "North Library Walkway", time: "< 30s response" },
                { code: "TWR-02", loc: "CSE Engineering Annex", time: "< 30s response" },
                { code: "TWR-03", loc: "Student Quad West", time: "< 30s response" },
                { code: "TWR-04", loc: "Athletics Arena Path", time: "< 30s response" },
                { code: "TWR-05", loc: "Science Complex Pond", time: "< 30s response" },
                { code: "TWR-06", loc: "South Mobility Hub", time: "< 30s response" },
              ].map((tw, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1 text-xs font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-500">{tw.code}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-800 dark:text-slate-200 font-sans truncate">
                    {tw.loc}
                  </p>
                  <span className="text-[10px] text-slate-400 block">{tw.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>MEDICAL CENTER ON-DUTY CHIEF: DR. T. REEVES</span>
            <span className="text-cyan-500">DEFIBRILLATOR (AED) READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
