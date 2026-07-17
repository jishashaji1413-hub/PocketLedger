"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";

import { Transaction } from "@/types/transaction";

const LIMIT = 5;

export default function TransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function loadTransactions() {
    try {
      setLoading(true);

      const userRes = await fetch("/api/user");

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const user = await userRes.json();

      const res = await fetch(
        `/api/transactions?userId=${user.id}&page=${page}&limit=${LIMIT}&search=${encodeURIComponent(
          debouncedSearch
        )}`,
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
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      alert("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadTransactions();
  }, [page, debouncedSearch]);

  async function deleteTransaction(id: string) {
    try {
      const res = await fetch(`/api/transactions?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      loadTransactions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  }

  if (loading && transactions.length === 0) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-300 min-h-screen">

      <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
        TRANSACTIONS
      </h1>

      <p className="text-gray-500 mt-2 mb-6 sm:mb-8">
        Add, view and manage your transactions.
      </p>

      {/* Add Transaction */}

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-400">
          Add Transaction
        </h2>

        <TransactionForm onAdd={loadTransactions} />

      </div>

      {/* History */}

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <h2 className="text-lg sm:text-xl font-semibold text-blue-400">
            Transaction History
          </h2>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

        <TransactionTable
          transactions={transactions}
          onDelete={deleteTransaction}
          onUpdate={loadTransactions}
        />

        {/* Pagination */}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700 text-center">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}