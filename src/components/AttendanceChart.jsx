import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AttendanceChart({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(data[0] || null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return data.filter(m =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Map actual attendance data for selected member
  const attendanceDays = useMemo(() => {
    if (!selectedMember || !selectedMember.attendance) return [];

    // Get all attendance for the selected month/year
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      present: false,
    }));

    selectedMember.attendance.forEach(a => {
      const date = new Date(a.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        days[date.getDate() - 1].present = true;
      }
    });

    return days;
  }, [selectedMember, month, year]);

  const monthPresentCount = attendanceDays.filter(d => d.present).length;
  const yearPresentCount = selectedMember?.attendance.filter(a => {
    const date = new Date(a.date);
    return date.getFullYear() === year;
  }).length || 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">Attendance Calendar</h2>

        {/* SEARCHABLE MEMBER SELECT */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          {searchTerm && filteredMembers.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 max-h-48 overflow-y-auto z-10 shadow-md">
              {filteredMembers.map(m => (
                <li
                  key={m._id}
                  onClick={() => {
                    setSelectedMember(m);
                    setSearchTerm(""); // clear search after select
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {m.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedMember && (
        <>
          {/* FILTERS */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border px-3 py-2 rounded"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border px-3 py-2 rounded"
            >
              {[2023, 2024, 2025, 2026].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* COUNTS */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Present this month</p>
              <p className="text-3xl font-bold text-green-600">
                {monthPresentCount}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Present this year</p>
              <p className="text-3xl font-bold text-blue-600">
                {yearPresentCount}
              </p>
            </div>
          </div>

          {/* CALENDAR GRID */}
          <div className="grid grid-cols-7 gap-3">
            {attendanceDays.map((d) => (
              <motion.div
                key={d.day}
                whileHover={{ scale: 1.1 }}
                className={`h-12 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer
                  ${d.present ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                `}
              >
                {d.day}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
