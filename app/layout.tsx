"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import Sidebar from "./components/Sidebar";
import "./globals.css";
import Advertisement from "./components/Advertisement";
import Footer from "./components/Footer_IGH";
import { AdvertisementProvider } from "./context/AdvertisementContext";
import WalletConnect from "./components/WalletConnect";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname(); // Get current route

  // Hide Advertisement on specific pages
  const noAdPages = ["/wallet-tracking"];

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <head>
        <title>PumpFun Token Listings - Hot Pump & Moonshot Tokens</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Discover the hottest pump tokens and moonshot projects with detailed insights into their market performance." />
        <link rel="icon" href="https://dexcheck.fun/images/uiui.jpg" />
      </head>
      <body className="bg-gradient-to-br from-green-50 to-white text-white">
        <AdvertisementProvider>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"} p-2 sm:p-6 min-h-screen pb-16`}>
            
            {/* Show Advertisement only if the page is NOT in `noAdPages` */}
            {!noAdPages.includes(pathname) && <Advertisement />}
<WalletConnect/>
            {children}
            <Footer />
          </main>
        </AdvertisementProvider>
      </body>
    </html>
  );
}
