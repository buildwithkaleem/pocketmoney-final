"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useDailyBounty } from "@/context/DailyBountyContext";

export const useGetAllBounties = () => {
  const { dailyBounties, setDailyBounties, setdailyBountyLoading, addBounty,
    setDailyBountyError, } = useDailyBounty();

  
  const fetchBounties = async () => {
    let visitorId = localStorage.getItem("visitorId");
    try {
      setdailyBountyLoading(true);
      setDailyBountyError(null);

      const res = await api("/bounty/get-all", "GET", null,
        {
          "visitor-id": visitorId,
        });

        console.log(res)
     
      if (res.success) {
        setDailyBounties(res.data);
    
      } else {
        setDailyBountyError(res.message);
      }
    } catch (err) {
      setDailyBountyError(err.message);
    } finally {
      setdailyBountyLoading(false);
    }
  };

  // 🔥 auto fetch on mount
  useEffect(() => {
    fetchBounties();
  }, []);

  return {
    dailyBounties,
    refetch: fetchBounties,
  };
};