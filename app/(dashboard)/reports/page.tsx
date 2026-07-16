"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReportSummary from "@/components/ReportSummary";

import { Transaction } from "@/types/transaction";
import ReportTable from "@/components/ReportTable";

export default function ReportsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
  id: string;
  name: string;
  email: string;
} | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

async function loadTransactions() {
  try {
    // Get logged-in user from JWT cookie
    const userRes = await fetch("/api/user");

    if (!userRes.ok) {
      router.push("/login");
      return;
    }

    const currentUser = await userRes.json();

    setUser(currentUser);

  const transactionRes = await fetch(
  `/api/transactions?userId=${currentUser.id}&all=true`,
  {
    cache: "no-store",
  }
);

const data = await transactionRes.json();

if (!transactionRes.ok) {
  alert(data.message);
  return;
}

setTransactions(data.transactions);
setFilteredTransactions(data.transactions);
  } catch (error) {
    console.error(error);
    alert("Failed to load reports.");
  } finally {
    setLoading(false);
  }
}
  function generateReport() {
    if (!fromDate || !toDate) {
      alert("Please select both dates.");
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      return (
        date >= new Date(fromDate) &&
        date <= new Date(toDate + "T23:59:59")
      );
    });

    setFilteredTransactions(filtered);
  }

function downloadPDF() {
  const doc = new jsPDF();

  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = Math.abs(
    filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const balance = income - expense;

  doc.setFontSize(22);


doc.text(
  "PocketLedger Financial Report",
  doc.internal.pageSize.getWidth() / 2,
  20,
  {
    align: "center",
  }
);

  doc.setFontSize(12);

  doc.text(`User : ${user?.name ?? ""}`, 14, 32);

  doc.text(`Email : ${user?.email ?? ""}`, 14, 40);

  doc.text(`From : ${fromDate}`, 14, 52);

  doc.text(`To : ${toDate}`, 14, 60);

  doc.text(`Income : Rs.${income.toFixed(2)}`, 14, 74);

  doc.text(`Expense : Rs.${expense.toFixed(2)}`, 14, 82);

  doc.text(`Balance : Rs.${balance.toFixed(2)}`, 14, 90);

  autoTable(doc, {
    startY: 100,

    head: [["Description", "Category", "Date", "Amount"]],

    body: filteredTransactions.map((t) => [
      t.description,
      t.category,
      new Date(t.date).toLocaleDateString(),
      `Rs.${t.amount.toFixed(2)}`,
    ]),
  });

  doc.save(
  `${user?.name ?? "User"}_PL_Report_${fromDate}_to_${toDate}.pdf`
);

}
function downloadExcel() {
  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = Math.abs(
    filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const balance = income - expense;

  const report = [
    {
      User: user?.name,
      Email: user?.email,
      From: fromDate,
      To: toDate,
      Income: income,
      Expense: expense,
      Balance: balance,
    },
    {},
  ];

  const transactions = filteredTransactions.map((t) => ({
    Description: t.description,
    Category: t.category,
    Date: new Date(t.date).toLocaleDateString(),
    Amount: t.amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet([
    ...report,
    ...transactions,
  ]);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

 saveAs(
  blob,
  `${user?.name ?? "User"}_PL_Report_${fromDate}_to_${toDate}.xlsx`
);
}
const income = filteredTransactions
  .filter((t) => t.amount > 0)
  .reduce((sum, t) => sum + t.amount, 0);

const expense = Math.abs(
  filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0)
);

const balance = income - expense;

const totalTransactions = filteredTransactions.length;
  if (loading) {
    return <div className="p-8">Loading...</div>;
  }
  

  return (
    <div className="p-8 bg-gray-300 min-h-screen">

      <h1 className="text-3xl font-bold text-blue-400">
        REPORTS
      </h1>

      <p className="text-gray-500 mb-8">
        Generate financial reports.
      </p>
<div className="bg-white rounded-xl shadow p-6 mb-8">

  <h2 className="text-xl font-semibold mb-4 text-blue-400">
    User Details
  </h2>

  <div className="grid md:grid-cols-2 gap-6 text-black">

    <div>
      <p className="text-gray-500">
        Name
      </p>

      <p className="font-semibold text-lg">
        {user?.name}
      </p>
    </div>

    <div>
      <p className="text-gray-500">
        Email
      </p>

      <p className="font-semibold text-lg">
        {user?.email}
      </p>
    </div>

  </div>

</div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="grid md:grid-cols-3 gap-6 text-black">

          <div>

            <label className="block mb-2 font-semibold">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(e.target.value)
              }
              className="border rounded-lg p-3 w-full"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(e.target.value)
              }
              className="border rounded-lg p-3 w-full"
            />

          </div>

          <div className="flex items-end">

            <button
              onClick={generateReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
            >
              Generate Report
            </button>

          </div>

        </div>

      </div>

      <ReportSummary
  income={income}
  expense={expense}
  balance={balance}
  totalTransactions={totalTransactions}
/>

<div className="bg-white rounded-xl shadow p-6 mt-8">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-semibold text-blue-400">
      Transactions
    </h2>

    <div className="flex gap-4">

      <button
        onClick={downloadExcel}
        className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
      >
        Download Excel
      </button>

      <button
        onClick={downloadPDF}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Download PDF
      </button>

    </div>

  </div>

  <ReportTable
  transactions={filteredTransactions}
/>

</div>

</div>
);
}
