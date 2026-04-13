import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(data.reverse());
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Transaction History
              <span className="ml-4 p-2 rounded-full bg-green-500/10 backdrop-blur-md text-green-400 text-[10px] font-medium  gap-1">
                <span className="w-2  h-2 bg-green-400 rounded-full"></span>
                Saved
              </span>
            </h1>

            <p className="text-gray-400 mt-1">
              Manage and monitor your financial flow across all categories.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
              Export Report
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg">
              + New Transaction
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6 flex-wrap">
          <button className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-400">
            Today
          </button>
          <button className="px-4 py-1 rounded-full bg-white/10">
            This Week
          </button>
          <button className="px-4 py-1 rounded-full bg-white/10">
            This Month
          </button>
          <button className="px-4 py-1 rounded-full bg-white/10">
            Category
          </button>
          <button className="px-4 py-1 rounded-full bg-green-500/20 text-green-400">
            Income
          </button>
          <button className="px-4 py-1 rounded-full bg-red-500/20 text-red-400">
            Expense
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {transactions.length === 0 && (
            <p className="text-gray-400">No transactions yet</p>
          )}

          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex justify-between items-center bg-[#0f172a] p-4 rounded-xl hover:bg-[#1e293b] transition"
            >
              <div>
                <p className="font-semibold">{txn.category}</p>
                <p className="text-sm text-gray-400">{txn.date}</p>
              </div>

              <p
                className={`font-semibold ${
                  txn.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}₹{txn.amount}
              </p>
            </div>
          ))}
        </div>

        <button className="fixed bottom-6 right-6 bg-purple-500 w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-purple-600">
          +
        </button>
      </div>
    </>
  );
};

export default History;
