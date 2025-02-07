import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { FaGlobe, FaTelegram, FaTwitter, FaRocket } from "react-icons/fa";
import FAQ from "./Faqhome";
import Link from "next/link";
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
      className="relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 hover:border-green-400"
    >
      {/* Ranking Badge */}
      <div className="absolute top-2 right-2">
  {index === 0 && (
    <span className="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-medium">
      #1 <span className="hidden sm:inline">Trending</span>
    </span>
  )}
  {index === 1 && (
    <span className="bg-green-500 text-white rounded-full px-3 py-1 text-sm font-medium">
      #2 <span className="hidden sm:inline">Rising</span>
    </span>
  )}
</div>


      {/* Token Information */}
      <div className="flex items-center w-full gap-4">
        <div className="relative">
          <img
            src={token.icon || "https://i.ibb.co/cCycF9h/pf212.png"}
            alt={token.name}
            className="w-14 h-14 rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors"
          />
          {token.source === "moonshot" && (
            <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-full">
              <FaRocket size={12} />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
          <p className="text-sm text-gray-600">Symbol: {token.symbol}</p>
          <p className="text-sm text-gray-600">
            Market Cap:{" "}
            <span className="font-medium text-green-700">
              ${token.marketCap?.toLocaleString() || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {/* Social and External Links */}
      <div className="flex justify-between items-center mt-4 w-full">
        <div className="flex gap-4">
          <a
            href={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "telegram"
              )?.url || "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaTelegram size={18} />
          </a>
          <a
            href={
              (Array.isArray(token.socials) ? token.socials : []).find(
                (social: any) => social.type === "twitter"
              )?.url || "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href={token.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <FaGlobe size={18} />
          </a>
        </div>

        <a
  href={token.url || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors bg-transparent sm:bg-green-100 sm:hover:bg-green-200"
>
  <img
    src={
      token.source === "pumpfun"
        ? "/images/pump-logo-bg.png"
        : "https://www.checkdex.xyz/images/logos/moonshot.png"
    }
    alt={token.source}
    className="w-6 h-6 rounded-full"
  />
  <span className="text-sm font-medium text-green-700 hidden sm:inline">
    View on {token.source === "pumpfun" ? "Pump.fun" : "Moonshot"}
  </span>
</a>

      </div>
    </div>
  );

  return (
    <main className="min-h-screen w-full">
      <div className="mb-12 w-full mx-auto px-4">
        <h1 className="text-3xl pt-9 md:text-4xl font-bold mb-4 text-gray-900 text-center">
          Spotlight Tokens
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
          Discover trending tokens with strong social activity and market momentum
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <PuffLoader color="#16a34a" size={80} />
            <p className="ml-4 text-green-700 font-medium">Loading Spotlight...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {spotlights.map((spotlight, index) =>
              renderTokenCard(spotlight, index)
            )}
          </div>
        )}

        <FAQ />

        <Link href="/hot_pump" className="fixed bottom-4 right-4 animate-float">
          <div className="bg-green-600 p-2.5 rounded-full shadow-md text-white text-sm flex items-center gap-2">
            <FaRocket />
            <span>Trending Chart</span>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Spotlight;