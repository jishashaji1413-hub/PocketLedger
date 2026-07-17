import { Transaction } from "@/types/transaction";
import StatCard from "./StatCard";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Summary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
        md:gap-6
        mb-8
      "
    >
      <StatCard
        title="Current Balance"
        value={`₹${balance.toFixed(2)}`}
        icon={<Wallet className="w-6 h-6 md:w-7 md:h-7" />}
        color="bg-blue-500"
      />

      <StatCard
        title="Total Income"
        value={`₹${income.toFixed(2)}`}
        icon={<TrendingUp className="w-6 h-6 md:w-7 md:h-7" />}
        color="bg-green-500"
      />

      <StatCard
        title="Total Expense"
        value={`₹${Math.abs(expense).toFixed(2)}`}
        icon={<TrendingDown className="w-6 h-6 md:w-7 md:h-7" />}
        color="bg-red-500"
      />
    </div>
  );
}