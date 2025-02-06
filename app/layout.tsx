"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import Advertisement from "./components/Advertisement";
import Footer from "./components/Footer_IGH";
import { AdvertisementProvider } from "./context/AdvertisementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <title>PumpFun Token Listings - Hot Pump & Moonshot Tokens</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover the hottest pump tokens and moonshot projects with detailed insights into their market performance."
        />
        <meta
          name="keywords"
          content="pump tokens, moonshot tokens, cryptocurrency, meme listing, token listings, active tokens, completed tokens, meme coins, meme supercycle, altcoins, crypto news"
        />
        <meta name="author" content="Dexcheck.fun" />
        <meta name="publisher" content="IGHGROUP" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta
          property="og:title"
          content="Pump Token Listings - Hot Pump & Moonshot Tokens"
        />
        <meta
          property="og:description"
          content="Explore the best pump tokens and completed moonshot tokens with market insights."
        />
        <meta
          property="og:image"
          content="https://dexcheck.fun/images/Logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dexcheck.fun" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="DexCheck" />
        <meta property="og:updated_time" content="2024-11-23T12:00:00+00:00" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pump Token Listings - Hot Pump & Moonshot Tokens"
        />
        <meta
          name="twitter:description"
          content="Explore the best pump tokens and moonshot tokens with market insights."
        />
        <meta
          name="twitter:image"
          content="https://dexcheck.fun/images/Logo.png"
        />
        <meta name="theme-color" content="#90EE90" />
        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Pump Token Listings - Hot Pump & Moonshot Tokens",
              description:
                "Discover the hottest pump tokens and moonshot projects with detailed insights into their market performance.",
              url: "https://dexcheck.fun",
              publisher: {
                "@type": "Organization",
                name: "IGHGroup",
                logo: {
                  "@type": "ImageObject",
                  url: "https://dexcheck.fun/images/Logo.png",
                },
              },
            }),
          }}
        ></script>

        {/* Google Analytics Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'G-VQCGB2E7N0', 'auto');
            ga('send', 'pageview');
          `,
          }}
        ></script>
      </head>
      <body className="bg-gradient-to-br from-purple-50 to-pink-50 text-white">
        <AdvertisementProvider>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            className={`transition-all duration-300 ${
              isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
            } p-2 sm:p-6 min-h-screen pb-16`}
          >
            <Advertisement />

            {children}
            <Footer />
          </main>
        </AdvertisementProvider>
      </body>
    </html>
  );
}
