"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main
      className="relative flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header with Login Button */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="container mx-auto flex justify-end">
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-500/50"
          >
            Login / Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-300 to-blue-400 animate-text-shimmer"
        >
          Powering a Sustainable Tomorrow
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200 leading-relaxed"
        >
          Green Hydrogen is a revolutionary clean energy carrier, produced with
          renewable energy sources like <strong>wind</strong> and{" "}
          <strong>solar</strong>, enabling a carbon-free future through
          electrolysis.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 max-w-3xl text-lg md:text-xl text-gray-200 leading-relaxed"
        >
          The <strong>Green Hydrogen Gateway</strong> connects{" "}
          <span className="text-green-300 font-semibold">startups</span>,{" "}
          <span className="text-blue-300 font-semibold">banks</span>,{" "}
          <span className="text-yellow-300 font-semibold">auditors</span>, and{" "}
          <span className="text-purple-300 font-semibold">government</span> to
          accelerate the transition to clean energy.
        </motion.p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link
            href="/explore"
            className="rounded-full px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-400/60"
          >
            Explore Platform
          </Link>
          <Link
            href="/about"
            className="rounded-full px-8 py-3 bg-white/10 text-white font-semibold backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Extra Info Section */}
      <section className="relative z-10 py-16 bg-black/40 backdrop-blur-md border-t border-green-400/30">
        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Innovation",
              text: "Empowering startups with funding and partnerships to drive sustainable hydrogen solutions.",
            },
            {
              title: "Transparency",
              text: "Auditors ensure clear, accountable reporting for every project milestone.",
            },
            {
              title: "Collaboration",
              text: "Governments, banks, and innovators unite to create a greener global economy.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 text-center border border-green-300/20 shadow-lg"
            >
              <h3 className="text-xl font-bold text-green-300 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-200">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
