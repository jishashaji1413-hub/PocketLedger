"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MonthlyChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">
        Monthly Spending
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}