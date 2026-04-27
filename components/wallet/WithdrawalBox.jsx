
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { WithdrawalSkeleton } from "../loaders/WithdrawalSkeleton";

export default function WithdrawalBox() {

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState(null);

  // ✅ Fetch payment method directly
  const fetchPaymentMethod = async () => {
    try {
      const res = await api("/user/get-payment-method");

      if (res.success && res.data) {
        setPaymentMethod(res.data);
      } else {
        setPaymentMethod(null);
      }
    } catch (err) {
      console.log(err);
      setPaymentMethod(null);
    } finally {
      setLoadingMethod(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  // 💸 withdraw request
  const handleWithdraw = async () => {
    if (!amount) return toast.error("Enter amount");

    if (!paymentMethod) {
      return toast.error("Please add payment method first");
    }

    setLoading(true);

    try {
      const res = await api("/user/withdrawal", "POST", { amount });

      if (res.success) {
        toast.success("Withdrawal request sent ✅");
        setAmount("");

        // 🔥 refresh history / method if needed
        fetchPaymentMethod();

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
      <div className="w-full max-w-md">

        {/* 🔄 Loading */}
        {loadingMethod ? (
          <WithdrawalSkeleton />
        ) : !paymentMethod ? (

          // ❌ No Method
          <div className="flex items-center justify-center mt-6 px-4">
            <div className="w-full max-w-md text-center bg-white dark:bg-black/40 border border-dashed border-green-300 rounded-2xl p-6 shadow-sm">
              <div className="text-4xl mb-3">💳</div>
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                Add Payment Method
              </h2>
              <p className="text-sm text-gray-500">
                Add your payment method to withdraw earnings
              </p>
            </div>
          </div>

        ) : (

          // ✅ Has Method
          <div className="bg-white dark:bg-black/40 p-4 rounded-2xl border shadow-md">

            <h2 className="text-lg font-bold text-green-600 mb-3">
              💳 Payment Method
            </h2>

            <div className="mb-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
              <p className="text-sm">
                <b>Method:</b> {paymentMethod.methodType}
              </p>
              <p className="text-sm">
                <b>Name:</b> {paymentMethod.accountHolderName}
              </p>
              <p className="text-sm">
                <b>Account:</b> {paymentMethod.accountNumber}
              </p>
            </div>

            <input
              type="number"
              placeholder="Enter withdrawal amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-xl mb-4 bg-transparent"
            />

            <button
              onClick={handleWithdraw}
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white ${loading ? "opacity-50" : ""
                }`}
            >
              {loading ? "Processing..." : "Withdraw Now"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}