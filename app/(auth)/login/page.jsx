"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import { DotsLoader } from "@/components/loaders/DotsLoader";
import InputField from "@/components/form/InputField";
import PasswordInput from "@/components/form/PasswordInput";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api("/user/login", "POST", form);

      if (res.success) {

        toast.success(`${res.data.user.userName } Your Account Sign In successfully ✅`);

        setUser(res.data.user); // 👈 importan

          res.data.user.role === "user" ? router.push('/') : router.push("/dashboard")
        
      } else {
         toast.error(res.message || "Email & Password are invalid ");
      }
    } catch (error) {
      toast.error("Server error ❌");
    }finally{
      setLoading(false)
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
         
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-300 mb-6">
          Sign In
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            value={form.password}
            onChange={handleChange}
          />



          <div className="flex justify-end mb-4">
            <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            {loading ? <>Signing in<DotsLoader color1="#065f46" color2="#80d175" color3="#4ade80" /></> : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}