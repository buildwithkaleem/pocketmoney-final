"use client";

import { useState } from "react";

export default function WalletTabs() {

  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="flex justify-center mt-4 px-2">
      <div className="w-full max-w-md">

        {/* 🔹 Tabs Header (HomeTabs style) */}
        <section className="bg-white/90 dark:bg-black/50 backdrop-blur-lg p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex gap-1">

            {/* 💰 Wallet */}
            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex-1 py-3 text-sm rounded-xl ${activeTab === "wallet"
                  ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                  : "text-gray-500"
                }`}
            >
              Wallet
            </button>

            {/* 📜 History */}
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-3 text-sm rounded-xl ${activeTab === "history"
                  ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                  : "text-gray-500"
                }`}
            >
              History
            </button>

          </div>
        </section>

        {/* 🔥 Content */}
        <div className="mt-4">

          {/* 💰 Wallet Section */}
          {activeTab === "wallet" && (
            <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

              <h2 className="text-lg font-semibold text-green-600 mb-3">
                💰 Withdraw Funds
              </h2>

              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 rounded-xl border mb-3 bg-transparent"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold">
                Withdraw
              </button>

            </div>
          )}

          {/* 📜 History Section */}
          {activeTab === "history" && (
            <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

              <h2 className="text-lg font-semibold text-green-600 mb-3">
                📜 Withdrawal History
              </h2>

              {/* Dummy UI */}
              <div className="flex justify-between py-2 border-b text-sm">
                <span>$100</span>
                <span className="text-yellow-500">Pending</span>
              </div>

              <div className="flex justify-between py-2 border-b text-sm">
                <span>$200</span>
                <span className="text-green-600">Approved</span>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span>$50</span>
                <span className="text-red-500">Rejected</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}