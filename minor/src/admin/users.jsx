import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
   

  const state=useLocation().state.stats.userdata
  //console.log(state)
 
  useEffect(() => {
    async function fetchUsers() {
      try {
     
        setUsers(state);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.role]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-600 text-sm">
            Manage all registered platform users
          </p>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-gray-500">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Joined</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="font-medium">{u.name || "—"}</div>
                    <div className="text-gray-500 text-xs">{u.email}</div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <RoleBadge role={u.role} />
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <StatusBadge status={u.status} />
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate("/admin/users/details", {
                          state: { id: u._id },
                        })
                      }
                      className="px-4 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── */

function RoleBadge({ role }) {
  const styles = {
    admin: "bg-purple-100 text-purple-700",
    company: "bg-blue-100 text-blue-700",
    user: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[role] || "bg-gray-200"
      }`}
    >
      {role || "user"}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    blocked: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-200"
      }`}
    >
      {status || "active"}
    </span>
  );
}
