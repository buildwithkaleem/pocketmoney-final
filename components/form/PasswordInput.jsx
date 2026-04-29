"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "Enter Password",
  label = "Password", // 👈 NEW
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">

      {/* 🔤 LABEL */}
      <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full p-3 pr-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
        />

        {/* 👁 Toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </button>
      </div>

    </div>
  );
}