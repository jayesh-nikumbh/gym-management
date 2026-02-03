import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import ProfileModal from "../components/ProfileModal";
import defaultAvatar from "../assets/user.jpg";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Attendance() {
  const { user } = useAuth();
  const email = user?.email;

  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [weekType, setWeekType] = useState("thisWeek");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [attendanceData, setAttendanceData] = useState([]);

  /* ================= PROFILE STATES ================= */
  const [profileImage, setProfileImage] = useState();
  const [showProfile, setShowProfile] = useState(false);

  /* ================= CHECK TODAY ATTENDANCE ================= */
  useEffect(() => {
    if (!email) return;

    const checkAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/attendance/status/${email}`
        );
        const data = await res.json();
        setMarked(data.marked);
      } catch (err) {
        console.error(err);
      }
    };

    checkAttendance();
  }, [email]);

  /* ================= FETCH USER ATTENDANCE ================= */
  const fetchAttendanceData = async () => {
    if (!email) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/attendance/${email}`
      );
      const data = await res.json();

      const dates = data.attendance?.map((a) => a.date) || [];
      setAttendanceData(generateWeeklyAttendance(dates, weekType));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (email) fetchAttendanceData();
  }, [email, weekType]);

  /* ================= CLOCK ================= */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  /* ================= MARK ATTENDANCE ================= */
  const submitAttendance = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setMarked(true);
      toast.success("Attendance marked successfully!");
      await fetchAttendanceData();
      setShowPassword(false);
      setPassword("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SET PROFILE IMAGE ================= */
  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || "/default-profile.png");
    }
  }, [user]);

  return (
    <div className="min-h-screen pt-28 pb-20 flex flex-col items-center bg-linear-to-br from-black via-zinc-900 to-black text-white">

      {/* ================= ATTENDANCE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center relative"
      >
        <span
          className={`absolute -top-3 right-4 px-3 py-1 text-xs rounded-full font-semibold ${
            marked ? "bg-green-600" : "bg-yellow-500 text-black"
          }`}
        >
          {marked ? "PRESENT" : "NOT MARKED"}
        </span>

        <h2 className="text-3xl font-extrabold mb-2">Attendance</h2>

        {/* ================= PROFILE IMAGE ================= */}
        <img
          src={defaultAvatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2 object-cover border-2 border-green-600 mx-auto"
          onError={(e) => (e.currentTarget.src = "/default-profile.png")}
        />

        <p className="text-gray-400 mb-4">
          Hello, <span className="text-white font-semibold">{user?.name}</span>
        </p>

        <button
          onClick={() => setShowProfile(true)}
          className="mt-2 w-full py-2 rounded-xl border border-white/20 hover:bg-white/10"
        >
          Edit Profile
        </button>

        <div className="mb-6 mt-4">
          <p className="text-sm text-gray-400">{time.toLocaleDateString()}</p>
          <p className="text-lg font-mono text-green-400">{time.toLocaleTimeString()}</p>
        </div>

        {!marked && !showPassword && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setShowPassword(true)}
            className="w-full py-3 rounded-xl font-semibold bg-green-600 hover:bg-green-700"
            
          >
            Mark Attendance
          </motion.button>
        )}

        {marked && (
          <button
            className="w-full py-3 rounded-xl font-semibold bg-gray-600 cursor-not-allowed"
            type="submit"
          >
            Attendance Marked
          </button>
        )}

        {showPassword && !marked && (
          <div className="mt-4 space-y-3">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-white/20 text-white"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={submitAttendance}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Marking..." : "Confirm Attendance"}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* ================= WEEKLY CHART ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-10 w-[95%] max-w-4xl bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Weekly Attendance</h3>
          <select
            value={weekType}
            onChange={(e) => setWeekType(e.target.value)}
            className="bg-black border border-white/20 text-white px-3 py-1 rounded-md"
          >
            <option value="thisWeek">This Week</option>
            <option value="lastWeek">Last Week</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis ticks={[0, 1]} stroke="#aaa" />
            <Tooltip
              formatter={(v) => (v === 1 ? "Present" : "Absent")}
              contentStyle={{ backgroundColor: "#111", border: "none" }}
            />
            <Line
              type="monotone"
              dataKey="present"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ================= PROFILE MODAL ================= */}
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}
    </div>
  );
}

/* ================= WEEKLY DATA GENERATOR ================= */
function generateWeeklyAttendance(attendanceDates, weekType) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentDay = today.getDay();

  const start =
    weekType === "thisWeek"
      ? new Date(today.setDate(today.getDate() - currentDay))
      : new Date(today.setDate(today.getDate() - currentDay - 7));

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const iso = date.toISOString().split("T")[0];

    return {
      day: days[date.getDay()],
      present: attendanceDates.includes(iso) ? 1 : 0,
    };
  });
}
