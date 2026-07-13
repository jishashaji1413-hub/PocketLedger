import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition duration-300">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`${color} text-white p-4 rounded-full`}>
        {icon}
      </div>
    </div>
  );
}