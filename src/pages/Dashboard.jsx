import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MemberStatsChart from "../components/MemberStatsChart";
import AttendanceChart from "../components/AttendanceChart";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("members");

  /* ================= USERS ================= */
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= ATTENDANCE ================= */
  const [attendanceData, setAttendanceData] = useState([]);

  /* ================= UPDATE MODAL ================= */
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  /* ================= DELETE CONFIRM ================= */
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  /* ================= FILTERS & SEARCH ================= */
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setMembers(data);

        // ================= DYNAMIC ATTENDANCE =================
        const formattedData = data.map((u) => ({
          id: u._id,
          name: u.name,
          attendance: u.attendance.map((a) => {
            const dateObj = new Date(a.date);
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return {
              day: days[dateObj.getDay()],
              present: true, // Because this date exists in DB
            };
          }),
        }));

        setAttendanceData(formattedData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================= OPEN UPDATE MODAL ================= */
  const openEditModal = (user) => {
    setEditUser({ ...user });
    setShowModal(true);
  };

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${editUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editUser.name,
            email: editUser.email,
            role: editUser.role,
            plan: editUser.plan,
          }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setMembers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u)),
      );

      setShowModal(false);
      toast.success(`User "${updated.name}" updated successfully`);
    } catch (err) {
      toast.error("Failed to update user");
      console.error(err);
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userToDelete._id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Delete failed");

      setMembers((prev) => prev.filter((u) => u._id !== userToDelete._id));

      toast.success(`User "${userToDelete.name}" deleted successfully`);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  const filteredMembers = members
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
    .filter((u) => (planFilter === "all" ? true : u.plan === planFilter))
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, planFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 mb-8">
        {["members", "attendance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full ${
              activeTab === tab ? "bg-black text-white" : "bg-white border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= MEMBERS ================= */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-60"
        />

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        {/* Plan Filter */}
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Plans</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {activeTab === "members" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {loading ? (
              <p className="p-6 text-center text-gray-500">
                Loading members...
              </p>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-center">Attendance</th>
                      <th className="px-6 py-4 text-center">Role</th>
                      <th className="px-6 py-4 text-center">Plan</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedMembers.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 font-medium">{u.name}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4 text-center">
                          {u.attendance?.length || 0}
                        </td>
                        <td className="px-6 py-4 text-center capitalize">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              u.role === "admin"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center capitalize">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100">
                            {u.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => openEditModal(u)}
                              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                setUserToDelete(u);
                                setShowDeleteConfirm(true);
                              }}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded-lg disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === i + 1 ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

          <div className="mt-6">
            <MemberStatsChart members={members} />
          </div>
        </>
      )}

      {/* ================= ATTENDANCE ================= */}
      {activeTab === "attendance" && <AttendanceChart data={members} />}

      {/* ================= UPDATE MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Update Member
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                value={editUser.name}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
              />
              <input
                name="email"
                value={editUser.email}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
              />
              <select
                name="role"
                value={editUser.role}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                name="plan"
                value={editUser.plan}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                className="px-5 py-2 bg-black text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-xl font-bold mb-3">Confirm Delete</h3>
            <p className="mb-6">
              Delete <b>{userToDelete?.name}</b> ?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="w-1/2 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="w-1/2 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
