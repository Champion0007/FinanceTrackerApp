import React from "react";
import Navbar from "../components/Navbar";
import { GoArrowDownLeft } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";

const AddTransaction = () => {
  const [formData, setFormData] = React.useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("all fields are required");
      return;
    }

    const newTxn = {
      id: Date.now(),
      type: formData.type,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    };

    const existingtxn = JSON.parse(localStorage.getItem("transactions")) || [];

    const updated = [...existingtxn, newTxn];

    localStorage.setItem("transactions", JSON.stringify(updated));

    // console.log("transaction saved", updated);

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center h-screen justify-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className=" bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mt-2 text-gray-300">
            Authorize Transaction
          </h1>
          <p className="text-center text-gray-300 mt-4">
            Log your latest financial activity into the ledger.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex mb-4 mt-3 bg-black rounded-lg">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "expense" })}
                className={`w-1/2 py-2 ${
                  formData.type === "expense" ? "bg-gray-700 rounded-lg" : ""
                }`}
              >
                <GoArrowUpRight className="inline mb-1 mr-4 text-xl text-red-500" />
                Expense
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "income" })}
                className={`w-1/2 py-2 ${
                  formData.type === "income" ? "bg-gray-700 rounded-lg" : ""
                }`}
              >
                <GoArrowDownLeft className="inline mb-1 mr-4 text-xl text-green-500" />
                Income
              </button>
            </div>
            <label htmlFor="amount" className="text-sm text-gray-400">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="₹0.00"
              className="w-full p-3 mt-1 mb-4 bg-black/70 rounded-lg text-sm outline-none"
            />
            <label htmlFor="category" className="text-sm text-gray-400">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Food, Salary, etc."
              className="w-full p-3 mt-1 mb-4 bg-black/70 rounded-lg text-sm outline-none"
            />
            <label htmlFor="date" className="text-sm text-gray-400">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 mt-1 mb-4 bg-black/70 rounded-lg text-sm outline-none"
            />

            <button className=" w-full p-3  rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600  hover:to-purple-500 transition-colors">
              Complete Transaction
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTransaction;
