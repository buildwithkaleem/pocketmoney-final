
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch withdrawals directly
  const fetchWithdrawals = async () => {
    try {
      const res = await api("/user/get-withdrawals");

      if (res.success) {
        setWithdrawals(res?.data?.withdrawals || []);
      } else {
        setWithdrawals([]);
        console.log("Error:", res.message);
      }

    } catch (error) {
      console.log("Server error:", error.message);
      toast.error("Failed to load withdrawals ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // 🎨 Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading withdrawals...
      </div>
    );
  }

  // ❌ Empty
  if (!withdrawals.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No withdrawal history found
      </div>
    );
  }

  // ✅ Data
  return (
    <div className="flex justify-center px-2 mb-[100px]">
      <div className="w-full max-w-md space-y-3">

        <h2 className="text-green-500 text-2xl text-center mb-6">
          Transaction History (Withdrawals)
        </h2>

        {withdrawals.map((w) => (
          <div
            key={w._id}
            className="bg-white dark:bg-black/40 border rounded-2xl p-4 shadow-md"
          >
            {/* 💰 Amount */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold text-green-600">
                Rs. {w.amount}
              </span>
            </div>

            {/* 📌 Status */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Status</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  w.status
                )}`}
              >
                {w.status || "pending"}
              </span>
            </div>

            {/* 📅 Date */}
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="text-sm">
                {w.createdAt
                  ? new Date(w.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}