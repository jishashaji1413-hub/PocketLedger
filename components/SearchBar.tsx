"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          py-3
          pl-10
          pr-4
          text-black
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-green-600
          focus:ring-2
          focus:ring-green-600
        "
      />
    </div>
  );
}