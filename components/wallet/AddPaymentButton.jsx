"use client";

import { FiPlus } from "react-icons/fi";

export default function AddPaymentButton({ onClick }) {
  return (
    <div className="flex justify-center  mt-4 px-2">
      <div
        onClick={onClick}
        className="w-full max-w-md cursor-pointer border-2 border-dashed border-green-400 dark:border-green-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-green-50 dark:hover:bg-green-900/20 transition"
      >
        {/* ➕ Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 text-2xl mb-3">
          <FiPlus />
        </div>

        {/* 📝 Text */}
        <p className="text-green-600 font-semibold text-sm">
          Add Payment Method
        </p>
      </div>
    </div>
  );
}