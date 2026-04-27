"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function CreateMonthlyBounty() {
  const [monthlyBountyLink, setMonthlyBountyLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!monthlyBountyLink) {
      return toast.error("Monthly Bounty Link is required");
    }

    setLoading(true);

    try {
      const res = await api("/admin/create-mbounty", "POST", {
        monthlyBountyLink,
      });

      if (res.success) {
        toast.success("Monthly bounty created successfully 🎉");
        setMonthlyBountyLink("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-3 mt-6">
      <div className="w-full max-w-md bg-white dark:bg-black/40 border rounded-2xl shadow-md p-5">

        <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
          📅 Create Monthly Bounty
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Monthly Bounty Link"
          value={monthlyBountyLink}
          onChange={(e) => setMonthlyBountyLink(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl bg-transparent outline-none"
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`w-full cursor-pointer py-3 rounded-xl text-white font-semibold transition 
          bg-gradient-to-r from-green-500 to-green-700 
          ${loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
        >
          {loading ? "Creating..." : "Create Monthly Bounty"}
        </button>

      </div>
    </div>
  );
}