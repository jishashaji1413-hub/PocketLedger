"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction";
import { Pencil, Trash2, Save, X } from "lucide-react";

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: () => Promise<void>;
};

export default function TransactionTable({
  transactions,
  onDelete,
  onUpdate,
}: Props) {
  const [editingId, setEditingId] = useState("");

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function saveChanges(id: string) {
    await fetch("/api/transactions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        description,
        amount,
        category,
      }),
    });

    setEditingId("");
    await onUpdate();
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}

      <div className="space-y-4 md:hidden">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="rounded-xl bg-white shadow border p-4"
          >
            <div className="space-y-3">

              <div>
                <p className="text-xs text-gray-500">Category</p>

                {editingId === transaction.id ? (
                  <input
                    className="border rounded-lg p-2 w-full text-black"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                ) : (
                  <p className="font-semibold text-black">
                    {transaction.category}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500">Description</p>

                {editingId === transaction.id ? (
                  <input
                    className="border rounded-lg p-2 w-full text-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <p className="text-black">
                    {transaction.description}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500">Date</p>

                <p className="text-black">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Amount</p>

                {editingId === transaction.id ? (
                  <input
                    type="number"
                    className="border rounded-lg p-2 w-full text-black"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Number(e.target.value))
                    }
                  />
                ) : (
                  <p
                    className={`font-bold ${
                      transaction.amount > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}₹
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">

                {editingId === transaction.id ? (
                  <>
                    <button
                      onClick={() =>
                        saveChanges(transaction.id)
                      }
                      className="p-2 rounded bg-green-100"
                    >
                      <Save
                        size={18}
                        className="text-green-700"
                      />
                    </button>

                    <button
                      onClick={() =>
                        setEditingId("")
                      }
                      className="p-2 rounded bg-gray-100"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(transaction.id);
                        setDescription(
                          transaction.description
                        );
                        setCategory(transaction.category);
                        setAmount(transaction.amount);
                      }}
                      className="p-2 rounded bg-blue-100"
                    >
                      <Pencil
                        size={18}
                        className="text-blue-700"
                      />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(transaction.id)
                      }
                      className="p-2 rounded bg-red-100"
                    >
                      <Trash2
                        size={18}
                        className="text-red-700"
                      />
                    </button>
                  </>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-black">
                  {editingId === transaction.id ? (
                    <input
                      className="border rounded-lg p-2 w-full"
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                    />
                  ) : (
                    transaction.category
                  )}
                </td>

                <td className="px-6 py-4 text-black">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-black">
                  {editingId === transaction.id ? (
                    <input
                      className="border rounded-lg p-2 w-full"
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                    />
                  ) : (
                    transaction.description
                  )}
                </td>

                <td
                  className={`px-6 py-4 font-semibold ${
                    transaction.amount > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {editingId === transaction.id ? (
                    <input
                      type="number"
                      className="border rounded-lg p-2 w-full text-black"
                      value={amount}
                      onChange={(e) =>
                        setAmount(Number(e.target.value))
                      }
                    />
                  ) : (
                    <>
                      {transaction.amount > 0 ? "+" : "-"}₹
                      {Math.abs(transaction.amount).toFixed(2)}
                    </>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">

                    {editingId === transaction.id ? (
                      <>
                        <button
                          onClick={() =>
                            saveChanges(transaction.id)
                          }
                        >
                          <Save
                            size={18}
                            className="text-green-600"
                          />
                        </button>

                        <button
                          onClick={() =>
                            setEditingId("")
                          }
                        >
                          <X
                            size={18}
                            className="text-gray-700"
                          />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(
                              transaction.id
                            );
                            setDescription(
                              transaction.description
                            );
                            setCategory(
                              transaction.category
                            );
                            setAmount(
                              transaction.amount
                            );
                          }}
                        >
                          <Pencil
                            size={18}
                            className="text-blue-600"
                          />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(transaction.id)
                          }
                        >
                          <Trash2
                            size={18}
                            className="text-red-600"
                          />
                        </button>
                      </>
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}