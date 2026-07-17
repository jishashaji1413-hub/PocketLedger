type CategoryData = {
  category: string;
  amount: number;
};

export default function CategoryTable({
  data,
}: {
  data: CategoryData[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-500 mb-4 sm:mb-6">
        Category Wise Spending
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No expense data available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="px-4 py-3 text-left font-semibold">
                  Category
                </th>

                <th className="px-4 py-3 text-right font-semibold">
                  Total Spent
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.category}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-black">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-red-600">
                    ₹{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}