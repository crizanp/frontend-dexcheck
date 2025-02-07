import { motion } from "framer-motion";
import { AiOutlineSmile, AiOutlineFrown, AiOutlineTwitter } from "react-icons/ai";

const ResultsSection = ({ isPaid, tokenData, pairData, noTokenInfo, iconError }) => {
  return (
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
          onError={() => iconError(true)}
        />
      ) : isPaid ? (
        <AiOutlineSmile className="text-4xl sm:text-5xl text-green-500 mt-3 sm:mt-4" />
      ) : (
        <AiOutlineFrown className="text-4xl sm:text-5xl text-red-500 mt-3 sm:mt-4" />
      )}
      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        Chain ID: {tokenData?.chainId.toUpperCase()}
      </p>
      {tokenData?.symbol && (
        <p className="text-xs sm:text-sm text-gray-500">Symbol: {tokenData.symbol}</p>
      )}

      {/* Dex Screener Information */}
      {pairData?.length > 0 && pairData[0]?.dexId !== "pump-dex" && (
        <div className="mt-3 sm:mt-4 text-left w-full">
          <h3 className="font-semibold text-sm sm:text-base">Pair Information:</h3>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Liquidity (USD):</span> $
            {pairData[0]?.liquidity?.usd ? pairData[0].liquidity.usd.toFixed(2) : "N/A"}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Price (USD):</span> $
            {pairData[0]?.priceUsd ? parseFloat(pairData[0].priceUsd).toFixed(9) : "N/A"}
          </p>
          <div className="mt-3 sm:mt-4">
            <h3 className="font-semibold text-sm sm:text-base">Transactions:</h3>
            <p className="text-xs sm:text-sm">
              5 Min - Buys: {pairData[0]?.txns?.m5?.buys ?? "N/A"}, Sells:{" "}
              {pairData[0]?.txns?.m5?.sells ?? "N/A"}
            </p>
            <p className="text-xs sm:text-sm">
              1 Hour - Buys: {pairData[0]?.txns?.h1?.buys ?? "N/A"}, Sells:{" "}
              {pairData[0]?.txns?.h1?.sells ?? "N/A"}
            </p>
            <p className="text-xs sm:text-sm">
              24 Hours - Buys: {pairData[0]?.txns?.h24?.buys ?? "N/A"}, Sells:{" "}
              {pairData[0]?.txns?.h24?.sells ?? "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Pump Token Information */}
      {pairData?.length > 0 && pairData[0]?.dexId === "pump-dex" && tokenData && (
        <div className="mt-3 sm:mt-4 text-left w-full">
          <h3 className="font-semibold text-sm sm:text-base">Pump Token Details:</h3>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Name: </span>{tokenData.name || "N/A"}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Market Cap (USD):</span> $
            {tokenData.usd_market_cap ? parseFloat(tokenData.usd_market_cap).toFixed(2) : "N/A"}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Total Supply:</span>{" "}
            {tokenData.total_supply || "N/A"}
          </p>

          {/* Links Section */}
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
            {tokenData.website && (
              <a
                href={tokenData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold text-xs sm:text-sm hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Website
              </a>
            )}
            {tokenData.twitter && (
              <a
                href={tokenData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold text-xs sm:text-sm hover:bg-blue-400 hover:text-white transition duration-300"
              >
                Twitter
              </a>
            )}
            {tokenData.telegram && (
              <a
                href={tokenData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-blue-300 text-blue-300 font-semibold text-xs sm:text-sm hover:bg-blue-300 hover:text-white transition duration-300"
              >
                Telegram
              </a>
            )}
          </div>

          {/* Buttons on the same line */}
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-between gap-2">
            {tokenData?.status === "Launched" ? (
              <a
                href={`https://www.geckoterminal.com/solana/pools/${tokenData.raydium_pool}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-green-500 text-green-500 font-semibold text-xs sm:text-sm hover:bg-green-500 hover:text-white transition duration-300"
              >
                Buy on Raydium
              </a>
            ) : (
              <a
                href={`https://pump.fun/coin/${tokenData.mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg border-2 border-yellow-500 text-yellow-500 font-semibold text-xs sm:text-sm hover:bg-yellow-500 hover:text-white transition duration-300"
              >
                Buy on PumpFun
              </a>
            )}
            {isPaid && (
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `🚀 ${tokenData?.name || 'N/A'} (${tokenData?.symbol || 'N/A'}) is now verified on Dexchecker.fun! Check it out now!
      
${tokenData?.website ? ` Website: ${tokenData.website}` : ''
                  } 🛡️

Chain ID: ${tokenData?.chainId?.toUpperCase() || 'N/A'}
CA: ${tokenData?.mint || 'N/A'}
#DEXVerified #Crypto #Blockchain #Token #NFT #MEME`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold text-sm hover:bg-blue-500 hover:text-white transition duration-300"
              >
                <AiOutlineTwitter className="mr-2 text-xl" />
                Share on X
              </a>
            )}
          </div>

        </div>
      )}
      {/* Add the rest of the logic to display token details and buttons */}
    </motion.div>
  );
};

export default ResultsSection;
