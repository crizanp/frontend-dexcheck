import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { FaGlobe, FaTelegram, FaTwitter } from "react-icons/fa";
import FAQ from "./Faqhome";

const Spotlight = () => {
  const [spotlights, setSpotlights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSpotlights = async () => {
    try {
      const response = await fetch(
        "https://dextools1jsseuer32das3.vercel.app/api/spotlights"
      );
      if (!response.ok) throw new Error("Failed to fetch spotlight data.");
      const data = await response.json();

      const activeSpotlights = data.filter(
        (spotlight: any) => spotlight.isActive
      );

      const detailedSpotlights = await Promise.all(
        activeSpotlights.map(async (spotlight: any) => {
          try {
            const pumpUrl = `https://dextools1jsseuer32das3.vercel.app/api/coins/fetch-specific-details/${spotlight.address}`;
            const moonshotUrl = `https://api.dexscreener.com/latest/dex/tokens/${spotlight.address}`;

            // Fetch PumpFun data
            const pumpResponse = await fetch(pumpUrl);
            if (pumpResponse.ok) {
              const pumpData = await pumpResponse.json();
              return {
                ...spotlight,
                name: pumpData.name,
                symbol: pumpData.symbol,
                marketCap: pumpData.usd_market_cap || 0,
                url: `https://pump.fun/coin/${pumpData.mint}`,
                icon: pumpData.image_uri || "/images/pump-default.png",
                source: "pumpfun",
                socials: pumpData.socials || [],
                website: pumpData.website,
              };
            }

            // Fetch Moonshot data
            const moonshotResponse = await fetch(moonshotUrl);
            if (moonshotResponse.ok) {
              const { pairs } = await moonshotResponse.json();
              const pair = pairs[0];
              return {
                ...spotlight,
                name: pair.baseToken.name,
                symbol: pair.baseToken.symbol,
                marketCap: pair.fdv || 0,
                url: pair.url,
                icon: pair.info.imageUrl || "/images/moonshot-default.png",
                source: "moonshot",
                socials: pair.info.socials || [],
                website: pair.info.websites?.[0]?.url,
              };
            }

            return { ...spotlight, error: "Details not available." };
          } catch {
            return { ...spotlight, error: "Details not available." };
          }
        })
      );

      // Sort by Market Cap in descending order
      const sortedSpotlights = detailedSpotlights.sort(
        (a, b) => b.marketCap - a.marketCap
      );

      setSpotlights(sortedSpotlights);
    } catch (err) {
      console.error("Error fetching spotlight data:", err);
      setError("Failed to load spotlight data.");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSpotlights().finally(() => setIsLoading(false));
  }, []);

  const renderTokenCard = (token: any, index: number) => (
    <div
      key={token.address}
      className="relative border border-green-400 rounded-lg p-4 shadow-lg bg-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 items-start w-full"
    >
      {/* Ranking Badge */}
      <div className="absolute top-2 right-2">
        {index === 0 && (
          <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs">
            #🔥 Trending
          </span>
        )}
        {index === 1 && (
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            #🚀 Mooning
          </span>
        )}
      </div>

      {/* Token Information */}
      <div className="flex items-center w-full gap-4">
        <img
          src={token.icon || "/images/default-icon.png"}
          alt={token.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-green-400">
            {token.name || "Unknown"}
          </h4>
          <p className="text-sm text-gray-400">
            Symbol: {token.symbol || "N/A"}
          </p>
          <p className="text-sm text-green-400 mt-1">
            Market Cap: ${token.marketCap?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>

      {/* Social and External Links */}
      <div className="flex justify-between items-center mt-4 w-full">
        <div className="flex gap-3 items-center">
          {/* Telegram Icon */}
          <a
            href={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "telegram"
              )?.url || "#"
            }
            target={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "telegram"
              )
                ? "_blank"
                : undefined
            }
            rel="noopener noreferrer"
            className={`${
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "telegram"
              )
                ? "text-green-400"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaTelegram className="w-4 h-4" />
          </a>

          {/* Twitter Icon */}
          <a
            href={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "twitter"
              )?.url || "#"
            }
            target={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "twitter"
              )
                ? "_blank"
                : undefined
            }
            rel="noopener noreferrer"
            className={`${
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "twitter"
              )
                ? "text-blue-400"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaTwitter className="w-4 h-4" />
          </a>

          {/* Website Icon */}
          <a
            href={token.website || "#"}
            target={token.website ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`${
              token.website ? "text-white" : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaGlobe className="w-4 h-4" />
          </a>
        </div>

        {/* Source Icon */}
        <a
          href={token.url || "#"}
          target={token.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`flex items-center ${
            token.url ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <img
            src={
              token.source === "pumpfun"
                ? "/images/pump-logo-bg.png"
                : "https://www.checkdex.xyz/images/logos/moonshot.png"
            }
            alt={`${token.source} logo`}
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );

  return (
    <section
      className="mt-4 p-4 text-white mx-auto bg-gray-900 rounded-lg shadow-lg"
      style={{ width: "100%" }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        SPOTLIGHT
      </h2>
      <div className="flex justify-center items-center mb-6">
        <div className="h-1 bg-green-400 w-1/3"></div>
        <div className="text-green-400 mx-2 text-xl font-bold">✨</div>
        <div className="h-1 bg-green-400 w-1/3"></div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <PuffLoader color="#00FFAB" size={80} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spotlights.map((spotlight, index) =>
            renderTokenCard(spotlight, index)
          )}
        </div>
      )}
      <FAQ />
    </section>
  );
};

export default Spotlight;
