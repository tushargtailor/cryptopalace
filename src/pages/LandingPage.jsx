import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ✅ Import your images properly
import bannerImg from "../assets/crypto-banner.jpg";
import heroImg from "../assets/crypto-banner.jpg";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={bannerImg}
          alt="Crypto Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 opacity-90"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Welcome to <span className="text-cyan-400">CryptoPalace</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Your one-stop destination to track, manage, and grow your
              cryptocurrency portfolio.
            </p>
            <div className="space-x-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-lg font-semibold transition"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/portfolio"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-lg font-semibold transition"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
          >
            <img
              src={heroImg}
              alt="Crypto Illustration"
              className="w-72 md:w-96 opacity-95 rounded-2xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] mix-blend-screen"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <section className="px-8 py-16 bg-gray-900/40 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Why Choose CryptoPalace?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                📈 Track Portfolio
              </h3>
              <p className="text-gray-400">
                Monitor your crypto assets in real-time with beautiful
                dashboards.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                💹 Live Market Data
              </h3>
              <p className="text-gray-400">
                Stay updated with live cryptocurrency prices and charts.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                💰 Buy & Sell
              </h3>
              <p className="text-gray-400">
                Easily buy and sell coins with our simple and secure system.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6">
            Ready to take control of your{" "}
            <span className="text-cyan-400">Crypto Journey?</span>
          </h2>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-xl font-semibold transition"
          >
            Get Started
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-black py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CryptoPalace. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
