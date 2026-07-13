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
console.log(data);
      if (!res.ok) {
        alert(data.message);
        return;
      }

      //  Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
console.log(localStorage.getItem("user"));
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
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-green-600">
        Welcome Back
      </h1>

      <p className="text-gray-500 text-center mt-2">
        Login to PocketLedger
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-8"
      >
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-500">
        Does not have an account?{" "}
        <Link
          href="/signup"
          className="text-green-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}