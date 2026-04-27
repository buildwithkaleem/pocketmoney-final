"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { WithdrawalSkeleton } from "../loaders/WithdrawalSkeleton";

export default function WithdrawalBox({ getMethods }) {

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState(null);

  // 🔥 fetch payment method
  useEffect(() => {
    // const fetchMethod = async () => {
    //   try {
    //     const res = await api("/user/get-payment-method");

    //     if (res.success && res.data) {
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchMethod();
    setPaymentMethod(getMethods || null);
    setLoadingMethod(false)
  }, []);

  // 💸 withdraw request
  const handleWithdraw = async () => {
    if (!amount) return toast.error("Enter amount");

    if (!paymentMethod) {
      return toast.error("Please add payment method first");
    }

    setLoading(true);

    try {

      const res = await api("/user/withdrawal", "POST", {
        amount,
      });

      if (res.success) {
        toast.success("Withdrawal request sent ✅");
        setAmount("");
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
    <div className="flex justify-center mb-[50px] mt-5 px-2">



      <div className="w-full max-w-md ">

        {loadingMethod ? <WithdrawalSkeleton /> : !paymentMethod ? <div className="flex items-center justify-center mt-6 px-4">
          <div className="w-full max-w-md text-center bg-white dark:bg-black/40 border border-dashed border-green-300 dark:border-green-700 rounded-2xl p-6 shadow-sm">

            {/* Icon */}
            <div className="text-4xl mb-3">💳</div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              Add Payment Method
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add your payment method to start withdrawing your earnings.
            </p>



          </div>
        </div> : ""
        }
        {paymentMethod &&
        <div className="bg-white dark:bg-black/40 p-4 rounded-2xl border shadow-md">

          {/* 💳 Payment Method */}
          <h2 className="text-lg font-bold text-green-600 mb-3">
            💳 Payment Method
          </h2>


          <div className="mb-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
            <p className="text-sm">
              <span className="font-semibold">Method:</span>{" "}
              {paymentMethod ? paymentMethod.methodType : ""}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Name:</span>{" "}
              {paymentMethod ? paymentMethod.accountHolderName : ""}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Account:</span>{" "}
              {paymentMethod ? paymentMethod.accountNumber : ""}
            </p>
          </div>


          {/* 💰 Amount Input */}
          <input
            type="number"
            placeholder="Enter withdrawal amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4 bg-transparent"
          />

          {/* 🚀 Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Processing..." : "Withdraw Now"}
          </button>
        </div>
        }
      </div>
    </div>
  );
}