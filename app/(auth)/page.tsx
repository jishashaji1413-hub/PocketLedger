import Link from "next/link";
import { Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 shadow-lg">
            <Wallet className="w-10 h-10 text-green-700" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700">
          PocketLedger
        </h1>

        {/* Description */}
        <p className="mt-5 text-gray-600 text-base sm:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed">
          Track every rupee. Manage your income and expenses.
          Visualize your finances and generate insightful reports
          with ease.
        </p>

        {/* Buttons */}
        <div className="mt-10 w-full max-w-sm mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Link
            href="/login"
            className="flex items-center justify-center h-12 rounded-xl border-2 border-green-600 bg-white text-green-700 font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-sm"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="flex items-center justify-center h-12 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md"
          >
            Sign Up
          </Link>

        </div>

       

      </div>
    </main>
  );
}