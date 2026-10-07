import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Camera,
  MapPin,
  AlertTriangle,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ReportIssue() {
  const { addIssue, user } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Classroom");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [imagePreview, setImagePreview] = useState(null);
  const [submittedReport, setSubmittedReport] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) return;

    const reportId = `CN-${Math.floor(2050 + Math.random() * 800)}`;
    const newIssue = {
      id: reportId,
      title,
      category,
      location,
      priority,
      status: "Reported",
      reportedBy: user.name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      image:
        imagePreview ||
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      description,
      assignedTo: "Campus Operations Dispatch",
      updates: ["Report received and logged in smart ledger"],
    };

    addIssue(newIssue);
    setSubmittedReport(newIssue);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Classroom");
    setLocation("");
    setDescription("");
    setPriority("Medium");
    setImagePreview(null);
    setSubmittedReport(null);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
        {/* Left: Cinematic Campus Maintenance Image */}
        <div className="lg:col-span-5 relative bg-slate-950 overflow-hidden flex flex-col justify-between p-8 sm:p-12">
          <img
            src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80"
            alt="Campus Facilities Engineering"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top telemetry tag */}
          <div className="relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              FACILITY INCIDENT DISPATCH
            </span>
          </div>

          {/* Bottom message */}
          <div className="relative z-10 space-y-4 max-w-md text-white">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Rapid Response Telemetry Grid.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Every reported anomaly is geo-tagged and synchronized with campus maintenance
              drones and technician units for a 98% resolution guarantee.
            </p>
            <div className="flex items-center gap-6 pt-2 font-mono text-xs text-cyan-400">
              <span>AVG RESOLUTION: 18.4 MINS</span>
              <span>•</span>
              <span>AES-256 LOGGED</span>
            </div>
          </div>
        </div>

        {/* Right: Modern Form / Animated Success State */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex items-center justify-center bg-white dark:bg-[#040816]">
          <div className="w-full max-w-xl">
            {submittedReport ? (
              /* Success State */
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-500 block mb-1">
                    TRANSMISSION LOGGED
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                    REPORT SUBMITTED
                  </h3>
                  <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    Report ID: {submittedReport.id}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                  Our campus operations desk has received your report regarding{" "}
                  <strong className="text-slate-900 dark:text-white">{submittedReport.title}</strong> at{" "}
                  {submittedReport.location}. A technician unit has been notified.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    REPORT ANOTHER ISSUE
                  </button>
                  <Link
                    to="/issues"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-mono font-bold tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>VIEW ISSUES LEDGER</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Split-screen Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    LOG CAMPUS ANOMALY
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    Provide exact spatial and diagnostic details for immediate dispatch.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Issue Title */}
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                      ISSUE HEADLINE / TITLE
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Broken Projector HDMI Cable in Lab 204"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Category and Priority Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                        INCIDENT CATEGORY
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option>Classroom</option>
                        <option>Electrical</option>
                        <option>Infrastructure</option>
                        <option>Cleaning</option>
                        <option>Internet</option>
                        <option>Transport</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                        PRIORITY LEVEL
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                      PRECISE LOCATION / ROOM NUMBER
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-cyan-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. CSE Block, Room 402 or Main Library Pod 8"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                      DETAILED DESCRIPTION
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explain symptoms, hazard status, or specific equipment IDs..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 leading-relaxed"
                    />
                  </div>

                  {/* Drag-and-Drop Image Upload with Live Preview */}
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1 font-medium">
                      PHOTO EVIDENCE / SENSOR SNAPSHOT
                    </label>

                    {imagePreview ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/50">
                        <img
                          src={imagePreview}
                          alt="Evidence Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-slate-300 dark:border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition-colors cursor-pointer bg-slate-50/50 dark:bg-white/5"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="file-upload"
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer block space-y-2">
                          <UploadCloud className="w-8 h-8 text-cyan-500 mx-auto" />
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            Drag & drop photo evidence, or <span className="text-cyan-500 underline">browse files</span>
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            PNG, JPG, HEIC up to 10MB
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>REPORT ISSUE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
