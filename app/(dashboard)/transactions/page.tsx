"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import { Transaction } from "@/types/transaction";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadTransactions() {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch(
        `/api/transactions?userId=${user.id}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setTransactions(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function deleteTransaction(id: string) {
    try {
      const res = await fetch(
        `/api/transactions?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      await loadTransactions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  }

  // Search filter
  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    return (
      transaction.description.toLowerCase().includes(searchText) ||
      transaction.category.toLowerCase().includes(searchText) ||
      transaction.amount.toString().includes(searchText) ||
      new Date(transaction.date)
        .toLocaleDateString()
        .includes(searchText)
    );
  });

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-400">
        TRANSACTIONS
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Add, view and manage your transactions.
      </p>

      {/* Add Transaction */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">
          Add Transaction
        </h2>

        <TransactionForm onAdd={loadTransactions} />
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold text-blue-400">
            Transaction History
          </h2>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <TransactionTable
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onUpdate={loadTransactions}
        />
      </div>
    </div>
  );
}