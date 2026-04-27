
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import AddPaymentButton from "./AddPaymentButton";
import { PaymentMethodSkeleton } from "../loaders/PaymentMethodSkeleton";

export default function AddPaymentMethod() {

  const [methodType, setMethodType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [popup, setPopup] = useState(false);
  const [savedMethod, setSavedMethod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ FETCH METHOD (IMPORTANT)
  const fetchMethod = async () => {
    try {
      const res = await api("/user/get-payment-method");

      if (res.success && res.data) {
        setSavedMethod(res.data);
      } else {
        setSavedMethod(null);
      }

    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ RUN ON LOAD (FIX FOR REFRESH)
  useEffect(() => {
    fetchMethod();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!methodType || !accountNumber || !accountHolderName) {
      return toast.error("Please fill all fields");
    }

    setSaving(true);

    try {
      const res = await api("/user/payment-method-add-edit", "POST", {
        methodType,
        accountNumber,
        accountHolderName,
      });

      if (res.success) {
        toast.success("Payment method saved ✅");

        // 🔥 REFRESH DATA FROM SERVER
        await fetchMethod();

        setPopup(false);
        setIsEditing(false);

        // reset
        setMethodType("");
        setAccountNumber("");
        setAccountHolderName("");

      } else {
        toast.error(res.message);
      }

    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    if (!savedMethod) return;

    setMethodType(savedMethod.methodType || "");
    setAccountNumber(savedMethod.accountNumber || "");
    setAccountHolderName(savedMethod.accountHolderName || "");

    setIsEditing(true);
    setPopup(true);
  };

  return (
    <div className="flex justify-center mt-4 px-2">
      <div className="w-full max-w-md">

        {/* LOADING */}
        {loading ? (
          <PaymentMethodSkeleton />
        ) : !savedMethod && !popup ? (
          <AddPaymentButton onClick={() => setPopup(true)} />
        ) : null}

        {/* FORM */}
        {popup && (
          <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

            <h2 className="text-lg font-semibold text-green-600 mb-4">
              💳 {isEditing ? "Edit" : "Add"} Payment Method
            </h2>

            <select
              value={methodType}
              onChange={(e) => setMethodType(e.target.value)}
              className="w-full p-3 rounded-xl border mb-3"
            >
              <option value="">Select Method</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
            </select>

            <input
              type="text"
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              className="w-full p-3 rounded-xl border mb-3"
            />

            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-3 rounded-xl border mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full py-3 rounded-xl bg-green-600 text-white"
            >
              {saving ? "Saving..." : "Save"}
            </button>

          </div>
        )}

        {/* SAVED */}
        {savedMethod && !popup && (
          <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

            <h2 className="text-lg font-semibold text-green-600 mb-4">
              💳 Your Payment Method
            </h2>

            <div className="flex justify-between mb-2">
              <span>Method:</span>
              <span>{savedMethod.methodType}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Name:</span>
              <span>{savedMethod.accountHolderName}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Account:</span>
              <span>{savedMethod.accountNumber}</span>
            </div>

            <button
              onClick={handleEdit}
              className="w-full py-3 rounded-xl bg-green-600 text-white"
            >
              Edit
            </button>

          </div>
        )}

      </div>
    </div>
  );
}