"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { DotsLoader } from "../loaders/DotsLoader";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token"); // 🔑 URL se token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      return toast.error("Password is required ❌");
    }

    if (newPassword.length < 6) {
      return toast.error("New Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await api(`/user/reset-password/${token}`, "POST", {
        newPassword,
      });

      if (res.success) {
        toast.success("Password updated successfully ✅");

        setTimeout(() => {
          router.push("/login"); // 🔁 redirect to login
        }, 1500);
      } else {
        toast.error(res.message || "Invalid or expired token ❌");
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
          🔐 Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 🔑 Password */}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* 🚀 Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition flex items-center justify-center gap-2"
          >
            {loading ? <> Updating <DotsLoader color2="#80d175" /> </> : "Update Password"}
          </button>

        </form>

      </div>
    </div>
  );
}