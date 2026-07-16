"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction";
import { Pencil, Trash2, Save, X } from "lucide-react";

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: () => Promise<void>;
  page: number;
  limit: number;
};

export default function TransactionTable({
  transactions,
  onDelete,
  onUpdate,
  page,
  limit,
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
      <div className="text-center py-8 text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full border-black">
        <thead className="bg-gray-200 border-black">
          <tr className="text-black">
            
            <th className="p-4 text-left ">Category</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left ">Description</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t ">
             

              <td className="p-4 text-black">
                {editingId === transaction.id ? (
                  <input
                    className="border p-2 rounded w-full text-black"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  />
                ) : (
                  transaction.category
                )}
              </td>

              <td className="p-4 text-black">
                {new Date(
                  transaction.date
                ).toLocaleDateString()}
              </td>
               <td className="p-4 text-black">
                {editingId === transaction.id ? (
                  <input
                    className="border p-2 rounded w-full text-black"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />
                ) : (
                  transaction.description
                )}
              </td>

              <td className="p-4 text-black">
                {editingId === transaction.id ? (
                  <input
                    type="number"
                    className="border p-2 rounded w-full text-black"
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

              <td className="p-4 text-black">
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
                          className="text-black "
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
  );
}