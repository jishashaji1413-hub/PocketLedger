import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold text-green-700">
        PocketLedger
      </h1>

      <p className="mt-5 text-xl text-gray-600">
        Track every rupee. Grow your wealth.
      </p>

      <div className="flex gap-5 mt-10">

        <Link
          href="/login"
          className="px-8 py-3 rounded-lg border border-green-600 text-green-700 hover:bg-green-50"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="px-8 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Sign Up
        </Link>

      </div>

    </main>
  );
}