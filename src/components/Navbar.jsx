import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  Bell,
  User,
  Menu,
  X,
  Shield,
  Layers,
  Calendar,
  AlertCircle,
  MapPin,
  Bot,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "../context/AppContext";

export default function Navbar({ onOpenNotifications, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount, isAuthenticated, user } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/issues", label: "Issues" },
    { path: "/lost-found", label: "Lost & Found" },
    { path: "/events", label: "Events" },
    { path: "/map", label: "Map" },
    { path: "/ai", label: "Nova AI", badge: "3D" },
    { path: "/safety", label: "Safety" },
  ];

  const handleMobileNav = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F4ED]/90 dark:bg-[#0D1511]/90 backdrop-blur-xl border-b border-[#D9E1DB] dark:border-[#2D3A32] shadow-sm shadow-[#12372A]/5 dark:shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#12372A] to-[#1F8A5B] p-0.5 shadow-md shadow-[#1F8A5B]/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#12372A] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#E7B84B] group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-[#18201C] dark:text-[#F5F3EA]">
                  CAMPUS<span className="text-[#1F8A5B] dark:text-[#3FAE75]">NOVA</span>
                </span>
                <span className="text-[9px] font-mono font-bold bg-[#1F8A5B]/10 text-[#1F8A5B] dark:text-[#3FAE75] border border-[#1F8A5B]/30 px-1.5 py-0.5 rounded tracking-widest hidden sm:inline-block">
                  SMART v2.6
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#5D6962] dark:text-[#AEB9B1] tracking-wider uppercase">
                Campus Life, Reimagined.
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#1F8A5B] dark:text-[#3FAE75] bg-[#1F8A5B]/10 font-bold border border-[#1F8A5B]/25"
                      : "text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA] hover:bg-[#E5EFE8] dark:hover:bg-[#1C2921]"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-mono bg-[#E7B84B]/20 text-[#8C6B14] dark:text-[#E7B84B] px-1.5 py-0.2 rounded-full border border-[#E7B84B]/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Search, Notifications, Theme Toggle, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA] hover:bg-[#E5EFE8] dark:hover:bg-[#1C2921] border border-[#D9E1DB] dark:border-[#2D3A32] transition-colors cursor-pointer"
              title="Global Campus Search (Ctrl+K)"
              aria-label="Global Campus Search"
            >
              <Search className="w-4 h-4 text-[#1F8A5B] dark:text-[#3FAE75]" />
            </button>

            {/* Notifications Button with unread indicator */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA] hover:bg-[#E5EFE8] dark:hover:bg-[#1C2921] border border-[#D9E1DB] dark:border-[#2D3A32] transition-colors cursor-pointer"
              title="Campus Telemetry Notifications"
              aria-label="Campus Notifications"
            >
              <Bell className="w-4 h-4 text-[#5D6962] dark:text-[#AEB9B1]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E7B84B] text-[#18201C] text-[10px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Visible Theme Toggle */}
            <ThemeToggle />

            {/* Profile Avatar / Login */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-2 pl-1 group"
                title="Student Profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#1F8A5B]/50 group-hover:scale-105 transition-transform"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1F8A5B] hover:bg-[#19724B] active:bg-[#135A3B] text-white font-mono text-xs font-semibold shadow-md shadow-[#1F8A5B]/20 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>SIGN IN</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA] hover:bg-[#E5EFE8] dark:hover:bg-[#1C2921] border border-[#D9E1DB] dark:border-[#2D3A32] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F4ED]/95 dark:bg-[#0D1511]/95 border-b border-[#D9E1DB] dark:border-[#2D3A32] px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleMobileNav(link.path)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#1F8A5B] dark:text-[#3FAE75] bg-[#1F8A5B]/10 font-bold border border-[#1F8A5B]/30"
                      : "text-[#5D6962] dark:text-[#AEB9B1] hover:text-[#18201C] dark:hover:text-[#F5F3EA] hover:bg-[#E5EFE8] dark:hover:bg-[#1C2921]"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono bg-[#E7B84B]/20 text-[#8C6B14] dark:text-[#E7B84B] px-1 rounded">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D9E1DB] dark:border-[#2D3A32] flex items-center justify-between">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-[#1F8A5B] dark:text-[#3FAE75] hover:underline flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Campus Intelligence / Admin</span>
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-[#1F8A5B] hover:bg-[#19724B] text-white"
            >
              {isAuthenticated ? "My Profile" : "Sign In"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
