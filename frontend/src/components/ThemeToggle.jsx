import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  
  const [isDark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    // fallback: check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg font-semibold
                 bg-gray-200 text-gray-800
                 dark:bg-gray-800 dark:text-gray-200
                 hover:bg-gray-300 dark:hover:bg-gray-700
                 transition-all duration-300"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;
