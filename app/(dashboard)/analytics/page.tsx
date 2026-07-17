"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Transaction } from "@/types/transaction";

import Summary from "@/components/Summary";
import PieChartCard from "@/components/analytics/PieChartCard";
import IncomeExpenseChart from "@/components/analytics/IncomeExpenseChart";
import MonthlyChart from "@/components/analytics/MonthlyChart";
import InsightCard from "@/components/analytics/InsightCard";
import CategoryTable from "@/components/analytics/CategoryTable";

export default function AnalyticsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);



 const loadTransactions = useCallback(async () => {
    try {
      // Get logged-in user
      const userRes = await fetch("/api/user");

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const user = await userRes.json();

      // Get transactions
      const res = await fetch(
  `/api/transactions?userId=${user.id}&all=true`,
  {
    cache: "no-store",
  }
);

const data = await res.json();

if (!res.ok) {
  alert(data.message);
  return;
}

setTransactions(data.transactions);
    } catch (error) {
      console.error(error);
      alert("Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  },[router]);
 useEffect(() => {
  loadTransactions();
}, [loadTransactions]);

  // Income
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // Expense
  const expense = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  // Balance
  const balance = income - expense;

  // Total Transactions
  const totalTransactions = transactions.length;

  // Biggest Expense
  const biggestExpense = transactions
    .filter((t) => t.amount < 0)
    .sort((a, b) => a.amount - b.amount)[0];

  // Biggest Income
  const biggestIncome = transactions
    .filter((t) => t.amount > 0)
    .sort((a, b) => b.amount - a.amount)[0];

  // Average Expense
  const expenseTransactions = transactions.filter(
    (t) => t.amount < 0
  );

  const averageExpense =
    expenseTransactions.length === 0
      ? 0
      : expense / expenseTransactions.length;

  // Savings Rate
  const savingsRate =
    income === 0
      ? 0
      : ((balance / income) * 100).toFixed(1);

  // Pie Chart Data
  const categoryMap: {
    [key: string]: number;
  } = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((transaction) => {
      categoryMap[transaction.category] =
        (categoryMap[transaction.category] || 0) +
        Math.abs(transaction.amount);
    });

  const pieData = Object.entries(categoryMap).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  // Monthly Chart Data
  const monthMap: {
    [key: string]: number;
  } = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((transaction) => {
      const month = new Date(
        transaction.date
      ).toLocaleString("default", {
        month: "short",
      });

      monthMap[month] =
        (monthMap[month] || 0) +
        Math.abs(transaction.amount);
    });

  const monthlyData = Object.entries(monthMap).map(
    ([month, expense]) => ({
      month,
      expense,
    })
  );

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold text-gray-700">
        Loading Analytics...
      </h2>
    </div>
  );
}

  return (
   <div className="min-h-screen bg-gray-300 p-4 sm:p-6 md:p-8">

     <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
        ANALYTICS
      </h1>

     <p className="text-gray-600 mt-2 mb-6 sm:mb-8 text-sm sm:text-base">
        Visualize your spending habits and income.
      </p>

      <Summary transactions={transactions} />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <PieChartCard
          data={pieData}
        />

        <IncomeExpenseChart
          income={income}
          expense={expense}
        />

      </div>

      <div className="mb-6">

        <MonthlyChart
          data={monthlyData}
        />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
        <InsightCard
          title="Biggest Income"
          value={
            biggestIncome
              ? `₹${biggestIncome.amount.toFixed(2)}`
              : "₹0"
          }
        />

        <InsightCard
          title="Biggest Expense"
          value={
            biggestExpense
              ? `₹${Math.abs(biggestExpense.amount).toFixed(2)}`
              : "₹0"
          }
        />

        <InsightCard
          title="Average Expense"
          value={`₹${averageExpense.toFixed(2)}`}
        />

        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
        />

        <InsightCard
          title="Transactions"
          value={totalTransactions.toString()}
        />

        <InsightCard
          title="Balance"
          value={`₹${balance.toFixed(2)}`}
        />

      </div>

    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
  <CategoryTable data={pieData} />
</div>

    </div>
  );
}