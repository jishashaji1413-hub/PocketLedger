"use client";

type ReportSummaryProps = {
  income: number;
  expense: number;
  balance: number;
  totalTransactions: number;
};

export default function ReportSummary({
  income,
  expense,
  balance,
  totalTransactions,
}: ReportSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Total Income
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          ₹{income.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Total Expense
        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          ₹{expense.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Current Balance
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          ₹{balance.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Transactions
        </p>

        <h2 className="text-3xl font-bold text-purple-600 mt-2">
          {totalTransactions}
        </h2>
      </div>

    </div>
  );
}