import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Shield, ArrowRight, CheckCircle2, Lock, User, KeyRound } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please provide your Student ID (e.g. CN-8849) or campus email.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your campus authentication password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(identifier, password);
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  const fillDemoCredentials = () => {
    setIdentifier("CN-8849");
    setPassword("campusnova2026");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-slate-900 dark:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#070e22]/90 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white mx-auto mb-4 shadow-md shadow-cyan-500/25">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              CAMPUS<span className="text-cyan-500">NOVA</span> AUTH
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
              Student Biometric & RFID Gateway
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">
                STUDENT ID OR UNIVERSITY EMAIL
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="CN-8849 or alex.rivera@campusnova.edu"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">
                CAMPUS ACCESS KEY / PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING TELEMETRY...</span>
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Auto-Fill Demo Student Credentials</span>
            </button>
            <p className="text-[10px] font-mono text-slate-400 mt-2">
              Alex Rivera • CN-8849 (Senior Computer Science & AI)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
