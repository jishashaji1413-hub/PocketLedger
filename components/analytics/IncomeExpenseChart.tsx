"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function IncomeExpenseChart({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expense,
    },
  ];

  const hasData = income > 0 || expense > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-[320px] sm:h-[420px]">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-500 mb-4">
        Income vs Expense
      </h2>

      {!hasData ? (
        <div className="flex items-center justify-center h-[240px] sm:h-[320px]">
          <p className="text-gray-500">
            No transaction data available.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              dataKey="name"
              tick={{
                fontSize: 13,
              }}
            />

            <YAxis
              tick={{
                fontSize: 13,
              }}
            />

           <Tooltip
  formatter={(value) => [
    `₹${Number(value).toFixed(2)}`,
    "Amount",
  ]}
/>

            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              maxBarSize={70}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}