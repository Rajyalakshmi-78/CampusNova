import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_ISSUES } from "../data/issues";
import { INITIAL_EVENTS } from "../data/events";
import { INITIAL_LOST_FOUND } from "../data/lostFound";
import { INITIAL_NOTIFICATIONS } from "../data/notifications";
import { DEFAULT_STUDENT } from "../data/students";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication & Demo User
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("campusnova-user");
    return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("campusnova-auth") === "true";
  });

  // Issues State
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem("campusnova-issues");
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  // Events State & Registrations
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("campusnova-events");
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const saved = localStorage.getItem("campusnova-registrations");
    return saved ? JSON.parse(saved) : ["evt-1"];
  });

  // Lost & Found Items
  const [lostFound, setLostFound] = useState(() => {
    const saved = localStorage.getItem("campusnova-lostfound");
    return saved ? JSON.parse(saved) : INITIAL_LOST_FOUND;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("campusnova-notifications");
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Global Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem("campusnova-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("campusnova-auth", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("campusnova-issues", JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem("campusnova-events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("campusnova-registrations", JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem("campusnova-lostfound", JSON.stringify(lostFound));
  }, [lostFound]);

  useEffect(() => {
    localStorage.setItem("campusnova-notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (emailOrId, password) => {
    setIsAuthenticated(true);
    addToast(`Welcome back, ${user.name}! Authenticated to CampusNova.`, "success");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast("Logged out of CampusNova session.", "info");
  };

  const addIssue = (newIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
    // Also push a notification
    const notif = {
      id: "notif-" + Date.now(),
      type: "issue",
      title: `Issue ${newIssue.id} Submitted`,
      message: `${newIssue.title} has been routed to Facilities.`,
      time: "Just now",
      read: false,
      badge: "Reported"
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast(`Issue ${newIssue.id} created successfully!`, "success");
  };

  const registerForEvent = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents((prev) => prev.filter((id) => id !== eventId));
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, participants: Math.max(0, e.participants - 1) } : e))
      );
      addToast("Cancelled event registration.", "info");
    } else {
      setRegisteredEvents((prev) => [...prev, eventId]);
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, participants: e.participants + 1 } : e))
      );
      const targetEvent = events.find((e) => e.id === eventId);
      const notif = {
        id: "notif-" + Date.now(),
        type: "event",
        title: `Pass Confirmed: ${targetEvent?.title || "Event"}`,
        message: "Your smart campus pass has been generated.",
        time: "Just now",
        read: false,
        badge: "Registered"
      };
      setNotifications((prev) => [notif, ...prev]);
      addToast(`Pass generated for ${targetEvent?.title || "Event"}!`, "success");
    }
  };

  const addLostFoundItem = (item) => {
    setLostFound((prev) => [item, ...prev]);
    const notif = {
      id: "notif-" + Date.now(),
      type: "lost_found",
      title: `${item.type} Item Registered: ${item.title}`,
      message: "Item indexed in smart campus matching ledger.",
      time: "Just now",
      read: false,
      badge: item.type
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast(`${item.type} item report published!`, "success");
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read.", "info");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        issues,
        addIssue,
        events,
        registeredEvents,
        registerForEvent,
        lostFound,
        addLostFoundItem,
        notifications,
        unreadCount,
        markAllNotificationsAsRead,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
