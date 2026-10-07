export const DEFAULT_STUDENT = {
  name: "Alex Rivera",
  studentId: "CN-8849",
  email: "alex.rivera@campusnova.edu",
  department: "Computer Science & Artificial Intelligence",
  year: "Senior (Year 4)",
  gpa: "3.92 / 4.00",
  rfidCardStatus: "Active • Biometric Verified",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  dormRoom: "Quads Block B, Suite 412",
  achievements: [
    {
      id: "ach-1",
      title: "Campus Contributor",
      description: "Submitted 5+ validated smart infrastructure improvements",
      icon: "Award",
      unlocked: true,
      date: "SEP 2026"
    },
    {
      id: "ach-2",
      title: "Event Explorer",
      description: "Registered & attended 8+ campus technical symposia",
      icon: "Calendar",
      unlocked: true,
      date: "AUG 2026"
    },
    {
      id: "ach-3",
      title: "Community Helper",
      description: "Returned lost high-value item via smart match portal",
      icon: "HeartHandshake",
      unlocked: true,
      date: "JUL 2026"
    },
    {
      id: "ach-4",
      title: "Innovation Pioneer",
      description: "Deployed prototype drone on CampusNova autonomous test grid",
      icon: "Sparkles",
      unlocked: false,
      date: "Locked"
    }
  ],
  recentActivity: [
    { type: "report", text: "Reported AC sensor fault in Lecture Hall 3B (CN-2048)", time: "Today, 10:14 AM" },
    { type: "event", text: "Registered for Campus Innovation Summit 2026", time: "Yesterday, 03:40 PM" },
    { type: "lost_found", text: "Searched Lost & Found for M3 Max MacBook Pro", time: "Oct 04, 2026" },
    { type: "ai", text: "Consulted Nova AI regarding library silent pods availability", time: "Oct 03, 2026" }
  ]
};
