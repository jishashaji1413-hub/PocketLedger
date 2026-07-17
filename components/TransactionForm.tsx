"use client";

import { useState } from "react";

const CATEGORIES = [
  "Food",
  "Rent",
  "Salary",
  "Transport",
  "Entertainment",
  "Other",
];

type TransactionFormProps = {
  onAdd: () => Promise<void> | void;
};

export default function TransactionForm({
  onAdd,
}: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description.trim() || !amount) {
      alert("Please fill all fields.");
      return;
    }

    const value = Number(amount);

    if (isNaN(value) || value <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login again.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user.id) {
      alert("Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description.trim(),
          amount:
            type === "expense"
              ? -Math.abs(value)
              : Math.abs(value),
          category,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setDescription("");
      setAmount("");
      setCategory(CATEGORIES[0]);
      setType("expense");

      await onAdd();

      alert("Transaction added successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl bg-white p-4 sm:p-6 space-y-5"
    >
      {/* Income / Expense */}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`py-3 rounded-lg font-medium transition ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Expense
        </button>

        <button
          type="button"
          onClick={() => setType("income")}
          className={`py-3 rounded-lg font-medium transition ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Income
        </button>
      </div>

      {/* Form Fields */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          required
          placeholder="Description"
          className="border rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          required
          min="1"
          placeholder="Amount"
          className="border rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}