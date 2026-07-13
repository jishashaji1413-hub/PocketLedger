"use client";

type FilterProps = {
  category: string;
  setCategory: (value: string) => void;
};

const categories = [
  "All",
  "Food",
  "Salary",
  "Transport",
  "Rent",
  "Entertainment",
  "Other",
];

export default function Filter({
  category,
  setCategory,
}: FilterProps) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
    >
      {categories.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}