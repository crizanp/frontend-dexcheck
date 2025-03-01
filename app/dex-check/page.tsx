"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import {
  AiOutlineSearch,
  AiOutlineSmile,
  AiOutlineFrown,
  AiOutlineTwitter,
} from "react-icons/ai";
import Spotlight from "../components/Spotlight";
interface TokenData {
  chainId: string;
  mint: string;
  description?: string;
  url?: string;
  icon?: string;
  symbol?: string;
  isKingOfTheHill?: string;
  status?: string;
  raydium_pool?: string;
}

interface Order {
  type: string;
  status: string;
  paymentTimestamp: number;
}

interface PairData {
  chainId: string;
  dexId: string;
  url: string;
  baseToken: {
    address: any;
    name: string;
    symbol: string;
  };
  quoteToken: { name: string; symbol: string };
  priceUsd: string;
  liquidity: { usd: number };
  info?: {
    imageUrl?: string;
  };
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  priceChange: {
    m5: number;
    h1: number;
    h24: number;
  };
}

const popularTokens = [
  "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump",
  "CBdCxKo9QavR9hfShgpEBG3zekorAeD7W1jfq2o3pump",
  "9yNEs1Z96EF4Y5NTufU9FyRAz6jbGzZLBfRQCtssPtAQ",
  "3KAeVfDbU6tZxSD2kqz3Pz6B6f42CW3FdA89GUZ8fw23",
  "72XUGRRzuSoLRch3QPpSPHkuZ8F58rvtCNF4QSosLb4H",
];

export default function DexCheckerPage() {
  const [mintInput, setmintInput] = useState("");
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [pairData, setPairData] = useState<PairData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [noTokenInfo, setNoTokenInfo] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const [pumpData, setPumpData] = useState<any>(null);

  const fetchTokenDetails = async (mint: string) => {
    try {
      setNoTokenInfo(false);
      setIconError(false);

      // Check with Moonshot API
      try {
        const moonshotResponse = await fetch(
          `https://api.moonshot.cc/token/v1/solana/${encodeURIComponent(mint)}`
        );
        if (moonshotResponse.ok) {
          const moonshotData = await moonshotResponse.json();

          setTokenData({
            chainId: moonshotData.chainId || "solana",
            mint,
            description:
              moonshotData.profile?.description || "No description available",
            url: moonshotData.url || "",
            icon: moonshotData.profile?.icon || "",
            symbol: moonshotData.baseToken.symbol || "",
          });

          setPairData([
            {
              chainId: moonshotData.chainId || "solana",
              dexId: "moonshot", // Ensure this is explicitly set
              url: moonshotData.url,
              baseToken: moonshotData.baseToken,
              quoteToken: moonshotData.quoteToken,
              priceUsd: moonshotData.priceUsd || "0",
              liquidity: moonshotData.liquidity || { usd: 0 },
              txns: moonshotData.txns,
              priceChange: moonshotData.priceChange || { m5: 0, h1: 0, h24: 0 },
              info: { imageUrl: moonshotData.profile?.icon },
            },
          ]);

          return moonshotData.chainId || "solana";
        }
      } catch (err) {
        console.warn("Moonshot API fetch failed, proceeding with other APIs.");
      }

      // Check with Pump API if the address ends with "pump"
      if (mint.toLowerCase().endsWith("pump")) {
        const pumpResponse = await fetch(
          `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-specific-details/${encodeURIComponent(
            mint
          )}`
        );
        const pumpData = await pumpResponse.json();

        if (pumpData) {
          setPumpData(pumpData);

          const isKingOfTheHill = pumpData.king_of_the_hill_timestamp
            ? new Date(pumpData.king_of_the_hill_timestamp).toLocaleString()
            : null;

          const isLaunched =
            pumpData.raydium_pool && pumpData.raydium_pool !== "";

          setTokenData({
            chainId: "solana",
            mint: pumpData.mint || "",
            description: pumpData.description || "No description available",
            url: pumpData.website || "",
            icon: pumpData.image_uri || "",
            symbol: pumpData.symbol || "",
            raydium_pool: pumpData.raydium_pool || "",
            isKingOfTheHill,
            status: isLaunched ? "Launched" : "Still in PumpFun",
          });

          setPairData([
            {
              chainId: "solana",
              dexId: "pump-dex",
              url: pumpData.website || "",
              baseToken: {
                address: mint,
                name: pumpData.name,
                symbol: pumpData.symbol,
              },
              quoteToken: { name: "USD", symbol: "USD" },
              priceUsd: pumpData.usd_market_cap?.toString() || "0",
              liquidity: { usd: pumpData.market_cap || 0 },
              txns: {
                m5: { buys: 0, sells: 0 },
                h1: { buys: 0, sells: 0 },
                h24: { buys: 0, sells: 0 },
              },
              priceChange: { m5: 0, h1: 0, h24: 0 },
              info: { imageUrl: pumpData.image_uri || "" },
            },
          ]);

          return "solana";
        }
      }

      // Check with normal DexAPI
      try {
        const normalResponse = await fetch(
          `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-specific-details/${encodeURIComponent(
            mint
          )}`
        );
        if (normalResponse.ok) {
          const normalData = await normalResponse.json();

          setTokenData({
            chainId: normalData.chainId || "solana",
            mint,
            description: normalData.description || "No description available",
            url: normalData.website || "",
            icon: normalData.image_uri || "",
            symbol: normalData.symbol || "",
          });

          setPairData([
            {
              chainId: normalData.chainId || "solana",
              dexId: normalData.dexId || "unknown",
              url: normalData.website,
              baseToken: {
                address: mint,
                name: normalData.name,
                symbol: normalData.symbol,
              },
              quoteToken: { name: "USD", symbol: "USD" },
              priceUsd: normalData.market_cap
                ? normalData.market_cap.toString()
                : "0",
              liquidity: { usd: normalData.market_cap || 0 },
              txns: {
                m5: { buys: 0, sells: 0 },
                h1: { buys: 0, sells: 0 },
                h24: { buys: 0, sells: 0 },
              },
              priceChange: { m5: 0, h1: 0, h24: 0 },
              info: { imageUrl: normalData.image_uri || "" },
            },
          ]);

          return normalData.chainId || "solana";
        }
      } catch (err) {
        console.warn("Normal DexAPI fetch failed.");
      }

      // Default Dex Screener API
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(
          mint
        )}`
      );
      const data = await response.json();

      if (data && Array.isArray(data.pairs)) {
        const matchedPair = data.pairs.find(
          (pair: PairData) =>
            pair.baseToken.address.toLowerCase() === mint.toLowerCase()
        );

        if (matchedPair) {
          setTokenData({
            chainId: matchedPair.chainId,
            mint,
            description: `Pair on ${matchedPair.dexId}`,
            url: matchedPair.url,
            icon: matchedPair.info?.imageUrl || "",
            symbol: matchedPair.baseToken.symbol,
          });

          setPairData([matchedPair]);
          return matchedPair.chainId;
        }
      }

      const inferredChainId = inferChainIdFromAddress(mint);
      if (inferredChainId) {
        setTokenData({
          chainId: inferredChainId,
          mint,
          description: "Inferred Chain",
          url: "",
          icon: "",
        });
        return inferredChainId;
      }

      setNoTokenInfo(true);
      throw new Error("Token not found. Check the address and try again.");
    } catch (err) {
      setError("Failed to fetch token details.");
      setLoading(false);
      return null;
    }
  };

  const inferChainIdFromAddress = (address: string) => {
    if (address.startsWith("0x")) {
      return "ethereum";
    } else if (address.match(/^[1-9A-HJ-NP-Za-km-z]+$/)) {
      return "solana";
    } else if (address.startsWith("bnb")) {
      return "bsc";
    }
    return null;
  };
  const fetchOrderStatus = async (
    mint: string,
    chainId: string,
    dexId?: string
  ) => {
    try {
      // Check if dexId is 'moonshot', and mark as paid if true
      if (dexId === "moonshot") {
        console.log("Detected moonshot dexId. Setting isPaid to true.");
        setIsPaid(true);
        return; // Exit the function early for Moonshot
      }

      // Construct the endpoint for order checking
      const endpoint =
        chainId === "solana"
          ? `https://api.dexscreener.com/orders/v1/solana/${encodeURIComponent(
            mint
          )}`
          : `https://api.dexscreener.com/orders/v1/${chainId}/${encodeURIComponent(
            mint
          )}`;

      // Fetch order status from API
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to check orders for the token");

      const data = await response.json();
      setIsPaid(data.some((order: Order) => order.status === "approved"));
    } catch (err) {
      console.error("Failed to fetch payment orders:", err);
      setError("Failed to fetch payment orders for the token.");
    }
  };

  const checkDexPayment = async (mint: string) => {
    setLoading(true);
    setError(null);
    setPairData([]);
    setTokenData(null);
    setIsPaid(false);
    setPumpData(null);
    setNoTokenInfo(false);
    setIconError(false);
    setHasSearched(true);

    try {
      const chainId = await fetchTokenDetails(mint);

      // Retrieve dexId from pairData or tokenData
      const dexId =
        pairData.length > 0 ? pairData[0]?.dexId : pairData[0]?.dexId;

      if (chainId) {
        console.log("DexId passed to fetchOrderStatus:", dexId); // Debugging
        await fetchOrderStatus(mint, chainId, dexId); // Pass dexId explicitly
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      if (outputRef.current) {
        outputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const handlePopularSearchClick = (token: string) => {
    setmintInput(token);
    checkDexPayment(token);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkDexPayment(mintInput);
    }
  };
  return (
    <main className="flex flex-col items-center min-h-screen text-gray-900 ">
      <div className="w-full max-w-4xl p-4 md:p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-green-700">
          DEX Verification Checker
        </h1>

        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-200">
          <div className="flex items-center bg-white rounded-full px-4 py-3 w-full shadow-sm border border-gray-300">
            <input
              type="text"
              placeholder="Enter token address..."
              value={mintInput}
              onChange={(e) => setmintInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent outline-none text-gray-900 placeholder-gray-400 flex-grow text-base"
            />
            <button
              onClick={() => checkDexPayment(mintInput)}
              className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
            >
              <AiOutlineSearch className="text-xl text-white" />
            </button>
          </div>
          {/* Centered Popular Searches */}
          <div className="text-center text-gray-600 text-sm w-full">
            <p>Popular Searches:</p>
            <div className="flex justify-center flex-wrap gap-2 my-2">
              {popularTokens.map((token) => (
                <button
                  key={token}
                  onClick={() => handlePopularSearchClick(token)}
                  className="bg-white text-gray-700 px-3 py-1.5 rounded-lg hover:bg-green-50 border border-gray-200 transition-colors text-xs"
                >
                  {token.slice(0, 4)}...{token.slice(-4)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex items-center mt-6 justify-center">
          <PuffLoader color="#16a34a" size={60} />
        </div>
      )}
      <div ref={outputRef}>
        {!loading && hasSearched && (
          <motion.div
            className={`p-4 sm:p-6 rounded-lg text-center w-full mt-4 sm:mt-6 max-w-md border-4 ${isPaid ? "border-green-500" : "border-red-500"
              }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {isPaid ? "Yes, the DEX is paid!" : "No, the DEX has not paid."}
            </h2>
            {tokenData?.icon ? (
              <img
                src={tokenData.icon}
                alt="Token Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                onError={() => setIconError(true)}
              />
            ) : isPaid ? (
              <AiOutlineSmile className="text-4xl sm:text-5xl text-gray-700 mt-3 sm:mt-4" />
            ) : (
              <AiOutlineFrown className="text-4xl sm:text-5xl text-red-500 mt-3 sm:mt-4" />
            )}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Chain ID: {tokenData?.chainId.toUpperCase()}
            </p>
            {tokenData?.symbol && (
              <p className="text-xs sm:text-sm text-gray-500">
                Symbol: {tokenData.symbol}
              </p>
            )}
            {/* Dex Screener Information */}
            {pairData?.length > 0 && pairData[0]?.dexId !== "pump-dex" && (
              <div className="mt-3 sm:mt-4 text-left w-full">
                <h3 className="font-semibold text-sm sm:text-base">
                  Pair Information:
                </h3>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Liquidity (USD):</span> $
                  {pairData[0]?.liquidity?.usd
                    ? pairData[0].liquidity.usd.toFixed(2)
                    : "N/A"}
                </p>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Price (USD):</span> $
                  {pairData[0]?.priceUsd
                    ? parseFloat(pairData[0].priceUsd).toFixed(9)
                    : "N/A"}
                </p>
                <div className="mt-3 sm:mt-4">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Transactions:
                  </h3>
                  <p className="text-xs sm:text-sm">
                    5 Min - Buys: {pairData[0]?.txns?.m5?.buys ?? "N/A"}, Sells:{" "}
                    {pairData[0]?.txns?.m5?.sells ?? "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    1 Hour - Buys: {pairData[0]?.txns?.h1?.buys ?? "N/A"},
                    Sells: {pairData[0]?.txns?.h1?.sells ?? "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    24 Hours - Buys: {pairData[0]?.txns?.h24?.buys ?? "N/A"},
                    Sells: {pairData[0]?.txns?.h24?.sells ?? "N/A"}
                  </p>
                </div>
              </div>
            )}
            {/* Pump Token Information */}
            {pairData?.length > 0 &&
              (pairData[0]?.dexId === "pump-dex" ||
                pairData[0]?.dexId === "moonshot") &&
              pumpData && (
                <div className="mt-3 sm:mt-4 text-left w-full">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Pump Token Details:
                  </h3>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Name: </span>
                    {pumpData.name || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Market Cap (USD):</span> $
                    {pumpData.usd_market_cap
                      ? parseFloat(pumpData.usd_market_cap).toFixed(2)
                      : "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Supply:</span>{" "}
                    {pumpData.total_supply || "N/A"}
                  </p>

                  {/* Links Section */}
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    {pumpData.website && (
                      <a
                        href={pumpData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-green-500 text-gray-700 font-semibold text-xs sm:text-sm hover:bg-green-500 hover:text-white transition duration-300"
                      >
                        Website
                      </a>
                    )}
                    {pumpData.twitter && (
                      <a
                        href={pumpData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-green-500 text-gray-700 font-semibold text-xs sm:text-sm hover:bg-green-500 hover:text-white transition duration-300"
                      >
                        Twitter
                      </a>
                    )}
                    {pumpData.telegram && (
                      <a
                        href={pumpData.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-green-500 text-gray-700 font-semibold text-xs sm:text-sm hover:bg-green-500 hover:text-white transition duration-300"
                      >
                        Telegram
                      </a>
                    )}
                  </div>
                  {/* Buttons on the same line */}
                  <div className="mt-4 sm:mt-6 flex flex-wrap justify-between gap-2">
                    {isPaid && (
                      <>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `🚀 ${pumpData?.name || "N/A"} (${tokenData?.symbol || "N/A"
                            }) is now verified on Dexcheck.fun! Check it out now!
${pumpData?.website ? ` Website: ${pumpData.website}` : ""}🛡️
Chain ID: ${tokenData?.chainId?.toUpperCase() || "N/A"}
CA:${tokenData?.mint || "N/A"}
#DEXVerified #Crypto #Blockchain #Token #NFT #MEME`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-2 rounded-lg text-gray-700 font-semibold text-sm bg-black text-white hover:bg-green-500 hover:text-white transition duration-300"
                        >
                          <img
                            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-icon.png"
                            alt="Share on X"
                            className="w-5 h-5 mr-2"
                          />
                          Share
                        </a>
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            pumpData?.website || "https://dexcheck.fun"
                          )}&text=${encodeURIComponent(
                            `🚀 ${pumpData?.name || "N/A"} (${tokenData?.symbol || "N/A"}) is now verified on Dexcheck.fun!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-2 rounded-lg bg-[#0088cc] text-white font-semibold text-sm hover:bg-[#0077b5] transition duration-300"
                        >
                          <img
                            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/telegram-white-icon.png"
                            alt="Forward to Telegram"
                            className="w-6 h-6 mr-2"
                          />
                          Forward
                        </a>

                      </>
                    )}
                  </div>
                  {/* Action Button */}
                  <div className="mt-4 w-full">
                    {pumpData?.complete === true ? (
                      <div>
                        <a
                          href={`https://www.geckoterminal.com/solana/pools/${pumpData.raydium_pool}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center px-6 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-500 transition duration-300"
                        >
                          <img
                            src="https://fineproxy.org/wp-content/uploads/2023/08/RAYdium-logo.png"
                            alt="Raydium Icon"
                            className="w-6 h-6 mr-2"
                          />
                          Buy on Raydium
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a
                          href={`https://pump.fun/coin/${pumpData.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center px-6 py-2 rounded-lg bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-500 transition duration-300"
                        >
                          <img
                            src="/images/pump-logo-bg.png"
                            alt="PumpFun Icon"
                            className="w-6 h-6 mr-2"
                          />
                          Buy on PumpFun
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            <div className="mt-6 text-xs text-gray-400">
              Scanned by{" "}
              <a
                href="https://dexcheck.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                DEXCHECK.FUN
              </a>
            </div>
          </motion.div>
        )}
      </div>
      <Spotlight />
    </main>
  );
}
