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
        setLoading(false);
        return;
      }

      alert("Account created successfully!");

      // Clear form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to Dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-green-600">
        Create Account
      </h1>

      <p className="text-gray-500 text-center mt-2">
        Join PocketLedger
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 mt-8">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
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
          className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-green-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}