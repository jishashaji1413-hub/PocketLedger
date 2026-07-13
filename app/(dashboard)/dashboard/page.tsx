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
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch(
        `/api/transactions?userId=${user.id}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setTransactions(data);
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
      <div className="p-8">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-400">
        DASHBOARD
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome back! Here is your financial overview.
      </p>

      <Summary transactions={transactions} />
    </div>
  );
}