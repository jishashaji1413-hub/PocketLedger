"use client";

import { UserCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
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
  }

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setUser(null);

      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  }

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-8">

      <div></div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-green-600"
          />

          <div>

            <p className="font-semibold text-gray-800">
              {user?.name ?? "Guest"}
            </p>

            {/* <p className="text-sm text-gray-500">
              {user?.email ?? ""}
            </p> */}

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}