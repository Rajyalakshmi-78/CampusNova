import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Shield, Cpu, Activity, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EEF3EE] dark:bg-[#0D1511] border-t border-[#D9E1DB] dark:border-[#2D3A32] pt-16 pb-12 text-[#5D6962] dark:text-[#AEB9B1] text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-[#D9E1DB] dark:border-[#2D3A32] gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#1F8A5B] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#18201C] dark:text-[#F5F3EA] font-bold">
              CAMPUSNOVA TELEMETRY CORE: ONLINE
            </span>
            <span className="text-[#D9E1DB] dark:text-[#2D3A32]">|</span>
            <span className="text-[11px] font-mono text-[#1F8A5B] dark:text-[#3FAE75] font-semibold">
              99.98% NODE UPTIME
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-[#5D6962] dark:text-[#AEB9B1]">
            <span>LATENCY: 12ms</span>
            <span>•</span>
            <span>NODES: 48 ACTIVE</span>
            <span>•</span>
            <span>BIOPHILIC DIGITAL TWIN</span>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#12372A] to-[#1F8A5B] flex items-center justify-center text-[#E7B84B] shadow-sm shadow-[#1F8A5B]/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-[#18201C] dark:text-[#F5F3EA] tracking-wider">
                CAMPUS<span className="text-[#1F8A5B] dark:text-[#3FAE75]">NOVA</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#5D6962] dark:text-[#AEB9B1] font-light">
              Autonomous digital campus platform uniting smart student logistics,
              facility intelligence, 3D spatial navigation, and sustainable infrastructure.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1F8A5B]/10 text-[#1F8A5B] dark:text-[#3FAE75] border border-[#1F8A5B]/30 font-semibold">
                REACT 19
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E7B84B]/15 text-[#8C6B14] dark:text-[#E7B84B] border border-[#E7B84B]/30 font-semibold">
                THREE.JS 3D
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E5EFE8] dark:bg-[#1C2921] text-[#18201C] dark:text-[#AEB9B1] border border-[#D9E1DB] dark:border-[#2D3A32]">
                TAILWIND V4
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#18201C] dark:text-[#F5F3EA] font-bold mb-4">
              CAMPUS SERVICES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/dashboard" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/issues" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Smart Issues Ledger
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Report Facility Fault
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Lost & Found Matching Portal
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Campus Events Discovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Intelligence & Safety */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#18201C] dark:text-[#F5F3EA] font-bold mb-4">
              INTELLIGENCE & MAPS
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/map" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Interactive Campus Map
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Nova AI 3D Companion
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Campus Safety Command
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Campus Intelligence Telemetry
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75] transition-colors">
                  Verified Student Identity
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Rapid Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#18201C] dark:text-[#F5F3EA] font-bold mb-4">
              CAMPUS DISPATCH
            </h4>
            <div className="space-y-3 font-mono text-[11px]">
              <div>
                <span className="text-[#5D6962] dark:text-[#AEB9B1] block">EMERGENCY LINE:</span>
                <span className="text-[#C94A3A] font-bold">1-800-NOVA-911</span>
              </div>
              <div>
                <span className="text-[#5D6962] dark:text-[#AEB9B1] block">IT HELP DESK:</span>
                <span className="text-[#1F8A5B] dark:text-[#3FAE75] font-semibold">it.support@campusnova.edu</span>
              </div>
              <div>
                <span className="text-[#5D6962] dark:text-[#AEB9B1] block">CAMPUS DISPATCH DESK:</span>
                <span className="text-[#18201C] dark:text-[#F5F3EA]">Main Block Level 1, Atrium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D9E1DB] dark:border-[#2D3A32] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#5D6962] dark:text-[#AEB9B1]">
          <p>© 2026 CAMPUSNOVA PLATFORMS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <Link to="/safety" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75]">SAFETY PROTOCOLS</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-[#1F8A5B] dark:hover:text-[#3FAE75]">ADMIN ACCESS</Link>
            <span>•</span>
            <span className="text-[#1F8A5B] dark:text-[#3FAE75]">BIOPHILIC DIGITAL TWIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
