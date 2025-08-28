import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // redirect to homepage
  };

  return (
    <nav className="w-full h-16 text-black bg-white shadow flex items-center px-4 justify-between dark:bg-black dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div className="text-2xl font-bold mr-8 italic">Tweet</div>

      {/* Menu Items */}
      <ul className="ml-3 flex space-x-6 text-lg">
        <li className="cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black hover:text-green-400 dark:hover:bg-[rgb(13,29,56)] dark:hover:text-green-400">
          Home
        </li>
        <li className="cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[rgb(13,29,56)] hover:text-green-400 dark:hover:bg-[rgb(13,29,56)] dark:hover:text-green-400">
          Hello
        </li>
        <li className="cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black hover:text-green-400 dark:hover:bg-[rgb(13,29,56)] dark:hover:text-green-400">
          Create Tweet
        </li>
      </ul>

      {/* Right Section */}
      <div className="w-2/3 flex space-x-6 justify-end">
        <ThemeToggle />
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => (window.location.href = "/register")}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
