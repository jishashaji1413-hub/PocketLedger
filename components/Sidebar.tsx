"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  ChartColumn,
  FileText,
  Wallet,
  Menu,
  X,
} from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <Wallet size={28} className="text-green-400" />
          <h1 className="text-xl font-bold">PocketLedger</h1>
        </div>

        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          w-64
          min-h-screen
          bg-slate-900
          text-white
          p-6
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end md:hidden mb-6">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <Wallet size={30} className="text-green-400" />
          <h1 className="text-2xl font-bold">PocketLedger</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-green-500 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}