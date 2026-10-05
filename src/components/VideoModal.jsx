import React, { useRef, useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film } from "lucide-react";

export default function VideoModal({ film, isOpen, onClose }) {
  if (!isOpen || !film) return null;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCinemaScope, setIsCinemaScope] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            <Film className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              OFFICIAL 4K TRAILER SCREENER
            </span>
            <span className="text-zinc-600">|</span>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              {film.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen with Optional CinemaScope Aspect Letterboxing */}
        <div
          className={`relative bg-black flex items-center justify-center overflow-hidden transition-all duration-500 ${
            isCinemaScope ? "aspect-cinemascope" : "aspect-video"
          }`}
        >
          {/* Top/Bottom Matte Bars indicator */}
          {isCinemaScope && (
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/80 z-10 border-b border-white/5 pointer-events-none flex items-center px-4">
              <span className="text-[10px] font-mono text-zinc-600">2.39:1 ANAMORPHIC GATE</span>
            </div>
          )}

          <video
            ref={videoRef}
            src={film.trailerUrl}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Quick Play/Pause Center Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/80 backdrop-blur-md flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </div>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-zinc-900/90 border-t border-white/10 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-xs font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              TIME: 00:01:42:18
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCinemaScope(!isCinemaScope)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isCinemaScope
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {isCinemaScope ? "2.39:1 SCOPE" : "16:9 FLAT"}
            </button>
            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              title="Full Screen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
