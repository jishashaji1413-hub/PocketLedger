"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" fill="#6d8af5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}