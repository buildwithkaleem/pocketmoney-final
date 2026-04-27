"use client"
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";

const HomeTabs = () => {

  const pathname = usePathname();
    

  return (
    <div>
      <div className="flex justify-center ">

        {/* 📱 App Card Container */}
        <section className=" w-full max-w-md bg-white/90 dark:bg-black/50 backdrop-blur-lg p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">



          <div className="flex gap-1">

            {/* 🟢 Daily */}
            <Link
            href={'/'}
              // onClick={() => router.push("/")}
              className={`flex-1 text-center py-3 text-sm rounded-xl ${pathname === "/"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                : "text-gray-500"
                }`}
            >
              Daily
            </Link>

            {/* 🟢 Monthly */}
            <Link
              href={'/monthly-reward'}
              // onClick={() => router.push("/monthly")}
              className={`flex-1 text-center py-3 text-sm rounded-xl ${pathname === "/monthly-reward"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                : "text-gray-500"
                }`}
            >
              Monthly
            </Link>

            {/* 🟢 Guide */}
            <Link
              href={'/guide'}
              // onClick={() => router.push("/guide")}
              className={`flex-1 text-center py-3 text-sm rounded-xl ${pathname === "/guide"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                : "text-gray-500"
                }`}
            >
              Guide
            </Link>

          </div>

        </section>
      </div>
    </div>
  )
}

export default HomeTabs
