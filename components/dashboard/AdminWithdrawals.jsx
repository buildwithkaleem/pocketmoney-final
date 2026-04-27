"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // 🔥 GET ALL WITHDRAWALS
  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const res = await api("/admin/get-all-withdrawals");

      if (res.success) {
        setWithdrawals(res.data?.withdrawals || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ UPDATE STATUS
  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    try {
      const res = await api(
        `/admin/withdrawal-status/${id}`,
        "PUT",
        { status }
      );

      if (res.success) {
        toast.success(`Withdrawal ${status}`);

        setWithdrawals((prev) =>
          prev.map((w) =>
            w._id === id
              ? { ...w, status }
              : w
          )
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading withdrawals...
      </div>
    );
  }

  if (!withdrawals.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No withdrawals found
      </div>
    );
  }

  return (
    <div className="px-4 mt-6">

      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
        💸 Admin Withdrawals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {withdrawals.map((w) => (
          <div
            key={w._id}
            className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
          >
            <p>
              <span className="font-semibold">User:</span>{" "}
              {w.user?.userName}
            </p>

            <p>
              <span className="font-semibold">Email:</span>{" "}
              {w.user?.email}
            </p>

            <p>
              <span className="font-semibold">Balance:</span>{" "}
              {w.user?.balance}
            </p>

            <p>
              <span className="font-semibold">Amount:</span>{" "}
              <span className="text-green-600 font-bold">
                ${w.amount}
              </span>
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold ${w.status === "approved"
                    ? "text-green-600"
                    : w.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
              >
                {w.status}
              </span>
            </p>

            {/* ACTIONS */}
            {w.status === "pending" && (
              <div className="flex gap-2 mt-3">

                <button
                  disabled={updatingId === w._id}
                  onClick={() => updateStatus(w._id, "approved")}
                  className="flex-1 cursor-pointer py-1 bg-green-600 text-white rounded text-sm"
                >
                  {updatingId === w._id ? "..." : "Approve"}
                </button>

                <button
                  disabled={updatingId === w._id}
                  onClick={() => updateStatus(w._id, "rejected")}
                  className="flex-1 cursor-pointer py-1 bg-red-600 text-white rounded text-sm"
                >
                  {updatingId === w._id ? "..." : "Reject"}
                </button>

              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}