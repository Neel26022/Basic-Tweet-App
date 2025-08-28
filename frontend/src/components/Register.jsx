  import React, { useState } from "react";
  import Navbar from "./Navbar";
  import axios from "axios";

  const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({});

      try {
        const { data } = await axios.post("/api/register", {
          name: fullName,
          email,
          password,
        });

        console.log("Registration successful:", data);
        if (data) {
          window.location.href = "/login";
        } 
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response && err.response.data && err.response.data.message) {
          setErrors({ general: err.response.data.message });
        } else {
          setErrors({ general: "Server error. Try again later." });
        }
        console.error("ffffffff ",err);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 blob-outer-container"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-sans font-bold text-center text-black dark:text-white mb-6">
                Create Account
              </h1>

              <form className="space-y-4" onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName[0]}</p>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email[0]}</p>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password[0]}</p>
                )}

                {errors.general && (
                  <p className="text-red-500 text-sm">{errors.general}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                  {loading ? "Registering..." : "Register"}
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
