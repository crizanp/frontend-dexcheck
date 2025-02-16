import { useState, useEffect } from "react";
import { useAdvertisement } from "../context/AdvertisementContext";
import { Copy } from "lucide-react";

export default function Advertisement() {
  const { advertisement, loading } = useAdvertisement();
  const [copied, setCopied] = useState(false);
  const contractAddress = "B88rK4Y1o3yqRfhWevNRcLDbSTRaXgkHdsZe39Gfpump";

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
  };

  if (loading) {
    return <div className="text-center mt-5 text-gray-500">Loading...</div>;
  }

  if (!advertisement) {
    return (
      <div className="text-center mt-5 text-gray-400">
        No active advertisement at the moment.
      </div>
    );
  }

  return (
    <div className="advertisement-container flex flex-col items-center pb-4">
      <a
        href={advertisement.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center w-full mt-2"
      >
        <div className="relative inline-block">
          <img
            src={advertisement.imageUrl}
            alt="Advertisement"
            className="advertisement-image rounded-lg shadow-lg border border-gray-300"
          />
          <div className="ads-label absolute top-2 right-2 bg-white text-green-700 text-xs font-bold px-2 rounded border border-green-300">
            Ads
          </div>
        </div>
      </a>

      <style jsx>{`
        .announcement-bar {
          background-color: #f0fdf4;
          color: #14532d;
          border: 1px solid #bbf7d0;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
