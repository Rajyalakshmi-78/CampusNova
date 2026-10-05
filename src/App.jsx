import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SoundPlayer from "./components/SoundPlayer";
import VideoModal from "./components/VideoModal";

// 12 Dedicated Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Studio3D from "./pages/Studio3D";
import Storyboard from "./pages/Storyboard";
import ColorLab from "./pages/ColorLab";
import Soundtrack from "./pages/Soundtrack";
import GearArsenal from "./pages/GearArsenal";
import CrewRoster from "./pages/CrewRoster";
import Journal from "./pages/Journal";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [trailerFilm, setTrailerFilm] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleOpenTrailer = (film) => {
    setTrailerFilm(film);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setTrailerFilm(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Navigation Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Multi-Page Switcher */}
      <main className="flex-1">
        {activePage === "home" && (
          <Home setActivePage={setActivePage} onOpenTrailer={handleOpenTrailer} />
        )}
        {activePage === "projects" && (
          <Projects setActivePage={setActivePage} onOpenTrailer={handleOpenTrailer} />
        )}
        {activePage === "project-detail" && (
          <ProjectDetail setActivePage={setActivePage} onOpenTrailer={handleOpenTrailer} />
        )}
        {activePage === "studio-3d" && <Studio3D />}
        {activePage === "storyboard" && <Storyboard />}
        {activePage === "color-lab" && <ColorLab />}
        {activePage === "soundtrack" && <Soundtrack />}
        {activePage === "gear" && <GearArsenal />}
        {activePage === "creators" && <CrewRoster setActivePage={setActivePage} />}
        {activePage === "journal" && <Journal />}
        {activePage === "pricing" && <Pricing setActivePage={setActivePage} />}
        {activePage === "contact" && <Contact />}
      </main>

      {/* Persistent Audio Synthesizer Player */}
      <SoundPlayer />

      {/* 4K Cinema Trailer Modal */}
      <VideoModal
        film={trailerFilm}
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
      />

      {/* Full Cinematic Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
