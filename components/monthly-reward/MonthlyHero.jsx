

"use client";

import { useMonthlyBounty } from "@/context/MonthlyBountyContext";
import { useGetAllMonthlyBounties } from "@/lib/hooks/useGetAllMonthlyBounties";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../loaders/CardSkeleton";

export default function MonthlyHero() {

  useGetAllMonthlyBounties()

  const [timers, setTimers] = useState({});
  const { monthlyBounties, monthlyBountyLoading } = useMonthlyBounty();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newTimers = {};

      monthlyBounties.forEach((mb) => {
        const diff = new Date(mb.expireAt) - now;

        if (diff <= 0) {
          newTimers[mb._id] = null;
        } else {
          newTimers[mb._id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          };
        }
      });

      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [monthlyBounties]);

  if (monthlyBountyLoading) return <CardSkeleton />;


  // const getRemainingTime = (expireAt) => {
  //   const now = new Date();
  //   const diff = new Date(expireAt) - now;

  //   if (diff <= 0) return null;

  //   return {
  //     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
  //     hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
  //     minutes: Math.floor((diff / 1000 / 60) % 60),
  //     seconds: Math.floor((diff / 1000) % 60),
  //   };
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newTimers = {};

  //     monthlyBounties.forEach((mb) => {
  //       newTimers[mb._id] = getRemainingTime(mb.expireAt);
  //     });

  //     setTimers(newTimers);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [monthlyBounties]);

  // ✅ Correct return
  return (
    <>

      {monthlyBounties.length === 0 && <p className="text-center mt-6 text-2xl font-semibold text-green-800   dark:text-green-500">
        No monthly rewards available
      </p>
}
      {monthlyBounties.map((mb) => {
        const remaining = timers[mb._id];

        return (
          <div key={mb._id} className="flex justify-center mx-2 mt-4">

            <div className="bg-gradient-to-br w-full max-w-md from-green-600 to-green-800 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

              <h2 className="text-xl font-bold">🎁 Monthly Mega Reward</h2>

              <p className="text-sm mt-1 text-yellow-200 font-medium animate-pulse">
                ⚡ Hurry up! Limited time offer
              </p>

              {/* Timer */}
              {remaining ? (
                <div className="mt-4 flex justify-between text-center">

                  <div className="flex-1">
                    <p className="text-lg font-bold">{remaining.days}</p>
                    <span className="text-xs">Days</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold">{remaining.hours}</p>
                    <span className="text-xs">Hours</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold">{remaining.minutes}</p>
                    <span className="text-xs">Min</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold">{remaining.seconds}</p>
                    <span className="text-xs">Sec</span>
                  </div>

                </div>
              ) : (
                <p className="mt-4 text-center text-red-300 font-semibold">
                  ⛔ Offer Expired
                </p>
              )}

              {/* CTA */}
              <Link href={mb.monthlyBountyLink} target="_blank">
                <button className="w-full cursor-pointer mt-5 px-6 py-3 rounded-xl bg-white text-green-700 font-semibold active:scale-95">
                  Claim Monthly Reward
                </button>
              </Link>

            </div>
          </div>
        );
      })}
    </>
  );
}