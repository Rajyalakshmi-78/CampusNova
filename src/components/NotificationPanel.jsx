import React from "react";
import { X, CheckCheck, Bell, AlertTriangle, Calendar, Search, ShieldCheck, Wrench } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount, markAllNotificationsAsRead } = useApp();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case "issue":
        return <Wrench className="w-4 h-4 text-cyan-400" />;
      case "event":
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case "lost_found":
        return <Search className="w-4 h-4 text-amber-400" />;
      case "safety":
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#070e20] border-l border-slate-200 dark:border-white/10 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Bell className="w-4 h-4 text-cyan-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Campus Telemetry Notifications
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread transmissions` : "All notifications read"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        {unreadCount > 0 && (
          <div className="px-5 py-2.5 bg-cyan-500/5 border-b border-cyan-500/10 flex items-center justify-between">
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
              Pending alerts
            </span>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          </div>
        )}

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs font-mono">
              No recent notifications logged.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  n.read
                    ? "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 opacity-80"
                    : "bg-white dark:bg-cyan-950/20 border-cyan-500/30 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-white/5 shrink-0">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {n.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        {n.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
