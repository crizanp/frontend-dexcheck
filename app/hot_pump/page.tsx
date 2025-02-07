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
        "https://dextools1jsseuer32das3.vercel.app/api/coins/atg/about-to-end"
      );
      setTokens(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
  };

  const renderTokenCard = (token: GraduateToken) => (
    <div
      key={token.coinMint}
      className="border border-gray-300 rounded-xl shadow-lg bg-white p-3 hover:shadow-2xl transition-all duration-300 h-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <img
            src={token.imageUrl}
            alt={token.name}
            className="w-16 h-16 rounded-full border-4 border-green-500 shadow-md"
          />
          <div className="flex flex-col ">
            <h3 className="text-xl font-semibold text-gray-900">
              {token.name.length > 12 ? token.name.slice(0, 12) + "..." : token.name}
            </h3>
            <p className="text-sm text-gray-600">{token.ticker}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-600 text-right">
            {" "}
            <span className="text-green-600">
              {new Date(token.creationTime).toLocaleDateString()}
            </span>
          </p>

          <div className="text-sm text-gray-600">
            <span className="text-gray-600">Sniper:</span>
            <span className="text-green-600">{token.sniperCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">Market Cap:</span>
            <span className="text-green-600 ml-2">${token.marketCap.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Volume:</span>
            <span className="text-green-600 ml-2">${token.volume.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">Holders:</span>
            <span className="text-green-600 ml-2">{token.numHolders}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Progress:</span>
            <span className="text-green-600 ml-2">{token.bondingCurveProgress}%</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between ">
        <a
          href={`https://pump.fun/coin/${token.coinMint}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-400 transition-all"
        >
          View Details
        </a>
        <a
          href={`https://solscan.io/account/${token.coinMint}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-green-800 text-black px-2 py-1 rounded-lg hover:bg-green-600 hover:border-green-600 hover:text-white transition-all"
        >
          Solscan
        </a>
      </div>
    </div>
  );


  return (
    <main className=" text-gray-900 min-h-screen p-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">
  🎓 About to graduate
</h2>

<button
  onClick={handleRefresh}
  className="text-green-600 hover:text-green-500 transition-transform transform"
>
  <FaSyncAlt
    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${isRefreshing ? "animate-spin" : ""} transition-all`}
  />
</button>

        </div>
        <p className="text-gray-700">
          These tokens are on the cusp of making waves. Don’t miss your chance to stay ahead of the curve with live updates and insights. 🌌✨
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center mt-12">
          <PuffLoader color="#36D7B7" size={60} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-12">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {tokens.slice(0, 9).map((token) => renderTokenCard(token))}
        </div>
      )}
    </main>
  );
}
