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
  pumpUrl?: string; // Pump-specific URL
  pumpIcon?: string; // Pump-specific icon
  moonshotUrl?: string; // Moonshot-specific URL
  moonshotIcon?: string; // Moonshot-specific icon
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

        // Enhance tokens with Pump and Moonshot-specific icons and URLs
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
      className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-purple-100 hover:border-purple-300"
    >
      {isPinned && (
        <div className="absolute top-2 right-2 text-purple-600 animate-bounce">
          <FaThumbtack size={20} />
        </div>
      )}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={token.image_uri || "https://i.ibb.co/cCycF9h/pf212.png"}
            alt={token.name}
            className="w-16 h-16 rounded-full border-4 border-purple-200 group-hover:border-purple-400 transition-colors"
          />
          {token.dexId === "moonshot" && (
            <div className="absolute -top-2 -right-2 bg-purple-500 text-white p-1 rounded-full">
              <FaRocket size={14} />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {token.name}
          </h3>
          <p className="text-sm text-gray-600">Symbol: {token.symbol}</p>
          <p className="text-sm text-gray-600">
            Market Cap:{" "}
            <span className="font-bold text-purple-700">
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
            className="text-gray-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all"
          >
            <FaTwitter size={20} />
          </a>
        )}
        {token.telegram && (
          <a
            href={token.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all"
          >
            <FaTelegram size={20} />
          </a>
        )}
        {token.website && (
          <a
            href={token.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all"
          >
            <FaExternalLinkAlt size={20} />
          </a>
        )}
        {token.pumpUrl && token.pumpIcon && (
          <a
            href={token.pumpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all"
          >
            <img
              src={token.pumpIcon}
              alt="Pump Logo"
              className="w-6 h-6 rounded-full"
            />
          </a>
        )}
        {token.moonshotUrl && token.moonshotIcon && (
          <a
            href={token.moonshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all"
          >
            <img
              src={token.moonshotIcon}
              alt="Moonshot Logo"
              className="w-6 h-6 rounded-full"
            />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <main className=" min-h-screen relative p-6">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 backdrop-blur-sm">
          <div className="text-center">
            <PuffLoader color="#6D28D9" size={80} />
            <p className="mt-4 text-purple-700 font-semibold animate-pulse">
              Loading Crypto Magic...
            </p>
          </div>
        </div>
      )}
      <div className="mb-12 max-w-6xl mx-auto text-center relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-purple-400 to-pink-300 opacity-10 blur-3xl" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            ✨ Trending MEME Tokens
          </span>
        </h1>
        <p className="text-lg text-purple-700/80 mb-6 max-w-2xl mx-auto">
          Discover the hottest MEME tokens in real-time. Explore active rocketships 🚀 and legendary moon missions 🌕
        </p>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <section className="relative">
            <div className="sticky top-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                🚀 Active Launches
              </h2>
              <div className="space-y-6">
                {activePumps
                  .slice(0, activeLimit)
                  .map((token) => renderTokenCard(token, token.isPinned))}
              </div>
              {activePumps.length > activeLimit && (
                <button
                  onClick={() => setActiveLimit((prev) => prev + 5)}
                  className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Show More Launches
                </button>
              )}
            </div>
          </section>

          <section>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                🌕 Moon Veterans
              </h2>
              <div className="space-y-6">
                {completedPumps
                  .slice(0, completedLimit)
                  .map((token) => renderTokenCard(token, token.isPinned))}
              </div>
              {completedPumps.length > completedLimit && (
                <button
                  onClick={() => setCompletedLimit((prev) => prev + 5)}
                  className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Show More History
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <FAQ />
      
      {/* Floating surprise elements */}
      <div className="fixed bottom-4 right-4 animate-float">
        <div className="bg-purple-600 p-3 rounded-full shadow-xl text-white">
          <span className="text-sm">🚀 To the moon!</span>
        </div>
      </div>
    </main>
  );
}
