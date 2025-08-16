import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchCoins } from "../store/slices/coinSlice";
import BuyCoin from "../components/BuyCoin";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { list: coins, status, error } = useSelector((state) => state.coins);
  const { holdings } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  let totalValue = 0;
  let totalChange = 0;

  coins.forEach((coin) => {
    const amount = holdings[coin.id] || 0;
    if (amount > 0) {
      const value = amount * coin.current_price;
      totalValue += value;
      totalChange += (value * coin.price_change_percentage_24h) / 100;
    }
  });

  const percentChange = totalValue > 0 ? (totalChange / totalValue) * 100 : 0;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.h1
        className="text-3xl pt-16 md:text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Portfolio
      </motion.h1>

      {/* Summary */}
      <motion.div
        className="bg-gray-800 shadow-xl rounded-2xl p-6 mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-lg">Total Value</p>
        <p className="text-4xl font-bold mt-2 text-green-400">
          ${totalValue.toFixed(2)}
        </p>
        <p className="mt-4 text-lg">
          24h Change:{" "}
          <span
            className={`font-semibold ${
              percentChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {percentChange.toFixed(2)}%
          </span>
        </p>
      </motion.div>

      {/* Add Buy Coin */}
      <BuyCoin />

      {/* Holdings */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Holdings</h2>
      {status === "loading" && <p>Loading coins...</p>}
      {status === "failed" && <p className="text-red-400">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins
          .filter((coin) => holdings[coin.id])
          .map((coin, idx) => {
            const amount = holdings[coin.id] || 0;
            const value = amount * coin.current_price;

            return (
              <motion.div
                key={coin.id}
                className="bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </h3>

                <p className="text-gray-300 text-sm">
                  Owned: <span className="font-bold">{amount}</span>
                </p>

                <p className="font-bold text-lg text-green-400 mt-3">
                  ${value.toFixed(2)}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}% (24h)
                </p>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Portfolio;
