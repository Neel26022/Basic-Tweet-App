import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Initialize with system preference or check existing class
  const [isDark, setDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    // For Tailwind v4, we need to toggle the dark class on html element
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add("dark");
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = 'light';
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