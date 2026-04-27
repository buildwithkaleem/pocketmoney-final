"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminDailyClaimedRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportUrl, setExportUrl] = useState("");

  // 🔥 GET ALL
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api("/admin/get-all-daily-claim-record");

      if (res.success) {
        setRecords(res.data?.claimedRecord || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE SINGLE
  const handleDelete = async (id) => {
    if (!confirm("Delete this record?")) return;

    try {
      const res = await api(`/admin/delete-daily-claimed-record/${id}`, "DELETE");

      if (res.success) {
        toast.success("Deleted");

        setRecords((prev) => prev.filter((r) => r._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // 💣 DELETE ALL
  const handleDeleteAll = async () => {
    const confirmText = prompt("Type DELETE ALL to confirm");

    if (!confirmText) return;

    try {
      const res = await api(
        "/admin/delete-all-daily-claimed-record",
        "POST",
        { confirmText }
      );

      if (res.success) {
        toast.success("All records deleted");
        setRecords([]);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // 📥 EXPORT CSV
  const handleExport = async () => {
    try {
      const res = await api("/admin/export-daily-claimed-record");

      if (res.success) {
        setExportUrl(res.data?.url);
        toast.success("CSV exported");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Export failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading records...
      </div>
    );
  }

  return (
    <div className="px-4 mt-6">

      {/* HEADER */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-600">
          📋 Daily Claimed Records
        </h2>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Export CSV
          </button>

          <button
            onClick={handleDeleteAll}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete All
          </button>
        </div>
      </div>

      {/* EXPORT LINK */}
      {exportUrl && (
        <div className="mb-3">
          <a
            href={exportUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Download CSV File
          </a>
        </div>
      )}

      {/* EMPTY */}
      {!records.length && (
        <div className="text-center text-gray-500 mt-10">
          No claimed records found
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {records.map((r) => (
          <div
            key={r._id}
            className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
          >
            <p>
              <span className="font-semibold">User:</span> {r.user}
            </p>

            <p>
              <span className="font-semibold">Bounty ID:</span> {r.bountyId}
            </p>

            <p>
              <span className="font-semibold">Binance:</span>{" "}
              {r.binanceNickName}
            </p>

            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(r.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => handleDelete(r._id)}
              className="w-full mt-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}