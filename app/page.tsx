"use client";

import React, { useState, useEffect } from "react";
import {
  FaTwitter,
  FaTelegram,
  FaExternalLinkAlt,
  FaThumbtack,
  FaRocket,
} from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import FAQ from "./components/Faqhome";
import Link from "next/link";

interface PumpToken {
  dexId: string;
  mint: string;
  name: string;
  symbol: string;
  image_uri: string;
  usd_market_cap?: number;
  complete: boolean;
  twitter?: string;
  telegram?: string;
  website?: string;
  isPinned?: boolean;
  pumpUrl?: string;
  pumpIcon?: string;
  moonshotUrl?: string;
  moonshotIcon?: string;
}

export default function PumpListingPage() {
  const [activePumps, setActivePumps] = useState<PumpToken[]>([]);
  const [completedPumps, setCompletedPumps] = useState<PumpToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLimit, setActiveLimit] = useState(5);
  const [completedLimit, setCompletedLimit] = useState(5);

  useEffect(() => {
    fetchPumpData();
  }, []);

  const fetchPumpData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://dextools1jsseuer32das3.vercel.app/api/coins/all"
      );
      if (response.status === 200) {
        const { activeTokens, completedTokens } = response.data;

        const enhancedActiveTokens = activeTokens.map((token: PumpToken) => ({
          ...token,
          pumpUrl:
            token.dexId === "pump"
              ? `https://pump.fun/coin/${token.mint}`
              : null,
          pumpIcon: token.dexId === "pump" ? "/images/pump-logo-bg.png" : null,
          moonshotUrl:
            token.dexId === "moonshot"
              ? `https://moonshot.cc/token/${token.mint}`
              : null,
          moonshotIcon:
            token.dexId === "moonshot"
              ? "https://www.checkdex.xyz/images/logos/moonshot.png"
              : null,
        }));

        const enhancedCompletedTokens = completedTokens.map(
          (token: PumpToken) => ({
            ...token,
            pumpUrl:
              token.dexId === "pump"
                ? `https://pump.fun/coin/${token.mint}`
                : null,
            pumpIcon:
              token.dexId === "pump" ? "/images/pump-logo-bg.png" : null,
            moonshotUrl:
              token.dexId === "moonshot"
                ? `https://moonshot.cc/token/${token.mint}`
                : null,
            moonshotIcon:
              token.dexId === "moonshot"
                ? "https://www.checkdex.xyz/images/logos/moonshot.png"
                : null,
          })
        );

        setActivePumps(enhancedActiveTokens);
        setCompletedPumps(enhancedCompletedTokens);
      } else {
        setError("Failed to load pump data.");
      }
    } catch (err) {
      console.error("Error fetching pump data:", err);
      setError("Failed to load pump data.");
    } finally {
      setLoading(false);
    }
  };

  const renderTokenCard = (token: PumpToken, isPinned: boolean = false) => (
    <div
      key={token.mint}
      className="relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 hover:border-green-400"
    >
      {isPinned && (
        <div className="absolute top-2 right-2 text-green-600 animate-bounce">
          <FaThumbtack size={18} />
        </div>
      )}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={token.image_uri || "https://i.ibb.co/cCycF9h/pf212.png"}
            alt={token.name}
            className="w-14 h-14 rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors"
          />
          {token.dexId === "moonshot" && (
            <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-full">
              <FaRocket size={12} />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
          <p className="text-sm text-gray-600">Symbol: {token.symbol}</p>
          <p className="text-sm text-gray-600">
            Market Cap:{" "}
            <span className="font-medium text-green-700">
              $
              {token.usd_market_cap
                ? parseFloat(token.usd_market_cap.toString()).toLocaleString()
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {token.twitter && (
          <a
            href={token.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaTwitter size={18} />
          </a>
        )}
        {token.telegram && (
          <a
            href={token.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaTelegram size={18} />
          </a>
        )}
        {token.website && (
          <a
            href={token.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaExternalLinkAlt size={18} />
          </a>
        )}
        {token.pumpUrl && token.pumpIcon && (
          <a
            href={token.pumpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <img
              src={token.pumpIcon}
              alt="Pump Logo"
              className="w-5 h-5 rounded-full"
            />
          </a>
        )}
        {token.moonshotUrl && token.moonshotIcon && (
          <a
            href={token.moonshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <img
              src={token.moonshotIcon}
              alt="Moonshot Logo"
              className="w-5 h-5 rounded-full"
            />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 backdrop-blur-sm">
          <div className="text-center">
            <PuffLoader color="#16a34a" size={80} />
            <p className="mt-4 text-green-700 font-medium animate-pulse">
              Loading Market Data...
            </p>
          </div>
        </div>
      )}
      <div className="mb-12 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Explore Active Memes
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track real-time market movements of popular tokens with comprehensive
          social and financial metrics
        </p>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <section className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Active Markets
              </h2>
              <div className="space-y-4">
                {activePumps
                  .slice(0, activeLimit)
                  .map((token) => renderTokenCard(token, token.isPinned))}
              </div>
              {activePumps.length > activeLimit && (
                <button
                  onClick={() => setActiveLimit((prev) => prev + 5)}
                  className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Historical Performers
              </h2>
              <div className="space-y-4">
                {completedPumps
                  .slice(0, completedLimit)
                  .map((token) => renderTokenCard(token, token.isPinned))}
              </div>
              {completedPumps.length > completedLimit && (
                <button
                  onClick={() => setCompletedLimit((prev) => prev + 5)}
                  className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <FAQ />

      <Link href="hot_pump" className="fixed bottom-4 right-4 animate-float">
  <div className="bg-green-600 p-2.5 rounded-full shadow-md text-white text-sm">
    <span>🚀 Track Trends</span>
  </div>
</Link>

    </main>
  );
}