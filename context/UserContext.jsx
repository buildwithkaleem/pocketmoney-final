// "use client";

// import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // custom hook
// export const useUser = () => useContext(UserContext);




"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);

  // optional: refetch trigger function
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLoading,
        setUserLoading,
        refetch,
        refreshKey,
        error,
        setError
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// safe hook
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};