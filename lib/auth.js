"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api("/login", "POST", { email, password });

    if (res.success) {
      window.location.href = "/dashboard/user";
    } else {
      alert(res.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// lib/auth.js
export const checkAuth = async () => {
  const res = await fetch("http://localhost:7000/api/me", {
    credentials: "include",
  });

  return res.json();
};