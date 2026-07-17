"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(data.message);

      setEmail("");
      setPassword("");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600">
        Welcome Back
      </h1>

      <p className="mt-2 text-center text-sm sm:text-base text-gray-500">
        Login to PocketLedger
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
        Does not have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
}