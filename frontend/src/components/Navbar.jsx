import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full h-16 text-black bg-white shadow flex items-center px-4 justify-between dark:bg-black dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div className="text-2xl font-bold mr-8 italic">
        Tweet
      </div>

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
        <button className="button">Login</button>
        <button className="button">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
