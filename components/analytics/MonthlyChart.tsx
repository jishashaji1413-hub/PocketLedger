"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type MonthlyData = {
  month: string;
  expense: number;
};

export default function MonthlyChart({
  data,
}: {
  data: MonthlyData[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-[320px] sm:h-[420px]">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-500 mb-4">
        Monthly Spending
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[240px] sm:h-[320px]">
          <p className="text-gray-500">
            No monthly expense data available.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                "Expense",
              ]}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}