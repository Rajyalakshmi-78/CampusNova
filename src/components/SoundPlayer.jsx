import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Disc } from "lucide-react";

export default function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscNodesRef = useRef([]);

  const toggleSound = () => {
    if (!isPlaying) {
      startAmbientSynth();
      setIsPlaying(true);
    } else {
      stopAmbientSynth();
      setIsPlaying(false);
    }
  };

  const startAmbientSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Chord: Cinematic D Minor Pad (D2, A2, F3, C4)
      const freqs = [73.42, 110.0, 174.61, 261.63];
      const oscillators = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low pass filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

        // Subtle slow LFO vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.18, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        oscillators.push(osc, lfo);
      });

      oscNodesRef.current = oscillators;
    } catch (e) {
      console.warn("AudioContext not permitted yet by user gesture:", e);
    }
  };

  const stopAmbientSynth = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0.001,
        audioCtxRef.current.currentTime + 0.5
      );
      setTimeout(() => {
        oscNodesRef.current.forEach((node) => {
          try {
            node.stop();
            node.disconnect();
          } catch (err) {}
        });
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current && isPlaying) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume, isPlaying]);

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-amber-500/20 px-3.5 py-2 rounded-full shadow-2xl transition-all hover:border-amber-500/50">
      <button
        onClick={toggleSound}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        title="Toggle Cinematic Ambient Score"
      >
        <span className="relative flex h-2.5 w-2.5">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isPlaying ? "bg-amber-400" : "bg-zinc-600"
            }`}
          ></span>
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400" />
        )}
        <span className="hidden sm:inline">
          {isPlaying ? "Ambient Score ON" : "Soundtrack FX"}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 border-l border-white/10 pl-2">
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            title="Volume"
          />
        </div>
      )}
    </div>
  );
}
