import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        flex items-center gap-2
        px-3 py-2
        rounded-xl
        border
        border-[#D9E1DB]
        dark:border-[#2D3A32]
        bg-[#EEF3EE]
        dark:bg-[#1C2921]
        text-[#18201C]
        dark:text-[#F5F3EA]
        hover:bg-[#E5EFE8]
        dark:hover:bg-[#233328]
        transition-all
        duration-300
        cursor-pointer
        shadow-sm
      "
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-[#E7B84B]" />
          <span className="hidden sm:inline font-medium">
            Light
          </span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#1F8A5B]" />
          <span className="hidden sm:inline font-medium">
            Dark
          </span>
        </>
      )}
    </button>
  );
}