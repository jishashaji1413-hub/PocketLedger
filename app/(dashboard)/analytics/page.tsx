"use client";

import { useEffect, useState } from "react";
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



  async function loadTransactions() {
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
  }
    useEffect(() => {
    loadTransactions();
  }, []);

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
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-300 min-h-screen">

      <h1 className="text-3xl font-bold text-blue-400">
        ANALYTICS
      </h1>

      <p className="text-gray-500 mb-8">
        Visualize your spending habits and income.
      </p>

      <Summary transactions={transactions} />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <PieChartCard
          data={pieData}
        />

        <IncomeExpenseChart
          income={income}
          expense={expense}
        />

      </div>

      <div className="mb-8">

        <MonthlyChart
          data={monthlyData}
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

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

      <CategoryTable
        data={pieData}
      />

    </div>
  );
}