// "use client";

// import { createContext, useContext, useState } from "react";

// const DailyBountyContext = createContext();

// export const DailyBountyProvider = ({ children }) => {
//   const [monthlyBounties, setMonthlyBounties] = useState([]);

//   const updateDailyBounty = (id, data) => {
//     setDailyBounties((prev) =>
//       prev.map((b) => (b._id === id ? { ...b, ...data } : b))
//     );
//   };

//   return (
//     <DailyBountyContext.Provider value={{ dailyBounties, setDailyBounties, updateDailyBounty }}>
//       {children}
//     </DailyBountyContext.Provider>
//   );
// };

// export const useBounty = () => useContext(DailyBountyContext);











"use client";

import { createContext, useContext, useState } from "react";

const MonthlyBountyContext = createContext(null);

export const MonthlyBountyProvider = ({ children }) => {
  const [monthlyBounties, setMonthlyBounties] = useState([]);
  const [monthlyBountyLoading, setMonthlyBountyLoading] = useState(false);
  const [monthlyBountyError, setMonthlyBountyError] = useState(null);

  const updateMonthlyBounty = (id, data) => {
    setMonthlyBounties((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...data } : b))
    );
  };

  const removeMonthlyBounty = (id) => {
    setMonthlyBounties((prev) => prev.filter((b) => b._id !== id));
  };

  const addMonthlyBounty = (bounty) => {
    setMonthlyBounties((prev) => [bounty, ...prev]);
  };

  return (
    <MonthlyBountyContext.Provider
      value={{
        monthlyBounties,
        setMonthlyBounties,
        updateMonthlyBounty,
        removeMonthlyBounty,
        addMonthlyBounty,
        monthlyBountyLoading,
        setMonthlyBountyLoading,
        monthlyBountyError,
        setMonthlyBountyError
      }}
    >
      {children}
    </MonthlyBountyContext.Provider>
  );
};

// ✅ safe hook
export const useMonthlyBounty = () => {
  const context = useContext(MonthlyBountyContext);

  if (!context) {
    throw new Error("useDailyBounty must be used inside MonthlyBountyProvider");
  }

  return context;
};