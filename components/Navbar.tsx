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

  // Declare this BEFORE useEffect
  const loadUser = async () => {
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
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = async () => {
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
  };

  return (
    <header className="hidden md:flex bg-white border-b h-16 items-center justify-between px-4 md:px-8 shadow-sm">

      {/* Left */}
      <div className="text-lg md:text-xl font-semibold text-slate-700">
        Welcome 👋
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* User */}
        <div className="flex items-center gap-2">

          <UserCircle
            size={36}
            className="text-green-600"
          />

          {/* Username visible on all devices */}
          <div>
            <p className="font-semibold text-gray-800 text-sm md:text-base">
              {user?.name ?? "Guest"}
            </p>

            {/* Uncomment if you also want email */}
            {/* <p className="text-xs text-gray-500 break-all">
              {user?.email}
            </p> */}
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          <span className="hidden lg:inline">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}