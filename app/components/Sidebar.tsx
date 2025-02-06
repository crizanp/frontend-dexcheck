"use client";

import { FC, useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineRise,
  AiOutlineTrophy,
} from "react-icons/ai";
import { BsShieldCheck, BsGraphUp } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import Link from "next/link";

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
        className={`fixed top-0 left-0 h-screen bg-gray-800 z-40 p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } hidden lg:flex flex-col border-r border-gray-700`}
      >
        <div className="flex justify-between items-center">
          {isOpen && (
            <h2 className="text-white font-bold text-xl">DEXCHECK.FUN</h2>
          )}
          <button
            onClick={toggleSidebar}
            className={`text-white transition-transform duration-300 ${
              !isOpen ? "text-4xl transform rotate-180" : "text-2xl"
            }`}
          >
            <AiOutlineMenu />
          </button>
        </div>
        <nav className="flex flex-col mt-6 space-y-6">
          <Link
            href="/"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <AiOutlineHome className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Home
            </span>
          </Link>
          <Link
            href="/dex-check"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/dex-check") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <BsShieldCheck className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              DEX Paid Check
            </span>
          </Link>
          <Link
            href="/latest"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/latest") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <AiOutlineFire className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Dexscreener Boosted
            </span>
          </Link>
          <Link
            href="/pump"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/pump") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaRegChartBar className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Pump.Fun Tracker
            </span>
          </Link>
          <Link
            href="/hot_pump"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/getting-hotter") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <AiOutlineRise className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
            <span className={`${isOpen ? "block text-base ml-4" : "hidden"}`}>
              Getting Hotter
            </span>
          </Link>
          <Link
            href="/editorialpick"
            className={`flex items-center text-white p-3 rounded-md ${
              isActive("/editorialpick") ? "bg-gray-700" : "hover:bg-gray-700"
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
      </div>

      {/* Bottom navbar for medium and small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex justify-around items-center z-50 h-16 border-t border-gray-700">
        <button
          onClick={() => setShowMorePopup(!showMorePopup)}
          className="text-white flex flex-col items-center hover:text-blue-300"
        >
          <AiOutlineMenu className="text-2xl pb-2" />
          <span className="text-xs">More</span>
        </button>
        <Link
          href="/"
          className={`text-white flex flex-col items-center ${
            isActive("/") ? "text-blue-400" : "hover:text-blue-300"
          }`}
        >
          <AiOutlineHome className="text-2xl pb-2" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/dex-check"
          className={`text-white flex flex-col items-center ${
            isActive("/dex-check") ? "text-blue-400" : "hover:text-blue-300"
          }`}
        >
          <BsShieldCheck className="text-2xl pb-2" />
          <span className="text-xs">DEX Check</span>
        </Link>
        <Link
          href="/latest"
          className={`text-white flex flex-col items-center ${
            isActive("/latest") ? "text-blue-400" : "hover:text-blue-300"
          }`}
        >
          <AiOutlineFire className="text-2xl pb-2" />
          <span className="text-xs">Dex Track</span>
        </Link>
        <Link
          href="/pump"
          className={`text-white flex flex-col items-center ${
            isActive("/pump") ? "text-blue-400" : "hover:text-blue-300"
          }`}
        >
          <FaRegChartBar className="text-2xl pb-2" />
          <span className="text-xs">Pump Track</span>
        </Link>
      </div>

      {/* Popup for Additional Menu */}
      {showMorePopup && (
        <div className="fixed bottom-16 left-2 bg-gray-700 text-white p-4 rounded-lg shadow-lg z-50 w-40">
          <Link
            href="/hot_pump"
            className="block mb-2 text-sm hover:text-blue-300"
            onClick={() => setShowMorePopup(false)} // Close popup on click
          >
            Getting Hotter
          </Link>
          <Link
            href="/editorialpick"
            className="block text-sm hover:text-blue-300"
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
