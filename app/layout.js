
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { DailyBountyProvider } from "@/context/DailyBountyContext";
import { MonthlyBountyProvider } from "@/context/MonthlyBountyContext";
import { Toaster } from "react-hot-toast";
import PWARegister from "./PWARegister";
import PWAInstall from "@/components/PWAInstall";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PocketMoney",
  description: "Earn rewards and withdraw easily",
  manifest: "/manifest.json",
  themeColor: "#16a34a",
};

export default function RootLayout({ children }) {



  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col " suppressHydrationWarning >
        <UserProvider>
          <DailyBountyProvider>
            <MonthlyBountyProvider>
              <Toaster
                position="top-right"
                reverseOrder={true}
              />
              <PWARegister />
              <PWAInstall />
            {children}
          </MonthlyBountyProvider>
          </DailyBountyProvider>
        </UserProvider>
        </body>
    </html>
  );
}
