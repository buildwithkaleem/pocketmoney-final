
"use client";

import { createContext, useContext, useState } from "react";

const PopupContext = createContext(null);

export const PopupProvider = ({ children }) => {
  
  const [popup, setPopup] = useState(false);
  

  return (
    <PopupContext.Provider
      value={{
        popup,
        setPopup
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// safe hook
export const usePopup = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("useUser must be used inside PopupProvider");
  }

  return context;
};