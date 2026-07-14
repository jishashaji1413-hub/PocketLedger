"use client";

import { Transaction } from "@/types/transaction";

type ReportTableProps = {
  transactions: Transaction[];
};

export default function ReportTable({
  transactions,
}: ReportTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No transactions found for the selected date range.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 text-black">
                {transaction.description}
              </td>

              <td className="p-4 text-black">
                {transaction.category}
              </td>

              <td className="p-4 text-black">
                {new Date(transaction.date).toLocaleDateString()}
              </td>

              <td
                className={`p-4 text-right font-semibold ${
                  transaction.amount >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.amount >= 0 ? "+" : "-"}₹
                {Math.abs(transaction.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}