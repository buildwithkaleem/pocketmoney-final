"use client";

import { useEffect, useState } from "react";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User installed app");
    }

    setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">

        <span className="text-sm font-semibold">
          Install PocketMoney App 🚀
        </span>

        <button
          onClick={installApp}
          className="bg-white text-green-700 px-3 py-1 rounded-lg font-semibold"
        >
          Install
        </button>
      </div>
    </div>
  );
}