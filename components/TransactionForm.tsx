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
      className="border rounded-lg p-4 space-y-4"
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expense
        </button>

        <button
          type="button"
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </button>
      </div>

      <input
        type="text"
        required
        placeholder="Description"
        className="border rounded w-full p-2 text-black"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        required
        min="1"
        placeholder="Amount"
        className="border rounded w-full p-2 text-black"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="border rounded w-full p-2 text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}