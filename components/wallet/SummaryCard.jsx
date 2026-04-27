"use client";

import { FaGift } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { ImStatsBars } from "react-icons/im";
import { useEffect, useState } from "react";

export default function SummaryCard({ rewardCount }) {

  const { user, userLoading } = useUser();

  // const [reward, setReward] = useState(0);

  // useEffect(() => {
  //   setReward(rewardCount || 0);
  // }, [rewardCount]);

 

  return (
    <div className="flex justify-center mt-[90px] px-2">
      <div className="w-full max-w-md">

        {/* 🌟 Main Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

          <h2 className=" flex gap-1 items-center text-lg font-semibold opacity-90 mb-4">
            Your Stats <ImStatsBars />
          </h2>

          <div className="flex justify-between gap-3">

            {/* 💰 Balance */}
            <div className="flex-1 bg-white/10 rounded-2xl p-4 backdrop-blur">
              <p className="text-sm opacity-80">Total Balance</p>

              <h3 className="text-xl font-bold mt-1 flex items-center gap-2">
                
                Rs.
                {userLoading ? "..." : user?.balance || 0}
              </h3>
            </div>

            {/* 🎁 Rewards */}
            <div className="flex-1 bg-white/10 rounded-2xl p-4 backdrop-blur">
              <p className="text-sm opacity-80">Total Claimed</p>

              <h3 className="text-xl font-bold mt-1 flex items-center gap-2">
                <FaGift />
                { rewardCount ?? 0}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}