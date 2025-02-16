import { useState, useEffect } from "react";
import { useAdvertisement } from "../context/AdvertisementContext";
import { Copy, Wallet, ExternalLink, LogOut, ShoppingCart } from "lucide-react";

const WalletConnect = () => {
  const { advertisement, loading } = useAdvertisement();
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(null);
  const contractAddress = "B88rK4Y1o3yqRfhWevNRcLDbSTRaXgkHdsZe39Gfpump";

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const provider = window?.solana;
        if (provider?.isPhantom) {
          const response = await provider.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          fetchTokenBalance(response.publicKey.toString());
        }
      } catch (error) {
        console.error("Auto-connect error:", error);
      }
    };
    checkWalletConnection();
  }, []);

  const fetchTokenBalance = async (address) => {
    try {
      const response = await fetch(`https://dextools1jsseuer32das3.vercel.app/api/splcheck/token-balance/${address}`);
      const data = await response.json();
      // Updated to use totalBalance instead of balance
      setTokenBalance(data.totalBalance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
  };

  const connectWallet = async () => {
    try {
      setConnecting(true);
      const provider = window?.solana;
      
      if (!provider?.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        return;
      }

      const response = await provider.connect();
      setWalletAddress(response.publicKey.toString());
      await fetchTokenBalance(response.publicKey.toString());
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const provider = window?.solana;
      if (provider?.isPhantom) {
        await provider.disconnect();
        setWalletAddress("");
        setTokenBalance(null);
      }
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-5 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        {/* Contract Address Section - More Compact */}
        <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded mb-4 text-xs sm:text-sm">
          <span className="text-green-800 font-medium whitespace-nowrap">
            CA: $DEXC
          </span>
          <span className="text-green-700 truncate">{contractAddress}</span>
          <button
            onClick={handleCopy}
            className="p-1 bg-white rounded border border-green-200 hover:bg-green-50 transition-colors relative flex-shrink-0"
          >
            <Copy size={14} className="text-green-600" />
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-md">
                Copied!
              </span>
            )}
          </button>
        </div>

        {/* Wallet Connection Section - More Compact */}
        <div className="flex flex-col items-center gap-3">
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={connecting}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 w-full justify-center"
            >
              <Wallet size={16} />
              {connecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Wallet:</span>
                  <span className="text-sm font-medium text-gray-600">{`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}</span>
                  <a
                    href={`https://solscan.io/account/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* Token Balance Display - More Compact */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 text-center">
                <h3 className="text-gray-700 text-sm mb-1">$DEXC Balance</h3>
                {tokenBalance !== null ? (
                  Number(tokenBalance) > 0 ? (
                    <p className="text-xl font-bold text-gray-900">
                      {Number(tokenBalance).toLocaleString()} DEXC
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">No tokens yet</p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Buy DEXC Now
                      </a>
                    </div>
                  )
                ) : (
                  <p className="text-sm text-gray-600">Loading...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;