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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 my-6 sm:my-8">

      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <p className="text-gray-500 text-sm sm:text-base">
          Total Income
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-green-600 break-words">
          ₹{income.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <p className="text-gray-500 text-sm sm:text-base">
          Total Expense
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-red-600 break-words">
          ₹{expense.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <p className="text-gray-500 text-sm sm:text-base">
          Current Balance
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-blue-600 break-words">
          ₹{balance.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <p className="text-gray-500 text-sm sm:text-base">
          Transactions
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-purple-600">
          {totalTransactions}
        </h2>
      </div>

    </div>
  );
}