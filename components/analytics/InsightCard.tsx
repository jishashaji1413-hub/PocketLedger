type Props = {
  title: string;
  value: string;
};

export default function InsightCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5">
      <p className="text-gray-500 text-sm sm:text-base">
        {title}
      </p>

      <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold text-black break-words">
        {value}
      </h2>
    </div>
  );
}