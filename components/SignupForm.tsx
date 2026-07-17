"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

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
        Create Account
      </h1>

      <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
        Join PocketLedger
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-5 mt-6 sm:mt-8"
      >

        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-green-600 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
}