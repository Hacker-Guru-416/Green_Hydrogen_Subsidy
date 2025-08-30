import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className="relative flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://samcotech.com/wp-content/uploads/2023/09/iStock-1555938496.jpg')",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header section for the Login button */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="container mx-auto flex justify-end">
          <Link
            href="/signup"
            className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-600 hover:scale-105"
          >
            Sign Up / Log In
          </Link>
        </div>
      </header>

      {/* Main content area */}
      <div className="relative z-10 flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl p-8 mx-4 space-y-6 rounded-xl bg-black/50 backdrop-blur-md border border-green-500/30">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
            Powering a Sustainable Tomorrow
          </h1>
          <p className="text-lg leading-8 text-gray-200">
            <strong>Green Hydrogen</strong> is a revolutionary clean energy carrier. Unlike other forms of hydrogen, it is produced using renewable energy sources—like wind and solar—to split water into hydrogen and oxygen through electrolysis. This process is completely carbon-free, making it a cornerstone of a sustainable global energy system.
          </p>
          <p className="text-lg leading-8 text-gray-200">
            This <strong>Green Hydrogen Gateway</strong> is a collaborative platform designed to accelerate the transition to clean energy. It connects innovative <strong>startups</strong> with vital funding from <strong>banks</strong>, ensures transparency through certified <strong>auditors</strong>, and facilitates regulatory oversight from <strong>government</strong> bodies. Together, we can build the infrastructure for a greener future.
          </p>
        </div>
      </div>
    </main>
  );
}