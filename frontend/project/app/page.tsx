import React from 'react';

// A simple leaf icon component. You can replace this with a more sophisticated SVG.
const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block h-8 w-8 -mt-2 text-green-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.998 5.998a.999.999 0 011 0l3.002 3.002a.999.999 0 11-1.414 1.414L10 7.414l-2.586 2.586a.999.999 0 11-1.414-1.414l3.002-3.002z"
      clipRule="evenodd"
      opacity="0.1"
    />
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.586 8.586a2 2 0 112.828 2.828L10 10l-2.828-2.828-1.586 1.586zM10 10l1.414 1.414a2 2 0 11-2.828-2.828L10 10z" />
  </svg>
);

// H2 molecule graphic component
const H2Molecule = ({ className }: { className?: string }) => (
  <svg
    className={`absolute text-white/20 animate-pulse ${className}`}
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="25" r="8" fill="currentColor" />
    <circle cx="80" cy="25" r="8" fill="currentColor" />
    <line x1="28" y1="25" x2="72" y2="25" stroke="currentColor" strokeWidth="2" />
    <text x="45" y="20" fontFamily="sans-serif" fontSize="12" fill="currentColor">H₂</text>
  </svg>
);


const GreenHydrogenLogin: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: "url('https://i.imgur.com/GAbX16u.jpeg')" }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-30"></div>

      {/* Floating H2 Molecules for decoration */}
      <H2Molecule className="top-1/4 left-1/4" />
      <H2Molecule className="bottom-1/3 right-1/4" />


      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-green-300">Green</span> Hydrogen Gateway <LeafIcon />
          </h1>
          <p className="mt-2 text-gray-200">Powering a sustainable future.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 text-white bg-white/20 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
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
};

export default GreenHydrogenLogin;