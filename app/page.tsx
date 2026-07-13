import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <nav className="flex justify-between items-center mb-24">
          <h1 className="text-3xl font-bold text-green-700">
            💰👝 PocketLedger
          </h1>

          <div className="space-x-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-100"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <section className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-6xl font-extrabold leading-tight text-orange-200">
              Manage Your
              <span className="text-green-600">
                {" "}Money
              </span>
              <br />
              Like a Pro
            </h2>

            <p className="mt-8 text-gray-600 text-lg">
              PocketLedger helps you track income,
              expenses, analytics, monthly reports,
              and financial goals with a modern dashboard.
            </p>

            <div className="mt-10 flex gap-5">

              <Link
                href="/signup"
                className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="border border-green-600 text-green-700 px-8 py-4 rounded-xl hover:bg-green-200 transition"
              >
                Login
              </Link>

            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-2xl font-bold mb-8 text-blue-300">
              Why PocketLedger?
            </h3>

            <div className="space-y-6 ">

              <div>
                <h4 className="font-semibold text-gray-300">
                  📊 Analytics Dashboard
                </h4>
                <p className="text-gray-500">
                  Visualize your spending with beautiful charts.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-300">
                  💳 Transaction Management
                </h4>
                <p className="text-gray-500">
                  Add, edit, delete and search transactions easily.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-300">
                  📈 Monthly Reports
                </h4>
                <p className="text-gray-500">
                  Download reports as PDF.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-300">
                  🔒 Secure Login
                </h4>
                <p className="text-gray-500">
                  Your data is protected with authentication.
                </p>
              </div>

            </div>

          </div>

        </section>
      </div>
    </main>
  );
}