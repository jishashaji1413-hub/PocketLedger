"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  ChartColumn,
  FileText,
  Wallet,
  Menu,
  X,
  UserCircle,
  LogOut,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
};

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Receipt,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartColumn,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Mobile Header */}

      <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-5 md:hidden z-50 shadow">
        <div className="flex items-center gap-2">
          <Wallet className="text-green-400" size={28} />
          <span className="text-white font-bold text-xl">
            PocketLedger
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-white"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Overlay */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          z-50
          shadow-xl
          transition-transform
          duration-300
          flex
          flex-col

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        <div className="p-6 flex flex-col h-full">

          {/* Close Button */}

          <div className="flex justify-between items-center md:hidden mb-8">
            <h2 className="text-xl font-bold">
              Menu
            </h2>

            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* Logo */}

          <div className="hidden md:flex items-center gap-2 mb-10">
            <Wallet
              className="text-green-400"
              size={30}
            />

            <span className="text-2xl font-bold">
              PocketLedger
            </span>
          </div>

          {/* Navigation */}

          <nav className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    pathname === item.href
                      ? "bg-green-500"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <Icon size={20} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Push profile to bottom */}

          <div className="mt-auto border-t border-slate-700 pt-5">

            <div className="flex items-center gap-3 mb-5">

              <UserCircle
                size={42}
                className="text-green-400"
              />

              <div>
                <p className="font-semibold">
                  {user?.name ?? "Guest"}
                </p>

                {/* <p className="text-xs text-gray-400 break-all">
                  {user?.email}
                </p> */}
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>
      </aside>
    </>
  );
}