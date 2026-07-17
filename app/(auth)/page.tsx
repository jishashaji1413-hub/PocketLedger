import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-white px-6 text-center">

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-700">
        PocketLedger
      </h1>

      <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
        Track every rupee. Grow your wealth.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

        <Link
          href="/login"
          className="w-full sm:w-auto px-8 py-3 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition text-center"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-center"
        >
          Sign Up
        </Link>

      </div>

    </main>
  );
}