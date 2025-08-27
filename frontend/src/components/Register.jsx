import React from "react";
import Navbar from "./Navbar"; // make sure Navbar.jsx exists in the same folder

const Register = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Centered Register Card */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Gradient Blob Background */}
          <div className="absolute inset-0 blob-outer-container"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl font-sans font-bold text-center text-black dark:text-white mb-6">
              Create Account
            </h1>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
