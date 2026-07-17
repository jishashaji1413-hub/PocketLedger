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
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-4
        sm:p-5
        lg:p-6
        flex
        items-center
        justify-between
        min-h-[110px]
      "
    >
      {/* Left Section */}
      <div className="flex-1 overflow-hidden">
        <p className="text-gray-500 text-xs sm:text-sm font-medium">
          {title}
        </p>

        <h2
          className="
            mt-2
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-bold
            text-gray-800
            break-words
          "
        >
          {value}
        </h2>
      </div>

      {/* Icon */}
      <div
        className={`
          ${color}
          text-white
          rounded-full
          p-3
          sm:p-4
          flex
          items-center
          justify-center
          ml-4
          shrink-0
        `}
      >
        {icon}
      </div>
    </div>
  );
}