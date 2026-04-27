"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminBounties() {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH BOUNTIES
  const fetchBounties = async () => {
    try {
      const res = await api("/admin/get-all-admin-bounties-only");

      if (res.success) {
        setBounties(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error(res.message);
        setBounties([]);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  // 🗑 DELETE BOUNTY
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this bounty?")) return;

    try {
      const res = await api(`/admin/delete-bounty/${id}`, "DELETE");

      if (res.success) {
        toast.success("Bounty deleted");

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
        Loading bounties...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-600 mb-5">
        🧨 Admin Bounties
      </h2>

      {bounties.length === 0 ? (
        <p className="text-gray-500">No bounties found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {bounties.map((bounty) => (
            <div
              key={bounty._id}
              className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
            >
              <p>
                <span className="font-semibold">User:</span>{" "}
                {bounty.user?.userName}
              </p>

              <p>
                <span className="font-semibold">Role:</span>{" "}
                {bounty.user?.role}
              </p>

              <p>
                <span className="font-semibold">Red Code:</span>{" "}
                {bounty.redCode}
              </p>

              <p>
                <span className="font-semibold">Link:</span>{" "}
                {bounty.dailyBountyLink || "N/A"}
              </p>

              <p className="text-sm text-gray-500">
                Expires: {new Date(bounty.expireAt).toLocaleString()}
              </p>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(bounty._id)}
                className="w-full cursor-pointer mt-2 py-1 bg-red-500 text-white rounded-lg text-sm"
              >
                Delete Bounty
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}