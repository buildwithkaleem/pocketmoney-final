
"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useDailyBounty } from "@/context/DailyBountyContext";
import { usePopup } from "@/context/usePopup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateDailyBountyModal() {
  const {popup,setPopup} = usePopup();

  const router = useRouter() 

  const [form, setForm] = useState({
    redCode: "",
    amout: "",
  });

  const [loading, setLoading] = useState(false);

  const { addBounty } = useDailyBounty();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.redCode || !form.amout) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api("/bounty/create", "POST", form);

      if (res.success) {
        toast.success(`Red Paket Create Successfully ✅`);        
        setPopup(false); // ✅ close after success
        addBounty(res.data);
        setForm({ redCode: "", amout: "" });
        router.push("/")
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
    <>


      {/* 📦 Modal */}

      {popup && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">

          {/* Bottom Sheet Style */}
          <div className="w-full max-w-md bg-white dark:bg-black rounded-t-3xl p-5 animate-slideUp">

            {/* Drag line */}
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>

            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 text-center">
              🎁 Create Red Packet
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* 🔑 Code */}
              <input
              required
                type="text"
                name="redCode"
                placeholder="Enter Red Packet Code"
                value={form.redCode}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white "
              />

              {/* 💰 Amount */}
              <input
              required
                type="number"
              name="amout"
                placeholder="Enter Amount"
              value={form.amout}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
              />

              {/* 🚀 Button */}
              <button
              // onClick={() => setPopup(false)}
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold"
              >
                {loading ? "Creating..." : "Create"}
              </button>

              {/* ❌ Cancel */}
              <button
                type="button"
                onClick={() => setPopup(false)}
              className="w-full cursor-pointer py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              >
                Cancel
              </button>

            </form>

          </div>
        </div>
      }
    </>
  );
}