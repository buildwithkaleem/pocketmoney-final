"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { DotsLoader } from "../loaders/DotsLoader";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required ❌");
    }

    try {
      setLoading(true);

      const res = await api("/user/forgot-password", "POST", { email });

      if (res.success) {
        toast.success("Reset link sent to your email 📩");
        setEmail("");
      } else {
        toast.error(res.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.log(error.message);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mt-10">
      
      <div className="w-full max-w-md bg-white dark:bg-black/40 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">

        <Link href={"/login"} className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center " ><IoChevronBack size={25} /></Link>

        <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 text-center">
          🔐 Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 📧 Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* 🚀 Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition flex items-center justify-center gap-2"
          >
            {loading ? <> Sending <DotsLoader color2="#80d175" /> </> : "Send Reset Link"}
          </button>

        </form>

      </div>
    </div>
  );
}