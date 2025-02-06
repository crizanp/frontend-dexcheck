"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { FaSyncAlt } from "react-icons/fa";

interface GraduateToken {
  coinMint: string;
  dev: string;
  name: string;
  ticker: string;
  imageUrl: string;
  creationTime: number;
  numHolders: number;
  marketCap: number;
  volume: number;
  bondingCurveProgress: number;
  sniperCount: number;
  currentMarketPrice: number;
}

export default function GraduateTokensPage() {
  const [tokens, setTokens] = useState<GraduateToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://advanced-api-v2.pump.fun/coins/about-to-graduate"
      );
      setTokens(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
      setIsRefreshing(false); // Stop spinning after the data is loaded
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true); // Start spinning the refresh icon
    await fetchData();
  };

  const renderTokenCard = (token: GraduateToken) => (
    <div
      key={token.coinMint}
      className="border border-green-500 rounded-lg shadow-lg bg-gray-800 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <img
          src={token.imageUrl}
          alt={token.name}
          className="w-20 h-20 rounded-full border-2 border-green-500"
        />
        <div>
          <h3 className="text-xl font-bold text-green-400">{token.name}</h3>
          <p className="text-sm text-gray-400">Ticker: {token.ticker}</p>
          <p className="text-sm text-gray-400">
            Created:{" "}
            <span className="text-green-400">
              {new Date(token.creationTime).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Market Cap:</span>
          <span className="text-green-400">
            ${token.marketCap.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Volume:</span>
          <span className="text-green-400">${token.volume.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Holders:</span>
          <span className="text-green-400">{token.numHolders}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Bonding Curve Progress:</span>
          <span className="text-green-400">{token.bondingCurveProgress}%</span>
        </div>
       
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <a
          href={`https://pump.fun/coin/${token.coinMint}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition-all"
        >
          View Details
        </a>
        <a
          href={`https://solscan.io/account/${token.coinMint}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
        >
          Solscan
        </a>
      </div>
    </div>
  );

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between  mb-4">
          <h2 className="text-4xl font-bold text-green-400">
          🎓 Almost Ready to Shine
          </h2>
          <button
            onClick={handleRefresh}
            className="text-green-400 hover:text-green-300 transition-transform transform"
          >
            <FaSyncAlt
              className={`text-2xl ${
                isRefreshing ? "animate-spin" : ""
              } transition-all`}
            />
          </button>
        </div>
        <p className="text-gray-300">
        These tokens are on the cusp of making waves.Don’t miss your chance to stay ahead of the curve with live updates and insights. 🌌✨
       </p>
      </div>
      {loading ? (
        <div className="flex justify-center mt-12">
          <PuffLoader color="#36D7B7" size={60} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-12">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {tokens.map((token) => renderTokenCard(token))}
        </div>
      )}
    </main>
  );
}
