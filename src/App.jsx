import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// =====================================================
// CONTEXT
// =====================================================

import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";

// =====================================================
// GLOBAL COMPONENTS
// =====================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationPanel from "./components/NotificationPanel";
import GlobalSearchModal from "./components/GlobalSearchModal";
import ToastContainer from "./components/ToastContainer";

// =====================================================
// 3D COMPONENT
// =====================================================
// IMPORTANT:
// Your actual file is:
// src/components/Campus3DBackground.jsx
//
// Therefore the import path MUST be exactly this.
// =====================================================

import Campus3DBackground from "./components/Campus3DBackground";

// =====================================================
// PAGES
// =====================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import ReportIssue from "./pages/ReportIssue";
import LostFound from "./pages/LostFound";
import Events from "./pages/Events";
import CampusMap from "./pages/CampusMap";
import AIAssistant from "./pages/AIAssistant";
import Safety from "./pages/Safety";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

// =====================================================
// SCROLL TO TOP
// =====================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// =====================================================
// MAIN APPLICATION CONTENT
// =====================================================

function MainAppContent() {
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        font-sans
        bg-[#F7F4ED]
        text-[#18201C]
        dark:bg-[#0D1511]
        dark:text-[#F5F3EA]
        transition-colors
        duration-300
        relative
        overflow-x-hidden
      "
    >

      {/* =================================================
          CAMPUS 3D BACKGROUND
          ================================================= */}

      <Campus3DBackground />

      {/* =================================================
          SCROLL TO TOP
          ================================================= */}

      <ScrollToTop />

      {/* =================================================
          NAVIGATION BAR
          ================================================= */}

      <Navbar
        onOpenNotifications={() =>
          setNotificationsOpen(true)
        }
        onOpenSearch={() =>
          setSearchOpen(true)
        }
      />

      {/* =================================================
          NOTIFICATION PANEL
          ================================================= */}

      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() =>
          setNotificationsOpen(false)
        }
      />

      {/* =================================================
          GLOBAL SEARCH MODAL
          ================================================= */}

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />

      {/* =================================================
          TOAST NOTIFICATIONS
          ================================================= */}

      <ToastContainer />

      {/* =================================================
          PAGE CONTENT
          ================================================= */}

      <main
        className="
          flex-1
          relative
          z-10
          bg-transparent
          text-gray-900
          dark:text-gray-100
        "
      >

        <Routes>

          {/* =================================================
              HOME
              ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* =================================================
              LOGIN
              ================================================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* =================================================
              DASHBOARD
              ================================================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* =================================================
              ISSUES
              ================================================= */}

          <Route
            path="/issues"
            element={<Issues />}
          />

          {/* =================================================
              REPORT ISSUE
              ================================================= */}

          <Route
            path="/report"
            element={<ReportIssue />}
          />

          {/* =================================================
              LOST & FOUND
              ================================================= */}

          <Route
            path="/lost-found"
            element={<LostFound />}
          />

          {/* =================================================
              EVENTS
              ================================================= */}

          <Route
            path="/events"
            element={<Events />}
          />

          {/* =================================================
              CAMPUS MAP
              ================================================= */}

          <Route
            path="/map"
            element={<CampusMap />}
          />

          {/* =================================================
              AI ASSISTANT
              ================================================= */}

          <Route
            path="/ai"
            element={<AIAssistant />}
          />

          {/* =================================================
              SAFETY
              ================================================= */}

          <Route
            path="/safety"
            element={<Safety />}
          />

          {/* =================================================
              ADMIN
              ================================================= */}

          <Route
            path="/admin"
            element={<Admin />}
          />

          {/* =================================================
              PROFILE
              ================================================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* =================================================
              FALLBACK
              ================================================= */}

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>

      </main>

      {/* =================================================
          FOOTER
          ================================================= */}

      <Footer />

    </div>
  );
}

// =====================================================
// MAIN APP
// =====================================================

export default function App() {
  return (
    <ThemeProvider>

      <AppProvider>

        <BrowserRouter>

          <MainAppContent />

        </BrowserRouter>

      </AppProvider>

    </ThemeProvider>
  );
}