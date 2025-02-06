import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const popularTokens = [
  "GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump",
  "4QPoxGzxnC2PFssQ5GBmWqH3xuHWwZ1Mxu6hiduppump",
  "9yNEs1Z96EF4Y5NTufU9FyRAz6jbGzZLBfRQCtssPtAQ",
  "3KAeVfDbU6tZxSD2kqz3Pz6B6f42CW3FdA89GUZ8fw23",
  "72XUGRRzuSoLRch3QPpSPHkuZ8F58rvtCNF4QSosLb4H",
];

const SearchSection = ({ mintInput, setmintInput, checkDexPayment }) => {
  const handlePopularSearchClick = (token: string) => {
    setmintInput(token);
    checkDexPayment(token);
  };

  return (
    <div className="w-full md:w-4/4 lg:w-4/4 p-4 md:p-6 bg-gray-700 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">
        DEX Screener Paid Checker
      </h1>
      <div className="flex flex-col items-center bg-gray-800 p-3 md:p-4 rounded-lg space-y-3">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-700 rounded-full px-3 py-2 md:px-4 md:py-3 md:w-3/4 lg:w-3/4">
          <input
            type="text"
            placeholder="Enter token address"
            value={mintInput}
            onChange={(e) => setmintInput(e.target.value)}
            onKeyPress={(event) => event.key === "Enter" && checkDexPayment(mintInput)}
            className="bg-transparent outline-none text-white placeholder-gray-300 flex-grow text-sm md:text-lg"
          />
          <button onClick={() => checkDexPayment(mintInput)}>
            <AiOutlineSearch className="text-2xl md:text-3xl text-white" />
          </button>
        </div>

        {/* Popular Searches */}
        <div className="text-center text-gray-400 text-sm md:text-base mt-2 w-full px-2">
          <p>Popular Searches:</p>
          <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar space-x-2 my-2 w-full px-2">
            {popularTokens.map((token) => (
              <button
                key={token}
                onClick={() => handlePopularSearchClick(token)}
                className="bg-gray-600 text-gray-300 px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-gray-500 flex-shrink-0 whitespace-nowrap"
              >
                {token.slice(0, 4)}...{token.slice(-4)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
