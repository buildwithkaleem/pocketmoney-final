"use client";

import { useDailyBounty } from "@/context/DailyBountyContext";
import { useUser } from "@/context/UserContext";
import { api } from "@/lib/api";
import { RiCoinsLine } from "react-icons/ri";
// import CreateDailyBounty from "./CreateDailyBounty";
import { useState } from "react";
import { usePopup } from "@/context/usePopup";
import { useGetCurrentUser } from "@/lib/hooks/useGetCurrentUser";

export default function CreateBountyHero() {

  useGetCurrentUser()

  const {popup, setPopup} = usePopup();
  const [loading, setLoading] = useState(false);

  const { user, setUser, } = useUser();
  const { setDailyBounties } = useDailyBounty()

  // const eligible = user?.poki >= 500;

  //  const hendalCreateDailyBounty = async () => {
  //   try {
  //     const createDailyBounty = await api("/bounty/create","POST");
  //   } catch (error) {

  //   }
  //  };

  return (
    <div className="flex justify-center px-4 mt-4">

      <div className="bg-gradient-to-br w-full max-w-md from-green-500 to-green-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

        {/* ✨ Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

        {/* 👤 Username */}
        <p className="text-sm opacity-90">
          hello 
        </p>

        <h2 className="text-xl font-semibold">
          {loading ? "..." : user?.userName || "Visiter"}
        </h2>

        {/* 🚨 Note Box */}
        {/* <div className="mt-4 bg-white/20 border border-white/30 rounded-xl p-2 text-sm">

          <p className="font-semibold mb-1">
            ⚠️ Note
          </p>

          <p >
            You will be eligible to create a bounty only when your Poki balance reaches 500.
          </p>

        </div> */}

        {/* 📢 Main Message */}
        <p className="mt-4 text-sm leading-relaxed">
          Enter your Binance Red Packet code and create your own reward/bounty.
          Share it with others and let them claim your reward.
        </p>



        {/* 🪙 Status */}
        {/* <div className="mt-3">
          Your Balance: <span className="font-bold flex gap-1 items-center"> 
            <RiCoinsLine /> 
            {loading ? "..." : user?.poki || 0}
            </span>
        </div> */}

        {/* 🚀 CTA */}
        <button
          onClick={() => setPopup(true)}
          className={`mt-4 w-full py-3 rounded-xl font-semibold transition bg-white text-green-700 cursor-pointer active:scale-95`}
        >
          Create Bounty
        </button>

        {/* <button
        onClick={()=>setPopup(true)}
          disabled={!eligible}
          className={`mt-4 w-full py-3 rounded-xl font-semibold transition ${eligible
            ? "bg-white text-green-700 cursor-pointer active:scale-95"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          {eligible ? "Create Bounty" : "Not Eligible Yet"}
        </button> */}


      </div>

    </div>
  );
}