"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineTwitter, AiOutlineGlobal } from "react-icons/ai";
import { FaCopy, FaRocket, FaTelegramPlane } from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";
import { FiExternalLink } from "react-icons/fi";
import { FaTwitter, FaTelegram} from "react-icons/fa";

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

  const renderTokenCard = (token: Token) => {
    // Filter out blank links and remove duplicate link types
    const uniqueLinks = token.links
      .filter((link, index, self) =>
        link.url && self.findIndex(l => l.type === link.type) === index
      );
  
    return (
      <div
        key={token.tokenAddress}
        className="relative rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 hover:border-green-400"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <img
                src={token.icon || "https://i.ibb.co/cCycF9h/pf212.png"}
                alt={token.name}
                className="w-14 h-14 rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors"
              />
              {token.hasMoonshot && !token.hasPumpFun && (
                <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-full">
                  <FaRocket size={12} />
                </div>
              )}
            </div>
  
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {token.symbol}
                </span>
              </div>
  
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">
                  Price: <span className="font-medium text-green-700">${token.priceUsd}</span>
                </p>
                <p className="text-gray-600">
                  Liquidity: <span className="font-medium">${token.liquidity.toLocaleString()}</span>
                </p>
                <p className="text-gray-600">
                  Buys: <span className="text-green-700">{token.txns.buys}</span>
                </p>
                <p className="text-gray-600">
                  Sells: <span className="text-red-600">{token.txns.sells}</span>
                </p>
              </div>
            </div>
          </div>
  
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => handleCopy(token.tokenAddress)}
              className="text-gray-400 hover:text-green-600 transition-colors tooltip"
              data-tip={copiedToken === token.tokenAddress ? "Copied!" : "Copy Address"}
            >
              {copiedToken === token.tokenAddress ? (
                <span className="text-green-600">✔</span> // Display the tick mark when copied
              ) : (
                <FaCopy size={16} />
              )}
            </button>
            <div className="flex gap-2">
              {token.hasPumpFun && (
                <a
                  href={`https://pump.fun/coin/${token.tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <img
                    src="/images/pump-logo-bg.png"
                    alt="Pump.fun"
                    className="w-5 h-5 rounded-full"
                  />
                </a>
              )}
              {token.hasMoonshot && !token.hasPumpFun && (
                <a
                  href={`https://moonshot.cc/token/${token.tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <img
                    src="https://www.checkdex.xyz/images/logos/moonshot.png"
                    alt="Moonshot"
                    className="w-5 h-5 rounded-full"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
  
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {uniqueLinks.map((link, idx) => {
                const iconProps = {
                  className: "text-gray-400 hover:text-green-600 transition-colors",
                  size: 18,
                };
  
                switch (link.type) {
                  case "twitter":
                    return <a key={idx} href={link.url} target="_blank" rel="noopener"><FaTwitter {...iconProps} /></a>;
                  case "telegram":
                    return <a key={idx} href={link.url} target="_blank" rel="noopener"><FaTelegram {...iconProps} /></a>;
                  case "website":
                    return <a key={idx} href={link.url} target="_blank" rel="noopener"><FiExternalLink {...iconProps} /></a>;
                  default:
                    return null;
                }
              })}
            </div>
            <a
              href={token.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              DexScreener
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  
  return (
    <main className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm">
          <div className="text-center">
            <PuffLoader color="#16a34a" size={80} />
            <p className="mt-4 text-green-700 font-medium animate-pulse">
              Loading Market Data...
            </p>
          </div>
        </div>
      )}

      <div className="mb-12 w-full mx-auto text-center pt-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Real-Time DEX Analytics
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track trending tokens across decentralized exchanges with live market data and social insights
        </p>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto">
          <section className="space-y-6">
            <div className=" backdrop-blur-sm p-2 rounded-xl ">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🚀 Latest Launches
              </h2>
              <div className="space-y-4">
                {latestBoosted.slice(0, visibleLatest).map(renderTokenCard)}
              </div>
              {visibleLatest < latestBoosted.length && (
                <button
                  onClick={() => setVisibleLatest((prev) => prev + 5)}
                  className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className=" backdrop-blur-sm p-2 rounded-xl ">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🔥 Trending Tokens
              </h2>
              <div className="space-y-4">
                {trendingTokens.slice(0, visibleTrending).map(renderTokenCard)}
              </div>
              {visibleTrending < trendingTokens.length && (
                <button
                  onClick={() => setVisibleTrending((prev) => prev + 5)}
                  className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <Link href="/" className="fixed bottom-4 right-4 animate-float">
        <div className="bg-green-600 p-2.5 rounded-full shadow-md text-white text-sm flex items-center gap-2">
          <FaRocket />
          <span>Back to Home</span>
        </div>
      </Link>
    </main>
  );
}