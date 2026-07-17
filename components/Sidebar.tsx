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
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-08 bg-slate-900 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Wallet className="text-green-400" />
          <span className="text-white font-bold">
            PocketLedger
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-white"
        >
          <Menu />
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
        h-full
        w-64
        bg-slate-900
        text-white
        p-6
        z-50
        transform
        transition-transform
        duration-300

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:translate-x-0
        md:static
        md:flex-shrink-0
      `}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="font-bold text-xl">
            Menu
          </h2>

          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 mb-10">
          <Wallet className="text-green-400" />
          <span className="font-bold text-xl">
            PocketLedger
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
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
      </aside>
    </>
  );
}