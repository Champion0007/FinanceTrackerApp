import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddTransaction from "./AddTransaction";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(data);
  }, []);

  const handleAddTransaction = () => {
    navigate("/addtransaction");
  };

  const totalBalance = transaction.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + Number(curr.amount);
    } else {
      return acc - Number(curr.amount);
    }
  }, 0);

  const totalIncome = transaction.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + Number(curr.amount);
    } else {
      return acc;
    }
  }, 0);

  const expense = transaction.reduce((acc, curr) => {
    if (curr.type === "expense") {
      return acc + Number(curr.amount);
    } else {
      return acc;
    }
  }, 0);

  const savings = totalIncome - expense;

  // console.log(transaction.amount);
  // console.log(total.id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020617] text-white p-6">
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl p-8 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-sm text-gray-200">TOTAL BALANCE</p>
            <h1 className="text-4xl font-bold mt-2">₹{totalBalance}</h1>
            <p className="text-sm mt-2 text-gray-200">Last updated today</p>
          </div>

          <button className="bg-black/30 px-6 py-3 rounded-xl hover:bg-black/40">
            Withdraw Funds →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-[#0f172a] p-6 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">INCOME</p>
              <h2 className="text-xl font-semibold mt-2">₹{totalIncome}</h2>
            </div>
            <span className="bg-green-500/20 p-3 rounded-lg">↑</span>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">EXPENSE</p>
              <h2 className="text-xl font-semibold mt-2">₹{expense}</h2>
            </div>
            <span className="bg-red-500/20 p-3 rounded-lg">↓</span>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">SAVINGS</p>
              <h2 className="text-xl font-semibold mt-2">₹{savings}</h2>
            </div>
            <span className="bg-blue-500/20 p-3 rounded-lg">💰</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-[#0f172a] p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Spending Trend</h2>

            <div className="flex items-end gap-4 h-40">
              <div className="w-full bg-purple-300/30 h-16 rounded"></div>
              <div className="w-full bg-purple-300/40 h-24 rounded"></div>
              <div className="w-full bg-purple-300/50 h-20 rounded"></div>
              <div className="w-full bg-purple-300/60 h-32 rounded"></div>
              <div className="w-full bg-purple-300/70 h-28 rounded"></div>
            </div>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-2xl flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Allocation</h2>

            <div className="w-40 h-40 rounded-full border-[20px] border-purple-500 border-t-green-400 border-r-blue-400"></div>

            <div className="mt-4 text-sm space-y-2">
              <p>Rent - 75%</p>
              <p>Food - 20%</p>
              <p>Travel - 5%</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Recent Authorizations</h2>

          <div className="space-y-3">
            <div className="bg-[#0f172a] p-4 rounded-xl flex justify-between">
              <div>
                <p className="font-semibold">Gourmet Bistro</p>
                <p className="text-sm text-gray-400">Food • 2h ago</p>
              </div>
              <p className="text-red-400">-₹2,450</p>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-xl flex justify-between">
              <div>
                <p className="font-semibold">Uber Prime</p>
                <p className="text-sm text-gray-400">Travel • 5h ago</p>
              </div>
              <p className="text-red-400">-₹840</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddTransaction}
          className="fixed bottom-6 right-6 bg-purple-500 w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-purple-600"
        >
          +
        </button>
      </div>
    </>
  );
};

export default Dashboard;
