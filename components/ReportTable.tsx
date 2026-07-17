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
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        No transactions found for the selected date range.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full">

          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 text-sm sm:text-base">
              <th className="px-4 py-3 font-semibold">
                Description
              </th>

              <th className="px-4 py-3 font-semibold">
                Category
              </th>

              <th className="px-4 py-3 font-semibold">
                Date
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-black text-sm sm:text-base break-words">
                  {transaction.description}
                </td>

                <td className="px-4 py-3 text-black text-sm sm:text-base whitespace-nowrap">
                  {transaction.category}
                </td>

                <td className="px-4 py-3 text-black text-sm sm:text-base whitespace-nowrap">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>

                <td
                  className={`px-4 py-3 text-right font-semibold text-sm sm:text-base whitespace-nowrap ${
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
    </div>
  );
}