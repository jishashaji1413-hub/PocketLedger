"use client";

import { UserCircle, LogOut } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user", {
        cache: "no-store",
      });

      if (!res.ok) {
        router.replace("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  };

  return (
    <header className="hidden md:flex h-16 bg-white border-b shadow-sm items-center justify-between px-6 lg:px-8">

      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-slate-700">
          Welcome 👋
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3">
          <UserCircle
            className="text-green-600"
            size={38}
          />

          <div>
            <p className="font-semibold text-gray-800">
              {user?.name ?? "Guest"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}