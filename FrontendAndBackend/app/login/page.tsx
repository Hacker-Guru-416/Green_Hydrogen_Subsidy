"use client"; 
import React, { useState } from "react";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch("backend/project/app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        // Example: redirect to dashboard
        window.location.href = `/dashboard?user=${username}`;
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1675824277375-0fa49c4c3e48?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBoeWRyb2dlbnxlbnwwfHwwfHx8MA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-30"></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-green-300">Green</span> Hydrogen Gateway <LeafIcon />
          </h1>
          <p className="mt-2 text-gray-200">Powering a sustainable future.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-white bg-white/20 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-white bg-white/20 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-400 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-sm">
          <a href="#" className="font-medium text-green-300 hover:text-green-200">
            Forgot Username?
          </a>
          <a href="#" className="font-medium text-green-300 hover:text-green-200">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}