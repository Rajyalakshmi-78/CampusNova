import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Award,
  Calendar,
  Wrench,
  Search,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Sparkles,
  QrCode,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, logout, issues, registeredEvents, lostFound } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userIssues = issues.filter((i) => i.reportedBy === user.name);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Top Banner & Profile Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e20] shadow-2xl p-6 sm:p-10 mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Avatar with Biometric Border */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-emerald-500 text-slate-950 shadow" title="Biometric Verified">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                ID: {user.studentId}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              {user.department} • {user.year}
            </p>
            <p className="text-xs font-mono text-slate-400">
              {user.email} • Dorm: {user.dormRoom}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono">
              <span className="text-emerald-500 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user.rfidCardStatus}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-blue-500 font-bold">CUMULATIVE GPA: {user.gpa}</span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-xs font-mono font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>SESSION SIGN OUT</span>
          </button>
        </div>
      </div>

      {/* Grid: Achievements & Active Pass Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Achievements (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
              CAMPUS MERIT ACHIEVEMENTS
            </h3>
            <span className="text-[10px] font-mono text-cyan-500">
              3 OF 4 UNLOCKED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all ${
                  ach.unlocked
                    ? "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10"
                    : "bg-slate-100/50 dark:bg-black/30 border-dashed border-slate-300 dark:border-white/10 opacity-60"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      ach.unlocked
                        ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/30"
                        : "bg-slate-200 dark:bg-white/10 text-slate-400"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {ach.unlocked ? `Unlocked • ${ach.date}` : "Locked Milestone"}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Campus Pass Card (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900/60 via-slate-900 to-cyan-900/40 border border-cyan-500/30 shadow-2xl text-white flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                DIGITAL SMART PASS
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-xl font-bold font-mono tracking-wider">
              CAMPUSNOVA UNIVERSAL RFID
            </h4>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Encrypted NFC & Barcode Access for Turnstiles & Labs
            </p>
          </div>

          {/* Visual Barcode / QR Simulation */}
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between text-slate-950">
            <div>
              <p className="text-xs font-bold font-mono">CN-8849-AUTH-PASSPORT</p>
              <p className="text-[10px] text-slate-500 font-mono">
                VALID THROUGH: DEC 2026
              </p>
            </div>
            <QrCode className="w-10 h-10 text-slate-900" />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 pt-2 border-t border-white/10">
            <span>BIOMETRIC SHA-256 SYNC</span>
            <span>ZONE CLEARANCE: UNRESTRICTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
