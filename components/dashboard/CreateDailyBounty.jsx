// "use client";

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { api } from "@/lib/api";

// export default function CreateDailyBounty() {
//   const [redCode, setRedCode] = useState("");
//   const [dailyBountyLink, setDailyBountyLink] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async () => {
//     if (!redCode) return toast.error("Red Code is required");

//     setLoading(true);

//     try {
//       const res = await api("/admin/create-bounty", "POST", {
//         redCode,
//         dailyBountyLink,
//       });

//       if (res.success) {
//         toast.success("Daily bounty created successfully 🎉");

//         setRedCode("");
//         setDailyBountyLink("");
//       } else {
//         toast.error(res.message);
//       }
//     } catch (error) {
//       toast.error("Server error ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center px-3 mt-6">
//       <div className="w-full max-w-md bg-white dark:bg-black/40 border rounded-2xl shadow-md p-5">

//         <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
//           🎯 Create Daily Bounty
//         </h2>

//         {/* Red Code */}
//         <input
//           type="text"
//           placeholder="Enter Red Code"
//           value={redCode}
//           onChange={(e) => setRedCode(e.target.value)}
//           className="w-full p-3 mb-3 border rounded-xl bg-transparent outline-none"
//         />

//         {/* Link */}
//         <input
//           type="text"
//           placeholder="Daily Bounty Link (optional)"
//           value={dailyBountyLink}
//           onChange={(e) => setDailyBountyLink(e.target.value)}
//           className="w-full p-3 mb-4 border rounded-xl bg-transparent outline-none"
//         />

//         {/* Button */}
//         <button
//           onClick={handleCreate}
//           disabled={loading}
//           className={`w-full py-3 rounded-xl text-white font-semibold transition 
//           bg-gradient-to-r from-green-500 to-green-700 
//           ${loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
//         >
//           {loading ? "Creating..." : "Create Bounty"}
//         </button>

//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function CreateDailyBounty() {
  const [redCode, setRedCode] = useState("");
  const [dailyBountyLink, setDailyBountyLink] = useState("");
  const [device, setDevice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!redCode) return toast.error("Red Code is required");

    setLoading(true);

    try {
      const res = await api("/admin/create-bounty", "POST", {
        redCode,
        dailyBountyLink,
        device
      });

      if (res.success) {
        toast.success("Daily bounty created successfully 🎉");

        setRedCode("");
        setDailyBountyLink("");
        setDevice("");
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
    <div className="flex justify-center px-3 mt-6">
      <div className="w-full max-w-md bg-white dark:bg-black/40 border rounded-2xl shadow-md p-5">

        <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
          🎯 Create Daily Bounty
        </h2>

        {/* Red Code */}
        <input
          type="text"
          placeholder="Enter Red Code"
          value={redCode}
          onChange={(e) => setRedCode(e.target.value)}
          className="w-full p-3 mb-3 border rounded-xl bg-transparent outline-none"
        />

        {/* Link */}
        <input
          type="text"
          placeholder="Daily Bounty Link"
          value={dailyBountyLink}
          onChange={(e) => setDailyBountyLink(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl bg-transparent outline-none"
        />

        {/* Device */}
        <input
          type="text"
          placeholder="Enter Device Name"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl bg-transparent outline-none"
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition 
          bg-gradient-to-r from-green-500 to-green-700 
          ${loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
        >
          {loading ? "Creating..." : "Create Bounty"}
        </button>

      </div>
    </div>
  );
}