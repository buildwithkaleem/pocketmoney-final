
"use client";

import { FaGift } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function SummaryCard() {
  const { user, userLoading } = useUser();

  const [rewardCount, setRewardCount] = useState(0);
  const [loadingReward, setLoadingReward] = useState(true);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const res = await api("/bounty/get-claimed-reward-count");

        if (res.success) {
          setRewardCount(res?.data?.reward?.rewardCount || 0);
        } else {
          console.log("Reward API error:", res.message);
        }
      } catch (error) {
        console.log("Server error:", error.message);
      } finally {
        setLoadingReward(false);
      }
    };

    fetchReward();
  }, []);

  return (
    <div className="flex justify-center mt-[90px] px-2">
      <div className="w-full max-w-md">

        {/* 🌟 Main Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

          {/* Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

          <h2 className="flex gap-1 items-center text-lg font-semibold opacity-90 mb-4">
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
                {loadingReward ? "..." : rewardCount}
              </h3>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}