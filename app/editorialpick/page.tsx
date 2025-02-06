"use client";

import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

interface MemeToken {
  name: string;
  ticker: string;
  imageUrl: string;
  platform: string;
  chartUrl: string;
  buyUrl: string;
  status: string;
}

interface PumpToken {
  usd_market_cap: any;
  raydium_pool: any;
  mint: string;
  name: string;
  symbol: string;
  image_uri: string;
  website: string;
  market_cap: number;
}

export default function MemeTokensPage() {
  // Predefined meme tokens
  const predefinedTokens: MemeToken[] = [
    {
      name: "GOAT",
      ticker: "GOAT",
      imageUrl: "https://i.postimg.cc/k5C61Q0z/image.png",
      platform: "Raydium",
      chartUrl: "https://dexscreener.com/solana/9tb2ohu5p16bpbarqd3n27wnkf51ukfs8z1gzzldxvzw",
      buyUrl: "https://jup.ag/swap/GOAT_CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump-SOL",
      status: "Launched",
    },
    {
      name: "MICHI",
      ticker: "MICHI",
      imageUrl: "https://i.postimg.cc/Y96P0yL8/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp",
      buyUrl: "https://jup.ag/swap/5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp-SOL",
      status: "Launched",
    },
    {
      name: "GIGA",
      ticker: "GIGA",
      imageUrl: "https://i.postimg.cc/3JNdjMry/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
      buyUrl: "https://jup.ag/swap/GIGA-SOL",
      status: "Launched",
    },
    {
      name: "RETARDIO",
      ticker: "RETARDIO",
      imageUrl: "https://i.postimg.cc/SsphgP0b/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/6ogzHhzdrQr9Pgv6hZ2MNze7UrzBMAFyBBWUYp1Fhitx",
      buyUrl: "https://jup.ag/swap/RETARDIO-SOL",
      status: "Launched",
    },
    {
      name: "$SLOP",
      ticker: "SLOP",
      imageUrl: "https://i.postimg.cc/sD2bVzsg/image.png",
      platform: "Raydium",
      chartUrl: "https://dexscreener.com/solana/FqvtZ2UFR9we82Ni4LeacC1zyTiQ77usDo31DUokpump",
      buyUrl: "https://jup.ag/swap/FqvtZ2UFR9we82Ni4LeacC1zyTiQ77usDo31DUokpump-SOL",
      status: "Launched",
    },
    {
      name: "FARTCOIN",
      ticker: "FARTCOIN",
      imageUrl: "https://i.postimg.cc/d1tgLcr6/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
      buyUrl: "https://jup.ag/swap/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump-SOL",
      status: "Launched",
    },
    {
      name: "MOODENG",
      ticker: "MOODENG",
      imageUrl: "https://i.postimg.cc/HnLJZn5M/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY",
      buyUrl: "https://jup.ag/swap/MOODENG-SOL",
      status: "Launched",
    },
    {
      name: "BOME",
      ticker: "BOME",
      imageUrl: "https://i.postimg.cc/DZPjQjdZ/image.png",
      platform: "Jupiter",
      chartUrl: "https://dexscreener.com/solana/ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82",
      buyUrl: "https://jup.ag/swap/ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82",
      status: "Launched",
    },
  ];

  const [pumpTokens, setPumpTokens] = useState<PumpToken[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPumpTokens = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-filter/?offset=${offset}&limit=8&sort=market_cap&order=DESC&includeNsfw=true`
        );
        const data = await response.json();
        if (isMounted) {
          setPumpTokens((prev) => {
            const uniqueTokens = [...prev, ...data].reduce((acc, token) => {
              if (!acc.some((t) => t.mint === token.mint)) {
                acc.push(token);
              }
              return acc;
            }, []);
            return uniqueTokens;
          });
        }
      } catch (error) {
        console.error("Error fetching Pump.fun tokens:", error);
      }
      setLoading(false);
    };
  
    fetchPumpTokens();
  
    return () => {
      isMounted = false;
    };
  }, [offset]);
  

  const renderTokenCard = (token: MemeToken) => (
    <div
      key={token.ticker}
      className="relative border border-green-500 rounded-lg shadow-md p-4 bg-gray-800 hover:shadow-lg hover:border-green-400 transition-all"
    >
      <div className="flex flex-col items-center">
        <img
          src={token.imageUrl}
          alt={token.name}
          className="w-16 h-16 rounded-full border border-green-300 mb-4"
        />
        <h3 className="text-lg font-semibold text-green-400">{token.name}</h3>
        <div className="text-sm text-gray-300 mt-2 space-y-1">
          <a
            href={token.chartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline flex items-center justify-center"
          >
            ➤ View Chart
          </a>
          <p>
            <span className="text-gray-400">Platform:</span>{" "}
            <span className="text-gray-300 font-medium">{token.platform}</span>
          </p>
          <a
            href={token.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline flex items-center justify-center"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );

  const renderPumpTokenCard = (token: PumpToken) => (
    <div
      key={token.mint}
      className="relative border border-green-500 rounded-lg shadow-md p-4 bg-gray-800 hover:shadow-lg hover:border-green-400 transition-all"
    >
      <div className="flex flex-col items-center">
        <img
          src={token.image_uri}
          alt={token.name}
          className="w-16 h-16 rounded-full border border-green-300 mb-4"
        />
        <h3 className="text-lg font-semibold text-green-400">{token.name}</h3>
        <div className="text-sm text-gray-300 mt-2 space-y-1">
          <p>
            <span className="text-gray-400">Market Cap:</span>{" "}
            <span className="text-gray-300 font-medium">${token.usd_market_cap.toFixed(0)}</span>
          </p>
          {token.raydium_pool && (
            <a
              href={`https://www.geckoterminal.com/solana/pools/${token.raydium_pool}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline flex items-center justify-center"
            >
              Buy now
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-400">
            🎉 Editor's Pick: 1000X Meme Tokens
          </h1>
          <p className="text-gray-300 mt-4">
            Check out these meme tokens with potential to make your crypto journey hilarious and exciting! 🚀
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {predefinedTokens.map((token) => renderTokenCard(token))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">🔥 Top Meme Tokens on Pump.fun</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pumpTokens.map((token) => renderPumpTokenCard(token))}
          </div>
          {loading ? (
            <div className="flex items-center mt-6 justify-center">
              <PuffLoader color="#36D7B7" size={60} />
            </div>
          ) : (
            <div className="text-center mt-6">
              <button
                onClick={() => setOffset((prev) => prev + 8)}
                className="bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-400 transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
      <section className="mt-16 bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          What Are Meme Tokens?
        </h2>
        <p className="text-gray-300">
          Meme tokens are cryptocurrencies inspired by the internet's favorite
          pastimes—memes! Unlike traditional cryptos, they rely heavily on
          community engagement and viral trends. They’re often created “for the
          lolz,” but some have gained astronomical value (looking at you, DOGE
          🐕 and SHIB 🐶).
        </p>
        <h3 className="text-xl font-semibold text-green-400 mt-6">
          How to Safely Participate in Meme Token Projects
        </h3>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-300">
          <li>
            <span className="font-semibold text-gray-300">
              DYOR (Do Your Own Research):
            </span>{" "}
            Check the team, roadmap, and transparency of the project before
            investing.
          </li>
          <li>
            <span className="font-semibold text-gray-300">
              Beware of Scams:
            </span>{" "}
            If a meme token promises to turn you into a millionaire overnight,
            it’s probably too good to be true. 🛑
          </li>
          <li>
            <span className="font-semibold text-gray-300">
              Understand the Risks:
            </span>{" "}
            Meme tokens are fun but speculative. Don’t invest more than you can
            afford to lose.
          </li>
        </ul>
        <p className="mt-6 text-gray-300 italic">
          Remember: Memes are for fun; profits are a bonus! Happy meming! 🎭
        </p>
      </section>
    </main>
  );
}
