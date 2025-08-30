// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

// A simple leaf icon component
const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block h-8 w-8 -mt-2 text-green-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.586 8.586a2 2 0 112.828 2.828L10 10l-2.828-2.828-1.586 1.586zM10 10l1.414 1.414a2 2 0 11-2.828-2.828L10 10z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !role) {
      alert("Please fill all fields and select a role!");
      return;
    }

    // Navigate to role-based dashboard
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://www.imf.org/-/media/Images/IMF/FANDD/hero/2022/December/Hydrogen-Decade-van-de-Graaf.ashx')",
      }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-30"></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-2xl">
        {/* Title */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-green-300">Green</span> Hydrogen Gateway{" "}
            <LeafIcon />
          </h1>
          <p className="mt-2 text-gray-200">Powering a sustainable future.</p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-transparent bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-transparent bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
            />
          </div>

          {/* --- CHANGE STARTS HERE --- */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            // Dynamically change text color: gray for placeholder, white for selected value
            className={`w-full appearance-none rounded-lg border border-transparent bg-white/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              role ? "text-white" : "text-gray-300"
            }`}
          >
            <option value="" disabled className="text-gray-500">
              Select Role
            </option>
            {/* Add a dark text color to each option for readability */}
            <option value="government" className="text-black">
              Government
            </option>
            <option value="startup" className="text-black">
              Startup
            </option>
            <option value="bank" className="text-black">
              Bank
            </option>
            <option value="auditor" className="text-black">
              Auditor
            </option>
          </select>
          {/* --- CHANGE ENDS HERE --- */}

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Links */}
        <div className="flex items-center justify-between text-sm">
          <a
            href="#"
            className="font-medium text-green-300 hover:text-green-200"
          >
            Forgot Username?
          </a>
          <a
            href="#"
            className="font-medium text-green-300 hover:text-green-200"
          >
            Forgot Password?
          </a>
        </div>

        {/* Signup Link */}
        <div className="mt-4 text-center text-sm text-gray-200">
          <span>Don’t have an account? </span>
          <a
            href="/signup"
            className="font-medium text-green-300 hover:text-green-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}