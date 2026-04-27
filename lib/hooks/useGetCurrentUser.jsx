// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api"; // 👈 tumhara api helper

// export function useGetCurrentUser() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUser = async () => {
//     try {
//       setLoading(true);

//       const res = await api("/user/find-me", "GET");

//       if (res.success) {
//         setUser(res.data);
//       } else {
//         setError(res.message);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return {
//     user,
//     loading,
//     error,
//     refetch: fetchUser, // 🔁 dubara call karne ke liye
//   };
// }


"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { useUser } from "@/context/UserContext";

export const useGetCurrentUser = () => {
  const { user, setUser, setError, userLoading,
    setUserLoading, } = useUser();

  const fetchUser = async () => {
    setError(null)
    setUserLoading(true)
    try {
      const res = await api("/user/find-me");

      if (res.success) {
        setUser(res.data);
      } else {
        setUser(null);
        setError(res.message)
      }
    } catch (err) {
      setUser(null);
      setError(err.message)
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setUserLoading(false);
    }
  }, []);

  return { user,userLoading, refetch: fetchUser };
};