import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function MemberStatsChart({ members }) {
  const data = members.map((m) => ({
    name: m.name,
    attendance: m.attendanceCount,
    fees: m.feesPaid,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-105">
      <h2 className="text-xl font-bold mb-4">
        Member Activity & Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Attendance */}
          <Bar
            dataKey="attendance"
            name="Attendance Days"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          {/* Fees */}
          <Line
            type="monotone"
            dataKey="fees"
            name="Fees Paid (₹)"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
