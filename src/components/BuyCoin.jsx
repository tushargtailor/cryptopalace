import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addHolding } from "../store/slices/portfolioSlice";

const BuyCoin = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.list);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    const coin = coins.find(
      (c) =>
        c.id.toLowerCase() === query.toLowerCase() ||
        c.symbol.toLowerCase() === query.toLowerCase() ||
        c.name.toLowerCase() === query.toLowerCase()
    );
    setResult(coin || null);
  };

  const handleBuy = () => {
    if (result && amount > 0) {
      dispatch(addHolding({ coinId: result.id, amount: parseFloat(amount) }));
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col items-center mb-10">
      {/* Search Bar */}
      <motion.div
        className="flex items-center bg-gray-800 rounded-xl p-3 w-full max-w-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Search coin by name / symbol (e.g., bitcoin, eth)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ml-2 transition"
        >
          Search
        </button>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResult(null);
            }}
            className="ml-2 text-gray-400 hover:text-white transition"
          >
            ✖
          </button>
        )}
      </motion.div>

      {result && (
        <motion.div
          className="bg-gray-900 rounded-2xl shadow-xl p-6 mt-6 w-full max-w-md text-center border border-gray-700 hover:shadow-2xl transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={result.image}
            alt={result.name}
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">
            {result.name} ({result.symbol.toUpperCase()})
          </h3>
          <p className="text-green-400 text-lg font-bold mt-2">
            ${result.current_price.toLocaleString()}
          </p>

          <div className="flex items-center justify-center mt-4 space-x-3">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-28 px-3 py-2 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleBuy}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >
              Buy
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BuyCoin;
