type Props = {
  title: string;
  value: string;
};

export default function InsightCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-xl font-bold mt-2 text-black">
        {value}
      </h2>
    </div>
  );
}