import React, { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "./Pagination";

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
      <table className="table-fixed w-full text-left rounded-lg shadow-lg bg-gray-800 text-white">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-3 w-12">#</th>
            <th className="p-3 w-64">Coins</th>
            <th className="p-3 w-36">Price</th>
            <th className="p-3 w-36">24H Change</th>
            <th className="p-3 w-48">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading"
            ? Array.from({ length: coinsPerPage }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-700 h-14">
                  <td className="p-3 text-center">{idx + 1}</td>
                  <td className="p-3 flex items-center gap-2 w-64">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={120} />
                  </td>
                  <td className="p-3 w-36">
                    <Skeleton width={80} />
                  </td>
                  <td className="p-3 w-36">
                    <Skeleton width={60} />
                  </td>
                  <td className="p-3 w-48">
                    <Skeleton width={100} />
                  </td>
                </tr>
              ))
            : displayedCoins.map((coin, idx) => (
                <tr
                  key={coin.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition h-14"
                >
                  <td className="p-3 text-center">{coin.market_cap_rank}</td>
                  <td className="p-3 flex items-center gap-2 w-64">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <span className="truncate">
                      {coin.name} - {coin.symbol.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 w-36">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`p-3 w-36 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="p-3 w-48">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default CoinTable;
