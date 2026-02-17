import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dummyMember = {
  _id: "dummy",
  name: "Select a Member",
  attendance: []
};

export default function AttendanceChart({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(dummyMember);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dropdownRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Filter members
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(m =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Attendance days calculation
  const attendanceDays = useMemo(() => {
    if (!selectedMember?.attendance) return [];

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

  const yearPresentCount =
    selectedMember?.attendance.filter(a => {
      const date = new Date(a.date);
      return date.getFullYear() === year;
    }).length || 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  setHighlightIndex(-1);
}, [searchTerm]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Attendance Calendar</h2>

      {/* SEARCH + FILTERS */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">

        {/* SEARCH DROPDOWN */}
        <div ref={dropdownRef} className="relative w-64">
          <input
            type="text"
            placeholder="Search member..."
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              setSearchTerm(value);
              setIsOpen(true);

              if (value.trim() === "") {
                setSelectedMember(dummyMember);
              }
            }}
            onKeyDown={(e) => {
              if (!isOpen || filteredMembers.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev < filteredMembers.length - 1 ? prev + 1 : 0
                );
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredMembers.length - 1
                );
              }

              if (e.key === "Enter") {
                e.preventDefault();

                const indexToSelect =
                  highlightIndex >= 0 ? highlightIndex : 0;

                const selected = filteredMembers[indexToSelect];

                if (selected) {
                  setSelectedMember(selected);
                  setInputValue(selected.name);
                  setSearchTerm("");
                  setIsOpen(false);
                  setHighlightIndex(-1);
                }
              }

              if (e.key === "Escape") {
                setIsOpen(false);
                setHighlightIndex(-1);
              }
            }}

            className="border px-3 py-2 rounded w-full cursor-pointer"
          />

          {isOpen && filteredMembers.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 max-h-48 overflow-y-auto z-20 shadow-md">
              {filteredMembers.map((m, index) => (
                <li
                  key={m._id}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => {
                    setSelectedMember(m);
                    setInputValue(m.name);
                    setSearchTerm("");
                    setIsOpen(false);
                    setHighlightIndex(-1);
                  }}
                  className={`px-3 py-2 cursor-pointer ${
                  index === highlightIndex
                    ? "bg-green-200"
                    : "hover:bg-green-100"
                }`}
                >
                  {m.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* MONTH + YEAR */}
        <div className="flex gap-4">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border px-3 py-2 rounded cursor-pointer"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border px-3 py-2 rounded cursor-pointer"
          >
            {[2023, 2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedMember && (
        <>
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