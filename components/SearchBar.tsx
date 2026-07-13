"use client";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <input 
      type="text"
      placeholder="Search transactions..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-80 rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-700 text-black"
    />
  );
}