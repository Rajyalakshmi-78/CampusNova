import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, CornerDownLeft, RefreshCw, Volume2 } from "lucide-react";
import AIOrb from "../components/AIOrb";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "nova",
      text: "Greetings, Student. I am Nova, your CampusNova spatial AI companion. How may I assist your campus life today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef(null);

  const suggestedPrompts = [
    "Where is the library?",
    "What events are happening?",
    "How do I report an issue?",
    "Where is the cafeteria?",
    "Is the campus safe?",
  ];

  // Predefined smart responses
  const getNovaResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("library") || q.includes("study") || q.includes("book")) {
      return "The Central Knowledge Library is located between the CSE Block and Administration. It features 120 acoustic quiet study pods and is currently open until 11:00 PM.";
    }
    if (q.includes("event") || q.includes("hackathon") || q.includes("summit")) {
      return "Upcoming marquee events include the Campus Innovation Summit on OCT 14 (Main Auditorium) and NovaHacks 48-Hour Hackathon on OCT 18. You can register your smart pass under the Events tab.";
    }
    if (q.includes("issue") || q.includes("report") || q.includes("broken") || q.includes("fault")) {
      return "To log a facility anomaly, navigate to the 'Report Issue' portal. You can upload photo evidence and specify the room; our facilities team maintains an 18.4-minute average response time.";
    }
    if (q.includes("cafeteria") || q.includes("food") || q.includes("eat") || q.includes("lunch")) {
      return "The Commons & Food Pavilion is located in the central student quad, serving organic farm-to-table cuisine until 10:30 PM. Current turnstile telemetry indicates 78% seating availability.";
    }
    if (q.includes("safe") || q.includes("security") || q.includes("emergency") || q.includes("help")) {
      return "Campus perimeter status is verified 100% SECURE. All smart blue-light emergency beacons, automated escort shuttles, and biometric gates are functioning normally. Dial 1-800-NOVA-911 for immediate dispatch.";
    }
    return `Acknowledged. I have indexed your query regarding "${query}". For specific routing, please consult the Campus Map or submit a service ticket in the Smart Issues ledger.`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Simulate intelligent neural thinking delay
    setTimeout(() => {
      const responseText = getNovaResponse(query);
      const novaMsg = {
        id: "nova-" + Date.now(),
        sender: "nova",
        text: responseText,
        time: "Just now",
      };
      setMessages((prev) => [...prev, novaMsg]);
      setIsThinking(false);
    }, 800);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTONOMOUS SPATIAL REASONING</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">NOVA AI</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
          "Your intelligent campus companion."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D AI Orb Viewport (Col 5) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
          <div className="w-full aspect-square max-h-[380px] relative">
            <AIOrb isThinking={isThinking} />

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-cyan-500/30 pointer-events-none flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isThinking ? "bg-cyan-400 animate-ping" : "bg-emerald-500"}`} />
              <span>{isThinking ? "NEURAL REASONING..." : "NOVA CORE IDLE"}</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
            Three.js Autonomous Cognitive Mesh • Blue & Cyan
          </p>
        </div>

        {/* Chat Console (Col 7) */}
        <div className="lg:col-span-7 flex flex-col h-[520px] rounded-3xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                  NOVA DIALOGUE AGENT
                </h4>
                <span className="text-[10px] font-mono text-emerald-500">
                  CONNECTED TO CAMPUS MESH
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    id: "m-1",
                    sender: "nova",
                    text: "Conversation refreshed. How else can I assist your campus schedule?",
                    time: "Just now",
                  },
                ])
              }
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-cyan-500/10 text-cyan-500 border border-cyan-500/30"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-light"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 mr-auto max-w-[85%] items-center text-xs font-mono text-cyan-500">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-6 py-2 border-t border-slate-200 dark:border-white/5 flex gap-2 overflow-x-auto bg-slate-50/50 dark:bg-white/5 no-scrollbar">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-mono px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:text-cyan-500 text-slate-600 dark:text-slate-300 shrink-0 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e20]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nova about buildings, exams, tickets, or passes..."
                className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
