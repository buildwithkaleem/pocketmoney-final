"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    binanceNickName: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    
    try {
      const res = await api("/user/register", "POST", form);
      if (res.success) {
        toast.success(`${res.data.user.userName } Your Account Successfully Create ✅`);
          router.push("/login");
        
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error ❌");      
    }finally{
      setLoading(false);
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400 dark:from-green-900 dark:to-green-700">

      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-black/40 backdrop-blur-lg">

        {/* 🔥 Logo */}
        <div className="flex flex-col items-center mb-4">
         <div className="flex items-center">
            <img
              src="/poki-logo.png"
              alt="Logo"
              className="w-14 h-16 object-contain mb-2"
            />
            <span className="text-2xl font-semibold text-green-700 flex gap-[2px]"><span className="text-black dark:text-white" >Pocket</span>Money</span>
         </div>

          {/* 📝 Note */}
          <div className="relative mt-2 mb-4 w-full">
            {/* Label */}
            <span className="absolute -top-3 left-3 bg-white dark:bg-black px-2 text-xs font-semibold text-green-600">
              Note
            </span>

            {/* Box */}
            <div className="border border-green-400 rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/30 text-center">
              If you don’t have a Binance account, please{" "}
              <a
                href="https://your-ref-link.com" // 👈 apna referral link
                target="_blank"
                className="text-green-600 font-semibold underline"
              >
                click here
              </a>{" "}
              to create one using our referral link.
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-300 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* Binance Nickname */}
          <input
            type="text"
            name="binanceNickName"
            placeholder="Binance Nickname"
            value={form.binanceNickName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />

          {/* Button */}
          <button
            onClick={() => handleRegister}
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}