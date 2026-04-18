import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    const reversed = [...data].reverse();

    setTransactions(reversed);
    setAllTransactions(reversed);
  }, []);

  // Helper Functions
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getWeekDates = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    return firstDay;
  };

  const getMonth = () => {
    return new Date().getMonth();
  };

  //  Filters
  const filterToday = () => {
    const today = getTodayDate();

    const filtered = allTransactions.filter(
      (item) => item.date === today
    );

    setTransactions(filtered);
  };

  const filterWeek = () => {
    const startOfWeek = getWeekDates();

    const filtered = allTransactions.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startOfWeek;
    });

    setTransactions(filtered);
  };

  const filterMonth = () => {
    const currentMonth = getMonth();

    const filtered = allTransactions.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth;
    });

    setTransactions(filtered);
  };

  const filterByType = (type) => {
    const filtered = allTransactions.filter(
      (item) => item.type === type
    );

    setTransactions(filtered);
  };

  const resetFilters = () => {
    setTransactions(allTransactions);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Transaction History
              <span className="ml-4 p-2 rounded-full bg-green-500/10 backdrop-blur-md text-green-400 text-[10px] font-medium">
                Saved
              </span>
            </h1>

            <p className="text-gray-400 mt-1">
              Manage and monitor your financial flow.
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
          <button onClick={filterToday} className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-400">
            Today
          </button>

          <button onClick={filterWeek} className="px-4 py-1 rounded-full bg-white/10">
            This Week
          </button>

          <button onClick={filterMonth} className="px-4 py-1 rounded-full bg-white/10">
            This Month
          </button>

          <button onClick={() => filterByType("income")} className="px-4 py-1 rounded-full bg-green-500/20 text-green-400">
            Income
          </button>

          <button onClick={() => filterByType("expense")} className="px-4 py-1 rounded-full bg-red-500/20 text-red-400">
            Expense
          </button>

          <button onClick={resetFilters} className="px-4 py-1 rounded-full bg-gray-500/20 text-gray-300">
            All
          </button>
        </div>

       
        <div className="mt-8 space-y-4">
          {transactions.length === 0 && (
            <p className="text-gray-400">No transactions found</p>
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