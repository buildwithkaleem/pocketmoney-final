"use client";

import { useUser } from "@/context/UserContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DotsLoader } from "../loaders/DotsLoader";

export default function ProfileInfo() {
  

  const { user, setUser, userLoading } = useUser();
  const [loading, setLoading] = useState(false)

  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    userName:  "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName || "",
        password: "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const payload = {
        userName: form.userName,
        gender: form.gender,
      };

      if (form.password) {
        payload.password = form.password;
      }

      const res = await api("/user/update", "POST", payload);

      if (res.success) {
        toast.success(`Profile Successfully Update ✅`);
        setUser((prev) => ({
          ...prev,
          userName: res.data.userName,
          gender: res.data.gender,
        }));
        setForm({
          userName: res.data.userName,
          password: "",
          gender: res.data.gender,
        });
        setEdit(false);
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error ❌"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 my-4">
      <div className="bg-white w-full max-w-md dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800">

        {!edit ? (
          <>
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
              Profile Info
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Username:</strong> {userLoading ? "..." : user?.userName }</p>
              {/* <p><strong>Password:</strong> </p> */}
              <p><strong>Gender:</strong> {userLoading ? "..." : user?.gender}</p>
            </div>

            <button
              onClick={() => setEdit(true)}
              className="mt-4 cursor-pointer w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
              Edit Profile
            </h2>

            <div className="space-y-3">

              {/* Username */}
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-900 dark:text-white"
              />

              {/* Password with eye icon */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 pr-12 rounded-lg border border-gray-300 dark:bg-gray-900 dark:text-white"
                />

                {/* 👁️ Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Gender */}
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-900 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* Buttons */}
              <div className="flex gap-2">

                <button
                  onClick={handleUpdate}
                  className="flex-1 py-2 rounded-xl bg-green-600 text-white"
                >
                    {loading ? "Save..." : "Save"}
                </button>

                <button
                  onClick={() => setEdit(false)}
                  className="flex-1 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                >
                  Cancel
                </button>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}