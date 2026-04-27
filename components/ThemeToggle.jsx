"use client";

import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // 🔥 Initial load (localStorage + system)
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemDark);
      setDark(systemDark);
    }
  }, []);

  // 🔥 Theme toggle
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      onClick={() => setDark(!dark)}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      className="relative flex items-center justify-center w-12 h-12 rounded-full
      bg-white/20 dark:bg-white/10 backdrop-blur-xl
      border border-purple-300/40 dark:border-purple-700/40
      shadow-lg hover:shadow-purple-500/30
      transition duration-300 overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-300/20 opacity-0 hover:opacity-100 blur-xl transition duration-500"></div>

      {/* ICON ANIMATION */}
      <motion.div
        key={dark ? "sun" : "moon"}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 90, scale: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 text-lg"
      >
        {dark ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-purple-700 dark:text-purple-300" />

        )}
      </motion.div>

    </motion.button>
  );
}