"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function PieChartCard({
  data,
}: {
  data: {
    category: string;
    amount: number;
  }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-[320px] sm:h-[420px]">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-500 mb-4">
        Expense By Category
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[240px] sm:h-[320px]">
          <p className="text-gray-500">
            No expense data available.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="45%"
              outerRadius="65%"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}