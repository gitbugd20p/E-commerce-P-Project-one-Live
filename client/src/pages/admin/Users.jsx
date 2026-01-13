import { useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAdminStore from "./../../store/useAdminStore";

const Users = () => {
  const { users, userLoading, loadUsers } = useAdminStore();

  useEffect(() => {
    if (users.length === 0) {
      loadUsers();
    }
  }, [loadUsers, users.length]);

  if (userLoading)
    return (
      <div className="animate-pulse p-10 text-center font-black uppercase italic">
        Syncing User Database...
      </div>
    );

  return (
    <div className="bg-base-100 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          User Directory
        </h1>
        <p className="font-medium text-gray-500">
          Managing {users.length} verified customers.
        </p>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="table w-full rounded-none">
          <thead className="bg-black text-xs text-white uppercase italic">
            <tr>
              <th>User Info</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-black/10 transition-colors hover:bg-gray-50"
                >
                  {/* User Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary border border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <FaUserCircle size={24} />
                      </div>
                      <div>
                        <div className="text-lg font-black tracking-tight lowercase">
                          {user.email.split("@")[0]}{" "}
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[12px] text-gray-400">
                          <FaEnvelope size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span className="badge badge-outline rounded-none border-2 border-black px-3 text-[10px] font-bold uppercase italic">
                      {user.role}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <FaCalendarAlt className="text-black" />
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="text-right">
                    <button
                      onClick={() =>
                        toast.info("Delete functionality coming soon")
                      }
                      className="btn btn-ghost btn-xs text-error hover:bg-error/10 rounded-none border-0 px-3 py-4"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center font-bold text-gray-400"
                >
                  No registered customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
