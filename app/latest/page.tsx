"use client";

import { useState, useEffect } from "react";
import { AiOutlineTwitter, AiOutlineGlobal } from "react-icons/ai";
import { FaCopy, FaTelegramPlane } from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";

interface Token {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  name: string;
  symbol: string;
  description: string;
  priceUsd: string;
  liquidity: number;
  txns: { buys: number; sells: number };
  links: { type: string; url: string }[];
  hasPumpFun?: boolean; // Indicates if the token exists in PumpFun
  hasMoonshot?: boolean; // Indicates if the token exists in Moonshot
}

export default function DexTrackerPage() {
  const [latestBoosted, setLatestBoosted] = useState<Token[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [visibleLatest, setVisibleLatest] = useState(5);
  const [visibleTrending, setVisibleTrending] = useState(5);

  useEffect(() => {
    fetchTokens("https://api.dexscreener.com/token-boosts/latest/v1", setLatestBoosted);
    fetchTokens("https://api.dexscreener.com/token-boosts/top/v1", setTrendingTokens);
  }, []);

  const fetchTokens = async (apiUrl: string, setState: (tokens: Token[]) => void) => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const enrichedTokens = await Promise.all(
        data.map(async (item: any) => {
          try {
            const detailsResponse = await fetch(
              `https://api.dexscreener.com/latest/dex/tokens/${item.tokenAddress}`
            );
            const detailsData = await detailsResponse.json();

            const pair = detailsData.pairs?.[0];
            if (!pair) return null;

            const hasPumpFun = await checkPumpFun(item.tokenAddress);
            const hasMoonshot = !hasPumpFun && (await checkMoonshot(item.tokenAddress));

            return {
              url: pair.url,
              chainId: pair.chainId,
              tokenAddress: pair.baseToken.address,
              icon: pair.info?.imageUrl || item.icon,
              name: pair.baseToken.name || "Unknown",
              symbol: pair.baseToken.symbol || "N/A",
              description: item.description || "No description available.",
              priceUsd: pair.priceUsd || "N/A",
              liquidity: pair.liquidity?.usd || 0,
              txns: pair.txns?.h24 || { buys: 0, sells: 0 },
              links: [
                ...(item.links || []),
                ...(pair.info?.websites || []),
                ...(pair.info?.socials || []),
              ],
              hasPumpFun,
              hasMoonshot,
            };
          } catch {
            return null;
          }
        })
      );

      setState(enrichedTokens.filter(Boolean) as Token[]);
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to load token data.");
    } finally {
      setLoading(false);
    }
  };

  const checkPumpFun = async (address: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-specific-details/${address}`);
      if (response.ok) {
        const data = await response.json();
        return !!data; // Return true if data is found
      }
      return false;
    } catch {
      return false;
    }
  };

  const checkMoonshot = async (address: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.moonshot.cc/token/v1/solana/${address}`);
      if (response.ok) {
        const data = await response.json();
        return !!data; // Return true if data is found
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedToken(address);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const renderCard = (token: Token) => {
    // Deduplicate links based on their type
    const uniqueLinks = Array.from(
      new Map(token.links.map((link) => [link.type, link])).values()
    );

    // Truncate contract address
    const truncatedAddress = `${token.tokenAddress.slice(0, 6)}...${token.tokenAddress.slice(-6)}`;

    return (
      <div
        key={token.tokenAddress}
        className="relative bg-gray-900 p-4 rounded-lg border-2 border-green-400 hadow-md mb-4"
      >
        {/* Token Header */}
        <div className="flex items-center gap-3">
          <img
            src={token.icon || "/default-icon.png"}
            alt={`${token.name} Icon`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol} | ${token.priceUsd}</p>
          </div>
        </div>

        {/* Truncated description */}
        <p className="text-sm text-gray-300 mt-2">
          {token.description.length > 70
            ? `${token.description.slice(0, 70)}...`
            : token.description}
        </p>

        {/* Liquidity and Transactions */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-green-400">
              Liquidity: ${token.liquidity.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              24h Transactions: Buys {token.txns.buys}, Sells {token.txns.sells}
            </p>
          </div>
        </div>

        {/* Contract Address with Copy Icon */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-400">{truncatedAddress}</span>
          <button
            onClick={() => handleCopy(token.tokenAddress)}
            className="text-white hover:text-green-400"
          >
            <FaCopy />
          </button>
          {copiedToken === token.tokenAddress && (
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-black text-xs px-2 py-1 rounded-lg">
              Copied!
            </span>
          )}
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-2 mt-4">
          {/* Deduplicated social links */}
          {uniqueLinks.map((link, idx) => {
            if (link.type === "twitter") {
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-lg"
                >
                  <AiOutlineTwitter />
                </a>
              );
            }
            if (link.type === "website") {
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 text-lg"
                >
                  <AiOutlineGlobal />
                </a>
              );
            }
            if (link.type === "telegram") {
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-lg"
                >
                  <FaTelegramPlane />
                </a>
              );
            }
            return null;
          })}

          {/* PumpFun Icon */}
          {token.hasPumpFun && (
            <a
              href={`https://pump.fun/coin/${token.tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5"
            >
              <img
                src="/images/pump-logo-bg.png"
                alt="PumpFun Icon"
                className="w-full h-full object-contain"
              />
            </a>
          )}

          {/* Moonshot Icon */}
          {token.hasMoonshot && !token.hasPumpFun && (
            <a
              href={`https://moonshot.cc/token/${token.tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5"
            >
              <img
                src="https://www.checkdex.xyz/images/logos/moonshot.png"
                alt="Moonshot Icon"
                className="w-full h-full object-contain"
              />
            </a>
          )}

          {/* DexScreener Icon */}
          <a
            href={`https://dexscreener.com/${token.chainId}/${token.tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            <img
              src="https://freedurovpavel.xyz/wp-content/uploads/2024/08/dex.png"
              alt="DexScreener Icon"
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col w-full items-center justify-center bg-gray-700 rounded-lg text-white p-6 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-400">DEX Tracker</h1>

      {loading && (
        <div className="flex justify-center mt-4">
          <PuffLoader color="#00FFAB" />
        </div>
      )}

      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <section className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-400 mb-4">🕒 Latest Boosted Tokens</h2>
          {latestBoosted.slice(0, visibleLatest).map((token) => renderCard(token))}
          {visibleLatest < latestBoosted.length && (
            <button
              onClick={() => setVisibleLatest((prev) => prev + 5)}
              className="w-full text-green-400 mt-4 text-sm hover:text-green-500"
            >
              See More
            </button>
          )}
        </section>
        <section className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-400 mb-4">💥 Hot Boosted Tokens</h2>
          {trendingTokens.slice(0, visibleTrending).map((token) => renderCard(token))}
          {visibleTrending < trendingTokens.length && (
            <button
              onClick={() => setVisibleTrending((prev) => prev + 5)}
              className="w-full text-green-400 mt-4 text-sm hover:text-green-500"
            >
              See More
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
