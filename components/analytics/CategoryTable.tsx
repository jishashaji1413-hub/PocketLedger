export default function CategoryTable({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">
        Category Wise Spending
      </h2>

      <table className="w-full border-black">
        <thead>
          <tr className="text-black ">
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className="text-black">
          {data.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>

              <td>
                ₹{item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}