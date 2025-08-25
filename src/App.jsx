import { useState } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addIncome = () => {
    if (!text || !amount) return;
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };
    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const addExpense = () => {
    if (!text || !amount) return;
    const newTransaction = {
      id: Date.now(),
      text,
      amount: -Math.abs(parseFloat(amount)),
    };
    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">💰 Expense Tracker</h1>

        <h2 className="text-xl mb-4 text-center">
          Balance: <span className="font-bold">₹{income + expense}</span>
        </h2>

        <div className="flex justify-between mb-6 bg-gray-700 p-3 rounded-xl">
          <div className="text-green-400 font-bold">Income: ₹{income}</div>
          <div className="text-red-400 font-bold">Expense: ₹{Math.abs(expense)}</div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..."
            className="w-full p-2 mb-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
          />

          <div className="flex gap-2">
            <button
              onClick={addIncome}
              className="flex-1 bg-green-500 hover:bg-green-600 p-2 rounded-xl font-bold"
            >
              + Add Income
            </button>
            <button
              onClick={addExpense}
              className="flex-1 bg-red-500 hover:bg-red-600 p-2 rounded-xl font-bold"
            >
              - Add Expense
            </button>
          </div>
        </div>

        <h3 className="font-bold mb-2">History</h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`flex justify-between p-2 rounded-lg ${
                t.amount > 0 ? "bg-green-700" : "bg-red-700"
              }`}
            >
              <span>{t.text}</span>
              <span>{t.amount > 0 ? "+" : ""}₹{t.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
