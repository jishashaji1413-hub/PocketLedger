"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Summary from "@/components/Summary";
import { Transaction } from "@/types/transaction";

export default function DashboardPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      const userRes = await fetch("/api/user");

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const user = await userRes.json();

      const transactionRes = await fetch(
        `/api/transactions?userId=${user.id}&all=true`,
        {
          cache: "no-store",
        }
      );

      const data = await transactionRes.json();

      if (!transactionRes.ok) {
        alert(data.message);
        return;
      }

      setTransactions(data.transactions);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h2 className="text-lg md:text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-500">
          DASHBOARD
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Welcome back! Here is your financial overview.
        </p>
      </div>

      {/* Summary Cards */}

      <Summary transactions={transactions} />

    </div>
  );
}