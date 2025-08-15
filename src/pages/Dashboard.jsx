import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCoins } from "../store/slices/coinSlice";
import SearchFilter from "../components/SearchFilter";
import CoinTable from "../components/CoinTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Largest Crypto Marketplace
      </h1>
      <p className="text-gray-400 mb-6 text-center">
        Welcome to the world's largest cryptocurrency marketplace. Search
        explore more about cryptos
      </p>
      <SearchFilter />
      <CoinTable />
    </div>
  );
};

export default Dashboard;
