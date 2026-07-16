"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import { Transaction } from "@/types/transaction";
import { useRouter } from "next/navigation";

const LIMIT = 5;

export default function TransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [debouncedSearch, setDebouncedSearch] = useState("");
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
      `/api/transactions?userId=${user.id}&page=${page}&limit=${LIMIT}&search=${encodeURIComponent(debouncedSearch)}`,
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
 // Wait 500ms after typing
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
    setPage(1);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

// Fetch whenever page changes or debounced search changes
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
          transactions={transactions}
          onDelete={deleteTransaction}
          onUpdate={loadTransactions}
          page={page}
          limit={LIMIT}
        />

        {/* Pagination */}

        <div className="flex items-center justify-between mt-8">

          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}