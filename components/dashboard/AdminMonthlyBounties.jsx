"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminMonthlyBounties() {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ALL
  useEffect(() => {
    fetchBounties();
  }, []);

  const fetchBounties = async () => {
    try {
      const res = await api("/admin/get-all-admin-mbountes-only");

      if (res.success) {
        setBounties(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this monthly bounty?")) return;

    try {
      const res = await api(`/admin/delete-mbounty/${id}`, "DELETE");

      if (res.success) {
        toast.success("Deleted successfully");

        setBounties((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading monthly bounties...
      </div>
    );
  }

  if (!bounties.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No monthly bounties found
      </div>
    );
  }

  return (
    <div className="px-4 mt-6">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
        📅 Admin Monthly Bounties
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {bounties.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
          >
            <p>
              <span className="font-semibold">Admin:</span>{" "}
              {b.user?.userName || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Link:</span>{" "}
              <a
                href={b.monthlyBountyLink}
                target="_blank"
                className="text-blue-500 underline break-all"
              >
                {b.monthlyBountyLink || "No link"}
              </a>
            </p>

            <p>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(b.createdAt).toLocaleDateString()}
            </p>

            <p>
              <span className="font-semibold">Expire:</span>{" "}
              {new Date(b.expireAt).toLocaleDateString()}
            </p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(b._id)}
              className="w-full mt-2 py-1 bg-red-500 text-white rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}