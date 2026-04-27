"use client";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { BiMessageSquareAdd } from "react-icons/bi";
import { FaHome, FaUserCog } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">

      <div className="w-full  max-w-md bg-white/90 dark:bg-black/60 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-10 py-3 rounded-t-2xl shadow-lg">

        {/* 🏠 Home */}
        <Link
          href={"/"}
          className={`flex flex-col items-center dark:text-gray-300 hover:text-green-600 ${pathname === "/"
            ? "text-green-700"
            : "text-gray-700"}`}
        >
          <span className="text-xl"> <FaHome /> </span>
          <span className="text-xs">Home</span>
        </Link>

        {/* ➕ Plus (Center Big Button) */}
        <Link
          href={user ? '/wallet' : "/login" }
          // onClick={() => router.push("/create-bounty")}
          className="relative -top-6 bg-gradient-to-r from-green-500 to-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-black"
        >
          <span className="text-2xl"><GiWallet /></span>
        </Link>

        {/* 👤 Profile */}
        <Link
          href={user?"/profile":"/login"}
          className={`flex flex-col items-center dark:text-gray-300 hover:text-green-600 ${pathname === "/profile"
            ? "text-green-700"
            : "text-gray-700"}`}
        >
          <span className="text-xl"><FaUserCog /></span>
          <span className="text-xs">
           {user ? "Profile" : "Login"}
            </span>
        </Link>

      </div>
    </div>
  );
}