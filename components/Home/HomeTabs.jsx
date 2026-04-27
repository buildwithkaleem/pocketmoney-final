"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeTabs() {
  const [active, setActive] = useState("daily");

  return (
    
    <div className="flex justify-center">

      {/* 📱 App Card Container */}
      <section className=" w-full max-w-md bg-white/90 dark:bg-black/50 backdrop-blur-lg p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">

        <div className="flex gap-1">

          {/* 🟢 Daily */}
          <Link
          href={'/'}
            onClick={() => setActive("daily")}
            className={`flex-1 py-3 text-center text-sm font-medium rounded-xl transition-all duration-200 ${active === "daily"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow"
                : "text-gray-500 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
              }`}
          >
            Daily
          </Link>

          {/* 🟢 Monthly */}
          <Link
          href={'/monthly-reward'}
            onClick={() => setActive("monthly")}
            className={`flex-1 py-3 text-center text-sm font-medium rounded-xl transition-all duration-200 ${active === "monthly"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow"
                : "text-gray-500 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
              }`}
          >
            Monthly
          </Link>

          {/* 🟢 Convert */}
          <Link
          href={'/convert'}
          
            onClick={() => setActive("convert")}
            className={`flex-1 py-3 text-center text-sm font-medium rounded-xl transition-all duration-200 ${active === "convert"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow"
                : "text-gray-500 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
              }`}
          >
            Convert
          </Link>

        </div>

      </section>
    </div>
      
  );
}