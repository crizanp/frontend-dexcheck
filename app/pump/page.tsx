"use client";

import { useState, useEffect } from "react";
import {
  FaSync,
  FaTwitter,
  FaExternalLinkAlt,
  FaFire,
  FaGlobe,
  FaCopy,
  FaCommentDots,
  FaThumbtack,
} from "react-icons/fa";
import SkeletonLoader from "../components/SkeletonLoader";
import { copyToClipboard } from "../utils/copyToClipboard";

interface TokenData {
  mint: string;
  name: string;
  symbol: string;
  image_uri: string;
  usd_market_cap: string;
  twitter?: string;
  website?: string;
  complete: boolean;
  reply_count: number;
  radium_pool?: string;
  created_timestamp: string;
}

export default function PumpTracker() {
  const [pinnedToken, setPinnedToken] = useState<TokenData | null>(null);
  const [completedTokens, setCompletedTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [sortOption, setSortOption] = useState("recently_completed");
  const [showCompleted, setShowCompleted] = useState(true);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);

  const pinnedTokenAddress = "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump";

  useEffect(() => {
    fetchPinnedToken();
    fetchPumpData();
  }, [limit, offset, showCompleted]);

  const fetchPinnedToken = async () => {
    try {
      const response = await fetch(
        `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-specific-details/${pinnedTokenAddress}`
      );
      const data = await response.json();
      setPinnedToken(data);
    } catch {
      console.error("Failed to load pinned token data.");
    }
  };

  const fetchPumpData = async () => {
    setLoading(true);
    setIsRefreshing(true);
    setError(null);

    const apiUrl = showCompleted
      ? `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-filter?limit=${limit}&offset=${offset}&includeNsfw=false&complete=true`
      : `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-filter?limit=${limit}&offset=${offset}&includeNsfw=false&complete=false`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCompletedTokens(data);
    } catch {
      setError("Failed to load pump data.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const renderTokenCard = (token: TokenData, isPinned: boolean = false) => {
    const truncatedMint = token.mint
      ? `${token.mint.slice(0, 4)}...${token.mint.slice(-4)}`
      : "N/A";

    const handleCopy = () => {
      if (token.mint) {
        copyToClipboard(token.mint);
        setCopiedMint(token.mint);
        setTimeout(() => setCopiedMint(null), 2000);
      }
    };

    return (
      <div
        key={token.mint || Math.random()}
        className={`border border-green-500 rounded-lg p-4 bg-white flex flex-row items-center gap-4 hover:scale-105 transition transform duration-300 ease-in-out ${
          isPinned ? "relative" : ""
        }`}
      >
        {/* Pinned Badge */}
        {isPinned && (
          <div className="absolute top-2 left-2 text-green-600">
            <FaThumbtack />
          </div>
        )}

        {/* Left Section: Logo */}
        <img
          src={token.image_uri || "/default-icon.png"}
          alt={`${token.name || "Token"} Logo`}
          className="w-16 h-16 rounded-full border-2 border-green-400"
        />

        {/* Right Section: Details */}
        <div className="flex-1 flex flex-col">
          {/* Name and Symbol */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-black">
              {token.name?.length > 12
                ? `${token.name.slice(0, 10)}...`
                : token.name?.toUpperCase() || "Unknown"}
            </h3>
            <p className="text-sm text-gray-600">{token.symbol || "N/A"}</p>
          </div>

          {/* Market Cap */}
          <p className="text-sm text-gray-800 mt-1">
            Market Cap:{" "}
            <span className="text-green-600">
              {token.usd_market_cap
                ? `$${parseFloat(token.usd_market_cap).toLocaleString()}`
                : "N/A"}
            </span>
          </p>

          {/* Links and Comments */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-3 text-gray-600">
              {token.twitter && (
                <a
                  href={`https://twitter.com/${token.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600"
                >
                  <FaTwitter />
                </a>
              )}
              {token.website && (
                <a
                  href={token.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
              {token.radium_pool && (
                <a
                  href={`https://www.geckoterminal.com/solana/pools/${token.radium_pool}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600"
                >
                  <FaFire />
                </a>
              )}
              <a
                href={`https://pump.fun/coin/${token.mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600"
              >
                <FaGlobe />
              </a>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <FaCommentDots className="text-green-600" />
              {token.reply_count || 0}
            </p>
          </div>

          {/* Contract Address */}
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">{truncatedMint}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-gray-800 hover:text-green-600"
            >
              <FaCopy />
            </button>
          </div>
          {copiedMint === token.mint && (
            <span className="text-xs text-green-600 mt-1">Copied!</span>
          )}
        </div>
      </div>
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    if (e.target.value === "market_cap") {
      const sortedTokens = [...completedTokens].sort(
        (a, b) => parseFloat(b.usd_market_cap) - parseFloat(a.usd_market_cap)
      );
      setCompletedTokens(sortedTokens);
    }
    if (e.target.value === "token_creation") {
      const sortedTokens = [...completedTokens].sort(
        (a, b) =>
          new Date(b.created_timestamp).getTime() -
          new Date(a.created_timestamp).getTime()
      );
      setCompletedTokens(sortedTokens);
    }
    if (e.target.value === "recently_completed") {
      setOffset(0);
      fetchPumpData();
    }
  };

  const toggleCompletedView = () => {
    setShowCompleted(!showCompleted);
    setOffset(0);
  };

  const loadMore = () => {
    setOffset(offset + limit);
  };

  const handleRefresh = () => {
    setOffset(0);
    fetchPumpData();
  };

  return (
    <main className="flex flex-col items-center justify-center text-black p-2 space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-600">
        PUMP TRACKER
      </h1>

      <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-4 gap-4">
        {/* Refresh and Sort Option in the same line */}
        <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="text-green-600 hover:underline flex items-center gap-2"
          >
            <FaSync className={isRefreshing ? "animate-spin" : ""} />
            {!isRefreshing && "Refresh"}
          </button>

          {/* Sort Option */}
          {showCompleted && (
            <div className="relative inline-block text-left">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="bg-gray-100 text-black text-center text-sm py-2 px-3 sm:pr-6 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none w-auto"
              >
                <option value="market_cap">Sort by Market Cap</option>
                <option value="recently_completed">
                  Sort by Recently Completed
                </option>
                <option value="token_creation">Sort by Token Creation</option>
              </select>
              {/* Custom dropdown arrow */}
              <span className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 text-green-600 pointer-events-none">
                ▼
              </span>
            </div>
          )}
        </div>

        {/* Toggle View Button */}
        <button
          onClick={toggleCompletedView}
          className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
        >
          <span>
            {showCompleted ? "View New Pump Tokens" : "View Completed Tokens"}
          </span>
        </button>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Token Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
            {/* Pinned Token */}
            {pinnedToken && <div>{renderTokenCard(pinnedToken, true)}</div>}
            {completedTokens.length > 0 ? (
              completedTokens.map((token) => renderTokenCard(token))
            ) : (
              <p className="text-gray-600">No data available.</p>
            )}
          </div>
          <button
            onClick={loadMore}
            className="text-green-600 hover:underline mt-6"
          >
            See More
          </button>
        </>
      )}
    </main>
  );
}
