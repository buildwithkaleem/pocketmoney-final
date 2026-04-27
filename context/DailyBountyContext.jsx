// "use client";

// import { createContext, useContext, useState } from "react";

// const DailyBountyContext = createContext();

// export const DailyBountyProvider = ({ children }) => {
//   const [dailyBounties, setDailyBounties] = useState([]);

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

const DailyBountyContext = createContext(null);

export const DailyBountyProvider = ({ children }) => {
  const [dailyBounties, setDailyBounties] = useState([]);
  const [dailyBountyLoading, setdailyBountyLoading] = useState(true);
  const [dailyBountyError, setDailyBountyError] = useState(null);

  const updateDailyBounty = (id, data) => {
    setDailyBounties((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...data } : b))
    );
  };

  const removeBounty = (id) => {
    setDailyBounties((prev) => prev.filter((b) => b._id !== id));
  };

  const addBounty = (bounty) => {
    setDailyBounties((prev) => [bounty, ...prev]);
  };

  return (
    <DailyBountyContext.Provider
      value={{
        dailyBounties,
        setDailyBounties,
        updateDailyBounty,
        removeBounty,
        addBounty,
        dailyBountyLoading,
        setdailyBountyLoading,
        dailyBountyError,
        setDailyBountyError
      }}
    >
      {children}
    </DailyBountyContext.Provider>
  );
};

// ✅ safe hook
export const useDailyBounty = () => {
  const context = useContext(DailyBountyContext);

  if (!context) {
    throw new Error("useDailyBounty must be used inside DailyBountyProvider");
  }

  return context;
};