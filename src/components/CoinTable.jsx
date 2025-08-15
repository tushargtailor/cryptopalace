import React, { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CoinTable = () => {
  const { list, status } = useSelector((state) => state.coins);
  const search = useSelector((state) => state.filter.search);
  const [page, setPage] = useState(1);
  const coinsPerPage = 10;

  const filteredCoins = list.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (page - 1) * coinsPerPage;
  const displayedCoins = filteredCoins.slice(
    startIndex,
    startIndex + coinsPerPage
  );
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Coins</th>
            <th className="p-3">Price</th>
            <th className="p-3">24H Change</th>
            <th className="p-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading"
            ? Array.from({ length: coinsPerPage }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="p-3">
                    <Skeleton width={20} />
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={80} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={60} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={50} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={80} />
                  </td>
                </tr>
              ))
            : displayedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3">{coin.market_cap_rank}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                    />
                    {coin.name} - {coin.symbol.toUpperCase()}
                  </td>
                  <td className="p-3">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`p-3 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="p-3">${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-cyan-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinTable;
