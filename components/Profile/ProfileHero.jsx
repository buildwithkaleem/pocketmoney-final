
"use client";

import { useUser } from "@/context/UserContext";
import { DotsLoader } from "../loaders/DotsLoader";

export default function ProfileHero() {
  const { user, userLoading } = useUser();

  return (
    <div className="flex justify-center px-4 mt-25">
      <div className="w-full max-w-md relative">

        {/* 🌟 Glow Background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>

        {/* 🪙 Card */}
        <div className="relative bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 text-white shadow-2xl backdrop-blur-xl border border-white/10">

          {/* 🔝 Top Section */}
          <div className="flex items-center justify-between">

            {/* 👤 User Info */}
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold uppercase">
                {user?.userName?.charAt(0) || "U"}
              </div>

              <div>
                <p className="text-xs opacity-80">Welcome back 👋</p>
                <h2 className="text-lg font-semibold">
                  {userLoading ? <DotsLoader color1="#065f46" color2="#80d175" color3="#4ade80" /> : user?.userName || "Visitor"}
                </h2>
              </div>
            </div>

            {/* 🟢 Status */}
            {!userLoading && user && (
              <span className="bg-white/20 px-3 py-1 text-xs rounded-full backdrop-blur-md">
                Active
              </span>
            )}
          </div>

          {/* 📊 Stats Section */}
          {/* <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md">
              <p className="text-xs opacity-80">Balance</p>
              <h3 className="text-lg font-semibold">₹0.00</h3>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md">
              <p className="text-xs opacity-80">Referrals</p>
              <h3 className="text-lg font-semibold">0</h3>
            </div>

          </div> */}

          {/* ⚡ Bottom Action */}
          {/* <div className="mt-5">
            <button className="w-full py-2 rounded-xl bg-white text-green-700 font-semibold hover:scale-[1.02] transition">
              View Profile
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
}