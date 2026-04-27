"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";



export default function UsersTable() {


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");
  const [balance, setBalance] = useState("");

  // 🔥 FETCH USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api("/admin/get-all-users");


      if (res.success) {
        setUsers(Array.isArray(res.data) ? res.data : []);
        
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  

  // ✏️ EDIT OPEN
  const openEdit = (user) => {
    setEditUser(user);
    setUserName(user.userName);
    setEmail(user.email);
    setRole(user.role || "user");
    setBalance(user.balance || 0);
    setNewPassword(""); // 🔥 password empty rakho (security)
  };

  // 💾 UPDATE USER
  const handleUpdate = async () => {
    try {
      const res = await api(`/admin/update-user/${editUser._id}`, "PUT", {
        userName,
        email,
        newPassword, // optional
        role,
        balance,
      });

      if (res.success) {
        toast.success("User updated");

        setUsers((prev) =>
          prev.map((u) =>
            u._id === editUser._id
              ? {
                ...u,
                userName,
                email,
                role,
                balance,
              }
              : u
          )
        );

        setEditUser(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // 🗑 DELETE USER
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await api(`/admin/delete-user/${id}`, "DELETE");

      if (res.success) {
        toast.success("User deleted");

        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="text-center mt-10 text-gray-500">
  //       Loading users...
  //     </div>
  //   );
  // }


  // if (!users.length) {
  //   return <div className="text-center mt-10">No users found</div>;
  // }

  return (
    <div className="flex justify-center px-3 mt-6">
      <div className="w-full max-w-6xl space-y-3">


        <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
          👥 All Users
        </h2>

        {/* USERS LIST */}
        {/* {users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-1"
          >
            <p><span className="font-semibold">Name:</span> {user.userName}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
            <p><span className="font-semibold">Binance:</span> {user.binanceNickName}</p>
            <p><span className="font-semibold">Balance:</span> {user.balance || 0}</p>
            <p><span className="font-semibold">Role:</span> {user.role || "user"}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(user)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))} */}

        
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
            >
              <p><span className="font-semibold">Name:</span> {user.userName}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Gender:</span> {user.gender}</p>
              <p><span className="font-semibold">Binance:</span> {user.binanceNickName}</p>
              <p><span className="font-semibold">Balance:</span> {user.balance || 0}</p>
              <p><span className="font-semibold">Role:</span> {user.role || "user"}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(user)}
                  className="flex-1 py-1 bg-blue-500 text-white rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex-1 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        

        {/* EDIT MODAL */}
        {editUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-black p-5 rounded-2xl w-[90%] max-w-md">

              <h2 className="text-lg font-bold mb-3 text-green-600">
                Edit User
              </h2>

              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="User Name"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Email"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="New Password (optional)"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full p-2 border rounded mb-3"
                placeholder="Balance"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}