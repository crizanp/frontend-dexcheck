"use client";

import { FC, useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineRise,
  AiOutlineTrophy,
} from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { FaRegChartBar, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [showMorePopup, setShowMorePopup] = useState(false); // For mobile 'More' button

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white z-40 p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"
          } hidden lg:flex flex-col border-r border-gray-300 shadow-lg`}
      >
        <div className="flex justify-between items-center">
          {isOpen && (
            <Image
              src="/images/DEX.png"
              alt="DexCheck Logo"
              layout="intrinsic"
              width={120}
              height={40}
            />
          )}
          <button onClick={toggleSidebar} className="transition-transform duration-300">
            {isOpen ? (
              <AiOutlineMenu className="text-green-600 text-2xl" />
            ) : (
              <img
                src="/images/uiui-removebg-preview.png"
                alt="Menu"
                className="h-10 w-auto"
              />
            )}
          </button>
        </div>
        <nav className="flex flex-col mt-6 space-y-6">
          <Link
            href="/"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <AiOutlineHome className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Home
            </span>
          </Link>
          <Link
            href="/dex-check"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/dex-check") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <BsShieldCheck className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              DEX Paid Check
            </span>
          </Link>
          <Link
            href="/latest"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/latest") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <AiOutlineFire className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Dexscreener Boosted
            </span>
          </Link>
          <Link
            href="/pump"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/pump") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <FaRegChartBar className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Pump.Fun Tracker
            </span>
          </Link>
          <Link
            href="/hot_pump"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/getting-hotter") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <AiOutlineRise className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Getting Hotter
            </span>
          </Link>
          <Link
            href="/editorialpick"
            className={`flex items-center text-gray-800 p-3 rounded-md ${isActive("/editorialpick") ? "bg-green-100 text-green-600" : "hover:bg-green-100 hover:text-green-600"
              }`}
          >
            <AiOutlineTrophy
              className={`${isOpen ? "text-2xl" : "text-3xl"}`}
            />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Best Picks
            </span>
          </Link>
        </nav>

        {/* Footer with Telegram and Twitter icons */}
        <div className="mt-auto flex justify-center space-x-4">
          <a
            href="https://t.me/dexcheckdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-green-600"
          >
            <FaTelegramPlane className="text-2xl" />
          </a>
          <a
            href="https://x.com/dexcheckdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-green-600"
          >
            <FaTwitter className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Bottom navbar for medium and small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-2 flex justify-around items-center z-50 h-16 border-t border-gray-300">
        <button
          onClick={() => setShowMorePopup(!showMorePopup)}
          className="text-green-600 flex flex-col items-center hover:text-green-500"
        >
          <AiOutlineMenu className="text-2xl pb-2" />
          <span className="text-xs">More</span>
        </button>
        <Link
          href="/"
          className={`text-gray-800 flex flex-col items-center ${isActive("/") ? "text-green-600" : "hover:text-green-600"
            }`}
        >
          <AiOutlineHome className="text-2xl pb-2" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/dex-check"
          className={`text-gray-800 flex flex-col items-center ${isActive("/dex-check") ? "text-green-600" : "hover:text-green-600"
            }`}
        >
          <BsShieldCheck className="text-2xl pb-2" />
          <span className="text-xs">DEX Check</span>
        </Link>
        <Link
          href="/latest"
          className={`text-gray-800 flex flex-col items-center ${isActive("/latest") ? "text-green-600" : "hover:text-green-600"
            }`}
        >
          <AiOutlineFire className="text-2xl pb-2" />
          <span className="text-xs">Dex Track</span>
        </Link>
        <Link
          href="/pump"
          className={`text-gray-800 flex flex-col items-center ${isActive("/pump") ? "text-green-600" : "hover:text-green-600"
            }`}
        >
          <FaRegChartBar className="text-2xl pb-2" />
          <span className="text-xs">Pump Track</span>
        </Link>
      </div>

      {/* Popup for Additional Menu */}
      {showMorePopup && (
        <div className="fixed bottom-16 left-2 bg-green-100 text-green-600 p-4 rounded-lg shadow-lg z-50 w-40">
          <Link
            href="/hot_pump"
            className="block mb-2 text-sm hover:text-green-500"
            onClick={() => setShowMorePopup(false)} // Close popup on click
          >
            Getting Hotter
          </Link>
          <Link
            href="/editorialpick"
            className="block text-sm hover:text-green-500"
            onClick={() => setShowMorePopup(false)} // Close popup on click
          >
            Best Picks
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
