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
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
      <StatCard
        title="Current Balance"
        value={`₹${balance.toFixed(2)}`}
        icon={<Wallet size={28} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Total Income"
        value={`₹${income.toFixed(2)}`}
        icon={<TrendingUp size={28} />}
        color="bg-green-500"
      />

      <StatCard
        title="Total Expense"
        value={`₹${Math.abs(expense).toFixed(2)}`}
        icon={<TrendingDown size={28} />}
        color="bg-red-500"
      />
    </div>
  );
}