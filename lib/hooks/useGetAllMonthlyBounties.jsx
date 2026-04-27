"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMonthlyBounty } from "@/context/MonthlyBountyContext";

export const useGetAllMonthlyBounties = () => {
  const { monthlyBounties, setMonthlyBounties, setMonthlyBountyLoading, 
    setMonthlyBountyError } = useMonthlyBounty();

  
  const fetchBounties = async () => {
    try {
      setMonthlyBountyLoading(true);
      setMonthlyBountyError(null);

      const res = await api("/bounty/get-all-monthly");
      // console.log(res)
     
      if (res.success) {
        setMonthlyBounties(res.data);
    
      } else {
        setMonthlyBountyError(res.message);
      }
    } catch (err) {
      setMonthlyBountyError(err.message);
    } finally {
      setMonthlyBountyLoading(false);
    }
  };

  // 🔥 auto fetch on mount
  useEffect(() => {
    fetchBounties();
  }, []);

  return {
    monthlyBounties,
    refetch: fetchBounties,
  };
};