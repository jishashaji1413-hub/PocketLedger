"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Summary;
function Summary(_a) {
    var transactions = _a.transactions;
    var balance = transactions.reduce(function (sum, t) { return sum + t.amount; }, 0);
    var income = transactions.filter(function (t) { return t.amount > 0; }).reduce(function (s, t) { return s + t.amount; }, 0);
    var expenses = transactions.filter(function (t) { return t.amount < 0; }).reduce(function (s, t) { return s + t.amount; }, 0);
    return (<div className="grid grid-cols-3 gap-4 mb-6">
      <Card label="Balance" value={balance}/>
      <Card label="Income" value={income} color="text-green-600"/>
      <Card label="Expenses" value={expenses} color="text-red-600"/>
    </div>);
}
function Card(_a) {
    var label = _a.label, value = _a.value, _b = _a.color, color = _b === void 0 ? "" : _b;
    return (<div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={"text-xl font-semibold ".concat(color)}>₹{value.toFixed(2)}</p>
    </div>);
}
