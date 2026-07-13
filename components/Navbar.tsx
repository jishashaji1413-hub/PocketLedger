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
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Updates the navbar if localStorage changes in another tab
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  }

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-8">
      <div className="relative">
        {/* <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        /> */}

        {/* <input
          type="text"
          placeholder="Search transactions..."
          className="border rounded-lg pl-10 pr-4 py-2 w-80 outline-none focus:ring-2 focus:ring-green-500"
        /> */}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <UserCircle
            size={40}
            className="text-green-600"
          />

          <div>
            <p className="font-semibold text-gray-800">
              {user ? user.name : "Guest"}
            </p>


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